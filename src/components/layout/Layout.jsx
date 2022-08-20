import React,{ useState, useEffect } from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import Routers from '../../routes/Routers'
import { ethers } from 'ethers'
import Profile from './Profile'
import useToken from '../../useToken';

const Layout = () => {

  const { token, setToken } = useToken();
  const [provider, setProvider] = useState(new ethers.providers.Web3Provider(window.ethereum))

  useEffect(() => {
    console.log(provider)
    const accountChangeListener = () => {
      window.ethereum.on("accountsChanged", (accounts) => {
        setToken(accounts[0])
      })
    }

    accountChangeListener()
  }, [])

  const connectAccount = async () => {
    if(window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      provider.send("eth_requestAccounts").then((accounts) => {
        handleSubmit(accounts[0])
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

  const handleSubmit = async (account) => {
    const token = await loginUser({account});
    setToken(token.token);
  }


  async function loginUser(credentials) {
    return fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(data => data.json())
   }

  return (
    <>
        <Header account={token} />
        <div>
          <Routers token={token} setToken={setToken} connectAccount={connectAccount} />
        </div>
        <Footer/>
    </>
  )
}

export default Layout