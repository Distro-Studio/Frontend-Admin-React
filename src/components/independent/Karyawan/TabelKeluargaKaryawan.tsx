import { HStack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import {
  Karyawan__Interface,
  Tabel__Column__Interface,
} from "../../../const/interfaces";
import { responsiveSpacing } from "../../../const/sizes";
import Tabel from "../../dependent/Tabel";
import TabelContainer from "../../wrapper/TabelContainer";
import Skeleton from "../Skeleton";

interface Props {
  filterConfig?: any;
}

export default function TabelKeluargaKaryawan({ filterConfig }: Props) {
  const columns: Tabel__Column__Interface[] = [
    {
      key: "nama",
      label: "Nama",
      dataType: "avatarAndName",
    },
    {
      key: "ayah",
      label: "Ayah",
      dataType: "string",
    },
    {
      key: "ibu",
      label: "Ibu",
      dataType: "string",
    },
    {
      key: "jumlah_keluarga",
      label: "Jumlah Keluarga",
      dataType: "number",
      preferredW: "240px",
    },
  ];

  //! DEBUG
  const dummy = [
    {
      id: 1,
      nama: "Sulenq Wazawsky",
      jumlah_keluarga: "2",
      ayah: "Jonatan",
      ibu: "Aprilia",
      rm: "3214",
      nik: "3321231412412",
      unit_kerja: "Perawat Hewan",
      status_karyawan: "Kontrak",
      tempat_lahir: "Semarang",
      tgl_lahir: "Wed May 08 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/dan-abramov",
    },
    {
      id: 2,
      nama: "John Doe",
      jumlah_keluarga: "3",
      ayah: "Supardi Johar",
      ibu: "Srikandi Kendi",
      rm: "1234",
      nik: "4445556667778",
      unit_kerja: "Dokter",
      status_karyawan: "Tetap",
      tempat_lahir: "Jakarta",
      tgl_lahir: "Wed May 08 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/tioluwani-kolawole",
    },
    {
      id: 3,
      nama: "Jane Smith",
      jumlah_keluarga: "5",
      ayah: "Sukamsi",
      ibu: "Sarimi",
      rm: "5678",
      nik: "8889990001112",
      unit_kerja: "Administrasi",
      status_karyawan: "Kontrak",
      tempat_lahir: "Surabaya",
      tgl_lahir: "Wed Mar 13 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/kent-c-dodds",
    },
    {
      id: 4,
      nama: "Michael Johnson",
      jumlah_keluarga: "4",
      ayah: "Klerk",
      ibu: "Aranaya",
      rm: "9876",
      nik: "2223334445556",
      unit_kerja: "Keuangan",
      status_karyawan: "Tetap",
      tempat_lahir: "Bandung",
      tgl_lahir: "Wed Jan 24 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/ryan-florence",
    },
    {
      id: 5,
      nama: "Amanda Lee",
      jumlah_keluarga: "3",
      ayah: "Joseph",
      ibu: "Nada",
      rm: "3456",
      nik: "6667778889990",
      unit_kerja: "Pemasaran",
      status_karyawan: "Kontrak",
      tempat_lahir: "Yogyakarta",
      tgl_lahir: "Fri May 10 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/prosper-baba",
    },
    {
      id: 6,
      nama: "Kevin Brown",
      jumlah_keluarga: "2",
      ayah: "Nolan",
      ibu: "Kadita",
      rm: "2468",
      nik: "1112223334445",
      unit_kerja: "IT",
      status_karyawan: "Tetap",
      tempat_lahir: "Medan",
      tgl_lahir: "Wed Nov 10 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/sage-adebayo",
    },
    {
      id: 7,
      nama: "Maria Garcia",
      jumlah_keluarga: "2",
      ayah: "Terizla",
      ibu: "Nanabi",
      rm: "1357",
      nik: "9990001112223",
      unit_kerja: "Pelayanan Pelanggan",
      status_karyawan: "Kontrak",
      tempat_lahir: "Denpasar",
      tgl_lahir: "Wed May 09 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/code-beast",
    },
    {
      id: 8,
      nama: "Sulenq Wazawsky",
      jumlah_keluarga: "1",
      ayah: "Balmon",
      ibu: "Miyabi",
      rm: "3214",
      nik: "3321231412412",
      unit_kerja: "Perawat Hewan",
      status_karyawan: "Kontrak",
      tempat_lahir: "Semarang",
      tgl_lahir: "Wed May 08 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/dan-abramov",
    },
    {
      id: 9,
      nama: "John Doe",
      jumlah_keluarga: "5",
      ayah: "Gunandar",
      ibu: "Pipik",
      rm: "1234",
      nik: "4445556667778",
      unit_kerja: "Dokter",
      status_karyawan: "Tetap",
      tempat_lahir: "Jakarta",
      tgl_lahir: "Wed May 08 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/tioluwani-kolawole",
    },
    {
      id: 10,
      nama: "Jane Smith",
      jumlah_keluarga: "2",
      ayah: "Arif",
      ibu: "Sinta",
      rm: "5678",
      nik: "8889990001112",
      unit_kerja: "Administrasi",
      status_karyawan: "Kontrak",
      tempat_lahir: "Surabaya",
      tgl_lahir: "Wed Mar 13 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/kent-c-dodds",
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
          noMore
          noCheckList
          action={"Detail"}
        />
      )}
    </>
  );
}
