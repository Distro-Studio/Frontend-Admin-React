import {
  RiBuilding2Fill,
  RiGroupFill,
  RiHome6Fill,
  RiMoneyDollarCircleFill,
  RiTimeFill,
  RiTimerFill,
} from "@remixicon/react";

const navs = [
  {
    label: "Dashboard",
    link: "/dashboard",
    icon: RiHome6Fill,
  },
  {
    label: "Karyawan",
    link: "/karyawan",
    icon: RiGroupFill,
    subNavs: [
      {
        label: "Karyawan",
        link: "/karyawan",
      },
      {
        label: "Transfer Karyawan",
        link: "/karyawan/transfer-karyawan",
      },
    ],
  },
  {
    label: "Presensi",
    link: "/presensi",
    icon: RiTimerFill,
  },
  {
    label: "Jadwal",
    link: "/jadwal",
    icon: RiTimeFill,
    subNavs: [
      {
        label: "Jadwal",
        link: "/jadwal",
      },
      {
        label: "Penukaran Jadwal",
        link: "/jadwal/penukaran-jadwal",
      },
      {
        label: "Lembur",
        link: "/jadwal/lembur",
      },
      {
        label: "Cuti",
        link: "/jadwal/cuti",
      },
    ],
  },
  {
    label: "Keuangan",
    link: "/keuangan/penggajian",
    icon: RiMoneyDollarCircleFill,
    subNavs: [
      {
        label: "Penggajian",
        link: "/keuangan/penggajian",
      },
      {
        label: "THR",
        link: "/keuangan/thr",
      },
    ],
  },
  {
    label: "Perusahaan",
    link: "/perusahaan/diklat",
    icon: RiBuilding2Fill,
    subNavs: [
      {
        label: "Diklat",
        link: "/perusahaan/diklat",
      },
      {
        label: "Pelaporan Karyawan",
        link: "/perusahaan/pelaporan-karyawan",
      },
      {
        label: "Penilaian Karyawan",
        link: "/perusahaan/penilaian-karyawan",
      },
    ],
  },
];

export default navs;
