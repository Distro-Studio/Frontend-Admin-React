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
import TabelTransferKarywan from "../../components/dependent/Karyawan/TabelTransferKaryawan";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { iconSize, responsiveSpacing } from "../../const/sizes";
import AjukanTransferKaryawan from "../../components/independent/Karyawan/AjukanTransferKaryawan";
import SelectStatusTransferKaryawan from "../../components/dependent/_Select/SelectStatusTransferKaryawan";

export default function TransferKaryawan() {
  // Filter Config
  const defaultFilterConfig = {
    search: "",
    unit_kerja: [],
    status_karyawan: [],
    status_transfer: {
      value: null,
      label: "Semua status",
    },
  };
  const confirmSelectStatusTransferKaryawan = (newStatus: any) => {
    setFilterConfig((ps: any) => ({
      ...ps,
      status_transfer: newStatus,
    }));
  };
  const [filterConfig, setFilterConfig] = useState<any>(defaultFilterConfig);

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

            <SelectStatusTransferKaryawan
              placeholder="Pilih Status Transfer"
              initialSelected={filterConfig.status_transfer}
              confirmSelect={confirmSelectStatusTransferKaryawan}
              noSearch
              noReset
              flex={"1 1 110px"}
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

            <AjukanTransferKaryawan flex={"1 1 170px"} />
          </Wrap>

          <TabelTransferKarywan filterConfig={filterConfig} />
        </CContainer>
      </CWrapper>
    </>
  );
}
