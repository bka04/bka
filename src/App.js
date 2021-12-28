import { Route, Redirect, Switch } from "react-router-dom";

import Header from "./components/Layout/Header";
import Author from "./components/Author/Author";
import Games from "./components/Games/Games";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/Author" />
        </Route>
        <Route path="/author">
          <Author />
        </Route>
        <Route path="/games">
          <Games />
        </Route>
        <Route path="/acrobat">
          <p>Acrobat stuff coming soon</p>
        </Route>
        <Route path="/developer">
          <p>Developer stuff coming soon</p>
        </Route>
        <Route path='*'>
          <p>Path not found</p>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
