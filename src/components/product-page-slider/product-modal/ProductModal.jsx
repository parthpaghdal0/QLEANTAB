import React, { useContext } from "react"
import * as Style from "./ProductModal.module.scss"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import ProductContext from "../../../context/ProductContext"

const ProductModal = () => {
  const ctx = useContext(ProductContext)
  const zoomHandler = () => {
    ctx.setZoomModal(!ctx.zoomModal)
  }

  return (
    ctx.zoomModal && (
      <div onClick={zoomHandler} className={Style.zoomedModalActive}>
        <div className={Style.currentImageWrapperZoomed}>
          {ctx.modalImage && (
            <GatsbyImage
              image={getImage(ctx.modalImage[0].preview.image.gatsbyImageData)}
              alt="current-image"
            />
          )}
        </div>
      </div>
    )
  )
}

export default ProductModal
