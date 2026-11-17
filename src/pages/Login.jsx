
import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  HeartHandshake,
  Mail,
  Lock,
  ArrowRight,
} from 'lucide-react'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    setError('')
    setLoading(true)

    try {
      const response = await fetch(
        'http://localhost:5000/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Login gagal.')
      }

      // Simpan token dan data pengguna
      localStorage.setItem('token', result.token)
      localStorage.setItem('user', JSON.stringify(result.user))

      // Beritahu Navbar bahwa pengguna sudah login
      window.dispatchEvent(new Event('auth-change'))

      alert('Selamat datang, ' + result.user.name + '!')

      // Arahkan berdasarkan tujuan sebelum login
  if (
  location.state?.redirectToDonation &&
  result.user.role === 'donor'
) {
  navigate('/donation-form', {
    state: {
      program: location.state.program,
    },
  })
} else if (result.user.role === 'admin') {
  navigate('/admin/dashboard')
} else {
  navigate('/')
}

    } catch (error) {
      setError(error.message || 'Tidak dapat terhubung ke server.')
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
            SELAMAT DATANG KEMBALI
          </span>

          <h1>Masuk ke Akun</h1>

          <p>
            Login untuk melanjutkan donasi dan melihat
            riwayat bantuanmu.
          </p>
        </div>

        <form onSubmit={handleLogin}>

          <label htmlFor="email">Email</label>

          <div className="auth-input">
            <Mail size={18} />

            <input
              id="email"
              type="email"
              placeholder="Masukkan email kamu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label htmlFor="password">Password</label>

          <div className="auth-input">
            <Lock size={18} />

            <input
              id="password"
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Login'}
            <ArrowRight size={17} />
          </button>

        </form>

        <p className="auth-switch">
          Belum memiliki akun?
          <Link to="/register"> Daftar sekarang</Link>
        </p>

        <Link to="/" className="back-home">
          Kembali ke halaman utama
        </Link>

      </div>

    </main>
  )
}

export default Login
