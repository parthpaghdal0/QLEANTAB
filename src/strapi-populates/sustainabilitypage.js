const sustainabilitypage = {
  singularName: "sustainability-page",
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
      iconsSection: {
        populate: {
          heading: "*",
          description: "*",
          planet_media: {
            populate: {
              icon: "*",
              title: "*",
              info: "*",
            },
          },
        },
      },
      iconsSection2: {
        populate: {
          heading: "*",
          description: "*",
          planet_media: {
            populate: {
              icon: "*",
              title: "*",
              info: "*",
            },
          },
        },
      },
      sustainabilityImageText: {
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
  pluginOptions: {
    i18n: {
      locale: "all",
    },
  },
}
module.exports = sustainabilitypage
