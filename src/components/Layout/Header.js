import classes from "./Header.module.css";

import Button from "../UI/Button";

const CATEGORIES = [
  {
    category: "Author",
  },
  {
    category: "Acrobat",
  },
  {
    category: "Developer",
  },
  {
    category: "Games",
  },
];

const Header = (props) => {
  const onClickHandler = (btn) => {
    props.onContentChange(btn.currentTarget.innerHTML);
  };

  return (
    <div className={classes.topnav}>
      {CATEGORIES.map((obj) => (
        <Button
          onClick={onClickHandler}
          className={props.activeContent === obj.category ? "headerBtnNav active" : "headerBtnNav"}
        >
          {obj.category}
        </Button>
      ))}
    </div>
  );
};

export default Header;
