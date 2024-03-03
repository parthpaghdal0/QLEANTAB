import React, { useLayoutEffect } from "react"
import * as Style from "./single-review.module.scss"
import Markdown from "react-markdown"
import { getImage } from "gatsby-plugin-image"
import { GatsbyImage } from "gatsby-plugin-image"
import {
  Quotes,
  DropReview1,
  DropReview2,
} from "../../../../assets/components/icons/Icons"
import useWindowWidth from "../../../../custom-hooks/useWindowWidth"

const SingleReview = ({ data, index }) => {
  const isBrowser = typeof window !== "undefined"
  const windowWidth = useWindowWidth()
  let drop

  if ((index + 1) % 2 === 0) {
    drop = <DropReview1 color={data.color_code} />
  } else {
    drop = <DropReview2 color={data.color_code} />
  }

  useLayoutEffect(() => {
    setTimeout(() => {
      if (isBrowser) {
        let arr = Array.from(document.getElementsByClassName("single_review"))
        let heights = []
        arr.forEach((element, index) => {
          Array.from(element.children).forEach(function (element, index) {
            let elementHeight = element.offsetHeight
            if (!heights[index] || heights[index] < elementHeight) {
              heights[index] = elementHeight
            }
          })
        })
        Array.from(document.getElementsByClassName("single_review")).forEach(
          function (element, index) {
            Array.from(element.children).forEach(function (element, index) {
              element.style.height = heights[index] + "px"
            })
          }
        )
      }
    }, 500)
  }, [windowWidth, isBrowser])
  const borderStyle = {
    border: `1px solid ${data.color_code}`,
  }
  return (
    <div className={`${Style.single_review_component}`} style={borderStyle}>
      <div className="single_review">
        <Quotes color={data.color_code} />
        <div className={Style.review_text}>
          <Markdown children={data?.text.data.text} />
        </div>

        <div className={Style.decoration_wrapper}>
          <div className={Style.image_wrapper}>
            <GatsbyImage
              image={getImage(
                data?.image.localFile.childImageSharp.gatsbyImageData
              )}
              alt="person-image"
            />
          </div>
          <div className={Style.name}>
            <Markdown children={data?.name.data.name} />
          </div>
          <div className={Style.decoration}> {drop}</div>
        </div>
      </div>
    </div>
  )
}

export default SingleReview
