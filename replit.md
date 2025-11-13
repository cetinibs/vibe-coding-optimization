# AI Platform Maliyet Hesaplayıcı

## Proje Özeti
Kullanıcıların uygulama fikirlerini girip farklı AI kod platformlarının (Codex CLI, Claude Code, Gemini CLI, Cursor, Windsurf, Trea, Replit, v0, Bolt) tahmini maliyet, token kullanımı ve prompt sayısını karşılaştırmasını sağlayan bir web uygulaması. Ayrıca OpenAI kullanarak prompt optimizasyonu yapılabilir.

## Teknoloji Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI, Wouter (routing), TanStack Query
- **Backend**: Express.js, Node.js, TypeScript
- **AI Integration**: OpenAI GPT-5 (prompt optimizasyonu için)
- **Visualization**: Recharts
- **Storage**: In-memory (MemStorage)

## Özellikler
1. **Maliyet Hesaplama**: 9 farklı AI platform için tahmini prompt sayısı, token kullanımı ve maliyet hesaplama
2. **Prompt Optimizasyonu**: OpenAI GPT-5 kullanarak girilen fikri daha az token kullanan optimize edilmiş prompt'a dönüştürme
3. **Görselleştirme**: Platform maliyetlerinin bar chart ile görsel karşılaştırması
4. **Responsive Tasarım**: Mobil ve desktop için optimize edilmiş kullanıcı deneyimi
5. **Minimalist UI**: Linear/Vercel-tarzı temiz ve profesyonel arayüz

## Proje Yapısı

### Frontend (`client/src/`)
- `pages/home.tsx` - Ana sayfa component'i
- `components/navbar.tsx` - Üst navigasyon bar
- `components/hero.tsx` - Hero section (platform badges ile)
- `components/input-form.tsx` - Uygulama fikri giriş formu
- `components/results-table.tsx` - Platform karşılaştırma tablosu
- `components/cost-visualization.tsx` - Maliyet görselleştirme (bar chart)
- `components/optimization-panel.tsx` - Prompt optimizasyon sonuçları
- `components/footer.tsx` - Footer component

### Backend (`server/`)
- `routes.ts` - API endpoint'leri (/api/calculate, /api/optimize)
- `platforms.ts` - Platform verileri ve maliyet hesaplama algoritması
- `openai.ts` - OpenAI entegrasyonu (prompt optimizasyonu)

### Shared (`shared/`)
- `schema.ts` - TypeScript tipleri ve Zod validation şemaları

## API Endpoints

### POST /api/calculate
Girilen uygulama fikri için tüm platformlarda maliyet hesaplar.

**Request Body:**
```json
{
  "appIdea": "string (min 10 karakter)"
}
```

**Response:**
```json
{
  "platforms": [
    {
      "platform": "string",
      "promptCount": number,
      "tokenCount": number,
      "cost": number
    }
  ],
  "appIdea": "string"
}
```

### POST /api/optimize
Girilen prompt'u OpenAI ile optimize eder.

**Request Body:**
```json
{
  "originalPrompt": "string (min 10 karakter)"
}
```

**Response:**
```json
{
  "originalPrompt": "string",
  "optimizedPrompt": "string",
  "originalTokenCount": number,
  "optimizedTokenCount": number,
  "tokenReduction": number,
  "costSavings": number
}
```

## Hesaplama Algoritması
Maliyet hesaplaması şu faktörleri dikkate alır:
- Uygulama fikrinin uzunluğu
- Karmaşıklık anahtar kelimeleri (database, authentication, api, payment, vb.)
- Her platformun ortalama prompt sayısı ve token kullanımı
- Platform başına token maliyetleri (₺/1M token)

## Environment Variables
- `OPENAI_API_KEY` - OpenAI API anahtarı (prompt optimizasyonu için, opsiyonel)
- `SESSION_SECRET` - Express session secret (otomatik oluşturulur)

## Son Değişiklikler
- **2025-11-13**: Sosyal Medya Paylaşım Özelliği
  - Optimize edilmiş promptları sosyal medyada paylaşma butonu eklendi
  - Desteklenen platformlar: Twitter/X, LinkedIn, Facebook, WhatsApp, Telegram, Email
  - Dropdown menü ile kullanıcı dostu arayüz
  - Click-outside-to-close davranışı (useRef ile)
  - Glassmorphism stil ile modern tasarım
  - Toast bildirimleri ile kullanıcı geri bildirimi
  - Backend /api/optimize endpoint'inde eksik fieldlar (formattedPrompt, aiModelLinks) düzeltildi

- **2025-11-12**: Auth ve Persistence eklendi
  - PostgreSQL database entegrasyonu (users, calculations, favorites tabloları)
  - Replit Auth ile kullanıcı girişi/çıkışı
  - Geçmiş hesaplama kayıtları (otomatik kaydedilir)
  - Favoriler sistemi (hesaplamaları favorilere ekleme/çıkarma)
  - Navbar'a auth durumu ve navigasyon linkleri eklendi
  - History ve Favorites sayfaları oluşturuldu
  
- **2025-11-11**: İlk versiyon oluşturuldu
  - Tüm frontend componentler tasarlandı ve geliştirildi
  - Backend API endpoint'leri implement edildi
  - OpenAI entegrasyonu eklendi
  - Platform verileri ve hesaplama algoritması oluşturuldu
  - Design guidelines'a uygun minimalist tasarım

## Tasarım Kılavuzu
`design_guidelines.md` dosyasında detaylı tasarım kuralları ve component yapıları bulunur.

## Kullanım
1. Ana sayfada uygulama fikrinizi girin (min 10 karakter)
2. "Hesapla" butonuna tıklayarak tüm platformlar için maliyet tahmini alın
3. "Promptu Optimize Et" butonuna tıklayarak AI ile optimize edilmiş versiyonu görün
4. Sonuçları tablo ve grafik olarak inceleyin
