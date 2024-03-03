export const recoverPasswordRequest = email => {
  return JSON.stringify({
    query: `mutation customerRecover($email: String!) {
            customerRecover(email: $email) {
              customerUserErrors {
                field
                message
              }
            }
          }`,
    variables: {
      email: email,
    },
  })
}
