import React, { Component } from "react";
import { DollarIcon, DownArrowIcon } from "../../assets";

export default class CurrencySwitcher extends Component {
  render() {
    return (
      <>
        <button className="navbar-button currency-switcher-button">
          <img src={DollarIcon} alt="currency switcher" title="currency switcher" className="currencySwitcherIcon" />
          <img
            src={DownArrowIcon}
            alt="currency switcher"
            title="currency switcher"
            className="currencySwitcherArrow"
          />
        </button>
      </>
    );
  }
}
