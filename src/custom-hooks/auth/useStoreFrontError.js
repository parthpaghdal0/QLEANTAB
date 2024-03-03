const useStoreFrontError = () => {
  const handleStoreFrontError = (type, response) => {
    if (response?.data?.data?.[type]?.customerUserErrors?.length > 0) {
      return response.data.data[type].customerUserErrors[0].message
    }

    if (response?.data?.errors?.length > 0) {
      return response.data.errors[0].message
    }

    return null
  }

  return {
    handleStoreFrontError,
  }
}

export default useStoreFrontError
