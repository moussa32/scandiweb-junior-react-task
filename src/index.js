import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./Graphql/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";

const App = lazy(() => import("./App"));

ReactDOM.render(
  <>
    <Suspense fallback={<div className="loader">Loading...</div>}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </ApolloProvider>
    </Suspense>
  </>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
