export const createTokenRequest = customerData => {
  const { email, password } = customerData

  return JSON.stringify({
    query: `mutation {
        customerAccessTokenCreate(input: {
          email: "${email}",
          password: "${password}"
        }) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          customerUserErrors {
            field
            message
          }
        }
      }`,
  })
}
