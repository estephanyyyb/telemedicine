/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMedications = /* GraphQL */ `
  query GetMedications($id: ID!) {
    getMedications(id: $id) {
      id
      medicine
      dosage
      createdAt
      updatedAt
    }
  }
`;
export const listMedications = /* GraphQL */ `
  query ListMedications(
    $filter: ModelMedicationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMedications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        medicine
        dosage
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNotes = /* GraphQL */ `
  query GetNotes($id: ID!) {
    getNotes(id: $id) {
      id
      description
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNotesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getLabs = /* GraphQL */ `
  query GetLabs($id: ID!) {
    getLabs(id: $id) {
      id
      type
      value
      createdAt
      updatedAt
    }
  }
`;
export const listLabs = /* GraphQL */ `
  query ListLabs(
    $filter: ModelLabsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLabs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        value
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
