import React, { PureComponent } from "react";
import { CATEGORIES_PRODUCTS_QUERY } from "../Graphql/queries";
import { queryFetch } from "../Graphql/queryFetch";
import ProductCard from "./ProductCard";
import { connect } from "react-redux";
import { currencyConverter } from "../shared/utiltes/currencyConverter";

export class Category extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
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

  async componentDidMount() {
    const {
      match: {
        params: { categoryName },
      },
    } = this.props;
    this.fetchCategoryDetails(categoryName);
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
    }
  }

  render() {
    const { isLoading, categoryDetails } = this.state;
    const { defaultCurrency } = this.props;

    return (
      <>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <main className="category-container">
            <h1 className="category-title">{categoryDetails.name}</h1>
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
