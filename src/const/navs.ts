import {
  RiBuilding2Fill,
  RiGroupFill,
  RiHome6Fill,
  RiMoneyDollarCircleFill,
  RiSettingsFill,
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
  },
  {
    label: "Keuangan",
    link: "/keuangan/penggajian",
    icon: RiMoneyDollarCircleFill,
  },
  {
    label: "Perusahaan",
    link: "/perusahaan/diklat",
    icon: RiBuilding2Fill,
  },
  {
    label: "Pengaturan",
    link: "/pengaturan/akun/kelola-role",
    icon: RiSettingsFill,
  },
];

export default navs;
