import { HStack } from "@chakra-ui/react";
import { useState } from "react";
import SearchComponent from "../../components/dependent/input/SearchComponent";
import TabelTerPph21 from "../../components/dependent/TabelPengaturanTerPph21";
import TambahTerPph21 from "../../components/independent/TambahTerPph21";
import CContainer from "../../components/wrapper/CContainer";
import { useLightDarkColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";
import MultiSelectPengaturanDeletedAt from "../../components/dependent/MultiSelectPengaturanDeletedAt";

export default function PengaturanTerPph21() {
  // Filter Config
  const defaultFilterConfig = {
    search: "",
    is_deleted: [],
  };
  const [filterConfig, setFilterConfig] = useState<any>(defaultFilterConfig);

  // SX
  const lightDarkColor = useLightDarkColor();

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

        <MultiSelectPengaturanDeletedAt
          name="is_deleted"
          onConfirm={(input) => {
            setFilterConfig((ps: any) => ({
              ...ps,
              is_deleted: input,
            }));
          }}
          inputValue={filterConfig.is_deleted}
          optionsDisplay="chip"
          placeholder="Filter Dihapus"
          maxW={"165px"}
        />

        <TambahTerPph21 minW={"fit-content"} />
      </HStack>

      <TabelTerPph21 filterConfig={filterConfig} />
    </CContainer>
  );
}
