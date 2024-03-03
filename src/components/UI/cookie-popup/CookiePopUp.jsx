import React, { useEffect } from "react"
import Button from "../custom-button/CustomButton"
import useCookie from "../../../custom-hooks/use-cookie"
import * as Style from "./CookiePopUp.module.scss"
import Markdown from "react-markdown"

const CookiePopUp = ({ data }) => {
  const { getCookie, setCookie, hasCookie } = useCookie(
    "Agree to other cookies",
    true
  )

  useEffect(() => {
    getCookie()
  }, [])

  return (
    <>
      {!hasCookie && (
        <div className={Style.wrapper}>
          <Markdown children={data.text.data.text} />
          <Button
            buttonHandler={setCookie.bind(null, true)}
            globalStyles={true}
            style={Style.btn}
          >
            {data.cookieButton[0].title}
          </Button>
        </div>
      )}
    </>
  )
}

export default CookiePopUp
