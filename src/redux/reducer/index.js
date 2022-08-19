import { combineReducers } from "redux";
import currency from "./handleCurrency";
import minicart from "./handleMinicart";
import products from "./handleProducts";
import filter_Parameters from "./handleFilter";

const rootReducers = combineReducers({ currency, minicart, products, filter_Parameters });

export default rootReducers;
