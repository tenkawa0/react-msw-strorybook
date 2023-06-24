import { FormEvent, useState } from "react";
import {
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TodoList } from "./TodoList";
import axios from "axios";
import { Add } from "@mui/icons-material";

type Variables = {
  title: string;
};

export const Work2 = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState("");

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    ({ title }: Variables) => axios.post("/todos", { title }),
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

  //Todo追加
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValue("");
    mutate({ title: value });
  };

  return (
    <Stack sx={{ maxWidth: "sm" }} spacing={1}>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={1}>
          <TextField
            fullWidth
            size="small"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Todo..."
            autoComplete="off"
          />
          {isLoading ? (
            <Button variant="outlined" disabled>
              <CircularProgress size={20} sx={{ color: "text.disabled" }} />
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              disabled={!value}
              startIcon={<Add />}
              sx={{ flexShrink: 0 }}
            >
              追加
            </Button>
          )}
        </Stack>
      </form>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.100" }}>
        <TodoList />
      </Paper>
    </Stack>
  );
};
