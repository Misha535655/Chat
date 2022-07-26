import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./index.css";
import { CLoginForm, CRegestration, Menu } from "./Components";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CLoginForm />} exact />
        <Route path="/Regestration" element={<CRegestration />} exact />
        <Route path="/Menu" element={<Menu />} exact />
      </Routes>
    </div>
  );
}

export default App;
