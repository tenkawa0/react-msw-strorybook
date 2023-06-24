import React from "react";
import { Checkbox, ListItem, ListItemText } from "@mui/material";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { Todo } from "types";
import { DeleteButton } from "./DeleteButton";

type Variables = {
  id: string;
  done: boolean;
};

type Props = {
  todo: Todo;
};

export const TodoListItem: React.FC<Props> = ({ todo }) => {
  const { enqueueSnackbar } = useSnackbar();
  const labelId = `checkbox-label-${todo.id}`;

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    ({ id, done }: Variables) => axios.patch(`/todos/${id}`, { done }),
    {
      onSuccess: () => {
        //Todoリストをrefetch
        queryClient.invalidateQueries(["todos"]);
      },
      onError: () => {
        enqueueSnackbar("エラーが発生しました", { variant: "error" });
      },
    }
  );

  return (
    <ListItem
      key={todo.id}
      disablePadding
      secondaryAction={<DeleteButton todo={todo} />}
    >
      <Checkbox
        size="small"
        edge="start"
        checked={todo.done}
        disabled={isLoading}
        inputProps={{ "aria-labelledby": labelId }}
        onChange={() => mutate({ id: todo.id, done: !todo.done })}
      />
      <ListItemText
        id={labelId}
        primary={!todo.done ? todo.title : <del>{todo.title}</del>}
        {...(todo.done && {
          sx: { color: "action.disabled" },
        })}
      />
    </ListItem>
  );
};
