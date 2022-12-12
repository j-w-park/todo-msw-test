import { useRecoilState, useRecoilValue } from "recoil";
import { AddTodoForm } from "./AddTodoForm";
import { todoKeysAtom } from "./atom/todo";
import { TodoItem } from "./TodoItem";

export const App = () => {
  const todoKeys = useRecoilValue(todoKeysAtom);

  return (
    <div>
      <h1>Todo List</h1>

      <AddTodoForm />

      <ul>
        {todoKeys.map((todoKey) => (
          <TodoItem key={todoKey} todoKey={todoKey} />
        ))}
      </ul>
    </div>
  );
};
