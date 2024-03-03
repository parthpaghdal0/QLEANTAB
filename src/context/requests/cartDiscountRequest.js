export const cartDiscountRequest = (cartId, code) => {
    return JSON.stringify({
        query: `
        mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]) {
            cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
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
                      }
                      compareAtPriceV2 {
                        amount
                      }
                      priceV2 {
                        amount
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
                        currencyCode
                      }
                      compareAtPrice {
                        amount
                        currencyCode
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
          }
        }
         `,
        variables: {
            cartId,
            discountCodes: [code]
        }
    });
}