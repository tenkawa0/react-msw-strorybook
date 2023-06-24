import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { rest } from "msw";

import { Work2 } from "./index";
import { handlers } from "./mocks/handler";

const meta: Meta<typeof Work2> = {
  component: Work2,
  title: "Work/2. MSW を使って Web API のレスポンスをモック",
  parameters: { msw: { handlers } },
};

export default meta;
type Story = StoryObj<typeof Work2>;

/**
 * Todoリストを取得(成功)
 */
export const LoadSuccess: Story = {
  name: "Todoリストを取得(成功)",
  play: async (context) => {
    const canvas = within(context.canvasElement);

    //↓ データ読み込みのローディングアニメーションが消えるのを確認
    await waitFor(() => {
      const progress = canvas.queryByRole("progressbar");
      expect(progress).not.toBeInTheDocument();
    });

    //↓ MSWでモックしたデータが表示されるかを確認
    await waitFor(() => {
      const list = canvas.getByRole("list");
      expect(within(list).getAllByRole("listitem")).toHaveLength(3);
    });
  },
};

/**
 * Todoリストを取得(失敗)
 */
export const LoadFailed: Story = {
  name: "Todoリストを取得(失敗)",
  parameters: {
    //各StoryでMSWのhandlersを上書きできる
    msw: {
      handlers: {
        //[GET /todos] が500エラーになるように設定
        getTodos: rest.get("/todos", (req, res, ctx) =>
          res(ctx.status(500), ctx.delay(2000))
        ),
      },
    },
  },
  play: async (context) => {
    const canvas = within(context.canvasElement);

    //↓ データ読み込みのローディングアニメーションが消えるのを確認
    await waitFor(() => {
      const progress = canvas.queryByRole("progressbar");
      expect(progress).not.toBeInTheDocument();
    });

    //↓ MSWでモックしたデータが表示されるかを確認
    await waitFor(() => {
      expect(canvas.getByRole("alert")).toHaveTextContent(
        "エラーが発生しました"
      );
    });
  },
};

/**
 * Todoを追加(成功)
 */
export const AddTodoSuccess: Story = {
  name: "Todoを追加(成功)",
  play: async (context) => {
    const canvas = within(context.canvasElement);
    await LoadSuccess.play?.(context);

    await userEvent.type(
      canvas.getByPlaceholderText("Todo..."),
      "トイレットペーパーを買う",
      { delay: 150 }
    );

    //↓ 追加ボタンを押すとローディングアニメーションが表示されるかを確認
    const addButton = canvas.getByRole("button", { name: "追加" });
    await userEvent.click(addButton);
    await waitFor(() => {
      expect(within(addButton).getByRole("progressbar")).toBeInTheDocument();
    });

    //↓ Todoが追加されているか確認、でもエラーになる
    // error: Expected length: 4
    //        Received length: 3
    await waitFor(() => {
      const list = canvas.getByRole("list");
      expect(within(list).getAllByRole("listitem")).toHaveLength(4);
    });
    // [Post /todos]でTodoを追加したあとは、[Get /todos]でTodoリストを再取得している
    // [Get /todos]はMSWでモックされたデータしか返さないので、実際にデータが追加されるかの確認はできない
  },
};

/**
 * Todoを追加(失敗)
 */
export const AddTodoFailed: Story = {
  name: "Todoを追加(失敗)",
  parameters: {
    msw: {
      handlers: {
        postTodos: rest.post("/todos", (req, res, ctx) =>
          res(ctx.status(500), ctx.delay(2000))
        ),
      },
    },
  },
  play: async (context) => {
    const canvas = within(context.canvasElement);
    await LoadSuccess.play?.(context);

    await userEvent.type(
      canvas.getByPlaceholderText("Todo..."),
      "トイレットペーパーを買う",
      { delay: 150 }
    );
    const addButton = canvas.getByRole("button", { name: "追加" });
    await userEvent.click(addButton);
    await waitFor(() => {
      expect(within(addButton).getByRole("progressbar")).toBeInTheDocument();
    });

    //↓ エラーが表示されるかを確認
    await waitFor(() => {
      expect(canvas.getByRole("alert")).toHaveTextContent(
        "エラーが発生しました"
      );
    });
  },
};
