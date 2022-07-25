import React, { createRef, PureComponent } from "react";
import { EmptyCartIcon } from "../../assets";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { currencyConverter } from "../../shared/utiltes/currencyConverter";
import { addItem, delItem } from "../../redux/actions";

class Minicart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.wrapperRef = createRef();
  }

  handelModal = () => {
    this.setState({
      ...this.state,
      showModal: !this.state.showModal,
    });
  };

  handleShowModal = (event) => {
    event.stopPropagation();
    //Get the dropdown menu element
    const dropdownMenu = this.wrapperRef;
    //Get the pressed element
    const elementPressed = event.target;

    //Check if dropdown menu doesn't contain the pressed element then close the menu
    if (dropdownMenu && !dropdownMenu.current.contains(elementPressed)) {
      this.setState({
        ...this.state,
        showModal: false,
      });
    }
  };

  calculateTotalBagCos = () => {
    const { minicart, defaultCurrency } = this.props;
    const defaultCurrencyLabel = defaultCurrency.label;

    const totalBag = minicart.reduce((total, product) => {
      const productPricesList = product.prices;
      return total + currencyConverter(productPricesList, defaultCurrencyLabel).amount * product.qty;
    }, 0);

    return totalBag.toFixed(2);
  };

  async componentDidMount() {
    document.addEventListener("mousedown", this.handleShowModal);
  }

  async componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleShowModal);
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

  render() {
    const { showModal } = this.state;
    const { minicart, defaultCurrency } = this.props;

    return (
      <div ref={this.wrapperRef}>
        <button className="navbar-button minicart-button" onClick={this.handelModal}>
          <img src={EmptyCartIcon} alt="empty cart" title="empty cart" className="minicartIcon" />
          {minicart.length !== 0 && <span className="minicart-count">{minicart.length}</span>}
        </button>
        {showModal && (
          <div className="bag-menu">
            <h2 className="bag-title">
              My bag, <span>{minicart.length} items</span>
            </h2>
            {minicart.map((item) => (
              <div className="bag-item" key={item.id + Math.random()}>
                <div className="bag-item-info">
                  <h4>{item?.name}</h4>
                  <p>
                    {defaultCurrency.symbol}
                    {this.totalProductValue(item.prices, defaultCurrency.label, item.qty)}
                  </p>
                  {item?.selectedOptions?.map((attribute) => (
                    <div className="bag-option-container" key={attribute.attributeName}>
                      <p className="bag-option-name">{attribute.attributeName}:</p>
                      <div
                        className="bag-item-option"
                        style={{
                          backgroundColor: attribute.attributeType === "swatch" ? attribute.option.value : "",
                        }}
                        key={attribute.attributeName}
                      >
                        <p>{attribute.attributeType !== "swatch" ? attribute.option.value : ""}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bag-item-view">
                  <div className="main-controlers">
                    <button onClick={() => this.incressItem(item)}>+</button>
                    <p>{item?.qty}</p>
                    <button onClick={() => this.decressItem(item)}>-</button>
                  </div>
                  <img className="bag-item-image" src={item?.gallery[0]} title={item?.name} alt={item?.name} />
                </div>
              </div>
            ))}
            <div className="bag-total">
              <p>Total</p>
              <p>
                {defaultCurrency.symbol}
                {this.calculateTotalBagCos()}
              </p>
            </div>
            <div className="bag-footer">
              <Link to="/cart" className="view-bag-btn">
                view bag
              </Link>
              <button className="checkout-btn btn-praimery text-uppercase">check out</button>
            </div>
          </div>
        )}
        {showModal && <div className="bag-menu-overlay"></div>}
      </div>
    );
  }
}

const mapStateToProps = ({ currency, minicart }) => {
  return {
    defaultCurrency: currency,
    minicart,
  };
};

export default connect(mapStateToProps)(Minicart);
