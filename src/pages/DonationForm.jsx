
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  HeartHandshake,
  ArrowLeft,
  ShieldCheck,
  Wallet,
  CreditCard,
  Smartphone,
  CheckCircle2,
} from 'lucide-react'

function DonationForm() {
  const navigate = useNavigate()
  const location = useLocation()

  const program = location.state?.program || null

  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const [amount, setAmount] = useState('50000')
  const [customAmount, setCustomAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('qris')

  const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(Number(value || 0))
  }

  const selectedAmount = amount === 'other'
    ? Number(customAmount)
    : Number(amount)

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!selectedAmount || selectedAmount < 10000) {
      alert('Minimal donasi adalah Rp10.000')
      return
    }

    if (!paymentMethod) {
      alert('Silakan pilih metode pembayaran.')
      return
    }

    alert(
      `Form donasi berhasil disiapkan!\nNominal: ${formatRupiah(selectedAmount)}\nMetode: ${paymentMethod.toUpperCase()}\n\nIntegrasi pembayaran akan ditambahkan berikutnya.`
    )
  }

  return (
    <main className="donation-page">

      <div className="donation-container">

        <button
          className="donation-back"
          onClick={() => navigate(-1)}
          type="button"
        >
          <ArrowLeft size={17} />
          Kembali
        </button>

        <div className="donation-layout">

          {/* BAGIAN KIRI */}
          <section className="donation-information">

            <span className="donation-label">
              SALURKAN KEBAIKAN
            </span>

            <h1>
              Satu Kebaikan,
              <span> Sejuta Harapan.</span>
            </h1>

            <p className="donation-description">
              Setiap donasi yang kamu berikan menjadi harapan
              bagi saudara kita yang sedang membutuhkan bantuan.
            </p>

            <div className="donation-info-card">

              <div className="donation-info-icon">
                <HeartHandshake size={24} />
              </div>

              <div>
                <strong>Donasi Transparan</strong>
                <p>
                  Setiap transaksi akan dicatat dan dapat
                  ditelusuri melalui sistem TRUST DONATE.
                </p>
              </div>

            </div>

            <div className="donation-security">
              <ShieldCheck size={19} />
              <span>Donasi aman dan tercatat secara transparan</span>
            </div>

          </section>

          {/* BAGIAN KANAN */}
          <section className="donation-form-card">

            <div className="donation-form-heading">
              <div className="donation-form-icon">
                <HeartHandshake size={25} />
              </div>

              <h2>Form Donasi</h2>

              <p>
                Lengkapi informasi donasi kamu di bawah ini.
              </p>
            </div>

            <form onSubmit={handleSubmit}>

              {/* PROGRAM */}
              <div className="donation-field">

                <label>Program Donasi</label>

                <div className="donation-selected-program">
                  <span className="program-small-label">
                    PROGRAM YANG DIPILIH
                  </span>

                  <strong>
                    {program?.title || 'Program donasi belum dipilih'}
                  </strong>
                </div>

              </div>

              {/* DATA DONATUR */}
              <div className="donation-field">

                <label>Nama Donatur</label>

                <input
                  type="text"
                  value={user?.name || ''}
                  readOnly
                />

              </div>

              <div className="donation-field">

                <label>Email</label>

                <input
                  type="email"
                  value={user?.email || ''}
                  readOnly
                />

              </div>

              {/* NOMINAL */}
              <div className="donation-field">

                <label>Nominal Donasi</label>

                <div className="donation-amount-options">

                  {['25000', '50000', '100000', '250000'].map((value) => (
                    <button
                      type="button"
                      key={value}
                      className={
                        amount === value
                          ? 'amount-option active'
                          : 'amount-option'
                      }
                      onClick={() => setAmount(value)}
                    >
                      Rp{Number(value).toLocaleString('id-ID')}
                    </button>
                  ))}

                </div>

                <button
                  type="button"
                  className={
                    amount === 'other'
                      ? 'amount-option other-option active'
                      : 'amount-option other-option'
                  }
                  onClick={() => setAmount('other')}
                >
                  Nominal lainnya
                </button>

                {amount === 'other' && (
                  <input
                    className="custom-amount-input"
                    type="number"
                    min="10000"
                    placeholder="Masukkan nominal donasi"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    required
                  />
                )}

                <small>Minimal donasi Rp10.000</small>

              </div>

              {/* METODE PEMBAYARAN */}
              <div className="donation-field">

                <label>Metode Pembayaran</label>

                <div className="payment-options">

                  <button
                    type="button"
                    className={
                      paymentMethod === 'qris'
                        ? 'payment-option selected'
                        : 'payment-option'
                    }
                    onClick={() => setPaymentMethod('qris')}
                  >
                    <Smartphone size={20} />
                    <span>QRIS</span>
                    {paymentMethod === 'qris' && (
                      <CheckCircle2 size={17} />
                    )}
                  </button>

                  <button
                    type="button"
                    className={
                      paymentMethod === 'transfer'
                        ? 'payment-option selected'
                        : 'payment-option'
                    }
                    onClick={() => setPaymentMethod('transfer')}
                  >
                    <Wallet size={20} />
                    <span>Transfer Bank</span>
                    {paymentMethod === 'transfer' && (
                      <CheckCircle2 size={17} />
                    )}
                  </button>

                  <button
                    type="button"
                    className={
                      paymentMethod === 'ewallet'
                        ? 'payment-option selected'
                        : 'payment-option'
                    }
                    onClick={() => setPaymentMethod('ewallet')}
                  >
                    <CreditCard size={20} />
                    <span>E-Wallet</span>
                    {paymentMethod === 'ewallet' && (
                      <CheckCircle2 size={17} />
                    )}
                  </button>

                </div>

              </div>

              {/* RINGKASAN */}
              <div className="donation-summary">

                <span>Total Donasi</span>

                <strong>
                  {formatRupiah(
                    Number.isFinite(selectedAmount) ? selectedAmount : 0
                  )}
                </strong>

              </div>

              <button
                type="submit"
                className="donation-submit"
              >
                Lanjutkan Donasi
              </button>

              <div className="donation-footer-note">
                <ShieldCheck size={15} />
                <span>Informasi donasi kamu terlindungi.</span>
              </div>

            </form>

          </section>

        </div>

      </div>

    </main>
  )
}

export default DonationForm
