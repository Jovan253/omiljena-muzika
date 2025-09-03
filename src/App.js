import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "./screens/List";
import Search from "./screens/Search";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
