import { useEffect, useMemo, useRef, useState } from 'react'
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom'
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

function useRevealOnView() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const elements = Array.from(container.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -40px 0px',
      },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return containerRef
}

type ProjectForm = {
  slug: string
  title: string
  year: string
  shortDescription: string
  description: string
  stack: string
  highlights: string
  github: string
  images: string
}

const emptyProjectForm: ProjectForm = {
  slug: '',
  title: '',
  year: '',
  shortDescription: '',
  description: '',
  stack: '',
  highlights: '',
  github: '',
  images: '',
}

function splitLines(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

function createProjectForm(project?: Project): ProjectForm {
  if (!project) return emptyProjectForm

  return {
    slug: project.slug,
    title: project.title,
    year: project.year,
    shortDescription: project.shortDescription,
    description: project.description,
    stack: project.stack.join('\n'),
    highlights: project.highlights.join('\n'),
    github: project.github ?? '',
    images: project.images.join('\n'),
  }
}

function Navbar() {
  const handleNavScroll = (
    event: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    event.preventDefault()

    const target = document.getElementById(targetId)
    if (!target) return

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })

    window.history.replaceState(null, '', `#${targetId}`)
  }

  return (
    <nav className="nav">
      <Link className="brand" to="/">
        Murat
      </Link>
      <div className="navLinks">
        <a href="#about" onClick={(event) => handleNavScroll(event, 'about')}>
          Hakkımda
        </a>
        <a
          href="#projects"
          onClick={(event) => handleNavScroll(event, 'projects')}
        >
          Projeler
        </a>
        <a href="#contact" onClick={(event) => handleNavScroll(event, 'contact')}>
          İletişim
        </a>
        <Link to="/admin">Admin</Link>
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

function HomePage({
  profile,
  projects,
  source,
}: {
  profile: Profile
  projects: Project[]
  source: SiteData['source']
}) {
  const revealRef = useRevealOnView()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 60)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <div className={`page ${mounted ? 'page-mounted' : ''}`} ref={revealRef}>
      <header className="hero hero-enter hero-enter-1">
        <Navbar />

        <div className="heroContent">
          <div className="heroText hero-enter hero-enter-2">
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

          <div className="heroCard hero-enter hero-enter-3">
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
        <section
          id="about"
          className="section twoColumn reveal reveal-delay-1 section-anchor"
          data-reveal
        >
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

        <section className="section statsGrid reveal reveal-delay-2" data-reveal>
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

        <section
          id="projects"
          className="section reveal reveal-delay-3 section-anchor"
          data-reveal
        >
          <div className="sectionHeader">
            <div>
              <p className="sectionLabel">Projeler</p>
              <h2>Geliştirdiğim işleri detaylı gösterebildiğim alan</h2>
            </div>
            <p className="sectionHint">
              Supabase bağlanınca bu listeyi panel/veritabanı üzerinden dinamik
              besleyebilirsin.
            </p>
          </div>

          <div className="projectsGrid">
            {projects.map((project, index) => (
              <article
                className="projectCard reveal projectReveal"
                data-reveal
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

        <section
          id="contact"
          className="section contactSection reveal reveal-delay-4 section-anchor"
          data-reveal
        >
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
  const project = useMemo(
    () => projects.find((item) => item.slug === slug),
    [projects, slug],
  )

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
            <a
              className="primaryBtn"
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
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
                <img
                  src={image}
                  alt={`${project.title} ekran görüntüsü ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function AdminPage({
  siteData,
  refreshSiteData,
}: {
  siteData: SiteData
  refreshSiteData: () => Promise<void>
}) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [sessionEmail, setSessionEmail] = useState<string>('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authMessage, setAuthMessage] = useState('')
  const [authError, setAuthError] = useState('')
  const [profileSaving, setProfileSaving] = useState(false)
  const [projectSaving, setProjectSaving] = useState(false)
  const [projectDeleting, setProjectDeleting] = useState<string | null>(null)
  const [selectedSlug, setSelectedSlug] = useState<string>('new')
  const [profileForm, setProfileForm] = useState({
    name: siteData.profile.name,
    heroTitle: siteData.profile.heroTitle,
    heroDescription: siteData.profile.heroDescription,
    summary: siteData.profile.summary,
    about: siteData.profile.about.join('\n\n'),
    contactEmail: siteData.profile.contactEmail,
  })
  const [projectForm, setProjectForm] = useState<ProjectForm>(emptyProjectForm)

  useEffect(() => {
    if (!supabase || !hasSupabaseEnv) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      setSessionEmail(data.session?.user?.email ?? '')
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionEmail(session?.user?.email ?? '')
      setLoading(false)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    setProfileForm({
      name: siteData.profile.name,
      heroTitle: siteData.profile.heroTitle,
      heroDescription: siteData.profile.heroDescription,
      summary: siteData.profile.summary,
      about: siteData.profile.about.join('\n\n'),
      contactEmail: siteData.profile.contactEmail,
    })
  }, [siteData.profile])

  useEffect(() => {
    if (selectedSlug === 'new') {
      setProjectForm(emptyProjectForm)
      return
    }

    const selectedProject = siteData.projects.find(
      (project) => project.slug === selectedSlug,
    )

    setProjectForm(createProjectForm(selectedProject))
  }, [selectedSlug, siteData.projects])

  const handleAuth = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!supabase) return

    setAuthError('')
    setAuthMessage('')

    const result = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (result.error) {
      setAuthError(result.error.message)
      return
    }

    setAuthMessage('Giriş başarılı.')
  }


  const handleSignOut = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
    navigate('/admin')
  }


  const handleProfileSave = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!supabase) return

    setProfileSaving(true)
    setAuthError('')
    setAuthMessage('')

    const existingProfile = await supabase
      .from('profile')
      .select('id')
      .limit(1)
      .maybeSingle()

    if (existingProfile.error) {
      setAuthError(existingProfile.error.message)
      setProfileSaving(false)
      return
    }

    const payload = {
      name: profileForm.name,
      hero_title: profileForm.heroTitle,
      hero_description: profileForm.heroDescription,
      summary: profileForm.summary,
      about: splitLines(profileForm.about),
      contact_email: profileForm.contactEmail,
    }

    const response = existingProfile.data
      ? await supabase
          .from('profile')
          .update(payload)
          .eq('id', existingProfile.data.id)
      : await supabase.from('profile').insert(payload)

    if (response.error) {
      setAuthError(response.error.message)
      setProfileSaving(false)
      return
    }

    await refreshSiteData()
    setAuthMessage('Profil bilgileri güncellendi.')
    setProfileSaving(false)
  }

  const handleProjectSave = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!supabase) return

    setProjectSaving(true)
    setAuthError('')
    setAuthMessage('')

    const payload = {
      slug: projectForm.slug,
      title: projectForm.title,
      year: projectForm.year,
      short_description: projectForm.shortDescription,
      description: projectForm.description,
      stack: splitLines(projectForm.stack),
      highlights: splitLines(projectForm.highlights),
      github: projectForm.github || null,
      images: splitLines(projectForm.images),
    }

    const response =
      selectedSlug === 'new'
        ? await supabase.from('projects').insert(payload)
        : await supabase.from('projects').update(payload).eq('slug', selectedSlug)

    if (response.error) {
      setAuthError(response.error.message)
      setProjectSaving(false)
      return
    }

    await refreshSiteData()
    setSelectedSlug(projectForm.slug)
    setAuthMessage(
      selectedSlug === 'new' ? 'Yeni proje eklendi.' : 'Proje güncellendi.',
    )
    setProjectSaving(false)
  }

  const handleProjectDelete = async (slug: string) => {
    if (!supabase) return

    setProjectDeleting(slug)
    setAuthError('')
    setAuthMessage('')

    const response = await supabase.from('projects').delete().eq('slug', slug)

    if (response.error) {
      setAuthError(response.error.message)
      setProjectDeleting(null)
      return
    }

    await refreshSiteData()
    setSelectedSlug('new')
    setAuthMessage('Proje silindi.')
    setProjectDeleting(null)
  }

  if (!hasSupabaseEnv || !supabase) {
    return (
      <div className="page detailPageWrap">
        <div className="detailPage notFoundCard">
          <h1>Admin panel hazır değil</h1>
          <p>
            Supabase environment değişkenleri eklenmeden admin panel aktif olmaz.
          </p>
          <Link className="primaryBtn" to="/">
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="page loadingScreen">
        <div className="loadingCard">
          <span className="badge">Yükleniyor</span>
          <h1>Admin panel hazırlanıyor...</h1>
        </div>
      </div>
    )
  }

  if (!sessionEmail) {
    return (
      <div className="page adminWrap">
        <div className="adminShell authShell">
          <div>
            <p className="sectionLabel">Admin</p>
            <h1>Yönetim paneli</h1>
            <p className="adminIntro">
              Projelerini ve profil bilgilerini yönetmek için giriş yap.
            </p>
          </div>

          <form className="adminCard authCard" onSubmit={handleAuth}>
            <label className="fieldGroup">
              <span>E-posta</span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="mail@example.com"
                required
              />
            </label>

            <label className="fieldGroup">
              <span>Şifre</span>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                placeholder="Şifren"
                required
              />
            </label>

            {authError ? <p className="errorText">{authError}</p> : null}
            {authMessage ? <p className="successText">{authMessage}</p> : null}

            <button className="primaryBtn fullWidthButton" type="submit">
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="page adminWrap">
      <div className="adminShell">
        <div className="adminHeader">
          <div>
            <p className="sectionLabel">Admin</p>
            <h1>İçerik yönetimi</h1>
            <p className="adminIntro">Giriş yapan hesap: {sessionEmail}</p>
          </div>
          <div className="adminActionsTop">
            <Link className="secondaryBtn" to="/">
              Siteyi Gör
            </Link>
            <button className="secondaryBtn buttonReset" onClick={handleSignOut}>
              Çıkış Yap
            </button>
          </div>
        </div>

        {authError ? <p className="errorText">{authError}</p> : null}
        {authMessage ? <p className="successText">{authMessage}</p> : null}

        <div className="adminGrid">
          <form className="adminCard" onSubmit={handleProfileSave}>
            <div className="adminCardHeader">
              <h2>Profil Bilgileri</h2>
              <p>Ana sayfadaki metinleri buradan güncelleyebilirsin.</p>
            </div>

            <label className="fieldGroup">
              <span>İsim</span>
              <input
                value={profileForm.name}
                onChange={(event) =>
                  setProfileForm((current) => ({ ...current, name: event.target.value }))
                }
              />
            </label>

            <label className="fieldGroup">
              <span>Hero başlık</span>
              <input
                value={profileForm.heroTitle}
                onChange={(event) =>
                  setProfileForm((current) => ({
                    ...current,
                    heroTitle: event.target.value,
                  }))
                }
              />
            </label>

            <label className="fieldGroup">
              <span>Hero açıklama</span>
              <textarea
                rows={4}
                value={profileForm.heroDescription}
                onChange={(event) =>
                  setProfileForm((current) => ({
                    ...current,
                    heroDescription: event.target.value,
                  }))
                }
              />
            </label>

            <label className="fieldGroup">
              <span>Kısa özet</span>
              <textarea
                rows={4}
                value={profileForm.summary}
                onChange={(event) =>
                  setProfileForm((current) => ({
                    ...current,
                    summary: event.target.value,
                  }))
                }
              />
            </label>

            <label className="fieldGroup">
              <span>Hakkımda paragrafları</span>
              <textarea
                rows={6}
                value={profileForm.about}
                onChange={(event) =>
                  setProfileForm((current) => ({ ...current, about: event.target.value }))
                }
                placeholder="Her paragrafı boş satırla ayır"
              />
            </label>

            <label className="fieldGroup">
              <span>İletişim e-postası</span>
              <input
                value={profileForm.contactEmail}
                onChange={(event) =>
                  setProfileForm((current) => ({
                    ...current,
                    contactEmail: event.target.value,
                  }))
                }
              />
            </label>

            <button className="primaryBtn fullWidthButton" type="submit">
              {profileSaving ? 'Kaydediliyor...' : 'Profili Kaydet'}
            </button>
          </form>

          <div className="adminCard">
            <div className="adminCardHeader">
              <h2>Projeler</h2>
              <p>Yeni proje ekle veya mevcut projeleri düzenle.</p>
            </div>

            <div className="projectPickerRow">
              <select
                value={selectedSlug}
                onChange={(event) => setSelectedSlug(event.target.value)}
              >
                <option value="new">+ Yeni proje</option>
                {siteData.projects.map((project) => (
                  <option key={project.slug} value={project.slug}>
                    {project.title}
                  </option>
                ))}
              </select>

              {selectedSlug !== 'new' ? (
                <button
                  type="button"
                  className="dangerButton"
                  onClick={() => handleProjectDelete(selectedSlug)}
                >
                  {projectDeleting === selectedSlug ? 'Siliniyor...' : 'Projeyi Sil'}
                </button>
              ) : null}
            </div>

            <form className="adminForm" onSubmit={handleProjectSave}>
              <label className="fieldGroup">
                <span>Slug</span>
                <input
                  value={projectForm.slug}
                  onChange={(event) =>
                    setProjectForm((current) => ({ ...current, slug: event.target.value }))
                  }
                  placeholder="ornek-proje"
                  required
                />
              </label>

              <label className="fieldGroup">
                <span>Proje adı</span>
                <input
                  value={projectForm.title}
                  onChange={(event) =>
                    setProjectForm((current) => ({ ...current, title: event.target.value }))
                  }
                  required
                />
              </label>

              <label className="fieldGroup">
                <span>Yıl</span>
                <input
                  value={projectForm.year}
                  onChange={(event) =>
                    setProjectForm((current) => ({ ...current, year: event.target.value }))
                  }
                  required
                />
              </label>

              <label className="fieldGroup">
                <span>Kısa açıklama</span>
                <textarea
                  rows={3}
                  value={projectForm.shortDescription}
                  onChange={(event) =>
                    setProjectForm((current) => ({
                      ...current,
                      shortDescription: event.target.value,
                    }))
                  }
                  required
                />
              </label>

              <label className="fieldGroup">
                <span>Detay açıklama</span>
                <textarea
                  rows={5}
                  value={projectForm.description}
                  onChange={(event) =>
                    setProjectForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  required
                />
              </label>

              <label className="fieldGroup">
                <span>Teknolojiler</span>
                <textarea
                  rows={4}
                  value={projectForm.stack}
                  onChange={(event) =>
                    setProjectForm((current) => ({ ...current, stack: event.target.value }))
                  }
                  placeholder="Her satıra bir teknoloji"
                />
              </label>

              <label className="fieldGroup">
                <span>Öne çıkan maddeler</span>
                <textarea
                  rows={4}
                  value={projectForm.highlights}
                  onChange={(event) =>
                    setProjectForm((current) => ({
                      ...current,
                      highlights: event.target.value,
                    }))
                  }
                  placeholder="Her satıra bir madde"
                />
              </label>

              <label className="fieldGroup">
                <span>GitHub linki</span>
                <input
                  value={projectForm.github}
                  onChange={(event) =>
                    setProjectForm((current) => ({ ...current, github: event.target.value }))
                  }
                  placeholder="https://github.com/..."
                />
              </label>

              <label className="fieldGroup">
                <span>Ekran görüntüleri</span>
                <textarea
                  rows={5}
                  value={projectForm.images}
                  onChange={(event) =>
                    setProjectForm((current) => ({ ...current, images: event.target.value }))
                  }
                  placeholder="Her satıra bir görsel URL"
                />
              </label>

              <button className="primaryBtn fullWidthButton" type="submit">
                {projectSaving
                  ? 'Kaydediliyor...'
                  : selectedSlug === 'new'
                    ? 'Projeyi Ekle'
                    : 'Projeyi Güncelle'}
              </button>
            </form>
          </div>
        </div>
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

  const refreshSiteData = async () => {
    const data = await loadSiteData()
    setSiteData(data)
  }

  useEffect(() => {
    refreshSiteData().finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="page loadingScreen" aria-label="Yükleniyor">
        <div className="loadingSpinner loadingSpinnerLarge" />
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
        <Route
          path="/projects/:slug"
          element={<ProjectDetailPage projects={siteData.projects} />}
        />
        <Route
          path="/admin"
          element={
            <AdminPage siteData={siteData} refreshSiteData={refreshSiteData} />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
