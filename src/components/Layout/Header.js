import { NavLink } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

import classes from "./Header.module.css";

const Header = (props) => {
  const [showNavLinks, setShowNavLinks] = useState(true);

  const onClickHandler = () => {
    setShowNavLinks((prevState) => {
      return !prevState;
    })
  };

  const showHideNavLinks = useCallback(() => {
    if (window.innerWidth <= 500) {
      // setShowNavLinks((prevState) => {
      //   return !prevState;
      // });
    } else {
      setShowNavLinks(true);
    } 
  }, []);

  useEffect(() => {
    showHideNavLinks();
  }, [showHideNavLinks])


  const ulClass = showNavLinks ? classes.showNavLinks : classes.hideNavLinks;

  window.addEventListener('resize', showHideNavLinks);

  return (
    <header>
      <nav className={classes.nav}>
        <div>
          <span className={`material-icons ${classes.menuIcon}`} onClick={onClickHandler}>menu</span>
        </div>
        <ul className={ulClass}>
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
