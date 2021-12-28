import { NavLink } from "react-router-dom";

import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <header>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/author" activeClassName={classes.active}>
              Author
            </NavLink>
          </li>
          <li>
            <NavLink to="/games" activeClassName={classes.active}>
              Games
            </NavLink>
          </li>
          <li>
            <NavLink to="/acrobat" activeClassName={classes.active}>
              Acrobat
            </NavLink>
          </li>
          <li>
            <NavLink to="/developer" activeClassName={classes.active}>
              Developer
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
