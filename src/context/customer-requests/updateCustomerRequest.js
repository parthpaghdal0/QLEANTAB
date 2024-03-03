export const updateCustomerPasswordRequest = (password, token) => {
  return JSON.stringify({
    query: `mutation customerRequest($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
        customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {
          customer {
            id
            firstName
            lastName
            email
            phone
            acceptsMarketing
          }
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
    variables: {
      customerAccessToken: token,
      customer: {
        password: password,
      },
    },
  })
}

export const updateCustomerNameRequest = (firstName, lastName, token) => {
  return JSON.stringify({
    query: `mutation customerRequest($customer: CustomerUpdateInput!, $customerAccessToken: String!) {
        customerUpdate(customer: $customer, customerAccessToken: $customerAccessToken) {
          customer {
            id
            firstName
            lastName
            email
            phone
            acceptsMarketing
            defaultAddress {
              address1
              address2
              city
              company
              country
              firstName
              lastName
              phone
              province
              zip
              id
            }
            addresses(first: 20) {
              edges {
                node {
                  address1
                  address2
                  city
                  company
                  country
                  firstName
                  lastName
                  phone
                  province
                  zip
                  id
                }
              }
            }
          }
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
    variables: {
      customerAccessToken: token,
      customer: {
        firstName: firstName,
        lastName: lastName,
      },
    },
  })
}

export const getCustomerEmailRequest = token => {
  return JSON.stringify({
    query: `query { 
        customer(customerAccessToken:"${token}"){
         email
        }
      }`,
  })
}
