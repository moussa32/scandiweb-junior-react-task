import { client } from "./client";
import { gql } from "@apollo/client";

export const queryFetch = (query, variables = {}) => {
  const response = client.query({
    query: gql`
      ${query}
    `,
    variables: variables,
  });
  return response;
};
