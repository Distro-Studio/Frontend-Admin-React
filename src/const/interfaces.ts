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
  dataType: "string" | "number" | "date" | "badge" | "avatarAndName";
}
