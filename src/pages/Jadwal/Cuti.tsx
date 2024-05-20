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
import SelectStatusCuti from "../../components/dependent/Karyawan/SelectStatusCuti";
import SelectTipeCuti from "../../components/dependent/Karyawan/SelectTipeCuti";
import TabelLembur from "../../components/dependent/Karyawan/Tabel/TabelLembur";
import AjukanCutiModal from "../../components/independent/Karyawan/AjukanCutiModal";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { iconSize, responsiveSpacing } from "../../const/sizes";

export default function Cuti() {
  // Filter Config
  const defaultFilterConfig = {
    search: "",
    status: 1,
    kompensasi: "",
  };
  const [filterConfig, setFilterConfig] = useState<any>(defaultFilterConfig);
  const confirmSelectStatusPenukaranJadwal = (status: any) => {
    setFilterConfig((ps: any) => ({
      ...ps,
      status: status.value,
    }));
  };

  return (
    <>
      <CWrapper>
        <CContainer p={4} bg={useBodyColor()} borderRadius={12}>
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

            <SelectTipeCuti
              placeholder="Pilih kompensasi"
              selectedValue={filterConfig.status}
              confirmSelect={confirmSelectStatusPenukaranJadwal}
              noSearch
              flex={"1 1 160px"}
            />

            <SelectStatusCuti
              placeholder="Pilih kompensasi"
              selectedValue={filterConfig.status}
              confirmSelect={confirmSelectStatusPenukaranJadwal}
              noSearch
              flex={"1 1 160px"}
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

          <TabelLembur filterConfig={filterConfig} />
        </CContainer>
      </CWrapper>
    </>
  );
}
