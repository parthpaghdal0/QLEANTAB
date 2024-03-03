import React from "react"
import * as Style from "./image-and-text.module.scss"
import Markdown from "react-markdown"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const ImageAndText = ({ data }) => {
 
  return (
    <section
      style={{
        backgroundColor: data?.background ? data.background : "#E7F4EF",
      }}
      className={Style.image_and_text}
    >
      <div
        className={`${
          data?.imageOnLeft ? Style.left_image : Style.right_image
        } ${Style.wrapper}`}
      >
        <div className={Style.image_container}>
          <GatsbyImage
            image={getImage(
              data?.image[0].localFile?.childrenImageSharp[0].gatsbyImageData
            )}
            alt="image"
          />
        </div>
        <div className={`${Style.text_container} ${Style.text_left_container}`}>
          {data?.heading && <h3 className={Style.heading}>{data.heading}</h3>}
          {data?.paragraph && (
            <>
              {data.paragraph.map((item, index) => (
                <Markdown
                  children={item.pargraph.data.pargraph}
                  key={index}
                  className={Style.text_content}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default ImageAndText
