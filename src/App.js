import { lazy, PureComponent } from "react";
import { Route, Switch } from "react-router-dom";
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
        </Switch>
      </>
    );
  }
}

export default App;
