import React, { useState, useEffect, useRef } from "react"
import * as Style from "./CompareSection.module.scss"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import Markdown from "react-markdown"

const CompareSection = ({ data }) => {
  const isBrowser = typeof window !== "undefined"
  const image = data.image.localFile.childImageSharp.gatsbyImageData
  const title = data.title
  const isLeft = data.left
  const hasVideo = data.video
  const videoUrl = data.videoUrl

  const sectionRef = useRef(null)
  const [isSectionInView, setIsSectionInView] = useState(false)

  useEffect(() => {
    if (isBrowser) {
      const observer = new IntersectionObserver(entries => {
        setIsSectionInView(entries[0].isIntersecting)
      })

      observer.observe(sectionRef.current)

      return () => {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const content = data.copareIconText.map((item, index) => {
    return (
      <div
        className={`${Style.iconTextWrapper} ${isLeft ? Style.reverse : ""}`}
        key={index}
      >
        <div className={Style.iconWrapper}>
          <GatsbyImage
            image={getImage(
              item.icon.localFile.childImageSharp.gatsbyImageData
            )}
            alt="icon"
          />
        </div>
        <div className={Style.text}>
          <Markdown children={item.description.data.description} />
        </div>
      </div>
    )
  })

  return (
    <div className={Style.wrapper}>
      <div ref={sectionRef} className={Style.imageWrapper}>
        <GatsbyImage
          className={`${hasVideo ? Style.hiddenImage : ""}`}
          image={getImage(image)}
          alt="image"
        />
        {hasVideo && (
          <div className={Style.videoWrapper}>
            <iframe
              className={Style.video}
              src={`${videoUrl}${isSectionInView ? "?autoplay=1&mute=1&" : ""}`}
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>

      <div className={`${Style.titleWrapper} ${isLeft ? Style.reverse : ""}`}>
        <h5 className={Style.title}>{title}</h5>
        <div className={Style.line} />
      </div>
      <div className={`${Style.listWrapper}`}>{content}</div>
    </div>
  )
}

export default CompareSection
