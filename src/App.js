import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/header";
import Numbers from "./numbersGame/numbersHome";
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
          <Route path="/" element={<div>Home</div>} />
          <Route path="/numbers/" element={<Numbers />} />
          <Route path="/matching/" element={<div>Matching</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
