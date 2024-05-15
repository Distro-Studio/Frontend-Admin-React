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

export interface Karyawan__Interface {
  id: number;
  nama: string;
  no_induk_karyawan?: string;
  rm?: string;
  nik?: string;
  unit_kerja: string;
  status_karyawan?: string;
  tempat_lahir?: string;
  tgl_lahir?: string;
  avatar: string;
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
