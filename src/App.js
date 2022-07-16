import { PureComponent } from "react";
import { Route, Switch } from "react-router-dom";
import Category from "./modules/Category";
import Navbar from "./modules/Navbar/Navbar";

class App extends PureComponent {
  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/category/:categoryName" component={Category}></Route>
        </Switch>
      </>
    );
  }
}

export default App;
