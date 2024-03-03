import React, { useEffect } from "react"
import * as Style from "./LandingReview.module.scss"
import useLandingReview from "../../../custom-hooks/use-landingReview"
import LandingSingleReview from "./ladning-single-review/LandingSingleReview"

const LandingReview = ({ data }) => {
  const background = data.bg.url
  const array = data.singleLadingReview
  const reviewlength = data.singleLadingReview.length

  const {
    calulateDesktopHandler,
    dekstopArray,
    calulateMobilepHandler,
    mobileArray,
  } = useLandingReview()

  useEffect(() => {
    calulateDesktopHandler(reviewlength, array)
    calulateMobilepHandler(reviewlength, array)
  }, [])

  const desktopContent = dekstopArray.map((item, index) => {
    return (
      <div key={index} className={Style.reviewCol}>
        {item.map((item, index) => {
          return (
            <div key={index} className={Style.reviewWrapper}>
              <LandingSingleReview data={item} />
            </div>
          )
        })}
      </div>
    )
  })

  const moblieContent = mobileArray.map((item, index) => {
    return (
      <div key={index} className={Style.reviewCol}>
        {item.map((item, index) => {
          return (
            <div key={index} className={Style.reviewWrapper}>
              <LandingSingleReview data={item} />
            </div>
          )
        })}
      </div>
    )
  })

  return (
    <>
      <section
        style={{
          backgroundImage: `url(${background})`,
        }}
        className={`main-container ${Style.wrapper} ${Style.desktop}`}
      >
        {desktopContent}
      </section>
      <section className={`main-container ${Style.wrapper} ${Style.mobile}`}>
        {moblieContent}
      </section>
    </>
  )
}

export default LandingReview
