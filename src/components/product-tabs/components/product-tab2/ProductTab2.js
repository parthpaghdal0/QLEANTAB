import React from "react"
import * as Style from "./product-tab2.module.scss"

const ProductTab2 = ({ data }) => {
  const tableRows = data?.table_row.map((el, index) => {
    return (
      <div
        key={index}
        className={`${
          el.table_header ? Style.table_header : Style.table_row
        }  ${!el.table_header && index % 2 === 0 && Style.row_background}`}
      >
        <div className={Style.column1}>{el.heading.data.heading}</div>
        <div className={Style.column2}>{el.description.data.description}</div>
      </div>
    )
  })
  return <div className={Style.table_section_tab}>{tableRows}</div>
}

export default ProductTab2
