import { useReducer, useState, useContext, useEffect } from "react"
// import CheckoutContext from "../../context/CheckoutContext"
import { navigate } from "gatsby"
import usePopUp from "../usePopUp"

const inputReducer = (state, action) => {
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
    confirm: {
      value: "",
      valid: false,
    },
  }
}

const useSub = (customerData, setSubscriptionList) => {
  const [inputState, dispatchInput] = useReducer(inputReducer, {
    confirm: {
      value: "",
      valid: false,
    },
  })

  // const { customerData, setSubscriptionList } = useContext(CheckoutContext)

  const { setPopUp } = usePopUp()
  const [submit, setSubmit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const VALID_FORM = inputState.confirm.valid

  const inputHandler = (mode, event) => {
    dispatchInput({
      type: "CONFIRM",
      value: event.target.value,
    })
  }

  const resetValidation = () => {
    setShowModal(false)
    dispatchInput({
      type: "RESET",
    })
    setSubmit(false)
  }

  const fetchSubscriptions = async () => {
    if (customerData) {
      setLoading(true)
      try {
        const response = await fetch("/api/getRechargeCustomer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: customerData.email,
          }),
        })

        const data = await response.json()
        let customerId
        if (data.data.customers.length !== 0) {
          customerId = data.data.customers[0].id
        } else {
          return
        }

        const ordersResponse = await fetch("/api/getRechargeOrders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerId: customerId,
          }),
        })

        const subscriptionsResponse = await ordersResponse.json()
        const subList = subscriptionsResponse.data.subs.subscriptions
        setSubscriptionList(subList)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
  }

  const submitHandler = async (subId, e) => {
    e.preventDefault()
    setSubmit(true)

    if (VALID_FORM) {
      try {
        const response = await fetch("/api/deleteSub", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subId: subId,
          }),
        })

        const data = await response.json()
      } catch (error) {
        console.log(error)
      } finally {
        resetValidation()
        setLoading(false)
        fetchSubscriptions()
      }
    } else {
      console.log("invalid")
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
    fetchSubscriptions,
  }
}

export default useSub
