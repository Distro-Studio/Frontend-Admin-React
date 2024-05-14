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
import TopNavs from "../../components/dependent/TopNavs";
import ImportKaryawanModal from "../../components/independent/Karyawan/ImportKaryawanModal";
import TabelJadwal from "../../components/independent/Karyawan/TabelJadwal";
import DateRangePicker from "../../components/input/DateRangePicker";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import jadwalTopNavs from "../../const/jadwalTopNavs";
import { iconSize, responsiveSpacing } from "../../const/sizes";

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
  const [filterConfig, setFilterConfig] = useState<any>({
    search: "",
    unit_kerja: [],
    status_karyawan: [],
    range_tgl: defaultRangeTgl,
  });
  const confirmDateRange = (from: Date, to: Date) => {
    setFilterConfig((ps: any) => ({
      ...ps,
      range_tgl: { from: from, to: to },
    }));
  };

  return (
    <>
      <TopNavs active={0} data={jadwalTopNavs} mb={responsiveSpacing} />

      <CWrapper>
        <CContainer p={responsiveSpacing} bg={useBodyColor()} borderRadius={12}>
          <Wrap w={"100%"} mb={responsiveSpacing} className="tabelConfig">
            <InputGroup flex={"1 1 200px"}>
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
              flex={"1 1 200px"}
              confirmDate={confirmDateRange}
              dateValue={filterConfig.range_tgl}
              defaultDateSelected={defaultRangeTgl}
            />

            <FilterTabelJadwal
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

            <ImportKaryawanModal />
          </Wrap>

          <TabelJadwal filterConfig={filterConfig} />
        </CContainer>
      </CWrapper>
    </>
  );
}
