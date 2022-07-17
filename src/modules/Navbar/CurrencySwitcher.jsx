import React, { Component, createRef } from "react";
import { DownArrowIcon } from "../../assets";
import { CURRENCIES_QUERY } from "../../Graphql/queries";
import { queryFetch } from "../../Graphql/queryFetch";
import { connect } from "react-redux";
import { changeCurrency } from "../../redux/actions";
import { withRouter } from "react-router-dom";

class CurrencySwitcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      showModal: false,
    };
    this.wrapperRef = createRef();
  }

  fetchCurrencies = async () => {
    const { dispatch } = this.props;

    const currenciesRequest = queryFetch(CURRENCIES_QUERY);
    const { data } = await currenciesRequest;

    this.setState({
      currencies: data.currencies,
    });

    dispatch(changeCurrency(data.currencies[0]));
  };

  handelModal = () => {
    this.setState({
      ...this.state,
      showModal: !this.state.showModal,
    });
  };

  handleChangeCurrency = (selectedCurrency) => {
    const { dispatch } = this.props;

    dispatch(changeCurrency(selectedCurrency));

    this.setState({
      ...this.state,
      showModal: false,
    });
  };

  handleClickOutside = (event) => {
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

  async componentDidMount() {
    this.fetchCurrencies();
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  async componentDidUpdate(prevProps) {
    if (!(prevProps.location.pathname === this.props.location.pathname)) {
      this.setState({
        ...this.state,
        showModal: false,
      });
    }
  }

  async componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    const { currencies, showModal } = this.state;
    const { defaultCurrency } = this.props;

    return (
      <div ref={this.wrapperRef}>
        <button className="navbar-button currency-switcher-button" onClick={this.handelModal}>
          <span className="default-currency-symbol">{defaultCurrency.symbol}</span>
          <img
            src={DownArrowIcon}
            alt="currency switcher"
            title="currency switcher"
            className="currencySwitcherArrow"
          />
        </button>
        {showModal && (
          <div className="currencies-list">
            {currencies.map((currencyOption) => (
              <button
                key={currencyOption.label}
                className="currency-option"
                onClick={() => this.handleChangeCurrency(currencyOption)}
              >
                <span className="currency-option-symbol">{currencyOption.symbol}</span>
                <span className="currency-option-label">{currencyOption.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ currency }) => {
  return {
    defaultCurrency: currency,
  };
};

export default connect(mapStateToProps)(withRouter(CurrencySwitcher));
