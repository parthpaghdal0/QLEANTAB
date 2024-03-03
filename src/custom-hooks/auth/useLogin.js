import { useReducer, useState, useContext } from "react"
import {
  createCustomerToken,
  retriveCustomer,
  recoverPassword,
} from "../../context/subscribe"
import CheckoutContext from "../../context/CheckoutContext"
import usePopUp from "../usePopUp"
import { navigate } from "gatsby"
import useStoreFrontError from "./useStoreFrontError"
import useUserSession from "./useUserSession"
import useGlobalLang from "../useGlobalLang"

const inputReducer = (state, action) => {
  if (action.type === "EMAIL") {
    return {
      ...state,
      email: {
        value: action.value,
        valid:
          action.value.match(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ) && action.value.trim().length !== 0
            ? true
            : false,
      },
    }
  }

  if (action.type === "PASSWORD") {
    return {
      ...state,
      password: {
        value: action.value,
        valid: action.value.length < 6 ? false : true,
      },
    }
  }

  if (action.type === "STAYLOGGED") {
    return {
      ...state,
      staylogged: {
        valid: action.value,
      },
    }
  }

  return {
    email: {
      value: "",
      valid: false,
    },
    password: {
      value: "",
      valid: false,
    },

    staylogged: {
      // valid: false,
      valid: true,
    },
  }
}

const useLogin = () => {
  const [inputState, dispatchInput] = useReducer(inputReducer, {
    email: {
      value: "",
      valid: false,
    },
    password: {
      value: "",
      valid: false,
    },

    staylogged: {
      // valid: false,
      valid: true,
    },
  })

  const { GLOBAL_LANG } = useGlobalLang()

  const { setCustomerHandler, setCustomerData } = useContext(CheckoutContext)
  const { setPopUp } = usePopUp()
  const { handleStoreFrontError } = useStoreFrontError()
  const { createUserSession } = useUserSession()

  const [submit, setSubmit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [recovery, setRecovery] = useState(false)

  const VALID_FORM = inputState.email.valid && inputState.password.valid
  const VALID_RECOVERY = inputState.email.valid

  const inputHandler = (mode, event) => {
    if (mode === "email") {
      dispatchInput({
        type: "EMAIL",
        value: event.target.value,
      })
    } else if (mode === "password") {
      dispatchInput({
        type: "PASSWORD",
        value: event.target.value,
      })
    } else if (mode === "staylogged") {
      dispatchInput({
        type: "STAYLOGGED",
        value: event.target.value,
      })
    }
  }

  const checkBoxHandler = e => {
    dispatchInput({
      type: "STAYLOGGED",
      value: e.target.checked ? true : false,
    })
  }

  const resetValidation = () => {
    dispatchInput({
      type: "RESET",
    })
    setSubmit(false)
  }

  const submitHandler = e => {
    e.preventDefault()
    setSubmit(true)

    if (!recovery) {
      loginSubmitHandler()
    } else {
      recoverySubmitHandler()
    }
  }

  const loginSubmitHandler = () => {
    if (VALID_FORM) {
      const data = {
        email: inputState.email.value,
        password: inputState.password.value,
      }

      setLoading(true)

      createCustomerToken(data)
        .then(response => {
          const storeFrontError = handleStoreFrontError(
            "customerAccessTokenCreate",
            response
          )

          if (storeFrontError) {
            setPopUp(
              storeFrontError === "Unidentified customer"
                ? "Wrong email or password"
                : storeFrontError,
              false,
              null
            )
            setLoading(false)
            return
          }

          return setCustomerHandler(
            response?.data?.data?.customerAccessTokenCreate?.customerAccessToken
              ?.accessToken,
            inputState.staylogged.valid
          )
        })
        .then(token => {
          if (token) {
            return retriveCustomer(token)
          }
        })
        .then(response => {
          if (response) {
            createUserSession()
            setCustomerData(response.data.data.customer)
            resetValidation()
            setLoading(false)
            const url =
              GLOBAL_LANG === "en" ? "/en/account/detail" : "/account/detail"
            navigate(url)
          }
        })
        .catch(error => {
          console.error("Error:", error)
          setLoading(false)
        })
    }
  }

  const recoverySubmitHandler = () => {
    if (VALID_RECOVERY) {
      setLoading(true)
      recoverPassword(inputState.email.value)
        .then(response => {
          console.log(response)
        })
        .finally(() => {
          resetValidation()
          setLoading(false)
          setPopUp("Reset email send", false, null)
        })
    }
  }

  const navigateRecoveryHandler = e => {
    e.preventDefault()
    resetValidation()
    setRecovery(!recovery)
  }

  return {
    inputHandler,
    setSubmit,
    resetValidation,
    checkBoxHandler,
    inputState: inputState,
    submit: submit,
    submitHandler,
    checkBoxHandler,
    loading: loading,
    navigateRecoveryHandler,
    recovery: recovery,
    setRecovery,
  }
}

export default useLogin
