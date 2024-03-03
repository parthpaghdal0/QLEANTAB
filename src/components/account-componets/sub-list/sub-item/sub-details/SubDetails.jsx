import React from "react"
import * as Style from "./SubDetails.module.scss"

const SubDetails = ({
  title,
  variant_title,
  quantity,
  next_charge_scheduled_at,
  order_interval_frequency,
  price,
  showDetails,
}) => {
  const formatedDate = new Date(next_charge_scheduled_at).toLocaleDateString(
    "en-US",
    {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }
  )
  return (
    <div className={`${Style.prodWrapper} ${showDetails ? Style.show : ""}`}>
      <div className={Style.innerWrapper}>
        <div className={Style.prod}>
          <p>{`${title} ${variant_title}`}</p>
          <p>{`X ${quantity}`}</p>
          <p>{`Every ${order_interval_frequency} days`}</p>
        </div>
        <p className={Style.price}>{`${(
          Number(price) * Number(quantity)
        ).toFixed(2)} Kr`}</p>
      </div>
      <div className={Style.nextChargeWrapper}>
        <p className={Style.nextChargeText}>Next charge:</p>
        <p>{`${formatedDate}`}</p>
      </div>
    </div>
  )
}

export default SubDetails
