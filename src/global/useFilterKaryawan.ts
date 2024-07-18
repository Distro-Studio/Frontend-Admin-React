import { create } from "zustand";

const defaultFilterConfig = {
  search: "",
  unit_kerja: [],
  status_karyawan: [],
  masa_kerja: [],
  status_aktif: [],
  tgl_masuk: [],
};

type State = {
  defaultFilterKaryawan: any;
  filterKaryawan: any;
};

type Actions = {
  setFilterKaryawan: (filterKaryawan: any) => void;
};

const useFilterKaryawan = create<State & Actions>((set) => ({
  defaultFilterKaryawan: defaultFilterConfig,
  filterKaryawan: defaultFilterConfig,
  setFilterKaryawan: (filterKaryawan) =>
    set(() => ({ filterKaryawan: filterKaryawan })),
}));

export default useFilterKaryawan;