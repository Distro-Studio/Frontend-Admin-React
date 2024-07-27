import {
  RiGroup3Line,
  RiIdCardLine,
  RiLockLine,
  RiQuestionLine,
  RiUserSettingsLine,
  RiVerifiedBadgeLine,
  RiWalletLine,
} from "@remixicon/react";

const pengaturanNavs = [
  {
    groupName: "Akun",
    navs: [
      {
        icon: RiUserSettingsLine,
        label: "Kelola Role",
        link: "/pengaturan/akun/kelola-role",
      },
      {
        icon: RiLockLine,
        label: "Ubah Kata Sandi",
        link: "/pengaturan/akun/ubah-kata-sandi",
      },
    ],
  },
  {
    groupName: "Kepegawaian",
    navs: [
      {
        icon: RiWalletLine,
        label: "Kelompok Gaji",
        link: "/pengaturan/karyawan/kelompok-gaji",
      },
      {
        icon: RiIdCardLine,
        label: "Jabatan",
        link: "/pengaturan/karyawan/jabatan",
      },
      {
        icon: RiGroup3Line,
        label: "Unit Kerja",
        link: "/pengaturan/karyawan/unit-kerja",
      },
      {
        icon: RiVerifiedBadgeLine,
        label: "Kompetensi",
        link: "/pengaturan/karyawan/kompetensi",
      },
      {
        icon: RiQuestionLine,
        label: "Kuisioner",
        link: "/pengaturan/karyawan/kuisioner",
      },
    ],
  },
];

export default pengaturanNavs;
