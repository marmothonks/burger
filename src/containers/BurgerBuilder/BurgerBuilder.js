import React, { Component, Fragment } from "react";
import axios from "../../axios-order";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import OrderSummary from "../../components/Burger/BuildControls/OrderSummary/OrderSummary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.5,
  meat: 0.8
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    purchasable: false,
    purchasing: false,
    loading: false,
    totalPrice: 4,
    error: false
  };

  componentDidMount() {
    axios
      .get("https://react-backend-bb.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      }).catch(error => {
        this.setState({error: true});
      });
  }

  updatePurchaseState(ingredients) {
    const sumIngredients = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sumIngredients > 0 });
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    const addedPrice = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + addedPrice;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    const decreasedPrice = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - decreasedPrice;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
 
    // alert("You clicked continue");
    const queryParams = [];
    for (let i in this.state.ingredients){
      queryParams.push(encodeURI(i)+"="+encodeURI(this.state.ingredients[i]));
    }
    queryParams.push('price='+this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push('checkout?'+queryString);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? <p>The application is unavailable</p>:<Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingedientAdded={this.addIngredientHandler}
            ingedientRemoved={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          />
        </Fragment>
      );

     orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchaseContinued={this.purchaseContinueHandler}
          purchaseCancelled={this.purchaseCancelHandler}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
