import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RiArrowRightLine, RiCircleFill, RiFileLine } from "@remixicon/react";
import { useState } from "react";
import formatDate from "../../lib/formatDate";
import CContainer from "../wrapper/CContainer";
import SmallLink from "./SmallLink";
import BooleanBadge from "./BooleanBadge";
import formatNumber from "../../lib/formatNumber";
import { Link } from "react-router-dom";

const PerubahanDataItem = ({ data }: { data: any }) => {
  const dataLabels = {
    foto_profil: "Foto Profil",
    nama: "Nama Lengkap",
    tgl_lahir: "Tanggal Lahir",
    no_hp: "Nomor Telpon",
    jenis_kelamin: "Jenis Kelamin",
    nik_ktp: "Nomor Induk Kependudukan",
    no_kk: "Nomor Kartu Keluarga",
    agama: "Agama",
    golongan_darah: "Golongan Darah",
    tinggi_badan: "Tinggi Badan",
    alamat: "Alamat",
    no_ijazah: "Nomor Ijazah Terakhir",
    tahun_lulus: "Tahun Lulus Ijazah Terakhir",
    keluarga: "Keluarga",
    ktp: "KTP",
    kk: "Kartu Keluarga",
    sip: "SIP",
    bpjsksh: "BPJS Kesehatan",
    bpjsktk: "BPJS Ketenagakerjaan",
    ijazah: "Ijazah Terakhir",
    sertifikat_kompetensi: "Sertifikat Kompetensi",
  };

  const PerubahanDataRender = ({ kolom, type }: any) => {
    switch (kolom) {
      default:
        return <Text>{data[type]}</Text>;
      case "foto_profil":
        return (
          <Image
            maxW={"40px"}
            src={data[type]}
            aspectRatio={1}
            objectFit={"cover"}
            borderRadius={"full"}
          />
        );
      case "tgl_lahir":
        return <Text whiteSpace={"nowrap"}>{formatDate(data[type])}</Text>;
      case "golongan_darah":
      case "agama":
        return <Text whiteSpace={"nowrap"}>{data[type].label}</Text>;
      case "tinggi_badan":
        return <Text whiteSpace={"nowrap"}>{formatNumber(data[type])} cm</Text>;
      case "ktp":
      case "bpjsksh":
      case "bpjsktk":
      case "ijazah":
      case "sertifikat_kompetensi":
        return (
          <Link to={data[type]}>
            <CContainer
              p={4}
              borderRadius={8}
              align={"center"}
              // border={"1px solid var(--divider)"}
            >
              <Icon as={RiFileLine} fontSize={52} />
              <Text fontSize={12} mt={2} noOfLines={1} opacity={0.4}>
                {data[type]}
              </Text>
            </CContainer>
          </Link>
        );
    }
  };

  return (
    <CContainer gap={3}>
      <HStack>
        <Text minW={"160px"} opacity={0.6}>
          Kolom
        </Text>
        {/* @ts-ignore */}
        <Text fontWeight={500}>{dataLabels[data.kolom]}</Text>
      </HStack>

      <HStack>
        <Text minW={"160px"} opacity={0.6}>
          Tanggal Diproses
        </Text>
        <Text fontWeight={500}>{formatDate(data.updated_at)}</Text>
      </HStack>

      <HStack>
        <Text minW={"160px"} opacity={0.6}>
          Data Pengajuan
        </Text>

        <HStack>
          <Box flex={1}>
            <PerubahanDataRender kolom={data.kolom} type={"original_data"} />
          </Box>

          <Icon as={RiArrowRightLine} mx={2} />

          <Box flex={1}>
            <PerubahanDataRender kolom={data.kolom} type={"updated_data"} />
          </Box>
        </HStack>
      </HStack>

      <HStack>
        <Text minW={"160px"} opacity={0.6}>
          Status
        </Text>
        <BooleanBadge
          data={data.status_perubahan}
          trueValue="Disetujui"
          falseValue="Ditolak"
        />
      </HStack>
    </CContainer>
  );
};

const TransferKaryanItem = ({ data }: { data: any }) => {
  return (
    <CContainer gap={3}>
      <HStack>
        <Text minW={"160px"} opacity={0.6}>
          Tanggal Mulai
        </Text>
        <Text fontWeight={500}>{formatDate(data.tgl_mulai)}</Text>
      </HStack>

      <HStack>
        <Text minW={"160px"} opacity={0.6}>
          Unit Kerja Asal
        </Text>
        <Text fontWeight={500}>{data.unit_kerja_asal.nama_unit}</Text>
      </HStack>

      <HStack>
        <Text minW={"160px"} opacity={0.6}>
          Unit Kerja Tujuan
        </Text>
        <Text fontWeight={500}>{data.unit_kerja_tujuan.nama_unit}</Text>
      </HStack>

      <HStack>
        <Text minW={"160px"} opacity={0.6}>
          Jabatan Asal
        </Text>
        <Text fontWeight={500}>{data.jabatan_asal.nama_jabatan}</Text>
      </HStack>

      <HStack>
        <Text minW={"160px"} opacity={0.6}>
          Jabatan Tujuan
        </Text>
        <Text fontWeight={500}>{data.jabatan_tujuan.nama_jabatan}</Text>
      </HStack>

      <HStack align={"start"}>
        <Text minW={"160px"} opacity={0.6}>
          Alasan
        </Text>
        <Text fontWeight={500}>{data.alasan}</Text>
      </HStack>

      <HStack align={"start"}>
        <Text minW={"160px"} opacity={0.6}>
          Dokumen
        </Text>
        <SmallLink to={data.dokumen} className="btn-apa">
          Lihat
        </SmallLink>
      </HStack>
    </CContainer>
  );
};

interface Props {
  dataList: any[];
  data: any;
  index: number;
}

export default function DetailRekamJejakItem({ dataList, data, index }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 1 Perubahan Data
  // 2 Mutasi Karyawan
  // 3 Promosi Karyawan
  // 4 Feedback

  return (
    <HStack align={"stretch"} gap={8}>
      {/* The Line */}
      <VStack>
        <Box h={"16px"} w={"1px"} bg={"var(--divider3)"} />

        <Center p={1} borderRadius={"full"} bg={"var(--p500a3)"}>
          <Icon as={RiCircleFill} color={"p.500"} />
        </Center>

        <Box
          flex={1}
          w={"1px"}
          bg={"var(--divider3)"}
          opacity={index === dataList.length - 1 ? 0 : 1}
        />
      </VStack>

      {/* Content */}
      <Box
        w={"100%"}
        transition={"200ms"}
        pt={2}
        pb={index === data.length - 1 ? 0 : 2}
      >
        <Accordion allowMultiple>
          <AccordionItem
            border={"none"}
            borderRadius={12}
            bg={"var(--divider)"}
            overflow={"clip"}
          >
            <AccordionButton
              as={HStack}
              cursor={"pointer"}
              justify={"space-between"}
              py={4}
              px={6}
              className="btn"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <HStack>
                <Text fontWeight={600} fontSize={18}>
                  {data.kategori.label}
                </Text>
                <Text>-</Text>
                <Text>{formatDate(data.created_at)}</Text>
              </HStack>
              <AccordionIcon ml={4} />
            </AccordionButton>

            <AccordionPanel px={6} pb={5}>
              {data.kategori.id === 1 && (
                <PerubahanDataItem data={data.content} />
              )}

              {(data.kategori.id === 2 || data.kategori.id === 3) && (
                <TransferKaryanItem data={data.content} />
              )}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </HStack>
  );
}
