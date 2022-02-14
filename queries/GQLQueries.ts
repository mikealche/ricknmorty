import { gql } from "@apollo/client";

export const CHARACTERS = gql`
  query Characters($name: String, $page: Int) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
      }
      results {
        id
        name
        image
      }
    }
    location(id: 1) {
      id
    }
    episodesByIds(ids: [1, 2]) {
      id
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
