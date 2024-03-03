import React from "react"
import { graphql } from "gatsby"
import Layout from "../../../components/layout/Layout"
import AccountLayout from "../../../components/account-layout/AccountLayout"
import AdressWrapper from "../../../components/account-componets/forms/adress-form/AdressWrapper"
import MessagePopUp from "../../../components/UI/message-popup/MessagePopUp"
import useRedirect from "../../../custom-hooks/auth/useRedirect"
import FullPageLoader from "../../../components/UI/full-page-loader/FullPageLoader"
import useGlobalLang from "../../../custom-hooks/useGlobalLang"

const Adress = ({ data }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  const translatedData = data[GLOBAL_LANG]
  const { customerData } = useRedirect()

  return (
    <>
      {!customerData && <FullPageLoader />}
      <MessagePopUp />
      <Layout hideFooter={true}>
        <AccountLayout>
          <AdressWrapper data={translatedData} />
        </AccountLayout>
      </Layout>
    </>
  )
}

export default Adress

export const query = graphql`
  fragment LangAddress on STRAPI_ADDRESS {
    addressForm {
      formTitle
      formType
      formInput {
        type
        placeholder
        label
        name
        required
        errText
        description {
          data {
            description
          }
        }
      }
      formButton {
        type
        title
      }
    }
    selectedText
    notSelectedText
    mainHeading
    profileText
    listBtn {
      title
    }
  }

  query {
    en: strapiAddress(locale: { eq: "en" }) {
      ...LangAddress
    }
    sv: strapiAddress(locale: { eq: "sv-SE" }) {
      ...LangAddress
    }
  }
`
