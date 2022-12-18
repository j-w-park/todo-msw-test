import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { nanoid } from "nanoid";
import { useRef } from "react";
import { useRecoilCallback, useSetRecoilState } from "recoil";
import { todoListAtom, todoItemAtom } from "./atom/todo";
import { Todo } from "./mocks/types";

export const AddTodoForm = () => {
  const titleRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  const addTodoOptimistically = useRecoilCallback(
    ({ set, snapshot }) =>
      async (args: { title: string }) => {
        // optimistic update가 덮어 씌워지지 않게 진행중인 refetch를 모두 취소함
        await queryClient.cancelQueries({ queryKey: ["todo"] });

        // Snapshot the previous value
        const prevTodoList = snapshot.getLoadable(todoListAtom).getValue();

        // Optimistically update to the new value
        const newTodo = { id: nanoid(), title: args.title, done: false };
        set(todoListAtom, (old) => [...old, newTodo]);
        set(todoItemAtom(newTodo.id), newTodo);

        // Return a context object with the snapshotted value
        return { prevTodoList };
      }
  );

  const setTodoList = useSetRecoilState(todoListAtom);

  const { mutate: addTodo } = useMutation({
    mutationKey: ["todo", "add"],
    mutationFn: (args: { title: string }) =>
      axios
        .post("/todo", { title: args.title }, { responseType: "json" })
        .then((res) => res.data),

    // mutate 함수가 호출될 때 실행됨
    onMutate: addTodoOptimistically,

    // mutation이 실패했을 때 실행됨
    // onMutate에서 반환한 context를 받아서 이전 상태로 되돌림
    onError: (err, args, context) => {
      if (context?.prevTodoList) {
        setTodoList(context?.prevTodoList);
      }
    },

    // mutation이 끝나면 refetch
    // error든 success든 상관 없음
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todo"] });
    },

    onSuccess: () => {
      titleRef.current?.focus();
    },
  });

  return (
    <form>
      <input ref={titleRef} type="text" />
      <button
        onClick={(e) => {
          e.preventDefault();
          addTodo({ title: titleRef.current?.value ?? "" });
        }}
        type="submit"
      >
        + todo
      </button>
    </form>
  );
};
