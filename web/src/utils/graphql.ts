// MUTATUONS
export const registerMutation = `
mutation Register($fullName: String!, $displayName: String! $email: String! $password: String!) {
    register(createUserInput: {
        fullName: $fullName,
        displayName: $displayName,
        email: $email,
        password: $password
    }) {
		statusCode
		message
		user {
				id
				displayName
				role
			}
    	}
  	}
`

export const loginMutation = `
mutation Login($email: String! $password: String!) {
    login(credentialsInput: {
        email: $email,
        password: $password
    }) {
      statusCode
      message
		user {
			id
			displayName
			role
		}
    }
}
`


// QUERIES
export const whoAmIQuery = `
query whoAmI{
    whoAmI {
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
query getAllUsers{
	getUsers {
		email
		fullName
	}
}
`