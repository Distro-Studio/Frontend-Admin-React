import { useState } from "react";
import {
  Karyawan__Interface,
  Tabel__Column__Interface,
} from "../../../../const/interfaces";
import Tabel from "../../Tabel";
import Skeleton from "../../../independent/Skeleton";
import TabelContainer from "../../../wrapper/TabelContainer";
import { HStack, VStack } from "@chakra-ui/react";
import { responsiveSpacing } from "../../../../const/sizes";

interface Props {
  filterConfig?: any;
}

export default function TabelRekamJejak({ filterConfig }: Props) {
  const columns: Tabel__Column__Interface[] = [
    {
      key: "nama",
      label: "Nama",
      dataType: "avatarAndName",
    },
    {
      key: "tgl_masuk",
      label: "Tanggal Masuk",
      dataType: "date",
    },
    {
      key: "tgl_keluar",
      label: "Tanggal Keluar",
      dataType: "date",
    },
    {
      key: "masa_kerja",
      label: "Masa Kerja",
      dataType: "string",
    },
    {
      key: "promosi",
      label: "Promosi",
      dataType: "string",
    },
    {
      key: "mutasi",
      label: "Mutasi",
      dataType: "string",
    },
    {
      key: "pernghargaan",
      label: "Pengharagaan",
      dataType: "string",
    },
  ];

  //! DEBUG
  const dummy = [
    {
      id: 1,
      nama: "Sulenq Wazawsky",
      no_induk_karyawan: "412123143",
      rm: "3214",
      nik: "3321231412412",
      unit_kerja: "Perawat Hewan",
      status_karyawan: "Kontrak",
      tempat_lahir: "Semarang",
      tgl_masuk: "Wed May 08 2024 14:25:37 GMT+0700 (Indochina Time)",
      tgl_keluar: "Wed May 08 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/dan-abramov",
    },
    {
      id: 2,
      nama: "John Doe",
      no_induk_karyawan: "111222333",
      rm: "1234",
      nik: "4445556667778",
      unit_kerja: "Dokter",
      status_karyawan: "Tetap",
      tempat_lahir: "Jakarta",
      tgl_masuk: "Wed May 08 2024 14:25:37 GMT+0700 (Indochina Time)",
      tgl_keluar: "Wed May 08 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/tioluwani-kolawole",
    },
    {
      id: 3,
      nama: "Jane Smith",
      no_induk_karyawan: "987654321",
      rm: "5678",
      nik: "8889990001112",
      unit_kerja: "Administrasi",
      status_karyawan: "Kontrak",
      tempat_lahir: "Surabaya",
      tgl_masuk: "Wed Mar 13 2024 14:25:37 GMT+0700 (Indochina Time)",
      tgl_keluar: "Wed Mar 13 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/kent-c-dodds",
    },
    {
      id: 4,
      nama: "Michael Johnson",
      no_induk_karyawan: "654321789",
      rm: "9876",
      nik: "2223334445556",
      unit_kerja: "Keuangan",
      status_karyawan: "Tetap",
      tempat_lahir: "Bandung",
      tgl_masuk: "Wed Jan 24 2024 14:25:37 GMT+0700 (Indochina Time)",
      tgl_keluar: "Wed Jan 24 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/ryan-florence",
    },
    {
      id: 5,
      nama: "Amanda Lee",
      no_induk_karyawan: "789456123",
      rm: "3456",
      nik: "6667778889990",
      unit_kerja: "Pemasaran",
      status_karyawan: "Kontrak",
      tempat_lahir: "Yogyakarta",
      tgl_masuk: "Fri May 10 2024 14:25:37 GMT+0700 (Indochina Time)",
      tgl_keluar: "Fri May 10 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/prosper-baba",
    },
    {
      id: 6,
      nama: "Kevin Brown",
      no_induk_karyawan: "555666777",
      rm: "2468",
      nik: "1112223334445",
      unit_kerja: "IT",
      status_karyawan: "Tetap",
      tempat_lahir: "Medan",
      tgl_masuk: "Wed Nov 10 2024 14:25:37 GMT+0700 (Indochina Time)",
      tgl_keluar: "Wed Nov 10 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/sage-adebayo",
    },
    {
      id: 7,
      nama: "Maria Garcia",
      no_induk_karyawan: "123456789",
      rm: "1357",
      nik: "9990001112223",
      unit_kerja: "Pelayanan Pelanggan",
      status_karyawan: "Kontrak",
      tempat_lahir: "Denpasar",
      tgl_masuk: "Wed May 09 2024 14:25:37 GMT+0700 (Indochina Time)",
      tgl_keluar: "Wed May 09 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/code-beast",
    },
    {
      id: 8,
      nama: "Sulenq Wazawsky",
      no_induk_karyawan: "412123143",
      rm: "3214",
      nik: "3321231412412",
      unit_kerja: "Perawat Hewan",
      status_karyawan: "Kontrak",
      tempat_lahir: "Semarang",
      tgl_masuk: "Wed May 08 2024 14:25:37 GMT+0700 (Indochina Time)",
      tgl_keluar: "Wed May 08 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/dan-abramov",
    },
    {
      id: 9,
      nama: "John Doe",
      no_induk_karyawan: "111222333",
      rm: "1234",
      nik: "4445556667778",
      unit_kerja: "Dokter",
      status_karyawan: "Tetap",
      tempat_lahir: "Jakarta",
      tgl_masuk: "Wed May 08 2024 14:25:37 GMT+0700 (Indochina Time)",
      tgl_keluar: "Wed May 08 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/tioluwani-kolawole",
    },
    {
      id: 10,
      nama: "Jane Smith",
      no_induk_karyawan: "987654321",
      rm: "5678",
      nik: "8889990001112",
      unit_kerja: "Administrasi",
      status_karyawan: "Kontrak",
      tempat_lahir: "Surabaya",
      tgl_masuk: "Wed Mar 13 2024 14:25:37 GMT+0700 (Indochina Time)",
      tgl_keluar: "Wed Mar 13 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/kent-c-dodds",
    },
    {
      id: 11,
      nama: "Michael Johnson",
      no_induk_karyawan: "654321789",
      rm: "9876",
      nik: "2223334445556",
      unit_kerja: "Keuangan",
      status_karyawan: "Tetap",
      tempat_lahir: "Bandung",
      tgl_masuk: "Wed Jan 24 2024 14:25:37 GMT+0700 (Indochina Time)",
      tgl_keluar: "Wed Jan 24 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/ryan-florence",
    },
    {
      id: 12,
      nama: "Amanda Lee",
      no_induk_karyawan: "789456123",
      rm: "3456",
      nik: "6667778889990",
      unit_kerja: "Pemasaran",
      status_karyawan: "Kontrak",
      tempat_lahir: "Yogyakarta",
      tgl_masuk: "Fri May 10 2024 14:25:37 GMT+0700 (Indochina Time)",
      tgl_keluar: "Fri May 10 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/prosper-baba",
    },
  ];
  // console.log(filterConfig);
  //! DEBUG

  const [data] = useState<Karyawan__Interface[] | null>(dummy);
  const [loading] = useState<boolean>(false);

  // Limit Config
  const [limitConfig, setLimitConfig] = useState<number>(10);

  // Pagination Config
  const [pageConfig, setPageConfig] = useState<number>(1);

  return (
    <>
      {loading && (
        <>
          <TabelContainer p={responsiveSpacing}>
            <VStack h={"100%"} align={"stretch"} gap={responsiveSpacing}>
              <Skeleton h={"52px"} />
              <Skeleton flex={1} flexShrink={0} />
            </VStack>
          </TabelContainer>

          <HStack justify={"space-between"} mt={responsiveSpacing}>
            <Skeleton h={"40px"} w={"120px"} />
            <Skeleton h={"40px"} w={"120px"} />
          </HStack>
        </>
      )}

      {!loading && data && (
        <Tabel
          columns={columns}
          data={data}
          paginationData={{
            prev_page_url: "",
            next_page_url: "",
            last_page: 1,
          }}
          pageConfig={pageConfig}
          setPageConfig={setPageConfig}
          limitConfig={limitConfig}
          setLimitConfig={setLimitConfig}
        />
      )}
    </>
  );
}
