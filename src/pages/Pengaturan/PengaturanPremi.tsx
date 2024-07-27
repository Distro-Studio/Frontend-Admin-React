import { Button, Icon, Wrap } from "@chakra-ui/react";
import { RiDownloadLine, RiUploadLine } from "@remixicon/react";
import { useState } from "react";
import SearchComponent from "../../components/dependent/SearchComponent";
import TabelPremi from "../../components/dependent/TabelPengaturanPremi";
import TambahPremi from "../../components/independent/TambahPremi";
import CContainer from "../../components/wrapper/CContainer";
import { useBodyColor } from "../../const/colors";
import { iconSize, responsiveSpacing } from "../../const/sizes";

export default function PengaturanPremi() {
  // Filter Config
  const defaultFilterConfig = {
    search: "",
  };
  const [filterConfig, setFilterConfig] = useState<any>(defaultFilterConfig);

  return (
    <CContainer
      p={responsiveSpacing}
      bg={useBodyColor()}
      borderRadius={12}
      flex={"1 1 600px"}
      overflowX={"auto"}
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

        <TambahPremi flex={"1 1 180px"} />
      </Wrap>

      <TabelPremi filterConfig={filterConfig} />
    </CContainer>
  );
}
