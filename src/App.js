import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/header";
import Numbers from "./components/numbersGame/numbersHome";
import Home from "./components/home"
import Matching from "./components/matchingGame/matchingHome";
function App() {
  const routes = [
    // { label: "Home", path: "/" },
    { label: "Numbers", path: "/numbers/" },
    { label: "Matching", path: "/matching/" },
  ];
  return (
    <div className="App">
      <BrowserRouter>
        <Header routes={routes}></Header>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/numbers/" element={<Numbers />} />
          <Route path="/matching/" element={<Matching />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
