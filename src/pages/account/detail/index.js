import React from "react"
import Layout from "../../../components/layout/Layout"
import AccountLayout from "../../../components/account-layout/AccountLayout"
import DetailWrapper from "../../../components/account-componets/forms/detail-form/DetailWrapper"
import MessagePopUp from "../../../components/UI/message-popup/MessagePopUp"
import { graphql } from "gatsby"
import useRedirect from "../../../custom-hooks/auth/useRedirect"
import FullPageLoader from "../../../components/UI/full-page-loader/FullPageLoader"
import useGlobalLang from "../../../custom-hooks/useGlobalLang"

const Detail = ({ data }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  const translatedData = data[GLOBAL_LANG]
  const { customerData } = useRedirect()

  return (
    <>
      {!customerData && <FullPageLoader />}
      <MessagePopUp />
      <Layout hideFooter={true}>
        <AccountLayout>
          <DetailWrapper data={translatedData} />
        </AccountLayout>
      </Layout>
    </>
  )
}

export default Detail

export const query = graphql`
  fragment LangDetail on STRAPI_DETAIL {
    heading
    subHeading
    detailForm {
      formButton {
        type
        title
        description {
          data {
            description
          }
        }
      }
      formInput {
        errText
        label
        name
        placeholder
        required
        type
        description {
          data {
            description
          }
        }
        icon {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
      }
      formTitle
      formType
    }
  }

  query {
    en: strapiDetail(locale: { eq: "en" }) {
      ...LangDetail
    }
    sv: strapiDetail(locale: { eq: "sv-SE" }) {
      ...LangDetail
    }
  }
`
