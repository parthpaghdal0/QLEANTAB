export const getCustomer = id => {
  return JSON.stringify({
    query: `query { 
        customer(customerAccessToken:"${id}"){
          id
          firstName
          lastName
          email
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
          lastIncompleteCheckout {
            id
            lineItems(first: 20) {
              edges {
                node {
                  id
                  title
                  variant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    image {
                      src
                    }
                  }
                  quantity
                }
              }
            }
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
          orders(first: 20, reverse: true) {
            edges {
              node {
                id
                name
                fulfillmentStatus
                orderNumber
                processedAt
                totalPrice {
                  amount
                  currencyCode
                }
                shippingAddress {
                  city
                  address1 
                }
                lineItems(first: 20) {
                  edges {
                    node {
                      title
                      quantity
                       variant {
                        product {
                          variants(first: 3) {
                            edges {
                              node {
                                id
                                title
                                sellingPlanAllocations(first: 1) {
                                  edges {
                                    node {
                                      sellingPlan{
                                        id
                                        description
                                        name
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                        image {
                          url
                        }
                        id
                        title
                        price {
                          amount
                          currencyCode
                        }
                      }
                     
                    }
                  }
                }
              }
            }
          }
        }
      }`,
  })
}
