import { atom, atomFamily } from "recoil";

type TodoState = {
  text: string;
  isComplete: boolean;
};

export const todoKeysAtom = atom<string[]>({
  key: "atom/todoKeys",
  default: [],
});

export const todoAtom = atomFamily<TodoState, string>({
  key: "todo",
  default: {
    text: "",
    isComplete: false,
  },
});
