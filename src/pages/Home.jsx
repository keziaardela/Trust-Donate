import {
  Heart,
  HeartHandshake,
  ShieldCheck,
  Users,
  FileCheck,
  ArrowRight,
  ChartNoAxesColumnIncreasing,
} from 'lucide-react'

import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Transparency from './Transparency'

function Home() {
  const location = useLocation()

      const navigate = useNavigate()

  const handleDonate = (program) => {
    const savedUser = localStorage.getItem('user')

    if (savedUser) {
      try {
        JSON.parse(savedUser)

        navigate('/donation-form', {
          state: { program },
        })
      } catch {
        localStorage.removeItem('user')

        navigate('/login', {
          state: {
            redirectToDonation: true,
            program,
          },
        })
      }
    } else {
      navigate('/login', {
        state: {
          redirectToDonation: true,
          program,
        },
      })
    }
  }

  useEffect(() => {
    const sectionId = location.state?.scrollTo || location.hash.replace('#', '')

    if (!sectionId) return

    const timer = setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 300)

    return () => clearTimeout(timer)
  }, [location])

  return (
    <>
      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-container">

          <div className="hero-content">

            <div className="hero-label">
              BERSAMA MEMBANTU SESAMA
            </div>

            <h1>
              Ulurkan Kepedulian,
              <span>Hadirkan Harapan.</span>
            </h1>

            <p className="hero-description">
              Salurkan bantuan untuk saudara kita yang terdampak
              bencana. Setiap donasi tercatat dan dapat ditelusuri
              untuk mendukung transparansi.
            </p>

            <div className="hero-buttons">
              <Link to="/login" className="button-primary">
                Mulai Berdonasi
                <ArrowRight size={17} />
              </Link>

              <a
  href="#transparansi"
  className="button-outline"
  onClick={(e) => {
    e.preventDefault()
    document.getElementById('transparansi')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }}
>
  Lihat Transparansi
</a>
            </div>

            <div className="hero-trust">
              <ShieldCheck size={19} />
              <span>
                Pencatatan transaksi berbasis blockchain ·
                Laporan penyaluran terbuka
              </span>
            </div>

          </div>

          <div className="hero-visual">

            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200"
              alt="Kegiatan bantuan kemanusiaan"
              className="hero-photo"
            />

            <div className="floating-card">
              <Heart size={26} />

              <div>
                <h3>Bantuan penuh arti</h3>
                <p>Setiap kebaikan berarti</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* STATISTIK */}
      <section className="stats-section">
        <div className="stats-container">

          <div className="stats-item">
            <div className="stats-icon">
              <HeartHandshake />
            </div>
            <div>
              <h3>Rp216 Juta+</h3>
              <p>Total donasi terkumpul*</p>
            </div>
          </div>

          <div className="stats-item">
            <div className="stats-icon">
              <Users />
            </div>
            <div>
              <h3>922+</h3>
              <p>Donatur*</p>
            </div>
          </div>

          <div className="stats-item">
            <div className="stats-icon">
              <Heart />
            </div>
            <div>
              <h3>12</h3>
              <p>Program bantuan*</p>
            </div>
          </div>

          <div className="stats-item">
            <div className="stats-icon">
              <FileCheck />
            </div>
            <div>
              <h3>Terbuka</h3>
              <p>Laporan penyaluran</p>
            </div>
          </div>

        </div>

        <p className="stats-note">
          *Data ilustrasi untuk tampilan demo.
        </p>
      </section>

      {/* PROGRAM DONASI */}


      {/* PROGRAM DONASI */}
      <section className="program-section" id="program">

        <div className="section-container program-container">

          <span className="section-label">
            SALURKAN KEBAIKANMU
          </span>

          <h2>Program Donasi Pilihan</h2>

          <p className="program-intro">
            Mari bantu saudara kita yang terdampak bencana.
            Setiap bantuan memberikan harapan untuk bangkit kembali.
          </p>

          <div className="campaign-grid">

            {/* PROGRAM 1 */}
            <article className="campaign-card">

              <div className="campaign-image">
                <img
                  src="https://images.unsplash.com/photo-1547683905-f686c993aae5?w=900"
                  alt="Ilustrasi bencana banjir"
                />
                <span className="campaign-category">Banjir</span>
              </div>

              <div className="campaign-content">

                <span className="campaign-location">
                  Aceh Tamiang, Aceh
                </span>

                <h3>
                  Bantuan Darurat untuk Korban Banjir Aceh Tamiang
                </h3>

                <p>
                  Dukungan kebutuhan pokok dan pemulihan bagi
                  masyarakat yang terdampak banjir.
                </p>

                <div className="campaign-impact">
                  <Users size={15} />
                  18.158 jiwa terdampak*
                </div>

                <div className="campaign-progress">
                  <div className="progress-info">
                    <span>Dana terkumpul</span>
                    <strong>Rp 32.500.000</strong>
                  </div>

                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: '65%' }}
                    ></div>
                  </div>

                  <div className="progress-info">
                    <span>65% tercapai</span>
                    <span>Target Rp 50.000.000</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="campaign-button"
                  onClick={() => handleDonate({
                    title: 'Bantuan Darurat untuk Korban Banjir Aceh Tamiang',
                    location: 'Aceh Tamiang, Aceh',
                    category: 'Banjir',
                  })}
                >
                  Donasi Sekarang
                  <ArrowRight size={16} />
                </button>

              </div>
            </article>


            {/* PROGRAM 2 */}
            <article className="campaign-card">

              <div className="campaign-image">
                <img
                  src="https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?w=900"
                  alt="Ilustrasi kawasan terdampak banjir"
                />
                <span className="campaign-category">Banjir</span>
              </div>

              <div className="campaign-content">

                <span className="campaign-location">
                  Subulussalam, Aceh
                </span>

                <h3>
                  Peduli Warga Terdampak Banjir Subulussalam
                </h3>

                <p>
                  Membantu kebutuhan makanan, perlengkapan
                  darurat, dan kebutuhan keluarga terdampak.
                </p>

                <div className="campaign-impact">
                  <Users size={15} />
                  7.703 jiwa terdampak*
                </div>

                <div className="campaign-progress">
                  <div className="progress-info">
                    <span>Dana terkumpul</span>
                    <strong>Rp 18.000.000</strong>
                  </div>

                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: '45%' }}
                    ></div>
                  </div>

                  <div className="progress-info">
                    <span>45% tercapai</span>
                    <span>Target Rp 40.000.000</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="campaign-button"
                  onClick={() => handleDonate({
                    title: 'Peduli Warga Terdampak Banjir Subulussalam',
                    location: 'Subulussalam, Aceh',
                    category: 'Banjir',
                  })}
                >
                  Donasi Sekarang
                  <ArrowRight size={16} />
                </button>

              </div>
            </article>


            {/* PROGRAM 3 */}
            <article className="campaign-card">

              <div className="campaign-image">
                <img
                  src="https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=900"
                  alt="Ilustrasi wilayah terdampak bencana"
                />
                <span className="campaign-category">Banjir</span>
              </div>

              <div className="campaign-content">

                <span className="campaign-location">
                  Rokan Hilir, Riau
                </span>

                <h3>
                  Bantuan Kemanusiaan untuk Warga Rokan Hilir
                </h3>

                <p>
                  Mendukung kebutuhan dasar masyarakat
                  yang terdampak genangan banjir.
                </p>

                <div className="campaign-impact">
                  <Users size={15} />
                  17.612 jiwa terdampak*
                </div>

                <div className="campaign-progress">
                  <div className="progress-info">
                    <span>Dana terkumpul</span>
                    <strong>Rp 21.000.000</strong>
                  </div>

                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: '42%' }}
                    ></div>
                  </div>

                  <div className="progress-info">
                    <span>42% tercapai</span>
                    <span>Target Rp 50.000.000</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="campaign-button"
                  onClick={() => handleDonate({
                    title: 'Bantuan Kemanusiaan untuk Warga Rokan Hilir',
                    location: 'Rokan Hilir, Riau',
                    category: 'Banjir',
                  })}
                >
                  Donasi Sekarang
                  <ArrowRight size={16} />
                </button>

              </div>
            </article>

          </div>

          <div className="campaign-footer">
            <p>
              *Data dampak berdasarkan laporan BNPB.
              Nominal donasi dan target merupakan simulasi tampilan.
            </p>

            <Link to="/programs" className="view-all-button">
              Lihat Semua Program
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </section>


