import React, { useState } from "react"
import Button from "../../../UI/custom-button/CustomButton"
import OrderDetails from "./order-details/OrderDetails"
import * as Style from "./OrderItem.module.scss"

const OrderItem = ({
  statusCodes,
  buttonText,
  orderData,
  orderText,
  dateText,
  trackingText,
  addressText,
  statusText,
}) => {
  const [showDetails, setShowDetails] = useState(false)

  const formatedDate = new Date(orderData.processedAt).toLocaleDateString(
    "en-US",
    {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }
  )

  const transformededStatus = statusCodes.find(item => {
    return item.statusName === orderData.fulfillmentStatus
  })

  return (
    <>
      <div className={Style.orderWrapper}>
        <div className={Style.textBtnWrapper}>
          <div>
            <p
              className={Style.orderText}
            >{`${orderText} ${orderData.orderNumber}`}</p>
            <p className={Style.date}>{`${dateText} ${formatedDate}`}</p>
          </div>

          <Button
            buttonHandler={setShowDetails.bind(this, !showDetails)}
            style={Style.btn}
            globalStyles={true}
          >
            {!showDetails ? buttonText[0].title : buttonText[1].title}
          </Button>
        </div>
        <div className={Style.bottomWrapper}>
          <p>{`${trackingText} ${orderData.name}`}</p>
          <p>{`${addressText} ${orderData.shippingAddress.address1} ${orderData.shippingAddress.city}`}</p>
          <div className={Style.statusWrapper}>
            <p>{statusText}</p>
            <div
              className={`${Style.statusBox} ${
                Style[`${transformededStatus.statusName}`]
              }`}
            >
              {transformededStatus.statusText}
            </div>
          </div>
        </div>
        <OrderDetails
          data={orderData.lineItems.edges}
          showDetails={showDetails}
        />
      </div>
      <div className={Style.divider} />
    </>
  )
}

export default OrderItem
