import { create } from "zustand";

interface State {
  detailKaryawanId: number | null;
}

interface Actions {
  setDetailKaryawanId: (newState: State["detailKaryawanId"]) => void;
}

const useDetailKaryawan = create<State & Actions>((set) => ({
  detailKaryawanId: null,
  setDetailKaryawanId: (newState) => set({ detailKaryawanId: newState }),
}));

export default useDetailKaryawan;
