import { Box, HStack, StackProps, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useBodyColor } from "../../../const/colors";
import ChartDoughnut from "../../dependent/ChartDoughnut";
import Skeleton from "../Skeleton";
import { dashboardItemHeight } from "../../../const/sizes";

interface Props extends StackProps {}

export default function DashboardStatusKaryawan({ ...props }: Props) {
  //! DEBUG
  const dummy = [108, 56, 5];
  //! DEBUG

  const [data] = useState<any | null>(dummy);
  const [loading] = useState<boolean>(false);
  useEffect(() => {
    //TODO api get data dashboard jenis kelamin
  }, []);

  const labels = ["Pria", "Wanita"];
  const datasets = [
    {
      label: "",
      data: data,
      backgroundColor: ["#FBD38D", "#805AD5", "#48BB78"],
      borderWidth: 0,
    },
  ];

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
          gap={0}
          h={dashboardItemHeight}
          {...props}
        >
          <Text fontWeight={600}>Status Karyawan</Text>
          <Text fontSize={14} opacity={0.6}>
            Karyawan saat ini
          </Text>

          <HStack gap={12} m={"auto"}>
            <VStack my={6} position={"relative"}>
              <VStack
                w={"100% !important"}
                maxW={"240px"}
                className="doughnutChartContainer"
              >
                <ChartDoughnut labels={labels} datasets={datasets} />
              </VStack>

              <Text
                position={"absolute"}
                left={"50%"}
                top={"50%"}
                transform={"translate(-50%, -50%)"}
                fontSize={48}
                opacity={0.6}
              >
                N
              </Text>
            </VStack>

            <VStack align={"stretch"} minW={"140px"}>
              <HStack>
                <Box
                  borderRadius={"full"}
                  w={"10px"}
                  h={"10px"}
                  bg={"orange.200"}
                />
                <Text>Tetap</Text>

                <Text ml={"auto"}>{data[0]}</Text>
              </HStack>

              <HStack>
                <Box
                  borderRadius={"full"}
                  w={"10px"}
                  h={"10px"}
                  bg={"purple.400"}
                />
                <Text>Kontrak</Text>

                <Text ml={"auto"}>{data[1]}</Text>
              </HStack>

              <HStack>
                <Box
                  borderRadius={"full"}
                  w={"10px"}
                  h={"10px"}
                  bg={"green.400"}
                />
                <Text>Magang</Text>

                <Text ml={"auto"}>{data[2]}</Text>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
      )}
    </>
  );
}
