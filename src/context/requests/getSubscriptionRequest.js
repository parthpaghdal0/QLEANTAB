export const getSubscriptionRequest = productId => {
  return JSON.stringify({
    query: `
      query ($id: ID!) {
        product(id: $id) {
          sellingPlanGroups(first: 3) {
            nodes {
              name
              options {
                name
                values
              }
              sellingPlans(first: 5) {
                nodes {
                  id
                  name
                  description
                  options {
                    name
                    value
                  }
                  priceAdjustments {
                    orderCount
                    adjustmentValue {
                      __typename
                      ... on SellingPlanPercentagePriceAdjustment {
                        adjustmentPercentage
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
              `,
    variables: {
      id: productId,
    },
  })
}
