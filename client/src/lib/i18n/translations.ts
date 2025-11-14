export const translations = {
  tr: {
    // Navbar
    navbar: {
      appName: "AI Maliyet Hesaplayıcı",
      history: "Geçmiş",
      favorites: "Favoriler",
      login: "Giriş Yap",
      logout: "Çıkış",
    },
    
    // Hero
    hero: {
      title: "AI Kod Platformları Maliyet Hesaplayıcı",
      subtitle: "Uygulama fikrinizi girin, farklı AI platformlarında tahmini maliyet ve token kullanımını karşılaştırın",
      platforms: "9 AI Platformu",
      realtime: "Gerçek Zamanlı",
      aiPowered: "AI Destekli",
    },
    
    // Input Form
    form: {
      title: "Uygulama Fikrinizi Girin",
      placeholder: "Örn: E-ticaret sitesi, kullanıcı girişi, ürün yönetimi, sepet sistemi ve ödeme entegrasyonu olan bir platform yapmak istiyorum...",
      calculate: "Hesapla",
      optimize: "Promptu Optimize Et",
      calculating: "Hesaplanıyor...",
      optimizing: "Optimize Ediliyor...",
      minLength: "En az 10 karakter girin",
    },
    
    // Results Table
    results: {
      title: "Platform Karşılaştırması",
      subtitle: "Her platform için tahmini prompt sayısı, token kullanımı ve maliyet",
      platform: "Platform",
      prompts: "Prompt Sayısı",
      tokens: "Token",
      cost: "Maliyet (₺)",
      addToFavorites: "Favorilere Ekle",
      removeFromFavorites: "Favorilerden Çıkar",
      addedToFavorites: "Favorilere Eklendi",
      removedFromFavorites: "Favorilerden Çıkarıldı",
      loginRequired: "Favorilere eklemek için giriş yapmalısınız",
      lowestCost: "En Uygun",
    },
    
    // Cost Visualization
    visualization: {
      title: "Maliyet Görselleştirmesi",
      description: "Platform maliyetlerinin karşılaştırmalı grafik görünümü",
      cost: "Maliyet",
    },
    
    // Optimization Panel
    optimization: {
      title: "Prompt Optimizasyonu",
      description: "AI ile optimize edilmiş ve daha az token kullanan prompt",
      stats: "İstatistikler",
      originalTokens: "Orijinal Token",
      optimizedTokens: "Optimize Token",
      toonTokens: "TOON Token",
      tokenReduction: "Token Azalması",
      toonTokenReduction: "TOON Token Azalması",
      costSavings: "Maliyet Tasarrufu",
      toonCostSavings: "TOON Maliyet Tasarrufu",
      tabs: {
        formatted: "Formatlanmış Prompt",
        optimized: "Optimize Edilmiş",
        toon: "TOON Format",
        aiLinks: "AI Model Linkleri",
      },
      toonTitle: "TOON Format (Token-Oriented Object Notation)",
      toonDescription: "JSON'dan %30-60 daha az token kullanan kompakt format",
      toonBenefits: "TOON Avantajları:",
      toonBenefit1: "%30-60 daha az token",
      toonBenefit2: "%50'ye kadar maliyet tasarrufu",
      toonBenefit3: "Daha hızlı işleme",
      toonBenefit4: "Tablo verileri için ideal",
      copyPrompt: "Promptu Kopyala",
      copied: "Kopyalandı!",
      aiLinksTitle: "AI Platformlarına Hızlı Erişim",
      aiLinksDesc: "Optimize edilmiş prompt otomatik kopyalanır, platformda Ctrl+V ile yapıştırın",
      chatWith: "Chat with",
      promptCopied: "Optimize Edilmiş Prompt Kopyalandı!",
      promptCopiedDesc: "açılıyor. Ctrl+V ile yapıştırın.",
      copyError: "Kopyalama başarısız oldu",
      sharePrompt: "Promptu Paylaş",
      shareSuccess: "Paylaşım linki kopyalandı!",
      shareError: "Paylaşım linki oluşturulamadı",
      shareOn: "Paylaş:",
    },
    
    // History Page
    history: {
      title: "Hesaplama Geçmişi",
      empty: "Henüz hesaplama yapmadınız",
      emptyDesc: "Ana sayfadan bir uygulama fikri girerek başlayın",
      date: "Tarih",
      idea: "Uygulama Fikri",
      avgCost: "Ort. Maliyet",
      viewDetails: "Detayları Gör",
      lowestPlatform: "En Uygun Platform:",
    },
    
    // Favorites Page
    favorites: {
      title: "Favori Hesaplamalar",
      empty: "Henüz favori eklemediniz",
      emptyDesc: "Hesaplama sonuçlarından favori ekleyebilirsiniz",
      remove: "Kaldır",
      lowestPlatform: "En Uygun Platform:",
    },
    
    // Footer
    footer: {
      madeWith: "ile yapıldı",
      by: "tarafından",
      documentation: "Dokümantasyon",
      github: "GitHub",
    },
    
    // Common
    common: {
      loading: "Yükleniyor...",
      error: "Hata",
      success: "Başarılı",
      cancel: "İptal",
      save: "Kaydet",
      delete: "Sil",
      edit: "Düzenle",
      close: "Kapat",
      goHome: "Ana Sayfaya Dön",
      loginRequired: "Giriş Gerekli",
      loginRequiredDesc: "Bu özelliği kullanmak için giriş yapın",
      sessionExpired: "Oturum Sona Erdi",
      sessionExpiredDesc: "Tekrar giriş yapın...",
      deleteFailed: "Silme işlemi başarısız oldu",
      removed: "Kaldırıldı",
      removedFromFavorites: "Favorilerden çıkarıldı",
      removeFromFavoritesFailed: "Favorilerden çıkarılamadı",
      shareOpened: "Paylaşım Açıldı",
      shareOpenedDesc: "paylaşım penceresi açıldı",
    },
  },
  
  en: {
    // Navbar
    navbar: {
      appName: "AI Cost Calculator",
      history: "History",
      favorites: "Favorites",
      login: "Login",
      logout: "Logout",
    },
    
    // Hero
    hero: {
      title: "AI Coding Platforms Cost Calculator",
      subtitle: "Enter your app idea and compare estimated costs and token usage across different AI platforms",
      platforms: "9 AI Platforms",
      realtime: "Real-time",
      aiPowered: "AI Powered",
    },
    
    // Input Form
    form: {
      title: "Enter Your App Idea",
      placeholder: "E.g., I want to build an e-commerce platform with user authentication, product management, shopping cart, and payment integration...",
      calculate: "Calculate",
      optimize: "Optimize Prompt",
      calculating: "Calculating...",
      optimizing: "Optimizing...",
      minLength: "Enter at least 10 characters",
    },
    
    // Results Table
    results: {
      title: "Platform Comparison",
      subtitle: "Estimated prompt count, token usage, and cost for each platform",
      platform: "Platform",
      prompts: "Prompt Count",
      tokens: "Tokens",
      cost: "Cost (₺)",
      addToFavorites: "Add to Favorites",
      removeFromFavorites: "Remove from Favorites",
      addedToFavorites: "Added to Favorites",
      removedFromFavorites: "Removed from Favorites",
      loginRequired: "Please login to add favorites",
      lowestCost: "Best Value",
    },
    
    // Cost Visualization
    visualization: {
      title: "Cost Visualization",
      description: "Comparative chart view of platform costs",
      cost: "Cost",
    },
    
    // Optimization Panel
    optimization: {
      title: "Prompt Optimization",
      description: "AI-optimized prompt that uses fewer tokens",
      stats: "Statistics",
      originalTokens: "Original Tokens",
      optimizedTokens: "Optimized Tokens",
      toonTokens: "TOON Tokens",
      tokenReduction: "Token Reduction",
      toonTokenReduction: "TOON Token Reduction",
      costSavings: "Cost Savings",
      toonCostSavings: "TOON Cost Savings",
      tabs: {
        formatted: "Formatted Prompt",
        optimized: "Optimized",
        toon: "TOON Format",
        aiLinks: "AI Model Links",
      },
      toonTitle: "TOON Format (Token-Oriented Object Notation)",
      toonDescription: "Compact format using 30-60% fewer tokens than JSON",
      toonBenefits: "TOON Benefits:",
      toonBenefit1: "30-60% fewer tokens",
      toonBenefit2: "Up to 50% cost savings",
      toonBenefit3: "Faster processing",
      toonBenefit4: "Ideal for tabular data",
      copyPrompt: "Copy Prompt",
      copied: "Copied!",
      aiLinksTitle: "Quick Access to AI Platforms",
      aiLinksDesc: "Optimized prompt is automatically copied, paste with Ctrl+V in the platform",
      chatWith: "Chat with",
      promptCopied: "Optimized Prompt Copied!",
      promptCopiedDesc: "is opening. Paste with Ctrl+V.",
      copyError: "Copy failed",
      sharePrompt: "Share Prompt",
      shareSuccess: "Share link copied!",
      shareError: "Failed to create share link",
      shareOn: "Share on:",
    },
    
    // History Page
    history: {
      title: "Calculation History",
      empty: "No calculations yet",
      emptyDesc: "Start by entering an app idea on the home page",
      date: "Date",
      idea: "App Idea",
      avgCost: "Avg. Cost",
      viewDetails: "View Details",
      lowestPlatform: "Best Value Platform:",
    },
    
    // Favorites Page
    favorites: {
      title: "Favorite Calculations",
      empty: "No favorites yet",
      emptyDesc: "You can add favorites from calculation results",
      remove: "Remove",
      lowestPlatform: "Best Value Platform:",
    },
    
    // Footer
    footer: {
      madeWith: "Made with",
      by: "by",
      documentation: "Documentation",
      github: "GitHub",
    },
    
    // Common
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      close: "Close",
      goHome: "Go Home",
      loginRequired: "Login Required",
      loginRequiredDesc: "Please login to use this feature",
      sessionExpired: "Session Expired",
      sessionExpiredDesc: "Please login again...",
      deleteFailed: "Delete failed",
      removed: "Removed",
      removedFromFavorites: "Removed from favorites",
      removeFromFavoritesFailed: "Failed to remove from favorites",
      shareOpened: "Share Opened",
      shareOpenedDesc: "share window opened",
    },
  },
};

export type Language = keyof typeof translations;
export type TranslationKeys = typeof translations.tr | typeof translations.en;
