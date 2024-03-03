import React from "react"
import * as Style from "./LandingAskQuestion.module.scss"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import Button from "../../../UI/custom-button/CustomButton"
import { navigate } from "gatsby"

const LandingAskQuestion = ({ data }) => {
  const image = data.icon.localFile.childImageSharp.gatsbyImageData
  const text = data.text
  const btnTitle = data.btnTitle
  const url = data.btnUrl

  return (
    <div className={Style.questionWrapper}>
      <div className={Style.iconTextWrapper}>
        <div className={Style.iconWrapper}>
          <GatsbyImage image={getImage(image)} alt="product-image" />
        </div>
        <p className={Style.text}>{text}</p>
      </div>
      <Button
        buttonHandler={navigate.bind(this, url)}
        style={Style.questionBtn}
      >
        {btnTitle}
      </Button>
    </div>
  )
}

export default LandingAskQuestion
