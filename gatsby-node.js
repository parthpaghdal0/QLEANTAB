const path = require("path")
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const { createRemoteFileNode } = module.require(`gatsby-source-filesystem`)
exports.onCreateNode = async ({
  node,
  actions: { createNode, deleteNode },
  store,
  cache,
  createNodeId,
}) => {
  let fileNode
  try {
    if (node.internal.type === "STRAPI_PRODUCT") {
      // console.log(node.sellingPlanGroups___NODE)
      // if (
      //   node.sellingPlanGroups___NODE === "fdf1a770-38a7-5221-86cf-2889b0746b24" ||  node.sellingPlanGroups___NODE === "08eefe7e-42b6-51a0-aa47-ffb2bb92c558"
      // ) {
      //   console.log(node)
      // }
      // fileNode = await createRemoteFileNode({
      //   parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      //   createNode, // helper function in gatsby-node to generate the node
      //   createNodeId, // helper function in gatsby-node to generate the node
      //   cache, // Gatsby's cache
      //   store, // Gatsby's Redux store
      // })
    }
  } catch (error) {
    console.log(error)
  }
  // if the file was created, attach the new node to the parent node
  if (fileNode) {
    console.log(fileNode)
    node.sellingPlanGroups___NODE = fileNode.id
    // const fileNodeID = fileNode.id
    // await cache.set(remoteDataCacheKey, { fileNodeID })
  }
}
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
    },
  })
}
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const { data } = await graphql(`
    {
      allShopifyProduct {
        nodes {
          handle
          id
          shopifyId
        }
      }
      allShopifyCollection {
        nodes {
          id
          handle
          shopifyId
        }
      }
      allStrapiArticle {
        nodes {
          Handle
          id
          locale
        }
      }
      en: allStrapiLanding(filter: { locale: { eq: "en" } }) {
        nodes {
          handle
          id
          ladingProduct {
            product {
              shopifyID
            }
          }
        }
      }

      sv: allStrapiLanding(filter: { locale: { eq: "sv-SE" } }) {
        nodes {
          handle
          id
          ladingProduct {
            product {
              shopifyID
            }
          }
        }
      }
    }
  `)
  data.allShopifyProduct.nodes.forEach(node => {
    createPage({
      path: `products/${node.handle}`,
      context: {
        shopifyID: node.shopifyId,
      },
      component: path.resolve(`./src/templates/ProductTemplate.js`),
    })
  })

  data.allShopifyProduct.nodes.forEach(node => {
    createPage({
      path: `/en/products/${node.handle}`,
      context: {
        shopifyID: node.shopifyId,
      },
      component: path.resolve(`./src/templates/ProductTemplate.js`),
    })
  })

  data.allStrapiArticle.nodes.forEach(node => {
    createPage({
      path: `/blog/${node.Handle}`,
      context: {
        id: node.id,
        locale: node.locale,
        handle: node.handle,
      },
      component: path.resolve(`./src/templates/ArticleTemplate.js`),
    })
  })

  data.allStrapiArticle.nodes.forEach(node => {
    createPage({
      path: `/en/blog/${node.Handle}`,
      context: {
        id: node.id,
        locale: node.locale,
        handle: node.handle,
      },
      component: path.resolve(`./src/templates/ArticleTemplate.js`),
    })
  })

  data["en"].nodes.forEach(node => {
    createPage({
      path: `/en/${node.handle}`,
      context: {
        id: node.id,
        locale: "en",
        handle: node.handle,
        // shopifyID: node.ladingProduct.product.shopifyID,
        shopifyID: `gid://shopify/Product/${node.ladingProduct.product.shopifyID}`,
      },
      component: path.resolve(`./src/templates/LandingTemplate.js`),
    })
  })

  data["sv"].nodes.forEach(node => {
    createPage({
      path: `${node.handle}`,
      context: {
        id: node.id,
        locale: "sv",
        handle: node.handle,
        // shopifyID: node.ladingProduct.product.shopifyID,
        shopifyID: `gid://shopify/Product/${node.ladingProduct.product.shopifyID}`,
      },
      component: path.resolve(`./src/templates/LandingTemplate.js`),
    })
  })
  // new lang routes

  //HEADER NAV
  createPage({
    path: "/en",
    component: require.resolve("./src/pages/index.js"),
  })
  createPage({
    path: "/en/shop",
    component: require.resolve("./src/pages/shop/index.js"),
  })
  createPage({
    path: "/en/how-it-works",
    component: require.resolve("./src/pages/how-it-works/index.js"),
  })
  createPage({
    path: "/en/discover",
    component: require.resolve("./src/pages/discover/index.js"),
  })
  createPage({
    path: "/en/discover",
    component: require.resolve("./src/pages/discover/index.js"),
  })
  createPage({
    path: "/en/qlean-nation",
    component: require.resolve("./src/pages/qlean-nation/index.js"),
  })
  createPage({
    path: "/en/faq",
    component: require.resolve("./src/pages/faq/index.js"),
  })
  createPage({
    path: "/en/blog",
    component: require.resolve("./src/pages/blog/index.js"),
  })

  //ALPHABETICAL
  createPage({
    path: "/en/affiliates",
    component: require.resolve("./src/pages/affiliates/index.js"),
  })
  createPage({
    path: "/en/cart",
    component: require.resolve("./src/pages/cart/index.js"),
  })
  createPage({
    path: "/en/contact-us",
    component: require.resolve("./src/pages/contact-us/index.js"),
  })
  createPage({
    path: "/en/flaskor",
    component: require.resolve("./src/pages/flaskor/index.js"),
  })
  createPage({
    path: "/en/legal-notice",
    component: require.resolve("./src/pages/legal-notice/index.js"),
  })
  createPage({
    path: "/en/payment-policy",
    component: require.resolve("./src/pages/payment-policy/index.js"),
  })
  createPage({
    path: "/en/privacy-policy",
    component: require.resolve("./src/pages/privacy-policy/index.js"),
  })
  createPage({
    path: "/en/reducing-our-Impact",
    component: require.resolve("./src/pages/reducing-our-Impact/index.js"),
  })
  createPage({
    path: "/en/refill",
    component: require.resolve("./src/pages/refill/index.js"),
  })
  createPage({
    path: "/en/shipping-and-returns",
    component: require.resolve("./src/pages/shipping-and-returns/index.js"),
  })
  createPage({
    path: "/en/signupform",
    component: require.resolve("./src/pages/signupform/index.js"),
  })
  createPage({
    path: "/en/starter-kits",
    component: require.resolve("./src/pages/starter-kits/index.js"),
  })
  createPage({
    path: "/en/sustainability",
    component: require.resolve("./src/pages/sustainability/index.js"),
  })
  createPage({
    path: "/en/terms-of-service",
    component: require.resolve("./src/pages/terms-of-service/index.js"),
  })
  createPage({
    path: "/en/affiliates-coming-soon",
    component: require.resolve("./src/pages/affiliates-coming-soon.js"),
  })
  createPage({
    path: "/en/influencers-coming-soon",
    component: require.resolve("./src/pages/influencers-coming-soon.js"),
  })

  //ACCOUNT
  createPage({
    path: "/en/account/adress",
    component: require.resolve("./src/pages/account/adress/index.js"),
  })
  createPage({
    path: "/en/account/detail",
    component: require.resolve("./src/pages/account/detail/index.js"),
  })
  createPage({
    path: "/en/account/login",
    component: require.resolve("./src/pages/account/login/index.js"),
  })
  createPage({
    path: "/en/account/order",
    component: require.resolve("./src/pages/account/order/index.js"),
  })
  createPage({
    path: "/en/account/recover",
    component: require.resolve("./src/pages/account/recover/index.js"),
  })
  createPage({
    path: "/en/account/signup",
    component: require.resolve("./src/pages/account/signup/index.js"),
  })
  createPage({
    path: "/en/account/sub",
    component: require.resolve("./src/pages/account/sub/index.js"),
  })
}
