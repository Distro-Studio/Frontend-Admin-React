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
import TabelRekamJejak from "../../components/independent/Karyawan/TabelRekamJejak";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import karyawanTopNavs from "../../const/karyawanTopNavs";
import { iconSize, responsiveSpacing } from "../../const/sizes";

export default function RekamJejak() {
  // Filter Config
  const [filterConfig, setFilterConfig] = useState<any>({
    search: "",
    unit_kerja: [],
    status_karyawan: [],
  });

  return (
    <>
      <TopNavs data={karyawanTopNavs} active={4} mb={responsiveSpacing} />

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

            <Button
              flex={"1 1 110px"}
              variant={"outline"}
              colorScheme="ap"
              className="clicky"
              rightIcon={<Icon as={RiUploadLine} fontSize={iconSize} />}
            >
              Import
            </Button>
          </Wrap>

          <TabelRekamJejak filterConfig={filterConfig} />
        </CContainer>
      </CWrapper>
    </>
  );
}
