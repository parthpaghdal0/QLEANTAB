import { useState } from "react"

const useUploadPhotos = () => {
  const [images, setImages] = useState([])
  const [imageUrls, setImageUrls] = useState([])
  const [sendReviewEffect, setSendReviewEffect] = useState(false)

  const createPhotosArrayHandler = e => {
    if (images.length < 5 && e.target.files[0]) {
      setImages(state => {
        return [...state, e.target.files[0]]
      })
    }
  }

  const uploadPictures = async () => {
    const formdata = new FormData()

    if (images.length !== 0) {
      images.forEach(ele => {
        formdata.append("images", ele)
      })
    }

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    }

    fetch(
      `https://qleantab-strapi.herokuapp.com/api/yotpo-upload`,
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        if (result) {
          const urls = result.pictures.map(item => {
            return item.url
          })

          setImageUrls(urls)
          setSendReviewEffect(true)
        }
      })
      .catch(error => console.log("error", error))
      .finally(() => {})
  }

  return {
    createPhotosArrayHandler,
    uploadPictures,
    images: images,
    imageUrls: imageUrls,
    sendReviewEffect: sendReviewEffect,
    setSendReviewEffect,
    setImages,
    setImageUrls,
  }
}

export default useUploadPhotos
