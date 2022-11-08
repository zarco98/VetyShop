import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../actions/productActions'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
import { MDBDataTable } from 'mdbreact'
import Sidebar from './Sidebar'

const ProductsList = () => {
    const { loading, productos, error } = useSelector(state => state.products)
    const alert = useAlert();

    const dispatch = useDispatch();
    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        dispatch(getProducts());
        alert.success("OK")
    }, [dispatch])

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: "Nombre",
                    field: "nombre",
                    sort: "asc"
                },
                {
                    label: "Precio",
                    field: "precio",
                    sort: "asc"
                },
                {
                    label: "Inventario",
                    field: "inventario",
                    sort: "asc"
                },
                {
                    label: "Vendedor",
                    field: "vendedor",
                    sort: "asc"
                },

            ],
            rows: []
        }
        productos.forEach(producto => {
            data.rows.push({
                nombre: producto.nombre,
                precio: `$${producto.precio}`,
                inventario: producto.inventario,
                vendedor: producto.vendedor,
            })
        })
        return data;
    }

    return (
        <Fragment>
            <MetaData title={"Todos los productos"}></MetaData>
            <div className='row'>
                <div className='col-12 col-md-2'>
                    <Sidebar />
                </div>
            </div>

            <div className='col-12 col-md-10'>
                <Fragment>
                    <h1 className='my-5'>Productos Registrados</h1>
                    {loading ? <i class="fa fa-spinner fa-spin fa-3x fa-fw">Cargando...</i> : (
                        <MDBDataTable
                            data={setProducts()}
                            className="px-3"
                            bordered
                            striped
                            hover
                        />
                    )}

                </Fragment>
            </div>
        </Fragment>
    )

}

export default ProductsList