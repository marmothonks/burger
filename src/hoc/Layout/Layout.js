import React, { Component, Fragment } from "react";

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

import classes from "./Layout.module.css";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  drawerToggleHandler = () => {
    this.setState((prevState) => {
    return  { showSideDrawer: !prevState.showSideDrawer }
     });
  };

  drawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  render() {
    return (
      <Fragment>
        <Toolbar 
          drawerToggled={this.drawerToggleHandler}/>
        <SideDrawer
          open={this.state.showSideDrawer}
          drawerClosed={this.drawerClosedHandler} />
        <main className={classes.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

export default Layout;
