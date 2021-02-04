import React, { Component, Fragment } from "react";

import Button from "../../../UI/Button/Button";

class OrderSummary extends Component {
  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients).map(key => {
      return (
        <li key={key}>
          <span style={{ textTransform: "capitalize" }}>{key}</span>:{" "}
          {this.props.ingredients[key]}
        </li>
      );
    });
    return (
      <Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with the following elements:</p>
        <ul>{ingredientsSummary}</ul>
        <p>
          <strong>Total price : {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout ?</p>
        <Button buttonType="Danger" clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button buttonType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Fragment>
    );
  }
}

export default OrderSummary;
