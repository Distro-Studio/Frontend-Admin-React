import { create } from "zustand";

type State = {
  trigger: boolean;
};

type Actions = {
  setTrigger: (trigger: boolean) => void;
};

const useTrigger = create<State & Actions>((set) => ({
  trigger: false,
  setTrigger: (trigger) => set(() => ({ trigger: trigger })),
}));

export default useTrigger;
