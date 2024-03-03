import React from "react"
import * as Style from "./latest-article.module.scss"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import CustomButton from "../UI/custom-button/CustomButton"
import { navigate } from "gatsby"
import Markdown from "react-markdown"
import useGlobalLang from "../../custom-hooks/useGlobalLang"

const LatestArticle = ({ data, buttonText }) => {
  const { GLOBAL_LANG } = useGlobalLang()



  const navigatehandler = () => {
    const url = GLOBAL_LANG === "en" ? `/en/blog/${data?.Handle}` : `/blog/${data?.Handle}`
    navigate(url)
  }
  return (
    <section className={`main-container ${Style.latest_article_section}`}>
      <div className={Style.half_width}>
        <GatsbyImage
          className={Style.article_image}
          image={getImage(
            data?.main_image?.localFile?.childImageSharp.gatsbyImageData
          )}
          alt="image"
        />
      </div>
      <div className={`${Style.half_width} ${Style.text_wrapper}`}>
        <h3>{data?.Title}</h3>
        <div className={Style.blog_about}>
          <span>{data?.Date}, </span>
          <span>{data?.Author}</span>
        </div>
        <div className={Style.blog_description}>
          <Markdown children={data?.text_content_1?.data?.text_content_1} />
        </div>
        <CustomButton
          buttonHandler={navigatehandler}
          globalStyles={true}
          style={Style.blog_button}
        >
          {buttonText}
        </CustomButton>
      </div>
    </section>
  )
}

export default LatestArticle
