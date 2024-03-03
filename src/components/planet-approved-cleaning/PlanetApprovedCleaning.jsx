import React from "react"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import * as Styles from "./PlanetApprovedCleaning.module.scss"

const PlanetApprovedCleaning = ({ data, withImageInfo }) => {
  return (
    <div className={`${Styles.mainContainer} ${withImageInfo && Styles.mainContainer2}`}>
      <div className={Styles.textContainer}>
        <h3 className={Styles.title}>{data?.heading}</h3>
        <p className={Styles.description}>
          {data?.description?.data?.description}
        </p>
      </div>
      <div className={Styles.imagesContainer}>
        {data?.planet_media.map((el, index) => {
          return (
            <div className={Styles.image} key={index}>
              <GatsbyImage
                image={getImage(
                  el.icon.localFile.childImageSharp.gatsbyImageData
                )}
                alt="icon-image"
              />
              {el.title && <p className={Styles.iconTitle}>{el.title}</p>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PlanetApprovedCleaning
