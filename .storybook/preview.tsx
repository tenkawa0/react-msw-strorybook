import React from "react";
import type { Preview } from "@storybook/react";
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initialize, mswDecorator } from "msw-storybook-addon";
import { configure } from "@storybook/testing-library";

// Initialize MSW
initialize();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    mswDecorator,
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: 0, refetchOnWindowFocus: false } },
      });
      configure({ asyncUtilTimeout: 5000 });

      return (
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider>
            <Story />
          </SnackbarProvider>
        </QueryClientProvider>
      );
    },
  ],
};

export default preview;
