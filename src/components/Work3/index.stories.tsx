import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { drop } from "@mswjs/data";

import { Work2 } from "../Work2";
import { db, handlers } from "./mocks/handler";

const meta: Meta<typeof Work2> = {
  component: Work2,
  title: "Work/3. @mswjs-dataを使ってデータの永続化",
  parameters: { msw: { handlers } },
};

export default meta;
type Story = StoryObj<typeof Work2>;

/**
 * Todoを追加
 */
export const AddTodoSuccess: Story = {
  name: "Todoを追加(成功)",
  play: async (context) => {
    drop(db);
    const canvas = within(context.canvasElement);
    //↓ データ読み込みのローディングアニメーションが消えるのを確認
    await waitFor(() => {
      const progress = canvas.queryByRole("progressbar");
      expect(progress).not.toBeInTheDocument();
    });

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

    //↓ Todoが追加されているか確認
    await waitFor(() => {
      const list = canvas.getByRole("list");
      expect(within(list).getAllByRole("listitem")).toHaveLength(1);
    });
  },
};
