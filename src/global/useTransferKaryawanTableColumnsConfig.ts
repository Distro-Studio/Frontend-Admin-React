import { create } from "zustand";

interface State {
  clearedTableColumns: number[];
  allTableColumns: number[];
  tableColumns: number[];
}

interface Actions {
  setTableColumns: (newState: number[]) => void;
}

const allTableColumns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const useTransferKaryawanTableColumnsConfig = create<State & Actions>(
  (set) => ({
    clearedTableColumns: [0],
    allTableColumns: allTableColumns,
    tableColumns: allTableColumns,
    setTableColumns: (newState: number[]) => set({ tableColumns: newState }),
  })
);

export default useTransferKaryawanTableColumnsConfig;
