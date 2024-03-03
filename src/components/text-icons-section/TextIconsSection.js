import React from "react"
import { getImage } from "gatsby-plugin-image"
import { GatsbyImage } from "gatsby-plugin-image"
import * as Style from "./text-icons-section.module.scss"
import Markdown from "react-markdown"

const TextIconsSection = ({ data }) => {
  const icons = data?.icon.map((el, index) => {
    return (
      <div className={Style.icon_wrapper} key={index}>
        <div className={Style.icon}>
          {el.icon_image && (
            <GatsbyImage
              image={getImage(
                el.icon_image.localFile.childImageSharp.gatsbyImageData
              )}
              alt="product-image"
            />
          )}
        </div>
        <div className={Style.icon_text}>
          <Markdown children={el.description.data.description} />
        </div>
      </div>
    )
  })
  return (
    <div className={Style.text_icons_section}>
      <div className={Style.text_wrapper}>
        <div className={Style.heading1}>
          <Markdown children={data?.heading.data.heading} />
        </div>
        <div className={Style.description1}>
          <Markdown children={data?.description.data.description} />
        </div>
        <div className={Style.heading2}>
          <Markdown children={data?.heading2.data.heading2} />
        </div>
        <div className={Style.description2}>
          <Markdown children={data?.description2.data.description2} />
        </div>
      </div>
      <div className={Style.icons_wrapper}>{icons}</div>
    </div>
  )
}

export default TextIconsSection
