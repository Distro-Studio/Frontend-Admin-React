import { Button, Icon, Wrap } from "@chakra-ui/react";
import { RiUploadLine } from "@remixicon/react";
import { endOfWeek, startOfWeek } from "date-fns";
import { useState } from "react";
import FilterTabelJadwal from "../../components/dependent/FilterTabelJadwal";
import TabelJadwal from "../../components/dependent/TabelJadwal";
import ImportJadwalKaryawanModal from "../../components/independent/ImportJadwalKaryawanModal";
import TerapkanJadwalModal from "../../components/independent/TerapkanJadwalModal";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { iconSize, responsiveSpacing } from "../../const/sizes";
import SearchComponent from "../../components/dependent/input/SearchComponent";
import DateRangePickerModal from "../../components/dependent/input/DateRangePickerModal";

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
  const confirmDateRange = (
    inputValue: { from: Date; to: Date } | undefined
  ) => {
    setFilterConfig((ps: any) => ({
      ...ps,
      range_tgl: inputValue
        ? { from: inputValue.from, to: inputValue.to }
        : undefined,
    }));
  };

  return (
    <>
      <CWrapper>
        <CContainer p={responsiveSpacing} bg={useBodyColor()} borderRadius={12}>
          <Wrap w={"100%"} mb={responsiveSpacing} className="tabelConfig">
            <SearchComponent
              name="search"
              flex={"1 1 165px"}
              onChangeSetter={(inputValue) => {
                setFilterConfig((ps: any) => ({
                  ...ps,
                  search: inputValue,
                }));
              }}
              inputValue={filterConfig.search}
            />

            <DateRangePickerModal
              id="jadwal-date-range"
              name="date-range"
              flex={"1 1 160px"}
              onConfirm={confirmDateRange}
              inputValue={filterConfig.range_tgl}
              maxRange={7}
              nonNullable
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
