import React, { PureComponent } from "react";
import { PRODUCT_DETAILS_QUERY } from "../Graphql/queries";
import { queryFetch } from "../Graphql/queryFetch";
import parse from "html-react-parser";

export default class ProductDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      activeImage: "",
      productDetail: {},
      selectedOptions: [],
    };
  }

  fetchProductDetails = async () => {
    const { productID } = this.props.match.params;
    const productDetailsRequest = await queryFetch(PRODUCT_DETAILS_QUERY, { productID });
    const { data } = productDetailsRequest;
    this.setState({ isLoading: false, activeImage: data.product.gallery[0], productDetail: { ...data.product } });
  };

  componentDidMount() {
    this.fetchProductDetails();
  }

  handleImageSlider = (selectedImage) => {
    this.setState({
      ...this.state,
      activeImage: selectedImage,
    });
  };

  /*This function responsible for get all siblings of clicked element and remove active class from them then set active class on clicked element */
  toggleClass = (element, optionType) => {
    const siblingsOfClickedElement = [...element.target.parentElement.children];
    console.log(optionType);
    if (optionType === "swatch") {
      siblingsOfClickedElement.forEach((sib) => sib.classList.remove("primary-active"));
      element.target.classList.add("primary-active");
    } else {
      siblingsOfClickedElement.forEach((sib) => sib.classList.remove("secondary-active"));
      element.target.classList.add("secondary-active");
    }
  };

  //handle selected option and update state with them
  handleSelection = (element, selectedAttribute, selectedAttributeType, option) => {
    this.toggleClass(element, selectedAttributeType);
    const selectedOption = {
      attributeName: selectedAttribute,
      attributeType: selectedAttributeType,
      option,
    };
    const selectedOptions = this.state.selectedOptions;
    const existAttribute = selectedOptions.find((item) => item.attributeName === selectedAttribute);
    const indexOfExistAttribute = selectedOptions.indexOf(existAttribute);

    if (existAttribute) {
      selectedOptions[indexOfExistAttribute] = selectedOption;
    } else {
      selectedOptions.push(selectedOption);
    }
    this.setState({
      productDetail: { ...this.state.productDetail, selectedOptions: selectedOptions },
      selectedOptions: selectedOptions,
    });
  };

  render() {
    console.log(this.state.productDetail);
    const { isLoading, productDetail, activeImage } = this.state;

    return (
      <main className="product-container">
        {!isLoading && (
          <>
            <section className="product-gallery-images">
              {productDetail.gallery.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt={productDetail.name}
                  className="product-gallery-image"
                  onClick={() => this.handleImageSlider(image)}
                />
              ))}
            </section>
            <section className="product-slider">
              <img src={activeImage} className="product-slider-image" alt="active" title="active" />
            </section>
            <section className="product-info">
              <h1 className="product-name">{productDetail.name}</h1>
              <p className="product-cateogry">{productDetail.category}</p>
              <div className="product-attributes">
                <div className="product-attribute">
                  <div className="product-attribute-options">
                    {productDetail.attributes.map((attribute) => (
                      <section className="product-section" key={attribute.id}>
                        <h2 className="product-sub-title">{attribute.name}</h2>
                        <div className="product-attributes" name={attribute.id}>
                          {attribute.items.map((item) => (
                            <button
                              className="option-button"
                              key={item.id}
                              id={item.id}
                              onClick={(e) => this.handleSelection(e, attribute.name, attribute.type, item)}
                              style={{
                                backgroundColor: attribute.type === "swatch" ? item.displayValue : "",
                              }}
                            >
                              {attribute.type === "text" ? item.displayValue : ""}
                            </button>
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                </div>
              </div>
              <section className="product-price">
                <h2 className="product-sub-title">PRICE</h2>
                <span>{productDetail.prices[0].currency.symbol}</span>
                <span>{productDetail.prices[0].amount}</span>
              </section>
              <button className="main-button" disabled={!productDetail.inStock}>
                {!productDetail.inStock ? "out of stock" : "add to cart"}
              </button>
              <section className="product-description">{parse(productDetail.description)}</section>
            </section>
          </>
        )}
      </main>
    );
  }
}
