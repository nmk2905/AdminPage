import "./App.css";
import AdminLayout from "./layout/admin.layout";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <AdminLayout />
    </BrowserRouter>
  );
}

export default App;
