# AI Platform Maliyet Hesaplayıcı ve Prompt Optimizasyon Aracı

Farklı AI kod platformlarının maliyetlerini karşılaştırın ve prompt'larınızı optimize edin.

## 🚀 Özellikler

- **Maliyet Hesaplama**: 9 farklı AI platform için tahmini maliyet analizi
  - KIRO, Codex CLI, Claude Code, Gemini CLI, Cursor, Windsurf, Trea, Replit, v0, Bolt
- **Prompt Optimizasyonu**: OpenAI ile prompt optimizasyonu ve token tasarrufu
- **Görselleştirme**: İnteraktif grafikler ile maliyet karşılaştırması
- **Çoklu Dil Desteği**: Türkçe ve İngilizce arayüz
- **Responsive Tasarım**: Mobil ve desktop uyumlu

## 🛠️ Teknoloji Stack

### Frontend
- React 18 + TypeScript
- Tailwind CSS + Shadcn UI
- Wouter (routing)
- TanStack Query
- Recharts (görselleştirme)

### Backend
- Express.js + TypeScript
- PostgreSQL (Neon)
- Drizzle ORM
- OpenAI API

## 📦 Kurulum

### Gereksinimler
- Node.js 20+
- npm veya yarn

### Adımlar

1. Repository'yi klonlayın:
```bash
git clone https://github.com/cetinibs/vibe-coding-optimization.git
cd vibe-coding-optimization
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Environment değişkenlerini ayarlayın (opsiyonel):
```bash
# .env dosyası oluşturun
DATABASE_URL=your_postgresql_connection_string  # Opsiyonel
OPENAI_API_KEY=your_openai_api_key             # Prompt optimizasyonu için
```

4. Development modunda çalıştırın:
```bash
npm run dev
```

Uygulama http://localhost:5000 adresinde çalışacaktır.

## 🌐 Production Build

```bash
npm run build
npm start
```

## 📝 API Endpoints

### POST /api/calculate
Uygulama fikri için maliyet hesaplama

**Request:**
```json
{
  "appIdea": "E-ticaret sitesi yapımı"
}
```

**Response:**
```json
{
  "platforms": [
    {
      "platform": "KIRO",
      "promptCount": 8,
      "tokenCount": 4400,
      "cost": 0.132
    }
  ],
  "appIdea": "E-ticaret sitesi yapımı"
}
```

### POST /api/optimize
Prompt optimizasyonu (OpenAI API key gerektirir)

**Request:**
```json
{
  "originalPrompt": "Bir e-ticaret sitesi yap..."
}
```

## 🎨 Özellikler

- ✅ Veritabanı olmadan çalışabilir (auth ve history özellikleri devre dışı)
- ✅ Windows, macOS ve Linux uyumlu
- ✅ Replit Auth entegrasyonu (opsiyonel)
- ✅ Hesaplama geçmişi ve favoriler (database ile)
- ✅ Sosyal medya paylaşım özellikleri
- ✅ AI model linklerine direkt erişim

## 📊 Platform Karşılaştırması

Uygulama şu platformları karşılaştırır:
- KIRO
- Codex CLI
- Claude Code
- Gemini CLI
- Cursor
- Windsurf
- Trea
- Replit
- v0
- Bolt

## 🔧 Geliştirme

```bash
# Type checking
npm run check

# Database migration (PostgreSQL gerektirir)
npm run db:push
```

## 📄 Lisans

MIT

## 🤝 Katkıda Bulunma

Pull request'ler memnuniyetle karşılanır. Büyük değişiklikler için lütfen önce bir issue açın.

## 📞 İletişim

Sorularınız için issue açabilirsiniz.
