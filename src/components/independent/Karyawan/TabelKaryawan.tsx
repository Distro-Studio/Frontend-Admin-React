import { useState } from "react";
import {
  Karyawan__Interface,
  Tabel__Column__Interface,
} from "../../../const/interfaces";
import Tabel from "../../dependent/Tabel";
import Skeleton from "../Skeleton";

export default function TabelKaryawan() {
  const columns: Tabel__Column__Interface[] = [
    {
      key: "nama",
      label: "Nama",
      dataType: "avatarAndName",
    },
    {
      key: "no_induk_karyawan",
      label: "No. Induk Karyawan",
      dataType: "string",
    },
    {
      key: "rm",
      label: "RM",
      dataType: "string",
    },
    {
      key: "nik",
      label: "NIK",
      dataType: "string",
    },
    {
      key: "unit_kerja",
      label: "Unit Kerja",
      dataType: "string",
    },
    {
      key: "status_karyawan",
      label: "Status Karyawan",
      dataType: "badge",
    },
    {
      key: "tempat_lahir",
      label: "Tempat Lahir",
      dataType: "string",
    },
    {
      key: "tgl_lahir",
      label: "Tanggal Lahir",
      dataType: "date",
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
      tgl_lahir: "Wed May 08 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/code-beast",
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
      tgl_lahir: "Wed May 08 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/code-beast",
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
      tgl_lahir: "Wed Mar 13 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/code-beast",
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
      tgl_lahir: "Wed Jan 24 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/code-beast",
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
      tgl_lahir: "Fri May 10 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/code-beast",
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
      tgl_lahir: "Wed Nov 10 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/code-beast",
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
      tgl_lahir: "Wed May 09 2024 14:25:37 GMT+0700 (Indochina Time)",
      avatar: "https://bit.ly/code-beast",
    },
  ];

  //! DEBUG

  const [data] = useState<Karyawan__Interface[] | null>(dummy);
  const [loading] = useState<boolean>(false);

  const date = new Date();
  const tanggal = date.getDate();
  console.log(tanggal);

  return (
    <>
      {loading && <Skeleton />}

      {!loading && data && <Tabel columns={columns} data={data} />}
    </>
  );
}
