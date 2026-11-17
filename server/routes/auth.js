
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../config/database')

const router = express.Router()

// =================================
// REGISTRASI DONATUR
// =================================
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Validasi input
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Nama, email, dan password wajib diisi.',
      })
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: 'Password minimal 8 karakter.',
      })
    }

    const cleanEmail = email.trim().toLowerCase()

    // Cek apakah email sudah terdaftar
    const [existingUser] = await db.query(
      'SELECT user_id FROM users WHERE email = ?',
      [cleanEmail]
    )

    if (existingUser.length > 0) {
      return res.status(409).json({
        message: 'Email sudah terdaftar.',
      })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Simpan akun dengan role donor
    const [result] = await db.query(
      `INSERT INTO users (name, email, password_hash, role)
       VALUES (?, ?, ?, 'donor')`,
      [name.trim(), cleanEmail, passwordHash]
    )

    res.status(201).json({
      message: 'Registrasi berhasil!',
      user: {
        user_id: result.insertId,
        name: name.trim(),
        email: cleanEmail,
        role: 'donor',
      },
    })

  } catch (error) {
    console.error('Register error:', error)

    res.status(500).json({
      message: 'Terjadi kesalahan pada server.',
    })
  }
})

// =================================
// LOGIN DONATUR DAN ADMIN
// =================================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email dan password wajib diisi.',
      })
    }

    const cleanEmail = email.trim().toLowerCase()

    // Cari akun berdasarkan email
    const [users] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [cleanEmail]
    )

    if (users.length === 0) {
      return res.status(401).json({
        message: 'Email atau password salah.',
      })
    }

    const user = users[0]

    // Cocokkan password dengan hash
    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    )

console.log('Email ditemukan:', user.email)
console.log('Password cocok:', passwordMatch)

    if (!passwordMatch) {
      return res.status(401).json({
        message: 'Email atau password salah.',
      })
    }

    // Buat token login
    if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET belum dikonfigurasi.')
}
    const token = jwt.sign(
      {
        user_id: user.user_id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.json({
      message: 'Login berhasil!',
      token,
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })

  } catch (error) {
    console.error('Login error:', error)

    res.status(500).json({
      message: 'Terjadi kesalahan pada server.',
    })
  }
})

module.exports = router
