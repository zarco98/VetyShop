import axios from "axios";
import { ADD_TO_CART, REMOVE_ITEM_CART } from "../constants/cartConstants";

export const addItemtoCart = (id, quantity) => async(dispatch, getState) => {
    const {data} = await axios.get(`/api/producto/${id}`)

    dispatch({
        type: ADD_TO_CART,
        payload:{
            product: data.product._id,
            nombre: data.product.nombre,
            precio: data.product.precio,
            imagen: data.product.imagen[0].url,
            inventario: data.product.inventario,
            quantity
        }
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_ITEM_CART,
        payload: id
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}