
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MapPin,
  ArrowRight,
  Heart,
  Search,
  Users,
  SlidersHorizontal,
} from 'lucide-react'

// ======================================
// DATA PROGRAM DONASI
// Data nominal masih berupa simulasi UI
// ======================================

const campaigns = [
  {
    id: 1,
    title: 'Peduli Banjir Aceh Tamiang',
    location: 'Aceh Tamiang, Aceh',
    category: 'Banjir',
    description:
      'Bantuan kebutuhan pokok, perlengkapan darurat, dan pemulihan bagi masyarakat terdampak banjir.',
    image:
      'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=900',
    target: 50000000,
    collected: 32500000,
    impact: '18.158 jiwa terdampak*',
  },
  {
    id: 2,
    title: 'Bantuan Warga Subulussalam',
    location: 'Subulussalam, Aceh',
    category: 'Banjir',
    description:
      'Mendukung kebutuhan makanan, perlengkapan darurat, dan kebutuhan keluarga terdampak banjir.',
    image:
      'https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?w=900',
    target: 40000000,
    collected: 18000000,
    impact: '7.703 jiwa terdampak*',
  },
  {
    id: 3,
    title: 'Bantuan Banjir Rokan Hilir',
    location: 'Rokan Hilir, Riau',
    category: 'Banjir',
    description:
      'Membantu pemenuhan kebutuhan dasar masyarakat yang terdampak genangan banjir.',
    image:
      'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=900',
    target: 50000000,
    collected: 21000000,
    impact: 'Wilayah permukiman terdampak',
  },
  {
    id: 4,
    title: 'Bantuan Banjir Aceh Selatan',
    location: 'Aceh Selatan, Aceh',
    category: 'Banjir',
    description:
      'Dukungan kebutuhan darurat bagi warga yang terdampak luapan sungai dan banjir.',
    image:
      'https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?w=900',
    target: 35000000,
    collected: 12500000,
    impact: 'Masyarakat terdampak banjir',
  },
  {
    id: 5,
    title: 'Peduli Banjir Pesisir Selatan',
    location: 'Pesisir Selatan, Sumatera Barat',
    category: 'Banjir',
    description:
      'Bantuan kebutuhan sehari-hari dan pemulihan lingkungan bagi warga terdampak.',
    image:
      'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=900',
    target: 40000000,
    collected: 16000000,
    impact: 'Wilayah terdampak banjir',
  },
  {
    id: 6,
    title: 'Peduli Korban dan Dampak Karhutla',
    location: 'Wilayah terdampak Sumatera dan Kalimantan',
    category: 'Karhutla',
    description:
      'Bantuan kebutuhan dasar bagi masyarakat terdampak asap dan kebakaran hutan serta dukungan pemulihan lingkungan.',
    image:
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=900',
    target: 40000000,
    collected: 15000000,
    impact: 'Masyarakat terdampak asap dan kebakaran',
  },
  {
    id: 7,
    title: 'Peduli Kebakaran Permukiman',
    location: 'Klaten, Jawa Tengah',
    category: 'Kebakaran',
    description:
      'Mendukung kebutuhan darurat dan pemulihan bagi keluarga yang terdampak kebakaran permukiman.',
    image:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900',
    target: 25000000,
    collected: 9000000,
    impact: 'Keluarga terdampak kebakaran',
  },
  {
    id: 8,
    title: 'Bantuan Korban Angin Kencang',
    location: 'Bondowoso, Jawa Timur',
    category: 'Cuaca Ekstrem',
    description:
      'Bantuan untuk pemulihan rumah dan kebutuhan warga akibat kerusakan yang ditimbulkan angin kencang.',
    image:
      'https://images.unsplash.com/photo-1527489377706-5bf97e608852?w=900',
    target: 30000000,
    collected: 14000000,
    impact: 'Rumah dan fasilitas terdampak',
  },
  {
    id: 9,
    title: 'Bantuan Korban Tanah Longsor',
    location: 'Hulu Sungai Selatan, Kalimantan Selatan',
    category: 'Longsor',
    description:
      'Dukungan kebutuhan darurat dan pemulihan bagi masyarakat terdampak tanah longsor.',
    image:
      'https://images.unsplash.com/photo-1511497584788-876760111969?w=900',
    target: 35000000,
    collected: 12000000,
    impact: 'Wilayah terdampak longsor',
  },
  {
    id: 10,
    title: 'Bantuan Banjir Bandang Gayo Lues',
    location: 'Gayo Lues, Aceh',
    category: 'Banjir Bandang',
    description:
      'Bantuan kebutuhan pokok dan pemulihan bagi masyarakat yang terdampak banjir bandang.',
    image:
      'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=900',
    target: 45000000,
    collected: 22000000,
    impact: 'Permukiman terdampak banjir bandang',
  },
]

// ======================================
// FORMAT RUPIAH
// ======================================

const formatRupiah = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount)
}

// ======================================
// HALAMAN SEMUA PROGRAM
// ======================================

