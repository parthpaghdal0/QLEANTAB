import React from "react"
import * as Style from "./InsideTheTabletsSection.module.scss"
import { GatsbyImage } from "gatsby-plugin-image"
import Markdown from "react-markdown"

const InsideTheTabletsSection = ({ data }) => {
  const textBlocks = data.inside_icon.map((el, index) => {
    return (
      <div
        key={index}
        className={`${Style.icon_text} ${Style[`text${index + 1}`]}`}
      >
        <div className={Style.number}>{index + 1}</div>
        <div className={Style.text}>
          <Markdown children={el.heading.data.heading} />
        </div>
      </div>
    )
  })
  const textBlocksMobile = data.inside_icon.map((el, index) => {
    return (
      <div
        key={index}
        className={`${Style.block_mobile} ${Style[`text_mob${index + 1}`]}`}
      >
        <span>{index + 1}.</span>
        <Markdown children={el.heading.data.heading} />
      </div>
    )
  })
  const onlyNumbers = data.inside_icon.map((el, index) => {
    return (
      <div
        key={index}
        className={`${Style.number_mobile} ${Style[`number${index + 1}`]}`}
      >
        {index + 1}
      </div>
    )
  })
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
          <Markdown children={data.pargraph_one.data.pargraph_one} />
          </div>
          <div className={Style.pargraph}>
            <Markdown children={data.pargraph_two.data.pargraph_two} />
          </div>
          <div className={Style.pargraphMobile}>
            <Markdown children={data.pargraph_two.data.pargraph_two} />
          </div>
          <div className={Style.pargraph}>
            <Markdown children={data.pargraph_three.data.pargraph_three} />
          </div>
          <div className={Style.pargraphMobile}>
            <Markdown children={data.pargraph_three.data.pargraph_three} />
          </div>
        </div>
      </div>
      <div
        className={Style.imgSection}
        style={{
          background: `url(${data.insidetab_bg.localFile.url})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className={Style.decoration_wrapper}>
          <GatsbyImage
            image={data.single_icon.localFile.childImageSharp.gatsbyImageData}
            alt="mobile_menu_icon"
          />
        </div>

        {textBlocks}
        {onlyNumbers}
        <div className={Style.icon_text_mobile}>{textBlocksMobile}</div>
      </div>
    </section>
  )
}

export default InsideTheTabletsSection
