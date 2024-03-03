import React, { useContext, useState, useEffect } from "react"
import CheckoutContext from "../../../context/CheckoutContext"
import CustomButton from "../../UI/custom-button/CustomButton"
import { DeleteIcon } from "../../../assets/components/icons/Icons"
import useTrackCart from "../../../custom-hooks/track-cart"

const DeleteControl = ({ id, item }) => {
  const { deleteHandler } = useTrackCart()
  const { removeLineItem } = useContext(CheckoutContext)

  const deleteItem = () => {
    deleteHandler(item)
    removeLineItem(id)
  }

  return (
    <CustomButton buttonHandler={deleteItem}>
      <DeleteIcon />
    </CustomButton>
  )
}

export default DeleteControl
