import React from "react"
import Layout from "../../../components/layout/Layout"
import AccountLayout from "../../../components/account-layout/AccountLayout"
import { graphql } from "gatsby"
import SubList from "../../../components/account-componets/sub-list/SubList"
import useRedirect from "../../../custom-hooks/auth/useRedirect"
import FullPageLoader from "../../../components/UI/full-page-loader/FullPageLoader"
import useGlobalLang from "../../../custom-hooks/useGlobalLang"

const Sub = ({ data }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  const translatedData = data[GLOBAL_LANG]
  const { customerData } = useRedirect()

  return (
    <>
      {!customerData && <FullPageLoader />}
      <Layout hideFooter={true}>
        <AccountLayout>
          <SubList data={translatedData} />
        </AccountLayout>
      </Layout>
    </>
  )
}

export default Sub

export const query = graphql`
  fragment LangSub on STRAPI_SUB {
    addressText
    dateText
    heading
    orderText
    statusText
    trackingText
    subBtn {
      title
    }
    subStatus {
      statusName
      statusText
    }
    subForm {
      formTitle
      formType
      formButton {
        title
        type
        description {
          data {
            description
          }
        }
      }
      formInput {
        label
        name
        placeholder
        type
        errText
        description {
          data {
            description
          }
        }
        required
      }
    }
  }

  query {
    en: strapiSub(locale: { eq: "en" }) {
      ...LangSub
    }
    sv: strapiSub(locale: { eq: "sv-SE" }) {
      ...LangSub
    }
  }
`
