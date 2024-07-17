import { create } from "zustand";

const defaultFilterConfig = {
  search: "",
  unit_kerja: [],
  status_karyawan: [],
  masa_kerja: undefined,
  status_aktif: undefined,
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
