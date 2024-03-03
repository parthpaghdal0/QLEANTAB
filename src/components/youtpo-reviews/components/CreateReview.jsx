import React, { useEffect } from "react"
import * as Style from "./create-review.module.scss"
import useUploadPhotos from "../../../custom-hooks/useUploadPhotos"
import {
  StarIconYotpo,
  EmptyStarIcon,
  CloseIconYotpo,
} from "../../../assets/components/icons/Icons"
import Button from "../../UI/custom-button/CustomButton"

const CreateReview = ({ product, closeReviewForm, productid, texts }) => {
  const [title, setTitle] = React.useState("")
  const [content, setContent] = React.useState("")
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [score, setScore] = React.useState(0)
  const [errorMessage, setErrorMessage] = React.useState(null)
  const [succes, setSucces] = React.useState(false)
  const {
    createPhotosArrayHandler,
    images,
    uploadPictures,
    imageUrls,
    setSendReviewEffect,
    sendReviewEffect,
    setImages,
    setImageUrls,
  } = useUploadPhotos()

  useEffect(() => {
    if (sendReviewEffect) {
      createRevewRequest()
    }
  }, [sendReviewEffect])

  useEffect(() => {
    if (succes)
      setTimeout(() => {
        setSucces(false)
        clearForm()
      }, 2500)
  }, [succes])

  const handleFetchReview = () => {
    if (!title || !content || !name || !email) {
      setErrorMessage(texts[0].text)
      return
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setErrorMessage(texts[1].text)
        return
      } else {
        sendReview()
      }
    }
  }

  const createRevewRequest = () => {
    const domain = `https://qleantab.com`
    // const domain = `${window.location.protocol}//${window.location.host}`;

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appkey: process.env.GATSBY_YOTPO_AK,
        domain: domain,
        sku: productid,
        product_title: product.title,
        product_description: product.title,
        product_url: `${domain}/products/${product.handle}`,
        product_image_url:
          product?.media[0].preview.image.gatsbyImageData.images.fallback.src,
        // reviewer_image_url:
        //   "https://res.cloudinary.com/qleantab/image/upload/v1675068734/istockphoto-165722288-612x612_w95rcc.jpg",
        image_urls: imageUrls,
        // custom_properties: { strapiId: "testid" },
        display_name: name,
        email: email,
        is_incentivized: true,
        review_content: content,
        review_title: title,
        review_score: score,
      }),
    }

    fetch("https://api.yotpo.com/v1/widget/reviews", options)
      .then(response => {
        response.json()
        console.log(response)
      })
      .then(response => {
        setSendReviewEffect(false)
        setImages([])
        setImageUrls([])
        setSucces(true)
      })
      .catch(err => console.error(err))
  }

  const sendReview = () => {
    if (images.length > 0) {
      uploadPictures()
    } else {
      setSendReviewEffect(true)
    }
  }

  const handleChangeState = (e, type) => {
    const val = e.target.value
    switch (type) {
      case "title":
        setTitle(val)
        break
      case "content":
        setContent(val)
        break
      case "name":
        setName(val)
        break
      case "email":
        setEmail(val)
        break
    }
  }

  const clearForm = () => {
    setTitle("")
    setContent("")
    setName("")
    setEmail("")
    setScore(0)
    closeReviewForm()
  }

  const setActiveStar = item => {
    setScore(item)
  }

  return (
    <div className={Style.form}>
      <div className={Style.close} onClick={closeReviewForm}>
        <CloseIconYotpo />
      </div>
      {succes && <div className={Style.success_message}>{texts[2].text}</div>}
      <h4 className={Style.heading}>{texts[3].text}</h4>
      <p className={Style.mandatory_mark_wrapper}>
        <span className={Style.mandatory_mark}>*</span> {texts[4].text}
      </p>
      <p className={Style.mandatory_mark_content}>
        <span className={Style.mandatory_mark}>*</span> {texts[5].text}
      </p>
      <div className={Style.review_star_container}>
        {[1, 2, 3, 4, 5].map(item => (
          <div key={item} onClick={() => setActiveStar(item)}>
            {score < item ? (
              <EmptyStarIcon color="#e7721b" />
            ) : (
              <StarIconYotpo color="#e7721b" />
            )}
          </div>
        ))}
      </div>
      <div className={Style.form_container}>
        <label htmlFor="title" className={Style.mandatory_mark_content}>
          <span className={Style.mandatory_mark}>*</span> {texts[6].text}
          {!title && errorMessage && (
            <span className={Style.form_error}>{errorMessage}</span>
          )}
        </label>
        <input
          value={title}
          type="text"
          id="title"
          onInput={e => handleChangeState(e, "title")}
        />
      </div>
      <div className={Style.form_container}>
        <label htmlFor="description" className={Style.mandatory_mark_content}>
          <span className={Style.mandatory_mark}>*</span> {texts[7].text}
          {!content && errorMessage && (
            <span className={Style.form_error}>{errorMessage}</span>
          )}
        </label>
        <textarea
          value={content}
          name=""
          id="description"
          cols="30"
          rows="10"
          onInput={e => handleChangeState(e, "content")}
        ></textarea>
      </div>
      <div className={`${Style.form_container} flex flex-between`}>
        <div className={Style.form_container_half}>
          <label htmlFor="name" className={Style.mandatory_mark_content}>
            <span className={Style.mandatory_mark}>*</span> {texts[8].text}
            {!name && errorMessage && (
              <span className={Style.form_error}>{errorMessage}</span>
            )}
          </label>
          <input
            value={name}
            type="text"
            id="name"
            onInput={e => handleChangeState(e, "name")}
          />
        </div>
        <div className={Style.form_container_half}>
          <label htmlFor="title" className={Style.mandatory_mark_content}>
            <span className={Style.mandatory_mark}>*</span> {texts[9].text}
            {!email && errorMessage && (
              <span className={Style.form_error}>{errorMessage}</span>
            )}
          </label>
          <input
            value={email}
            className={Style.formInput}
            type="text"
            id="title"
            onInput={e => handleChangeState(e, "email")}
          />
        </div>
      </div>

      <div className={Style.form_button_container}>
        <div className={Style.fileWrapper}>
          <label className={Style.fileInputBtn} htmlFor="file-input">
            {texts[11].text}
          </label>
          <p>{`${images.length}/5`}</p>
          <input
            id="file-input"
            accept="image/jpeg, image/png, image/jpg"
            className={Style.fileInput}
            type="file"
            name="file-input"
            onChange={e => {
              createPhotosArrayHandler(e)
            }}
          />
        </div>
        <Button globalStyles={true} buttonHandler={handleFetchReview}>
          {texts[10].text}
        </Button>
      </div>
    </div>
  )
}

