export const CATEGORIES_TITLE_QUERY = `query{
    categories{
      name
    }
  }`;

export const PRODUCTS = `query {
    categories{
      products{
        id
        name
        inStock
        gallery
        description
        prices{
          currency{
            label
            symbol
          }
          amount
        }
      }
    }
  }`;

export const CATEGORIES_PRODUCTS_QUERY = `query getCategoryProducts($categoryName: String!){
    category(input:{title: $categoryName}){
      name
      products{
        id
        name
        inStock
        gallery
        prices{
          currency{
              label
              symbol
            }
          amount
        }
        attributes{
          id
          name
          type
          items{
            id
            displayValue
            value
          }
        }
      }
    }
  }`;

export const CATEGORY_ATTRIBUTES_QUERY = `query getCategoryAttributes($categoryName: String!){
  category(input:{title: $categoryName}){
    name
    products{
       id
       attributes{
        id
        name
        type
        items{
          id
          displayValue
          value
        }
      }
    }
  }
}`;

export const CURRENCIES_QUERY = `query {
  currencies{
    label
    symbol
  }
  }`;

export const PRODUCT_DETAILS_QUERY = `query getProduct($productID: String!){
    product(id: $productID){
        id
        name
        inStock
        gallery
        description
        category
        attributes{
          id
          name
          type
          items{
            id
            displayValue
            value
          }
        }
        prices{
          currency{
              label
              symbol
            }
          amount
        }
      }
  }`;
