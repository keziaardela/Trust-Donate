
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  HeartHandshake,
  User,
  Mail,
  Lock,
  ArrowRight,
} from 'lucide-react'

function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (event) => {
    event.preventDefault()

    setError('')
    setLoading(true)

    try {
      const response = await fetch(
        'http://localhost:5000/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Pendaftaran gagal.')
      }

      alert('Pendaftaran berhasil! Silakan login.')

      navigate('/login')

    } catch (err) {
      setError(
        err.message || 'Tidak dapat terhubung ke server.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">

      <div className="auth-card">

        <Link to="/" className="auth-brand">
          <div className="logo-icon">
            <HeartHandshake size={27} />
          </div>
          <span>TRUST<span>DONATE</span></span>
        </Link>

        <div className="auth-heading">
          <span className="section-label">
            GABUNG BERSAMA KAMI
          </span>

          <h1>Buat Akun Donatur</h1>

          <p>
            Daftarkan akunmu dan mulai berbagi kebaikan
            untuk sesama.
          </p>
        </div>

        <form onSubmit={handleRegister}>

          <label htmlFor="name">Nama Lengkap</label>

          <div className="auth-input">
            <User size={18} />

            <input
              id="name"
              type="text"
              placeholder="Masukkan nama lengkap"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <label htmlFor="register-email">Email</label>

          <div className="auth-input">
            <Mail size={18} />

            <input
              id="register-email"
              type="email"
              placeholder="Masukkan email aktif"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label htmlFor="register-password">Password</label>

          <div className="auth-input">
            <Lock size={18} />

            <input
              id="register-password"
              type="password"
              placeholder="Buat password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>

          {error && (
            <p className="register-error">{error}</p>
          )}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Daftar Sekarang'}
            <ArrowRight size={17} />
          </button>

        </form>

        <p className="auth-switch">
          Sudah memiliki akun?
          <Link to="/login"> Login di sini</Link>
        </p>

        <Link to="/" className="back-home">
          Kembali ke halaman utama
        </Link>

      </div>

    </main>
  )
}

export default Register
