import React, { useState, useEffect, useLayoutEffect } from "react"
import { navigate } from "gatsby"
import useTrackCart from "../custom-hooks/track-cart"
import useUserSession from "../custom-hooks/auth/useUserSession"
import {
  addLineItemsSubscribe,
  checkExistedCart,
  createCart,
  createCartSubscribe,
  updateLineItems,
  updateLineItemsSubscribe,
  removeLineItems,
  addLineItems,
  addCartDiscount,
  getSubscribe,
  retriveCustomer,
  customerAssociate,
} from "./subscribe"
import Client from "shopify-buy"
import useGlobalLang from "../custom-hooks/useGlobalLang"

const checkoutKey = "cart"
const client = Client.buildClient({
  domain: `${process.env.GATSBY_MYSHOPIFY_URL}`,
  storefrontAccessToken: process.env.GATSBY_ACCESS_TOKEN,
})
const defaultState = {
  cart: {},
}

const CheckoutContext = React.createContext(defaultState)

export default CheckoutContext

export function CheckoutContextProvider({ children }) {
  const { GLOBAL_LANG } = useGlobalLang()
  const {
    CartTrackingHandler,
    CheckoutTrackingHandler,
    CartListTrackingHandler,
  } = useTrackCart()
  const [openCart, setOpenCart] = React.useState(false)
  const [openSideCart, setSideOpenCart] = React.useState(false)
  // const [subscriptionId, setSubscriptionId] = React.useState(typeof window !== "undefined" ? localStorage.getItem("subscribtion") : null)
  const [checkout, setCheckout] = useState(
    JSON.parse(
      typeof window !== "undefined" ? localStorage.getItem(checkoutKey) : null
    )
  )
  const [successfulOrder, setSuccessfulOrder] = useState(null)
  const checkoutId = checkout?.id
  const [invalidCupon, setInvalidCupon] = useState(false)

  useEffect(() => {
    if (checkoutId) checkCheckout(checkoutId)
  }, [])

  useEffect(() => {
    const getCheckout = async () => {
      if (checkoutId && typeof window !== "undefined") {
        // console.log(checkoutId);
        // const fetchedCheckout = await client.checkout.fetch(checkoutId)
        // if (fetchedCheckout?.completedAt) {
        //   localStorage.removeItem(checkoutKey)
        //   setCheckout(null)
        //   setSuccessfulOrder(fetchedCheckout)
        // } else {
        //   setCheckout(fetchedCheckout)
        //   localStorage.setItem(checkoutKey, JSON.stringify(fetchedCheckout))
        // }
      }
    }
    getCheckout()
  }, [setCheckout, setSuccessfulOrder, checkoutId])

  const checkCheckout = async id => {
    const existedCart = await checkExistedCart(id)
    // console.log(existedCart);
    if (!existedCart && typeof window !== "undefined") {
      localStorage.removeItem(checkoutKey)
      window.location.href = "/"
    }
  }

  async function getProductById(productId) {
    const product = await client.product.fetch(productId)
    return product
  }

  async function addDiscount(discountCode) {
    let newCheckout = checkout
    const response = await addCartDiscount(newCheckout.id, discountCode)

    if (checkout.cost.totalAmount.amount === response.compare) {
      setInvalidCupon(true)
    } else {
      setInvalidCupon(false)
      newCheckout = response.response

      if (newCheckout) {
        setCheckout(newCheckout)
        setSuccessfulOrder(null)
        if (typeof window !== "undefined") {
          localStorage.setItem(checkoutKey, JSON.stringify(newCheckout))
        }
      }
    }
  }

  const getSubscription = async id => {
    return getSubscribe(id)
  }

  const updateLineItem = async (
    { variantId, quantity },
    mode = "defult",
    itemInfo = null,
    buyNow = false
  ) => {
    // if no checkout id, create a new checkout
    let newCheckout = checkout

    if (!newCheckout) {
      newCheckout = await createCart([{ variantId, quantity }])
    } else {
      const lineItem = newCheckout.lines?.edges.find(
        node =>
          node.node.merchandise.id === variantId &&
          !node.node.sellingPlanAllocation
      )
      const lineItemVariant = lineItem?.node

      if (lineItemVariant) {
        const newQuantity = lineItemVariant.quantity + quantity

        if (newQuantity) {
          newCheckout = await updateLineItems(
            [{ id: lineItemVariant?.id, quantity: newQuantity }],
            newCheckout.id
          )
        } else {
          newCheckout = await removeLineItems(
            lineItemVariant?.id,
            newCheckout.id
          )
        }
      } else {
        newCheckout = await addLineItems(
          [{ variantId, quantity }],
          newCheckout.id
        )
      }
    }

    if (newCheckout) {
      setCheckout(newCheckout)
      setSuccessfulOrder(null)
      if (typeof window !== "undefined") {
        localStorage.setItem(checkoutKey, JSON.stringify(newCheckout))
      }
    }

    if (mode === "defult") {
      CartTrackingHandler(newCheckout, itemInfo)
    } else if (mode === "buy-now-async") {
      CheckoutTrackingHandler(newCheckout)
    }

    if (buyNow) {
      const url =
        newCheckout?.checkoutUrl.replace(
          "http://qleantab.com",
          "https://qleantabstore.myshopify.com"
        ) + `?locale=${GLOBAL_LANG}`

      navigate(url)
    }
  }

  const addCollection = async (data, location) => {
    let newCheckout = checkout
    if (!newCheckout) {
      newCheckout = await createCart(data)
    } else {
      let itemForUpdate = []
      let itemForAdd = []
      data.forEach(element => {
        const item = newCheckout.lines.edges.find(
          i => i.node.merchandise.id == element.variantId
        )
        item
          ? itemForUpdate.push({
              id: item.node.id,
              quantity: item.node.quantity + 1,
            })
          : itemForAdd.push(element)
      })

      if (itemForAdd.length) {
        newCheckout = await addLineItems(itemForAdd, newCheckout.id)
      }
      if (itemForUpdate.length) {
        newCheckout = await updateLineItems(itemForUpdate, newCheckout.id)
      }
    }

    if (newCheckout) {
      setCheckout(newCheckout)
      if (typeof window !== "undefined")
        localStorage.setItem(checkoutKey, JSON.stringify(newCheckout))
    }
    // CartTrackingHandler(newCheckout)
    CartListTrackingHandler(newCheckout, data, location)
  }

  const updateSubscriptionLineItem = async (
    { variantId, quantity, sellingPlanId },
    mode = "defult",
    itemInfo = null,
    buyNow = false
  ) => {
    // if no checkout id, create a new checkout
    let newCheckout = checkout

    if (!newCheckout) {
      newCheckout = await createCartSubscribe(
        variantId,
        sellingPlanId,
        quantity
      )
    } else {
      const lineItem = newCheckout.lines?.edges.find(
        node =>
          node.node?.sellingPlanAllocation?.sellingPlan?.id === sellingPlanId
      )
      const lineItemVariant = lineItem?.node

      if (lineItemVariant) {
        const newQuantity = quantity ? lineItemVariant.quantity + quantity : 0

        if (newQuantity) {
          newCheckout = await updateLineItemsSubscribe(
            lineItemVariant?.id,
            newQuantity,
            newCheckout.id
          )
        } else {
          newCheckout = await removeLineItems(
            lineItemVariant?.id,
            newCheckout.id
          )
        }
      } else {
        newCheckout = await addLineItemsSubscribe(
          variantId,
          sellingPlanId,
          quantity,
          newCheckout.id
        )
      }
    }

    if (newCheckout) {
      setCheckout(newCheckout)
      setSuccessfulOrder(null)
      if (typeof window !== "undefined") {
        // const subscribtionId = newCheckout.lines?.edges[newCheckout.lines?.edges.length - 1]?.node?.id;
        // if (subscribtionId) {
        //   setSubscriptionId(subscribtionId);
        //   localStorage.setItem('subscribtion', subscribtionId)
        // }
        localStorage.setItem(checkoutKey, JSON.stringify(newCheckout))
      }
    }
    if (mode === "defult") {
      CartTrackingHandler(newCheckout, itemInfo)
    } else if (mode === "buy-now-async") {
      CheckoutTrackingHandler(newCheckout)
    }

    if (buyNow) {
      const url =
        newCheckout?.checkoutUrl.replace(
          "http://qleantab.com",
          "https://qleantabstore.myshopify.com"
        ) + `?locale=${GLOBAL_LANG}`

      navigate(url)
    }
  }

  const openCartDrawer = value => {
    setOpenCart(value)
  }

  async function getProductByHandle(handle) {
    const product = await client.product.fetchByHandle(handle)
    return product
  }

  const removeLineItem = async lineItemId => {
    const newCheckout = await removeLineItems(lineItemId, checkout.id)
    setCheckout(newCheckout)
    if (typeof window !== "undefined")
      localStorage.setItem(checkoutKey, JSON.stringify(newCheckout))
  }

  const dismissSuccessfulOrder = () => {
    setSuccessfulOrder(null)
  }

  //CUSTOMER LOGIC

  const { createUserSession, clearUserSession, getUserSession } =
    useUserSession()

  const [customerData, setCustomerData] = useState(null)
  const [customerToken, setCustomeroken] = useState(null)
  const [subscriptionList, setSubscriptionList] = useState([])

  //COMMENT FOR RELEASE
  useEffect(() => {
    if (checkout && customerData) {
      const cartId = checkout.id
      const userEmail = customerData.email

      if (customerToken && cartId && !checkout?.buyerIdentity?.customer) {
        console.log("ASSOSIATE")
        customerAssociate(customerToken, userEmail, cartId).then(response => {
          console.log(response)
          const refreshCart = response.data.data.cartBuyerIdentityUpdate.cart
          setCheckout(refreshCart)
          localStorage.setItem(checkoutKey, JSON.stringify(refreshCart))
        })
      }
    }
  }, [checkout, customerData])

  // console.log(checkout)
  // console.log(customerData)
  // console.log(customerToken)

  //COMMENT FOR RELEASE

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const userToken = localStorage.getItem("customerToken")
      if (!userToken) {
        clearUserSession()
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userToken = localStorage.getItem("customerToken")
      if (userToken && !customerData) {
        createUserSession()
        // const test = getUserSession()
        setCustomeroken(userToken)
        retriveCustomer(userToken).then(response => {
          setCustomerData(response?.data?.data?.customer)
        })
      }
    }
  }, [customerData])

  const setCustomerHandler = async (token, staylogged) => {
    if (token) {
      if (staylogged && typeof window !== "undefined") {
        localStorage.setItem("customerToken", token)
        const expirationDate = new Date().getTime() + 5 * 24 * 60 * 60 * 1000
        localStorage.setItem("customerTokenExp", expirationDate)
        setCustomeroken(token)
      }
      return token
    } else {
      console.log("error handling")
      return null
    }
  }

  const logOutHandler = () => {
    localStorage.removeItem("customerToken")
    localStorage.removeItem("customerTokenExp")
    setCustomerData(null)
    setCustomeroken(null)
    clearUserSession()
    const url = GLOBAL_LANG === "en" ? "/en/account/login" : "/account/login"
    navigate(url)
  }

  const refreshCustomer = userToken => {
    retriveCustomer(userToken).then(response => {
      setCustomerData(response?.data?.data?.customer)
    })
  }

  const checkTokenExparation = () => {
    if (typeof window !== "undefined") {
      const userTokenExp = localStorage.getItem("customerTokenExp")
      if (userTokenExp) {
        const timeNow = new Date().getTime()
        // const timeNow = Date.UTC(2024, 3, 9)
        if (timeNow > Number(userTokenExp)) {
          setTimeout(() => {
            logOutHandler()
          }, 1000)
        } else {
          return
        }
      }
    }
  }

  useEffect(() => {
    checkTokenExparation()
  }, [])

  return (
    <CheckoutContext.Provider
      value={{
        checkout: checkout,
        addCollection,
        updateLineItem,
        updateSubscriptionLineItem,
        openCartDrawer,
        removeLineItem,
        getProductById,
        getProductByHandle,
        addDiscount,
        getSubscription,
        successfulOrder,
        setOpenCart,
        openCart: openCart,
        setSideOpenCart,
        openSideCart: openSideCart,
        dismissSuccessfulOrder,
        invalidCupon,
        setInvalidCupon,
        setCustomerHandler,
        setCustomerData,
        logOutHandler,
        customerData: customerData,
        customerToken: customerToken,
        setCustomeroken,
        refreshCustomer,
        subscriptionList,
        setSubscriptionList,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}
