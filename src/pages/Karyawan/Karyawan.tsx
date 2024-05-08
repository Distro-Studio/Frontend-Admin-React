import {
  Button,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import TopNavs from "../../components/dependent/TopNavs";
import CWrapper from "../../components/wrapper/CWrapper";
import karyawanTopNavs from "../../const/karyawanTopNavs";
import { RiArrowDownSLine, RiSearchLine } from "@remixicon/react";
import CContainer from "../../components/wrapper/CContainer";
import { iconSize, responsiveSpacing } from "../../const/sizes";
import { useBodyColor } from "../../const/colors";

export default function Karyawan() {
  return (
    <>
      <TopNavs data={karyawanTopNavs} active={0} mb={4} />

      <CContainer px={responsiveSpacing}>
        <CWrapper bg={useBodyColor()} borderRadius={12}>
          <Stack
            flexDir={["column", null, "row"]}
            py={responsiveSpacing}
            justify={"space-between"}
          >
            <HStack>
              <InputGroup>
                <InputLeftElement>
                  <Icon as={RiSearchLine} color={"p.500"} fontSize={iconSize} />
                </InputLeftElement>
                <Input placeholder="Pencarian" />
              </InputGroup>

              <Button
                variant={"outline"}
                colorScheme="ap"
                className="clicky"
                rightIcon={<Icon as={RiArrowDownSLine} fontSize={iconSize} />}
                flexShrink={0}
                pr={3}
              >
                Filter
              </Button>
            </HStack>

            <HStack>
              <Button variant={"outline"} colorScheme="ap" className="clicky">
                Export
              </Button>
              <Button variant={"outline"} colorScheme="ap" className="clicky">
                Import
              </Button>
              <Button colorScheme="ap" className="btn-ap clicky">
                Tambah Karyawan
              </Button>
            </HStack>
          </Stack>
        </CWrapper>
      </CContainer>
    </>
  );
}
