import React, { useRef, useState, useEffect, useContext } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import * as Style from "./ProducPageSlider.module.scss"
import ProductContext from "../../context/ProductContext"
import CustomButton from "../UI/custom-button/CustomButton"
import { GatsbyImage, StaticImage } from "gatsby-plugin-image"
import { getImage } from "gatsby-plugin-image"
import "./product-slider-global.scss"
import {
  SlickRightArrow,
  SlickLeftArrow,
  ZoomIcon,
} from "../../assets/components/icons/Icons"
import AskAnything from "../ask-anything/AskAnything"

const ProducPageSlider = ({ images, title }) => {
  const ctx = useContext(ProductContext)
  const { strapiHelperText } = useContext(ProductContext)
  const sliderRef = useRef()
  const [curImageIndex, setCurImageIndex] = useState(0)

  const beforeChangeHandler = (a, b) => {
    setCurImageIndex(b)
  }

  const currentImage = images.filter((image, index) => {
    return index === curImageIndex
  })

  useEffect(() => {
    ctx.setModalImage(currentImage)
  }, [curImageIndex])

  const gotoNext = e => {
    sliderRef.current.slickNext()
  }
  const gotoPrev = e => {
    sliderRef.current.slickPrev()
  }

  const zoomHandler = () => {
    ctx.setZoomModal(!ctx.zoomModal)
  }

  const settings = {
    focusOnSelect: true,
    centerMode: true,
    centerPadding: "0",
    dots: false,
    // infinite: true,
    // speed: 100,
    slidesToShow: images.length,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    // swipeToSlide: true,
    beforeChange: beforeChangeHandler,
    responsive: [
      {
        breakpoint: 540,
        settings: {
          // vertical: true,
          // slidesToShow: 1,
          // slidesToScroll: 1,
          // initialSlide: 1,
          // dots: true,
        },
      },
    ],
  }

  return (
    <section className={Style.productGallery}>
      <div className={Style.galleryContolsImageWrapper}>
        <div onClick={zoomHandler} className={Style.currentImageWrapper}>
          <GatsbyImage
            image={getImage(currentImage[0].preview.image.gatsbyImageData)}
            alt="current-image"
          />
        </div>
        <div className={Style.zoomInfo}>
          <ZoomIcon /> <p>{strapiHelperText?.ZoomProductImage}</p>
        </div>

        <div
          className={`${Style.sliderContainer} custom-classes-prduct-slider`}
        >
          <div className={Style.btnPostion}>
            <Slider ref={sliderRef} {...settings}>
              {images.map((slide, index) => {
                return (
                  <div key={slide} className={Style.imageWrapper}>
                    <GatsbyImage
                      image={getImage(slide.preview.image.gatsbyImageData)}
                      alt="slide-image"
                    />
                  </div>
                )
              })}
            </Slider>
            <div className={Style.btnLeft}>
              <CustomButton buttonHandler={gotoPrev}>
                <SlickLeftArrow />
              </CustomButton>
            </div>
            <div className={Style.btnRight}>
              <CustomButton buttonHandler={gotoNext}>
                <SlickRightArrow />
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
      <AskAnything mode="desktop" productName={title} />
    </section>
  )
}

export default ProducPageSlider
