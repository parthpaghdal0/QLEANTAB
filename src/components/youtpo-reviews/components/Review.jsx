import React, { useEffect, useState } from "react"
import {
  StarIconYotpo,
  GreenCheckIcon,
  LikeIcon,
  ShareIconYotpo,
} from "../../../assets/components/icons/Icons"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Markdown from "react-markdown"
import * as Style from "./review.module.scss"
import axios from "axios"

const Review = ({ review, image, getReviewVotes, errorVote, texts }) => {
  const isBrowser = typeof window !== "undefined"
  const [userImage, setUserImage] = useState(null)
  const [votesUp, setVotesUp] = useState(0)
  const [votesDown, setVotesDown] = useState(0)

  useEffect(() => {
    getYoutpoReviewVotes()
    if (review?.imagesData && review?.imagesData[0].originalUrl) {
      setUserImage(review?.imagesData)
    } else {
      setUserImage(null)
    }
  }, [review])

  const getYoutpoReviewVotes = () => {
    const yotpoReview = getReviewVotes(review?.id)

    if (yotpoReview) {
      setVotesUp(yotpoReview?.votesUp)
      setVotesDown(yotpoReview?.votesDown)
    }
  }

  const voteHandle = async (reviewId, vote) => {
    if (isBrowser) {
      const yotpoVotes = localStorage.getItem("yotpoVotes")
      const voteType = vote

      if (!yotpoVotes) {
        voteRequest(reviewId, vote, [])
      } else {
        const votesDataArray = JSON.parse(yotpoVotes)

        const existedVoteArray = votesDataArray.find(
          i => i.reviewId === reviewId
        )

        if (!existedVoteArray) {
          voteRequest(reviewId, voteType, votesDataArray)
        } else {
          if (voteType === "up") {
            if (existedVoteArray.voteUp) {
              errorVote()
            } else {
              voteRequest(reviewId, voteType, votesDataArray, existedVoteArray)
            }
          } else {
            if (existedVoteArray.voteDown) {
              errorVote()
            } else {
              voteRequest(reviewId, voteType, votesDataArray, existedVoteArray)
            }
          }
        }

        const vote = {
          reviewId,
          voteUp: false,
          voteDown: false,
        }
      }
      // return
    }
  }

  const voteRequest = async (
    reviewId,
    vote,
    votesDataArray,
    existedVoteArray = null
  ) => {
    const options = {
      method: "POST",
      url: `https://api.yotpo.com/reviews/${reviewId}/vote/${vote}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }

    try {
      const response = await axios.request(options)
      if (response.status === 200) {
        vote === "up"
          ? setVotesUp(oldValue => oldValue + 1)
          : setVotesDown(oldValue => oldValue + 1)

        let voteData = {
          reviewId,
          voteUp: false,
          voteDown: false,
        }

        let filteredVoteArray = votesDataArray

        if (existedVoteArray) {
          voteData = { ...existedVoteArray }
          filteredVoteArray = votesDataArray.filter(
            element => element.reviewId !== existedVoteArray.reviewId
          )
        }
        vote === "up" ? (voteData.voteUp = true) : (voteData.voteDown = true)

        filteredVoteArray.push(voteData)

        localStorage.setItem("yotpoVotes", JSON.stringify(filteredVoteArray))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={Style.review_container}>
      <div className={Style.review_info}>
        <div className={Style.review_icon_information}>
          {review?.user?.displayName.charAt(0)}
          <div className={Style.review_icon_svg}>
            <GreenCheckIcon />
          </div>
        </div>
        <div className={Style.review_info_heading}>
          <h4>
            {review?.user?.displayName}
            <span> {texts[0].text}</span>
          </h4>
          <div className={Style.review_rating}>
            {[1, 2, 3, 4, 5].map((star, index) => (
              <StarIconYotpo key={index} />
            ))}
          </div>
        </div>
        <div className={Style.review_date}>
          {review.createdAt.split("T")[0]}
        </div>
      </div>
      <div className={Style.review_content}>
        <h5 className={Style.review_heading}>{review.title}</h5>
        <Markdown children={review.content} escapeHtml={false} />
        {/* <p>{review.content}</p> */}
      </div>

      {userImage || userImage?.length > 0 ? (
        <div className={Style.userImagesWrapper}>
          {userImage.map((item, index) => {
            return (
              <div key={index} className={Style.image}>
                <img
                  src={item.originalUrl}
                  alt="user-image"
                  width={147}
                  height={147}
                />
              </div>
            )
          })}
        </div>
      ) : (
        image && (
          <div className={Style.image}>
            <GatsbyImage
              image={getImage(image[0].preview.image.gatsbyImageData)}
              alt="product-image"
              width={167}
              height={167}
              className={Style.review_image}
              loading="lazy"
            />
          </div>
        )
      )}

      {/* {
      userImage ? (
        <div className={Style.image}>
          <img src={userImage} alt="user-image" width={167} height={167} />
        </div>
      ) : (
        image && (
          <div className={Style.image}>
            <GatsbyImage
              image={getImage(image[0].preview.image.gatsbyImageData)}
              alt="product-image"
              width={167}
              height={167}
              className={Style.review_image}
              loading="lazy"
            />
          </div>
        )
      )} */}
      <div className={Style.review_footer}>
        {/* <div className={Style.review_footer_share}>
          <ShareIconYotpo />
          <span className={Style.shareIcon}>Share</span>
        </div> */}
        <div className="flex items-center m-w-100">
          <span className={Style.review_footer_description}>
            {texts[1].text}
          </span>
          <span className={Style.review_footer_date}>
            {review.createdAt.split("T")[0]}
          </span>
          <div
            className={Style.like_button}
            onClick={() => voteHandle(review.id, "up")}
            // onClick={() => voteHandle(review.id, "up")}
          >
            <LikeIcon />
            <span>{votesUp}</span>
          </div>
          <div
            className={Style.unlike_button}
            onClick={() => voteHandle(review.id, "down")}
          >
            <LikeIcon />
            <span>{votesDown}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Review
