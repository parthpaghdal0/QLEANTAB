import React, { useEffect, useContext } from "react"
import useUserSession from "./useUserSession"
import CheckoutContext from "../../context/CheckoutContext"
import { navigate } from "gatsby"
import useGlobalLang from "../useGlobalLang"

const useRedirect = () => {
  const { customerData } = useContext(CheckoutContext)
  const { getUserSession } = useUserSession()
  const { GLOBAL_LANG } = useGlobalLang()

  const navigateAway = () => {
    const session = getUserSession()
    if (!session) {
      const url = GLOBAL_LANG === "en" ? "/en/account/login" : "/account/login"
      navigate(url)
    }
  }

  useEffect(() => {
    navigateAway()
  }, [])

  return {
    customerData: customerData,
  }
}

export default useRedirect
