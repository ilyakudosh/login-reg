import React from "react";
import style from "./index.module.scss";
import { Link } from "react-router-dom";

export const Blocked = () => {
  return (
    <div className={style.notFoundWrapper}>
      <h1>BLOCKED</h1>
      <p>
        Go to <Link to="/">Main Page</Link>
      </p>
    </div>
  );
};
