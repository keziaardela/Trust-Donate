
import { useState, useEffect } from 'react'

const demoDonors = [
  { id: 1, name: 'Kezia A.', amount: 50000 },
  { id: 2, name: 'Andi P.', amount: 25000 },
  { id: 3, name: 'Siti R.', amount: 100000 },
  { id: 4, name: 'Budi S.', amount: 75000 },
  { id: 5, name: 'Dina M.', amount: 50000 },
]

function Transparency() {
  const [activeDonor, setActiveDonor] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDonor(current => (current + 1) % demoDonors.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const formatRupiah = (amount) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount)

  return (
    <section className="transparency-section" id="transparansi">
      <div className="transparency-container">

        <div className="transparency-left">
          <span className="transparency-label">
            TERBUKA UNTUK SEMUA
          </span>

          <h2>
            Kenali perjalanan
            <em>setiap donasi.</em>
          </h2>

          <p>
            Pantau informasi transaksi, pencatatan blockchain,
            dan laporan penyaluran bantuan dalam satu tempat.
          </p>
        </div>

        <div className="transparency-card">
          <div className="network-heading">
            <h3>Ethereum Sepolia</h3>
            <span>JARINGAN PENGUJIAN</span>
          </div>

          <div className="transparency-details">
            <div className="detail-row">
              <span>Status transaksi</span>
              <strong>Menunggu integrasi</strong>
            </div>

            <div className="detail-row">
              <span>Transaction Hash</span>
              <strong>Belum tersedia</strong>
            </div>

            <div className="detail-row">
              <span>Bukti penyaluran</span>
              <strong>IPFS – tahap pengembangan</strong>
            </div>
          </div>

          <div className="donor-heading">
            <h4>Donatur Terbaru</h4>
            <span>Aktivitas donasi</span>
          </div>

          <div className="donor-list">
            {demoDonors.map((donor, index) => (
              <div
                key={donor.id}
                className={`donor-item ${
                  activeDonor === index ? 'active' : ''
                }`}
              >
                <div className="donor-avatar">
                  {donor.name.charAt(0)}
                </div>

                <div className="donor-info">
                  <strong>{donor.name}</strong>
                  <small>
                    {activeDonor === index
                      ? 'Donasi terbaru'
                      : 'Donatur'}
                  </small>
                </div>

                <span className="donor-amount">
                  {formatRupiah(donor.amount)}
                </span>
              </div>
            ))}
          </div>

          <div className="transparency-footer">
            <span>Data donasi dan penyaluran dapat ditelusuri</span>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Transparency
