import React, { useLayoutEffect } from "react"
import * as Style from "./single-post.module.scss"
import { GatsbyImage } from "gatsby-plugin-image"
import { getImage } from "gatsby-plugin-image"
import Markdown from "react-markdown"
import {
  CircleLogo,
  DotsMore,
  Likes,
  Comments,
  Bookmarks,
} from "../../../../assets/components/icons/Icons"
import useWindowWidth from "../../../../custom-hooks/useWindowWidth"
import CustomButton from "../../../UI/custom-button/CustomButton"

const SinglePost = ({ data, profileUrl }) => {
  const isBrowser = typeof window !== "undefined"
  const windowWidth = useWindowWidth()
  useLayoutEffect(() => {
    setTimeout(() => {
      if (isBrowser) {
        let arr = Array.from(document.getElementsByClassName("single_post"))
        let heights = []
        arr.forEach((element, index) => {
          Array.from(element.children).forEach(function (element, index) {
            let elementHeight = element.offsetHeight
            if (!heights[index] || heights[index] < elementHeight) {
              heights[index] = elementHeight
            }
          })
        })
        Array.from(document.getElementsByClassName("single_post")).forEach(
          function (element, index) {
            Array.from(element.children).forEach(function (element, index) {
              element.style.height = heights[index] + "px"
            })
          }
        )
      }
    }, 500)
  }, [windowWidth, isBrowser])
  function openPost() {
    if (isBrowser) {
      window.open(data?.post_url, "_blank")
    }
  }
  return (
    <div className={Style.single_post_component}>
      <div className={`${Style.helper_wrapper} single_post`}>
        <div className={Style.post_header}>
          <a href={profileUrl} target="_blank" rel="noreferrer">
            <div className={Style.logo_wrapper}>
              <CircleLogo />
              <div className={Style.heading}>
                <Markdown children={data?.heading.data.heading} />
              </div>
            </div>
          </a>
          <DotsMore />
        </div>
        <CustomButton buttonHandler={openPost} style={Style.post_btn}>
          <GatsbyImage
            image={getImage(
              data?.image.localFile.childImageSharp.gatsbyImageData
            )}
            alt="product-image"
          />
        </CustomButton>

        <div className={Style.post_details}>
          <a href={profileUrl} target="_blank" rel="noreferrer">
            <div className={Style.heading}>
              <Markdown children={data?.heading.data.heading} />
            </div>
          </a>
          <div className={Style.description}>
            <Markdown children={data?.description.data.description} />
          </div>
        </div>
        <div className={Style.post_footer}>
          <div className={Style.icon_wrapper}>
            <Likes />
            <span>{data?.likes_counter}</span>
          </div>
          <div className={Style.icon_wrapper}>
            <Comments />
            <span>{data?.comments_counter}</span>
          </div>
          <div className={Style.icon_wrapper}>
            <Bookmarks />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePost
