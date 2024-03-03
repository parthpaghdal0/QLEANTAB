export const checkExistedCartRequest = id => {
  return JSON.stringify({
    query: `
        query getCart($id: ID!){
            cart(id:$id) {
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
            }
          }
         `,
    variables: {
      id,
    },
  })
}
