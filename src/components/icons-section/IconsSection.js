import React from "react"
import * as Style from "./icons-section.module.scss"
import { getImage } from "gatsby-plugin-image"
import { GatsbyImage } from "gatsby-plugin-image"
import Markdown from "react-markdown"

const IconsSection = ({ data }) => {
  const blocks = data?.map((el, index) => {
    return (
      <div className={Style.icon_block} key={index}>
        <div className={Style.icon_image}>
          <GatsbyImage
            image={getImage(
              el.icon_image.localFile.childImageSharp.gatsbyImageData
            )}
            alt="icon-image"
          />
        </div>
        <div className={Style.icon_text}>
          <Markdown children={el.heading.data.heading} />
        </div>
      </div>
    )
  })
  return <div className={Style.icons_section}>{blocks}</div>
}

export default IconsSection
