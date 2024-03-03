const learnpage = {
  singularName: "qlean-nation-page",
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
      text_section: {
        populate: {
          heading: "*",
          description: "*",
        },
      },
      image_text_double: {
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
module.exports = learnpage
