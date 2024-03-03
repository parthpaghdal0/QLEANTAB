import React from "react"
import * as Style from "./yotpo-product-summary.module.scss"
import Slider from "./Slider"
import {
  StarIconYotpo,
  EmptyStarIcon,
} from "../../../assets/components/icons/Icons"
import useRating from "../../../custom-hooks/useRating"

const YotpoProductSummary = ({ productid }) => {
  const {
    productReviews,
    reviewScore,
    starData,
    reviewsCount,
    scrollHandler,
    yotpoReviewsText,
  } = useRating(productid)

  const totalScore =
    productReviews.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.score
    }, 0) / productReviews.length

  return (
    <div onClick={scrollHandler} className={Style.ratings_right_container}>
      <div className={Style.reviewTitleWrapper}>
        <div
          className={Style.reviewsTitle}
        >{`${reviewsCount} ${yotpoReviewsText[0].text}`}</div>
        <div className={Style.reviewsTitle}>{`${
          Number(totalScore) % 1 === 0
            ? Number(totalScore)
            : Number(totalScore).toFixed(1)
        } av. 5`}</div>
      </div>

      {starData.map((item, index) => {
        return (
          <div className={Style.progressBarWrapper} key={index}>
            <div className={Style.rating_small_stars}>
              {item.map((star, index) => (
                <div key={index}>
                  {star ? <StarIconYotpo /> : <EmptyStarIcon />}{" "}
                </div>
              ))}
            </div>
            <div className={Style.rating_text}>({reviewScore[index]})</div>
            <div className={Style.ratingWrapper}>
              <div className={Style.rating_slider}>
                <Slider
                  width={(reviewScore[index] / productReviews.length) * 100}
                />
              </div>
              <div className={Style.percentage}>{`${(
                (reviewScore[index] / productReviews.length) *
                100
              ).toFixed(0)}%`}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default YotpoProductSummary
