import React from "react"
import * as Style from "./template1.module.scss"
import Markdown from "react-markdown"

const Template1 = ({ data }) => {
  return (
    <div className={Style.article_content1}>
      <h1>{data?.Title}</h1>
      <div className={Style.article_about}>
        <span>{data?.Date}, </span>
        <span>{data?.Author}</span>
      </div>
      {data?.text_content_1 && (
        <div className={Style.article_paragraph1}>
          <Markdown children={data?.text_content_1?.data?.text_content_1} />
        </div>
      )}

      {data?.text_content_2 && (
        <div className={Style.article_paragraph2}>
          <Markdown children={data?.text_content_2?.data?.text_content_2} />
        </div>
      )}
    </div>
  )
}

export default Template1
