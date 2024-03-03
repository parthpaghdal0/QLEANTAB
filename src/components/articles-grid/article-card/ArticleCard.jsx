import React, { useState, useLayoutEffect } from "react"
import * as Style from "./article-card.module.scss"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import CustomButton from "../../UI/custom-button/CustomButton"
import Markdown from "react-markdown"
import { navigate } from "gatsby"
import useWindowWidth from "../../../custom-hooks/useWindowWidth"
import useGlobalLang from "../../../custom-hooks/useGlobalLang"

const ArticleCard = ({ data, buttonText2, relatedArticle }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  const isBrowser = typeof window !== "undefined"
  const windowWidth = useWindowWidth()
  useLayoutEffect(() => {
    setTimeout(() => {
      if (isBrowser) {
        let arr = Array.from(document.getElementsByClassName("article_card"))
        let heights = []
        arr.forEach((element, index) => {
          Array.from(element.children).forEach(function (element, index) {
            let elementHeight = element.offsetHeight
            if (!heights[index] || heights[index] < elementHeight) {
              heights[index] = elementHeight
            }
          })
        })
        Array.from(document.getElementsByClassName("article_card")).forEach(
          function (element, index) {
            Array.from(element.children).forEach(function (element, index) {
              element.style.height = heights[index] + "px"
            })
          }
        )
      }
    }, 500)
  }, [isBrowser, windowWidth])
  const navigatehandler = () => {
    const url =
      GLOBAL_LANG === "en"
        ? `/en/blog/${data?.Handle}`
        : `/blog/${data?.Handle}`
    navigate(url)
  }
  return (
    <div
      className={`${Style.article_card} ${
        relatedArticle && Style.related_article_card
      }`}
    >
      <div className={Style.card_image}>
        <GatsbyImage
          className={Style.article_image}
          image={getImage(
            data?.main_image?.localFile?.childImageSharp.gatsbyImageData
          )}
          alt="image"
        />
      </div>
      <div className={`${Style.card_content} article_card`}>
        <div className={Style.date}>{data?.Date}</div>
        <div>
          <h4>{data?.Title}</h4>
        </div>

        <div className={Style.card_description}>
          <Markdown children={data?.text_content_1?.data?.text_content_1} />
        </div>
        <div>
          <CustomButton
            buttonHandler={navigatehandler}
            globalStyles={true}
            style={Style.card_button}
          >
            {buttonText2}
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default ArticleCard
