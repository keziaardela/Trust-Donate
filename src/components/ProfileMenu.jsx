
import { useState, useEffect } from 'react'
import {
  UserRound,
  ChevronDown,
  Wallet,
  LogOut,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function ProfileMenu() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false)

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

    window.addEventListener('storage', updateUser)
    window.addEventListener('auth-change', updateUser)

    return () => {
      window.removeEventListener('storage', updateUser)
      window.removeEventListener('auth-change', updateUser)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setUser(null)
    setOpen(false)

    window.dispatchEvent(new Event('auth-change'))
    navigate('/')
  }

  if (!user) return null

  return (
    <div className="profile-wrapper">

      <button
        className="profile-trigger"
        onClick={() => setOpen(!open)}
      >
        <div className="profile-avatar">
          <UserRound size={20} />
        </div>

        <div className="profile-name">
          <strong>{user.name}</strong>
          <span>
            {user.role === 'admin' ? 'Administrator' : 'Donatur'}
          </span>
        </div>

        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="profile-dropdown">

          <button
            onClick={() => {
              setOpen(false)
              navigate(
                user.role === 'admin'
                  ? '/admin/profile'
                  : '/profile'
              )
            }}
          >
            <UserRound size={17} />
            Profil Saya
          </button>

          {user.role === 'donor' && (
            <button
              onClick={() => {
                setOpen(false)
                navigate('/donation-history')
              }}
            >
              <Wallet size={17} />
              Riwayat Donasi
            </button>
          )}

          <div className="profile-divider" />

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            <LogOut size={17} />
            Keluar
          </button>

        </div>
      )}

    </div>
  )
}

export default ProfileMenu
