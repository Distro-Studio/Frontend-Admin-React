import { HStack, Text, VStack, Wrap, WrapProps } from "@chakra-ui/react";
import { useState } from "react";
import { Presensi__SUmmary__Interface } from "../../../const/interfaces";
import { responsiveSpacing } from "../../../const/sizes";
import formatNumber from "../../../lib/formatNumber";
import Skeleton from "../Skeleton";

interface Props extends WrapProps {}

export default function PresensiTotal({ ...props }: Props) {
  const dummy = {
    hadir: {
      tepat_waktu: 489,
      hadir: 489 + 31,
      terlambat: 31,
    },
    tidak_hadir: {
      absen: 2,
      izin: 13,
      invalid: 0,
    },
    libur: {
      hari_libur: 48,
      cuti: 7,
    },
  };
  const [loading] = useState<boolean>(false);
  const [data] = useState<Presensi__SUmmary__Interface | null>(dummy);

  return (
    <Wrap spacing={responsiveSpacing} {...props}>
      {loading && (
        <>
          <Skeleton flex={"1 1"} h={"150px"} />
          <Skeleton flex={"1 1"} h={"150px"} />
          <Skeleton flex={"1 1"} h={"150px"} />
        </>
      )}
      {!loading && data && (
        <>
          <VStack
            borderRadius={12}
            px={responsiveSpacing}
            py={[4, null, 5]}
            bg={"var(--p500a4)"}
            align={"flex-start"}
            flex={"1 1"}
            h={"150px"}
          >
            <Text fontWeight={600}>Hadir</Text>

            <HStack gap={6} justify={"space-between"} w={"100%"}>
              <VStack align={"flex-start"} gap={0} flex={"1 1"}>
                <Text fontSize={36} fontWeight={600} color={"p.500"}>
                  {formatNumber(data?.hadir.tepat_waktu)}
                </Text>
                <Text fontSize={14} opacity={0.6} whiteSpace={"nowrap"}>
                  Tepat Waktu
                </Text>
              </VStack>

              <VStack align={"flex-start"} gap={0} flex={"1 1"}>
                <Text fontSize={36} fontWeight={600} color={"p.500"}>
                  {formatNumber(data?.hadir.hadir)}
                </Text>
                <Text fontSize={14} opacity={0.6} whiteSpace={"nowrap"}>
                  Hadir
                </Text>
              </VStack>

              <VStack align={"flex-start"} gap={0} flex={"1 1"}>
                <Text fontSize={36} fontWeight={600} color={"p.500"}>
                  {formatNumber(data?.hadir.terlambat)}
                </Text>
                <Text fontSize={14} opacity={0.6} whiteSpace={"nowrap"}>
                  Terlambat
                </Text>
              </VStack>
            </HStack>
          </VStack>

          <VStack
            borderRadius={12}
            px={responsiveSpacing}
            py={[4, null, 5]}
            bg={"var(--reda)"}
            align={"flex-start"}
            flex={"1 1"}
            h={"150px"}
          >
            <Text fontWeight={600}>Tidak Hadir</Text>

            <HStack gap={6} justify={"space-between"} w={"100%"}>
              <VStack align={"flex-start"} gap={0} flex={"1 1"}>
                <Text fontSize={36} fontWeight={600} color={"red.400"}>
                  {formatNumber(data.tidak_hadir.absen)}
                </Text>
                <Text fontSize={14} opacity={0.6} whiteSpace={"nowrap"}>
                  Absen
                </Text>
              </VStack>

              <VStack align={"flex-start"} gap={0} flex={"1 1"}>
                <Text fontSize={36} fontWeight={600} color={"red.400"}>
                  {formatNumber(data.tidak_hadir.izin)}
                </Text>
                <Text fontSize={14} opacity={0.6} whiteSpace={"nowrap"}>
                  Izin
                </Text>
              </VStack>

              <VStack align={"flex-start"} gap={0} flex={"1 1"}>
                <Text fontSize={36} fontWeight={600} color={"red.400"}>
                  {formatNumber(data.tidak_hadir.invalid)}
                </Text>
                <Text fontSize={14} opacity={0.6} whiteSpace={"nowrap"}>
                  Invalid
                </Text>
              </VStack>
            </HStack>
          </VStack>

          <VStack
            borderRadius={12}
            px={responsiveSpacing}
            py={[4, null, 5]}
            bg={"var(--divider)"}
            align={"flex-start"}
            flex={"1 1"}
            h={"150px"}
          >
            <Text fontWeight={600}>Libur</Text>

            <HStack gap={6} justify={"space-between"} w={"100%"}>
              <VStack align={"flex-start"} gap={0} flex={"1 1"}>
                <Text
                  fontSize={36}
                  fontWeight={600}
                  color={"var(--divider-text)"}
                >
                  {formatNumber(data.libur.hari_libur)}
                </Text>
                <Text fontSize={14} opacity={0.6} whiteSpace={"nowrap"}>
                  Libur
                </Text>
              </VStack>

              <VStack align={"flex-start"} gap={0} flex={"1 1"}>
                <Text
                  fontSize={36}
                  fontWeight={600}
                  color={"var(--divider-text)"}
                >
                  {formatNumber(data.libur.cuti)}
                </Text>
                <Text fontSize={14} opacity={0.6} whiteSpace={"nowrap"}>
                  Cuti
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </>
      )}
    </Wrap>
  );
}
