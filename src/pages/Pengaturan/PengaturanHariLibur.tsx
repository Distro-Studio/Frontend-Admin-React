import { HStack } from "@chakra-ui/react";
import { useState } from "react";
import SearchComponent from "../../components/dependent/input/SearchComponent";
import TabelHariLibur from "../../components/dependent/TabelPengaturanHariLibur";
import TambahHariLibur from "../../components/independent/TambahHariLibur";
import CContainer from "../../components/wrapper/CContainer";
import { useLightDarkColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";

export default function PengaturanHariLibur() {
  // SX
  const lightDarkColor = useLightDarkColor();

  // Filter Config
  const defaultFilterConfig = {
    search: "",
  };
  const [filterConfig, setFilterConfig] = useState<any>(defaultFilterConfig);

  return (
    <CContainer
      px={responsiveSpacing}
      pb={responsiveSpacing}
      bg={lightDarkColor}
      borderRadius={12}
      flex={"1 1 600px"}
      h={"100%"}
      overflowY={"auto"}
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
        <TambahHariLibur minW={"fit-content"} />
      </HStack>

      <TabelHariLibur filterConfig={filterConfig} />
    </CContainer>
  );
}
