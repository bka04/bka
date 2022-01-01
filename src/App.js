import { Route, Redirect } from "react-router-dom";

import Header from "./components/layout/Header";
import Books from "./pages/Books";
import Games from "./pages/Games";

const Acrobatics = () => <p>Acrobatics stuff coming soon. Possibly slideshow with pause/forward/back buttons.</p>;
const Dev = () => <p>Development stuff coming soon</p>;

const routes = [
  {path: '/'},
  {path: '/books', Component: Books},
  {path: '/games', Component: Games},
  {path: '/acrobatics', Component: Acrobatics},
  {path: '/development', Component: Dev}
]

function App() {
  return (
    <div>
      <Header />

      {routes.map(({path, Component}) => (
        <Route key={path} path={path} exact>
          {path === '/' ? <Redirect to='/books' /> : <Component />}
        </Route>
      ))}
    </div>
  );
}

export default App;
