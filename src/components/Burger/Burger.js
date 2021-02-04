import React from "react";
import {withRouter} from 'react-router-dom';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

import classes from "./Burger.module.css";

const burger = props => {
  let mappedIngredients = Object.keys(props.ingredients).map(igKey => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey+i} type={igKey }/>
    });
  })
  .reduce((arr, el) => {
    return arr.concat(el);
  }, []);

  if (mappedIngredients.length ===0){
    mappedIngredients = <p>Please start adding ingredients !</p>
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {mappedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(burger);
