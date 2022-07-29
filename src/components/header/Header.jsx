import React, { useEffect, useRef } from 'react'
import { Container } from 'reactstrap'
import {NavLink, Link} from 'react-router-dom'
import './header.css'

const NAV_LINKS = [
    {
        display: "Home",
        url: "/home"
    },
    {
        display: "Market",
        url: "/market"
    },
    {
        display: "Create",
        url: "/create"
    },
    {
        display: "Profile",
        url: "/profile"
    },
]

const Header = () => {

    const headerRef = useRef(null)
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('header__shrink')
            } else {
                headerRef.current.classList.remove('header__shrink')
            }

            return () => {
                window.removeEventListener('scroll')
            }
        })
    }, [])

  return <header className="header" ref={headerRef}>
    <Container>
    <div className="navigation">
        <div className="logo">
            <h2 className='d-flex gap-2 align-items-center'>
                <span><i className="ri-fire-line"></i></span>
                NFTs
            </h2>
        </div>
        <div className="nav__menu">
            <ul className="nav__list">
            {
                NAV_LINKS.map((item, index) => (
                    <li className="nav__item" key={index}>
                        <NavLink to={item.url}>{item.display}</NavLink>
                    </li>
                ))
            }
            </ul>
        </div>
        <div className="nav__right d-flex align-items-center gap-5">
            <button className="btn">
                <Link className='d-flex gap-2 align-items-center' to={"/wallet"}><i className="ri-wallet-3-line"></i>Connect wallet
                </Link>
            </button>
            <span className="mobile__menu"><i className="ri-menu-line"></i></span>
        </div>
    </div>
    </Container>
  </header>
}
export default Header
