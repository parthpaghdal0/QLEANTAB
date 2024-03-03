import React, { useContext, useState, useEffect } from "react"
import OrderItem from "./order-item/OrderItem"
import CheckoutContext from "../../../context/CheckoutContext"
import * as Style from "./OrderList.module.scss"

const OrderList = ({ data }) => {
  const { customerData } = useContext(CheckoutContext)
  const [orders, setOrders] = useState([])
  const statusCodes = data.orderStatus
  const buttonText = data.orderViewBtn

  useEffect(() => {
    if (customerData?.orders?.edges) {
      setOrders(customerData.orders.edges)
    }
  }, [customerData])

  const content = orders.map((order, i) => {
    return (
      <OrderItem
        key={i}
        orderData={order.node}
        statusCodes={statusCodes}
        buttonText={buttonText}
        orderText={data.orderText}
        dateText={data.dateText}
        trackingText={data.trackingText}
        addressText={data.addressText}
        statusText={data.statusText}
      />
    )
  })

  return (
    <section className={Style.orderSection}>
      <h3 className={Style.heading}>{data.heading}</h3>
      <div className={Style.orderWrapper}>{content}</div>
    </section>
  )
}

export default OrderList
