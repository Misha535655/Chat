import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./index.css";
import { LoginForm, Regestration, Menu, Chats } from "./Components";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} exact />
        <Route path="/Regestration" element={<Regestration />} exact />
        <Route path="/Menu" element={<Menu />} exact />
      </Routes>
    </div>
  );
}

export default App;
