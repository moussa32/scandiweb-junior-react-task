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
      }
    }
  }`;
