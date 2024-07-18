import {
  Avatar,
  Box,
  Button,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { RiEditBoxFill, RiHeartLine } from "@remixicon/react";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { useBodyColor } from "../../const/colors";
import { dummyDetailKaryawan } from "../../const/dummy";
import { iconSize, responsiveSpacing } from "../../const/sizes";
import useBackOnClose from "../../hooks/useBackOnClose";
import useDataState from "../../hooks/useDataState";
import backOnClose from "../../lib/backOnClose";
import formatDate from "../../lib/formatDate";
import formatMasaKerja from "../../lib/formatMasaKerja";
import formatNumber from "../../lib/formatNumber";
import ComponentSpinner from "../independent/ComponentSpinner";
import FlexLine from "../independent/FlexLine";
import NoData from "../independent/NoData";
import CContainer from "../wrapper/CContainer";
import BooleanBadge from "./BooleanBadge";
import DetailKeluargaKaryawanModalDisclosure from "./DetailKeluargaKaryawanModalDisclosure";
import DisclosureHeader from "./DisclosureHeader";
import JenisKaryawanBadge from "./JenisKaryawanBadge";
import Retry from "./Retry";
import SmallLink from "./SmallLink";
import SearchComponent from "./input/SearchComponent";
import chartColors from "../../constant/chartColors";

interface Props {
  karyawan_id: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
export default function DetailKaryawanModal({
  karyawan_id,
  isOpen,
  onOpen,
  onClose,
}: Props) {
  useBackOnClose(
    `detail-karyawan-modal-${karyawan_id}`,
    isOpen,
    onOpen,
    onClose
  );
  const initialRef = useRef(null);

  const { error, loading, data, retry } = useDataState<any>({
    initialData: dummyDetailKaryawan,
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
  const bodyColor = useBodyColor();

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
          <DisclosureHeader title={"Detail Karyawan"} />
        </ModalHeader>
        <ModalBody>
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
                    >
                      <Wrap mb={responsiveSpacing}>
                        <SearchComponent
                          name="search"
                          onChangeSetter={(input) => {
                            if (input) {
                              setSearch(input);
                            } else {
                              setSearch("");
                            }
                          }}
                          inputValue={search}
                        />

                        <DetailKeluargaKaryawanModalDisclosure
                          flex={"1 1 120px"}
                          karyawan_id={1}
                        >
                          <Button
                            w={"100%"}
                            leftIcon={
                              <Icon
                                as={RiHeartLine}
                                fontSize={iconSize}
                                color={chartColors[6]}
                              />
                            }
                            className="btn-outline clicky"
                          >
                            Data Keluarga
                          </Button>
                        </DetailKeluargaKaryawanModalDisclosure>

                        <Button
                          flex={"1 1 80px"}
                          leftIcon={
                            <Icon as={RiEditBoxFill} fontSize={iconSize} />
                          }
                          colorScheme="ap"
                          className="btn-ap clicky"
                          as={Link}
                          to={`/karyawan/${data.id}/edit`}
                          pl={3}
                        >
                          Edit
                        </Button>
                      </Wrap>

                      <Wrap
                        flex={1}
                        spacing={responsiveSpacing}
                        overflowY={"auto"}
                        className="scrollY"
                        mb={responsiveSpacing}
                      >
                        <CContainer
                          flex={"1 1 350px"}
                          bg={bodyColor}
                          position={"sticky"}
                          top={"0"}
                          overflowY={"auto"}
                          className="scrollY"
                        >
                          <VStack overflowY={"auto"} flex={1}>
                            <VStack>
                              <Avatar
                                w={"250px"}
                                h={"250px"}
                                size={"xxl"}
                                fontSize={"80px !important"}
                                src={data.user.foto_profil}
                                name={data.user.nama}
                                mb={2}
                              />

                              <Text
                                fontWeight={600}
                                fontSize={22}
                                maxW={"280px"}
                                textAlign={"center"}
                                mb={1}
                              >
                                {data.user.nama}
                              </Text>

                              <JenisKaryawanBadge
                                data={data.unit_kerja.jenis_karyawan}
                                mb={responsiveSpacing}
                              />
                            </VStack>

                            <VStack
                              align={"stretch"}
                              w={"100%"}
                              gap={4}
                              px={responsiveSpacing}
                              minH={"150px"}
                              // bg={"red"}
                            >
                              <HStack justify={"space-between"}>
                                {/* <Text opacity={0.6}>Email</Text> */}
                                <Box opacity={0.6}>
                                  <Highlighter
                                    highlightClassName="hw"
                                    unhighlightClassName="uw"
                                    searchWords={searchQuery}
                                    autoEscape={true}
                                    textToHighlight="Status Aktif"
                                  />
                                </Box>
                                <FlexLine />
                                <Text fontWeight={500} textAlign={"right"}>
                                  <BooleanBadge
                                    data={data.user.status_aktif}
                                    trueValue="Aktif"
                                    falseValue="Tidak Aktif"
                                  />
                                </Text>
                              </HStack>

                              <HStack justify={"space-between"}>
                                {/* <Text opacity={0.6}>No. Induk Karyawan</Text> */}
                                <Box opacity={0.6}>
                                  <Highlighter
                                    highlightClassName="hw"
                                    unhighlightClassName="uw"
                                    searchWords={searchQuery}
                                    autoEscape={true}
                                    textToHighlight="Username Akun"
                                  />
                                </Box>
                                <FlexLine />
                                <Text fontWeight={500} textAlign={"right"}>
                                  {data.user.username}
                                </Text>
                              </HStack>

                              <HStack justify={"space-between"}>
                                {/* <Text opacity={0.6}>Email</Text> */}
                                <Box opacity={0.6}>
                                  <Highlighter
                                    highlightClassName="hw"
                                    unhighlightClassName="uw"
                                    searchWords={searchQuery}
                                    autoEscape={true}
                                    textToHighlight="Email"
                                  />
                                </Box>
                                <FlexLine />
                                <Text fontWeight={500} textAlign={"right"}>
                                  {data.email}
                                </Text>
                              </HStack>

                              <HStack justify={"space-between"}>
                                {/* <Text opacity={0.6}>No. Induk Karyawan</Text> */}
                                <Box opacity={0.6}>
                                  <Highlighter
                                    highlightClassName="hw"
                                    unhighlightClassName="uw"
                                    searchWords={searchQuery}
                                    autoEscape={true}
                                    textToHighlight="No. Induk Karyawan"
                                  />
                                </Box>
                                <FlexLine />
                                <Text fontWeight={500} textAlign={"right"}>
                                  {data.nik}
                                </Text>
                              </HStack>

                              <HStack justify={"space-between"}>
                                {/* <Text opacity={0.6}>NIK KTP</Text> */}
                                <Box opacity={0.6}>
                                  <Highlighter
                                    highlightClassName="hw"
                                    unhighlightClassName="uw"
                                    searchWords={searchQuery}
                                    autoEscape={true}
                                    textToHighlight="NIK KTP"
                                  />
                                </Box>
                                <FlexLine />
                                <HStack>
                                  <SmallLink to="#">Lihat</SmallLink>
                                  <Text fontWeight={500} textAlign={"right"}>
                                    {data.nik_ktp}
                                  </Text>
                                </HStack>
                              </HStack>

                              <HStack justify={"space-between"}>
                                {/* <Text opacity={0.6}>No. KK</Text> */}
                                <Box opacity={0.6}>
                                  <Highlighter
                                    highlightClassName="hw"
                                    unhighlightClassName="uw"
                                    searchWords={searchQuery}
                                    autoEscape={true}
                                    textToHighlight="No. KK"
                                  />
                                </Box>
                                <FlexLine />
                                <HStack>
                                  <SmallLink to="#">Lihat</SmallLink>
                                  <Text fontWeight={500} textAlign={"right"}>
                                    {data.no_kk}
                                  </Text>
                                </HStack>
                              </HStack>

                              <HStack justify={"space-between"}>
                                {/* <Text opacity={0.6}>No. HP</Text> */}
                                <Box opacity={0.6}>
                                  <Highlighter
                                    highlightClassName="hw"
                                    unhighlightClassName="uw"
                                    searchWords={searchQuery}
                                    autoEscape={true}
                                    textToHighlight="No. HP"
                                  />
                                </Box>
                                <FlexLine />
                                <Text fontWeight={500} textAlign={"right"}>
                                  {data.no_hp}
                                </Text>
                              </HStack>

                              <HStack justify={"space-between"}>
                                {/* <Text opacity={0.6}>Tempat Lahir</Text> */}
                                <Box opacity={0.6}>
                                  <Highlighter
                                    highlightClassName="hw"
                                    unhighlightClassName="uw"
                                    searchWords={searchQuery}
                                    autoEscape={true}
                                    textToHighlight="Tempat Lahir"
                                  />
                                </Box>
                                <FlexLine />
                                <Text fontWeight={500} textAlign={"right"}>
                                  {data.tempat_lahir}
                                </Text>
                              </HStack>

                              <HStack justify={"space-between"}>
                                {/* <Text opacity={0.6}>Tanggal Lahir</Text> */}
                                <Box opacity={0.6}>
                                  <Highlighter
                                    highlightClassName="hw"
                                    unhighlightClassName="uw"
                                    searchWords={searchQuery}
                                    autoEscape={true}
                                    textToHighlight="Tanggal Lahir"
                                  />
                                </Box>
                                <FlexLine />
                                <Text fontWeight={500} textAlign={"right"}>
                                  {formatDate(data.tgl_lahir)}
                                </Text>
                              </HStack>

                              <HStack justify={"space-between"}>
                                {/* <Text opacity={0.6}>Jenis Kelamin</Text> */}
                                <Box opacity={0.6}>
                                  <Highlighter
                                    highlightClassName="hw"
                                    unhighlightClassName="uw"
                                    searchWords={searchQuery}
                                    autoEscape={true}
                                    textToHighlight="Jenis Kelamin"
                                  />
                                </Box>
                                <FlexLine />
                                <Text fontWeight={500} textAlign={"right"}>
                                  {data.jenis_kelamin.toLowerCase() === "p"
                                    ? "Perempuan"
                                    : "Laki - laki"}
                                </Text>
                              </HStack>

                              <HStack justify={"space-between"}>
                                {/* <Text opacity={0.6}>Agama</Text> */}
                                <Box opacity={0.6}>
                                  <Highlighter
                                    highlightClassName="hw"
                                    unhighlightClassName="uw"
                                    searchWords={searchQuery}
                                    autoEscape={true}
                                    textToHighlight="Agama"
                                  />
                                </Box>
                                <FlexLine />
                                <Text fontWeight={500} textAlign={"right"}>
                                  {data.agama}
                                </Text>
                              </HStack>

                              <HStack justify={"space-between"}>
                                {/* <Text opacity={0.6}>Gelar Depan</Text> */}
                                <Box opacity={0.6}>
                                  <Highlighter
                                    highlightClassName="hw"
                                    unhighlightClassName="uw"
                                    searchWords={searchQuery}
                                    autoEscape={true}
                                    textToHighlight="Gelar Depan"
                                  />
                                </Box>
                                <FlexLine />
                                <Text fontWeight={500} textAlign={"right"}>
                                  {data.gelar_depan}
                                </Text>
                              </HStack>

                              <HStack justify={"space-between"}>
                                {/* <Text opacity={0.6}>Alamat</Text> */}
                                <Box opacity={0.6}>
                                  <Highlighter
                                    highlightClassName="hw"
                                    unhighlightClassName="uw"
                                    searchWords={searchQuery}
                                    autoEscape={true}
                                    textToHighlight="Alamat"
                                  />
                                </Box>
                                <FlexLine />
                                <Popover>
                                  <PopoverTrigger>
                                    <Text
                                      fontWeight={500}
                                      noOfLines={1}
                                      maxW={"180px"}
                                      cursor={"pointer"}
                                    >
                                      {data.alamat}
                                    </Text>
                                  </PopoverTrigger>
                                  <Portal>
                                    <PopoverContent>
                                      <PopoverArrow />
                                      <PopoverCloseButton />
                                      <PopoverBody>
                                        <Text fontWeight={500}>
                                          {data.alamat}
                                        </Text>
                                      </PopoverBody>
                                    </PopoverContent>
                                  </Portal>
                                </Popover>
                              </HStack>
                            </VStack>
                          </VStack>
                        </CContainer>

                        <VStack
                          gap={responsiveSpacing}
                          overflowY={"auto"}
                          flex={"1 1 500px"}
                          className="scrollY"
                        >
                          <CContainer
                            flex={1}
                            overflowY={"auto"}
                            bg={bodyColor}
                            gap={responsiveSpacing}
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
                                  Data Kesehatan
                                </Text>

                                <VStack align={"stretch"} gap={4}>
                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>No. Rekam Medis</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="No. Rekam Medis"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      {data.no_rm}
                                    </Text>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>No. Manulife</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="No. Manulife"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      {data.no_manulife}
                                    </Text>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>No. BPJS Kesehatan</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="No. BPJS Kesehatan"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <HStack>
                                      <SmallLink to="#">Lihat</SmallLink>
                                      <Text
                                        fontWeight={500}
                                        textAlign={"right"}
                                      >
                                        {data.no_bpjsksh}
                                      </Text>
                                    </HStack>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>No. BPJS Ketenagakerjaan</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="No. BPJS Ketenagakerjaan"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      {data.no_bpjsktk}
                                    </Text>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>Tinggi Badan</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="Tinggi Badan"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      {data.tinggi_badan} cm
                                    </Text>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>Berat Badan</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="Berat Badan"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      {data.berat_badan} kg
                                    </Text>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>Golongan Darah</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="Golongan Darah"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      {data.golongan_darah}
                                    </Text>
                                  </HStack>
                                </VStack>
                              </VStack>

                              <VStack align={"stretch"} gap={0}>
                                <Text fontSize={20} fontWeight={600} mb={4}>
                                  Data Pekerjaan
                                </Text>

                                <VStack align={"stretch"} gap={4}>
                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>Tanggal Masuk</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="Tanggal Masuk"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      {formatDate(data.tgl_masuk)}
                                    </Text>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>Tanggal Keluar</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="Tanggal Keluar"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      {formatDate(data.tgl_keluar)}
                                    </Text>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>Tanggal Diangkat</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="Tanggal Diangkat"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      {formatDate(data.tgl_diangkat)}
                                    </Text>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>Masa Kerja</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="Masa Kerja"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      {formatMasaKerja(data.masa_kerja)}
                                    </Text>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>Unit Kerja</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="Unit Kerja"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      {data.unit_kerja.nama_unit}
                                    </Text>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>Jabatan</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="Jabatan"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      {data.jabatan.nama_jabatan}
                                    </Text>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>Kompetensi</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="Kompetensi"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      {data.kompetensi.nama_kompetensi}
                                    </Text>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>Status Karyawan</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="Status Karyawan"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      {data.status_karyawan.label}
                                    </Text>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>Tanggal Berakhir PKS</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="Tanggal Berakhir PKS"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      {formatDate(data.tgl_berakhir_pks)}
                                    </Text>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>Masa Diklat</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="Masa Diklat"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      {formatMasaKerja(data.masa_diklat)}
                                    </Text>
                                  </HStack>
                                </VStack>
                              </VStack>

                              <VStack align={"stretch"} gap={0}>
                                <Text fontSize={20} fontWeight={600} mb={4}>
                                  Data Pendidikan dan Sertifikat
                                </Text>

                                <VStack align={"stretch"} gap={4}>
                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>No. Ijazah</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="No. Ijazah"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <HStack>
                                      <SmallLink to="#">Lihat</SmallLink>
                                      <Text
                                        fontWeight={500}
                                        textAlign={"right"}
                                      >
                                        {data.no_ijazah}
                                      </Text>
                                    </HStack>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>Tahun Lulus</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="Tahun Lulus"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      {data.tahun_lulus}
                                    </Text>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>No. STR</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="No. STR"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <HStack>
                                      <SmallLink to="#">Lihat</SmallLink>
                                      <Text
                                        fontWeight={500}
                                        textAlign={"right"}
                                      >
                                        {data.no_str}
                                      </Text>
                                    </HStack>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>Masa Berlaku STR</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="Masa Berlaku STR"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      {formatDate(data.masa_berlaku_str)}
                                    </Text>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>No. SIP</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="No. SIP"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <HStack>
                                      <SmallLink to="#">Lihat</SmallLink>
                                      <Text
                                        fontWeight={500}
                                        textAlign={"right"}
                                      >
                                        {data.no_sip}
                                      </Text>
                                    </HStack>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>Masa Berlaku SIP</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="Masa Berlaku SIP"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      {formatDate(data.masa_berlaku_sip)}
                                    </Text>
                                  </HStack>
                                </VStack>
                              </VStack>

                              <VStack align={"stretch"} gap={0}>
                                <Text fontSize={20} fontWeight={600} mb={4}>
                                  Data Keuangan
                                </Text>

                                <VStack align={"stretch"} gap={4}>
                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>Kelompok Gaji</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="Kelompok Gaji"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      {data.kelompok_gaji.nama_kelompok}
                                    </Text>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>Gaji</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="Gaji"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      Rp{" "}
                                      {formatNumber(
                                        data.kelompok_gaji.besaran_gaji
                                      )}
                                    </Text>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>NPWP</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="NPWP"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      {data.npwp}
                                    </Text>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>No. Rekening</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="No. Rekening"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      {data.no_rekening}
                                    </Text>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>Kode PTKP</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="Kode PTKP"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      {data.ptkp.kode_ptkp}
                                    </Text>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>Uang Makan</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="Uang Makan"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      Rp {formatNumber(data.uang_makan)}
                                    </Text>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>Uang Lembur</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="Uang Lembur"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      Rp {formatNumber(data.uang_lembur)}
                                    </Text>
                                  </HStack>
                                </VStack>
                              </VStack>

                              <VStack align={"stretch"} gap={0}>
                                <Text fontSize={20} fontWeight={600} mb={4}>
                                  Data Tunjangan
                                </Text>

                                <VStack align={"stretch"} gap={4}>
                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>Jabatan</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="Jabatan"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      Rp {formatNumber(data.tunjangan_jabatan)}
                                    </Text>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>Fungsional</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="Fungsional"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      Rp{" "}
                                      {formatNumber(data.tunjangan_fungsional)}
                                    </Text>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>Khusus</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="Khusus"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      Rp {formatNumber(data.tunjangan_khusus)}
                                    </Text>
                                  </HStack>

                                  <HStack justify={"space-between"}>
                                    {/* <Text opacity={0.6}>Lainnya</Text> */}
                                    <Box opacity={0.6}>
                                      <Highlighter
                                        highlightClassName="hw"
                                        unhighlightClassName="uw"
                                        searchWords={searchQuery}
                                        autoEscape={true}
                                        textToHighlight="Lainnya"
                                      />
                                    </Box>
                                    <FlexLine />
                                    <Text fontWeight={500} textAlign={"right"}>
                                      Rp {formatNumber(data.tunjangan_lainnya)}
                                    </Text>
                                  </HStack>
                                </VStack>
                              </VStack>
                            </VStack>
                          </CContainer>
                        </VStack>
                      </Wrap>
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
