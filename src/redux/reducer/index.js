import { combineReducers } from "redux";
import currency from "./handleCurrency";
import minicart from "./handleMinicart";
import products from "./handleProducts";

const rootReducers = combineReducers({ currency, minicart, products });

export default rootReducers;
