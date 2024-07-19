import { create } from "zustand";

interface State {
  allColumns: { column: string; label: string }[];
  tabelKaryawanColumns: { column: string; label: string }[];
}

interface Actions {
  setTabelKaryawanColumns: (
    newState: { column: string; label: string }[]
  ) => void;
}

const allColumns = [
  { column: "nama", label: "Nama" },
  { column: "nik", label: "Nik" },
  { column: "no_rm", label: "No. Rekam Medis" },
  { column: "unit_kerja", label: "Unit Kerja" },
  { column: "status_karyawan", label: "Status Karyawan" },
  { column: "email", label: "Email" },
  { column: "username", label: "Username" },
  { column: "status_aktif", label: "Status Aktif" },
  { column: "ayah", label: "Ayah" },
  { column: "ibu", label: "Ibu" },
  { column: "jumlah_keluarga", label: "Jumlah Keluarga" },
  { column: "tgl_masuk", label: "Tanggal Masuk" },
  { column: "tgl_keluar", label: "Tanggal Keluar" },
  { column: "masa_kerja", label: "Masa Kerja" },
  { column: "promosi", label: "Promosi" },
  { column: "mutasi", label: "Mutasi" },
];

const useTabelKaryawanColumns = create<State & Actions>((set) => ({
  allColumns: allColumns,
  tabelKaryawanColumns: allColumns,
  setTabelKaryawanColumns: (newState: { column: string; label: string }[]) =>
    set({ tabelKaryawanColumns: newState }),
}));

export default useTabelKaryawanColumns;
