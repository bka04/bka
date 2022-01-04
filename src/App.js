import { Route, Redirect, useLocation } from "react-router-dom";

import Header from "./components/layout/Header";
import Welcome from "./pages/Welcome";
import Books from "./pages/Books";
import Games from "./pages/Games";
import Acrobatics from "./pages/Acrobatics";

const Dev = () => <p>Development stuff coming soon</p>;

const routes = [
  { path: "/"},
  { path: "/welcome", Component: Welcome },
  { path: "/books", Component: Books },
  { path: "/games", Component: Games },
  { path: "/acrobatics", Component: Acrobatics },
  { path: "/development", Component: Dev },
];

function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/welcome" ? <Header /> : null}
      <div className="mainPageContainer">
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} exact>
              {path === '/' ? <Redirect to='/welcome' /> : <Component />}
          </Route>
        ))}
      </div>
    </div>
  );
}

export default App;
