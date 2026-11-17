
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const db = require('./config/database')
const authRoutes = require('./routes/auth')

const app = express()
app.use((req, res, next) => {
  console.log('Request:', req.method, req.url)
  next()
})

// Izinkan frontend Vite mengakses backend
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
  ],
  credentials: true,
}))

app.use(express.json())

// Route autentikasi
app.use('/api/auth', authRoutes)

// Tes backend
app.get('/api/health', (req, res) => {
  res.json({
    message: 'Backend TRUST DONATE berjalan!',
  })
})

// Tes database
app.get('/api/db-test', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 AS hasil')

    res.json({
      message: 'Database berhasil terhubung!',
      data: rows,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Database gagal terhubung.',
    })
  }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`)
})
