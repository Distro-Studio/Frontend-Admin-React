import { Button, HStack, Icon } from "@chakra-ui/react";
import { RiAddBoxFill, RiTableLine } from "@remixicon/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ExportModal from "../../components/dependent/ExportModal";
import ImportModal from "../../components/dependent/ImportModal";
import SearchComponent from "../../components/dependent/input/SearchComponent";
import TabelKaryawan from "../../components/dependent/TabelKaryawan";
import FilterKaryawan from "../../components/independent/FilterKaryawan";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useLightDarkColor } from "../../const/colors";
import { iconSize, responsiveSpacing } from "../../const/sizes";
import useFilterKaryawan from "../../global/useFilterKaryawan";

export default function Karyawan() {
  // Filter Config
  const { filterKaryawan, setFilterKaryawan } = useFilterKaryawan();
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
            pt={responsiveSpacing}
            justify={"space-between"}
            w={"100%"}
            mb={responsiveSpacing}
            className="tabelConfig noScroll"
            overflowX={"auto"}
            flexShrink={0}
          >
            <HStack>
              <SearchComponent
                flex={"1 1 140px"}
                name="search"
                onChangeSetter={(input) => {
                  setSearch(input ? input : "");
                }}
                inputValue={filterKaryawan.search}
              />

              <FilterKaryawan px={6} />

              <Button
                className="btn-outline clicky"
                leftIcon={<Icon as={RiTableLine} fontSize={iconSize} />}
                _focus={{ border: "1px solid var(--p500)" }}
                flexShrink={0}
                pl={"18px !important"}
              >
                Kolom
              </Button>
            </HStack>

            <HStack>
              <ExportModal url={""} label={"Export Karyawan"} px={6} />

              <ImportModal url={""} label={"Import Karyawan"} px={6} />

              <Button
                flex={"1 0 120px"}
                colorScheme="ap"
                className="btn-ap clicky"
                leftIcon={<Icon as={RiAddBoxFill} fontSize={iconSize} />}
                as={Link}
                to={"/karyawan/tambah-karyawan"}
              >
                Tambah
              </Button>
            </HStack>
          </HStack>

          <TabelKaryawan />
        </CContainer>
      </CWrapper>
    </>
  );
}
