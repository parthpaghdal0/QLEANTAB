import React, { useContext } from "react"
import * as Style from "./AskAnything.module.scss"
import CustomButton from "../UI/custom-button/CustomButton"
import { StaticImage } from "gatsby-plugin-image"
import { navigate } from "gatsby"
import ProductContext from "../../context/ProductContext"
import useGlobalLang from "../../custom-hooks/useGlobalLang"
const isBrowser = typeof window !== "undefined"

const AskAnything = ({ mode, productName }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  const { strapiHelperText } = useContext(ProductContext)
  const navigatehandler = () => {
    const url = GLOBAL_LANG === "en" ? "/en/faq" : "/faq"
    navigate(url)
    if (isBrowser) {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: "ask_anything_click",
        product_name: productName,
      })
    }
  }

  return (
    <div
      className={`${Style.questionsWrapper} ${
        mode === "mobile" ? Style.hideMobile : Style.hideDesktop
      }`}
    >
      <div className={Style.imgWrapper}>
        <StaticImage
          src="../../assets/images/temp-img/tabFace.png"
          alt="questions-icon"
        />
      </div>
      <p className={Style.paragraph_text}>{strapiHelperText?.Questions}?</p>
      <CustomButton buttonHandler={navigatehandler} style={Style.questionBtn}>
        <p className={Style.longTextDesktop}>
          {strapiHelperText?.AskUsAnything}
        </p>
        <p className={Style.shortTextDesktop}>{strapiHelperText?.AskUs}</p>
      </CustomButton>
    </div>
  )
}

export default AskAnything
