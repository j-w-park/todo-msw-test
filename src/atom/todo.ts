import { atom, atomFamily } from "recoil";

type TodoState = {
  title: string;
  isComplete: boolean;
};

export const todoKeysAtom = atom<string[]>({
  key: "atom/todoKeys",
  default: [],
});

export const todoAtom = atomFamily<TodoState, string>({
  key: "todo",
  default: {
    title: "",
    isComplete: false,
  },
});
