import React from "react"
import * as Style from "./template2.module.scss"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import Markdown from "react-markdown"

const Template2 = ({ data }) => {
  return (
    <div className={Style.article_content2}>
      <div className={Style.content_wrapper1}>
        {data?.image1 && (
          <div className={Style.image2}>
            <GatsbyImage
              className={Style.gatsby_image2}
              image={getImage(
                data?.image1?.localFile?.childImageSharp.gatsbyImageData
              )}
              alt="image"
            />
          </div>
        )}

        <div className={Style.content1}>
          <h1>{data.Title}</h1>
          <div className={Style.article_about}>
            <span>{data?.Date}, </span>
            <span>{data?.Author}</span>
          </div>
          {data?.text_content_1 && (
            <div className={Style.article_paragraph1}>
              <Markdown children={data?.text_content_1?.data?.text_content_1} />
            </div>
          )}
        </div>
      </div>
      {data?.text_content_2 && (
        <div className={Style.content_wrapper2}>
          <Markdown children={data?.text_content_2?.data?.text_content_2} />
        </div>
      )}
      {!data?.FullwidthImage2 ? (
        <div className={Style.content_wrapper3}>
          <div className={Style.image3}>
            <GatsbyImage
              className={Style.gatsby_image3}
              image={getImage(
                data?.image2?.localFile?.childImageSharp.gatsbyImageData
              )}
              alt="image"
            />
          </div>
          {data?.text_content3 && (
            <div className={Style.content3}>
              <Markdown children={data?.text_content3?.data?.text_content3} />
            </div>
          )}
          {data?.text_content4 && (
            <div className={Style.content4}>
              <Markdown children={data?.text_content4?.data?.text_content4} />
            </div>
          )}
        </div>
      ) : (
        <div className={Style.content_wrapper4}>
          <div className={Style.image4}>
            <GatsbyImage
              className={Style.gatsby_image4}
              image={getImage(
                data?.image2?.localFile?.childImageSharp.gatsbyImageData
              )}
              alt="image"
            />
          </div>

          {data?.text_content4 && (
            <div className={Style.content5}>
              <Markdown children={data?.text_content3?.data?.text_content3} />
              <Markdown children={data?.text_content4?.data?.text_content4} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Template2
