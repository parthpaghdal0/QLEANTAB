import React from "react"
import * as Style from "./AddressList.module.scss"
import AddressItem from "./address-item/AddressItem"

const AddressList = ({
  addresses,
  defultAdress,
  notSelectedText,
  selectedText,
  profileText,
  selectBtn,
  makeDefultHandler,
  deleteAddressHandler,
  editHandler,
}) => {
  const defultAddressItem = (
    <AddressItem
      htmlId={"defultAddress"}
      profileText={profileText}
      index={-1}
      notSelectedText={notSelectedText}
      selectedText={selectedText}
      selectBtn={selectBtn}
      firstName={defultAdress.firstName}
      lastName={defultAdress.lastName}
      address1={defultAdress.address1}
      address2={defultAdress.address2}
      id={defultAdress.id}
      defult={true}
      makeDefultHandler={makeDefultHandler}
      deleteAddressHandler={deleteAddressHandler}
      fullAddresData={defultAdress}
      editHandler={editHandler}
    />
  )

  const addressList = addresses.map((item, index) => {
    if (item.node.id !== defultAdress.id) {
      return (
        <AddressItem
          key={index}
          htmlId={(Math.random() * Math.random()).toString()}
          profileText={profileText}
          index={index}
          notSelectedText={notSelectedText}
          selectedText={selectedText}
          selectBtn={selectBtn}
          firstName={item.node.firstName}
          lastName={item.node.lastName}
          address1={item.node.address1}
          address2={item.node.address2}
          id={item.node.id}
          defult={false}
          makeDefultHandler={makeDefultHandler}
          deleteAddressHandler={deleteAddressHandler}
          fullAddresData={item.node}
          editHandler={editHandler}
        />
      )
    }
  })

  return (
    <div className={Style.addressWrapper}>
      <>{defultAddressItem}</>
      <>{addressList}</>
    </div>
  )
}

export default AddressList
