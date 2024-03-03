export const customerAssociateRequest = (token, email, cartId) => {
  return JSON.stringify({
    query: `
      mutation cartBuyerIdentityUpdate($buyerIdentity: CartBuyerIdentityInput!, $cartId: ID!) {
          cartBuyerIdentityUpdate(buyerIdentity: $buyerIdentity, cartId: $cartId) {
            cart{
              buyerIdentity {
                
                customer {
                  id
                  email
                }
              }
              id
              totalQuantity
              checkoutUrl
              createdAt
              updatedAt
              lines(first: 250) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        product {
                          id
                          title
                          handle
                          productType
                          variants(first: 5) {
                            nodes {
                              id
                              title
                              sku
                             
                            }
                          }
                          sellingPlanGroups(first: 3) {
                            edges {
                              node {
                                sellingPlans(first: 5) {
                                  edges {
                                    node {
                                      id
                                      name
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                        compareAtPriceV2 {
                          amount
                          currencyCode
                        }
                        priceV2 {
                          amount
                          currencyCode
                        }
                        image {
                          altText
                          url
                        }
                      }
                    }
                    sellingPlanAllocation {
                      sellingPlan {
                        id
                        name
                      }
                      priceAdjustments {
                        price {
                          amount
                        }
                        compareAtPrice {
                          amount
                        }
                        perDeliveryPrice {
                          amount
                        }
                      }
                    }
                  }
                }
              }
              cost {
                totalAmount {
                  amount
                  currencyCode
                }
                subtotalAmount {
                  amount
                  currencyCode
                }
                totalTaxAmount {
                  amount
                  currencyCode
                }
                totalDutyAmount {
                  amount
                  currencyCode
                }
              }
             }
              userErrors {
                field
                message
              }
            userErrors {
              field
              message
            }
          }
        }
        `,
    variables: {
      buyerIdentity: {
        customerAccessToken: token,
        email: email,
      },
      cartId: cartId,
    },
  })
}
