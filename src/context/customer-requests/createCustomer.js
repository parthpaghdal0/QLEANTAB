export const createCustomerRequest = customerData => {
  const { firstname, lastname, email, password } = customerData

  return JSON.stringify({
    query: `
    mutation {
        customerCreate(input: {
          firstName: "${firstname}",
          lastName: "${lastname}",
          email: "${email}",
          password: "${password}"
        }) {
          customer {
            id
            firstName
            lastName
            email
          }
          customerUserErrors {
            field
            message
          }
        }
      }
           `,
  })
}
