import { create } from "zustand";

interface State {
  tabelKaryawanColumns: number[];
}

interface Actions {
  setTabelKaryawanColumns: (newState: number[]) => void;
}

const useTabelKaryawanColumns = create<State & Actions>((set) => ({
  tabelKaryawanColumns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  setTabelKaryawanColumns: (newState: number[]) =>
    set({ tabelKaryawanColumns: newState }),
}));

export default useTabelKaryawanColumns;
