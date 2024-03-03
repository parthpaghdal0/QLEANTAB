require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const { languages, defaultLanguage } = require("./languages")
const homepage = require(`${__dirname}/src/strapi-populates/homepage`)
const layout = require(`${__dirname}/src/strapi-populates/layout`)
const comingsoonpage = require(`${__dirname}/src/strapi-populates/comingsoonpage`)
const comingsoonpage2 = require(`${__dirname}/src/strapi-populates/comingsoonpage2`)
const collection_section = require(`${__dirname}/src/strapi-populates/collection-section`)
const terms_of_service = require(`${__dirname}/src/strapi-populates/terms-of-service`)
const quick_cart = require(`${__dirname}/src/strapi-populates/quick-cart`)
const privacy_policy = require(`${__dirname}/src/strapi-populates/privacy-policy`)
const all_products = require(`${__dirname}/src/strapi-populates/all-products`)
const products = require(`${__dirname}/src/strapi-populates/products`)
const side_cart = require(`${__dirname}/src/strapi-populates/side-cart`)
const starter_sets = require(`${__dirname}/src/strapi-populates/startersetspage`)
const refill = require(`${__dirname}/src/strapi-populates/refillpage`)
const howitworks = require(`${__dirname}/src/strapi-populates/howitworkspage`)
const learn = require(`${__dirname}/src/strapi-populates/learnpage`)
const qleannation = require(`${__dirname}/src/strapi-populates/qleannationpage`)
const faqpage = require(`${__dirname}/src/strapi-populates/faqpage`)
const shipping_and_returns = require(`${__dirname}/src/strapi-populates/shipping-and-returns`)
const single_product = require(`${__dirname}/src/strapi-populates/single-product`)
const shop = require(`${__dirname}/src/strapi-populates/shop`)
const page_cart = require(`${__dirname}/src/strapi-populates/page-cart`)
const affiliates = require(`${__dirname}/src/strapi-populates/affiliatespage`)
const contact_us = require(`${__dirname}/src/strapi-populates/contactuspage`)
const legal_notice = require(`${__dirname}/src/strapi-populates/legal-notice.js`)
const comingsoonpage3 = require(`${__dirname}/src/strapi-populates/comingsoonpage3`)
const helpertext = require(`${__dirname}/src/strapi-populates/helper-text`)
const testing_locale = require(`${__dirname}/src/strapi-populates/testing-locale`)
const sustainabilitypage = require(`${__dirname}/src/strapi-populates/sustainabilitypage`)
const reducingourimpactpage = require(`${__dirname}/src/strapi-populates/reducingourimpactpage`)
const paymentpolicypage = require(`${__dirname}/src/strapi-populates/paymentpolicypage`)
const collTitle = require(`${__dirname}/src/strapi-populates/coll-title`)
const yotpo = require(`${__dirname}/src/strapi-populates/yotpo`)
const blogpage = require(`${__dirname}/src/strapi-populates/blogpage`)
const articlepages = require(`${__dirname}/src/strapi-populates/articlepage`)
const account = require(`${__dirname}/src/strapi-populates/account`)
const signup = require(`${__dirname}/src/strapi-populates/signup`)
const login = require(`${__dirname}/src/strapi-populates/login`)
const recover = require(`${__dirname}/src/strapi-populates/recover`)
const acclayout = require(`${__dirname}/src/strapi-populates/acclayout`)
const detail = require(`${__dirname}/src/strapi-populates/detail`)
const landing = require(`${__dirname}/src/strapi-populates/landing`)
const address = require(`${__dirname}/src/strapi-populates/address`)
const order = require(`${__dirname}/src/strapi-populates/order`)
const sub = require(`${__dirname}/src/strapi-populates/sub`)

const strapiConfig = {
  // incremental: true,
  apiURL: process.env.STRAPI_API_URL,
  accessToken: process.env.STRAPI_TOKEN,
  collectionTypes: [
    collection_section,
    all_products,
    products,
    articlepages,
    landing,
  ],
  singleTypes: [
    layout,
    homepage,
    comingsoonpage,
    comingsoonpage2,
    terms_of_service,
    quick_cart,
    privacy_policy,
    side_cart,
    starter_sets,
    refill,
    howitworks,
    learn,
    qleannation,
    faqpage,
    shipping_and_returns,
    single_product,
    shop,
    page_cart,
    affiliates,
    contact_us,
    legal_notice,
    comingsoonpage3,
    helpertext,
    testing_locale,
    sustainabilitypage,
    reducingourimpactpage,
    paymentpolicypage,
    collTitle,
    yotpo,
    blogpage,
    account,
    signup,
    login,
    recover,
    acclayout,
    detail,
    address,
    order,
    sub,
  ],
}

module.exports = {
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-strapi`,
      options: strapiConfig,
    },
    {
      resolve: "gatsby-source-shopify",
      options: {
        password: process.env.SHOPIFY_APP_PASSWORD,
        storeUrl: process.env.GATSBY_MYSHOPIFY_URL,
        salesChannel: process.env.SHOPIFY_APP_ID,
        shopifyConnections: ["collections"],
        verbose: true,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `pages`,
    //     path: `${__dirname}/src/assets/images/tsveti-images/`,
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/locales`,
        name: `locale`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/assets/images`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        // id: "GTM-M5C4BGF",
        id: "GTM-NF2FHCN",

        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: true,
        defaultDataLayer: { platform: "gatsby" },
        enableWebVitalsTracking: true,
      },
    },
    {
      resolve: "gatsby-source-yotpo",
      options: {
        appKey: process.env.GATSBY_YOTPO_AK,
        appSecret: process.env.GATSBY_YOTPO_SK,
      },
    },
    {
      resolve: "gatsby-source-yotpo-webrika",
      options: {
        shopName: "qleantabstore",
        shopifyAccessToken: "f3ebce8b05dd1aea353729a0a4483cd5",
        yotpoAppKey: process.env.GATSBY_YOTPO_AK,
      },
    },
    // {
    //   resolve: "gatsby-source-yotpo",
    //   options: {
    //     appKey: "pWsntaUGcFirFBwAe4ddtW8gLjPaimvQxLgiV0JD",
    //     appSecret: "5bVPPShd6WdLYa5hMTzvHAwcaBYk5WjQ83DvkKcv",
    //   },
    // },
    // {
    //   resolve: "gatsby-source-yotpo-webrika",
    //   options: {
    //     shopName: "remiliahairstore",
    //     shopifyAccessToken: "7edcd83828576a9f4c58110a29689eb7",
    //     yotpoAppKey: "pWsntaUGcFirFBwAe4ddtW8gLjPaimvQxLgiV0JD",
    //   },
    // },
  ],
}
