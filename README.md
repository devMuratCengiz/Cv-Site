# CV Site

Modern, dinamik bir kişisel CV / portfolio sitesi.

Bu proje; kendini tanıtmak, projelerini detaylı şekilde sergilemek ve içerikleri admin panel üzerinden yönetebilmek için geliştirildi.

## Özellikler

- Modern ve sade arayüz
- Responsive tasarım
- Yumuşak scroll ve giriş animasyonları
- Proje kartları ve detay sayfaları
- Supabase ile dinamik veri yapısı
- Admin panel üzerinden:
  - profil güncelleme
  - proje ekleme
  - proje düzenleme
  - proje silme
- Vercel'e deploy edilebilir yapı

## Kullanılan Teknolojiler

- React
- TypeScript
- Vite
- React Router DOM
- Supabase
- CSS

## Sayfalar

### Ana Sayfa
- Hero alanı
- Hakkımda bölümü
- Projeler bölümü
- İletişim bölümü

### Proje Detay Sayfası
Her proje için ayrı detay sayfası bulunur. Bu sayfada:
- proje adı
- kısa açıklama
- detaylı açıklama
- kullanılan teknolojiler
- ekran görüntüleri
- GitHub linki

### Admin Panel
`/admin` rotasında bulunur.

Admin panel ile:
- profil içerikleri güncellenebilir
- yeni proje eklenebilir
- mevcut projeler düzenlenebilir
- projeler silinebilir

## Geliştirme Ortamı

Projeyi lokal çalıştırmak için:

```bash
npm install
npm run dev
```

Tarayıcıda aç:

```bash
http://localhost:4173
```

## Environment Variables

`.env` dosyası oluştur:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Örnek dosya:

- `.env.example`

## Supabase Kurulumu

Proje Supabase ile çalışacak şekilde hazırlanmıştır.

Gerekli SQL dosyaları:

- `supabase-schema.sql` → tablolar ve örnek veriler
- `supabase-admin-policies.sql` → admin panel için gerekli policy ayarları

## Build

Production build almak için:

```bash
npm run build
```

## Deploy

Bu proje Vercel üzerinde kolayca yayınlanabilir.

Önerilen yapı:
- frontend: Vercel
- backend/data: Supabase

## Not

Bu proje başlangıçta kişisel portfolio / CV sitesi olarak tasarlanmıştır ama kolayca geliştirilebilir.

İleride eklenebilecek şeyler:
- özel domain
- proje görsel upload
- canlı demo linkleri
- dark/light mode geliştirmeleri
- daha gelişmiş admin yetkilendirme

## Repository


