import React from "react"
import AdressForm from "./add-adress/AdressForm"
import * as Style from "./AdressWrapper.module.scss"
import AddressPopup from "../../../UI/address-popup/AddressPopup"
import useAddress from "../../../../custom-hooks/auth/useAddress"
import AddressList from "./address-list/AddressList"
import Button from "../../../UI/custom-button/CustomButton"
import Loader from "../../../loader/Loader"

const AdressWrapper = ({ data }) => {
  const {
    mainHeading,
    notSelectedText,
    selectedText,
    addressForm,
    profileText,
    listBtn,
  } = data

  const addAdressBtnText = listBtn[1].title

  const {
    inputHandler,
    inputState,
    submit,
    submitHandler,
    loading,
    showForm,
    setShowForm,
    customerData,
    resetValidation,
    makeDefultHandler,
    deleteAddressHandler,
    editHandler,
  } = useAddress()

  const addNewAddressHandler = () => {
    resetValidation()
    setShowForm(!showForm)
  }

  return (
    <>
      <AddressPopup showForm={showForm} setShowForm={setShowForm}>
        <AdressForm
          data={addressForm}
          inputHandler={inputHandler}
          inputState={inputState}
          submit={submit}
          submitHandler={submitHandler}
          loading={loading}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      </AddressPopup>
      <section className={Style.addressSection}>
        {loading && (
          <div className={Style.loaderWrapper}>
            <Loader />
          </div>
        )}
        <h3 className={Style.heading}>{mainHeading}</h3>
        {customerData && customerData.defaultAddress ? (
          <AddressList
            defultAdress={customerData.defaultAddress}
            addresses={customerData.addresses.edges}
            notSelectedText={notSelectedText}
            selectedText={selectedText}
            profileText={profileText}
            selectBtn={listBtn[0].title}
            makeDefultHandler={makeDefultHandler}
            deleteAddressHandler={deleteAddressHandler}
            editHandler={editHandler}
          />
        ) : (
          <div>No address</div>
        )}
        <div className={Style.btnWrapper}>
          <Button
            style={Style.addMoreBtn}
            globalStyles={true}
            buttonHandler={addNewAddressHandler}
          >
            {addAdressBtnText}
          </Button>
        </div>
      </section>
    </>
  )
}

export default AdressWrapper
