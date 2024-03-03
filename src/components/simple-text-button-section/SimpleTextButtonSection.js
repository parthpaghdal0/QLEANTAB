import React from "react"
import * as Style from "./simple-text-button.module.scss"
import Markdown from "react-markdown"
import CustomButton from "../UI/custom-button/CustomButton"
import { navigate } from "gatsby"

const SimpleTextButtonSection = ({ data, customClass, mode }) => {
  const buttonFn = () => {
    if (data?.button?.url) {
      navigate(data.button.url)
    }
  }

  return (
    <div
      className={`${Style.simple_text_button_section} ${
        customClass && Style.custom_styles
      } ${
        mode === "affiliatesAndContact"
          ? Style.simple_text_button_section_affiliatesAndContact
          : ""
      }`}
    >
      <div className={Style.heading}>
        <Markdown children={data?.heading.data.heading} />
      </div>
      <div className={Style.description}>
        <Markdown children={data?.description.data.description} />
      </div>
      <CustomButton
        style={`${Style.section_button}`}
        buttonHandler={buttonFn}
        globalStyles={true}
        cta={true}
      >
        {data?.button.title}
      </CustomButton>
    </div>
  )
}

export default SimpleTextButtonSection
