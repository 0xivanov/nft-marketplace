import React from 'react'

import {Routes, Route, Navigate} from "react-router-dom"

import NftDetails from '../components/layout/NftDetails'
import Profile from '../components/layout/Profile'
import Seller from '../components/layout/Seller'
import Create from '../components/layout/Create'
import Market from '../components/layout/Market'
import Home from '../components/layout/Home'

const Routers = () => {
  return (
    <Routes>
        <Route path="/" element={<Navigate to="/home"/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/seller" element={<Seller/>} />
        <Route path="/market" element={<Market/>} />
        <Route path="/create" element={<Create/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/market/:id" element={<NftDetails/>} />

    </Routes>
  )
}

export default Routers