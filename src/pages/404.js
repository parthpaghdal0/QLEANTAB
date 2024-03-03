import React from "react"
import { navigate } from "gatsby"
import { HeaderDesktopLogo } from "../assets/components/icons/Icons"
import TabImage from "../assets/tablet-green-face4.png"
import * as Style from "./404.module.scss"
import CustomButton from "../components/UI/custom-button/CustomButton"
import { graphql } from "gatsby"
export const query = graphql`
  {
    strapiHelperText {
      GoHome
      PageNotFound
    }
  }
`
const ErrorPage = ({ data }) => {
  return (
    <div className={Style.error_page}>
      {/* <HeaderDesktopLogo /> */}
      <div className={Style.image_wrapper}>
        <img src={TabImage} alt="tablet-image" />
      </div>
      <div>
        <h1>404</h1>
        <h2> {data?.strapiHelperText?.PageNotFound || "Page not found"}</h2>
        <CustomButton
          style={`${Style.home_btn}`}
          buttonHandler={() => navigate("/")}
          globalStyles={true}
          cta={true}
        >
          {data?.strapiHelperText?.GoHome || "Go home"}
        </CustomButton>
      </div>
    </div>
  )
}

export default ErrorPage
