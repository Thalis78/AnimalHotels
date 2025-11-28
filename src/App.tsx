import { BrowserRouter } from "react-router-dom";
import { Layout } from "./ui/layout";
import { AppRoutes } from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
