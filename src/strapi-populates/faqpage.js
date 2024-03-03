const faqpage = {
  singularName: "faq-page",
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
      Faq_page: {
        populate: {
          Heading: "*",
          Faq_QA: {
            populate: {
              Question: "*",
              Answer: "*",
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
module.exports = faqpage
