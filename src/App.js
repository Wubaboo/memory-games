import "./App.css";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Numbers from "./components/numbersGame/numbersHome";
import Home from "./components/home";
import Matching from "./components/matchingGame/matchingHome";
import Mosaic from "./components/mosaic/mosaicHome";
import Sequence from "./components/sequence/sequenceHome";
import Minefield from "./components/minefield/minefieldHome";
import Food from "./components/food/foodHome";
import Sets from "./components/sets/setsHome";

function App() {
  const routes = [
    // { label: "Home", path: "/" },
    { label: "Numbers", path: "/numbers/", el: <Numbers /> },
    { label: "Matching", path: "/matching/", el: <Matching /> },
    { label: "Mosaic", path: "/mosaic/", el: <Mosaic /> },
    { label: "Sequence", path: "/sequence/", el: <Sequence /> },
    { label: "Minefield", path: "/minefield/", el: <Minefield /> },
    { label: "Food", path: "/food/", el: <Food /> },
    { label: "Sets", path: "/sets/", el: <Sets /> },
  ];
  return (
    <div className="App">
      <HashRouter>
        <Header routes={routes}></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          {routes.map((r, i) => (
            <Route key={i} path={r.path} element={r.el}></Route>
          ))}
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
