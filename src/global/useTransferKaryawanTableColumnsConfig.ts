import { create } from "zustand";

interface State {
  tableColumns: number[];
}

interface Actions {
  setTableColumns: (newState: number[]) => void;
}

const useTransferKaryawanTableColumnsConfig = create<State & Actions>(
  (set) => ({
    tableColumns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    setTableColumns: (newState: number[]) => set({ tableColumns: newState }),
  })
);

export default useTransferKaryawanTableColumnsConfig;
