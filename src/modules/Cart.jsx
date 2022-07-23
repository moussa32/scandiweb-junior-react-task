import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PurchasedProducts from "../shared/components/PurchasedProducts";
import { currencyConverter } from "../shared/utiltes/currencyConverter";

export class Cart extends PureComponent {
  calculateTotalBagCos = () => {
    const { minicart, defaultCurrency } = this.props;
    const defaultCurrencyLabel = defaultCurrency.label;

    const totalBag = minicart.reduce((total, product) => {
      const productPricesList = product.prices;
      return total + currencyConverter(productPricesList, defaultCurrencyLabel).amount * product.qty;
    }, 0);

    return totalBag.toFixed(2);
  };

  calculateTotalCartProducts = () => {
    const { minicart } = this.props;

    const totalQuantity = minicart.reduce((quantity, product) => {
      const productQuantity = product.qty;
      return quantity + productQuantity;
    }, 0);

    return totalQuantity;
  };

  render() {
    const { minicart, defaultCurrency } = this.props;

    return (
      <main>
        <h1 className="category-title">Cart</h1>
        {minicart.map((product) => (
          <PurchasedProducts product={product} key={product.id + Math.random()} />
        ))}
        <footer className="cart-footer">
          <h2>
            Tax 21%:
            <span className="cart-footer-value">
              {defaultCurrency.symbol}
              {((this.calculateTotalBagCos() * 21) / 100).toFixed(2)}
            </span>
          </h2>
          <h2>
            Quantity: <span className="cart-footer-value">{this.calculateTotalCartProducts()}</span>
          </h2>
          <h2>
            Total:{" "}
            <span className="cart-footer-value">
              {defaultCurrency.symbol}
              {this.calculateTotalBagCos()}
            </span>
          </h2>
          <button className="order-button">order</button>
        </footer>
      </main>
    );
  }
}

const mapStateToProps = ({ currency, minicart }) => ({ defaultCurrency: currency, minicart });

export default connect(mapStateToProps)(Cart);
