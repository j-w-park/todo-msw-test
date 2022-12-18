import _ from "lodash-es";
import { useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { todoItemAtom, todoListAtom } from "./atom/todo";
import { Todo } from "./mocks/types";

export const TodoItem = (props: { todo: Todo }) => {
  const [todo, setTodo] = useRecoilState(todoItemAtom(props.todo.id));

  const setTodoList = useSetRecoilState(todoListAtom);

  const titleRef = useRef<HTMLInputElement>(null);

  return (
    <li>
      <input
        ref={titleRef}
        type="text"
        value={todo.title}
        onChange={(e) => {
          setTodo((prev) => ({ ...prev, text: e.target.value }));
        }}
        disabled={todo.done}
      />

      <button
        onClick={() => {
          setTodo((prev) => ({ ...prev, done: !prev.done }));
        }}
      >
        {props.todo.done ? "✅" : "🔲"}
      </button>

      <button
        onClick={() => {
          setTodoList((prev) => _.filter(prev, { id: props.todo.id }));
        }}
      >
        🗑
      </button>
    </li>
  );
};
