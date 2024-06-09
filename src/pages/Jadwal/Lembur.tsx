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
import SelectKompensasi from "../../components/dependent/_Select/SelectKompensasi";
import TabelLembur from "../../components/dependent/Karyawan/TabelLembur";
import AjukanLemburModal from "../../components/independent/Karyawan/AjukanLemburModal";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { iconSize, responsiveSpacing } from "../../const/sizes";

export default function Lembur() {
  // Filter Config
  const defaultFilterConfig = {
    search: "",
    kompensasi: {
      value: 0,
      label: "Semua kompensasi",
    },
  };
  const [filterConfig, setFilterConfig] = useState<any>(defaultFilterConfig);
  const confirmSelectStatusPenukaranJadwal = (newKompensasi: any) => {
    setFilterConfig((ps: any) => ({
      ...ps,
      kompensasi: newKompensasi,
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

            <SelectKompensasi
              placeholder="Pilih Kompensasi"
              initialSelected={filterConfig.kompensasi}
              confirmSelect={confirmSelectStatusPenukaranJadwal}
              noSearch
              noReset
              flex={"1 1 110px"}
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

            <AjukanLemburModal flex={"1 1 220px"} />
          </Wrap>

          <TabelLembur filterConfig={filterConfig} />
        </CContainer>
      </CWrapper>
    </>
  );
}
