import React from "react"
import * as Style from "./popup.module.scss"
import { getImage } from "gatsby-plugin-image"
import { GatsbyImage } from "gatsby-plugin-image"
import Markdown from "react-markdown"
import CustomButton from "../UI/custom-button/CustomButton"

const Popup = ({ data, togglePopup }) => {
  const overlayClickHandler = e => {
    let el = Array.from(e.target.classList)
    if (el.includes("popup_overlay_class")) togglePopup()
  }
  return (
    <div
      className={`${Style.popup_overlay} popup_overlay_class`}
      onClick={overlayClickHandler}
    >
      <div className={Style.popup_wrapper}>
        <div className={Style.image_wrapper}>
          <GatsbyImage
            image={getImage(
              data?.popup_image.localFile.childImageSharp.gatsbyImageData
            )}
            alt="popup-image"
          />
        </div>
        <div className={Style.heading}>
          <Markdown children={data?.heading.data.heading} />
        </div>
        <div className={Style.description}>
          <Markdown children={data?.subheading.data.subheading} />
        </div>
        <CustomButton
          style={Style.popup_button}
          buttonHandler={() => togglePopup()}
        >
          {data?.button.title}
        </CustomButton>
      </div>
    </div>
  )
}

export default Popup
