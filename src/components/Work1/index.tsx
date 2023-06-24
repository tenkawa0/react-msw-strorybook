import { FormEvent, useState } from "react";
import { Button, Paper, Stack, TextField } from "@mui/material";

import { Todo } from "types";
import { TodoList } from "./TodoList";

export const Work1 = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState("");

  //Todo追加
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos((prev) => [
      ...prev,
      { id: `todo-${prev.length}`, title: value, done: false },
    ]);
    setValue("");
  };

  //Todo完了
  const handleDone = (doneItem: Todo) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === doneItem.id ? { ...item, done: true } : item
      )
    );
  };

  //Todo削除
  const handleDelete = (deleteItem: Todo) => {
    setTodos((prev) => prev.filter((item) => deleteItem.id !== item.id));
  };

  return (
    <Stack sx={{ maxWidth: "sm" }} spacing={1}>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <TextField
            fullWidth
            size="small"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Todo..."
            autoComplete="off"
          />
          <Button type="submit" variant="contained" disabled={!value}>
            追加
          </Button>
        </Stack>
      </form>
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.100" }}>
        <TodoList
          todos={todos}
          handleDone={handleDone}
          handleDelete={handleDelete}
        />
      </Paper>
    </Stack>
  );
};
