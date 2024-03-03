const shop = {
  singularName: "shop",
  pluginOptions: {
    i18n: {
      locale: "all",
    },
  },
  queryParams: {
    populate: {
      PageHeading: "*",
      seo: {
        populate: {
          title: "*",
          // metaTitle: "*",
          // metaKeywords: "*",
          // metaAuthor: "*",
          description: "*",
          // metaDescription: "*",
          // ogTitle: "*",
          // ogType: "*",
          // ogDescription: "*",
          // canonicalTag: "*",
          // altImageText: "*",
          // jsonLD: "*",
        },
      },
    },
  },
}
module.exports = shop
