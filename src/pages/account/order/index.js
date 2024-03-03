import React from "react"
import Layout from "../../../components/layout/Layout"
import AccountLayout from "../../../components/account-layout/AccountLayout"
import OrderList from "../../../components/account-componets/order-list/OrderList"
import { graphql } from "gatsby"
import useRedirect from "../../../custom-hooks/auth/useRedirect"
import FullPageLoader from "../../../components/UI/full-page-loader/FullPageLoader"
import useGlobalLang from "../../../custom-hooks/useGlobalLang"

const Order = ({ data }) => {
  const { GLOBAL_LANG } = useGlobalLang()
  const translatedData = data[GLOBAL_LANG]
  const { customerData } = useRedirect()

  return (
    <>
      {!customerData && <FullPageLoader />}
      <Layout hideFooter={true}>
        <AccountLayout>
          <OrderList data={translatedData} />
        </AccountLayout>
      </Layout>
    </>
  )
}

export default Order

export const query = graphql`
  fragment LangOrder on STRAPI_ORDER {
    heading
    orderText
    dateText
    trackingText
    statusText
    addressText
    orderViewBtn {
      title
    }
    orderStatus {
      statusName
      statusText
      statusColor
      textColor
    }
  }

  query {
    en: strapiOrder(locale: { eq: "en" }) {
      ...LangOrder
    }
    sv: strapiOrder(locale: { eq: "sv-SE" }) {
      ...LangOrder
    }
  }
`
