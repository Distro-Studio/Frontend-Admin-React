import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Wrap,
} from "@chakra-ui/react";
import { RiSearchLine, RiUploadLine } from "@remixicon/react";
import { useEffect, useState } from "react";
import FilterTabelKaryawan from "../../components/dependent/Karyawan/FilterTabelKaryawan";
import ImportKaryawanModal from "../../components/independent/Karyawan/ImportKaryawanModal";
import PresensiSummary from "../../components/independent/Karyawan/PresensiSummary";
import TabelKaryawan from "../../components/independent/Karyawan/TabelKaryawan";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { iconSize, responsiveSpacing } from "../../const/sizes";
import DatePicker from "../../components/input/DatePicker";

export default function Presensi() {
  const today = new Date().toDateString();

  // Filter Config
  const [filterConfig, setFilterConfig] = useState<any>({
    search: "",
    unit_kerja: [],
    status_karyawan: [],
    tgl: "",
  });
  const confirmDate = (newDate: string) => {
    setFilterConfig((ps: any) => ({ ...ps, tgl: newDate }));
  };
  useEffect(() => {
    confirmDate(today);
  }, [today]);

  return (
    <>
      <PresensiSummary />

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
