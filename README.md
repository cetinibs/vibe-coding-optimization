# AI Uygulama Maliyet Tahmincisi

Modern web uygulaması geliştirmek için AI destekli araçların maliyet tahmini ve prompt optimizasyonu yapan akıllı bir platform.

## Özellikler

### 🎯 Maliyet Tahmini
- Uygulama fikrini analiz ederek karmaşıklık seviyesini belirler
- 9 farklı AI geliştirme aracı için maliyet hesaplar:
  - Claude Code
  - Cursor
  - Windsurf
  - GitHub Copilot
  - Replit AI
  - v0.dev
  - Bolt.new
  - Gemini CLI
  - Aider

- Token kullanımı (input/output) tahmini
- Toplam maliyet hesaplama
- Tahmini etkileşim sayısı

### ✨ Prompt Optimizasyon
- Girilen promptları otomatik optimize eder
- Token tasarrufu hesaplar
- Optimizasyon önerileri sunar
- Karşılaştırmalı görünüm (orijinal vs optimize)
- Kopyalama özellikleri

## Teknoloji Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Runtime:** Node.js

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

3. Tarayıcınızda açın:
```
http://localhost:3000
```

## Kullanım

### Maliyet Tahmini
1. "Maliyet Tahmini" sekmesine gidin
2. Uygulama fikrinizi detaylı olarak açıklayın
3. "Maliyet Tahmini Yap" butonuna tıklayın
4. Tüm AI araçları için maliyet karşılaştırmasını görün

### Prompt Optimizasyon
1. "Prompt Optimizasyon" sekmesine gidin
2. Optimize etmek istediğiniz promptu girin
3. "Promptu Optimize Et" butonuna tıklayın
4. Token tasarrufu ve optimizasyon önerilerini görün

## Proje Yapısı

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Ana sayfa
│   └── globals.css         # Global stiller
├── components/
│   ├── CostEstimator.tsx   # Maliyet tahmini komponenti
│   └── PromptOptimizer.tsx # Prompt optimizasyon komponenti
├── lib/
│   ├── aiServices.ts       # AI servisleri verileri
│   ├── complexityEstimator.ts # Karmaşıklık tahmini
│   ├── costCalculator.ts   # Maliyet hesaplama
│   └── promptOptimizer.ts  # Prompt optimizasyon
└── types/
    └── index.ts            # TypeScript tip tanımları
```

## Özellikler Detayları

### Karmaşıklık Analizi
Sistem, girilen açıklamayı analiz ederek projeyi 4 kategoriye ayırır:
- **Basit:** Tek sayfalık, küçük özellikli uygulamalar
- **Orta:** Birden fazla özellik ve sayfa içeren uygulamalar
- **Karmaşık:** Çok katmanlı mimari ve gelişmiş özellikler
- **Kurumsal:** Mikroservis mimarisi ve yüksek ölçeklenebilirlik

### Prompt Optimizasyon Algoritması
- Gereksiz boşlukları temizler
- Dolgu kelimeleri kaldırır
- Nezaket ifadelerini optimize eder
- Net talimatlar için önerilerde bulunur
- Teknoloji stack belirtimi önerir
- Yapısal iyileştirmeler sunar

## Lisans

MIT

## Geliştirici

Claude Code ile geliştirilmiştir.
