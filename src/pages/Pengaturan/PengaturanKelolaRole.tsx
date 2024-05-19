import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Wrap,
} from "@chakra-ui/react";
import { RiDownloadLine, RiSearchLine, RiUploadLine } from "@remixicon/react";
import { useState } from "react";
import TabelKelolaRole from "../../components/dependent/Pengaturan/Tabel/TabelKelolaRole";
import AjukanCutiModal from "../../components/independent/Karyawan/AjukanCutiModal";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import pengaturanTopNavs from "../../const/pengaturanTopNavs";
import { iconSize, responsiveSpacing } from "../../const/sizes";
import { Link } from "react-router-dom";

export default function PengaturanKelolaRole() {
  // Filter Config
  const defaultFilterConfig = {
    search: "",
  };
  const [filterConfig, setFilterConfig] = useState<any>(defaultFilterConfig);

  return (
    <>
      <CWrapper>
        <Wrap spacing={responsiveSpacing} align={"flex-start"}>
          <CContainer
            p={4}
            bg={useBodyColor()}
            borderRadius={12}
            flex={"0 1 230px"}
            maxW={"230px"}
            gap={2}
          >
            {pengaturanTopNavs[0].subNavs?.map((nav, i) => (
              <Button
                key={i}
                justifyContent={"flex-start"}
                className={i === 0 ? "btn-apa clicky" : "btn clicky"}
                fontWeight={500}
                as={Link}
                to={nav.link}
                h={"50px"}
              >
                {nav.label}
              </Button>
            ))}
          </CContainer>

          <CContainer
            p={responsiveSpacing}
            bg={useBodyColor()}
            borderRadius={12}
            flex={"1 1"}
          >
            <Wrap w={"100%"} mb={responsiveSpacing} className="tabelConfig">
              <InputGroup flex={"1 1 200px"}>
                <InputLeftElement>
                  <Icon as={RiSearchLine} color={"p.500"} fontSize={iconSize} />
                </InputLeftElement>
                <Input
                  placeholder="Pencarian"
                  flex={"1 1 0"}
                  onChange={(e) => {
                    setFilterConfig((ps: any) => ({
                      ...ps,
                      search: e.target.value,
                    }));
                  }}
                  value={filterConfig.search}
                />
              </InputGroup>

              <Button
                flex={"1 1 110px"}
                variant={"outline"}
                colorScheme="ap"
                className="clicky"
                rightIcon={<Icon as={RiUploadLine} fontSize={iconSize} />}
              >
                Export
              </Button>

              <Button
                flex={"1 1 110px"}
                variant={"outline"}
                colorScheme="ap"
                className="clicky"
                rightIcon={<Icon as={RiDownloadLine} fontSize={iconSize} />}
              >
                Import
              </Button>

              <AjukanCutiModal flex={"1 1 220px"} />
            </Wrap>

            <TabelKelolaRole filterConfig={filterConfig} />
          </CContainer>
        </Wrap>
      </CWrapper>
    </>
  );
}