{/* TRANSPARANSI SLIDER */}
<Transparency />

{/* MENGAPA TRUST DONATE */}
<section className="why-section" id="tentang-kami">
  <div className="why-container">

    <div className="why-image">
      <img
        src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200"
        alt="Kegiatan bantuan kemanusiaan"
      />
    </div>

    <div className="why-content">

      <span className="section-label">
        MENGAPA TRUST DONATE?
      </span>

      <h2>
        Kebaikan yang bisa
        <em> ditelusuri.</em>
      </h2>

      <p className="why-description">
        Kami menggabungkan kemudahan donasi digital
        dengan pencatatan transaksi blockchain agar
        informasi donasi lebih terbuka.
      </p>

      <div className="why-features">

        <div className="why-item">
          <div className="why-icon">
            <ShieldCheck size={27} />
          </div>
          <div>
            <h4>Pencatatan transparan</h4>
            <p>
              Transaksi yang telah dikonfirmasi direncanakan
              tercatat pada Ethereum Sepolia.
            </p>
          </div>
        </div>

        <div className="why-item">
          <div className="why-icon">
            <ChartNoAxesColumnIncreasing size={27} />
          </div>
          <div>
            <h4>Laporan penyaluran</h4>
            <p>
              Informasi penyaluran dan dokumentasi bantuan
              dapat dilihat melalui dashboard.
            </p>
          </div>
        </div>

        <div className="why-item">
          <div className="why-icon">
            <HeartHandshake size={27} />
          </div>
          <div>
            <h4>Donasi mudah</h4>
            <p>
              Rancangan mendukung QRIS, Virtual Account,
              dan metode pembayaran lainnya.
            </p>
          </div>
        </div>

      </div>
    </div>

  </div>
</section>



      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">

          <div className="logo footer-logo">
            <div className="logo-icon">
              <HeartHandshake size={24} />
            </div>
            <div className="logo-text">
              <h2>TRUST<span>DONATE</span></h2>
              <p>DONASI TRANSPARAN, BANTUAN TEPAT SASARAN</p>
            </div>
          </div>

          <p>
            Bersama membangun harapan melalui kepedulian dan transparansi.
          </p>

          <span>© 2026 TRUST DONATE. All Rights Reserved.</span>

        </div>
      </footer>
    </>
  )
}

export default Home
