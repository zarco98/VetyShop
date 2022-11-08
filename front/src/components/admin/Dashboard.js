import React, { Fragment } from 'react'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    return (
        <Fragment>
            <div className='row'>

                <div className='col-12 col-md-2'>
                    <Sidebar />
                </div>

                <div className='col-12 col-md-10'>
                    <h1 className='my-4'>Panel de Control</h1>

                    <Fragment>
                        <MetaData title={"Panel de Control"} />
                        <div className='row pr-4'>

                            {/*Tarjeta 1*/}


                            <div className='col-xl-12 col-sm-12 mb-3'>
                                <div className='card text-white bg-primary o-hidden h-100'>
                                    <div className='card-body'>
                                        <div className='text-center card-font-size'>Ventas totales<br /><b>$25.000.000</b></div>
                                    </div>
                                </div>
                            </div>


                            {/*Tarjeta 2*/}


                            <div className='col-xl-3 col-sm-6 mb-3'>
                                <div className='card text-white bg-success o-hidden h-100'>
                                    <div className='card-body'>
                                        <div className='text-center card-font-size'>Productos<br /><b>250</b></div>
                                    </div>
                                    <Link className="card-footer text-white clearfix small z-1" to="/">
                                        <span className='float-left'>Ver detalles</span>
                                        <span className='float-right'><i className='fa fa-angle-right'></i></span>
                                    </Link>
                                </div>
                            </div>


                            {/*Tarjeta 3*/}


                            <div className='col-xl-3 col-sm-6 mb-3'>
                                <div className='card text-white bg-info o-hidden h-100'>
                                    <div className='card-body'>
                                        <div className='text-center card-font-size'>Pedidos<br /><b>80</b></div>
                                    </div>
                                    <Link className="card-footer text-white clearfix small z-1" to="/">
                                        <span className='float-left'>Ver detalles</span>
                                        <span className='float-right'><i className='fa fa-angle-right'></i></span>
                                    </Link>
                                </div>
                            </div>


                            {/*Tarjeta 4*/}


                            <div className='col-xl-3 col-sm-6 mb-3'>
                                <div className='card text-white bg-warning o-hidden h-100'>
                                    <div className='card-body'>
                                        <div className='text-center card-font-size'>Usuarios<br /><b>512</b></div>
                                    </div>
                                    <Link className="card-footer text-white clearfix small z-1" to="/">
                                        <span className='float-left'>Ver detalles</span>
                                        <span className='float-right'><i className='fa fa-angle-right'></i></span>
                                    </Link>
                                </div>
                            </div>


                            {/*Tarjeta 5*/}


                            <div className='col-xl-3 col-sm-6 mb-3'>
                                <div className='card text-white bg-danger o-hidden h-100'>
                                    <div className='card-body'>
                                        <div className='text-center card-font-size'>Agotados<br /><b>14</b></div>
                                    </div>

                                </div>
                            </div>



                        </div>

                    </Fragment>
                </div>
            </div>
        </Fragment>

    )
}

export default Dashboard