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
import { dummyKaryawanList } from "../../../const/dummy";

interface Props extends StackProps {}

export default function DashboardSiapaYangLibur({ ...props }: Props) {
  //! DEBUG
  //! DEBUG

  const [periode, setPeriode] = useState<number>(0);
  const [data] = useState<Karyawan__Interface[] | null>(dummyKaryawanList);
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
            className="scrollX scrollY"
            // className="scrollY"
          >
            {data.map((user, i) => (
              <HStack key={i}>
                <Avatar name={user.nama} src={user.foto_profil} />
                <Box>
                  <Text mb={1}>{user.nama}</Text>
                  <Text opacity={0.6} fontSize={12}>
                    {user.unit_kerja}
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
