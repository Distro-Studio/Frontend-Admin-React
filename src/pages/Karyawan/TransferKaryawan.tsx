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
import TabelTransferKarywan from "../../components/dependent/Karyawan/Tabel/TabelTransferKaryawan";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { iconSize, responsiveSpacing } from "../../const/sizes";

export default function TransferKaryawan() {
  // Filter Config
  const defaultFilterConfig = {
    search: "",
    unit_kerja: [],
    status_karyawan: [],
  };
  const [filterConfig, setFilterConfig] = useState<any>(defaultFilterConfig);

  return (
    <>
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
          </Wrap>

          <TabelTransferKarywan filterConfig={filterConfig} />
        </CContainer>
      </CWrapper>
    </>
  );
}
