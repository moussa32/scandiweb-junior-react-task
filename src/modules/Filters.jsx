import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addFilterParameters, addFilterProducts, deleteFilterParameter, resetFilterParameters } from "../redux/actions";

import SelectInput from "../shared/components/SelectInput";

class Filters extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderFilterInput = (attributeItems) => {
    let attributeType;

    for (let i = 0; i < attributeItems.length; i++) {
      if (attributeItems[i].value.includes("#")) {
        attributeType = "colorBox";
      } else if (attributeItems[i].value === "Yes" || attributeItems[i].value === "No") {
        attributeType = "checkbox";
      } else {
        attributeType = "select";
      }
    }
    return attributeType;
  };

  handleFilter = (filters) => {
    const productsArray = this.props.products;
    let filteredProducts = [];

    filters.forEach((key, index) => {
      if (index === 0) {
        for (let i = 0; i < productsArray.length; i++) {
          for (let j = 0; j < productsArray[i].attributes.length; j++) {
            if (productsArray[i].attributes[j].name.toLowerCase() === key) {
              filteredProducts.push(productsArray[i]);
            }
          }
        }
      } else {
        for (const item of filteredProducts) {
          const isAttribute = [];

          item.attributes.forEach((attribute) => {
            if (attribute.name.toLowerCase() === key) {
              isAttribute.push(true);
            } else {
              isAttribute.push(false);
            }
          });

          let allAreFalse = isAttribute.every((element) => element === false);

          if (allAreFalse) {
            filteredProducts = filteredProducts.filter((filteredProduct) => filteredProduct.id !== item.id);
          }
        }
      }
    });
    return filteredProducts;
  };

  handleChange = (event) => {
    const { dispatch, filter_Parameters } = this.props;
    const parameterName = event.target.name.toLowerCase();

    if (event.target.value !== filter_Parameters.params[parameterName]) {
      dispatch(
        addFilterParameters({
          ...filter_Parameters.params,
          [parameterName]: event.target.value,
        })
      );
    } else {
      console.log(event.target.type);

      dispatch(deleteFilterParameter(parameterName));
    }
  };

  resetFilters = () => {
    const { dispatch, location, products } = this.props;

    dispatch(resetFilterParameters());
    dispatch(addFilterProducts(products));
    window.history.replaceState({}, "", `${location.pathname}`);
  };

  componentDidMount() {
    const { location, dispatch } = this.props;
    const query = location.search;
    const URLParams = new URLSearchParams(query);
    if (query) {
      let filterParamsKeys = {};
      for (const [key, value] of URLParams) {
        filterParamsKeys = { ...filterParamsKeys, [key]: value };
      }
      dispatch(addFilterParameters(filterParamsKeys));
    }
  }

  componentDidUpdate(prevProps) {
    const { filter_Parameters, location, dispatch } = this.props;
    if (filter_Parameters.params && Object.keys(filter_Parameters.params).length !== 0) {
      const URLParams = new URLSearchParams(filter_Parameters.params);
      window.history.replaceState({}, "", `${location.pathname}?${URLParams}`);
    }

    if (
      JSON.stringify(prevProps.filter_Parameters.params) !== JSON.stringify(this.props.filter_Parameters.params) &&
      filter_Parameters.params &&
      Object.keys(filter_Parameters.params).length !== 0
    ) {
      const filterParamsKeys = Object.keys(filter_Parameters.params);
      const filteredProducts = this.handleFilter(filterParamsKeys);
      dispatch(addFilterProducts(filteredProducts));
    }

    if (prevProps.location.pathname !== this.props.location.pathname) {
      const { dispatch } = this.props;
      dispatch(resetFilterParameters());
      this.setState({});
    }
  }

  render() {
    console.log(this.props);
    const { filters } = this.props;
    return (
      <aside className="category-filter">
        <h2>Filters:</h2>
        {filters.map((filter) => (
          <section className="filter-section" key={filter.id}>
            <h3 className="filter-name">{filter.name}:</h3>
            <div className="filter-options">
              {this.renderFilterInput(filter.items) === "colorBox" &&
                filter.items.map((item) => (
                  <button
                    key={`filterOptionColor${item.value}`}
                    style={{ backgroundColor: item.value }}
                    value={item.value}
                    name={filter.name}
                    className="option-button color-filter-button"
                    onClick={this.handleChange}
                  ></button>
                ))}
              {this.renderFilterInput(filter.items) === "select" && (
                <>
                  <SelectInput
                    selectClassName="filter-select"
                    selectName={filter.name}
                    selectValue={this.state.selectedValue}
                    handleChange={this.handleChange}
                    options={filter.items}
                  />
                </>
              )}
              {this.renderFilterInput(filter.items) === "checkbox" &&
                filter.items.map((item) => (
                  <React.Fragment key={`filterSelectOption${item.value}`}>
                    <label htmlFor={filter.name}>{item.displayValue}</label>
                    <input type="checkbox" name={filter.name} value={item.value} onChange={this.handleChange} />
                  </React.Fragment>
                ))}
            </div>
          </section>
        ))}
        <button className="main-button" onClick={this.resetFilters}>
          Reset filters
        </button>
      </aside>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(withRouter(Filters));
