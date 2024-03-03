import React from "react"
import { ProductContextProvider } from "./src/context/ProductContext"
import { CartContextProvider } from "./src/context/CartContext"
import { GeneralContextProvider } from "./src/context/GeneralContext"
import { CheckoutContextProvider } from "./src/context/CheckoutContext"
// import { CheckoutContext } from "./src/context/UpdatedCartContext"
import { Provider } from "react-redux"
import store from "./src/store/store"
// import Layout from "./src/components/layout/Layout"
// import { Location } from "@reach/router"

export const wrapRootElement = ({ element }) => (
  <GeneralContextProvider>
    <ProductContextProvider>
      {/* <CheckoutContext> */}
      <CheckoutContextProvider>
        <CartContextProvider>
          <Provider store={store}>
            {/* <Location>
          {location => <Layout {...location}> {element}</Layout>}
        </Location> */}
            {element}
          </Provider>
        </CartContextProvider>
      </CheckoutContextProvider>
      {/* </CheckoutContext> */}
    </ProductContextProvider>
  </GeneralContextProvider>
)

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <meta
      key="domain_verify1"
      name="p:domain_verify"
      content="ea14b57517d30f47377bc9157d45b7c4"
    />,
  ])
}
