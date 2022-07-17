import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { WhiteEmptyCartIcon } from "../assets";

export default class ProductCard extends PureComponent {
  render() {
    const { inStock, thumbnail, name, id, price } = this.props;
    return (
      <div className={`item ${!inStock ? "out-of-stock-item" : ""}`}>
        <div className="item-body">
          <div className="item-image">
            {!inStock && <div className="out-of-stock-p">Out of stock</div>}
            <img src={thumbnail} title={name} alt={name} />
            <Link to={`/product/${id}`} className="item-button">
              <img src={WhiteEmptyCartIcon} title="item button" alt="item button" className="item-button-icon" />
            </Link>
          </div>
          <h2 className="item-name">{name}</h2>
          <p>
            {price.currency.symbol}
            {price.amount}
          </p>
        </div>
      </div>
    );
  }
}
