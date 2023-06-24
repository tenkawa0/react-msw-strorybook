import { rest } from "msw";

const getTodosHandler = rest.get("/todos", (req, res, ctx) => {
  return res(
    ctx.delay(2000),
    ctx.status(200),
    ctx.json([
      {
        id: "todo-1",
        title: "モックデータその1",
        done: true,
      },
      {
        id: "todo-2",
        title: "モックデータその2",
        done: false,
      },
      {
        id: "todo-3",
        title: "モックデータその3",
        done: false,
      },
    ])
  );
});

const postTodosHandler = rest.post("/todos", (req, res, ctx) => {
  return res(ctx.delay(2000), ctx.status(201));
});

const patchTodosHandler = rest.patch("/todos/:id", (req, res, ctx) => {
  return res(ctx.delay("real"), ctx.status(200));
});

const deleteTodosHandler = rest.delete("/todos/:id", (req, res, ctx) => {
  return res(ctx.delay("real"), ctx.status(200));
});

export const handlers = {
  getTodos: getTodosHandler,
  postTodos: postTodosHandler,
  patchTodos: patchTodosHandler,
  deleteTodos: deleteTodosHandler,
};
