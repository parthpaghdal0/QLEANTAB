import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { graphql, useStaticQuery } from "gatsby";

const query = graphql`
  query {
    allShopifyProduct {
      totalCount
      nodes {
        title
        description
        id
        handle
        productType
        status
        shopifyId
        vendor
        options {
          name
          position
          shopifyId
          values
        }
        variants {
          barcode
          id
          price
          sku
          shopifyId
          title
          weight
          taxCode
        }
        featuredImage {
          gatsbyImageData(layout: CONSTRAINED, placeholder: DOMINANT_COLOR)
          altText
        }
        media {
          preview {
            image {
              gatsbyImageData(layout: CONSTRAINED)
              altText
            }
          }
        }
      }
    }
  }
`

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    console.log('allShopifyProduct');
    const { allShopifyProduct } = await useStaticQuery(query);
    console.log(allShopifyProduct);
    return allShopifyProduct;
});

const productSlice = createSlice({
    name: "products",

    initialState: {
        products: null,
    },

    reducers: {
        setProducts(state, { payload }) {
            state.products = payload
        },
    },

    extraReducers: {
        [fetchProducts.pending]: (state) => { },
        [fetchProducts.fulfilled]: (state, { payload }) => {
            console.log(payload);
            state.products = payload;
        },
        [fetchProducts.rejected]: (state) => { },
    },
})

// export default productSlice;

export const { setProducts, } = productSlice.actions;
export default productSlice.reducer;

