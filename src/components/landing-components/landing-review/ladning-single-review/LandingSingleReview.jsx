import React from "react"
import * as Style from "./LandingSingleReview.module.scss"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import {
  LandingStar,
  LandingStarMobile,
} from "../../../../assets/components/icons/Icons"

const LandingSingleReview = ({ data }) => {
  const title = data.title.data.title
  const image = data?.image?.localFile?.childImageSharp?.gatsbyImageData
  const text = data.reviewText.data.reviewText
  const name = data.reviewerName
  const score = data.score
  const ratingArrary = Array(Number(score)).fill(0)

  const rating = ratingArrary.map((item, index) => {
    return (
      <div className={Style.starWrapper} key={index}>
        <div className={Style.desktop}>
          <LandingStar />
        </div>
        <div className={Style.mobile}>
          <LandingStarMobile />
        </div>
      </div>
    )
  })

  return (
    <div className={Style.review}>
      <p className={Style.title}>{title}</p>
      {image && (
        <div className={Style.imageWrapper}>
          <GatsbyImage image={getImage(image)} alt="logo" />
        </div>
      )}
      <p className={Style.text}>{text}</p>
      <div className={Style.ratingWrapper}>{rating}</div>
      <p className={Style.name}>{name}</p>
    </div>
  )
}

export default LandingSingleReview
