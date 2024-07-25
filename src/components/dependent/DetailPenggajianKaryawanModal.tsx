import {
  Avatar,
  Box,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useLightDarkColor } from "../../const/colors";
import { responsiveSpacing } from "../../const/sizes";
import useBackOnClose from "../../hooks/useBackOnClose";
import useDataState from "../../hooks/useDataState";
import backOnClose from "../../lib/backOnClose";
import formatNumber from "../../lib/formatNumber";
import ComponentSpinner from "../independent/ComponentSpinner";
import FlexLine from "../independent/FlexLine";
import NoData from "../independent/NoData";
import CContainer from "../wrapper/CContainer";
import DetailKaryawanModalDisclosure from "./DetailKaryawanModalDisclosure";
import DisclosureHeader from "./DisclosureHeader";
import Retry from "./Retry";
import SearchComponent from "./input/SearchComponent";

interface Props {
  karyawan_id: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default function DetailPenggajianKaryawanModal({
  karyawan_id,
  isOpen,
  onOpen,
  onClose,
}: Props) {
  useBackOnClose(
    `detail-penggajian-karyawan-modal-${karyawan_id}`,
    isOpen,
    onOpen,
    onClose
  );
  const initialRef = useRef(null);

  const dummy = {
    user: {
      id: 2,
      nama: "User 0",
      username: "username0",
      role_id: null,
      foto_profil: null,
      status_akun: 1,
      data_completion_step: 0,
      created_at: "2024-07-06 10:04:37",
      updated_at: "2024-07-06 10:04:37",
    },
    unit_kerja: {
      id: 18,
      nama_unit: "Kebersihan",
      jenis_karyawan: 1,
      deleted_at: null,
      created_at: "2023-11-09 10:04:37",
      updated_at: "2024-07-06 10:04:37",
    },
    kelompok_gaji: {
      id: 10,
      nama_kelompok: "Kelompok Gaji J",
      besaran_gaji: 7950315,
      deleted_at: null,
      created_at: "2023-11-23 10:04:37",
      updated_at: "2024-07-06 10:04:37",
    },
    ptkp: {
      id: 2,
      kode_ptkp: "TK/1",
      kategori_ter_id: 1,
      nilai: 58500000,
      created_at: "2024-07-06 10:04:37",
      updated_at: "2024-07-06 10:04:37",
    },
    detail_gaji: [
      {
        kategori: "Gaji Pokok",
        nama_detail: "Gaji Pokok",
        besaran: 7950315,
      },
      {
        kategori: "Penambah",
        nama_detail: "Tunjangan Jabatan",
        besaran: 323835,
      },
      {
        kategori: "Penambah",
        nama_detail: "Tunjangan Fungsional",
        besaran: 151795,
      },
      {
        kategori: "Penambah",
        nama_detail: "Tunjangan Khusus",
        besaran: 28640,
      },
      {
        kategori: "Penambah",
        nama_detail: "Tunjangan Lainnya",
        besaran: 792781,
      },
      {
        kategori: "Penambah",
        nama_detail: "Uang Lembur",
        besaran: 42740,
      },
      {
        kategori: "Penambah",
        nama_detail: "Uang Makan",
        besaran: 47568,
      },
      {
        kategori: "Penambah",
        nama_detail: "Bonus BOR",
        besaran: null,
      },
      {
        kategori: "Penambah",
        nama_detail: "Bonus Presensi",
        besaran: 300000,
      },
      {
        kategori: "Pengurang",
        nama_detail: "PPH21",
        besaran: 168659,
      },
    ],
    take_home_pay: 9469015,
  };

  const { error, loading, data, retry } = useDataState<any>({
    initialData: dummy,
    url: "",
    dependencies: [],
  });
  const [search, setSearch] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string[]>([]);

  useEffect(() => {
    const words = search.split(" ").filter((word) => word.length > 0);
    const modifiedWords = words.reduce((acc: string[], word) => {
      acc.push(word);
      if (word.toLowerCase() === "nomor") {
        acc.push("no.");
      } else if (word.toLowerCase() === "nik") {
        acc.push("no. induk karyawan");
      }
      return acc;
    }, []);
    setSearchQuery(modifiedWords);
  }, [search]);

  // SX
  const lightDarkColor = useLightDarkColor();

  return (
    <Modal
      isOpen={isOpen}
      onClose={backOnClose}
      initialFocusRef={initialRef}
      size={"full"}
      scrollBehavior="inside"
      blockScrollOnMount={false}
    >
      <ModalOverlay />
      <ModalContent borderRadius={12} minH={"calc(100vh - 32px)"}>
        <ModalHeader ref={initialRef}>
          <DisclosureHeader title={"Detail Penggajian Karyawan"} />
        </ModalHeader>
        <ModalBody px={0}>
          {error && (
            <Box my={"auto"}>
              <Retry loading={loading} retry={retry} />
            </Box>
          )}
          {!error && (
            <>
              {loading && (
                <>
                  <ComponentSpinner />
                </>
              )}
              {!loading && (
                <>
                  {(!data || (data && data.length === 0)) && <NoData />}

                  {(data || (data && data.length > 0)) && (
                    <CContainer
                      h={"calc(100vh - 70px)"}
                      overflowY={"auto"}
                      className="scrollY"
                      gap={responsiveSpacing}
                      mb={responsiveSpacing}
                    >
                      <Wrap
                        spacing={responsiveSpacing}
                        align={"center"}
                        px={responsiveSpacing}
                      >
                        <DetailKaryawanModalDisclosure user_id={data.user.id}>
                          <Avatar
                            size={"md"}
                            w={"55px"}
                            h={"55px"}
                            src={data.user.foto_profil}
                            name={data.user.nama}
                          />
                        </DetailKaryawanModalDisclosure>

                        <VStack align={"stretch"}>
                          <Text fontSize={14} opacity={0.6}>
                            Nama Karyawan
                          </Text>
                          <Text fontWeight={500}>{data.user.nama}</Text>
                        </VStack>

                        <VStack align={"stretch"}>
                          <Text fontSize={14} opacity={0.6}>
                            Kelompok Gaji
                          </Text>
                          <Text fontWeight={500}>
                            {data.kelompok_gaji.nama_kelompok}
                          </Text>
                        </VStack>

                        <VStack align={"stretch"}>
                          <Text fontSize={14} opacity={0.6}>
                            Kode PTKP
                          </Text>
                          <Text fontWeight={500}>{data.ptkp.kode_ptkp} </Text>
                        </VStack>
                      </Wrap>

                      <HStack
                        pr={[0, null, 5]}
                        pl={[0, null, 4]}
                        position={"sticky"}
                        top={"0"}
                        bg={lightDarkColor}
                        zIndex={2}
                      >
                        <SearchComponent
                          name="search"
                          onChangeSetter={(input) => {
                            setSearch(input);
                          }}
                          inputValue={search}
                        />
                      </HStack>

                      <CContainer
                        gap={responsiveSpacing}
                        overflowY={"auto"}
                        className="scrollY"
                      >
                        <VStack
                          align={"stretch"}
                          gap={responsiveSpacing}
                          flex={1}
                          overflowY={"auto"}
                          className="scrollY"
                          px={responsiveSpacing}
                        >
                          <VStack align={"stretch"} gap={0}>
                            <Text fontSize={20} fontWeight={600} mb={4}>
                              Rincian Penggajian
                            </Text>

                            <VStack
                              align={"stretch"}
                              gap={4}
                              // ref={dataPresensiRef}
                            >
                              {data.detail_gaji.map((item: any, i: number) => (
                                <HStack key={i} justify={"space-between"}>
                                  <Box opacity={0.6}>
                                    <Highlighter
                                      highlightClassName="hw"
                                      unhighlightClassName="uw"
                                      searchWords={searchQuery}
                                      autoEscape={true}
                                      textToHighlight={item.nama_detail}
                                    />
                                  </Box>
                                  <FlexLine />
                                  <Text
                                    fontWeight={500}
                                    textAlign={"right"}
                                    color={
                                      item.kategori === "Pengurang"
                                        ? "red.400"
                                        : ""
                                    }
                                  >
                                    {item.kategori === "Pengurang" ? "-" : ""}{" "}
                                    Rp {formatNumber(item.besaran) || 0}
                                  </Text>
                                </HStack>
                              ))}

                              <HStack
                                justify={"space-between"}
                                borderTop={"1px solid var(--divider3)"}
                                pt={4}
                                mt={1}
                              >
                                <Text fontSize={20} opacity={0.6}>
                                  Take Home Pay
                                </Text>
                                <FlexLine />
                                <Text
                                  fontSize={20}
                                  fontWeight={500}
                                  textAlign={"right"}
                                >
                                  Rp {formatNumber(data.take_home_pay)}
                                </Text>
                              </HStack>
                            </VStack>
                          </VStack>
                        </VStack>
                      </CContainer>
                    </CContainer>
                  )}
                </>
              )}
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
