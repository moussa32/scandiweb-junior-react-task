import { lazy, PureComponent } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Cart from "./modules/Cart";
import Category from "./modules/Category";
import Navbar from "./modules/Navbar/Navbar";

const ProductDetails = lazy(() => import("./modules/ProductDetails"));

class App extends PureComponent {
  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/category/:categoryName" component={Category}></Route>
          <Route exact path="/product/:productID" component={ProductDetails}></Route>
          <Route exact path="/cart" component={Cart}></Route>
          <Redirect to="/category/all" />
        </Switch>
      </>
    );
  }
}

export default App;
