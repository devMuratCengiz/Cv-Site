export type Project = {
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

export type Profile = {
  name: string
  heroTitle: string
  heroDescription: string
  summary: string
  about: string[]
  contactEmail: string
}

export const fallbackProfile: Profile = {
  name: 'Murat',
  heroTitle: 'Murat için modern bir kişisel site',
  heroDescription:
    'Yazılım öğrenen, üreten ve geliştirdiklerini düzenli biçimde sunmak isteyen biri olarak; burada kendimden bahsedebilir, yeteneklerimi paylaşabilir ve projelerimi detaylarıyla gösterebilirim.',
  summary:
    'React, mobil uygulamalar ve modern web teknolojileriyle ilgileniyorum. Öğrendiklerimi gerçek projelere dönüştürmeyi seviyorum.',
  about: [
    'Bu bölümde eğitim geçmişini, ilgi alanlarını, hangi teknolojilere odaklandığını ve nasıl bir geliştirici olmak istediğini anlatabiliriz.',
    'İstersen bunu sade bir dille, istersen daha profesyonel İngilizce/Türkçe CV tonu ile yeniden yazabilirim.',
  ],
  contactEmail: 'ornekmail@example.com',
}

export const fallbackProjects: Project[] = [
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
]