export default CreateReview

// useEffect(() => {
//   fetch("https://api.yotpo.com/oauth/token", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       accept: "application/json",
//     },
//     body: JSON.stringify({
//       client_id: "OgdRzQeflmy96P3KIk2sN9crdwYlCnkeDrEUotBW",
//       client_secret: "YEenZI1cxEEk0F9J75O93kQEYvfa8snbb9xTOkc0",
//       grant_type: "client_credentials",
//     }),
//   })
//     .then(response => response.json())
//     .then(data => {
//       fetch(
//         `https://api.yotpo.com/v1/apps/OgdRzQeflmy96P3KIk2sN9crdwYlCnkeDrEUotBW/images/export?source=review&page=1&per_page=10&utoken=${data.access_token}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             accept: "application/json",
//           },
//         }
//       )
//         .then(response => response.json())
//         .then(data => console.log(data))
//         .catch(error => console.error(error))
//       console.log(data)
//       fetch(
//         `https://api.yotpo.com/v1/apps/OgdRzQeflmy96P3KIk2sN9crdwYlCnkeDrEUotBW/reviews?count=100&utoken=${data.access_token}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             accept: "application/json",
//           },
//         }
//       )
//         .then(response => response.json())
//         .then(data => console.log(data))
//         .catch(error => console.error(error))
//     })
//     .catch(error => console.error(error))
// }, [])

// const sendReview = () => {
//   const domain = `https://qleantab.com`

//   fetch("https://api.yotpo.com/v1/media/", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       apikey: "OgdRzQeflmy96P3KIk2sN9crdwYlCnkeDrEUotBW",
//       type: "image",
//       url: "https://res.cloudinary.com/qleantab/image/upload/v1675068734/istockphoto-165722288-612x612_w95rcc.jpg",
//       original_url: `${domain}/products/${product.handle}`,
//     }),
//   })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok")
//       }
//       return response.json()
//     })
//     .then(data => {
//       console.log("Image uploaded successfully:", data)
//       // Use the second request to submit the review
//       const options = {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           appkey: "OgdRzQeflmy96P3KIk2sN9crdwYlCnkeDrEUotBW",
//           domain: domain,
//           sku: productid,
//           product_title: product.title,
//           product_description: product.title,
//           product_url: `${domain}/products/${product.handle}`,
//           product_image_url: data.url,
//           reviewer_image_url: data.url,
//           display_name: name,
//           email: email,
//           is_incentivized: true,
//           review_content: content,
//           review_title: title,
//           review_score: score,
//         }),
//       }
//       return fetch("https://api.yotpo.com/v1/widget/reviews", options)
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok")
//       }
//       return response.json()
//     })
//     .then(data => {
//       console.log("Review submitted successfully:", data)
//     })
//     .catch(error => {
//       console.error(
//         "There was a problem uploading the image or submitting the review:",
//         error
//       )
//     })
// }
