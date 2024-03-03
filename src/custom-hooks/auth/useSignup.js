import { useReducer, useState } from "react"
import { createCustomer } from "../../context/subscribe"
import { navigate } from "gatsby"
import usePopUp from "../usePopUp"
import useStoreFrontError from "./useStoreFrontError"
import useGlobalLang from "../useGlobalLang"

const inputReducer = (state, action) => {
  if (action.type === "FIRSTNAME") {
    return {
      ...state,
      firstname: {
        value: action.value,
        valid:
          // action.value.match(/^[a-zA-Z \u{0400}-\u{04FF}\s]+$/u) &&
          action.value.match(
            /^[a-zA-Z\u00C4\u00E4\u00D6\u00F6\u00C5\u00E5\u0400-\u04FF\s]+$/u
          ) &&
          action.value.trim().length !== 0 &&
          action.value.length > 1 &&
          action.value.length < 20
            ? true
            : false,
      },
    }
  }

  if (action.type === "LASTNAME") {
    return {
      ...state,
      lastname: {
        value: action.value,
        valid:
          action.value.match(
            /^[a-zA-Z\u00C4\u00E4\u00D6\u00F6\u00C5\u00E5\u0400-\u04FF\s]+$/u
          ) &&
          action.value.trim().length !== 0 &&
          action.value.length > 1 &&
          action.value.length < 20
            ? true
            : false,
      },
    }
  }

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

  if (action.type === "CONFIRM") {
    return {
      ...state,
      confirm: {
        value: action.value,
        valid: action.value !== state.password.value ? false : true,
      },
    }
  }

  if (action.type === "AGREE") {
    return {
      ...state,
      agree: {
        valid: action.value,
      },
    }
  }

  return {
    firstname: {
      value: "",
      valid: false,
    },

    lastname: {
      value: "",
      valid: false,
    },

    email: {
      value: "",
      valid: false,
    },
    password: {
      value: "",
      valid: false,
    },
    confirm: {
      value: "",
      valid: false,
    },
    agree: {
      valid: false,
    },
  }
}

const useSingup = () => {
  const [inputState, dispatchInput] = useReducer(inputReducer, {
    firstname: {
      value: "",
      valid: false,
    },

    lastname: {
      value: "",
      valid: false,
    },

    email: {
      value: "",
      valid: false,
    },
    password: {
      value: "",
      valid: false,
    },
    confirm: {
      value: "",
      valid: false,
    },
    agree: {
      valid: false,
    },
  })
  const { GLOBAL_LANG } = useGlobalLang()
  const { setPopUp } = usePopUp()
  const { handleStoreFrontError } = useStoreFrontError()
  const [submit, setSubmit] = useState(false)
  const [loading, setLoading] = useState(false)

  const VALID_FORM =
    inputState.agree.valid &&
    inputState.confirm.valid &&
    inputState.email.valid &&
    inputState.firstname.valid &&
    inputState.lastname.valid &&
    inputState.password.valid

  const inputHandler = (mode, event) => {
    if (mode === "firstname") {
      dispatchInput({
        type: "FIRSTNAME",
        value: event.target.value,
      })
    } else if (mode === "lastname") {
      dispatchInput({
        type: "LASTNAME",
        value: event.target.value,
      })
    } else if (mode === "email") {
      dispatchInput({
        type: "EMAIL",
        value: event.target.value,
      })
    } else if (mode === "password") {
      dispatchInput({
        type: "PASSWORD",
        value: event.target.value,
      })
      dispatchInput({
        type: "CONFIRM",
        value: inputState.confirm.value,
      })
    } else if (mode === "confirm") {
      dispatchInput({
        type: "CONFIRM",
        value: event.target.value,
      })
    }
  }

  const checkBoxHandler = e => {
    dispatchInput({
      type: "AGREE",
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
    if (VALID_FORM) {
      const data = {
        firstname: inputState.firstname.value,
        lastname: inputState.lastname.value,
        email: inputState.email.value,
        password: inputState.password.value,
      }

      setLoading(true)
      createCustomer(data)
        .then(response => {
          const storeFrontError = handleStoreFrontError(
            "customerCreate",
            response
          )

          if (storeFrontError) {
            setPopUp(storeFrontError, false, null)
          }

          if (response?.data?.data?.customerCreate?.customer) {
            resetValidation()
            const url =
              GLOBAL_LANG === "en" ? "/en/account/login" : "/account/login"
            navigate(url)
          }
          setLoading(false)
        })
        .catch(error => {
          console.error("Error:", error)
          setLoading(false)
        })
    }
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
  }
}

export default useSingup
