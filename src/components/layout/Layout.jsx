import React from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import Routers from '../../routes/Routers'

const Layout = () => {
  return (
    <>
        <Header />
        <div>
            <Routers />
        </div>
        <Footer/>
    </>
  )
}

export default Layout