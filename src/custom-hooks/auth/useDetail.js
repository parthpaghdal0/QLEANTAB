import { useReducer, useState, useContext, useEffect } from "react"
import CheckoutContext from "../../context/CheckoutContext"
import { navigate } from "gatsby"
import usePopUp from "../usePopUp"
import {
  updateCustomerPassword,
  createCustomerToken,
  getCustomerEmail,
  updateCustomerName,
} from "../../context/subscribe"
import useGlobalLang from "../useGlobalLang"

const inputReducer = (state, action) => {
  if (action.type === "FIRSTNAME") {
    return {
      ...state,
      firstname: {
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

  if (action.type === "OLDPASSWORD") {
    return {
      ...state,
      oldpass: {
        value: action.value,
        valid: action.value.length < 6 ? false : true,
      },
    }
  }

  if (action.type === "NEWPASSWORD") {
    return {
      ...state,
      newpass: {
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
        valid: action.value.toUpperCase() === "CONFIRM",
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
    oldpass: {
      value: "",
      valid: false,
    },
    newpass: {
      value: "",
      valid: false,
    },
    confirm: {
      value: "",
      valid: false,
    },
  }
}

const useDetail = mode => {
  const [inputState, dispatchInput] = useReducer(inputReducer, {
    firstname: {
      value: "",
      valid: false,
    },

    lastname: {
      value: "",
      valid: false,
    },
    oldpass: {
      value: "",
      valid: false,
    },
    newpass: {
      value: "",
      valid: false,
    },
    confirm: {
      value: "",
      valid: false,
    },
  })
  const { GLOBAL_LANG } = useGlobalLang()
  const {
    customerData,
    customerToken,
    setCustomeroken,
    setCustomerData,
    logOutHandler,
  } = useContext(CheckoutContext)
  const { setPopUp } = usePopUp()

  const [submit, setSubmit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [userTokenConformation, setuserTokenConformation] = useState(false)

  useEffect(() => {
    if (
      customerData &&
      !inputState.firstname.value &&
      !inputState.lastname.value
    ) {
      dispatchInput({
        type: "FIRSTNAME",
        value: customerData.firstName,
      })

      dispatchInput({
        type: "LASTNAME",
        value: customerData.lastName,
      })
    }
  }, [customerData])

  let VALID_FORM = "default"
  if (mode === "change-name") {
    VALID_FORM = inputState.firstname.valid && inputState.lastname.valid
  }
  if (mode === "change-password") {
    VALID_FORM = inputState.oldpass.valid && inputState.newpass.valid
  }
  if (mode === "delete-account") {
    VALID_FORM = inputState.confirm.valid
  }

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
    } else if (mode === "oldpass") {
      dispatchInput({
        type: "OLDPASSWORD",
        value: event.target.value,
      })
    } else if (mode === "newpass") {
      dispatchInput({
        type: "NEWPASSWORD",
        value: event.target.value,
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
    setuserTokenConformation(false)
  }

  const checkTokenHandler = () => {
    if (customerData) {
      setLoading(true)
      createCustomerToken({
        email: customerData.email,
        password: inputState.oldpass.value,
      }).then(response => {
        if (
          response?.data?.data?.customerAccessTokenCreate?.customerUserErrors
            .length > 0
        ) {
          setLoading(false)
          setPopUp(
            response.data.data.customerAccessTokenCreate.customerUserErrors[0]
              .message,
            false
          )
        } else {
          const token =
            response.data.data.customerAccessTokenCreate.customerAccessToken
              .accessToken

          if (token) {
            getCustomerEmail(token).then(response => {
              if (response.data.data.customer.email === customerData.email) {
                setCustomeroken(token)
                setCustomerData(null)
                const userToken = localStorage.getItem("customerToken")
                if (userToken) {
                  localStorage.removeItem("customerToken", token)
                }

                setuserTokenConformation(true)
              } else {
                setLoading(false)
                setPopUp("Invalid user", true, null)
              }
            })
          }
        }
      })
    }
  }

  useEffect(() => {
    if (userTokenConformation) {
      updateCustomerPassword(inputState.newpass.value, customerToken).then(
        response => {
          if (response) {
            resetValidation()
            setLoading(false)
            const url =
              GLOBAL_LANG === "en" ? "/en/account/login" : "/account/login"
            setPopUp("Password Changed", false, navigate.bind(this, url))
          }
        }
      )
    }
  }, [userTokenConformation])

  const changeNameHandler = () => {
    updateCustomerName(
      inputState.firstname.value,
      inputState.lastname.value,
      customerToken
    ).then(result => {
      setCustomerData(result.data.data.customerUpdate.customer)
      setPopUp("Name Changed", false, null)
      resetValidation()
    })
  }

  const changePassHandler = async () => {
    checkTokenHandler()
  }

  const deleteAccHandler = (id, email) => {
    const formdata = new FormData()
    formdata.append("customerId", id)
    formdata.append("customerEmail", email)
    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    }
    fetch(
      `https://qleantab-strapi.herokuapp.com/api/deleteCustomer`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        if (result === 200) {
          setShowModal(false)
          setPopUp("Account Deleted ", false, logOutHandler)
          setTimeout(() => {
            logOutHandler()
          }, 10000)
        } else {
          setPopUp(result, false, null)
        }
      })
      .catch(error => console.log("error", error))
  }

  const submitHandler = e => {
    e.preventDefault()
    setSubmit(true)
    if (mode === "change-name" && VALID_FORM) {
      changeNameHandler()
    }
    if (mode === "change-password" && VALID_FORM) {
      changePassHandler()
    }
    if (mode === "delete-account" && VALID_FORM) {
      if (customerData && customerToken) {
        deleteAccHandler(customerData.id.split("/").pop(), customerData.email)
      }
    }
  }

  //miscellaneous
  const navgateForgottenPassword = () => {
    if (customerData) {
      navigate(
        `${GLOBAL_LANG === "en" ? "/en" : ""}/account/login?name=${
          customerData.firstName
        }`
      )
    }
  }

  return {
    inputHandler,
    setSubmit,
    inputState: inputState,
    submit: submit,
    submitHandler,
    loading: loading,
    showModal: showModal,
    setShowModal,
    navgateForgottenPassword,
  }
}

export default useDetail
