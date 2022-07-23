import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { addItem, delItem } from "../../redux/actions";
import { currencyConverter } from "../utiltes/currencyConverter";

class PurchasedProducts extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeImage: 0,
    };
  }

  incressItem = (product) => {
    this.props.dispatch(addItem(product));
  };

  decressItem = (product) => {
    this.props.dispatch(delItem(product));
  };

  totalProductValue = (prices, defaultCurrencyLabel, productQty) => {
    return (currencyConverter(prices, defaultCurrencyLabel).amount * productQty).toFixed(2);
  };

  handleSlider = (productImages, type) => {
    const { activeImage } = this.state;
    const maxLength = productImages.length - 1;

    if (type === "next" && activeImage < maxLength) {
      this.setState({
        activeImage: activeImage + 1,
      });
    }

    if (type === "prev" && activeImage > 0) {
      this.setState({
        activeImage: activeImage - 1,
      });
    }
  };

  render() {
    const { product, defaultCurrency } = this.props;
    const { activeImage } = this.state;

    return (
      <div className="cart-item" key={product.id}>
        <div className="item-left">
          <h2>{product.name}</h2>
          <h2 className="cart-item-category">{product.category}</h2>
          <p className="cart-item-price">
            {defaultCurrency.symbol}
            {this.totalProductValue(product.prices, defaultCurrency.label, product.qty)}
          </p>
          <div className="item-atteributes">
            {product?.selectedOptions?.map((attribute) => (
              <div
                className="bag-item-option"
                style={{
                  backgroundColor: attribute.attributeType === "swatch" ? attribute.option.value : "",
                }}
                key={attribute.attributeName}
              >
                <p>{attribute.attributeType !== "swatch" ? attribute.option.value : ""}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="item-right">
          <div className="item-stock">
            <button className="item-stock-button" onClick={() => this.incressItem(product)}>
              +
            </button>
            <p>{product.qty}</p>
            <button className="item-stock-button" onClick={() => this.decressItem(product)}>
              -
            </button>
          </div>
          <div className="item-gallery">
            <img src={product.gallery[activeImage]} alt={product.name} />
            {product.gallery.length > 1 && (
              <div className="image-slider-controls">
                <button className="next-slider-button" onClick={() => this.handleSlider(product.gallery, "prev")}>
                  &#8592;
                </button>
                <button className="prev-slider-button" onClick={() => this.handleSlider(product.gallery, "next")}>
                  &#8594;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ currency }) => {
  return {
    defaultCurrency: currency,
  };
};

export default connect(mapStateToProps)(PurchasedProducts);
