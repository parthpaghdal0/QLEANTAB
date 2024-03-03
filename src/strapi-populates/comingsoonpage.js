const comingsoonpage = {
  singularName: "coming-soon-page",
  pluginOptions: {
    i18n: {
      locale: "all",
    },
  },
  queryParams: {
    populate: {
      heading: "*",
      description: "*",
      background_desktop: "*",
      background_mobile: "*",
      social_media_links: {
        populate: {
          heading: "*",
          social_link: {
            populate: {
              title: "*",
              url: "*",
              icon: "*",
            },
          },
        },
      },
      footer_link: {
        populate: {
          text: "*",
          url: "*",
        },
      },
      popup_content: {
        populate: {
          heading: "*",
          subheading: "*",
          popup_image: "*",
          button: {
            populate: {
              title: "*",
            },
          },
        },
      },
      seo: {
        populate: {
          title: "*",
          metaTitle: "*",
          // metaKeywords: "*",
          metaAuthor: "*",
          description: "*",
          metaDescription: "*",
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
module.exports = comingsoonpage
