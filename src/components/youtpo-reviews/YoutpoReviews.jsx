import React from "react"
import useRating from "../../custom-hooks/useRating"
import {
  EditIcon,
  StarIconYotpo,
  EmptyStarIcon,
  YotpoMenuIcon,
} from "../../assets/components/icons/Icons"

import Slider from "./components/Slider"
import Review from "./components/Review"
import Pagination from "./components/Pagination"
import CreateReview from "./components/CreateReview"
import * as Style from "./youtpo-reviews.module.scss"
import Button from "../UI/custom-button/CustomButton"

const YoutpoReviews = ({ image, productid, product }) => {
  const {
    setShowRaiting,
    setShowCreateReview,
    setShowVoteError,
    handleChangePage,
    productReviews,
    reviewScore,
    showRaiting,
    showCreateReview,
    starData,
    allPages,
    curentReviews,
    showVoteError,
    ratings,
    reviews,
    getReviewVotes,
    page,
    yotpoCreateText,
    yotpoReviewsText,
    yotpoSingleText,
  } = useRating(productid)

  return (
    <div id="review-section" className={Style.reviews}>
      {showVoteError && (
        <div className={Style.reviews_error}>{yotpoReviewsText[4].text}</div>
      )}
      {yotpoReviewsText && (
        <h2 className={Style.heading}>{yotpoReviewsText[3].text}</h2>
      )}
      {/* Rating Section */}
      {ratings?.nodes.length && (
        <>
          <div className={`${Style.ratings} ${showRaiting && Style.active}`}>
            <div className={Style.ratings_container}>
              <div className={Style.ratings_left_container}>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star, index) => (
                    <StarIconYotpo key={index} />
                  ))}
                </div>
                {productReviews && (
                  <p className={Style.reviewPar}>
                    {productReviews.length} {yotpoReviewsText[0].text}
                  </p>
                )}
              </div>
              <div className={Style.ratings_right_container}>
                {starData.map((item, index) => {
                  return (
                    <div className="flex items-center" key={index}>
                      <div className={Style.rating_small_stars}>
                        {item.map((star, index) => (
                          <div key={index}>
                            {" "}
                            {star ? <StarIconYotpo /> : <EmptyStarIcon />}{" "}
                          </div>
                        ))}
                      </div>
                      <div className={Style.rating_text}>
                        ({reviewScore[index]})
                      </div>
                      <div className={Style.ratingWrapper}>
                        <div className={Style.rating_slider}>
                          <Slider
                            width={
                              (reviewScore[index] / productReviews.length) * 100
                            }
                          />
                        </div>
                        {productReviews.length ? (
                          <div className={Style.percentage}>{`${(
                            (reviewScore[index] / productReviews.length) *
                            100
                          ).toFixed(0)}%`}</div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className={Style.ratings_container}>
              <Button
                globalStyles={true}
                buttonHandler={() => {
                  setShowCreateReview(!showCreateReview)
                }}
              >
                <div className={Style.ratings_button}>
                  <EditIcon />
                  <span>{yotpoReviewsText[2].text}</span>
                </div>
              </Button>
            </div>
          </div>
          {showCreateReview && (
            <CreateReview
              texts={yotpoCreateText}
              product={product}
              closeReviewForm={() => setShowCreateReview(false)}
              productid={productid.split("/")[4]}
            />
          )}
          <div className="flex">
            {reviews?.nodes && (
              <div className={Style.reviews_heading_container}>
                <p className={Style.reviews_heading}>
                  Reviews ({productReviews.length})
                </p>
                <div
                  aria-label="Youtpo Reviews"
                  role="button"
                  tabIndex={0}
                  className={Style.menu_icon}
                  onClick={() => setShowRaiting(!showRaiting)}
                  onKeyDown={() => setShowRaiting(!showRaiting)}
                >
                  <YotpoMenuIcon />
                </div>
              </div>
            )}
          </div>
        </>
      )}
      {/* Reviews Section */}
      <>
        {curentReviews.map((review, index) => (
          <Review
            texts={yotpoSingleText}
            review={review}
            key={index}
            image={image}
            errorVote={() => setShowVoteError(true)}
            getReviewVotes={getReviewVotes}
          />
        ))}
      </>
      {curentReviews?.length > 4 && (
        <Pagination
          pages={allPages}
          handlePage={handleChangePage}
          curentPage={page}
        />
      )}

      {curentReviews?.length === 0 && (
        <p className={Style.reviews_heading_empty}>
          {yotpoReviewsText[1].text}
        </p>
      )}
    </div>
  )
}

export default YoutpoReviews
