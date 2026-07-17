/* assets/js/hero-header.js */
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav-overlay');
    const navbarWrapper = document.querySelector(".navbar-wrapper");

    // Jika elemen krusial tidak ada, hentikan script agar tidak error
    if (!menuBtn || !mobileNav || !navbarWrapper) return;

    let lastScrollY = window.scrollY;

    // --- LOGIKA MENU MOBILE ---
    const openMenu = () => {
        menuBtn.classList.add('active');
        mobileNav.classList.add('open');
        document.documentElement.classList.add('nav-open'); // kunci di html, bukan body
        menuBtn.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
        menuBtn.classList.remove('active');
        mobileNav.classList.remove('open');
        document.documentElement.classList.remove('nav-open');
        menuBtn.setAttribute('aria-expanded', 'false');
    };

    const toggleMenu = () => {
        const isOpen = mobileNav.classList.contains('open');
        isOpen ? closeMenu() : openMenu();
    };

    // Toggle utama
    menuBtn.addEventListener('click', toggleMenu);

    // Tutup kalau klik salah satu link di dalam mobile nav
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Tutup kalau tekan Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
            closeMenu();
        }
    });

    // Tutup otomatis jika resize melewati desktop (>768px) saat menu terbuka
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileNav.classList.contains('open')) {
            closeMenu();
        }
    });


    // // --- LOGIKA AUTO-HIDE HEADER SAAT SCROLL ---
    // window.addEventListener("scroll", () => {
    //     const currentScrollY = window.scrollY;
        
    //     // Cek menggunakan class 'open' sesuai logika openMenu() kamu
    //     const isMobileMenuOpen = mobileNav.classList.contains("open");

    //     // Jika menu mobile sedang terbuka, jangan sembunyikan header
    //     if (isMobileMenuOpen) return;

    //     // 1. Scroll ke bawah DAN posisi sudah melewati batas aman (80px) -> Sembunyikan
    //     if (currentScrollY > lastScrollY && currentScrollY > 80) {
    //         navbarWrapper.classList.add("header-hidden");
    //     } 
    //     // 2. Scroll ke atas -> Munculkan kembali
    //     else {
    //         navbarWrapper.classList.remove("header-hidden");
    //     }

    //     // Update posisi scroll terakhir
    //     lastScrollY = currentScrollY;
    // });
    // --- LOGIKA AUTO-HIDE + MUNCUL SAAT BERHENTI SCROLL ---
    let isScrolling;

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;
        const isMobileMenuOpen = mobileNav.classList.contains("open");

        if (isMobileMenuOpen) return;

        // 1. Bersihkan timer setiap kali mendeteksi ada pergerakan scroll baru
        clearTimeout(isScrolling);

        // 2. Logika Standar: Scroll ke bawah sembunyikan, ke atas munculkan
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
            navbarWrapper.classList.add("header-hidden");
        } else {
            navbarWrapper.classList.remove("header-hidden");
        }

        // 3. Logika Tambahan: Begitu scroll BERHENTI selama 250ms, paksa header muncul kembali
        isScrolling = setTimeout(() => {
            navbarWrapper.classList.remove("header-hidden");
        }, 250); // Angka 250 artinya 0.25 detik setelah berhenti scroll. Bisa kamu sesuaikan.

        // Update posisi scroll terakhir
        lastScrollY = currentScrollY;
    });
});