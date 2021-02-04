import React, { Fragment } from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

import classes from "./SideDrawer.module.css";

const sideDrawer = props => {
let attachClasses = [classes.SideDrawer, classes.Close];
if(props.open) {
  attachClasses = [classes.SideDrawer, classes.Open];
}
  return (
    <Fragment>
      <Backdrop show={props.open} clicked={props.drawerClosed}/>
      <div className={attachClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Fragment>
  );
};

export default sideDrawer;
