import "./index.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CarDetails from "./pages/CarDetails/CarDetails";
import CategoryFilter from "./pages/CategoryFilter/CategoryFilter";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/categoryfilter" element={<CategoryFilter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
