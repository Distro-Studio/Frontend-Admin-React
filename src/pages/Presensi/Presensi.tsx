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
import ImportKaryawanModal from "../../components/independent/Karyawan/ImportKaryawanModal";
import PresensiTotal from "../../components/independent/Karyawan/PresensiTotal";
import TabelKaryawan from "../../components/dependent/Karyawan/Tabel/TabelKaryawan";
import DatePicker from "../../components/input/DatePicker";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { iconSize, responsiveSpacing } from "../../const/sizes";

export default function Presensi() {
  const today = new Date();

  // Filter Config
  const defaultFilterConfig = {
    search: "",
    unit_kerja: [],
    status_karyawan: [],
    tanggal: [today],
  };
  const [filterConfig, setFilterConfig] = useState<any>(defaultFilterConfig);
  const confirmDate = (newDate: string) => {
    setFilterConfig((ps: any) => ({ ...ps, tanggal: [newDate] }));
  };

  return (
    <>
      <CWrapper>
        <PresensiTotal mb={responsiveSpacing} />

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
              flex={"1 1 200px"}
              confirmDate={confirmDate}
              dateValue={filterConfig.tanggal}
              defaultDateSelected={today}
              dateFormatOptions={{
                year: "numeric",
                month: "long",
                day: "numeric",
              }}
            />

            <FilterTabelKaryawan
              defaultFilterConfig={defaultFilterConfig}
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
