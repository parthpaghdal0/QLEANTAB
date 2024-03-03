const header = {
  singularName: "layout",
  pluginOptions: {
    i18n: {
      locale: "all",
    },
  },
  queryParams: {
    populate: {
      header: {
        populate: {
          main_logo: "*",
          main_logo_mobile: "*",
          button: {
            populate: {
              title: "*",
              url: "*",
              icon: "*",
            },
          },
          input: {
            populate: {
              placeholder: "*",
              type: "*",
            },
          },
          links: {
            populate: {
              text: "*",
              url: "*",
            },
          },

          info_box: {
            populate: {
              text: "*",
              icon: "*",
            },
          },
          currency: {
            populate: {
              symbol: "*",
              code: "*",
              name: "*",
            },
          },
          contact_phone: "*",
        },
      },

      footer: {
        populate: {
          button: {
            populate: {
              title: "*",
              url: "*",
              icon: "*",
            },
          },
          input: {
            populate: {
              placeholder: "*",
              type: "*",
            },
          },

          footer_main_heading: "*",
          footer_sub_heading: "*",
          footer_main_logo: {
            populate: {
              title: "*",
              main_logo: "*",
            },
          },

          single_icon: {
            populate: {
              heading: "*",
              description: "*",
              icon_image: "*",
            },
          },

          footer_info: {
            populate: {
              info: "*",
              icon: "*",
            },
          },
        },
      },

      footer_links: {
        populate: {
          title: "*",
          links: {
            populate: {
              text: "*",
              url: "*",
            },
          },
        },
      },

      layoutCookie: {
        populate: {
          text: "*",
          cookieButton: {
            populate: {
              title: "*",
            },
          },
        },
      },
    },
  },
}
module.exports = header
