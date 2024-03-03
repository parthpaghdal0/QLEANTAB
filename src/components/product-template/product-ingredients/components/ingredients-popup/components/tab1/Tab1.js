import React from "react"
import * as Style from "./tab1.module.scss"
import TextImage from "../../../../../../product-tabs/components/product-tab1/components/TextImage"
import Markdown from "react-markdown"
import { getImage } from "gatsby-plugin-image"
import { GatsbyImage } from "gatsby-plugin-image"
import CustomButton from "../../../../../../UI/custom-button/CustomButton"

const Tab1 = ({ data, togglePopup, closeText }) => {
  return (
    <div
      className={`${Style.tab1} ${
        data?.section[0].columns_reverse && Style.columns_reverse
      }`}
      style={
        data?.section[0].background_image
          ? {
              backgroundImage: `url(${data?.section[0].background_image.localFile.url})`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundColor: data?.section[0].background_color,
            }
          : { backgroundColor: data?.section[0].background_color }
      }
    >
      <div className={Style.text_wrapper}>
        <div className={Style.heading}>
          <Markdown children={data?.section[0].heading?.data.heading} />
        </div>
        <div className={Style.description}>
          <Markdown children={data?.section[0].description?.data.description} />
        </div>
        {(data?.section[0].icon_image1 || data?.section[0].icon_image2) && (
          <div className={Style.icons_wrapper}>
            {data?.section[0].icon_image1 && (
              <div className={Style.icon}>
                <div className={Style.icon_wrapper}>
                  <GatsbyImage
                    image={getImage(
                      data?.section[0].icon_image1.localFile.childImageSharp
                        .gatsbyImageData
                    )}
                    alt="icon-image"
                  />
                </div>
                {data?.section[0].icon_text1 && (
                  <div className={Style.icon_text}>
                    <Markdown
                      children={data?.section[0].icon_text1.data.icon_text1}
                    />
                  </div>
                )}
              </div>
            )}
            {data?.section[0].icon_image2 && (
              <div className={Style.icon}>
                <div className={Style.icon_wrapper}>
                  <GatsbyImage
                    image={getImage(
                      data?.section[0].icon_image2.localFile.childImageSharp
                        .gatsbyImageData
                    )}
                    alt="icon-image"
                  />
                </div>
                {data?.section[0].icon_text2 && (
                  <div className={Style.icon_text}>
                    <Markdown
                      children={data?.section[0].icon_text2.data.icon_text2}
                    />
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
            data?.section[0].image_desktop?.localFile.childImageSharp
              .gatsbyImageData
          )}
          alt="product-image"
        />
      </div>
      <CustomButton
        style={Style.close}
        globalStyles={true}
        buttonHandler={() => togglePopup()}
      >
        {closeText}
      </CustomButton>
    </div>
  )
}

export default Tab1
