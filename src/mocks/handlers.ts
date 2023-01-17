import { rest } from "msw";
import _ from "lodash-es";
import { Todo } from "./types";
import { addTodo, deleteTodo, getTodoList, updateTodo } from "./todo";

// mock API
export const mockRepository = {
  // request: 요청에 담긴 정보를 가진 객체
  // response: 모킹된 응답을 생성하는 유틸리티 함수
  // context: 응답의 상태 코드, 헤더, 바디 등을 설정하는 함수들을 제공하는 객체

  getTodoList: rest.get("/todo", (_, response, context) => {
    return response(context.status(200), context.json(getTodoList()));
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
