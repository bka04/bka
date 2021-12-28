import { Route, Redirect, Switch } from "react-router-dom";

import Header from "./components/Layout/Header";
import Books from "./components/Books/Books";
import Games from "./components/Games/Games";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/books" />
        </Route>
        <Route path="/books">
          <Books />
        </Route>
        <Route path="/games">
          <Games />
        </Route>
        <Route path="/acrobatics">
          <p>Acrobatics stuff coming soon</p>
        </Route>
        <Route path="/development">
          <p>Development stuff coming soon</p>
        </Route>
        <Route path='*'>
          <p>Path not found</p>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
