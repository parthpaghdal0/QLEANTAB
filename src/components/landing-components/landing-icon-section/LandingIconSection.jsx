import React from "react"
import * as Style from "./LandingIconSection.module.scss"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

const LandingIconSection = ({ data }) => {
  const heading = data.heading
  const icons = data.icon.map((item, index) => {
    return (
      <div className={Style.singleIconWrapper} key={index}>
        <GatsbyImage
          image={getImage(item.localFile.childImageSharp.gatsbyImageData)}
          alt="icon"
        />
      </div>
    )
  })

  return (
    <section className={`main-container ${Style.wrapper}`}>
      <h3 className={Style.heading}>{heading}</h3>
      <div className={Style.iconScrollWrapper}>
        <div className={Style.iconWrapper}>{icons}</div>
      </div>
    </section>
  )
}

export default LandingIconSection
