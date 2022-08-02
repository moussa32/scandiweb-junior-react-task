import React, { PureComponent } from "react";
import { connect } from "react-redux";

import { CATEGORIES_PRODUCTS_QUERY, CATEGORY_ATTRIBUTES_QUERY } from "../Graphql/queries";
import { queryFetch } from "../Graphql/queryFetch";
import { currencyConverter } from "../shared/utiltes/currencyConverter";
import Filters from "./Filters";
import ProductCard from "./ProductCard";

export class Category extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      filters: [],
      categoryDetails: { name: "", products: [] },
    };
  }

  fetchCategoryDetails = async (currentCategoryName) => {
    try {
      const categoryDetailsRequest = await queryFetch(CATEGORIES_PRODUCTS_QUERY, { categoryName: currentCategoryName });
      const {
        data: { category },
      } = categoryDetailsRequest;

      this.setState({
        isLoading: false,
        categoryDetails: category,
      });
    } catch (error) {
      alert(error);
    }
  };

  fetchCategoryAttributes = async (currentCategoryName) => {
    try {
      const categoryAttributesRequest = await queryFetch(CATEGORY_ATTRIBUTES_QUERY, {
        categoryName: currentCategoryName,
      });
      const {
        data: { category },
      } = categoryAttributesRequest;

      const categoryAttributes = category.products.map((item) => item.attributes.filter((attr) => attr.name)).flat();
      const categoryFilters = [...new Set(categoryAttributes)];

      this.setState({
        ...this.state,
        filters: categoryFilters,
      });
    } catch (error) {
      alert(error);
    }
  };

  async componentDidMount() {
    const {
      match: {
        params: { categoryName },
      },
    } = this.props;
    this.fetchCategoryDetails(categoryName);
    this.fetchCategoryAttributes(categoryName);
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { categoryName: newCategoryName },
      },
    } = this.props;

    const {
      match: {
        params: { categoryName: prevCategoryName },
      },
    } = prevProps;

    //Check if category has been changed let's fetch the new category data
    if (newCategoryName !== prevCategoryName) {
      this.fetchCategoryDetails(newCategoryName);
      this.fetchCategoryAttributes(newCategoryName);
    }
  }

  render() {
    const { isLoading, categoryDetails, filters } = this.state;
    const { defaultCurrency } = this.props;

    return (
      <>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <main className="category-container">
            <h1 className="category-title">{categoryDetails.name}</h1>
            <Filters filters={filters} products={categoryDetails.products} />
            <div className="products-container">
              {categoryDetails.products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  inStock={product.inStock}
                  thumbnail={product.gallery[0]}
                  price={currencyConverter(product.prices, defaultCurrency.label)}
                />
              ))}
            </div>
          </main>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ currency }) => {
  return {
    defaultCurrency: currency,
  };
};

export default connect(mapStateToProps)(Category);
