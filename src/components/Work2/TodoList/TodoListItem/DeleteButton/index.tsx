import React from "react";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { Todo } from "types";

type Variables = {
  id: string;
};

type Props = {
  todo: Todo;
};

export const DeleteButton: React.FC<Props> = ({ todo }) => {
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    ({ id }: Variables) => axios.delete(`/todos/${id}`),
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
    <IconButton
      size="small"
      edge="end"
      onClick={() => mutate({ id: todo.id })}
      aria-label="削除"
      disabled={isLoading}
    >
      <Delete fontSize="small" />
    </IconButton>
  );
};
