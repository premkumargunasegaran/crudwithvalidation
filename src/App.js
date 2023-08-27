import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Form from "./Component/Form";
import Home from "./Component/Home";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Edit from "./Component/Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="add" element={<Form />} />
        <Route path="edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
