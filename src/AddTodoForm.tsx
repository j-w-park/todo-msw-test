import { nanoid } from "nanoid";
import { useRef } from "react";
import { useRecoilCallback } from "recoil";
import { todoKeysAtom, todoAtom } from "./atom/todo";

export const AddTodoForm = () => {
  const todoInputElementRef = useRef<HTMLInputElement>(null);

  const addTodo = useRecoilCallback(({ set }) => () => {
    const { current: todoInputElement } = todoInputElementRef;
    if (!todoInputElement) {
      return;
    }
    const todoKey = nanoid();
    set(todoKeysAtom, (prev) => [...prev, todoKey]);
    set(todoAtom(todoKey), { title: todoInputElement.value, isComplete: false });
    todoInputElement.focus();
  });

  return (
    <form>
      <input ref={todoInputElementRef} type="text" />
      <button
        onClick={(e) => {
          e.preventDefault();
          addTodo();
        }}
        type="submit"
      >
        + todo
      </button>
    </form>
  );
};
