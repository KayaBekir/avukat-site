/* ==========================================================================
   KAYA HUKUK & DANIŞMANLIK BÜROSU — DİNAMİK İŞLEV KODLARI (script.js)
   
   İçerik Tablosu:
   1. Sayfa Yükleme & İkon Başlatıcı (Lucide Icons)
   2. Mobil Menü (Hamburger) Açma/Kapama İşlevi
   3. Hizmet / Uzmanlık Alanı Filtreleme
   4. S.S.S. Akordiyon (Accordion) Yapısı
   5. Telefon Numarası Otomatik Maskeleme
   6. Ön Değerlendirme Formu (WhatsApp Yönlendirmeli)
   ========================================================================== */


/* ==========================================================================
   1. SAYFA YÜKLEME VE İKON BAŞLATICI
   Açıklama: DOM nesneleri tamamen yüklendiğinde Lucide SVG ikon kütüphanesini
   otomatik olarak tarar ve <i data-lucide="..."> etiketlerini SVG'ye dönüştürür.
   ========================================================================== */
   document.addEventListener("DOMContentLoaded", () => {
    if (window.lucide) {
      lucide.createIcons();
    }
  });
  
  
  /* ==========================================================================
     2. MOBİL MENÜ (HAMBURGER) TOGGLE FONKSİYONU
     Açıklama: Mobil ekranlarda çıkan menü butonuna tıklandığında navigasyon
     listesine '.active' sınıfı ekleyerek menünün açılıp kapanmasını sağlar.
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  
    // Mobil menü açıkken bir linke tıklandığında menüyü otomatik kapat
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }
  
  
  /* ==========================================================================
     3. HİZMET FİLTRELEME FONKSİYONU (filterServices)
     Açıklama: HTML tarafında onclick="filterServices('kategori')" şeklinde çağrılır.
     Mekanizma:
       - Aktif olan butonun rengini değiştirmek için '.active' sınıfını günceller.
       - Tüm '.service-card' öğelerini tarar; seçilen kategoriye uymayanları 
         display: 'none' yaparak gizler, uyanları display: 'block' ile gösterir.
     ========================================================================== */
  function filterServices(category) {
    const cards = document.querySelectorAll('.service-card');
    const buttons = document.querySelectorAll('.filter-btn');
  
    // 1. Tıklanan butona 'active' sınıfı ver, diğerlerinden kaldır
    buttons.forEach(btn => btn.classList.remove('active'));
    if (window.event && window.event.target) {
      window.event.target.classList.add('active');
    }
  
    // 2. Kartları kategoriye göre göster veya gizle
    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (category === 'all' || cardCategory === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
  
  
  /* ==========================================================================
     4. S.S.S. ACCORDION (AÇILIR-KAPANIR SORULAR - toggleFaq)
     Açıklama: Soru başlığına tıklandığında çalışır.
     Mekanizma:
       - Tıklanan başlığın üst kapsayıcısı olan '.faq-item' sınıfına '.active' ekler.
       - "Bir soru açıldığında diğerlerinin kapanması" için sayfadaki tüm FAQ kartlarını
         gezer ve tıklanan hariç hepsinden '.active' sınıfını siler.
     ========================================================================== */
  function toggleFaq(element) {
    const faqItem = element.parentElement;
    const allFaqs = document.querySelectorAll('.faq-item');
  
    // Tıklanan dışındaki açık olan diğer tüm soruları kapat
    allFaqs.forEach(item => {
      if (item !== faqItem) {
        item.classList.remove('active');
      }
    });
  
    // Tıklanan sorunun durumunu tersine çevir (açıksa kapat, kapalıysa aç)
    faqItem.classList.toggle('active');
  }
  
  
  /* ==========================================================================
     5. CANLI TELEFON NUMARASI MASKELEME (0 5XX XXX XX XX)
     Açıklama: Kullanıcı klavyeden numara girerken anlık olarak Türkçe telefon
     formatını uygular.
     Mekanizma:
       - Sadece rakamları (\D ile harfleri silerek) kabul eder.
       - İlk rakamın her zaman '0' olmasını zorunlu kılar.
       - Belirlenen karakter uzunluklarına göre aralara parantez ve boşluk ekler.
     ========================================================================== */
  const phoneInput = document.getElementById('phoneInput');
  
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      // Sadece rakam dışındaki tüm karakterleri temizle
      let value = e.target.value.replace(/\D/g, '');
  
      if (value.length > 0) {
        // Numara 0 ile başlamıyorsa otomatik başa 0 ekle
        if (!value.startsWith('0')) {
          value = '0' + value;
        }
  
        let formatted = '';
  
        // Adım adım formatı oluştur: 0 (5XX) XXX XX XX
        if (value.length > 0) formatted += value.substring(0, 1);
        if (value.length > 1) formatted += ' (' + value.substring(1, 4);
        if (value.length >= 4) formatted += ') ';
        if (value.length > 4) formatted += value.substring(4, 7);
        if (value.length >= 7) formatted += ' ';
        if (value.length > 7) formatted += value.substring(7, 9);
        if (value.length >= 9) formatted += ' ';
        if (value.length > 9) formatted += value.substring(9, 11);
  
        e.target.value = formatted;
      } else {
        e.target.value = '';
      }
    });
  
    // Backspace (Silme) tuşuna basıldığında parantez takılmasını önleme kontrolü
    phoneInput.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && phoneInput.value.length === 2) {
        phoneInput.value = '';
      }
    });
  }
  
  
  /* ==========================================================================
     6. ÖN DEĞERLENDİRME FORMU (WHATSAPP OTOMATİK MESAJ YÖNLENDİRMESİ)
     Açıklama: Form gönderildiğinde verileri derler ve hazır bir WhatsApp mesajı
     oluşturarak büronun WhatsApp hattına yönlendirir.
     ========================================================================= */
  const quickForm = document.getElementById('quickContactForm');
  
  if (quickForm) {
    quickForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Sayfanın varsayılan form gönderme ve yenileme davranışını durdurur
  
      // 🔴 KRİTİK: Avukatın/Büronun WhatsApp numarasını buraya uluslararası formatta yazın (Başına + koymayın)
      const wpPhone = "905550000000"; 
  
      // Form alanlarındaki verileri topluyoruz
      const nameInput = this.querySelector('input[type="text"]');
      const phoneInput = document.getElementById('phoneInput');
      const subjectSelect = this.querySelector('select');
  
      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const subjectText = subjectSelect && subjectSelect.selectedIndex !== -1 
        ? subjectSelect.options[subjectSelect.selectedIndex].text 
        : 'Genel';
  
      // WhatsApp mesaj metnini özel kaçış karakterleriyle (%0A = Alt Satır) hazırlıyoruz
      const message = `Merhaba, web sitenizden yeni bir ön değerlendirme talebi geldi:%0A%0A` +
                      `👤 *Ad Soyad:* ${encodeURIComponent(name)}%0A` +
                      `📞 *Telefon:* ${encodeURIComponent(phone)}%0A` +
                      `📋 *Konu:* ${encodeURIComponent(subjectText)}`;
  
      // Oluşturulan bağlantıyı yeni sekmede açıyoruz
      const wpUrl = `https://wa.me/${wpPhone}?text=${message}`;
      window.open(wpUrl, '_blank');
  
      // Kullanıcı deneyimi için formu temizleyip bilgi veriyoruz
      this.reset();
    });
  }