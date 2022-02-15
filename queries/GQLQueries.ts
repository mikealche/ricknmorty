import { gql } from "@apollo/client";

export const CHARACTERS = gql`
  query Characters($name: String, $page: Int, $status: String) {
    characters(page: $page, filter: { name: $name, status: $status }) {
      info {
        count
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
      }
    }
  }
`;

export const SINGLE_CHARACTER = gql`
  query SingleCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
    }
  }
`;
