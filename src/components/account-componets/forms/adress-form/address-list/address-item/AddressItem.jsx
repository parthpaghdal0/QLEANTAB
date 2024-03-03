import React from "react"
import Button from "../../../../../UI/custom-button/CustomButton"
import * as Style from "./AddressItem.module.scss"
import {
  AddressEdit,
  AddressDelete,
} from "../../../../../../assets/components/icons/Icons"

const AddressItem = ({
  htmlId,
  // profileText,
  // index,
  notSelectedText,
  selectedText,
  selectBtn,
  firstName,
  lastName,
  address1,
  address2,
  id,
  defult,
  makeDefultHandler,
  deleteAddressHandler,
  fullAddresData,
  editHandler,
}) => {
  return (
    <div id={htmlId} className={Style.addressListWrapper}>
      <div className={defult ? Style.defultBackground : ""}>
        <div className={Style.listAddressTextWrapper}>
          <div>
            <p className={Style.addressName}>{`${address1} ${
              address2 ? address2 : ""
            }`}</p>
            <p className={Style.selected}>
              {defult ? selectedText : notSelectedText}
            </p>
          </div>

          <Button
            buttonHandler={makeDefultHandler.bind(this, id)}
            style={`${Style.selectBtn} ${defult ? Style.hideDefultBtn : ""}`}
          >
            {selectBtn}
          </Button>
        </div>
        <div className={Style.addressItemWrapper}>
          <div className={Style.nameAndAddressWrapper}>
            <p className={Style.nameText}>{`${firstName} ${lastName}`}</p>
            {/* <p className={Style.addressText}>{`${address1} ${address2}`}</p> */}
          </div>
          <div className={Style.delEditbtnWrapper}>
            <Button buttonHandler={editHandler.bind(this, fullAddresData, id)}>
              <AddressEdit />
            </Button>
            <Button buttonHandler={deleteAddressHandler.bind(this, id)}>
              <AddressDelete />
            </Button>
          </div>
        </div>
      </div>

      <div className={Style.borderHelper} />
    </div>
  )
}

export default AddressItem
