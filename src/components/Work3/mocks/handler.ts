import { rest } from "msw";
import { factory, primaryKey } from "@mswjs/data";

export const db = factory({
  todo: {
    id: primaryKey(String),
    title: String,
    done: Boolean,
  },
});

const getTodosHandler = rest.get("/todos", (req, res, ctx) => {
  const todos = db.todo.getAll();
  return res(ctx.delay("real"), ctx.status(200), ctx.json(todos));
});

const postTodosHandler = rest.post("/todos", async (req, res, ctx) => {
  const todos = db.todo.getAll();
  const { title } = await req.json();
  const createdTodo = db.todo.create({
    id: `todo-${todos.length}`,
    title: title,
    done: false,
  });
  return res(ctx.delay("real"), ctx.status(201), ctx.json(createdTodo));
});

const patchTodosHandler = rest.patch("/todos/:id", async (req, res, ctx) => {
  const { done } = await req.json();
  const { id } = req.params;
  const updatedTodo = db.todo.update({
    where: { id: { equals: id as string } },
    data: {
      done: done,
    },
  });
  return res(ctx.delay("real"), ctx.status(200), ctx.json(updatedTodo));
});

const deleteTodosHandler = rest.delete("/todos/:id", (req, res, ctx) => {
  const { id } = req.params;
  const deletedTodo = db.todo.delete({
    where: { id: { equals: id as string } },
  });
  return res(ctx.delay("real"), ctx.status(200), ctx.json(deletedTodo));
});

export const handlers = {
  getTodos: getTodosHandler,
  postTodos: postTodosHandler,
  patchTodos: patchTodosHandler,
  deleteTodos: deleteTodosHandler,
};
