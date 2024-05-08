import { useState } from "react";
import {
  Karyawan__Interface,
  Tabel__Column__Interface,
} from "../../../const/interfaces";
import Skeleton from "../Skeleton";
import Tabel from "../../dependent/Tabel";

export default function TabelKaryawan() {
  const columns: Tabel__Column__Interface[] = [
    {
      key: "nama",
      label: "Nama",
      dataType: "string",
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
      tanggal_lahir: "01/01/2001",
      foto_profil: "https://bit.ly/code-beast",
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
      tanggal_lahir: "12/12/1985",
      foto_profil: "https://bit.ly/code-beast",
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
      tanggal_lahir: "05/05/1990",
      foto_profil: "https://bit.ly/code-beast",
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
      tanggal_lahir: "20/09/1978",
      foto_profil: "https://bit.ly/code-beast",
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
      tanggal_lahir: "15/03/1988",
      foto_profil: "https://bit.ly/code-beast",
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
      tanggal_lahir: "08/08/1995",
      foto_profil: "https://bit.ly/code-beast",
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
      tanggal_lahir: "25/04/1983",
      foto_profil: "https://bit.ly/code-beast",
    },
  ];

  //! DEBUG

  const [data] = useState<Karyawan__Interface[] | null>(dummy);
  const [loading] = useState<boolean>(false);

  return (
    <>
      {loading && <Skeleton />}

      {!loading && data && <Tabel columns={columns} data={data} />}
    </>
  );
}
