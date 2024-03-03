import axios from "axios"
import { createCartRequest } from "./requests/createCartRequest"
import { createCartSubscribeRequest } from "./requests/createCartSubscribeRequest"
import { addLineItemsSubscribeRequest } from "./requests/addLineItemsSubscribeRequest"
import { addLineItemsRequest } from "./requests/addLineItemsRequest"
import { updateLineItemsRequest } from "./requests/updateLineItemsRequest"
import { removeLineItemsRequest } from "./requests/removeLineItemsRequest"
import { cartDiscountRequest } from "./requests/cartDiscountRequest"
import { updateLineItemsSubscribeRequest } from "./requests/updateLineItemsSubscribeRequest"
import { checkExistedCartRequest } from "./requests/checkExistedCartRequest"
import { getSubscriptionRequest } from "./requests/getSubscriptionRequest"
import { createCustomerRequest } from "./customer-requests/createCustomer"
import { createTokenRequest } from "./customer-requests/createToken"
import { getCustomer } from "./customer-requests/getCustomer"
import { customerAssociateRequest } from "./customer-requests/customerAssociate"
import { recoverPasswordRequest } from "./customer-requests/recoverPasswordRequest"
import {
  changeRecoverdPasswordRequest,
  activateUserRequest,
} from "./customer-requests/changeRecoverdPasswordRequest"
import {
  updateCustomerPasswordRequest,
  updateCustomerNameRequest,
  getCustomerEmailRequest,
} from "./customer-requests/updateCustomerRequest"
import {
  createCustomerAddressRequest,
  customerDefultAddressUpdateRequest,
  deleteDefultAddressUpdateRequest,
  editCustomerAddressRequest,
} from "./customer-requests/updateCustomerAddressRequest"

export const editCustomerAddress = async (addressData, token, id) => {
  const data = editCustomerAddressRequest(addressData, token, id)

  const response = await axios.post(
    "https://qleantabstore.myshopify.com/api/2022-07/graphql.json",
    data,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        "Content-Type": "application/json",
      },
    }
  )
  return response
}

const storefrontAccessToken = process.env.GATSBY_ACCESS_TOKEN

export const deleteCustomerDefultAddress = async (addressId, token) => {
  const data = deleteDefultAddressUpdateRequest(addressId, token)

  const response = await axios.post(
    "https://qleantabstore.myshopify.com/api/2022-07/graphql.json",
    data,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        "Content-Type": "application/json",
      },
    }
  )
  return response
}

export const updateCustomerDefultAddress = async (addressId, token) => {
  const data = customerDefultAddressUpdateRequest(addressId, token)

  const response = await axios.post(
    "https://qleantabstore.myshopify.com/api/2022-07/graphql.json",
    data,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        "Content-Type": "application/json",
      },
    }
  )
  return response
}

export const createCustomerAddress = async (addressData, token) => {
  const data = createCustomerAddressRequest(addressData, token)

  const response = await axios.post(
    "https://qleantabstore.myshopify.com/api/2022-07/graphql.json",
    data,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        "Content-Type": "application/json",
      },
    }
  )
  return response
}

export const updateCustomerName = async (firstName, lastName, token) => {
  const data = updateCustomerNameRequest(firstName, lastName, token)

  const response = await axios.post(
    "https://qleantabstore.myshopify.com/api/2022-07/graphql.json",
    data,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        "Content-Type": "application/json",
      },
    }
  )

  return response
}

export const getCustomerEmail = async token => {
  const data = getCustomerEmailRequest(token)

  const response = await axios.post(
    "https://qleantabstore.myshopify.com/api/2022-07/graphql.json",
    data,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        "Content-Type": "application/json",
      },
    }
  )

  return response
}

export const updateCustomerPassword = async (password, token) => {
  const data = updateCustomerPasswordRequest(password, token)

  const response = await axios.post(
    "https://qleantabstore.myshopify.com/api/2022-07/graphql.json",
    data,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        "Content-Type": "application/json",
      },
    }
  )

  return response
}

export const activateUser = async (pass, url) => {
  const data = activateUserRequest(pass, url)

  const response = await axios.post(
    "https://qleantabstore.myshopify.com/api/2022-07/graphql.json",
    data,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        "Content-Type": "application/json",
      },
    }
  )

  return response
}

export const changeRecoverdPassword = async (pass, url) => {
  const data = changeRecoverdPasswordRequest(pass, url)

  const response = await axios.post(
    "https://qleantabstore.myshopify.com/api/2022-07/graphql.json",
    data,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        "Content-Type": "application/json",
      },
    }
  )

  return response
}

export const recoverPassword = async email => {
  const data = recoverPasswordRequest(email)

  const response = await axios.post(
    "https://qleantabstore.myshopify.com/api/2022-07/graphql.json",
    data,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        "Content-Type": "application/json",
      },
    }
  )
  return response
}

