const learnpage = {
  singularName: "learn-page",
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
      benefits: {
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
      bottle_section: {
        populate: {
          heading: "*",
          description: "*",
          image_desktop: "*",
          image_mobile: "*",
          background_color: "*",
          bottle_text: {
            populate: {
              text: "*",
            },
          },
        },
      },
      insidetab_section: {
        populate: {
          heading: "*",
          pargraph_one: "*",
          pargraph_two: "*",
          pargraph_three: "*",
          inside_icon: {
            populate: {
              heading: "*",
              icon_image: "*",
            },
          },
          insidetab_bg: "*",
          single_icon: "*",
        },
      },
      text_icons_section: {
        populate: {
          heading: "*",
          description: "*",
          heading2: "*",
          description2: "*",
          icon: {
            populate: {
              heading: "*",
              description: "*",
              icon_image: "*",
            },
          },
        },
      },
      image_text_double: {
        populate: {
          heading: "*",
          description: "*",
          // heading2: "*",
          // description2: "*",
          columns_reverse: "*",
          background_color: "*",
          image: "*",
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
}
module.exports = learnpage
