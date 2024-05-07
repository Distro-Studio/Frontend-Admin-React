import { Box, HStack, StackProps, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useBodyColor } from "../../const/colors";
import ChartDoughnut from "../Dependent/ChartDoughnut";
import Skeleton from "./Skeleton";
import { Dashboard__Jabatan__Interface } from "../../const/types";

interface Props extends StackProps {}

export default function DashboardJabatan({ ...props }: Props) {
  //! DEBUG
  const dummy = [
    {
      nama: "CEO",
      jumlah: 1,
    },
    {
      nama: "CTO",
      jumlah: 4,
    },
    {
      nama: "CFO",
      jumlah: 2,
    },
    {
      nama: "HRD",
      jumlah: 5,
    },
    {
      nama: "Manager",
      jumlah: 16,
    },
    {
      nama: "Staff",
      jumlah: 254,
    },
    {
      nama: "Office Boy",
      jumlah: 10,
    },
  ];
  //! DEBUG

  const [data] = useState<Dashboard__Jabatan__Interface[] | null>(dummy);
  const [loading] = useState<boolean>(false);
  useEffect(() => {
    //TODO api get data dashboard jenis kelamin
  }, []);

  // SX
  const bodyColor = useBodyColor();

  return (
    <>
      {loading && <Skeleton flex={"1 1 0"} h={"100%"} minH={"400px"} />}

      {!loading && data && (
        <VStack
          align={"stretch"}
          bg={bodyColor}
          borderRadius={12}
          p={6}
          minW={"300px"}
          {...props}
        >
          <Text fontWeight={600}>Jabatan</Text>
          <Text fontSize={14} opacity={0.6}>
            Karyawan saat ini
          </Text>

          <VStack my={6} align={"stretch"}>
            {data.map((jabatan, i) => (
              <HStack key={i} justify={"space-between"}>
                <Text>{jabatan.nama}</Text>
                <Text>{jabatan.jumlah}</Text>
              </HStack>
            ))}
          </VStack>
        </VStack>
      )}
    </>
  );
}
