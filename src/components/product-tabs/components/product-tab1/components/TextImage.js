import React from "react"
import * as Style from "./text-image.module.scss"
import Markdown from "react-markdown"
import { getImage } from "gatsby-plugin-image"
import { GatsbyImage } from "gatsby-plugin-image"

const TextImage = ({ data }) => {
  return (
    <div
      className={`${Style.text_image_component} ${
        data?.columns_reverse && Style.columns_reverse
      }`}
      style={
        data?.background_image
          ? {
              backgroundImage: `url(${
                data?.background_image?.url ||
                data?.background_image.localFile.url
              })`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }
          : { backgroundColor: data?.background_color }
      }
    >
      <div className={Style.text_wrapper}>
        <div className={Style.heading}>
          <Markdown children={data?.heading?.data.heading || data?.heading} />
        </div>
        <div className={Style.description}>
          <Markdown
            children={data?.description?.data.description || data?.description}
          />
        </div>
        {(data?.icon_image1 || data?.icon_image2) && (
          <div className={Style.icons_wrapper}>
            {data?.icon_image1 && (
              <div className={Style.icon}>
                <div className={Style.icon_wrapper}>
                  <GatsbyImage
                    image={getImage(
                      data?.icon_image1.localFile.childImageSharp
                        .gatsbyImageData
                    )}
                    alt="icon-image"
                  />
                </div>
                {data?.icon_text1 && (
                  <div className={Style.icon_text}>
                    <Markdown children={data?.icon_text1.data.icon_text1} />
                  </div>
                )}
              </div>
            )}
            {data?.icon_image2 && (
              <div className={Style.icon}>
                <div className={Style.icon_wrapper}>
                  <GatsbyImage
                    image={getImage(
                      data?.icon_image2.localFile.childImageSharp
                        .gatsbyImageData
                    )}
                    alt="icon-image"
                  />
                </div>
                {data?.icon_text2 && (
                  <div className={Style.icon_text}>
                    <Markdown children={data?.icon_text2.data.icon_text2} />
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <div className={Style.image_wrapper}>
        <GatsbyImage
          image={getImage(
            data?.image_desktop?.localFile.childImageSharp.gatsbyImageData
          )}
          alt="product-image"
        />
      </div>
    </div>
  )
}

export default TextImage
