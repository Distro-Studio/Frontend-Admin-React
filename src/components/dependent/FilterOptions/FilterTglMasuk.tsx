import { VStack } from "@chakra-ui/react";
import { Dispatch } from "react";
import DatePicker from "../../input/DatePicker";
import FilterItemWrapper from "../../wrapper/FilterItemWrapper";

interface Props {
  filterConfig: any;
  setFilterConfig: Dispatch<any>;
}

export default function FilterTglMasuk({
  filterConfig,
  setFilterConfig,
}: Props) {
  function confirmDate(date: Date | string) {
    setFilterConfig((ps: any) => ({ ...ps, tgl_masuk: [date] }));
  }

  // SX

  return (
    <FilterItemWrapper
      title="Tanggal Masuk"
      filterValue={filterConfig.tgl_masuk}
      setFilterConfig={setFilterConfig}
      filterKey="tgl_masuk"
      panelMaxH={"380px"}
    >
      <VStack py={4}>
        <DatePicker
          dateValue={filterConfig.tgl_masuk[0]}
          confirmDate={confirmDate}
          placeholder="Pilih tanggal"
          noUseBackOnClose
        />
      </VStack>
    </FilterItemWrapper>
  );
}
