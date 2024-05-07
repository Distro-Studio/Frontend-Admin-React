import { create } from "zustand";

interface State {
  detailJadwalId: number | null;
}

interface Actions {
  setDetailJadwalId: (newState: State["detailJadwalId"]) => void;
}

const useDetailJadwal = create<State & Actions>((set) => ({
  detailJadwalId: null,
  setDetailJadwalId: (newState) => set({ detailJadwalId: newState }),
}));

export default useDetailJadwal;
