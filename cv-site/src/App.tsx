import './App.css'

type Project = {
  title: string
  year: string
  description: string
  stack: string[]
  highlights: string[]
  link?: string
}

const projects: Project[] = [
  {
    title: 'To-Do App',
    year: '2026',
    description:
      'React Native ile geliştirilmiş, sade tasarımlı bir görev takip uygulaması. Kullanıcıların görev ekleyip filtrelemesine ve tamamlanan işleri yönetmesine odaklanır.',
    stack: ['React Native', 'Expo', 'TypeScript'],
    highlights: [
      'Görev ekleme, silme ve tamamlama akışı',
      'Aktif / tamamlanan görev filtreleri',
      'Mobil öncelikli sade arayüz',
    ],
  },
  {
    title: 'CV / Portfolio Website',
    year: '2026',
    description:
      'Kendimi, yeteneklerimi ve geliştirdiğim projeleri tek bir yerde profesyonel şekilde göstermek için hazırladığım kişisel web sitesi.',
    stack: ['React', 'Vite', 'TypeScript', 'CSS'],
    highlights: [
      'Hakkımda alanı',
      'Detaylı proje kartları',
      'Responsive ve modern görünüm',
    ],
  },
  {
    title: 'Eklenecek Proje',
    year: 'Yakında',
    description:
      'Buraya gerçek projelerinden birini koyabiliriz. Ben içeriklerini düzenleyip daha profesyonel anlatıma dönüştürebilirim.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL'],
    highlights: [
      'Problemi ne çözdüğü',
      'Teknik mimarisi',
      'Elde edilen sonuçlar',
    ],
  },
]

function App() {
  return (
    <div className="page">
      <header className="hero reveal reveal-delay-1">
        <nav className="nav">
          <div className="brand">Murat</div>
          <div className="navLinks">
            <a href="#about">Hakkımda</a>
            <a href="#projects">Projeler</a>
            <a href="#contact">İletişim</a>
          </div>
        </nav>

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
                key={project.title}
              >
                <div className="projectTop">
                  <span className="year">{project.year}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
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

                {project.link ? (
                  <a href={project.link} target="_blank" rel="noreferrer">
                    Projeye Git
                  </a>
                ) : (
                  <span className="mutedLink">Link daha sonra eklenecek</span>
                )}
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

export default App
