import React from "react"
import { getImage } from "gatsby-plugin-image"
import { GatsbyImage } from "gatsby-plugin-image"
import * as Style from "./banner-section.module.scss"
import CustomButton from "../UI/custom-button/CustomButton"
import Markdown from "react-markdown"
import { navigate } from "gatsby"


const BannerSection = ({
  data,
  textPageStyles,
  staticPage,
  bannerDiscover,
  setTitleWidth = false,
  setDescWidth = false,
}) => {
  const visitShopPage = () => {
    navigate(`${data.button.url}`)
  }
  const children = (
    <div
      className={`${Style.banner_section} ${textPageStyles && textPageStyles} ${
        staticPage && Style.static_page_styles
      } ${
        (data?.product_image_desktop || data?.product_image_mobile) &&
        Style.helper_class
      } ${bannerDiscover && Style.banner_discover} ${
        setDescWidth && Style.descWidth
      }`}
    >
      <div className={Style.text_wrapper}>
        {data?.heading && (
          <h1
            className={`${Style.heading} ${setTitleWidth && Style.titleWidth}`}
          >
            <Markdown children={data?.heading?.data?.heading} />
          </h1>
        )}
        {data?.description && (
          <Markdown children={data?.description?.data?.description} />
        )}
        {data?.button && (
          <>
            <CustomButton
              style={`${Style.banner_btn} ${Style.desktop_section}`}
              buttonHandler={visitShopPage}
              globalStyles={true}
              cta={true}
            >
              {data?.button.title}
            </CustomButton>
            <CustomButton
              style={`${Style.banner_btn} ${Style.mobile_section}`}
              buttonHandler={visitShopPage}
              globalStyles={true}
              cta={true}
            >
              {/* {data?.button.title_mobile} */}
              {data?.button.title}
            </CustomButton>
          </>
        )}
      </div>
      {(data?.product_image_desktop || data?.product_image_mobile) && (
        <div className={Style.image_wrapper}>
          {data?.product_image_desktop[0].localFile.childImageSharp
            .gatsbyImageData && (
            <div className={Style.desktop_section}>
              <GatsbyImage
                image={getImage(
                  data?.product_image_desktop[0]?.localFile?.childImageSharp
                    .gatsbyImageData
                )}
                alt="product-image"
              />
            </div>
          )}

          {data?.product_image_mobile[0]?.localFile?.childImageSharp
            .gatsbyImageData && (
            <div className={Style.mobile_section}>
              <GatsbyImage
                class={Style.mobile_section}
                image={getImage(
                  data?.product_image_mobile[0].localFile.childImageSharp
                    .gatsbyImageData
                )}
                alt="product-image"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )

  return (
    <>
      <div
        className={Style.desktop_section}
        style={{
          backgroundImage: `url(${data?.background_image_desktop[0].url})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {children}
      </div>
      <div
        className={Style.mobile_section}
        style={{
          backgroundImage: `url(${data?.background_image_mobile[0].url})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {children}
      </div>
    </>
  )
}

export default BannerSection
