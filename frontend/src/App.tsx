import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Create from "./pages/Create";
import NoteDetail from "./pages/NoteDetail";

const App = () => {
  return (
    <div data-theme="forest">
      <button className="btn btn-primary">click me</button>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/create" element={<Create />} />

        <Route path="/note/:id" element={<NoteDetail />} />
      </Routes>
    </div>
  );
};

export default App;
