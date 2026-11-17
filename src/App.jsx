
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Programs from './pages/Programs'
import DonationForm from './pages/DonationForm'
import AdminDashboard from './pages/AdminDashboard'

import './App.css'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/donation-form" element={<DonationForm />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />}
/>
      </Routes>
    </>
  )
}

export default App
