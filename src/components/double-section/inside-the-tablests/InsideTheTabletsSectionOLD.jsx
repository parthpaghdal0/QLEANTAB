import React from "react"
import * as Style from "./InsideTheTabletsSection.module.scss"
import { GatsbyImage } from "gatsby-plugin-image"
import Markdown from "react-markdown"

const InsideTheTabletsSection = ({ data }) => {

  return (
    <section className={Style.insideTabMainWrapper}>
      <div className={Style.textSection}>
        <div className={Style.textWrapper}>
          <div className={Style.heading}>
            <Markdown children={data.heading.data.heading} />
          </div>
          <div className={Style.pargraph}>
            <Markdown children={data.pargraph_one.data.pargraph_one} />
          </div>
          <div className={Style.pargraphMobile}>
            {data.pargraph_one.data.pargraph_one}
          </div>
          <div className={Style.pargraph}>
            <Markdown children={data.pargraph_two.data.pargraph_two} />
          </div>
          <div className={Style.pargraphMobile}>
            {data.pargraph_two.data.pargraph_two}
          </div>
          <div className={Style.pargraph}>
            <Markdown children={data.pargraph_three.data.pargraph_three} />
          </div>
          <div className={Style.pargraphMobile}>
            {data.pargraph_three.data.pargraph_three}
          </div>
        </div>
      </div>
      <div
        className={Style.imgSection}
        style={{
          background: `url(${data.insidetab_bg.localFile.url}) no-repeat center/contain`,
          // backgroundSize: "100vw",
        }}
      >
        <div className={Style.iconTextWrapperOne}>
          <div className={Style.iconContainer}>
            <GatsbyImage
              image={
                data.inside_icon[0].icon_image.localFile.childImageSharp
                  .gatsbyImageData
              }
              alt="mobile_menu_icon"
            />
          </div>
          <div className={Style.iconText}>
            <Markdown children={data.inside_icon[0].heading.data.heading} />
          </div>
        </div>
        <div className={Style.iconTextWrapperTwo}>
          <div className={Style.iconContainer}>
            <GatsbyImage
              image={
                data.inside_icon[1].icon_image.localFile.childImageSharp
                  .gatsbyImageData
              }
              alt="mobile_menu_icon"
            />
          </div>
          <div className={Style.iconText}>
            <Markdown children={data.inside_icon[1].heading.data.heading} />
          </div>
        </div>
        <div className={Style.iconTextWrapperThree}>
          <div className={Style.iconContainer}>
            <GatsbyImage
              image={
                data.inside_icon[2].icon_image.localFile.childImageSharp
                  .gatsbyImageData
              }
              alt="mobile_menu_icon"
            />
          </div>
          <div className={Style.iconText}>
            <Markdown children={data.inside_icon[2].heading.data.heading} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default InsideTheTabletsSection
