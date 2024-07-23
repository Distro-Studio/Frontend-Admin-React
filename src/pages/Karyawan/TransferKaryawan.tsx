import { Wrap } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ExportModal from "../../components/dependent/ExportModal";
import SearchComponent from "../../components/dependent/input/SearchComponent";
import TabelTransferKarywan from "../../components/dependent/TabelTransferKaryawan";
import AjukanTransferKaryawanModal from "../../components/independent/AjukanTransferKaryawanModal";
import FilterKaryawan from "../../components/independent/FilterKaryawan";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";
import useFilterKaryawan from "../../global/useFilterKaryawan";
import TransferKaryawanTableColumnsConfig from "../../components/independent/TransferKaryawanTableColumnsConfig";

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

  return (
    <>
      <CWrapper overflowY={"auto"}>
        <CContainer
          overflowY={"auto"}
          p={responsiveSpacing}
          bg={useBodyColor()}
          borderRadius={12}
        >
          <Wrap w={"100%"} mb={responsiveSpacing} className="tabelConfig">
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
          </Wrap>

          <TabelTransferKarywan />
        </CContainer>
      </CWrapper>
    </>
  );
}
