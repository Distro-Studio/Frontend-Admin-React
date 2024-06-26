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
        label: "Jabatan",
      },
      {
        link: "/pengaturan/karyawan/unit-kerja",
        label: "Unit kerja",
      },
      {
        link: "/pengaturan/karyawan/kompetensi",
        label: "Kompetensi",
      },
      {
        link: "/pengaturan/karyawan/kuisioner",
        label: "Kuisioner",
      },
    ],
  },
  {
    label: "Keuangan",
    link: "/pengaturan/keuangan/premi",
    subNavs: [
      {
        link: "/pengaturan/keuangan/premi",
        label: "Premi",
      },
      {
        link: "/pengaturan/keuangan/ter-pph21",
        label: "TER pph21",
      },
      {
        link: "/pengaturan/keuangan/jadwal-penggajian",
        label: "Jadwal Penggajian",
      },
      {
        link: "/pengaturan/keuangan/thr",
        label: "THR",
      },
    ],
  },
  {
    label: "Manajemen Waktu",
    link: "/pengaturan/manajemen-waktu/shift",
    subNavs: [
      {
        link: "/pengaturan/manajemen-waktu/shift",
        label: "Shift",
      },
      {
        link: "/pengaturan/manajemen-waktu/hari-libur",
        label: "Hari Libur",
      },
      {
        link: "/pengaturan/manajemen-waktu/cuti",
        label: "Tipe Cuti",
      },
    ],
  },
];

export default pengaturanTopNavs;
