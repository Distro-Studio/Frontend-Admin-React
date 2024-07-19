import { create } from "zustand";

interface State {
  hiddenTableColumns: string[];
}

interface Actions {
  setHiddenTableColumns: (newState: string[]) => void;
}

const useHiddenTableColumns = create<State & Actions>((set) => ({
  hiddenTableColumns: [],
  setHiddenTableColumns: (newState: string[]) =>
    set({ hiddenTableColumns: newState }),
}));

export const initializeHiddenTableColumns = (
  initialHiddenTableColumns: string[]
) => {
  useHiddenTableColumns.setState({
    hiddenTableColumns: initialHiddenTableColumns,
  });
};

export default useHiddenTableColumns;