export const customerAssociate = async (token, email, cartId) => {
  const data = customerAssociateRequest(token, email, cartId)

  const response = await axios.post(
    "https://qleantabstore.myshopify.com/api/2022-07/graphql.json",
    data,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        "Content-Type": "application/json",
      },
    }
  )
  return response
}

export const retriveCustomer = async id => {
  const data = getCustomer(id)

  const response = await axios.post(
    "https://qleantabstore.myshopify.com/api/2022-07/graphql.json",
    data,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        "Content-Type": "application/json",
      },
    }
  )
  return response
}

export const createCustomerToken = async customerData => {
  const data = createTokenRequest(customerData)

  const response = await axios.post(
    "https://qleantabstore.myshopify.com/api/2022-07/graphql.json",
    data,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        "Content-Type": "application/json",
      },
    }
  )
  return response
}

export const createCustomer = async customerData => {
  const data = createCustomerRequest(customerData)

  const response = await axios.post(
    "https://qleantabstore.myshopify.com/api/2022-07/graphql.json",
    data,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        "Content-Type": "application/json",
      },
    }
  )
  return response
}

export const checkExistedCart = async id => {
  const data = checkExistedCartRequest(id)

  const response = await axios.post(
    "https://qleantabstore.myshopify.com/api/2022-07/graphql.json",
    data,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        "Content-Type": "application/json",
      },
    }
  )

  return response.data?.data?.cart || null
}

export const createCart = async cartData => {
  const data = createCartRequest(cartData)

  const response = await axios.post(
    "https://qleantabstore.myshopify.com/api/2022-07/graphql.json",
    data,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        "Content-Type": "application/json",
      },
    }
  )
  console.log(response)
  return response.data?.data?.cartCreate?.cart || null
}

export const createCartSubscribe = async (
  merchandiseId,
  sellingPlanId,
  quantity
) => {
  const data = createCartSubscribeRequest(
    merchandiseId,
    sellingPlanId,
    quantity
  )

  const response = await axios.post(
    "https://qleantabstore.myshopify.com/api/2022-07/graphql.json",
    data,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        "Content-Type": "application/json",
      },
    }
  )

  return response.data?.data?.cartCreate?.cart || null
}

export const addLineItemsSubscribe = async (
  merchandiseId,
  sellingPlanId,
  quantity,
  cartId
) => {
  const data = addLineItemsSubscribeRequest(
    merchandiseId,
    sellingPlanId,
    quantity,
    cartId
  )

  const response = await axios.post(
    "https://qleantabstore.myshopify.com/api/2022-07/graphql.json",
    data,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        "Content-Type": "application/json",
      },
    }
  )

  return response.data?.data?.cartLinesAdd?.cart || null
}

export const updateLineItemsSubscribe = async (
  merchandiseId,
  quantity,
  cartId
) => {
  const data = updateLineItemsSubscribeRequest(merchandiseId, quantity, cartId)

  const response = await axios.post(
    "https://qleantabstore.myshopify.com/api/2022-07/graphql.json",
    data,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        "Content-Type": "application/json",
      },
    }
  )

  return response.data?.data.cartLinesUpdate?.cart || null
}

export const updateLineItems = async (cartData, cartId) => {
  const data = updateLineItemsRequest(cartData, cartId)

  const response = await axios.post(
    "https://qleantabstore.myshopify.com/api/2022-07/graphql.json",
    data,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        "Content-Type": "application/json",
      },
    }
  )

  return response.data?.data?.cartLinesUpdate?.cart || null
}

export const addLineItems = async (cartData, cartId) => {
  const data = addLineItemsRequest(cartData, cartId)

  const response = await axios.post(
    "https://qleantabstore.myshopify.com/api/2022-07/graphql.json",
    data,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        "Content-Type": "application/json",
      },
    }
  )

  return response.data?.data?.cartLinesAdd?.cart || null
}

export const removeLineItems = async (merchandiseId, cartId) => {
  const data = removeLineItemsRequest(merchandiseId, cartId)

  const response = await axios.post(
    "https://qleantabstore.myshopify.com/api/2022-07/graphql.json",
    data,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        "Content-Type": "application/json",
      },
    }
  )

  return response.data?.data?.cartLinesRemove?.cart || null
}

export const addCartDiscount = async (cartId, code) => {
  const data = cartDiscountRequest(cartId, code)

  const response = await axios.post(
    "https://qleantabstore.myshopify.com/api/2022-07/graphql.json",
    data,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        "Content-Type": "application/json",
      },
    }
  )

  return {
    response: response.data?.data?.cartDiscountCodesUpdate?.cart || null,
    compare:
      response.data.data.cartDiscountCodesUpdate.cart.cost.totalAmount.amount,
  }
}

export const getSubscribe = async productId => {
  const data = getSubscriptionRequest(productId)

  const response = await axios.post(
    "https://qleantabstore.myshopify.com/api/2022-07/graphql.json",
    data,
    {
      headers: {
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        "Content-Type": "application/json",
      },
    }
  )

  return response.data?.data?.product || null
}
