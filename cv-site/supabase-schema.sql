create table if not exists public.profile (
  id bigint generated always as identity primary key,
  name text not null,
  hero_title text not null,
  hero_description text not null,
  summary text not null,
  about text[] not null default '{}',
  contact_email text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id bigint generated always as identity primary key,
  slug text not null unique,
  title text not null,
  year text not null,
  short_description text not null,
  description text not null,
  stack text[] not null default '{}',
  highlights text[] not null default '{}',
  github text,
  images text[] not null default '{}',
  created_at timestamptz not null default now()
);

insert into public.profile (name, hero_title, hero_description, summary, about, contact_email)
values (
  'Murat',
  'Murat için modern bir kişisel site',
  'Yazılım öğrenen, üreten ve geliştirdiklerini düzenli biçimde sunmak isteyen biri olarak; burada kendimden bahsedebilir, yeteneklerimi paylaşabilir ve projelerimi detaylarıyla gösterebilirim.',
  'React, mobil uygulamalar ve modern web teknolojileriyle ilgileniyorum. Öğrendiklerimi gerçek projelere dönüştürmeyi seviyorum.',
  array[
    'Bu bölümde eğitim geçmişini, ilgi alanlarını, hangi teknolojilere odaklandığını ve nasıl bir geliştirici olmak istediğini anlatabiliriz.',
    'İstersen bunu sade bir dille, istersen daha profesyonel İngilizce/Türkçe CV tonu ile yeniden yazabilirim.'
  ],
  'ornekmail@example.com'
)
on conflict do nothing;

insert into public.projects (slug, title, year, short_description, description, stack, highlights, github, images)
values
(
  'todo-app',
  'To-Do App',
  '2026',
  'React Native ile geliştirilmiş, sade tasarımlı bir görev takip uygulaması.',
  'Bu proje, günlük görevleri hızlıca eklemek, filtrelemek ve tamamlanan işleri düzenli biçimde yönetmek için geliştirildi. Mobil öncelikli düşünülmüş sade bir arayüz ve pratik kullanıcı deneyimi hedeflenmiştir.',
  array['React Native', 'Expo', 'TypeScript'],
  array['Görev ekleme, silme ve tamamlama akışı', 'Aktif / tamamlanan görev filtreleri', 'Mobil öncelikli sade arayüz'],
  'https://github.com/username/todo-app',
  array[
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80'
  ]
),
(
  'cv-portfolio-website',
  'CV / Portfolio Website',
  '2026',
  'Kişisel bilgileri ve projeleri profesyonel şekilde sunan modern web sitesi.',
  'Bu site; hakkımda bilgileri, yetenekleri ve geliştirdiğim projeleri düzenli ve modern bir arayüzle göstermek için hazırlandı. Sade görünüm, okunabilirlik ve ileride genişletilebilir yapı ön planda tutuldu.',
  array['React', 'Vite', 'TypeScript', 'CSS'],
  array['Responsive modern arayüz', 'Animasyonlu section geçişleri', 'Detay sayfasına giden proje kartları'],
  'https://github.com/username/cv-site',
  array[
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80'
  ]
)
on conflict (slug) do nothing;
