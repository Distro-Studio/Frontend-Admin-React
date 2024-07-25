import { Button, Icon, Wrap } from "@chakra-ui/react";
import { RiDownloadLine, RiUploadLine } from "@remixicon/react";
import { useState } from "react";
import PengaturanNavs from "../../components/dependent/PengaturanNavs";
import SearchComponent from "../../components/dependent/SearchComponent";
import TabelKelolaRole from "../../components/dependent/TabelPengaturanKelolaRole";
import TambahRole from "../../components/independent/TambahRole";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { iconSize, responsiveSpacing } from "../../const/sizes";

export default function PengaturanKelolaRole() {
  // Filter Config
  const defaultFilterConfig = {
    search: "",
  };
  const [filterConfig, setFilterConfig] = useState<any>(defaultFilterConfig);

  return (
    <>
      <CWrapper>
        <Wrap spacing={responsiveSpacing} align={"flex-start"}>
          <PengaturanNavs activeTopNavs={0} active={0} />

          <CContainer
            p={responsiveSpacing}
            bg={useBodyColor()}
            borderRadius={12}
            flex={"1 1 600px"}
          >
            <Wrap w={"100%"} mb={responsiveSpacing} className="tabelConfig">
              <SearchComponent
                search={filterConfig.search}
                setSearch={(newSearch) => {
                  setFilterConfig((ps: any) => ({ ...ps, search: newSearch }));
                }}
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
                rightIcon={<Icon as={RiDownloadLine} fontSize={iconSize} />}
              >
                Import
              </Button>

              <TambahRole flex={"1 1 180px"} />
            </Wrap>

            <TabelKelolaRole filterConfig={filterConfig} />
          </CContainer>
        </Wrap>
      </CWrapper>
    </>
  );
}
