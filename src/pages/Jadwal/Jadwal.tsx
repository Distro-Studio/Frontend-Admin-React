import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Wrap,
} from "@chakra-ui/react";
import { RiSearchLine, RiUploadLine } from "@remixicon/react";
import { endOfWeek, startOfWeek } from "date-fns";
import { useState } from "react";
import FilterTabelJadwal from "../../components/dependent/Jadwal/FilterTabelJadwal";
import TabelJadwal from "../../components/dependent/Karyawan/Tabel/TabelJadwal";
import ImportJadwalKaryawanModal from "../../components/independent/Karyawan/ImportJadwalKaryawanModal";
import DateRangePicker from "../../components/input/DateRangePicker";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { iconSize, responsiveSpacing } from "../../const/sizes";
import TerapkanJadwalModal from "../../components/independent/Karyawan/TerapkanJadwalModal";

export default function Jadwal() {
  const today = new Date();
  const startOfWeekDate = startOfWeek(today, { weekStartsOn: 1 });
  const endOfWeekDate = endOfWeek(today, { weekStartsOn: 1 });

  const defaultRangeTgl = {
    from: startOfWeekDate,
    to: endOfWeekDate,
  };
  // console.log(defaultRangeTgl);

  // Filter Config
  const defaultFilterConfig = {
    search: "",
    unit_kerja: [],
    status_karyawan: [],
    range_tgl: defaultRangeTgl,
  };
  const [filterConfig, setFilterConfig] = useState<any>(defaultFilterConfig);
  const confirmDateRange = (from: Date, to: Date) => {
    setFilterConfig((ps: any) => ({
      ...ps,
      range_tgl: { from: from, to: to },
    }));
  };

  return (
    <>
      <CWrapper>
        <CContainer p={responsiveSpacing} bg={useBodyColor()} borderRadius={12}>
          <Wrap w={"100%"} mb={responsiveSpacing} className="tabelConfig">
            <InputGroup flex={"1 1 165px"}>
              <InputLeftElement>
                <Icon as={RiSearchLine} color={"p.500"} fontSize={iconSize} />
              </InputLeftElement>
              <Input
                placeholder="Pencarian"
                flex={"1 1 0"}
                onChange={(e) => {
                  setFilterConfig((ps: any) => ({
                    ...ps,
                    search: e.target.value,
                  }));
                }}
                value={filterConfig.search}
              />
            </InputGroup>

            <DateRangePicker
              flex={"1 1 250px"}
              confirmDate={confirmDateRange}
              dateValue={filterConfig.range_tgl}
              defaultDateSelected={defaultRangeTgl}
            />

            <FilterTabelJadwal
              defaultFilterConfig={defaultFilterConfig}
              filterConfig={filterConfig}
              setFilterConfig={setFilterConfig}
              rangeTgl={filterConfig.range_tgl}
            />

            <Button
              flex={"1 1 110px"}
              variant={"outline"}
              colorScheme="ap"
              className="clicky"
              rightIcon={<Icon as={RiUploadLine} fontSize={iconSize} />}
            >
              Export
            </Button>

            <ImportJadwalKaryawanModal />

            <TerapkanJadwalModal flex={"1 1 160px"} />
          </Wrap>

          <TabelJadwal filterConfig={filterConfig} />
        </CContainer>
      </CWrapper>
    </>
  );
}
