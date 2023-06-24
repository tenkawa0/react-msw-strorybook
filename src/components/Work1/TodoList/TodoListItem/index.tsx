import React from "react";
import { Checkbox, IconButton, ListItem, ListItemText } from "@mui/material";
import { Delete } from "@mui/icons-material";

import { Todo } from "types";

type Props = {
  todo: Todo;
  handleDone: (doneItem: Todo) => void;
  handleDelete: (deleteItem: Todo) => void;
};

export const TodoListItem: React.FC<Props> = ({
  todo,
  handleDone,
  handleDelete,
}) => {
  const labelId = `checkbox-label-${todo.id}`;

  return (
    <ListItem
      key={todo.id}
      disablePadding
      secondaryAction={
        <IconButton
          size="small"
          edge="end"
          onClick={() => handleDelete(todo)}
          // aria-label="削除"
        >
          <Delete fontSize="small" />
        </IconButton>
      }
    >
      <Checkbox
        size="small"
        edge="start"
        checked={todo.done}
        disabled={todo.done}
        inputProps={{ "aria-labelledby": labelId }}
        onChange={() => handleDone(todo)}
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
