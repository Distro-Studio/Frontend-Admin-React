import { Wrap } from "@chakra-ui/react";
import { useState } from "react";
import SearchComponent from "../../components/dependent/SearchComponent";
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
    >
      <Wrap w={"100%"} mb={responsiveSpacing} className="tabelConfig">
        <SearchComponent
          search={filterConfig.search}
          setSearch={(newSearch) => {
            setFilterConfig((ps: any) => ({ ...ps, search: newSearch }));
          }}
        />

        <TambahShift minW={"fit-content"} />
      </Wrap>

      <TabelShift filterConfig={filterConfig} />
    </CContainer>
  );
}
