import React,{ useState, useEffect } from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import Routers from '../../routes/Routers'
import { ethers } from 'ethers'
import useToken from '../../useToken';

const Layout = () => {

  const { token, setToken } = useToken()
  const [provider, setProvider] = useState()
  const [profile, setProfile] = useState(null)
  const [isProfilePending, setIsProfilePending] = useState(true)

  useEffect(() => {
    const accountChangeListener = () => {
      window.ethereum.on("accountsChanged", (accounts) => {
        setToken(accounts[0])
        window.location.reload()
      })
    }
    accountChangeListener()
    if(window.ethereum) {
      setProvider(new ethers.providers.Web3Provider(window.ethereum))
    } else {
      alert("Please install MetaMask")
    }
    if(token) {
      getProfile().then((p) => {
        setProfile(p)
        setIsProfilePending(false)
      })
    }
  }, [token])

  const getProfile = async () => {
    const response = await fetch('/profile', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({token})
    });
    let data = await response.json();
    return data
  }

  const createProfile = async (token) => {
    const _token = await token
    try {
      const response = await fetch('/profile/create', {
        method: 'post',
        body: JSON.stringify(_token),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await response.json()
      console.log(data);
      setProfile(data)
    } catch (error) {
      console.log(error)
    }
  }

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
    }).then(data => {
      let token = data.json()
      createProfile(token)
      return token
    })
   }

  return (
    <>
        <Header account={token} />
        <div>
          <Routers provider={provider} profile={profile} setProfile={setProfile} isProfilePending={isProfilePending} token={token} setToken={setToken} connectAccount={connectAccount} />
        </div>
        <Footer/>
    </>
  )
}

export default Layout