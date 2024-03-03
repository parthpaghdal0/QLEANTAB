import React, { useContext } from "react"
import CheckoutContext from "../../../context/CheckoutContext"
import * as Style from "./QuantityControl.module.scss"
import { PlusIcon, MinusIcon } from "../../../assets/components/icons/Icons"
import useTrackCart from "../../../custom-hooks/track-cart"

const QuantityControl = ({ id, quantity, sellingPlanAllocation, item }) => {
  const { updateLineItem, updateSubscriptionLineItem } =
    useContext(CheckoutContext)
  const { deleteHandler } = useTrackCart()

  // console.log(item.node.merchandise.title)

  const updateCart = (variantId, quantity, mode) => {
    if (!sellingPlanAllocation) {
      updateLineItem({ variantId, quantity }, mode, {
        location: null,
        item: {
          id: item.node.merchandise.product.id,
          quantity: 1,
          sub: false,
          variant: item.node.merchandise.title,
        },
      })
    } else {
      updateSubscriptionLineItem(
        {
          variantId,
          quantity,
          sellingPlanId: sellingPlanAllocation?.sellingPlan?.id,
        },
        mode,
        {
          location: null,
          item: {
            id: item.node.merchandise.product.id,
            quantity: 1,
            sub: true,
            variant: item.node.merchandise.title,
          },
        }
      )
    }
  }

  return (
    <div className={Style.quantity}>
      <div
        onClick={() => {
          deleteHandler(item, "single")
          updateCart(id, -1, "remove")
        }}
        className={Style.quantity_icon_minus}
      >
        <MinusIcon />
      </div>
      <p className={Style.quantPar}> {quantity}</p>
      <div
        onClick={() => updateCart(id, +1, "defult")}
        className={Style.quantity_icon_plus}
      >
        <PlusIcon />
      </div>
    </div>
  )
}

export default QuantityControl
