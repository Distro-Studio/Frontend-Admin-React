import { HStack } from "@chakra-ui/react";
import { useState } from "react";
import SearchComponent from "../../components/dependent/input/SearchComponent";
import TabelShift from "../../components/dependent/TabelPengaturanShift";
import TambahShift from "../../components/independent/TambahShift";
import CContainer from "../../components/wrapper/CContainer";
import { useBodyColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";

export default function PengaturanShift() {
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
      h={"100%"}
    >
      <HStack
        py={responsiveSpacing}
        justify={"space-between"}
        w={"100%"}
        className="tabelConfig scrollX"
        overflowX={"auto"}
        flexShrink={0}
      >
        <SearchComponent
          minW={"165px"}
          name="search"
          onChangeSetter={(input) => {
            setFilterConfig((ps: any) => ({
              ...ps,
              search: input,
            }));
          }}
          inputValue={filterConfig.search}
        />
        <TambahShift minW={"fit-content"} />
      </HStack>

      <TabelShift filterConfig={filterConfig} />
    </CContainer>
  );
}
