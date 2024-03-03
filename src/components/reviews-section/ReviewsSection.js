import React, { useRef, useState } from "react"
import * as Style from "./reviews-section.module.scss"
import Markdown from "react-markdown"
import SingleReview from "./components/single-review/SingleReview"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import {
  SlickLeftArrow,
  SlickRightArrow,
} from "../../assets/components/icons/Icons"
import Raiting from "../raiting/Raiting"


const ReviewsSection = ({ data, isProductReview = false }) => {
  const sliderRef = useRef()
  const [currSlide, setCurrSlide] = useState(0)
  const [selectedDot, setSelectedDot] = useState(0)
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => {
    return (
      <button
        {...props}
        className={
          "slick-prev slick-arrow" +
          (currentSlide === 0 ? " slick-disabled" : "")
        }
        aria-hidden="true"
        aria-disabled={currentSlide === 0 ? true : false}
        type="button"
      >
        <SlickLeftArrow />
      </button>
    )
  }
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => {
    return (
      <button
        {...props}  
        className={
          "slick-next slick-arrow" +
          (currentSlide === slideCount - 1 ? " slick-disabled" : "")
        }
        aria-hidden="true"
        aria-disabled={currentSlide === slideCount - 1 ? true : false}
        type="button"
      >
        <SlickRightArrow />
      </button>
    )
  }
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    slidesToScroll: 4,
    initialSlide: 0,
    draggable:false,
    responsive: [
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          draggable:true,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          dots: false,
          afterChange: currentSlide => {
            if (currentSlide < currSlide) {
              if (selectedDot > 0) {
                setSelectedDot(selectedDot - 1)
                setCurrSlide(currentSlide)
              } else {
                setSelectedDot(3)
                setCurrSlide(currentSlide)
              }
            } else if (currentSlide > currSlide) {
              if (selectedDot < 3) {
                setSelectedDot(selectedDot + 1)
                setCurrSlide(currentSlide)
              } else {
                setSelectedDot(0)
                setCurrSlide(currentSlide)
              }
            }
          },
        },
      },
    ],
  }

  const slides = data?.single_review.map((el, index) => {
    return <SingleReview key={index} data={el} index={index} />
  })
  const dotHandler = val => {
    if (val < 2) {
      sliderRef.current.slickPrev()
    } else {
      sliderRef.current.slickNext()
    }
  }

  let dotsArr = []
  for (let i = 0; i < 4; i++) {
    let dotEl = (
      <div
        key={i}
        className={`${Style.prev_dot} ${
          i === selectedDot && Style.selected_dot
        }`}
        onClick={() => dotHandler(i)}
      ></div>
    )
    dotsArr.push(dotEl)
  }

  return (
    <div className={`${Style.reviews_section} main-container reviews_section`}>
      <div
        className={`${Style.heading} ${
          isProductReview ? Style.reviews_product : ""
        }`}
      >
        <Markdown children={data?.heading.data.heading} />
        {isProductReview && (
          <Raiting raiting={5} reviews={data?.single_review.length} />
        )}
      </div>
      <div>
        {slides && (
          <Slider {...settings} ref={sliderRef}>
            {slides}
          </Slider>
        )}
      </div>
      <div className={Style.slider_dots}>{dotsArr}</div>
    </div>
  )
}

export default ReviewsSection
