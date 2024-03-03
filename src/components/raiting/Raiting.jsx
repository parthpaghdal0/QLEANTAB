import React, { useEffect, useState } from "react"
import * as Style from "./raiting.module.scss"
import { StarIcon } from "../../assets/components/icons/Icons"
import useRating from "../../custom-hooks/useRating"

const Raiting = ({ styleClass, productid, collectionItem = false }) => {
  const [raitingArray, setRaitingArray] = useState(null)

  const {
    reviewsScore: raiting,
    reviewsCount: reviews,
    scrollHandler,
    yotpoReviewsText,
  } = useRating(productid)

  useEffect(() => {
    const array = []
    for (let i = 0; i < raiting; i++) {
      array.push(i)
    }
    setRaitingArray(array)
  }, [raiting])

  const productPageContent = (
    <>
      {raiting !== 0 && reviews !== 0 && (
        <div
          onClick={scrollHandler}
          className={`${Style.raiting} ${styleClass ? styleClass : ""}`}
        >
          {raitingArray &&
            raitingArray.map(item => (
              <div className={Style.icon} key={item}>
                <StarIcon />
              </div>
            ))}
          {reviews && (
            <p className={Style.reviews}>
              {`${reviews} ${yotpoReviewsText[0].text.toLowerCase()}`}
            </p>
          )}
        </div>
      )}
    </>
  )

  const collectionItemContent = (
    <>
      <div
        className={`${Style.raitingCollection} ${Style.raitingCollectionItem} ${
          styleClass ? styleClass : ""
        }`}
      >
        <div className={Style.starWrapper}>
          {raitingArray &&
            raitingArray.map(item => (
              <div className={Style.icon} key={item}>
                <StarIcon />
              </div>
            ))}
        </div>
        {reviews !== 0 && (
          <p className={`${Style.reviews}`}>
            {`${reviews} ${yotpoReviewsText[0].text.toLowerCase()}`}
          </p>
        )}
        {reviews === 0 && (
          <p className={`${Style.reviews} ${Style.noReviewsPar}`}>
            {`${yotpoReviewsText[1].text}`}
          </p>
        )}
      </div>
    </>
  )

  return collectionItem
    ? collectionItemContent
    : !collectionItem
    ? productPageContent
    : null
}

export default Raiting
