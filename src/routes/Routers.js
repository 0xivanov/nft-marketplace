import React from 'react'

import { Routes, Route, Navigate } from "react-router-dom"

import NftDetails from '../components/layout/NftDetails'
import Profile from '../components/layout/Profile'
import Seller from '../components/layout/Seller'
import Create from '../components/layout/Create'
import Market from '../components/layout/Market'
import Home from '../components/layout/Home'
import EditProfile from '../components/ui/EditProfile'

const Routers = ({ provider, profile, setProfile, isProfilePending, token, setToken, connectAccount }) => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home provider={provider} profile={profile} isPending={isProfilePending} />} />
      <Route path="/seller" element={<Seller profile={profile} isPending={isProfilePending} token={token} />} />
      <Route path="/market" element={<Market provider={provider} profile={profile} isPending={isProfilePending} token={token} />} />
      {token && <Route path="/create" element={<Create provider={provider} profile={profile} isPending={isProfilePending} token={token} />} />}
      {!token && <Route path="/create" element={<Navigate to="/profile" />} />}
      <Route path="/profile" element={<Profile provider={provider} profile={profile} isPending={isProfilePending} token={token} setToken={setToken} connectAccount={connectAccount} />} />
      {!token && <Route path="/profile/edit" element={<Navigate to="/profile" />} />}
      {token && <Route path="/profile/edit" element={<EditProfile profile={profile} setProfile={setProfile} isPending={isProfilePending} token={token} />} />}
      <Route path="/market/:tokenId" element={<NftDetails provider={provider} profile={profile} isPending={isProfilePending} token={token} />} />
    </Routes>
  )
}

export default Routers