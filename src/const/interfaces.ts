export interface Attendance__Data__Interface {
  masuk: string;
  keluar: string;
  jam_kerja: number;
  office_lat: number;
  office_lng: number;
}

export interface Aktivitas__Interface {
  type: string;
  timestamp: string;
}

export interface User__Data__Interface {
  name: string;
  role: string;
  image: string;
  is_complete: boolean;
}

export interface Select__Item__Interface {
  value: number;
  label: string;
}

export interface Jadwal__Interface {
  id: number;
  masuk: string; // bisa untuk tanggal hari libur
  minggu?: number;
  keluar?: string | null;
  label?: string | null; // Nama Shift
  assignees?: Karyawan__Interface[];
  keterangan?: string;
}

export interface User__Interface {
  id: number;
  nama: string;
  username: string;
  password: string;
  role_id: number;
  role: string;
  foto_profil: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Karyawan__Interface {
  agama?: string;
  alamat?: string;
  ayah?: string;
  berat_badan?: string;
  created_at?: string;
  email?: string;
  foto_profil: string;
  gelar_depan?: string;
  golongan_darah?: string;
  id: number;
  ibu?: string;
  is_active?: boolean;
  jabatan?: string;
  jenis_kelamin?: string;
  jumlah_keluarga?: number;
  kelompok_gaji?: string;
  laporan?: string;
  masa_berlaku_sip?: string;
  masa_berlaku_str?: string;
  masa_diklat?: string;
  masa_kerja?: string;
  mutasi?: string;
  nik?: string;
  nik_ktp?: string;
  no_bpjsksh?: string;
  no_bpjsktk?: string;
  no_hp?: string;
  no_ijasah?: string;
  no_kk?: string;
  no_manulife?: string;
  no_rekening?: string;
  no_rm?: string;
  no_sip?: string;
  no_str?: string;
  npwp?: string;
  nama?: string;
  penghargaan?: string;
  profesi?: string;
  promosi?: string;
  ptkp?: string;
  status_karyawan?: string;
  tgl_berakhir_pks?: string;
  tgl_diangkat?: Date | string;
  tgl_keluar?: Date | string;
  tgl_lahir?: string;
  tgl_masuk?: Date | string;
  tgl_mulai?: Date | string;
  tgl_selesai?: Date | string;
  tahun_lulus?: string;
  tempat_lahir?: string;
  tinggi_badan?: string;
  uang_lembur?: number;
  unit_kerja?: string;
  updated_at?: string;
  user_id?: string;
  username?: string;
}

export type Valid__Status__Type = "Kerja" | "Cuti" | "Izin" | "Libur";

export interface Dashboard__Total__Interface {
  totalKaryawan: number;
  totalLibur: number;
  totalCuti: number;
  totalIzinKerja: number;
}

export interface Jabatan__Interface {
  nama: string;
  jumlah: number;
}

export interface Pengumuman__Interface {
  id: number;
  judul: string;
  pengumuman: string;
  createdAt: string;
}

export interface TopNavs__Interface {
  label: string;
  link: string;
}

export interface Tabel__Column__Interface {
  key: string;
  label: string;
  actionLabel?: string;
  actionComponent?: any;
  dataType:
    | "string"
    | "number"
    | "numeric"
    | "date"
    | "badge"
    | "avatarAndName"
    | "link"
    | "action"
    | "duration";
  link?: string;
  preferredTextAlign?: string;
  action?: any;
  tdProps?: any;
  tdContentProps?: any;
  thProps?: any;
  thContentProps?: any;
  actionButtonProps?: any;
}

export interface Presensi__SUmmary__Interface {
  hadir: {
    tepat_waktu: number;
    terlambat: number;
    hadir: number;
  };
  tidak_hadir: {
    absen: number;
    izin: number;
    invalid: number;
  };
  libur: {
    hari_libur: number;
    cuti: number;
  };
}

export interface Riwayat__Penggajian__Interface {
  id: number;
  periode: string;
  updated_at: string;
  total_karyawan_terverifikasi: number;
  laporan: string;
  status: string;
}

export interface Unit__Kerja__Interface {}
