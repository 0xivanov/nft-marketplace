import React, { useEffect, useRef } from 'react'
import { Container } from 'reactstrap'
import { NavLink, useNavigate } from 'react-router-dom'
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

const Header = ({account}) => {

    const menuRef = useRef(null);
    const navigate = useNavigate()
    const toggleMenu = () => menuRef.current.classList.toggle('active__menu')

    const headerRef = useRef(null)
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 70) {
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
        <div className="nav__menu" ref={menuRef} onClick={toggleMenu}>
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
            <button onClick={()=>navigate("/profile")} disabled={account} className="btn">
                <div className='d-flex gap-2 align-items-center'><i className="ri-wallet-3-line"></i>
                {
                    account ? account : "Connect Account"
                }
                </div>
            </button>
        </div>
        <span className="mobile__menu" onClick={toggleMenu}><i className="ri-menu-line"></i></span>
    </div>
    </Container>
  </header>
}
export default Header
