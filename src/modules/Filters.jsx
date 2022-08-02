import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";

import SelectInput from "../shared/components/SelectInput";

export class Filters extends PureComponent {
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

      console.log(filteredProducts);
      return filteredProducts;
    });
  };

  handleChange = (event) => {
    const updatedState = {
      ...this.state,
      [event.target.name.toLowerCase()]: event.target.value,
    };

    this.setState(updatedState);
    const URLParams = new URLSearchParams(updatedState);

    const filterParamsKeys = [];

    for (const [key] of URLParams) {
      filterParamsKeys.push(key);
    }

    this.handleFilter(filterParamsKeys);

    window.history.replaceState({}, "", `${this.props.location.pathname}?${URLParams}`);
  };

  render() {
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
      </aside>
    );
  }
}

export default withRouter(Filters);
