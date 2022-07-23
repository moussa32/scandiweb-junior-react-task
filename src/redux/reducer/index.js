import { combineReducers } from "redux";
import currency from "./handleCurrency";
import minicart from "./handleMinicart";

const rootReducers = combineReducers({ currency, minicart });

export default rootReducers;
