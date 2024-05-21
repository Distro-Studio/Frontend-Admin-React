const pengaturanTopNavs = [
  {
    label: "Akun",
    link: "/pengaturan/akun/kelola-role",
    subNavs: [
      {
        link: "/pengaturan/akun/kelola-role",
        label: "Kelola Role",
      },
      {
        link: "/pengaturan/akun/ubah-kata-sandi",
        label: "Ubah Kata Sandi",
      },
    ],
  },
  {
    label: "Karyawan",
    link: "/pengaturan/karyawan/kelompok-gaji",
    subNavs: [
      {
        link: "/pengaturan/karyawan/kelompok-gaji",
        label: "Kelompok Gaji",
      },
      {
        link: "/pengaturan/karyawan/jabatan",
        label: "Jabtan",
      },
      {
        link: "/pengaturan/karyawan/unit-kerja",
        label: "Unit kerja",
      },
      {
        link: "/pengaturan/karyawan/kompetensi",
        label: "Kompetensi",
      },
    ],
  },
  {
    label: "Keuangan",
    link: "/pengaturan/keuangan/premi",
  },
  {
    label: "Manajemen Waktu",
    link: "/pengaturan/manajemen-waktu/shift",
  },
];

export default pengaturanTopNavs;
