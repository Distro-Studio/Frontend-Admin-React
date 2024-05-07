export interface AttendanceDataInterface {
  masuk: string;
  keluar: string;
  jam_kerja: number;
  office_lat: number;
  office_lng: number;
}

export interface AktivitasInterface {
  type: string;
  timestamp: string;
}

export interface UserDataInterface {
  name: string;
  role: string;
  image: string;
  is_complete: boolean;
}

export interface SelectItemInterface {
  value: number;
  label: string;
}

export interface JadwalInterface {
  id: number;
  masuk: string; // bisa untuk tanggal hari libur
  minggu?: number;
  keluar?: string | null;
  label?: string | null; // Nama Shift
  assignees?: KaryawanInterface[];
  keterangan?: string;
}

export interface KaryawanInterface {
  id: number;
  name: string;
  image: string;
  role: string;
  status?: ValidStatusType;
  schedules?: JadwalInterface[];
}

export type ValidStatusType = "Kerja" | "Cuti" | "Izin" | "Libur";
