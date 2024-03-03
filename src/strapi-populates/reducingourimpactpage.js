const reducingourimpactpage = {
  singularName: "reducing-our-impact-page",
  pluginOptions: {
    i18n: {
      locale: "all",
    },
  },
  queryParams: {
    populate: {
      banner: {
        populate: {
          heading: "*",
          description: "*",
          background_image_desktop: "*",
          background_image_mobile: "*",
          product_image_desktop: "*",
          product_image_mobile: "*",
        },
      },
      imageTextDouble: {
        populate: {
          heading: "*",
          description: "*",
          heading2: "*",
          // description2: "*",
          columns_reverse: "*",
          background_color: "*",
          image: "*",
          button: {
            populate: {
              title: "*",
              url: "*",
            },
          },
        },
      },
      seo: {
        populate: {
          title: "*",
          // metaTitle: "*",
          // metaKeywords: "*",
          // metaAuthor: "*",
          description: "*",
          metaImage: "*",
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
  pluginOptions: {
    i18n: {
      locale: "all",
    },
  },
}
module.exports = reducingourimpactpage