function Programs() {
  const navigate = useNavigate()

  const [activeCategory, setActiveCategory] = useState('Semua')
  const [search, setSearch] = useState('')

  const categories = [
    'Semua',
    'Banjir',
    'Banjir Bandang',
    'Karhutla',
    'Kebakaran',
    'Longsor',
    'Cuaca Ekstrem',
  ]

  // ======================================
  // ALUR TOMBOL DONASI
  // ======================================

  const handleDonate = (campaign) => {
    const savedUser = localStorage.getItem('user')

    if (savedUser) {
      try {
        JSON.parse(savedUser)

        navigate('/donation-form', {
          state: {
            program: campaign,
          },
        })
      } catch {
        localStorage.removeItem('user')

        navigate('/login', {
          state: {
            redirectToDonation: true,
            program: campaign,
          },
        })
      }
    } else {
      navigate('/login', {
        state: {
          redirectToDonation: true,
          program: campaign,
        },
      })
    }
  }

  // ======================================
  // FILTER PROGRAM
  // ======================================

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesCategory =
      activeCategory === 'Semua' ||
      campaign.category === activeCategory

    const matchesSearch =
      campaign.title.toLowerCase().includes(search.toLowerCase()) ||
      campaign.location.toLowerCase().includes(search.toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <main className="all-programs-page">

      {/* HEADER HALAMAN */}
      <section className="programs-heading">

        <span className="section-label">
          BERSAMA MEMBANTU SESAMA
        </span>

        <h1>Semua Program Donasi</h1>

        <p>
          Temukan program bantuan untuk masyarakat yang terdampak
          bencana di berbagai wilayah Indonesia.
        </p>

      </section>

      {/* DAFTAR PROGRAM */}
      <section className="all-programs-container">

        {/* SEARCH */}
        <div className="program-toolbar">

          <div className="program-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Cari nama program atau lokasi..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <span className="program-count">
            Menampilkan {filteredCampaigns.length} dari 10 program
          </span>

        </div>

        {/* FILTER KATEGORI */}
        <div className="category-filters">

          <SlidersHorizontal size={17} />

          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                activeCategory === category
                  ? 'category-button active'
                  : 'category-button'
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}

        </div>

        {/* KARTU PROGRAM */}
        <div className="campaign-grid">

          {filteredCampaigns.map((campaign) => {

            const percentage = Math.min(
              Math.round(
                (campaign.collected / campaign.target) * 100
              ),
              100
            )

            return (
              <article
                className="campaign-card"
                key={campaign.id}
              >

                {/* FOTO PROGRAM */}
                <div className="campaign-image">

                  <img
                    src={campaign.image}
                    alt={campaign.title}
                    loading="lazy"
                  />

                  <span className="campaign-category">
                    {campaign.category}
                  </span>

                </div>

                {/* INFORMASI PROGRAM */}
                <div className="campaign-content">

                  <span className="campaign-location">
                    <MapPin size={13} />
                    {campaign.location}
                  </span>

                  <h3>{campaign.title}</h3>

                  <p>{campaign.description}</p>

                  <div className="campaign-impact">
                    <Users size={15} />
                    {campaign.impact}
                  </div>

                  {/* PROGRESS DONASI */}
                  <div className="campaign-progress">

                    <div className="progress-info">
                      <span>Dana terkumpul</span>

                      <strong>
                        {formatRupiah(campaign.collected)}
                      </strong>
                    </div>

                    <div className="progress-track">

                      <div
                        className="progress-fill"
                        style={{ width: `${percentage}%` }}
                      />

                    </div>

                    <div className="progress-info">
                      <span>{percentage}% tercapai</span>

                      <span>
                        Target {formatRupiah(campaign.target)}
                      </span>
                    </div>

                  </div>

                  {/* TOMBOL DONASI */}
                  <button
                    type="button"
                    className="campaign-button"
                    onClick={() => handleDonate(campaign)}
                  >
                    <Heart size={15} />
                    Donasi Sekarang
                    <ArrowRight size={15} />
                  </button>

                </div>

              </article>
            )
          })}

        </div>

        {/* JIKA PROGRAM TIDAK DITEMUKAN */}
        {filteredCampaigns.length === 0 && (
          <div className="empty-programs">

            <Search size={32} />

            <h3>Program tidak ditemukan</h3>

            <p>
              Coba gunakan kata kunci atau kategori lainnya.
            </p>

            <button
              type="button"
              className="category-button active"
              onClick={() => {
                setSearch('')
                setActiveCategory('Semua')
              }}
            >
              Tampilkan Semua Program
            </button>

          </div>
        )}

        {/* CATATAN */}
        <div className="program-disclaimer">
          <p>
            Catatan: Nama lokasi dan peristiwa merupakan contoh
            kampanye untuk prototipe. Foto bersifat ilustrasi.
            Target dan nominal dana merupakan data simulasi,
            bukan jumlah donasi aktual atau penggalangan dana resmi.
            Data kejadian perlu diverifikasi sebelum dipublikasikan.
          </p>
        </div>

      </section>

    </main>
  )
}

export default Programs
