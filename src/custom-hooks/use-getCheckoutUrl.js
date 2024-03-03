import React, { useState } from "react"
import axios from "axios"

const useGetCheckoutUrl = () => {
  const isBrowser = typeof window !== "undefined"

  const getCheckoutUrl = async cart => {
    const token = process.env.GATSBY_ACCESS_TOKEN

    const myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")
    myHeaders.append(
      "x-shopify-storefront-access-token",
      "f3ebce8b05dd1aea353729a0a4483cd5"
    )

    const raw = JSON.stringify(cart)

    console.log(raw);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    }

    console.log(requestOptions);

    fetch(
      "https://qleantabstore.myshopify.com/api/2022-04/checkouts.json",
      requestOptions
    )
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log("error", error))

    // if (isBrowser) {
    //   console.log(cart)
    //   try {
    //     const response = axios.post(
    //       "https://qleantabstore.myshopify.com/api/2022-04/checkouts.json",
    //       cart,
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //           "x-shopify-storefront-access-token": token,
    //         },
    //       }
    //     )
    //     console.log(response)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
  }
  return {
    getCheckoutUrl,
  }
}

export default useGetCheckoutUrl
