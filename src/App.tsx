import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AddTodoForm } from "./AddTodoForm";
import { TodoList } from "./TodoList";

export const App = () => {
  return (
    <div>
      <h1>Todo List</h1>

      <AddTodoForm />

      <TodoList />

      <ReactQueryDevtools />
    </div>
  );
};
