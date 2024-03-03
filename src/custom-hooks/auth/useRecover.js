import { useReducer, useState } from "react"
import { changeRecoverdPassword, activateUser } from "../../context/subscribe"
import { navigate } from "gatsby"
import useStoreFrontError from "./useStoreFrontError"
import usePopUp from "../usePopUp"
import useGlobalLang from "../useGlobalLang"

const inputReducer = (state, action) => {
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

  return {
    password: {
      value: "",
      valid: false,
    },
    confirm: {
      value: "",
      valid: false,
    },
  }
}

const useRecover = (url, mode) => {
  const [inputState, dispatchInput] = useReducer(inputReducer, {
    password: {
      value: "",
      valid: false,
    },
    confirm: {
      value: "",
      valid: false,
    },
  })
  const { GLOBAL_LANG } = useGlobalLang()
  const { handleStoreFrontError } = useStoreFrontError()
  const { setPopUp } = usePopUp()
  const [submit, setSubmit] = useState(false)
  const [loading, setLoading] = useState(false)

  const VALID_FORM = inputState.confirm.valid && inputState.password.valid

  const inputHandler = (mode, event) => {
    if (mode === "password") {
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

  const resetValidation = () => {
    dispatchInput({
      type: "RESET",
    })
    setSubmit(false)
  }

  const submitHandler = e => {
    e.preventDefault()

    setSubmit(true)

    if (VALID_FORM && url) {
      setLoading(true)
      const data = {
        password: inputState.password.value,
      }

      if (mode === "resetUrl") {
        changeRecoverdPassword(data.password, url).then(res => {
          const storeFrontError = handleStoreFrontError(
            "customerResetByUrl",
            res
          )

          if (storeFrontError) {
            setPopUp(storeFrontError, false, null)
            setLoading(false)
            return
          } else {
            resetValidation()
            setLoading(false)

            const url =
              GLOBAL_LANG === "en" ? "/en/account/login" : "/account/login"
            navigate(url)
          }
        })
      } else if (mode === "activationUrl") {
        activateUser(data.password, url).then(res => {
          const storeFrontError = handleStoreFrontError(
            "customerActivateByUrl",
            res
          )

          if (storeFrontError) {
            setPopUp(storeFrontError, false, null)
            setLoading(false)
            return
          } else {
            resetValidation()
            setLoading(false)
            const url =
              GLOBAL_LANG === "en" ? "/en/account/login" : "/account/login"
            navigate(url)
          }
        })
      }
    }
  }

  return {
    inputHandler,
    setSubmit,
    resetValidation,
    inputState: inputState,
    submit: submit,
    submitHandler,
    loading: loading,
  }
}

export default useRecover
