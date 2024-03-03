import React, { useState, useEffect } from "react"
import {
  addToCartSubscription,
  createCart,
  updateLineItemSubscription,
} from "./subscribe"
import { useStaticQuery } from "gatsby"
import Client from "shopify-buy"
const client = Client.buildClient({
  domain: `${process.env.GATSBY_MYSHOPIFY_URL}`,
  storefrontAccessToken: process.env.GATSBY_ACCESS_TOKEN,
})
const defaultState = {
  cart: {},
}
const CartContext = React.createContext(defaultState)
export default CartContext
export function CartContextProvider({ children }) {
  const [openCart, setOpenCart] = React.useState(false)
  const [openSideCart, setSideOpenCart] = React.useState(false)
  const [checkout, setCheckout] = useState(
    JSON.parse(
      typeof window !== "undefined" ? localStorage.getItem("checkout") : null
    )
  )
  const [successfulOrder, setSuccessfulOrder] = useState(null)
  const checkoutId = checkout?.id
  useEffect(() => {
    const getCheckout = async () => {
      if (checkoutId && typeof window !== "undefined") {
        const fetchedCheckout = await client.checkout.fetch(checkoutId)
        if (fetchedCheckout?.completedAt) {
          localStorage.removeItem("checkout")
          setCheckout(null)
          setSuccessfulOrder(fetchedCheckout)
        } else {
          setCheckout(fetchedCheckout)
          localStorage.setItem("checkout", JSON.stringify(fetchedCheckout))
        }
      }
    }
    getCheckout()
  }, [setCheckout, setSuccessfulOrder, checkoutId])
  async function getProductById(productId) {
    const product = await client.product.fetch(productId)
    return product
  }
  async function addDiscount(discountCode) {
    const discount = await client.checkout.addDiscount(checkoutId, discountCode)
    return discount
  }
  const updateLineItem = async ({ variantId, quantity }) => {
    // if no checkout id, create a new checkout
    let newCheckout = checkout || (await client.checkout.create())

    // check to see if this variantId exists in storedCheckout
    const lineItemVariant = newCheckout.lineItems?.find(
      lineItem => lineItem.variant.id === variantId
    )
    if (lineItemVariant) {
      const newQuantity = lineItemVariant.quantity + quantity
      if (newQuantity) {
        newCheckout = await client.checkout.updateLineItems(newCheckout.id, [
          {
            id: lineItemVariant.id,
            quantity: newQuantity,
          },
        ])
      } else {
        newCheckout = await client.checkout.removeLineItems(newCheckout.id, [
          lineItemVariant.id,
        ])
      }
    } else {
      newCheckout = await client.checkout.addLineItems(newCheckout.id, [
        {
          variantId,
          quantity,
        },
      ])
    }
    setCheckout(newCheckout)
    setSuccessfulOrder(null)
    if (typeof window !== "undefined") {
      localStorage.setItem("checkout", JSON.stringify(newCheckout))
    }
    console.log(newCheckout.webUrl)
  }
  const openCartDrawer = value => {
    setOpenCart(value)
  }
  async function getProductByHandle(handle) {
    const product = await client.product.fetchByHandle(handle)
    return product
  }
  const removeLineItem = async lineItemId => {
    const newCheckout = await client.checkout.removeLineItems(checkout.id, [
      lineItemId,
    ])
    setCheckout(newCheckout)
  }
  const dismissSuccessfulOrder = () => {
    setSuccessfulOrder(null)
  }

  return (
    <CartContext.Provider
      value={{
        checkout: checkout,
        updateLineItem,
        openCartDrawer,
        removeLineItem,
        getProductById,
        getProductByHandle,
        addDiscount,
        successfulOrder,
        setOpenCart,
        openCart: openCart,
        setSideOpenCart,
        openSideCart: openSideCart,
        dismissSuccessfulOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
