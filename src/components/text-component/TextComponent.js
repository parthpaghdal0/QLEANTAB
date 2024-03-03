import React from "react"
import Markdown from "react-markdown"
import * as Style from "./text-component.module.scss"

const TextComponent = ({ data, styles }) => {
  return (
    <div className={`${Style.text_component} ${styles}`}>
      {data?.heading && (
        <div className={Style.heading}>
          <Markdown children={data?.heading?.data.heading} />
        </div>
      )}
      {data?.description && (
        <div className={Style.description}>
          <Markdown children={data?.description?.data.description} />
        </div>
      )} 

      {data?.columns_in_description && (
        <div className={Style.description_columns}>
          <span className={Style.column}>
            <Markdown
              children={data?.description_column1?.data.description_column1}
            />
          </span>
          <span className={Style.column}>
            <Markdown
              children={data?.description_column2?.data.description_column2}
            />
          </span>
        </div>
      )}
      {data?.lists_description && (
        <div className={Style.lists_description}>
          <Markdown
            children={data?.lists_description?.data.lists_description}
          />
        </div>
      )}
    </div>
  )
}

export default TextComponent
