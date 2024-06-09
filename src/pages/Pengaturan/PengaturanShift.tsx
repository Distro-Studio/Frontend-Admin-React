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
import { Link } from "react-router-dom";
import TabelShift from "../../components/dependent/Pengaturan/TabelPengaturanShift";
import TambahShift from "../../components/independent/Pengaturan/TambahShift";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import pengaturanTopNavs from "../../const/pengaturanTopNavs";
import { iconSize, responsiveSpacing } from "../../const/sizes";

export default function PengaturanShift() {
  // Filter Config
  const defaultFilterConfig = {
    search: "",
  };
  const [filterConfig, setFilterConfig] = useState<any>(defaultFilterConfig);

  return (
    <>
      <CWrapper>
        <Wrap w={"100%"} spacing={responsiveSpacing} align={"flex-start"}>
          <CContainer
            p={4}
            bg={useBodyColor()}
            borderRadius={12}
            w={"230px"}
            flexShrink={0}
            gap={2}
          >
            {pengaturanTopNavs[3].subNavs?.map((nav, i) => (
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
            flex={"1 1 600px"}
            overflowX={"auto"}
          >
            <Wrap w={"100%"} mb={responsiveSpacing} className="tabelConfig">
              <InputGroup flex={"1 1 165px"}>
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

              <TambahShift flex={"1 1 180px"} />
            </Wrap>

            <TabelShift filterConfig={filterConfig} />
          </CContainer>
        </Wrap>
      </CWrapper>
    </>
  );
}
