import React from "react"
import * as Style from "./bottle-section.module.scss"
import Markdown from "react-markdown"

const BottleSection = ({ data }) => {
  const textBlocks = data?.bottle_text?.map((el, index) => {
    return (
      <div
        key={index}
        className={`${Style.block} ${Style[`block_${index + 1}`]}`}
      >
        <div className={Style.number}>{index + 1}</div>
        <div className={Style.block_text}>
          <Markdown children={el.text.data.text} />
        </div>
      </div>
    )
  })
  const textBlocksMobile = data?.bottle_text?.map((el, index) => {
    return (
      <div
        key={index}
        className={`${Style.block} ${Style[`block_${index + 1}`]}`}
      >
        <span>{index + 1}. </span>
        <div className={Style.block_text}>
          <Markdown children={el.text.data.text} />
        </div>
      </div>
    )
  })
  const numbersMobile = data?.bottle_text?.map((el, index) => {
    return (
      <div
        key={index}
        className={`${Style.number_mobile} ${Style[`number_${index + 1}`]}`}
      >
        {index + 1}
      </div>
    )
  })
  return (
    <div
      className={Style.bottle_section}
      style={{ background: `${data?.background_color}` }}
    >
      <div className={Style.text_wrapper}>
        <div className={Style.heading}>
          <Markdown children={data?.heading.data.heading} />
        </div>
        <div className={Style.description}>
          <Markdown children={data?.description.data.description} />
        </div>
      </div>
      <div
        className={`${Style.image_wrapper} ${Style.desktop_section}`}
        style={{
          backgroundImage: `url(${data?.image_desktop.url})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {textBlocks}
      </div>
      <div
        className={`${Style.image_wrapper} ${Style.mobile_section}`}
        style={{
          backgroundImage: `url(${data?.image_mobile.localFile.url})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {textBlocksMobile}
        {numbersMobile}
      </div>
    </div>
  )
}

export default BottleSection
