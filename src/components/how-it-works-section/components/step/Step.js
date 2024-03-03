import React from "react"
import * as Style from "./step.module.scss"
import Markdown from "react-markdown"
import { getImage } from "gatsby-plugin-image"
import { GatsbyImage } from "gatsby-plugin-image"
import { TearIcon } from "../../../../assets/components/icons/Icons"

const Step = ({ data, index }) => {
  return (
    <>
      <div
        className={`${Style.step_component} ${
          index === 1 && Style.step_borders
        } step_component ${Style.desktop_section}`}
      >
        <div className={Style.tear}>
          <TearIcon />
          <span>{index + 1}</span>
        </div>
        <div className={Style.step_image}>
          <GatsbyImage
            image={getImage(
              data?.step_image.localFile.childImageSharp.gatsbyImageData
            )}
            alt="step-image"
          />
        </div>
        <div className={Style.step_description}>
          <Markdown children={data?.step_description?.data?.step_description} />
        </div>
      </div>
      <div
        className={`${Style.step_component} ${
          index === 1 && Style.step_borders
        } ${index === 2 && Style.no_border} step_component ${
          Style.mobile_section
        }`}
      >
        <div className={Style.step_image}>
          <GatsbyImage
            image={getImage(
              data?.step_image.localFile.childImageSharp.gatsbyImageData
            )}
            alt="step-image"
          />
        </div>
        <div className={Style.helper_wrapper}>
          <div className={Style.tear}>
            <TearIcon />
            <span>{index + 1}</span>
          </div>
          <div className={Style.step_description}>
            <Markdown children={data?.step_description?.data?.step_description} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Step
