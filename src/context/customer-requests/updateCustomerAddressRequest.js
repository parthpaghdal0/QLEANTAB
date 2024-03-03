export const editCustomerAddressRequest = (addressData, token, id) => {
  return JSON.stringify({
    query: `mutation customerAddressUpdate($address: MailingAddressInput!, $customerAccessToken: String!, $id: ID!) {
      customerAddressUpdate(address: $address, customerAccessToken: $customerAccessToken, id: $id) {
        customerAddress {
          address1
          city
          id
        }
        customerUserErrors {
          field
          message
        }
      }
    }`,
    variables: {
      address: {
        address1: addressData.address,
        address2: addressData.address2,
        city: addressData.city,
        company: addressData.company,
        country: addressData.country,
        firstName: addressData.firstname,
        lastName: addressData.lastname,
        phone: addressData.phone,
        province: addressData.city,
        zip: addressData.postal,
      },
      customerAccessToken: token,
      id: id,
    },
  })
}

export const deleteDefultAddressUpdateRequest = (addressId, token) => {
  return JSON.stringify({
    query: `mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
      customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
        customerUserErrors {
          field
          message
        }
        deletedCustomerAddressId
      }
    }`,
    variables: {
      customerAccessToken: token,
      id: addressId,
    },
  })
}

export const customerDefultAddressUpdateRequest = (addressId, token) => {
  return JSON.stringify({
    query: `mutation customerDefaultAddressUpdate($addressId: ID!, $customerAccessToken: String!) {
        customerDefaultAddressUpdate(addressId: $addressId, customerAccessToken: $customerAccessToken) {
          customer {
            email
          }
          customerUserErrors {
            field
            message
          }
        }
      }`,
    variables: {
      addressId: addressId,
      customerAccessToken: token,
    },
  })
}

export const createCustomerAddressRequest = (addressData, token) => {
  return JSON.stringify({
    query: `mutation customerAddressCreate($address: MailingAddressInput!, $customerAccessToken: String!) {
        customerAddressCreate(address: $address, customerAccessToken: $customerAccessToken) {
          customerAddress {
            address1
            city
            id
          }
          customerUserErrors {
            field
            message
          }
        }
      }`,
    variables: {
      customerAccessToken: token,
      address: {
        address1: addressData.address,
        address2: addressData.address2,
        city: addressData.city,
        company: addressData.company,
        country: addressData.country,
        firstName: addressData.firstname,
        lastName: addressData.lastname,
        phone: addressData.phone,
        province: addressData.city,
        zip: addressData.postal,
      },
    },
  })
}
