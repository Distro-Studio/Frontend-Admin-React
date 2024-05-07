import {
  RiCalendarFill,
  RiCalendarLine,
  RiHistoryFill,
  RiHistoryLine,
  RiHomeSmile2Fill,
  RiHomeSmile2Line,
  RiTeamFill,
  RiTeamLine,
  RiUserFill,
  RiUserLine,
} from "@remixicon/react";

const navs = [
  {
    label: "Beranda",
    link: "/beranda",
    icon: RiHomeSmile2Line,
    iconFill: RiHomeSmile2Fill,
  },
  {
    label: "Jadwal",
    link: "/jadwal",
    icon: RiCalendarLine,
    iconFill: RiCalendarFill,
  },
  {
    label: "Karyawan",
    link: "/karyawan",
    icon: RiTeamLine,
    iconFill: RiTeamFill,
  },
  {
    label: "Aktivitas",
    link: "/aktivitas",
    icon: RiHistoryLine,
    iconFill: RiHistoryFill,
  },
  {
    label: "Profil",
    link: "/profil",
    icon: RiUserLine,
    iconFill: RiUserFill,
  },
];

export default navs;
