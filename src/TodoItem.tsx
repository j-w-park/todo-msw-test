import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import _ from "lodash-es";
import { useRef } from "react";
import { useRecoilCallback, useRecoilState, useSetRecoilState } from "recoil";
import { todoItemAtom, todoListAtom } from "./atom/todo";
import { Todo } from "./mocks/types";

export const TodoItem = (props: { todo: Todo }) => {
  const [todo, setTodo] = useRecoilState(todoItemAtom(props.todo.id));

  const formRef = useRef<HTMLFormElement>(null);

  const titleRef = useRef<HTMLInputElement>(null);

  const updateTodoOptimistically = useRecoilCallback(
    ({ set, snapshot }) =>
      async (payload: { done: boolean; title: string }) => {
        await queryClient.cancelQueries({ queryKey: ["todo"] });

        const prevTodo = snapshot
          .getLoadable(todoItemAtom(props.todo.id))
          .getValue();

        set(todoItemAtom(props.todo.id), { ...prevTodo, ...payload });

        return { prevTodo };
      }
  );

  const queryClient = useQueryClient();

  const { mutate: updateTodo } = useMutation({
    mutationKey: ["todo", props.todo],

    mutationFn: (payload) =>
      axios
        .put<Todo>(`/todo/${props.todo.id}`, payload)
        .then((res) => res.data),

    onMutate: updateTodoOptimistically,

    // roll back
    onError: (err, payload, context) => {
      if (context?.prevTodo) {
        setTodo(context.prevTodo);
      }
    },

    // refetch
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
    },
  });

  return (
    <li>
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          const { current: title } = titleRef;
          if (title === null) {
            return;
          }
          updateTodo({ ...props.todo, title: title.value });
        }}
      >
        <input
          defaultValue={props.todo.title}
          ref={titleRef}
          type="text"
          onBlur={() => {
            const { current: title } = titleRef;
            if (title === null) {
              return;
            }
            updateTodo({ ...props.todo, title: title.value });
          }}
          disabled={todo.done}
        />

        <button
          type="button"
          onClick={() => updateTodo({ ...props.todo, done: !props.todo.done })}
        >
          {props.todo.done ? "✅" : "🔲"}
        </button>

        <button
          type="button"
          onClick={() => {
            // setTodoList((prev) => _.filter(prev, { id: props.todo.id }));
          }}
        >
          🗑
        </button>
      </form>
    </li>
  );
};
