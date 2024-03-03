import React, { useState } from "react"
import * as Style from "./FooterNewsLetter.module.scss"
import Input from "../UI/input/Input"
import CustomButton from "../UI/custom-button/CustomButton"
import axios from "axios"

const FooterNewsLetter = ({ btn, input }) => {
  const isBrowser = typeof window !== "undefined"
  const [email, setEmail] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setsuccessMessage] = useState(false)

  const inputHandler = event => {
    setEmail(event.target.value)
  }

  const clearErrorMessageHandler = () => {
    if (errorMessage) {
      setErrorMessage("")
    }
    if (successMessage) {
      setsuccessMessage(false)
    }
  }

  const handleSubscription = async event => {
    event.preventDefault()
    if (email && isBrowser) {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: "newsletter_signup",
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
        }
      )
      if (response.status === 201) {
        setEmail("")
      }
    } catch (error) {
      console.log(error)
    }
    setEmail("")
    setsuccessMessage(true)
  }

  return (
    <form onSubmit={handleSubscription} className={Style.footerNewsLatterForm}>
      <div className={Style.inputWrapper}>
        <Input
          id="footer_newsletter_input"
          inputHandler={inputHandler}
          focusHandler={clearErrorMessageHandler}
          style={Style.nlFooterInput}
          // type={input.type}
          inputValue={email}
          type="text"
          placeholder={input.placeholder}
        />
        <p className={Style.errorMessage}>{errorMessage}</p>
        {successMessage && <p className={Style.successMessage}>Success!</p>}
      </div>

      <CustomButton globalStyles={true} style={Style.nlFooterBtn}>
        {btn.title}
      </CustomButton>
    </form>
  )
}

export default FooterNewsLetter
