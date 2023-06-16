import React from "react";
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import ViewShopId from "../pages/ViewShopId";
import Home from '../pages/Home';
import Shopping from '../pages/Shopping'
import ShopDetail from "../pages/ShopDetail";
import Contact from "../pages/Contact";
import Cart from "../pages/Cart";
import CheckOut from "../pages/CheckOut";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { useSelector } from "react-redux";
import RegisterShop from "../components/UI/authUi/RegisterShop";

const Router = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to='/home' />} />
            <Route path="/home" element={<Home />} />
            <Route path="/shop" element={<Shopping />} />
            <Route path="/viewShop/:id" element={<ViewShopId />} />
            <Route path="/shop/:id" element={<ShopDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={user.UserId ? <CheckOut /> : <Navigate to="/login" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/registerShop" element={<RegisterShop />} />

        </Routes>
    )
}

export default Router;