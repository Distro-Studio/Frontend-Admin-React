import { HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ExportModal from "../../components/dependent/ExportModal";
import NumberInput from "../../components/dependent/input/NumberInput";
import SearchComponent from "../../components/dependent/input/SearchComponent";
import TabelDiklat from "../../components/dependent/TabelDiklat";
import TambahAcaraDiklat from "../../components/independent/TambahAcaraDiklat";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useLightDarkColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";

export default function Diklat() {
  // Filter Config
  const defaultFilterConfig = {
    search: "",
    tahun: new Date().getFullYear(),
  };
  const [filterConfig, setFilterConfig] = useState<any>(defaultFilterConfig);
  const [search, setSearch] = useState("");
  const [tahun, setTahun] = useState<any>(new Date().getFullYear());

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilterConfig({ search: search, tahun: tahun });
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search, tahun, setFilterConfig]);

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

            <NumberInput
              name="search"
              onChangeSetter={(input) => {
                setTahun(input);
              }}
              inputValue={tahun}
              placeholder={"Periode Tahun"}
              noFormat
              flex={"1 1 320px"}
            />

            <ExportModal url="" title="Export Penggajian" />

            <TambahAcaraDiklat minW={"fit-content"} />
          </HStack>

          <TabelDiklat filterConfig={filterConfig} />
        </CContainer>
      </CWrapper>
    </>
  );
}
