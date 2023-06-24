import React from "react";
import {
  Alert,
  CircularProgress,
  Collapse,
  Fade,
  List,
  Stack,
  Typography,
} from "@mui/material";
import { SwitchTransition, TransitionGroup } from "react-transition-group";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Todo } from "types";
import { TodoListItem } from "./TodoListItem";

export const TodoList: React.FC = () => {
  const { data, isError } = useQuery(["todos"], async () => {
    const { data } = await axios.get<Todo[]>("/todos");
    return data;
  });

  if (isError) {
    return (
      <Alert variant="outlined" severity="error">
        エラーが発生しました
      </Alert>
    );
  }

  if (!data) {
    return (
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <CircularProgress size={16} sx={{ color: "text.disabled" }} />
        <Typography
          variant="body2"
          sx={{ color: "text.disabled", lineHeight: "38px" }}
        >
          Loading...
        </Typography>
      </Stack>
    );
  }

  return (
    <SwitchTransition>
      <Fade key={data.length > 0 ? "list" : "empty"}>
        {data.length > 0 ? (
          <List dense disablePadding>
            <TransitionGroup>
              {data.map((item) => (
                <Collapse key={item.id}>
                  <TodoListItem todo={item} />
                </Collapse>
              ))}
            </TransitionGroup>
          </List>
        ) : (
          <Typography
            variant="body2"
            sx={{ color: "text.disabled", lineHeight: "38px" }}
          >
            Todoが登録されていません
          </Typography>
        )}
      </Fade>
    </SwitchTransition>
  );
};
