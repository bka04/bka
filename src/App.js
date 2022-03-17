import { Route, Redirect, useLocation } from "react-router-dom";

import Header from "./components/layout/Header";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Crosswords from "./pages/Crosswords";
import Acrobatics from "./pages/Acrobatics";

const Dev = () => <a href="https://github.com/bka04">Github repo</a>;

const routes = [
  { path: "/"},
  { path: "/home", Component: Home },
  { path: "/crosswords", Component: Crosswords },
  { path: "/books", Component: Books },
  { path: "/acrobatics", Component: Acrobatics },
  { path: "/development", Component: Dev },
];

function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/home" ? <Header /> : null}
      <div className="mainPageContainer">
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} exact>
              {path === '/' ? <Redirect to='/home' /> : <Component />}
          </Route>
        ))}
      </div>
    </div>
  );
}

export default App;
