import React from 'react'
import Hero from '../ui/Hero'
import LiveAuction from '../ui/LiveAuction'


const Home = ({ provider }) => {

  return (
    <>
      <Hero />
      <LiveAuction provider={provider} />
    </>
  )
}

export default Home