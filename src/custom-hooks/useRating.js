import { useState, useEffect, useContext } from "react"
import GeneralContext from "../context/GeneralContext"
import useGlobalLang from "./useGlobalLang"

const useRating = id => {
  const { GLOBAL_LANG } = useGlobalLang()
  const isBrowser = typeof window !== "undefined"
  const { data } = useContext(GeneralContext)
  const { reviews, ratings, yotpoReviews } = data
  const texts = data[GLOBAL_LANG]
  const { yotpoCreateText, yotpoReviewsText, yotpoSingleText } = texts

  //STATE
  const [productId, setProductId] = useState(0)
  const [productReviews, setProductReviews] = useState([])
  const [reviewScore, setReviewScore] = useState({})
  const [showRaiting, setShowRaiting] = useState(false)
  const [showVoteError, setShowVoteError] = useState(false)
  const [showCreateReview, setShowCreateReview] = useState(false)
  const [reviewsCount, setReviewsCount] = useState(0)
  const [reviewsScore, setReviewsScore] = useState(0)
  const starData = [
    [true, true, true, true, true],
    [true, true, true, true, false],
    [true, true, true, false, false],
    [true, true, false, false, false],
    [true, false, false, false, false],
  ]
  const [page, setPage] = useState(1)
  const [allPages, setAllPages] = useState(0)
  const perPage = 5
  const [curentReviews, setCurentReviews] = useState([])

  //FUNCTIONS

  const handleReviews = (reviews, score) => {
    setReviewsCount(reviews)
    setReviewsScore(Math.round(Number(score)))
  }

  const handleChangePage = pageValue => {
    setPage(page)
    const reviews = productReviews.slice(
      perPage * pageValue - perPage,
      perPage * pageValue
    )
    setCurentReviews(reviews)

    if (isBrowser) {
      const reviewsElement = document.querySelector(".product-reviews")
      const y = reviewsElement.getBoundingClientRect().top + window.scrollY
      window[`scrollTo`]({ top: y, behavior: `smooth` })
    }
  }

  const getReviewVotes = reviewId => {
    const review = reviews.nodes.find(i => i.yotpoId === reviewId)
    return review || null
  }

  const setIdHandler = id => {
    if (id) {
      setProductId(id.split("/")[4])
    }
  }

  const scrollHandler = () => {
    if (isBrowser) {
      const reviewSection = document.querySelector("#review-section")
      reviewSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
        options: { duration: 300 },
      })
    }
  }

  //USE EFFECT

  useEffect(() => {
    setIdHandler(id)
  }, [id])

  useEffect(() => {
    if (productId) {
      const prodcuctReviews = reviews.nodes.filter(
        element => element.productIdentifier === productId
      )

      let raiting = 0
      prodcuctReviews.forEach(el => {
        raiting += el.score
      })

      handleReviews(
        prodcuctReviews.length ? prodcuctReviews.length : 0,
        raiting > 0 ? (raiting / prodcuctReviews.length).toFixed(2) : 0
      )

      if (prodcuctReviews.length > 0) {
        const currentPageReviews = yotpoReviews.nodes
          .filter(element => element.productId === productId)[0]
          .reviews.slice(perPage * page - perPage, perPage * page)

        const score = {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
        }

        setProductReviews(prodcuctReviews)
        setCurentReviews(currentPageReviews)
        setAllPages(+(prodcuctReviews.length / perPage).toFixed(0) + 1)

        prodcuctReviews.forEach(review => {
          if (review.score === 5) {
            score[0] += 1
          } else if (review.score === 4) {
            score[1] += 1
          } else if (review.score === 3) {
            score[2] += 1
          } else if (review.score === 2) {
            score[3] += 1
          } else {
            score[4] += 1
          }
        })
        setReviewScore(score)
      }
    }
  }, [yotpoReviews, page, productId])

  useEffect(() => {
    if (showVoteError) {
      setTimeout(() => {
        setShowVoteError(false)
      }, 1500)
    }
  }, [showVoteError])
  return {
    setIdHandler,
    productId: productId,
    data: data,
    setShowRaiting,
    setShowCreateReview,
    setShowVoteError,
    handleReviews,
    handleChangePage,
    productReviews: productReviews,
    reviewScore: reviewScore,
    showRaiting: showRaiting,
    showCreateReview: showCreateReview,
    reviewsCount: reviewsCount,
    reviewsScore: reviewsScore,
    starData: starData,
    allPages: allPages,
    curentReviews: curentReviews,
    showVoteError: showVoteError,
    ratings: ratings,
    reviews: reviews,
    getReviewVotes,
    page: page,
    scrollHandler,
    yotpoCreateText: yotpoCreateText,
    yotpoReviewsText: yotpoReviewsText,
    yotpoSingleText: yotpoSingleText,
  }
}

export default useRating
