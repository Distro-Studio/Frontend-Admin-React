import { HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ExportModal from "../../components/dependent/ExportModal";
import ImportModal from "../../components/dependent/ImportModal";
import SearchComponent from "../../components/dependent/input/SearchComponent";
import TabelKaryawan from "../../components/dependent/TabelKaryawan";
import TambahKaryawanModal from "../../components/dependent/TambahKaryawanModal";
import FilterKaryawan from "../../components/independent/FilterKaryawan";
import TableColumnConfigModal from "../../components/independent/TabelKaryawanColumnConfigModal";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useLightDarkColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";
import useFilterKaryawan from "../../global/useFilterKaryawan";

export default function Karyawan() {
  // Filter Config
  const { setFilterKaryawan } = useFilterKaryawan();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilterKaryawan((ps: any) => ({
        ...ps,
        search: search,
      }));
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search, setFilterKaryawan]);

  // SX
  const lightDarkColor = useLightDarkColor();

  return (
    <>
      <CWrapper overflowY={"auto"}>
        <CContainer
          flex={1}
          px={responsiveSpacing}
          pb={responsiveSpacing}
          pt={0}
          bg={lightDarkColor}
          borderRadius={12}
          overflowY={"auto"}
        >
          <HStack
            py={responsiveSpacing}
            justify={"space-between"}
            w={"100%"}
            className="tabelConfig noScroll"
            overflowX={"auto"}
            flexShrink={0}
          >
            <SearchComponent
              flex={"1 0 200px"}
              name="search"
              onChangeSetter={(input) => {
                setSearch(input);
              }}
              inputValue={search}
            />

            <FilterKaryawan />

            <TableColumnConfigModal title="Config Kolom Tabel Karyawan" />

            <ExportModal url={""} title={"Export Karyawan"} px={6} />

            <ImportModal url={""} title={"Import Karyawan"} px={6} />

            <TambahKaryawanModal w={"max-content"} />
          </HStack>

          <TabelKaryawan />
        </CContainer>
      </CWrapper>
    </>
  );
}
