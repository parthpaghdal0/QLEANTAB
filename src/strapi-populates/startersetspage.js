const startersetspage = {
  singularName: "starter-sets-page",
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
      reviews: {
        populate: {
          heading: "*",
          description: "*",
          single_review: {
            populate: {
              name: "*",
              text: "*",
              image: "*",
              color_code: "*",
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
    },
  },
}
module.exports = startersetspage
