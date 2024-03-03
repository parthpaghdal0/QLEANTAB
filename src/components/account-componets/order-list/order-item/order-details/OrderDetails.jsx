import React from "react"
import * as Style from "./OrderDetails.module.scss"

const OrderDetails = ({ data, showDetails }) => {
  const content = data.map((item, index) => {
    return (
      <div
        className={`${Style.prodWrapper} ${showDetails ? Style.show : ""}`}
        key={index}
      >
        <div className={Style.prod}>
          <img className={Style.prodImg} src={item.node.variant.image.url} />
          <p>{`X ${item.node.quantity}`}</p>
          <p>{item.node.title}</p>
        </div>
        <p className={Style.price}>{`${(
          Number(item.node.variant.price) * Number(item.node.quantity)
        ).toFixed(2)} Kr`}</p>
      </div>
    )
  })
  return <div>{content}</div>
}

export default OrderDetails
