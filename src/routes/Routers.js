import React from 'react'

import {Routes, Route, Navigate} from "react-router-dom"

import NftDetails from '../components/NftDetails'
import Wallet from '../components/Wallet'
import Profile from '../components/Profile'
import Seller from '../components/Seller'
import Create from '../components/Create'
import Market from '../components/Market'
import Home from '../components/Home'

const Routers = () => {
  return (
    <Routes>
        <Route path="/" element={<Navigate to="/home"/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/wallet" element={<Wallet/>} />
        <Route path="/seller" element={<Seller/>} />
        <Route path="/market" element={<Market/>} />
        <Route path="/create" element={<Create/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/market/:id" element={<NftDetails/>} />

    </Routes>
  )
}

export default Routers