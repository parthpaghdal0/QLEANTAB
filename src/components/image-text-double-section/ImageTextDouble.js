import React from "react"
import * as Style from "./image-text-double.module.scss"
import { getImage } from "gatsby-plugin-image"
import { GatsbyImage } from "gatsby-plugin-image"
import Markdown from "react-markdown"
import CustomButton from "../UI/custom-button/CustomButton"

const ImageTextDouble = ({ data, customClass }) => {
  const isBrowser = typeof window !== "undefined"
  const scrollHandler = () => {
    if (isBrowser) {
      const input = document.querySelector("#footer_newsletter_input")
      input.focus()
    }
  }
  return (
    <div
      className={`${Style.image_text_double_section} ${
        data.columns_reverse && Style.reverse_columns
      } ${customClass && Style.custom_class}`}
      style={{ background: `${data?.background_color}` }}
    >
      <div className={Style.text_wrapper}>
        <div className={Style.heading}>
          <Markdown children={data?.heading?.data.heading} />
        </div>
        <div className={Style.description}>
          <Markdown children={data?.description?.data.description} />
        </div>

        {data?.button && (
          <CustomButton
            buttonHandler={scrollHandler}
            style={`${Style.image_text_double_btn}`}
            globalStyles={true}
            cta={true}
          >
            {data?.button?.title}
          </CustomButton>
        )}
      </div>
      <div className={Style.image_wrapper}>
        <GatsbyImage
          image={getImage(
            data?.image?.localFile?.childImageSharp?.gatsbyImageData
          )}
          alt="image"
        />
      </div>
    </div>
  )
}

export default ImageTextDouble
