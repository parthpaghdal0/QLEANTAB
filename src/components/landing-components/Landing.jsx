import React from "react"
import * as Style from "./Landing.module.scss"
import LandingLayout from "./landing-layout/LandingLayout"
import LandingBanner from "./landing-banner/LandingBanner"
import LandingIconSection from "./landing-icon-section/LandingIconSection"
import LandingProduct from "./landing-product/LandingProduct"
import LandingImageText from "./landing-image-text/LandingImageText"
import LandingCompare from "./landing-compare/LandingCompare"
import LandingVideo from "./landing-video/LandingVideo"
import LandingReview from "./landing-review/LandingReview"

const Landing = ({ data, shopifyProduct }) => {
  const layout = {
    header: data.ladingHeader,
    footer: data.ladingFooter,
  }
  const bannerData = data.ladingBanner
  const iconSectionData = data.ladingIconSection
  const landingProduct = data.ladingProduct
  const imageText = data.ladingImageText
  const compare = data.ladingCompare
  // const video = data.ladingVideo
  const reviews = data.ladingReview

  const ladingSectionsArray = [
    {
      component: <LandingBanner data={bannerData} />,
      order: Number(bannerData.order),
    },
    {
      component: <LandingIconSection data={iconSectionData} />,
      order: Number(iconSectionData.order),
    },
    {
      component: (
        <LandingProduct data={landingProduct} shopifyProduct={shopifyProduct} />
      ),
      order: Number(landingProduct.order),
    },
    {
      component: <LandingImageText data={imageText} />,
      order: Number(imageText.order),
    },
    {
      component: <LandingCompare data={compare} />,
      order: Number(compare[0].order),
    },
    // {
    //   component: <LandingVideo data={video} />,
    //   order: Number(video.order),
    // },
    {
      component: <LandingReview data={reviews} />,
      order: Number(reviews.order),
    },
  ]

  const content = ladingSectionsArray.sort((a, b) => {
    return a.order - b.order
  })

  return (
    <LandingLayout data={layout}>
      {content.map((ele, index) => {
        return <section key={index}>{ele.component}</section>
      })}
    </LandingLayout>
  )
}

export default Landing
