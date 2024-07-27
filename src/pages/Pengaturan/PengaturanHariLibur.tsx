import { Wrap } from "@chakra-ui/react";
import { useState } from "react";
import SearchComponent from "../../components/dependent/SearchComponent";
import TabelHariLibur from "../../components/dependent/TabelPengaturanHariLibur";
import TambahHariLibur from "../../components/independent/TambahHariLibur";
import CContainer from "../../components/wrapper/CContainer";
import { useBodyColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";

export default function PengaturanHariLibur() {
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
      <Wrap w={"100%"} mb={responsiveSpacing} className="tabelConfig">
        <SearchComponent
          search={filterConfig.search}
          setSearch={(newSearch) => {
            setFilterConfig((ps: any) => ({ ...ps, search: newSearch }));
          }}
        />

        <TambahHariLibur minW={"fit-content"} />
      </Wrap>

      <TabelHariLibur filterConfig={filterConfig} />
    </CContainer>
  );
}
