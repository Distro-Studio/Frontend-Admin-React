import { HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ExportModal from "../../components/dependent/ExportModal";
import SearchComponent from "../../components/dependent/input/SearchComponent";
import TabelTransferKarywan from "../../components/dependent/TabelTransferKaryawan";
import AjukanTransferKaryawanModal from "../../components/independent/AjukanTransferKaryawanModal";
import FilterKaryawan from "../../components/independent/FilterKaryawan";
import TransferKaryawanTableColumnsConfig from "../../components/independent/TransferKaryawanTableColumnsConfig";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useLightDarkColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";
import useFilterKaryawan from "../../global/useFilterKaryawan";

export default function TransferKaryawan() {
  // Filter Config
  const { filterKaryawan, setFilterKaryawan } = useFilterKaryawan();
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
      <CWrapper overflowY={"auto"}>
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
              flex={"1 0 200px"}
              name="search"
              onChangeSetter={(input) => {
                setSearch(input);
              }}
              inputValue={search}
            />

            <FilterKaryawan />

            <TransferKaryawanTableColumnsConfig />

            <ExportModal url="" title="Export Transfer Karyawan" />

            <AjukanTransferKaryawanModal w={"max-content"} />
          </HStack>

          <TabelTransferKarywan />
        </CContainer>
      </CWrapper>
    </>
  );
}
