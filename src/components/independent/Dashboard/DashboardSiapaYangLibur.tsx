import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useBodyColor } from "../../../const/colors";
import { Karyawan__Interface } from "../../../const/interfaces";
import Skeleton from "../Skeleton";
import { RiArrowDownSLine } from "@remixicon/react";
import {
  dashboardItemHeight,
  dashboardItemMinWidth,
  iconSize,
} from "../../../const/sizes";
import whosOffPeriode from "../../../const/whosOffPeriode";

interface Props extends StackProps {}

export default function DashboardSiapaYangLibur({ ...props }: Props) {
  //! DEBUG
  const dummy = [
    {
      id: 1,
      name: "Jolitos Kurniawan",
      role: "Dokter Hewan",
      image: "https://bit.ly/dan-abramov",
    },
    {
      id: 2,
      name: "Melky Simonsely",
      role: "Dokter Gigi",
      image: "https://bit.ly/tioluwani-kolawole",
    },
    {
      id: 3,
      name: "Sulenq Wazawsky",
      role: "Perawat",
      image: "https://bit.ly/kent-c-dodds",
    },
    {
      id: 4,
      name: "Sullivan",
      role: "Perawat",
      image: "https://bit.ly/ryan-florence",
    },
    {
      id: 5,
      name: "Sopik Simanjutak",
      role: "Kepala Ruang",
      image: "https://bit.ly/code-beast",
    },
    {
      id: 6,
      name: "Segun Adebayo",
      role: "Anak Direktur",
      image: "ttps://bit.ly/sage-adebayo",
    },
    {
      id: 7,
      name: "Davon Bucker",
      role: "Anonimus",
      image: "",
    },
  ];
  //! DEBUG

  const [periode, setPeriode] = useState<number>(0);
  const [data] = useState<Karyawan__Interface[] | null>(dummy);
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
          gap={0}
          minW={dashboardItemMinWidth}
          h={dashboardItemHeight}
          {...props}
        >
          <HStack justify={"space-between"} p={6}>
            <Text fontWeight={600}>Siapa Yang Libur</Text>

            <Menu>
              <MenuButton
                as={Button}
                size={"xs"}
                className="btn-clear"
                color={"p.500"}
                rightIcon={<Icon as={RiArrowDownSLine} fontSize={iconSize} />}
              >
                {whosOffPeriode[periode]}
              </MenuButton>

              <MenuList minW={"160px"}>
                {whosOffPeriode.map((periodeLabel, i) => (
                  <MenuItem
                    key={i}
                    color={periode === i ? "p.500" : ""}
                    onClick={() => {
                      setPeriode(i);
                    }}
                  >
                    {periodeLabel}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </HStack>

          <VStack
            align={"stretch"}
            gap={6}
            pb={6}
            overflowY={"auto"}
            px={6}
            className="scrollY"
          >
            {data.map((user, i) => (
              <HStack key={i}>
                <Avatar name={user.name} src={user.image} />
                <Box>
                  <Text mb={1}>{user.name}</Text>
                  <Text opacity={0.6} fontSize={12}>
                    {user.role}
                  </Text>
                </Box>
              </HStack>
            ))}
          </VStack>
        </VStack>
      )}
    </>
  );
}
