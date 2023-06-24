import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { setupWorker } from "msw";

import { Work2 } from "./components/Work2";
import { handlers } from "./mocks/handlers";

/**
 * React Query
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  // const worker = setupWorker(...handlers);
  // worker.start();

  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <Work2 />
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

export default App;
