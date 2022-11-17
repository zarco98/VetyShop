import './App.css';
import React, { useEffect } from 'react';
import Header from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import Home from './components/Home';
import { ProductDetails } from './components/products/ProductDetails';
//Router traido desde react-router-dom (no confundir con el de express)
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';
import Cart from './components/cart/Cart';
import Login from './components/user/Login';
import { Register } from './components/user/Register';
import { loadUser } from './actions/userActions';
import store from "./store";
import { Profile } from './components/user/Profile';
import ProtectedRoute from './routes/ProtectedRoute';


function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Router>
      <div className="App">
        <Header />
        <div className='container container-fluid'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/producto/:id" element={<ProductDetails />} />
            <Route path="/productList" element={<ProductsList />} />
            <Route path="/nuevoProducto" element={<NewProduct />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/carrito" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/yo" element={<Profile />}/>

            {/*Ruta protegida */}
            <Route path="/dashboard" 
            element={<ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute>}/>
            
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;