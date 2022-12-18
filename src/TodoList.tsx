import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { todoItemAtom, todoListAtom } from "./atom/todo";
import { Todo } from "./mocks/types";
import _ from "lodash-es";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  const todoList = useRecoilValue(todoListAtom);

  const setTodoList = useRecoilCallback(({ set }) => (todoList: Todo[]) => {
    set(todoListAtom, todoList);
    for (const todo of todoList) {
      set(todoItemAtom(todo.id), todo);
    }
  });

  const todoListQuery = useQuery({
    queryKey: ["todo"],
    queryFn: () =>
      axios
        .get("/todo", { responseType: "json" })
        .then<Todo[]>((res) => res.data),
    onSuccess: (todoList) => setTodoList(todoList),
  });

  return (
    <ul>
      {todoList.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
