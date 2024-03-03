import React from "react"
import { ProductContextProvider } from "./src/context/ProductContext"
import { CartContextProvider } from "./src/context/CartContext"
import { CheckoutContextProvider } from "./src/context/CheckoutContext"
import { GeneralContextProvider } from "./src/context/GeneralContext"
import "./src/assets/global-styles/index.scss"
import "./src/assets/global-styles/global.scss"
import "./src/components/reviews-section/reviews-global.scss"
import "./src/components/instagram-section/instagram-global.scss"
import { Provider } from "react-redux"
import store from "./src/store/store"
// import Layout from "./src/components/layout/Layout"
// import { Location } from "@reach/router"

export const wrapRootElement = ({ element, props }) => (
  <GeneralContextProvider>
    <ProductContextProvider>
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
    </ProductContextProvider>
  </GeneralContextProvider>
)
