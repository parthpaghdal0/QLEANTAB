import React, { useRef, useState } from "react"
import * as Style from "./instagram-section.module.scss"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import Markdown from "react-markdown"
import { WhiteDrop } from "../../assets/components/icons/Icons"
import SinglePost from "./components/single-post/SinglePost"
import { SlickRightArrow } from "../../assets/components/icons/Icons"
import { SlickLeftArrow } from "../../assets/components/icons/Icons"

const InstagramSection = ({ data, customClass }) => {
  const sliderRef = useRef()
  const [currSlide, setCurrSlide] = useState(0)
  const [selectedDot, setSelectedDot] = useState(0)
  const slides = data?.instagram_post.map((el, index) => {
    return (
      <SinglePost
        key={index}
        data={el}
        profileUrl={data.instagram_profile_url}
      />
    )
  })
  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
      type="button"
    >
      <SlickLeftArrow />
    </button>
  )
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
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
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    slidesToScroll: 3,
    initialSlide: 0,
    draggable: false,
    responsive: [
      {
        breakpoint: 1080,
        settings: {
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
    <div
      className={`${Style.instagram_section} main-container instagram_section ${
        customClass && Style.custom_styles
      }`}
    >
      <div className={Style.decoration}>
        <WhiteDrop />
      </div>
      <div className={Style.heading}>
        <Markdown children={data?.heading.data.heading} linkTarget="_blank" />
      </div>
      <Slider {...settings} ref={sliderRef}>
        {slides}
      </Slider>
      <div className={Style.slider_dots}>{dotsArr}</div>
    </div>
  )
}

export default InstagramSection
