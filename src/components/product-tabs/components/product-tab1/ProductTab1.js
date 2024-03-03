import React from "react"
import TextImage from "./components/TextImage"

const ProductTab1 = ({ data }) => {
  const blocks = data?.section.map((el, index) => {
    return <TextImage key={index} data={el} />
  })
  return <div>{blocks}</div>
}

export default ProductTab1
