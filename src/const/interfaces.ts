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
  id: number;
  user_id?: string;
  nama: string;
  no_rm?: string;
  username?: string;
  email?: string;
  no_manulife?: string;
  tgl_masuk?: Date | string;
  unit_kerja?: string;
  jabatan?: string;
  profesi?: string;
  uang_lembur?: number;
  nik?: string;
  nik_ktp?: string;
  gelar_depan?: string;
  tempat_lahir?: string;
  tgl_lahir?: string;
  alamat?: string;
  no_hp?: string;
  no_bpjsksh?: string;
  no_bpjsktk?: string;
  tgl_diangkat?: Date | string;
  masa_kerja?: string;
  tgl_keluar?: Date | string;
  npwp?: string;
  no_rekening?: string;
  jenis_kelamin?: string;
  agama?: string;
  golongan_darah?: string;
  mtinggi_badan?: string;
  berat_badan?: string;
  no_ijasah?: string;
  tahun_lulus?: string;
  no_kk?: string;
  status_karyawan?: string;
  kelompok_gaji?: string;
  no_str?: string;
  masa_berlaku_str?: string;
  no_sip?: string;
  masa_berlaku_sip?: string;
  tgl_berakhir_pks?: string;
  ptkp?: string;
  masa_diklat?: string;
  foto_profil: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
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
    | "action";
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
    masuk: number;
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

export interface Unit__Kerja__Interface {}
