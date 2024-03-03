import { useReducer, useState, useContext } from "react"
import CheckoutContext from "../../context/CheckoutContext"
import usePopUp from "../usePopUp"
import {
  createCustomerAddress,
  updateCustomerDefultAddress,
  deleteCustomerDefultAddress,
  editCustomerAddress,
} from "../../context/subscribe"

const inputReducer = (state, action) => {
  if (action.type === "firstname") {
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

  if (action.type === "lastname") {
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

  if (action.type === "company") {
    return {
      ...state,
      company: {
        value: action.value,
      },
    }
  }

  if (action.type === "address") {
    return {
      ...state,
      address: {
        value: action.value,
        valid:
          action.value.trim().length !== 0 && action.value.length > 1
            ? true
            : false,
      },
    }
  }

  if (action.type === "address2") {
    return {
      ...state,
      address2: {
        value: action.value,
      },
    }
  }

  if (action.type === "city") {
    return {
      ...state,
      city: {
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

  if (action.type === "province") {
    return {
      ...state,
      province: {
        value: action.value,
      },
    }
  }

  if (action.type === "country") {
    return {
      ...state,
      country: {
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

  if (action.type === "postal") {
    return {
      ...state,
      postal: {
        value: action.value,
        valid:
          action.value.trim().length !== 0 &&
          action.value.length > 1 &&
          action.value.length < 20
            ? true
            : false,
      },
    }
  }

  if (action.type === "phone") {
    return {
      ...state,
      phone: {
        value: action.value,
        valid:
          // action.value.match(
          //   /^(?:(?:\+|00)33|\(00?33\)|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
          // ) &&
          (action.value.match(
            /^(?:(?:\+|00|\(00?\)?)33|\+359)\s*[1-9](?:[\s.-]*\d{2}){4}$/
          ) ||
            action.value.match(
              /^(?:(?:\+|00)33|\(00?33\)|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
            )) &&
          action.value.trim().length !== 0 &&
          action.value.length > 1 &&
          action.value.length < 20
            ? true
            : false,
      },
    }
  }

  if (action.type === "edit") {
    return {
      firstname: {
        value: action.value.firstname,
        valid:
          action.value.firstname.match(
            /^[a-zA-Z\u00C4\u00E4\u00D6\u00F6\u00C5\u00E5\u0400-\u04FF\s]+$/u
          ) &&
          action.value.firstname.trim().length !== 0 &&
          action.value.firstname.length > 1 &&
          action.value.firstname.length < 20
            ? true
            : false,
      },

      lastname: {
        value: action.value.lastname,
        valid:
          action.value.lastname.match(
            /^[a-zA-Z\u00C4\u00E4\u00D6\u00F6\u00C5\u00E5\u0400-\u04FF\s]+$/u
          ) &&
          action.value.lastname.trim().length !== 0 &&
          action.value.lastname.length > 1 &&
          action.value.lastname.length < 20
            ? true
            : false,
      },

      company: {
        value: action.value.company,
      },

      address: {
        value: action.value.address,
        valid:
          action.value.address.trim().length !== 0 &&
          action.value.address.length > 1
            ? true
            : false,
      },

      address2: {
        value: action.value.address2,
      },

      city: {
        value: action.value.city,
        valid:
          action.value.city.match(
            /^[a-zA-Z\u00C4\u00E4\u00D6\u00F6\u00C5\u00E5\u0400-\u04FF\s]+$/u
          ) &&
          action.value.city.trim().length !== 0 &&
          action.value.city.length > 1 &&
          action.value.city.length < 20
            ? true
            : false,
      },

      province: {
        value: action.value.province,
      },

      country: {
        value: action.value.country,
        valid:
          action.value.country.match(
            /^[a-zA-Z\u00C4\u00E4\u00D6\u00F6\u00C5\u00E5\u0400-\u04FF\s]+$/u
          ) &&
          action.value.country.trim().length !== 0 &&
          action.value.country.length > 1 &&
          action.value.country.length < 20
            ? true
            : false,
      },

      postal: {
        value: action.value.postal,
        valid:
          action.value.postal.trim().length !== 0 &&
          action.value.postal.length > 1 &&
          action.value.postal.length < 20
            ? true
            : false,
      },

      phone: {
        value: action.value.phone,
        valid:
          (action.value.phone.match(
            /^(?:(?:\+|00|\(00?\)?)33|\+359)\s*[1-9](?:[\s.-]*\d{2}){4}$/
          ) ||
            action.value.phone.match(
              /^(?:(?:\+|00)33|\(00?33\)|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
            )) &&
          action.value.phone.trim().length !== 0 &&
          action.value.phone.length > 1 &&
          action.value.phone.length < 20
            ? true
            : false,
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

    company: {
      value: "",
    },

    address: {
      value: "",
      valid: false,
    },

    address2: {
      value: "",
    },

    city: {
      value: "",
      valid: false,
    },

    province: {
      value: "",
    },

    country: {
      value: "",
      valid: false,
    },

    postal: {
      value: "",
      valid: false,
    },

    phone: {
      value: "",
      valid: false,
    },
  }
}

const useAddress = () => {
  const [inputState, dispatchInput] = useReducer(inputReducer, {
    firstname: {
      value: "",
      valid: false,
    },

    lastname: {
      value: "",
      valid: false,
    },

    company: {
      value: "",
    },

    address: {
      value: "",
      valid: false,
    },

    address2: {
      value: "",
    },

    city: {
      value: "",
      valid: false,
    },

    province: {
      value: "",
    },

    country: {
      value: "",
      valid: false,
    },

    postal: {
      value: "",
      valid: false,
    },

    phone: {
      value: "",
      valid: false,
    },
  })
  const isBrowser = typeof window !== "undefined"
  const { customerToken, refreshCustomer, customerData } =
    useContext(CheckoutContext)
  const { setPopUp } = usePopUp()
  const [submit, setSubmit] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  const VALID_FORM =
    inputState.firstname.valid &&
    inputState.lastname.valid &&
    inputState.address.valid &&
    inputState.city.valid &&
    inputState.country.valid &&
    inputState.postal.valid &&
    inputState.phone.valid

  const inputHandler = (name, event) => {
    dispatchInput({
      type: name,
      value: event.target.value,
    })
  }

  const resetValidation = () => {
    dispatchInput({
      type: "RESET",
    })
    setSubmit(false)
    setShowForm(false)
    setEditingId(null)
  }

  const submitHandler = async e => {
    e.preventDefault()

    setSubmit(true)
    if (VALID_FORM) {
      setLoading(true)
      const data = {
        firstname: inputState.firstname.value,
        lastname: inputState.lastname.value,
        company: inputState.company.value,
        address: inputState.address.value,
        address2: inputState.address2.value,
        city: inputState.city.value,
        province: inputState.province.value,
        country: inputState.country.value,
        postal: inputState.postal.value,
        phone: inputState.phone.value,
      }

      if (!editingId) {
        try {
          const addAddres = await createCustomerAddress(data, customerToken)

          const error =
            addAddres?.data?.data?.customerAddressCreate?.customerUserErrors[0]

          if (error) {
            setPopUp(error.message, false, null)
            return
          }

          const adressId =
            addAddres?.data?.data?.customerAddressCreate?.customerAddress?.id
          if (adressId) {
            const setDefultAdress = await updateCustomerDefultAddress(
              adressId,
              customerToken
            )
            resetValidation()
            refreshCustomer(customerToken)
          }
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      } else {
        try {
          const editResponse = await editCustomerAddress(
            data,
            customerToken,
            editingId
          )

          if (editResponse) {
            resetValidation()
            refreshCustomer(customerToken)
          }
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }
    }
  }

  const makeDefultHandler = async id => {
    setLoading(true)
    try {
      const setDefultAdress = await updateCustomerDefultAddress(
        id,
        customerToken
      )

      if (setDefultAdress) {
        refreshCustomer(customerToken)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)

      if (isBrowser) {
        const defultItem = document.getElementById("defultAddress")
        defultItem.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        })
      }
    }
  }

  const deleteAddressHandler = async id => {
    setLoading(true)
    try {
      const deleteResponse = await deleteCustomerDefultAddress(
        id,
        customerToken
      )
      if (deleteResponse) {
        refreshCustomer(customerToken)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const editHandler = async (data, id) => {
    //action.type action.value

    // dispatchInput({
    //   type: name,
    //   value: event.target.value,
    // })

    dispatchInput({
      type: "edit",
      value: {
        firstname: data.firstName ? data.firstName : "",
        lastname: data.lastName ? data.lastName : "",
        company: data.company ? data.company : "",
        address: data.address1 ? data.address1 : "",
        address2: data.address2 ? data.address2 : "",
        city: data.city ? data.city : "",
        province: data.province ? data.province : "",
        country: data.country ? data.country : "",
        postal: data.zip ? data.zip : "",
        phone: data.phone ? data.phone : "",
      },
    })
    setEditingId(id)
    setShowForm(true)
  }

  return {
    inputHandler,
    setSubmit,
    resetValidation,
    inputState: inputState,
    submit: submit,
    submitHandler,
    loading: loading,
    showForm,
    setShowForm,
    customerData,
    resetValidation,
    makeDefultHandler,
    deleteAddressHandler,
    editHandler,
  }
}

export default useAddress
