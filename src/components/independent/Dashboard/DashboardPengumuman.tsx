import {
  Box,
  Button,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RiArrowDownSLine, RiSearch2Line } from "@remixicon/react";
import { useEffect, useState } from "react";
import { useBodyColor } from "../../../const/colors";
import { Pengumuman__Interface } from "../../../const/interfaces";
import {
  dashboardItemHeight,
  dashboardItemMinWidth,
  iconSize,
  responsiveSpacing,
} from "../../../const/sizes";
import whosOffPeriode from "../../../const/whosOffPeriode";
import Skeleton from "../Skeleton";
import DashboardBuatPengumumanModal from "./DashboardBuatPengumumanModal";
import DashboardPengumumanItemDetail from "./DashboardPengumumanItemDetail";

interface Props extends StackProps {}

export default function DashboardPengumuman({ ...props }: Props) {
  //! DEBUG
  const dummy = [
    {
      id: 1,
      judul: "Judul Pengumuman",
      pengumuman:
        "Contoh isi pengumuman, bisa pendek, bisa sangat amat panjang sekali seperti ini, ber tele - tele kaya lele",
      createdAt: "Tue May 07 2024 21:13:25 GMT+0700 (Western Indonesia Time)",
    },
    {
      id: 2,
      judul: "Judul Pengumuman",
      pengumuman:
        "Contoh isi pengumuman, bisa pendek, bisa sangat amat panjang sekali seperti ini, tambahan aja",
      createdAt: "Tue May 07 2024 21:13:25 GMT+0700 (Western Indonesia Time)",
    },
    {
      id: 3,
      judul: "Judul Pengumuman",
      pengumuman: "Contoh isi pengumuman, bisa pendek",
      createdAt: "Tue May 07 2024 21:13:25 GMT+0700 (Western Indonesia Time)",
    },
    {
      id: 4,
      judul: "Judul Pengumuman",
      pengumuman:
        "Contoh isi pengumuman, bisa pendek, bisa sangat amat panjang sekali seperti ini, bisa diberi keterangan ditujukan pada siapa",
      createdAt: "Tue May 07 2024 21:13:25 GMT+0700 (Western Indonesia Time)",
    },
    {
      id: 5,
      judul: "Judul Pengumuman",
      pengumuman:
        "Contoh isi pengumuman, bisa pendek, bisa sangat amat panjang sekali seperti ini, tidak bisa insert link atau semacamnya",
      createdAt: "Tue May 07 2024 21:13:25 GMT+0700 (Western Indonesia Time)",
    },
  ];
  //! DEBUG

  const [search, setSearch] = useState<string>("");
  const [data] = useState<Pengumuman__Interface[] | null>(dummy);
  const [loading] = useState<boolean>(false);
  useEffect(() => {
    //TODO api get data dashboard jenis kelamin
  }, []);

  // SX
  const bodyColor = useBodyColor();

  return (
    <>
      {loading && <Skeleton flex={"1 1 0"} h={"100%"} minH={"400px"} />}

      {!loading && (
        <VStack
          align={"stretch"}
          bg={bodyColor}
          borderRadius={12}
          gap={0}
          minW={dashboardItemMinWidth}
          overflowX={"hidden"}
          h={dashboardItemHeight}
          {...props}
        >
          <Box p={6}>
            <HStack
              justify={"space-between"}
              mb={responsiveSpacing}
              align={"flex-start"}
            >
              <Text fontWeight={600}>Pengumuman</Text>

              <DashboardBuatPengumumanModal />
            </HStack>

            <HStack>
              <Menu>
                <MenuButton
                  flexShrink={0}
                  as={Button}
                  className="btn-solid"
                  rightIcon={<Icon as={RiArrowDownSLine} fontSize={iconSize} />}
                >
                  Filter
                </MenuButton>
                <MenuList minW={"160px"}>
                  {whosOffPeriode.map((periodeLabel, i) => (
                    <MenuItem key={i}>{periodeLabel}</MenuItem>
                  ))}
                </MenuList>
              </Menu>

              <InputGroup>
                <InputLeftElement>
                  <Icon as={RiSearch2Line} />
                </InputLeftElement>
                <Input
                  name="search"
                  placeholder="Pencarian"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  value={search}
                />
              </InputGroup>
            </HStack>
          </Box>

          <VStack
            align={"stretch"}
            overflowY={"auto"}
            className="scrollX scrollY"
            flex={1}
            gap={0}
          >
            {!data && (
              <Text m={"auto"} opacity={0.6}>
                Tidak ada pengumuman
              </Text>
            )}

            {data &&
              data.map((pengumuman, i) => (
                <DashboardPengumumanItemDetail
                  key={i}
                  data={pengumuman}
                  borderBottom={
                    i < data.length - 1 ? "1px solid var(--divider2)" : ""
                  }
                />
              ))}
          </VStack>
        </VStack>
      )}
    </>
  );
}
