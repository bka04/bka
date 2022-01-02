import { Route, Redirect } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import Header from "./components/layout/Header";
import Books from "./pages/Books";
import Games from "./pages/Games";
import Acrobatics from "./pages/Acrobatics";

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
      <div className='mainPageContainer'>
      {routes.map(({path, Component}) => (
        <Route key={path} path={path} exact>
          {({match}) => (
            <CSSTransition
              in={match != null}
              timeout={1000}
              classNames="page"
              unmountOnExit
              mountOnEnter
            >
              <div className="page">
                {path === '/' ? <Redirect to='/books' /> : <Component />}
              </div>
            </CSSTransition>
          )}
        </Route>
      ))}
      </div>
    </div>
  );
}

export default App;
