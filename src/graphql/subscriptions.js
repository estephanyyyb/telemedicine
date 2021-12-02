/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      email
      given_name
      family_name
      appointments {
        items {
          id
          email
          patientDate
          doctorReason
          doctorNotes
          approval
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      email
      given_name
      family_name
      appointments {
        items {
          id
          email
          patientDate
          doctorReason
          doctorNotes
          approval
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      email
      given_name
      family_name
      appointments {
        items {
          id
          email
          patientDate
          doctorReason
          doctorNotes
          approval
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateAppointments = /* GraphQL */ `
  subscription OnCreateAppointments {
    onCreateAppointments {
      id
      email
      patientDate
      doctorReason
      doctorNotes
      approval
      userObject {
        id
        email
        given_name
        family_name
        appointments {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateAppointments = /* GraphQL */ `
  subscription OnUpdateAppointments {
    onUpdateAppointments {
      id
      email
      patientDate
      doctorReason
      doctorNotes
      approval
      userObject {
        id
        email
        given_name
        family_name
        appointments {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteAppointments = /* GraphQL */ `
  subscription OnDeleteAppointments {
    onDeleteAppointments {
      id
      email
      patientDate
      doctorReason
      doctorNotes
      approval
      userObject {
        id
        email
        given_name
        family_name
        appointments {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
