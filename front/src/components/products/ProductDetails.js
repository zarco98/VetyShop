import React, { Fragment } from 'react'
import MetaData from "../layout/MetaData"

const ProductDetails = () => {
  return (
    <Fragment>
        <MetaData title= "Agility Alimento Blando Perros"></MetaData>
        <div className='row d-flex justify-content-around'>
            <div className='col-12 col-lg-5 img-fluid' id="imagen_producto">
                <img src="../../images/productos/agility_blando_perros.jpeg" height="450" width="450"></img>
            </div>
            <div className='col-12 col-lg-5 mt-5'>
                <h3>Alimento húmedo Agility para Perros</h3>
                <p id="product_id">Product #3253252</p>
            </div>
        </div>
    </Fragment>
  )
}

export default ProductDetails