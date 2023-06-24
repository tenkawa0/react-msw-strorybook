import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { Work1 } from "./index";

const meta: Meta<typeof Work1> = {
  component: Work1,
  title: "Work/1. Storybook Play functionを使ってユーザー操作をテスト",
};

export default meta;
type Story = StoryObj<typeof Work1>;

export const Primary: Story = {
  name: "表示確認",
};

/**
 * Todoを追加
 */
export const AddTodo: Story = {
  name: "Todoを追加",
  play: async (context) => {
    const canvas = within(context.canvasElement);

    //↓ Todo追加の操作をシミュレート、Testing Libraryが使用されている
    await userEvent.type(
      canvas.getByPlaceholderText("Todo..."),
      "トイレットペーパーを買う",
      { delay: 150 }
    );
    await userEvent.click(canvas.getByRole("button", { name: "追加" }));

    //↓ Todoが追加されているか確認
    await waitFor(() => {
      const list = canvas.getByRole("list");
      expect(within(list).getByRole("listitem")).toBeInTheDocument();
    });
  },
};

/**
 * Todoを複数追加
 */
export const AddTodos: Story = {
  name: "Todoを複数追加",
  play: async (context) => {
    const canvas = within(context.canvasElement);

    //↓ AddTodoのplayを再生できる
    await AddTodo.play?.(context);

    //↓ 新たにTodoを追加する
    await userEvent.type(
      canvas.getByPlaceholderText("Todo..."),
      "家賃を振り込む",
      { delay: 150 }
    );
    await userEvent.click(canvas.getByRole("button", { name: "追加" }));

    //↓ Todoが追加されているか確認、でもエラーになる
    //error: Found multiple elements with the role "listitem"
    // await waitFor(() => {
    //   const list = canvas.getByRole("list");
    //   expect(within(list).getByRole("listitem")).toBeInTheDocument();
    // });

    //↓複数確認のときはgetAllByRole()を使用する
    await waitFor(() => {
      const list = canvas.getByRole("list");
      expect(within(list).getAllByRole("listitem")).toHaveLength(2);
    });
  },
};

/**
 * Todoを削除
 */
export const DeleteTodo: Story = {
  name: "Todoを削除",
  play: async (context) => {
    const canvas = within(context.canvasElement);

    await AddTodo.play?.(context);

    //↓ Todoを削除、でもエラーになる
    //error: Unable to find an accessible element with the role "button" and name "削除"
    const list = canvas.getByRole("list");
    const listItems = within(list).getAllByRole("listitem");
    await userEvent.click(
      within(listItems[0]).getByRole("button", { name: "削除" })
    );

    // なぜ🤔
    // ゴミ箱アイコンのボタンはアクセシビリティが担保されていないから
    // src/components/Work1/TodoList/TodoListItem/index.tsx
    // ↑ 29行目のコメントを外して再度実行してみよう

    // 非テキストコンテンツは、アクセシブルな名前を付与する必要がある
    // 今回のようなIconButtonには、aria-label属性を使ってアクセシブルな名前を付与しよう
    // ただしアクセシビリティの観点では、aria-labelを付与するのがいつでも正しいわけではないので注意
    // 興味がある人はアクセシビリティについても調べてみてね
  },
};
