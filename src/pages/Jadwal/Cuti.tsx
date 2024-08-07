import { HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MultiSelectStatusCuti from "../../components/dependent/_Select/MultiSelectStatusCuti";
import MultiSelectTipeCuti from "../../components/dependent/_Select/MultiSelectTipeCuti";
import ExportModal from "../../components/dependent/ExportModal";
import SearchComponent from "../../components/dependent/input/SearchComponent";
import TabelCuti from "../../components/dependent/TabelCuti";
import AjukanCutiModal from "../../components/independent/AjukanCutiModal";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useLightDarkColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";
import useFilterKaryawan from "../../global/useFilterKaryawan";

export default function Cuti() {
  // Filter Config
  const { filterKaryawan, setFilterKaryawan } = useFilterKaryawan();
  const [filterConfig, setFilterConfig] = useState({
    ...filterKaryawan,
    status_cuti: undefined,
    jenis_cuti: undefined,
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilterKaryawan({ search });
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search, setFilterKaryawan]);

  useEffect(() => {
    console.log("Current filterKaryawan state:", filterKaryawan);
  }, [filterKaryawan]);

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

            <MultiSelectTipeCuti
              name={"jenis_cuti"}
              minW={"fit-content"}
              maxW={"165px !important"}
              placeholder="Filter Tipe Cuti"
              onConfirm={(input: any) => {
                setFilterConfig((ps: any) => ({
                  ...ps,
                  jenis_cuti: input,
                }));
              }}
              inputValue={filterConfig.jenis_cuti}
              optionsDisplay="chip"
              pr={5}
              maxSelectedDisplay={1}
            />

            <MultiSelectStatusCuti
              name={"status_cuti"}
              minW={"fit-content"}
              maxW={"165px !important"}
              placeholder="Filter Status Cuti"
              onConfirm={(input: any) => {
                setFilterConfig((ps: any) => ({
                  ...ps,
                  status_cuti: input,
                }));
              }}
              inputValue={filterConfig.status_cuti}
              optionsDisplay="chip"
              pr={5}
              maxSelectedDisplay={1}
            />

            <ExportModal url="" title="Export Cuti" />

            <AjukanCutiModal minW={"fit-content"} />
          </HStack>

          <TabelCuti filterConfig={filterConfig} />
        </CContainer>
      </CWrapper>
    </>
  );
}
