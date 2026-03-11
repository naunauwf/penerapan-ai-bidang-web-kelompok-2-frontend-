import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DragAndDrop from "./pages/DragAndDrop";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dragdrop" element={<DragAndDrop />} />
      </Routes>
    </BrowserRouter>
  );
}
