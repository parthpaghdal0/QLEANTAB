import React from "react"
import * as Style from "./DetailWrapper.module.scss"
import ChangeNameForm from "./change-name/ChangeNameForm"
import ChangePasswordForm from "./change-password/ChangePasswordForm"
import DeleteAccForm from "./delete-acc/DeleteAccForm"

const DetailWrapper = ({ data }) => {
  const heading = data.heading
  const subHeading = data.subHeading
  const formData = data.detailForm

  return (
    <section className={Style.detailSection}>
      <h3 className={Style.heading}>{heading}</h3>
      <h4 className={Style.subHeading}>{subHeading}</h4>
      <ChangeNameForm data={formData[0]} />
      <ChangePasswordForm data={formData[1]} />
      <DeleteAccForm data={formData[2]} />
    </section>
  )
}

export default DetailWrapper
