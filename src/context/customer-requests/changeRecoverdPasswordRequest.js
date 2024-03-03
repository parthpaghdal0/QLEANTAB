export const changeRecoverdPasswordRequest = (pass, url) => {
  return JSON.stringify({
    query: `mutation customerResetByUrl($password: String!, $resetUrl: URL!) {
        customerResetByUrl(password: $password, resetUrl: $resetUrl) {
          customer {
            id
          }
        
          customerUserErrors {
            field
            message
          }
        }
      }`,
    variables: {
      resetUrl: url,
      password: pass,
    },
  })
}

export const activateUserRequest = (pass, url) => {
  return JSON.stringify({
    query: `mutation customerActivateByUrl($activationUrl: URL!, $password: String!) {
      customerActivateByUrl(activationUrl: $activationUrl, password: $password) {
        customer {
          id
        }
        
        customerUserErrors {
          field
          message
        }
      }
    }`,
    variables: {
      activationUrl: url,
      password: pass,
    },
  })
}
