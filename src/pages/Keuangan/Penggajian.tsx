import { HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ExportModal from "../../components/dependent/ExportModal";
import SearchComponent from "../../components/dependent/input/SearchComponent";
import TabelRiwayatPenggajian from "../../components/dependent/TabelRiwayatPenggajian";
import BuatPenggajianModal from "../../components/independent/BuatPenggajianModal";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor, useLightDarkColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";

export default function Penggajian() {
  // Filter Config
  const defaultFilterConfig = {
    search: "",
  };
  const [filterConfig, setFilterConfig] = useState<any>(defaultFilterConfig);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilterConfig({ search });
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search, setFilterConfig]);

  useEffect(() => {
    console.log(filterConfig);
  }, [filterConfig]);

  // SX
  const lightDarkColor = useLightDarkColor();

  return (
    <>
      <CWrapper>
        <CContainer
          flex={1}
          px={responsiveSpacing}
          pb={responsiveSpacing}
          pt={0}
          bg={lightDarkColor}
          borderRadius={12}
          overflowY={"auto"}
          className="scrollY"
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
                setSearch(input);
              }}
              inputValue={search}
            />
            <ExportModal url="" title="Export Penggajian" />
            <ExportModal url="" title="Import Penggajian" />
            <BuatPenggajianModal minW={"fit-content"} />
          </HStack>

          <TabelRiwayatPenggajian filterConfig={filterConfig} />
        </CContainer>
      </CWrapper>
    </>
  );
}
