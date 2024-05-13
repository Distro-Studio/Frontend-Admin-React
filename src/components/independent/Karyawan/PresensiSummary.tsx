import { HStack, Text, VStack, Wrap } from "@chakra-ui/react";
import { responsiveSpacing } from "../../../const/sizes";
import CWrapper from "../../wrapper/CWrapper";

export default function PresensiSummary() {
  return (
    <CWrapper mb={responsiveSpacing}>
      <Wrap spacing={responsiveSpacing}>
        <VStack
          borderRadius={8}
          px={responsiveSpacing}
          py={[4, null, 5]}
          bg={"var(--p500a4)"}
          align={"flex-start"}
          flex={"1 1"}
        >
          <Text fontWeight={600}>Hadir</Text>

          <HStack gap={4} justify={"space-between"} w={"100%"}>
            <VStack align={"flex-start"} flex={"1 1"}>
              <Text fontSize={32} fontWeight={600} color={"p.500"}>
                0
              </Text>
              <Text fontSize={14} opacity={0.6} whiteSpace={"nowrap"}>
                Tepat Waktu
              </Text>
            </VStack>

            <VStack align={"flex-start"} flex={"1 1"}>
              <Text fontSize={32} fontWeight={600} color={"p.500"}>
                0
              </Text>
              <Text fontSize={14} opacity={0.6} whiteSpace={"nowrap"}>
                Terlambat
              </Text>
            </VStack>

            <VStack align={"flex-start"} flex={"1 1"}>
              <Text fontSize={32} fontWeight={600} color={"p.500"}>
                0
              </Text>
              <Text fontSize={14} opacity={0.6} whiteSpace={"nowrap"}>
                Masuk
              </Text>
            </VStack>
          </HStack>
        </VStack>

        <VStack
          borderRadius={8}
          px={responsiveSpacing}
          py={[4, null, 5]}
          bg={"var(--reda)"}
          align={"flex-start"}
          flex={"1 1"}
        >
          <Text fontWeight={600}>Tidak Hadir</Text>

          <HStack gap={4} justify={"space-between"} w={"100%"}>
            <VStack align={"flex-start"} flex={"1 1"}>
              <Text fontSize={32} fontWeight={600} color={"red.400"}>
                0
              </Text>
              <Text fontSize={14} opacity={0.6} whiteSpace={"nowrap"}>
                Absen
              </Text>
            </VStack>

            <VStack align={"flex-start"} flex={"1 1"}>
              <Text fontSize={32} fontWeight={600} color={"red.400"}>
                0
              </Text>
              <Text fontSize={14} opacity={0.6} whiteSpace={"nowrap"}>
                Izin
              </Text>
            </VStack>

            <VStack align={"flex-start"} flex={"1 1"}>
              <Text fontSize={32} fontWeight={600} color={"red.400"}>
                0
              </Text>
              <Text fontSize={14} opacity={0.6} whiteSpace={"nowrap"}>
                Invalid
              </Text>
            </VStack>
          </HStack>
        </VStack>

        <VStack
          borderRadius={8}
          px={responsiveSpacing}
          py={[4, null, 5]}
          bg={"var(--divider)"}
          align={"flex-start"}
          flex={"1 1"}
        >
          <Text fontWeight={600}>Libur</Text>

          <HStack gap={4} justify={"space-between"} w={"100%"}>
            <VStack align={"flex-start"} flex={"1 1"}>
              <Text
                fontSize={32}
                fontWeight={600}
                color={"var(--divider-text)"}
              >
                0
              </Text>
              <Text fontSize={14} opacity={0.6} whiteSpace={"nowrap"}>
                Hari Libur
              </Text>
            </VStack>

            <VStack align={"flex-start"} flex={"1 1"}>
              <Text
                fontSize={32}
                fontWeight={600}
                color={"var(--divider-text)"}
              >
                0
              </Text>
              <Text fontSize={14} opacity={0.6} whiteSpace={"nowrap"}>
                Cuti
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </Wrap>
    </CWrapper>
  );
}
