import { BrowserRouter, Link, Route, Routes, useParams } from 'react-router-dom'
import './App.css'

type Project = {
  slug: string
  title: string
  year: string
  shortDescription: string
  description: string
  stack: string[]
  highlights: string[]
  github?: string
  images: string[]
}

const projects: Project[] = [
  {
    slug: 'todo-app',
    title: 'To-Do App',
    year: '2026',
    shortDescription:
      'React Native ile geliştirilmiş, sade tasarımlı bir görev takip uygulaması.',
    description:
      'Bu proje, günlük görevleri hızlıca eklemek, filtrelemek ve tamamlanan işleri düzenli biçimde yönetmek için geliştirildi. Mobil öncelikli düşünülmüş sade bir arayüz ve pratik kullanıcı deneyimi hedeflenmiştir.',
    stack: ['React Native', 'Expo', 'TypeScript'],
    highlights: [
      'Görev ekleme, silme ve tamamlama akışı',
      'Aktif / tamamlanan görev filtreleri',
      'Mobil öncelikli sade arayüz',
    ],
    github: 'https://github.com/username/todo-app',
    images: [
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    slug: 'cv-portfolio-website',
    title: 'CV / Portfolio Website',
    year: '2026',
    shortDescription:
      'Kişisel bilgileri ve projeleri profesyonel şekilde sunan modern web sitesi.',
    description:
      'Bu site; hakkımda bilgileri, yetenekleri ve geliştirdiğim projeleri düzenli ve modern bir arayüzle göstermek için hazırlandı. Sade görünüm, okunabilirlik ve ileride genişletilebilir yapı ön planda tutuldu.',
    stack: ['React', 'Vite', 'TypeScript', 'CSS'],
    highlights: [
      'Responsive modern arayüz',
      'Animasyonlu section geçişleri',
      'Detay sayfasına giden proje kartları',
    ],
    github: 'https://github.com/username/cv-site',
    images: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    slug: 'gelecek-proje',
    title: 'Eklenecek Proje',
    year: 'Yakında',
    shortDescription:
      'Gerçek projelerinden biri için hazır bekleyen detaylı sunum alanı.',
    description:
      'Bu alan, ileride ekleyeceğin gerçek bir projeyi profesyonel şekilde sunmak için hazırlandı. Problemi, çözümü, teknik mimarisi, kullanılan araçlar ve elde edilen sonuçlar burada anlatılabilir.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL'],
    highlights: [
      'Problemi ne çözdüğü',
      'Teknik mimari anlatımı',
      'Sonuç ve çıktıların özetlenmesi',
    ],
    github: 'https://github.com/username/new-project',
    images: [
      'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    ],
  },
]

function Navbar() {
  return (
    <nav className="nav">
      <Link className="brand" to="/">
        Murat
      </Link>
      <div className="navLinks">
        <a href="#about">Hakkımda</a>
        <a href="#projects">Projeler</a>
        <a href="#contact">İletişim</a>
      </div>
    </nav>
  )
}

function HomePage() {
  return (
    <div className="page">
      <header className="hero reveal reveal-delay-1">
        <Navbar />

        <div className="heroContent">
          <div className="heroText reveal reveal-delay-2">
            <p className="eyebrow">CV / Portfolio</p>
            <h1>Murat için modern bir kişisel site</h1>
            <p className="lead">
              Yazılım öğrenen, üreten ve geliştirdiklerini düzenli biçimde sunmak
              isteyen biri olarak; burada kendimden bahsedebilir, yeteneklerimi
              paylaşabilir ve projelerimi detaylarıyla gösterebilirim.
            </p>
            <div className="heroActions">
              <a className="primaryBtn" href="#projects">
                Projeleri Gör
              </a>
              <a className="secondaryBtn" href="#contact">
                İletişim
              </a>
            </div>
          </div>

          <div className="heroCard reveal reveal-delay-3">
            <span className="badge">Açık Profil</span>
            <h2>Kısa Özet</h2>
            <p>
              React, mobil uygulamalar ve modern web teknolojileriyle ilgileniyorum.
              Öğrendiklerimi gerçek projelere dönüştürmeyi seviyorum.
            </p>
            <ul>
              <li>Frontend odaklı geliştirme</li>
              <li>Mobil uygulama denemeleri</li>
              <li>Ürün fikrini hızlı prototipleme</li>
            </ul>
          </div>
        </div>
      </header>

      <main>
        <section id="about" className="section twoColumn reveal reveal-delay-1 section-anchor">
          <div>
            <p className="sectionLabel">Hakkımda</p>
            <h2>Kendimi tanıtabileceğim alan</h2>
          </div>
          <div className="textBlock">
            <p>
              Bu bölümde eğitim geçmişini, ilgi alanlarını, hangi teknolojilere
              odaklandığını ve nasıl bir geliştirici olmak istediğini anlatabiliriz.
            </p>
            <p>
              İstersen bunu sade bir dille, istersen daha profesyonel İngilizce/Türkçe
              CV tonu ile yeniden yazabilirim.
            </p>
          </div>
        </section>

        <section className="section statsGrid reveal reveal-delay-2">
          <div className="statCard floatCard">
            <strong>3+</strong>
            <span>Öne çıkarılmış proje</span>
          </div>
          <div className="statCard floatCard">
            <strong>Web</strong>
            <span>Modern frontend yaklaşımı</span>
          </div>
          <div className="statCard floatCard">
            <strong>Mobil</strong>
            <span>React Native denemeleri</span>
          </div>
          <div className="statCard floatCard">
            <strong>Canlı</strong>
            <span>Kolayca güncellenebilir yapı</span>
          </div>
        </section>

        <section id="projects" className="section reveal reveal-delay-3 section-anchor">
          <div className="sectionHeader">
            <div>
              <p className="sectionLabel">Projeler</p>
              <h2>Geliştirdiğim işleri detaylı gösterebildiğim alan</h2>
            </div>
            <p className="sectionHint">
              Buradaki tüm içerikleri senin gerçek projelerine göre doldurabiliriz.
            </p>
          </div>

          <div className="projectsGrid">
            {projects.map((project, index) => (
              <article
                className="projectCard reveal projectReveal"
                style={{ animationDelay: `${0.15 * (index + 1)}s` }}
                key={project.slug}
              >
                <div className="projectTop">
                  <span className="year">{project.year}</span>
                  <h3>{project.title}</h3>
                  <p>{project.shortDescription}</p>
                </div>

                <div className="stackRow">
                  {project.stack.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>

                <ul className="highlightList">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>

                <Link className="detailLink" to={`/projects/${project.slug}`}>
                  Detay Sayfasına Git
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section contactSection reveal reveal-delay-4 section-anchor">
          <div>
            <p className="sectionLabel">İletişim</p>
            <h2>Senin bilgilerinle doldurulacak son bölüm</h2>
          </div>
          <div className="contactCard">
            <p>
              Buraya e-posta, GitHub, LinkedIn, X/Twitter veya kişisel iletişim
              kanallarını ekleyebiliriz.
            </p>
            <p className="contactMail">ornekmail@example.com</p>
          </div>
        </section>
      </main>
    </div>
  )
}

function ProjectDetailPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return (
      <div className="page detailPageWrap">
        <div className="detailPage notFoundCard">
          <h1>Proje bulunamadı</h1>
          <p>Bu projeye ait detay sayfası henüz oluşturulmamış olabilir.</p>
          <Link className="primaryBtn" to="/">
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page detailPageWrap">
      <div className="detailPage reveal reveal-delay-1">
        <div className="detailTopbar">
          <Link className="backLink" to="/">
            ← Ana sayfaya dön
          </Link>
          <span className="year">{project.year}</span>
        </div>

        <div className="detailHero">
          <div>
            <p className="sectionLabel">Proje Detayı</p>
            <h1>{project.title}</h1>
            <p className="detailLead">{project.shortDescription}</p>
          </div>
          {project.github ? (
            <a className="primaryBtn" href={project.github} target="_blank" rel="noreferrer">
              GitHub'a Git
            </a>
          ) : null}
        </div>

        <div className="detailGrid">
          <section className="detailCard">
            <h2>Kısa Açıklama</h2>
            <p>{project.description}</p>
          </section>

          <section className="detailCard">
            <h2>Kullanılan Teknolojiler</h2>
            <div className="stackRow">
              {project.stack.map((item) => (
                <span className="chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </section>
        </div>

        <section className="detailCard">
          <h2>Öne Çıkan Noktalar</h2>
          <ul className="highlightList">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </section>

        <section className="detailCard">
          <div className="detailSectionHeader">
            <h2>Proje Ekran Görüntüleri</h2>
            <p>İstersen bunları sonra gerçek görsellerinle değiştiririz.</p>
          </div>
          <div className="galleryGrid">
            {project.images.map((image, index) => (
              <div className="galleryCard" key={`${project.slug}-${index}`}>
                <img src={image} alt={`${project.title} ekran görüntüsü ${index + 1}`} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
