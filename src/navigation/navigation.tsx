import ReactDOM from "react-dom/client";
import { DataProvider } from "../context/DataContext";
import Home from "../screens/Home";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <DataProvider>
      <Home />
    </DataProvider>
  </>

);
