import React from "react"
import Markdown from "react-markdown"
import * as Style from "./simple-text-section.module.scss"

const SimpleTextSection = ({ data }) => {
  return (
    <div className={Style.simple_text_section}>
      <div className={Style.heading}>
        <Markdown children={data?.heading.data.heading} />
      </div>
      <div className={Style.description}>
        <Markdown children={data?.description.data.description} />
      </div>
    </div>
  )
}

export default SimpleTextSection
