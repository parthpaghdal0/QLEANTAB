import React from "react"
import * as Style from "./LandingVideo.module.scss"

const LandingVideo = ({ data }) => {
  // const title = data.title
  const videoUrl = data.videoUrl

  return (
    <section className={`main-container ${Style.wrapper}`}>
      {/* <h3 className={Style.title}>{title}</h3> */}{" "}
      <div className={Style.videoContainer}>
        <iframe
          className={Style.video}
          src={videoUrl}
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
    </section>
  )
}

export default LandingVideo
