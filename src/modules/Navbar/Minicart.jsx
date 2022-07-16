import React, { Component } from "react";
import { EmptyCartIcon } from "../../assets";

export default class Minicart extends Component {
  render() {
    return (
      <>
        <button className="navbar-button minicart-button">
          <img src={EmptyCartIcon} alt="" title="" className="minicartIcon" />
          <span className="minicart-count">3</span>
        </button>
      </>
    );
  }
}
