import { atom, atomFamily } from "recoil";

type TodoState = {
  title: string;
  done: boolean;
};

export const todoKeysAtom = atom<string[]>({
  key: "atom/todoKeys",
  default: [],
});

export const todoAtom = atomFamily<TodoState, string>({
  key: "todo",
  default: {
    title: "",
    done: false,
  },
});
