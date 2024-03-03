import React, { useState, useEffect } from "react"
import axios from "axios"

const Newsletter = ({
  showName,
  labels,
  style,
  errorMessageStyle,
  togglePopup,
  mode,
}) => {
  const isBrowser = typeof window !== "undefined"
  const [email, setEmail] = useState(null)
  const [name, setName] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccesMessage] = useState(null)

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(null)
      }, 2500)
    }
  }, [errorMessage])

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        setSuccesMessage(null)
      }, 2500)
    }
  }, [successMessage])

  const handleSubscription = async () => {
    if (isBrowser && email) {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: "coming_soon_signup",
        email: email,
      })
    }
    if (!email) {
      setErrorMessage("Please fill inputs. Name and email are required!")
      return
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setErrorMessage("Please add a valid email")
      return
    }
    try {
      const response = await axios.post(
        "https://qleantab-strapi.herokuapp.com/api/shopifies/subscribe",
        {
          data: email,
          name:
            mode === "inff"
              ? name + " Influencer"
              : mode === "aff"
              ? name + " Affiliate"
              : name,
        }
      )
      if (response.status === 201) {
        if (togglePopup) togglePopup()
        setName("")
        setEmail("")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={`${style}`}>
      <div>
        {showName && labels && (
          <label htmlFor="name">
            {labels.name} <span>*</span>
          </label>
        )}
        {showName && (
          <input
            type="text"
            onChange={e => setName(e.target.value)}
            placeholder={labels?.placeholder_name}
            id="name"
            value={name == null ? "" : name}
          />
        )}
        {showName && labels && (
          <label htmlFor="email">
            {labels.email} <span>*</span>
          </label>
        )}
        <input
          type="email"
          onChange={e => setEmail(e.target.value)}
          placeholder={labels?.placeholder_email}
          id="email"
          value={email == null ? "" : email}
        />

        <button type="submit" onClick={handleSubscription}>
          {labels && labels.button}
        </button>
      </div>
      {errorMessage && (
        <div
          className={`newsletter-error ${
            errorMessageStyle && errorMessageStyle
          }`}
        >
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  )
}

export default Newsletter
