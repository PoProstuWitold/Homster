// MUTATUONS
export const registerMutation = `
mutation Register($fullName: String!, $displayName: String! $email: String! $password: String!) {
    register(createUserInput: {
        fullName: $fullName,
        displayName: $displayName,
        email: $email,
        password: $password
    }) {
    __typename
    statusCode
    message
    user {
      __typename
      id
      displayName
      fullName
      email
      role
      createdAt
      updatedAt
    }
  }
`

export const loginMutation = `
mutation Login($email: String! $password: String!) {
    login(credentialsInput: {
        email: $email,
        password: $password
    }) {
      __typename
      statusCode
      message
		user {
      __typename
			id
      displayName
      fullName
      email
      role
      createdAt
      updatedAt
		}
    }
}
`


// QUERIES
export const whoAmIQuery = `
query whoAmI{
    whoAmI {
      __typename
      statusCode
      message
      user {
        __typename
        id
        displayName
        fullName
        email
        role
        createdAt
        updatedAt
      }
    }
  }
`

export const logoutMutation = `
mutation logout {
  logout {
    __typename
    statusCode
    message
    user {
      id
      displayName
      fullName
      email
      role
      createdAt
      updatedAt
    }
  }
}
`

export const getAllUsersQuery = `
query getAllUsers {
  getUsers {
    __typename
    id
    displayName
    fullName
    email
    role
    createdAt
    updatedAt
  }
}
`