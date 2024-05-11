import {
  Button,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Wrap,
} from "@chakra-ui/react";
import {
  RiDownloadLine,
  RiEqualizer3Line,
  RiSearchLine,
  RiUploadLine,
} from "@remixicon/react";
import TopNavs from "../../components/dependent/TopNavs";
import TabelKaryawan from "../../components/independent/Karyawan/TabelKaryawan";
import CContainer from "../../components/wrapper/CContainer";
import CWrapper from "../../components/wrapper/CWrapper";
import { useBodyColor } from "../../const/colors";
import karyawanTopNavs from "../../const/karyawanTopNavs";
import { iconSize, responsiveSpacing } from "../../const/sizes";

export default function Karyawan() {
  return (
    <>
      <TopNavs data={karyawanTopNavs} active={0} mb={responsiveSpacing} />

      <CWrapper>
        <CContainer p={responsiveSpacing} bg={useBodyColor()} borderRadius={12}>
          <Wrap w={"100%"} mb={responsiveSpacing} className="tabelConfig">
            <InputGroup flex={"1 1 200px"}>
              <InputLeftElement>
                <Icon as={RiSearchLine} color={"p.500"} fontSize={iconSize} />
              </InputLeftElement>
              <Input placeholder="Pencarian" flex={"1 1 0"} />
            </InputGroup>

            <Button
              flex={"1 1 110px"}
              variant={"outline"}
              colorScheme="ap"
              className="clicky"
              rightIcon={<Icon as={RiEqualizer3Line} fontSize={iconSize} />}
              flexShrink={0}
              pr={3}
            >
              Filter
            </Button>

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

            <Button
              flex={"1 0 170px"}
              colorScheme="ap"
              className="btn-ap clicky"
            >
              Tambah Karyawan
            </Button>
          </Wrap>

          <TabelKaryawan />
        </CContainer>
      </CWrapper>
    </>
  );
}
