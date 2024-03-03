import React, { useLayoutEffect, useState } from "react"
import * as Style from "./homepage-collection.module.scss"
import useWindowWidth from "../../custom-hooks/useWindowWidth"
import { GatsbyImage } from "gatsby-plugin-image"
import Markdown from "react-markdown"
import CustomButton from "../UI/custom-button/CustomButton"
import { navigate } from "gatsby"
import Raiting from "../raiting/Raiting"
import useGlobalLang from "../../custom-hooks/useGlobalLang"

const HomepageCollection = ({
  data,
  isMobileInline = false,
  mode,
  isSustainabilityPage,
}) => {
  const { GLOBAL_LANG } = useGlobalLang()
  const isBrowser = typeof window !== "undefined"
  const windowWidth = useWindowWidth()
  const [image, setImage] = useState(null)

  useLayoutEffect(() => {
    if (isBrowser) {
      setImage(
        windowWidth > 992 ? data?.background?.url : data?.mobileBackground?.url
      )
    }
  }, [windowWidth, isBrowser])

  const navigateHandler = () => {
    const url = GLOBAL_LANG === "en" ? `/en${data?.handle}` : data?.handle
    navigate(url)
  }

  return (
    <section className={`${Style.container}`}>
      <GatsbyImage
        image={data?.background?.localFile?.childImageSharp?.gatsbyImageData}
        alt={`${data?.heading}-image`}
        objectFit="contain"
        className={Style.desktop_image}
      />
      <GatsbyImage
        image={
          data?.mobileBackground?.localFile?.childImageSharp?.gatsbyImageData
        }
        alt={`${data?.heading}-image`}
        className={Style.mobile_image}
      />
      <div
        className={`main-container ${Style.text_wrapper} ${
          data?.layoutClass ? Style[`${data.layoutClass}`] : ""
        } ${isSustainabilityPage && Style.sustainabilityCollection}`}
      >
        <div
          className={`${Style.text_container} ${
            data?.imageOnLeft ? Style.right_image : ""
          }`}
        >
          <h3 className={Style.heading}>{data?.heading}</h3>
          {data.productId && (
            <Raiting
              styleClass={Style.rating}
              productid={data.productId}
              collectionItem={true}
            />
          )}
          {data?.content && (
            <>
              {data?.content.map((item, index) => (
                <Markdown
                  children={item.pargraph.data.pargraph}
                  key={index}
                  className={`${Style.paragraph} ${
                    mode === "affiliates" ? Style.paragraph_affiliates : ""
                  } ${
                    isMobileInline && isMobileInline === index
                      ? Style.mobile_paragraph
                      : ""
                  }`}
                />
              ))}

              {data?.button && (
                <div>
                  <CustomButton
                    buttonHandler={navigateHandler}
                    globalStyles={true}
                    cta={true}
                    style={`${Style.button} ${Style[data?.buttonClass]}`}
                  >
                    {data?.button?.title}
                  </CustomButton>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default HomepageCollection
