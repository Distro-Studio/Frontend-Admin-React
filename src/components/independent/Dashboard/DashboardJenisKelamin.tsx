import { Box, HStack, StackProps, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useBodyColor } from "../../../const/colors";
import ChartDoughnut from "../../Dependent/ChartDoughnut";
import Skeleton from "../Skeleton";

interface Props extends StackProps {}

export default function DashboardJenisKelamin({ ...props }: Props) {
  //! DEBUG
  const dummy = [44, 56];
  //! DEBUG

  const [data] = useState<any | null>(dummy);
  const [loading] = useState<boolean>(false);
  useEffect(() => {
    //TODO api get data dashboard jenis kelamin
  }, []);

  const labels = ["Pria", "Wanita"];
  const datasets = [
    {
      label: "Presentase Kelamin",
      data: data,
      backgroundColor: ["#FBD38D", "#805AD5"],
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
          {...props}
        >
          <Text fontWeight={600}>Jenis Kelamin</Text>
          <Text fontSize={14} opacity={0.6}>
            Karyawan saat ini
          </Text>

          <VStack my={"auto"} pt={6} gap={4}>
            <VStack position={"relative"}>
              <VStack maxW={"240px"}>
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
                %
              </Text>
            </VStack>

            <HStack justify={"center"}>
              <HStack>
                <Box
                  borderRadius={"full"}
                  w={"10px"}
                  h={"10px"}
                  bg={"orange.200"}
                />
                <Text>Pria </Text>
              </HStack>

              <HStack>
                <Box
                  borderRadius={"full"}
                  w={"10px"}
                  h={"10px"}
                  bg={"purple.400"}
                />
                <Text>Wanita</Text>
              </HStack>
            </HStack>
          </VStack>
        </VStack>
      )}
    </>
  );
}
