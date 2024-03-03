const article_page = {
  singularName: "article",
  pluginOptions: {
    i18n: {
      locale: "all",
    },
  },
  queryParams: {
    populate: {
      id: "*",
      title: "*",
      date: "*",
      author: "*",
      handle: "*",
      articleWithMultipleImages: "*",
      main_image: "*",
      fullwidthImage2: "*",
      image2: "*",
      image1: "*",
      text_content_1: "*",
      text_content_2: "*",
      backgroundColorTextContent2: "*",
      text_content3: "*",
      text_content4: "*",
      //   icons_section: {
      //     populate: {
      //       heading: "*",
      //       description: "*",
      //       planet_media: {
      //         populate: {
      //           icon: "*",
      //           title: "*",
      //           info: "*",
      //         },
      //       },
      //     },
      //   },
      related_articles: {
        populate: {
          article: {
            id: "*",
            title: "*",
            date: "*",
            author: "*",
            handle: "*",
            main_image: "*",
            text_content_1: "*",
          },
        },
      },
    },
  },
}

module.exports = article_page
