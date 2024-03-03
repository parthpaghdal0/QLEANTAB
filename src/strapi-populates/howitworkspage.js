const howitworkspage = {
  singularName: "how-it-works-page",
  pluginOptions: {
    i18n: {
      locale: "all",
    },
  },
  // singularName: "starter-sets-page",
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
      how_it_works: {
        populate: {
          heading: "*",
          description: "*",
          how_it_works_step: {
            populate: {
              step_image: "*",
              step_description: "*",
            },
          },
          how_it_works_time: {
            populate: {
              time_icon: "*",
              icon_text: "*",
              heading: "*",
              description: "*",
            },
          },
        },
      },
      faq: {
        populate: {
          heading: "*",
          button: {
            populate: {
              url: "*",
              title: "*",
            },
          },
          questions: {
            populate: {
              heading: "*",
              description: "*",
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
      howitworksCollection: {
        populate: {
          heading: "*",
          background: "*",
          mobileBackground: "*",
          layoutClass: "*",
          handle: "*",
          order: "*",
          button: {
            populate: {
              title: "*",
              url: "*",
              title_mobile: "*",
            },
          },
          content: {
            populate: {
              pargraph: "*",
            },
          },
          imageOnLeft: "*",
          buttonClass: "*",
        },
      },
    },
  },
}
module.exports = howitworkspage
