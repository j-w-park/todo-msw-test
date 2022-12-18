import { atom, atomFamily } from "recoil";
import { Todo } from "../mocks/types";

export const todoListAtom = atom<Todo[]>({
  key: "atom/todoList",
  default: [],
});

export const todoItemAtom = atomFamily<Todo, Todo["id"]>({
  key: "atom/todoItem",
  default: {
    id: "",
    title: "",
    done: false,
  },
});
