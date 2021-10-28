/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMedications = /* GraphQL */ `
  mutation CreateMedications(
    $input: CreateMedicationsInput!
    $condition: ModelMedicationsConditionInput
  ) {
    createMedications(input: $input, condition: $condition) {
      id
      medicine
      dosage
      createdAt
      updatedAt
    }
  }
`;
export const updateMedications = /* GraphQL */ `
  mutation UpdateMedications(
    $input: UpdateMedicationsInput!
    $condition: ModelMedicationsConditionInput
  ) {
    updateMedications(input: $input, condition: $condition) {
      id
      medicine
      dosage
      createdAt
      updatedAt
    }
  }
`;
export const deleteMedications = /* GraphQL */ `
  mutation DeleteMedications(
    $input: DeleteMedicationsInput!
    $condition: ModelMedicationsConditionInput
  ) {
    deleteMedications(input: $input, condition: $condition) {
      id
      medicine
      dosage
      createdAt
      updatedAt
    }
  }
`;
export const createNotes = /* GraphQL */ `
  mutation CreateNotes(
    $input: CreateNotesInput!
    $condition: ModelNotesConditionInput
  ) {
    createNotes(input: $input, condition: $condition) {
      id
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateNotes = /* GraphQL */ `
  mutation UpdateNotes(
    $input: UpdateNotesInput!
    $condition: ModelNotesConditionInput
  ) {
    updateNotes(input: $input, condition: $condition) {
      id
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteNotes = /* GraphQL */ `
  mutation DeleteNotes(
    $input: DeleteNotesInput!
    $condition: ModelNotesConditionInput
  ) {
    deleteNotes(input: $input, condition: $condition) {
      id
      description
      createdAt
      updatedAt
    }
  }
`;
export const createLabs = /* GraphQL */ `
  mutation CreateLabs(
    $input: CreateLabsInput!
    $condition: ModelLabsConditionInput
  ) {
    createLabs(input: $input, condition: $condition) {
      id
      type
      value
      createdAt
      updatedAt
    }
  }
`;
export const updateLabs = /* GraphQL */ `
  mutation UpdateLabs(
    $input: UpdateLabsInput!
    $condition: ModelLabsConditionInput
  ) {
    updateLabs(input: $input, condition: $condition) {
      id
      type
      value
      createdAt
      updatedAt
    }
  }
`;
export const deleteLabs = /* GraphQL */ `
  mutation DeleteLabs(
    $input: DeleteLabsInput!
    $condition: ModelLabsConditionInput
  ) {
    deleteLabs(input: $input, condition: $condition) {
      id
      type
      value
      createdAt
      updatedAt
    }
  }
`;
