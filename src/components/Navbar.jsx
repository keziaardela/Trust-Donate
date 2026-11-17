
import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  HeartHandshake,
  Wallet,
  ArrowRight,
  Menu,
} from 'lucide-react'

import ProfileMenu from './ProfileMenu'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const [user, setUser] = useState(null)

  useEffect(() => {
    const updateUser = () => {
      const savedUser = localStorage.getItem('user')

      try {
        setUser(savedUser ? JSON.parse(savedUser) : null)
      } catch {
        setUser(null)
      }
    }

    updateUser()

    window.addEventListener('auth-change', updateUser)

    return () => {
      window.removeEventListener('auth-change', updateUser)
    }
  }, [])

  const goToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } })
    } else {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <header className="navbar">
      <div className="navbar-container">

        <Link to="/" className="logo">
          <div className="logo-icon">
            <HeartHandshake size={26} />
          </div>

          <div className="logo-text">
            <h2>TRUST<span>DONATE</span></h2>
            <p>DONASI TRANSPARAN, BANTUAN TEPAT SASARAN</p>
          </div>
        </Link>

        <nav className="nav-menu">
          <Link to="/">Beranda</Link>

          <Link to="/programs">Program Donasi</Link>

          <a
            href="#transparansi"
            onClick={(e) => {
              e.preventDefault()
              goToSection('transparansi')
            }}
          >
            Transparansi
          </a>

          <a
            href="#tentang-kami"
            onClick={(e) => {
              e.preventDefault()
              goToSection('tentang-kami')
            }}
          >
            Tentang Kami
          </a>
        </nav>

        <div className="nav-actions">

          {user ? (
            <ProfileMenu />
          ) : (
            <>
              <Link to="/login" className="wallet-button">
                <Wallet size={17} />
                Login Donatur
              </Link>

              <Link to="/login" className="donate-button">
                Donasi Sekarang
                <ArrowRight size={17} />
              </Link>
            </>
          )}

        </div>

        <button className="mobile-menu" aria-label="Menu">
          <Menu size={23} />
        </button>

      </div>
    </header>
  )
}

export default Navbar
