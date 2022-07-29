import React,{ useState, useEffect } from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import Routers from '../../routes/Routers'
import { ethers } from 'ethers'

const Layout = () => {

  
  const [account, setAccount] = useState()
  const [provider, setProvider] = useState()

  useEffect(() => {
    const accountChangeListener = () => {
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0])
        console.log("after")
      })
    }

    accountChangeListener()
  }, [])

  const connectAccount = async () => {
    console.log("sdfsdfasdfs")
    if(window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      provider.send("eth_requestAccounts").then((accounts) => {
        setAccount(accounts[0])
      })
      .catch((error) => {
        alert("metamask connection rejected")
        console.log(error)
      })
      setProvider(provider)
    } else {
      alert("install metamask")
    }
  }

  return (
    <>
        <Header connectAccount={connectAccount} account={account}/>
        <div>
            <Routers />
        </div>
        <Footer/>
    </>
  )
}

export default Layout