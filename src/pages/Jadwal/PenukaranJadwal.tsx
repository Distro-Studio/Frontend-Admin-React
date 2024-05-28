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
import SelectStatusPenukaranJadwal from "../../components/dependent/_Select/SelectStatusPenukaranJadwal";
import TabelTukarJadwal from "../../components/dependent/Karyawan/Tabel/TabelTukarJadwal";
import AjukanPenukaranJadwalModal from "../../components/independent/Karyawan/AjukanPenukaranJadwalModal";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { iconSize, responsiveSpacing } from "../../const/sizes";

export default function PenukaranJadwal() {
  // Filter Config
  const defaultFilterConfig = {
    search: "",
    status: 0,
  };
  const [filterConfig, setFilterConfig] = useState<any>(defaultFilterConfig);
  const confirmSelectStatusPenukaranJadwal = (status: any) => {
    setFilterConfig((ps: any) => ({
      ...ps,
      status: status,
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

            <SelectStatusPenukaranJadwal
              placeholder="Pilih status"
              initialSelected={{
                value: filterConfig.status,
                label: "Semua status",
              }}
              confirmSelect={confirmSelectStatusPenukaranJadwal}
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

            <AjukanPenukaranJadwalModal flex={"1 1 220px"} />
          </Wrap>

          <TabelTukarJadwal filterConfig={filterConfig} />
        </CContainer>
      </CWrapper>
    </>
  );
}
