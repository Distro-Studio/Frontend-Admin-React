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
import SelectStatusCuti from "../../components/dependent/_Select/SelectStatusCuti";
import SelectTipeCuti from "../../components/dependent/_Select/SelectTipeCuti";
import TabelCuti from "../../components/dependent/Karyawan/TabelCuti";
import AjukanCutiModal from "../../components/independent/Karyawan/AjukanCutiModal";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { iconSize, responsiveSpacing } from "../../const/sizes";

export default function Cuti() {
  // Filter Config
  const defaultFilterConfig = {
    search: "",
    tipe: {
      value: 0,
      label: "Semua Tipe Cuti",
    },
    status: {
      value: 0,
      label: "Semua Status",
    },
    kompensasi: "",
  };
  const [filterConfig, setFilterConfig] = useState<any>(defaultFilterConfig);
  const confirmTipeCuti = (newTipe: any) => {
    setFilterConfig((ps: any) => ({
      ...ps,
      tipe: newTipe,
    }));
  };
  const confirmStatusCuti = (newStatus: any) => {
    setFilterConfig((ps: any) => ({
      ...ps,
      status: newStatus,
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

            <SelectTipeCuti
              placeholder="Pilih Tipe"
              initialSelected={filterConfig.tipe}
              confirmSelect={confirmTipeCuti}
              noSearch
              flex={"1 1 160px"}
              noReset
            />

            <SelectStatusCuti
              placeholder="Pilih Status"
              initialSelected={filterConfig.status}
              confirmSelect={confirmStatusCuti}
              noSearch
              flex={"1 1 160px"}
              noReset
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

            <AjukanCutiModal flex={"1 1 220px"} />
          </Wrap>

          <TabelCuti filterConfig={filterConfig} />
        </CContainer>
      </CWrapper>
    </>
  );
}
