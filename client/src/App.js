import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./app.css";
import Navbar from "./components/navbar";
import { CreateRecipe } from "./pages/create-recipe";
import { Home } from "./pages/home";
import "./pages/styles/common.css";
import { ViewRecipe } from "./pages/viewRecipe";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/viewRecipe/:recipeID?" element={<ViewRecipe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
