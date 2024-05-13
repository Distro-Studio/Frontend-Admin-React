import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Wrap,
} from "@chakra-ui/react";
import { RiSearchLine, RiUploadLine } from "@remixicon/react";
import { useState } from "react";
import FilterTabelKaryawan from "../../components/dependent/Karyawan/FilterTabelKaryawan";
import TopNavs from "../../components/dependent/TopNavs";
import ImportKaryawanModal from "../../components/independent/Karyawan/ImportKaryawanModal";
import TabelKaryawan from "../../components/independent/Karyawan/TabelKaryawan";
import DatePicker from "../../components/input/DatePicker";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import jadwalTopNavs from "../../const/jadwalTopNavs";
import { iconSize, responsiveSpacing } from "../../const/sizes";

export default function Jadwal() {
  const today = new Date().toDateString();

  // Filter Config
  const [filterConfig, setFilterConfig] = useState<any>({
    search: "",
    unit_kerja: [],
    status_karyawan: [],
    tgl: today,
  });
  const confirmDate = (newDate: string) => {
    setFilterConfig((ps: any) => ({ ...ps, tgl: newDate }));
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

            <DatePicker
              flex={"1 1 140px"}
              confirmDate={confirmDate}
              value={filterConfig.tgl}
              defaultValue={today}
              dateFormatOptions={{
                year: "numeric",
                month: "long",
                day: "numeric",
              }}
            />

            <FilterTabelKaryawan
              filterConfig={filterConfig}
              setFilterConfig={setFilterConfig}
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

          <TabelKaryawan filterConfig={filterConfig} />
        </CContainer>
      </CWrapper>
    </>
  );
}
