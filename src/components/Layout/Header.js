import { NavLink } from "react-router-dom";

import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <header>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/books" activeClassName={classes.active}>
              Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/games" activeClassName={classes.active}>
              Games
            </NavLink>
          </li>
          <li>
            <NavLink to="/acrobatics" activeClassName={classes.active}>
              Acrobatics
            </NavLink>
          </li>
          <li>
            <NavLink to="/development" activeClassName={classes.active}>
              Web Development
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
