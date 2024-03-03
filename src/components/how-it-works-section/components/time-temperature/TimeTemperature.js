import React from "react"
import Markdown from "react-markdown"
import { getImage } from "gatsby-plugin-image"
import { GatsbyImage } from "gatsby-plugin-image"
import * as Style from "./time-temperature.module.scss"

const TimeTemperature = ({ data }) => {
  return (
    <div className={Style.time_temperature_component}>
      <div>
        <div className={Style.image_wrapper}>
          <div className={Style.imageInnerWrapper}>
            <GatsbyImage
              image={getImage(
                data?.time_icon.localFile.childImageSharp.gatsbyImageData
              )}
              alt="step-number"
            />
          </div>
          <div className={Style.image_text}>
            <Markdown children={data?.icon_text?.data?.icon_text} />
          </div>
        </div>

        <div className={Style.text_wrapper}>
          <Markdown children={data?.heading?.data?.heading} />
          <Markdown children={data?.description?.data?.description} />
        </div>
      </div>
    </div>
  )
}

export default TimeTemperature
