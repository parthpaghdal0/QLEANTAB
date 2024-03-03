import React from "react"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import * as Style from "./LandingImageText.module.scss"
import Markdown from "react-markdown"

const LandingImageText = ({ data }) => {
  const content = data.imageAndText.map((item, index) => {
    return (
      <div className={Style.imageTextWrapper} key={index}>
        <div className={Style.imgWrapper}>
          <GatsbyImage
            image={getImage(
              item.image.localFile.childImageSharp.gatsbyImageData
            )}
            alt="product-image"
          />
        </div>
        <div className={Style.textWrapper}>
          <div className={Style.title}> {item.title}</div>
          <div className={Style.text}>
            <Markdown children={item.description.data.description} />
          </div>
        </div>
      </div>
    )
  })

  return (
    <section className={`${Style.wrapper} main-container`}>{content}</section>
  )
}

export default LandingImageText
