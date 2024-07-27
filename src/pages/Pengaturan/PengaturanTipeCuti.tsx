import { Wrap } from "@chakra-ui/react";
import { useState } from "react";
import SearchComponent from "../../components/dependent/SearchComponent";
import TabelPengaturanCuti from "../../components/dependent/TabelPengaturanCuti";
import TambahCuti from "../../components/independent/TambahCuti";
import CContainer from "../../components/wrapper/CContainer";
import { useBodyColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";

export default function PengaturanTipeCuti() {
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

        <TambahCuti minW={"fit-content"} />
      </Wrap>

      <TabelPengaturanCuti filterConfig={filterConfig} />
    </CContainer>
  );
}
