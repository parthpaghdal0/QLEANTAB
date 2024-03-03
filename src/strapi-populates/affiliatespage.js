const affiliates_page = {
  singularName: "affiliates-page",
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
      simple_text: {
        populate: {
          heading: "*",
          description: "*",
          button: {
            populate: {
              title: "*",
              url: "*",
            },
          },
        },
      },
      email_first: {
        populate: {
          heading: "*",
          description: "*",
          background_color: "*",
          decoration_left: "*",
        },
      },
      email_second: {
        populate: {
          heading: "*",
          description: "*",
          background_color: "*",
          decoration_left: "*",
        },
      },
      textImage: {
        populate: {
          heading: "*",
          image: "*",
          imageOnLeft: "*",
          background: "*",
          paragraph: {
            populate: {
              pargraph: "*",
            },
          },
        },
      },
      collection: {
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

module.exports = affiliates_page
