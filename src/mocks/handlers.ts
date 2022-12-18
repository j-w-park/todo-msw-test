import { rest } from "msw";
import { nanoid } from "nanoid";
import _ from "lodash-es";
import { Todo } from "./types";

const todoContainer = new Map<Todo["id"], Todo>();

const addTodo = (title: string): Todo => {
  let newTodoId = nanoid();
  while (todoContainer.has(newTodoId)) {
    newTodoId = nanoid();
  }
  const newTodo = { id: newTodoId, title, done: false };
  todoContainer.set(newTodo.id, newTodo);
  return newTodo;
};

const updateTodo = (id: string, title: string, done: boolean): Todo => {
  const todo = todoContainer.get(id);
  if (todo === undefined) {
    throw new Error("item not found");
  }
  todoContainer.set(id, { id, title, done });
  return { id, title, done };
};

const deleteTodo = (id: string): Todo => {
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

// mock API
export const mockRepository = {
  // request: 요청에 담긴 정보를 가진 객체
  // response: 모킹된 응답을 생성하는 유틸리티 함수
  // context: 응답의 상태 코드, 헤더, 바디 등을 설정하는 함수들을 제공하는 객체

  getTodoList: rest.get("/todo", (request, response, context) => {
    return response(
      context.status(200),
      context.json(
        _.map<Todo>(Array.from(todoContainer.entries(), ([_, todo]) => todo))
      )
    );
  }),

  addTodo: rest.post("/todo", async (request, response, context) => {
    const { title } = await request.json<{ title: string }>();
    return response(context.status(200), context.json(addTodo(title)));
  }),

  // 요청 경로를 파라미터로 받기 위해 :paramName 형식을 사용한다.
  // 파싱된 파라미터 값은 request.params 객체에 저장된다.
  updateTodo: rest.put("/todo/:id", async (request, response, context) => {
    const { done, title } = await request.json<Pick<Todo, "done" | "title">>();
    try {
      return response(
        context.status(200),
        context.json(updateTodo(request.params.id as string, title, done))
      );
    } catch (e) {
      if (e instanceof Error) {
        return response(
          context.status(400),
          context.json({ message: e.message })
        );
      }
      throw e;
    }
  }),

  deleteTodo: rest.delete("/todo/:id", async (request, response, context) => {
    try {
      return response(
        context.status(200),
        context.json(deleteTodo(request.params.id as string))
      );
    } catch (e) {
      if (e instanceof Error) {
        return response(
          context.status(400),
          context.json({ message: e.message })
        );
      }
      throw e;
    }
  }),
};
