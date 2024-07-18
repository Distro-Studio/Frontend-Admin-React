import { Button, Icon, Wrap } from "@chakra-ui/react";
import { RiUploadLine } from "@remixicon/react";
import { useState } from "react";
import SelectStatusPenukaranJadwal from "../../components/dependent/_Select/SelectStatusPenukaranJadwal";
import TabelTukarJadwal from "../../components/dependent/TabelTukarJadwal";
import SearchComponent from "../../components/dependent/SearchComponent";
import AjukanPenukaranJadwalModal from "../../components/independent/AjukanPenukaranJadwalModal";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { iconSize, responsiveSpacing } from "../../const/sizes";

export default function PenukaranJadwal() {
  // Filter Config
  const defaultFilterConfig = {
    search: "",
    status: "",
  };
  const [filterConfig, setFilterConfig] = useState<any>(defaultFilterConfig);
  const confirmSelectStatusPenukaranJadwal = (newStatus: any) => {
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
            <SearchComponent
              search={filterConfig.search}
              setSearch={(newSearch) => {
                setFilterConfig((ps: any) => ({
                  ...ps,
                  search: newSearch,
                }));
              }}
            />

            <SelectStatusPenukaranJadwal
              placeholder="Pilih Status Penukaran Jadwal"
              initialSelected={filterConfig.status}
              confirmSelect={confirmSelectStatusPenukaranJadwal}
              noSearch
              flex={"1 1 110px"}
              nullLabel={"Semua Status Penukaran Jadwal"}
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
