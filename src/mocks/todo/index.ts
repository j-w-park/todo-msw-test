import { nanoid } from "nanoid";
import { Todo } from "../types";

const todoContainer = new Map<Todo["id"], Todo>();

const generateTodoId = () => {
  let newTodoId = nanoid();
  while (todoContainer.has(newTodoId)) {
    newTodoId = nanoid();
  }
  return newTodoId;
};

export const getTodoList = () =>
  Array.from(todoContainer.entries(), ([_, todo]) => todo);

export const addTodo = (title: string): Todo => {
  const newTodo = { id: generateTodoId(), title, done: false };
  todoContainer.set(newTodo.id, newTodo);
  return newTodo;
};

export const updateTodo = (id: string, title: string, done: boolean): Todo => {
  const todo = todoContainer.get(id);
  if (todo === undefined) {
    throw new Error("item not found");
  }
  todoContainer.set(id, { id, title, done });
  return { id, title, done };
};

export const deleteTodo = (id: string): Todo => {
  const todo = todoContainer.get(id);
  if (todo === undefined) {
    throw new Error("item not found");
  }
  todoContainer.delete(id);
  return todo;
};

addTodo("빨래");
addTodo("청소");
addTodo("밥먹기");
addTodo("코딩하기");
addTodo("숨쉬기");
addTodo("잠자기");
addTodo("놀기");
