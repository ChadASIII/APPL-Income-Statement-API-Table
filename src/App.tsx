import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Table from "./table";

function App() {
  const client = new QueryClient();

  return (
    <>
      <QueryClientProvider client={client}>
        <Table />
      </QueryClientProvider>
    </>
  );
}

export default App;
