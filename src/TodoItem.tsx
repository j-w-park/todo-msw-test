import { useRecoilState, useSetRecoilState } from "recoil";
import { todoAtom, todoKeysAtom } from "./atom/todo";

export const TodoItem = (props: { todoKey: string }) => {
  const [todo, setTodo] = useRecoilState(todoAtom(props.todoKey));

  const setTodoKeys = useSetRecoilState(todoKeysAtom);

  return (
    <li>
      <input
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
        {todo.done ? "✅" : "🔲"}
      </button>

      <button
        onClick={() => {
          setTodoKeys((prev) => prev.filter((key) => key !== props.todoKey));
        }}
      >
        🗑
      </button>
    </li>
  );
};
