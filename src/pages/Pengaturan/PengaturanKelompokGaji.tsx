import { HStack, Wrap } from "@chakra-ui/react";
import { useState } from "react";
import TabelKelompokGaji from "../../components/dependent/TabelPengaturanKelompokGaji";
import SearchComponent from "../../components/dependent/input/SearchComponent";
import TambahKelompokGaji from "../../components/independent/TambahKelompokGaji";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useLightDarkColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";
import PengaturanNavs from "../../components/dependent/PengaturanNavs";
import MultiSelectPengaturanDeletedAt from "../../components/dependent/MultiSelectPengaturanDeletedAt";

export default function PengaturanKelompokGaji() {
  // Filter Config
  const defaultFilterConfig = {
    search: "",
    is_deleted: [],
  };
  const [filterConfig, setFilterConfig] = useState<any>(defaultFilterConfig);

  // SX
  const lightDarkColor = useLightDarkColor();

  return (
    <>
      <CWrapper>
        <Wrap
          borderRadius={12}
          overflowY={"auto"}
          className="scrollY"
          align={"start"}
          pt={0}
          spacing={responsiveSpacing}
        >
          <PengaturanNavs activeGroup={1} active={0} />

          <CContainer
            px={responsiveSpacing}
            pb={responsiveSpacing}
            pt={0}
            h={"100%"}
            overflowY={"auto"}
            className="scrollY"
            bg={lightDarkColor}
            borderRadius={12}
            flex={"1 1 600px"}
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

              <TambahKelompokGaji minW={"fit-content"} />
            </HStack>

            <TabelKelompokGaji filterConfig={filterConfig} />
          </CContainer>
        </Wrap>
      </CWrapper>
    </>
  );
}
