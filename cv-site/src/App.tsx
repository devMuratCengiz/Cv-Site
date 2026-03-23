import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Link, Route, Routes, useParams } from 'react-router-dom'
import './App.css'
import {
  fallbackProfile,
  fallbackProjects,
  type Profile,
  type Project,
} from './data/fallback'
import { hasSupabaseEnv, supabase } from './lib/supabase'

type SiteData = {
  profile: Profile
  projects: Project[]
  source: 'fallback' | 'supabase'
}

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

async function loadSiteData(): Promise<SiteData> {
  if (!supabase || !hasSupabaseEnv) {
    return {
      profile: fallbackProfile,
      projects: fallbackProjects,
      source: 'fallback',
    }
  }

  const [{ data: profileData, error: profileError }, { data: projectRows, error: projectError }] =
    await Promise.all([
      supabase.from('profile').select('*').limit(1).maybeSingle(),
      supabase.from('projects').select('*').order('created_at', { ascending: false }),
    ])

  if (profileError || projectError) {
    console.error('Supabase fetch failed, fallback kullanılacak:', {
      profileError,
      projectError,
    })

    return {
      profile: fallbackProfile,
      projects: fallbackProjects,
      source: 'fallback',
    }
  }

  const projects: Project[] = (projectRows ?? []).map((row) => ({
    slug: row.slug,
    title: row.title,
    year: row.year,
    shortDescription: row.short_description,
    description: row.description,
    stack: row.stack ?? [],
    highlights: row.highlights ?? [],
    github: row.github ?? undefined,
    images: row.images ?? [],
  }))

  const profile: Profile = profileData
    ? {
        name: profileData.name,
        heroTitle: profileData.hero_title,
        heroDescription: profileData.hero_description,
        summary: profileData.summary,
        about: profileData.about ?? [],
        contactEmail: profileData.contact_email,
      }
    : fallbackProfile

  return {
    profile,
    projects: projects.length > 0 ? projects : fallbackProjects,
    source: 'supabase',
  }
}

function HomePage({ profile, projects, source }: { profile: Profile; projects: Project[]; source: SiteData['source'] }) {
  return (
    <div className="page">
      <header className="hero reveal reveal-delay-1">
        <Navbar />

        <div className="heroContent">
          <div className="heroText reveal reveal-delay-2">
            <p className="eyebrow">CV / Portfolio</p>
            <h1>{profile.heroTitle}</h1>
            <p className="lead">{profile.heroDescription}</p>
            <div className="heroActions">
              <a className="primaryBtn" href="#projects">
                Projeleri Gör
              </a>
              <a className="secondaryBtn" href="#contact">
                İletişim
              </a>
            </div>
            <p className="dataBadge">
              Veri kaynağı: {source === 'supabase' ? 'Supabase' : 'Yerel örnek veri'}
            </p>
          </div>

          <div className="heroCard reveal reveal-delay-3">
            <span className="badge">Açık Profil</span>
            <h2>Kısa Özet</h2>
            <p>{profile.summary}</p>
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
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="section statsGrid reveal reveal-delay-2">
          <div className="statCard floatCard">
            <strong>{projects.length}+</strong>
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
              Supabase bağlanınca bu listeyi panel/veritabanı üzerinden dinamik besleyebiliriz.
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
            <p className="contactMail">{profile.contactEmail}</p>
          </div>
        </section>
      </main>
    </div>
  )
}

function ProjectDetailPage({ projects }: { projects: Project[] }) {
  const { slug } = useParams()
  const project = useMemo(() => projects.find((item) => item.slug === slug), [projects, slug])

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
  const [siteData, setSiteData] = useState<SiteData>({
    profile: fallbackProfile,
    projects: fallbackProjects,
    source: 'fallback',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSiteData()
      .then((data) => setSiteData(data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="page loadingScreen">
        <div className="loadingCard">
          <span className="badge">Yükleniyor</span>
          <h1>Site verileri hazırlanıyor...</h1>
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              profile={siteData.profile}
              projects={siteData.projects}
              source={siteData.source}
            />
          }
        />
        <Route path="/projects/:slug" element={<ProjectDetailPage projects={siteData.projects} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
