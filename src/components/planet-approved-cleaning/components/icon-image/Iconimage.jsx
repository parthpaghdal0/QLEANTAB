import React from "react"
import { StaticImage } from "gatsby-plugin-image"

const IconImage = ({ imgAlt }) => {
  let imageUrl = "../../../../assets/images/barabashki-img/cruelty-free.png"

  return (
    <>
      <StaticImage src={imageUrl} alt={imgAlt} layout="constrained" />
    </>
  )
}

export default IconImage
