import React from "react"
import * as Style from "./LandingBanner.module.scss"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { navigate } from "gatsby"
import Markdown from "react-markdown"
import Button from "../../UI/custom-button/CustomButton"

const LandingBanner = ({ data }) => {
  const isBrowser = typeof window !== "undefined"
  const logo = data.logo.localFile.childImageSharp.gatsbyImageData
  const mainHeading = data.mainHeading.data.mainHeading
  const description = data.description.data.description
  const cta = data.ladingButton
  const bgDesktop = data.bgDesktop.url
  const bgMobile = data.bgMobile.url

  const buyNowHandler = () => {
    if (isBrowser) {
      const buyBtn = document.querySelector(".buy-landing-cta")
      buyBtn.click()
    }
  }

  const iconTextContet = data.ladingIconText.map((item, index) => {
    return (
      <div key={index} className={Style.iconTextWrapper}>
        <div className={Style.icon}>
          <GatsbyImage
            image={getImage(
              item.icon.localFile.childImageSharp.gatsbyImageData
            )}
            alt="logo"
          />
        </div>
        <div className={Style.text}>
          <Markdown children={item.description.data.description} />
        </div>
      </div>
    )
  })

  const content = (
    <>
      <div className={Style.logo}>
        <GatsbyImage image={getImage(logo)} alt="logo" />
      </div>
      <h1 className={Style.mainHeading}>
        <Markdown children={mainHeading} />
      </h1>
      <div className={Style.iconTextSection}>{iconTextContet}</div>
      <div className={Style.description}>
        <Markdown children={description} />
      </div>
      <div className={Style.ctaWrapper}>
        <Button style={Style.cta} buttonHandler={buyNowHandler}>
          {cta.title}
        </Button>
        {/* <Button style={Style.cta} buttonHandler={navigate.bind(this, cta.url)}>
          {cta.title}
        </Button> */}
      </div>
    </>
  )

  return (
    <>
      <section
        style={{
          backgroundImage: `url(${bgDesktop})`,
        }}
        className={`main-container ${Style.wrapper} ${Style.desktop}`}
      >
        {content}
      </section>
      <section
        style={{
          backgroundImage: `url(${bgMobile})`,
        }}
        className={`main-container ${Style.wrapper} ${Style.mobile}`}
      >
        {content}
      </section>
    </>
  )
}

export default LandingBanner
