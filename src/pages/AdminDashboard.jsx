import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './AdminDashboard.css'

import {
  HeartHandshake,
  LayoutDashboard,
  HandHeart,
  Receipt,
  Users,
  ClipboardCheck,
  FileBarChart,
  Blocks,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Wallet,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Plus,
  MapPin,
} from 'lucide-react'

function AdminDashboard() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  let user = null

  try {
    user = JSON.parse(localStorage.getItem('user') || 'null')
  } catch {
    user = null
  }
useEffect(() => {
  if (!user || user.role !== 'admin') {
    navigate('/')
  }
}, [user, navigate])

if (!user || user.role !== 'admin') {
  return null
}
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.dispatchEvent(new Event('auth-change'))
    navigate('/login')
  }

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, active: true },
    { label: 'Program Donasi', icon: HandHeart },
    { label: 'Data Transaksi', icon: Receipt },
    { label: 'Verifikasi Pembayaran', icon: ClipboardCheck },
    { label: 'Data Donatur', icon: Users },
    { label: 'Laporan Penyaluran', icon: FileBarChart },
    { label: 'Transparansi Blockchain', icon: Blocks },
    { label: 'Pengaturan', icon: Settings },
  ]

  const transactions = [
    {
      name: 'Kezia',
      email: 'kezia@gmail.com',
      program: 'Bantuan Banjir Aceh Tamiang',
      amount: 'Rp50.000',
      method: 'QRIS',
      status: 'Berhasil',
    },
    {
      name: 'Eca',
      email: 'eca@gmail.com',
      program: 'Peduli Warga Subulussalam',
      amount: 'Rp100.000',
      method: 'Transfer Bank',
      status: 'Menunggu',
    },
    {
      name: 'Andi',
      email: 'andi@example.com',
      program: 'Bantuan Banjir Rokan Hilir',
      amount: 'Rp75.000',
      method: 'E-Wallet',
      status: 'Berhasil',
    },
    {
      name: 'Siti',
      email: 'siti@example.com',
      program: 'Bantuan Banjir Aceh Tamiang',
      amount: 'Rp25.000',
      method: 'QRIS',
      status: 'Menunggu',
    },
  ]

  const statistics = [
    {
      label: 'Total Donasi',
      value: 'Rp216.500.000',
      note: 'Total dana terkumpul',
      icon: Wallet,
      trend: '+12,8%',
    },
    {
      label: 'Total Donatur',
      value: '922',
      note: 'Pengguna terdaftar',
      icon: Users,
      trend: '+8,2%',
    },
    {
      label: 'Program Aktif',
      value: '12',
      note: 'Program berjalan',
      icon: HandHeart,
      trend: 'Aktif',
    },
    {
      label: 'Menunggu Verifikasi',
      value: '8',
      note: 'Transaksi perlu diperiksa',
      icon: Clock,
      trend: 'Perlu tindakan',
    },
  ]

  const chartData = [
    { month: 'Jan', value: 38 },
    { month: 'Feb', value: 55 },
    { month: 'Mar', value: 43 },
    { month: 'Apr', value: 70 },
    { month: 'Mei', value: 58 },
    { month: 'Jun', value: 85 },
    { month: 'Jul', value: 65 },
    { month: 'Agu', value: 95 },
    { month: 'Sep', value: 72 },
    { month: 'Okt', value: 88 },
    { month: 'Nov', value: 68 },
    { month: 'Des', value: 100 },
  ]

  return (
    <div className="admin-layout">

      {/* MOBILE HEADER */}
      <header className="admin-mobile-header">
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Buka menu"
        >
          {sidebarOpen ? <X /> : <Menu />}
        </button>

        <strong>TRUST<span>DONATE</span></strong>

        <Bell size={20} />
      </header>

      {/* SIDEBAR */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'show' : ''}`}>

        <Link to="/" className="admin-brand">
          <div className="admin-brand-icon">
            <HeartHandshake size={25} />
          </div>

          <div>
            <strong>TRUST<span>DONATE</span></strong>
            <small>ADMIN PANEL</small>
          </div>
        </Link>

        <div className="admin-sidebar-label">
          MENU UTAMA
        </div>

        <nav className="admin-navigation">
          {menuItems.map((item, index) => {
            const Icon = item.icon

            return (
              <a
                key={item.label}
                href={index === 0 ? '#dashboard' : `#${[
                  '',
                  'program-admin',
                  'transaksi-admin',
                  'verifikasi-admin',
                  'donatur-admin',
                  'laporan-admin',
                  'blockchain-admin',
                  'pengaturan-admin',
                ][index]}`}
                className={`admin-nav-item ${item.active ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </a>
            )
          })}
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-profile-mini">
            <div className="admin-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>

            <div className="admin-profile-text">
              <strong>{user?.name || 'Administrator'}</strong>
              <span>Administrator</span>
            </div>
          </div>

          <button
            type="button"
            className="admin-logout"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Keluar
          </button>
        </div>

      </aside>

      {sidebarOpen && (
        <div
          className="admin-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="admin-main" id="dashboard">

        {/* TOPBAR */}
        <header className="admin-topbar">

          <div>
            <div className="admin-breadcrumb">
              Halaman / <strong>Dashboard</strong>
            </div>

            <h1>Dashboard Admin</h1>
            <p>Selamat datang kembali, {user?.name || 'Admin'}!</p>
          </div>

          <div className="admin-topbar-actions">

            <button
              type="button"
              className="admin-search-button"
              aria-label="Pencarian"
            >
              <Search size={19} />
            </button>

            <button
              type="button"
              className="admin-notification"
              aria-label="Notifikasi"
            >
              <Bell size={19} />
              <span />
            </button>

            <div className="admin-topbar-profile">
              <div className="admin-avatar">
                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <div>
                <strong>{user?.name || 'Administrator'}</strong>
                <span>Admin</span>
              </div>
            </div>

          </div>
        </header>

        {/* STATISTICS */}
        <section className="admin-statistics">

          {statistics.map((item) => {
            const Icon = item.icon

            return (
              <article className="admin-stat-card" key={item.label}>

                <div className="admin-stat-top">
                  <div className="admin-stat-icon">
                    <Icon size={22} />
                  </div>

                  <span className="admin-stat-trend">
                    {item.trend}
                  </span>
                </div>

                <p>{item.label}</p>
                <h2>{item.value}</h2>
                <small>{item.note}</small>

              </article>
            )
          })}

        </section>

        {/* CHART AND SUMMARY */}
        <section className="admin-middle-grid">

          <article className="admin-panel admin-chart-panel">

            <div className="admin-panel-heading">
              <div>
                <h3>Statistik Donasi</h3>
                <p>Ringkasan aktivitas donasi sepanjang tahun</p>
              </div>

              <select aria-label="Periode grafik" defaultValue="2026">
                <option value="2026">Tahun 2026</option>
                <option value="2025">Tahun 2025</option>
              </select>
            </div>

            <div className="admin-chart-summary">
              <h2>Rp216.500.000</h2>
              <span>
                <TrendingUp size={15} />
                Data ilustrasi
              </span>
            </div>

            <div className="admin-chart">
              {chartData.map((item) => (
                <div className="admin-chart-column" key={item.month}>
                  <div className="admin-chart-bar-area">
                    <div
                      className="admin-chart-bar"
                      style={{ height: `${item.value}%` }}
                      title={`${item.month}: data ilustrasi`}
                    />
                  </div>
                  <span>{item.month}</span>
                </div>
              ))}
            </div>

          </article>

          <article className="admin-panel admin-quick-panel">

            <div className="admin-panel-heading">
              <div>
                <h3>Ringkasan Program</h3>
                <p>Informasi program donasi</p>
              </div>
            </div>

            <div className="admin-quick-item">
              <div className="admin-quick-icon">
                <HandHeart size={21} />
              </div>
              <div>
                <strong>Program Aktif</strong>
                <span>12 program berjalan</span>
              </div>
            </div>

            <div className="admin-quick-item">
              <div className="admin-quick-icon">
                <Clock size={21} />
              </div>
              <div>
                <strong>Menunggu Verifikasi</strong>
                <span>8 transaksi perlu diperiksa</span>
              </div>
            </div>

            <div className="admin-quick-item">
              <div className="admin-quick-icon">
                <FileBarChart size={21} />
              </div>
              <div>
                <strong>Laporan Penyaluran</strong>
                <span>Kelola laporan bantuan</span>
              </div>
            </div>

            <div className="admin-quick-note">
              <ShieldCheckIcon />
              <span>
                Pantau transaksi dan laporan untuk menjaga
                transparansi donasi.
              </span>
            </div>

          </article>

        </section>

        {/* TRANSACTIONS */}
        <section className="admin-panel admin-transactions" id="transaksi-admin">

          <div className="admin-panel-heading">

            <div>
              <h3>Transaksi Terbaru</h3>
              <p>Daftar transaksi donasi terbaru</p>
            </div>

            <a href="#transaksi-admin" className="admin-view-all">
              Lihat Semua <ArrowUpRight size={16} />
            </a>

          </div>

          <div className="admin-table-wrapper">
            <table className="admin-table">

              <thead>
                <tr>
                  <th>Donatur</th>
                  <th>Program Donasi</th>
                  <th>Nominal</th>
                  <th>Metode</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="admin-donor-cell">
                        <div className="admin-donor-avatar">
                          {item.name.charAt(0)}
                        </div>
                        <div>
                          <strong>{item.name}</strong>
                          <span>{item.email}</span>
                        </div>
                      </div>
                    </td>

                    <td>{item.program}</td>
                    <td><strong>{item.amount}</strong></td>
                    <td>{item.method}</td>

                    <td>
                      <span
                        className={`admin-status ${
                          item.status === 'Berhasil'
                            ? 'success'
                            : 'pending'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

          <p className="admin-demo-note">
            *Data transaksi di atas merupakan ilustrasi tampilan.
          </p>

        </section>

        {/* PROGRAM SUMMARY */}
        <section className="admin-panel admin-program-summary" id="program-admin">

          <div className="admin-panel-heading">
            <div>
              <h3>Program Donasi</h3>
              <p>Ringkasan program bantuan</p>
            </div>

            <button
              type="button"
              className="admin-add-button"
              onClick={() => alert('Fitur tambah program akan diintegrasikan berikutnya.')}
            >
              <Plus size={17} />
              Tambah Program
            </button>
          </div>

          <div className="admin-program-list">

            <div className="admin-program-row">
              <div className="admin-program-image">
                <HandHeart size={23} />
              </div>
              <div className="admin-program-detail">
                <strong>Bantuan Banjir Aceh Tamiang</strong>
                <span><MapPin size={13} /> Aceh Tamiang, Aceh</span>
                <div className="admin-progress-track">
                  <div style={{ width: '65%' }} />
                </div>
                <small>65% dari target dana</small>
              </div>
              <strong className="admin-program-amount">Rp32.500.000</strong>
            </div>

            <div className="admin-program-row">
              <div className="admin-program-image">
                <HandHeart size={23} />
              </div>
              <div className="admin-program-detail">
                <strong>Peduli Warga Subulussalam</strong>
                <span><MapPin size={13} /> Subulussalam, Aceh</span>
                <div className="admin-progress-track">
                  <div style={{ width: '45%' }} />
                </div>
                <small>45% dari target dana</small>
              </div>
              <strong className="admin-program-amount">Rp18.000.000</strong>
            </div>

          </div>

          <p className="admin-demo-note">
            *Nominal dan progres merupakan data ilustrasi.
          </p>

        </section>

        {/* FOOTER */}
        <footer className="admin-footer">
          <span>© 2026 TRUST DONATE. All Rights Reserved.</span>
          <span>Donasi Transparan, Bantuan Tepat Sasaran.</span>
        </footer>

      </main>

    </div>
  )
}

function ShieldCheckIcon() {
  return <ClipboardCheck size={20} />
}

export default AdminDashboard
