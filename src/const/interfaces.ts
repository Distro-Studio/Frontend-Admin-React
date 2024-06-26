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
  value?: number | null;
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
    | "duration"
    | "time"
    | "modal";
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
  laporan: {
    id: number;
  };
  status: string;
}

export interface Unit__Kerja__Interface {}

export interface DetailKaryawan {
  id: number;
  user: User;
  email: string;
  no_rm: number;
  no_manulife: number;
  tgl_masuk: Date;
  unit_kerja: UnitKerja;
  jabatan: Jabatan;
  kompetensi: Kompetensi;
  role: Role;
  nik: string;
  nik_ktp: string;
  status_karyawan: StatusKaryawan;
  tempat_lahir: string;
  tgl_lahir: Date;
  kelompok_gaji: KelompokGaji;
  no_rekening: string;
  tunjangan_jabatan: number;
  tunjangan_fungsional: number;
  tunjangan_khusus: number;
  tunjangan_lainnya: number;
  uang_lembur: number;
  uang_makan: number;
  ptkp: Ptkp;
  tgl_keluar: Date;
  no_kk: string;
  alamat: string;
  gelar_depan: string;
  no_hp: string;
  no_bpjsksh: string;
  no_bpjsktk: string;
  tgl_diangkat: Date;
  masa_kerja: string;
  npwp: string;
  jenis_kelamin: string;
  agama: string;
  golongan_darah: string;
  tinggi_badan: number;
  berat_badan: number;
  no_ijazah: string;
  tahun_lulus: number;
  no_str: string;
  masa_berlaku_str: Date;
  no_sip: string;
  masa_berlaku_sip: Date;
  tgl_berakhir_pks: Date;
  masa_diklat: number;
  created_at: Date;
  updated_at: Date;
}

export interface Jabatan {
  id: number;
  nama_jabatan: string;
  is_struktural: number;
  tunjangan: number;
  created_at: Date;
  updated_at: Date;
}

export interface KelompokGaji {
  id: number;
  nama_kelompok: string;
  besaran_gaji: number;
  created_at: Date;
  updated_at: Date;
}

export interface Kompetensi {
  id: number;
  nama_kompetensi: string;
  jenis_kompetensi: number;
  total_tunjangan: number;
  created_at: Date;
  updated_at: Date;
}

export interface Ptkp {
  id: number;
  kode_ptkp: string;
  kategori_ter_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface Role {
  id: number;
  name: string;
  deskripsi: string;
  guard_name: string;
  created_at: Date;
  updated_at: Date;
  pivot: Pivot;
}

export interface Pivot {
  model_type: string;
  model_id: number;
  role_id: number;
}

export interface StatusKaryawan {
  id: number;
  label: string;
}

export interface UnitKerja {
  id: number;
  nama_unit: string;
  jenis_karyawan: number;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: number;
  nama: string;
  username: string;
  email_verified_at: null;
  role_id: null;
  foto_profil: null;
  data_completion_step: number;
  status_aktif: number;
  created_at: Date;
  updated_at: Date;
  roles: Role;
}
