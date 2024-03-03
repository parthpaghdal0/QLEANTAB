import React from "react"
import * as Style from "./LandingFooter.module.scss"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

const LandingFooter = ({ data }) => {
  const footerLogo = data.footerLogo.localFile.childImageSharp.gatsbyImageData

  return (
    <section className={`landing-main-container ${Style.footerWrapper}`}>
      <div className={Style.logo}>
        <GatsbyImage image={getImage(footerLogo)} alt="footer-logo" />
      </div>
    </section>
  )
}

export default LandingFooter
