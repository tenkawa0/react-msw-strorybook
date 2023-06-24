import React from "react";
import { Collapse, Fade, List, Typography } from "@mui/material";

import { TodoListItem } from "./TodoListItem";
import { Todo } from "types";
import { SwitchTransition, TransitionGroup } from "react-transition-group";

type Props = {
  todos: Todo[];
  handleDone: (doneItem: Todo) => void;
  handleDelete: (deleteItem: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleDone,
  handleDelete,
}) => {
  return (
    <SwitchTransition>
      <Fade key={todos.length > 0 ? "list" : "empty"}>
        {todos.length > 0 ? (
          <List dense disablePadding>
            <TransitionGroup>
              {todos.map((item) => (
                <Collapse key={item.id}>
                  <TodoListItem
                    todo={item}
                    handleDone={handleDone}
                    handleDelete={handleDelete}
                  />
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
