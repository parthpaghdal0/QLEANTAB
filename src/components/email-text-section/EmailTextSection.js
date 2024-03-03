import React from "react"
import * as Style from "./email-text.module.scss"
import {
  WhiteDropAffiliates,
  WhiteDropAffiliates2,
} from "../../assets/components/icons/Icons"
import Markdown from "react-markdown"

const EmailTextSection = ({ data }) => {
  return (
    <div
      className={Style.email_text_section}
      style={{
        backgroundColor: `${data?.background_color}`,
      }}
    >
      <div className={Style.heading}>
        <Markdown children={data?.heading.data.heading} />
      </div>
      <div
        className={`${Style.description} ${
          data?.decoration_left && Style.color_green
        }`}
      >
        <a href={`mailto:${data?.description.data.description}`}>
          <Markdown children={data?.description.data.description} />
        </a>
      </div>
      {data?.decoration_left ? (
        <div className={Style.drop_left}>
          <WhiteDropAffiliates />
        </div>
      ) : (
        <div className={Style.drop_right}>
          <WhiteDropAffiliates2 />
        </div>
      )}
    </div>
  )
}

export default EmailTextSection
