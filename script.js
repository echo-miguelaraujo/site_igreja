lucide.createIcons();

// 1. FUNÇÃO GLOBAL DE IDIOMA (Isolada para garantir que o HTML sempre a encontre)
window.setLanguage = function(lang) {
    if (lang === 'pt') {
        // Se for português, limpa o cookie para voltar ao original
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
    } else {
        // Cria um cookie dizendo ao Google para traduzir de PT para o idioma escolhido
        document.cookie = `googtrans=/pt/${lang}; path=/;`;
        document.cookie = `googtrans=/pt/${lang}; domain=${window.location.hostname}; path=/;`;
    }
    
    // Salva a escolha do botão (para trocar a letrinha PT/EN/ES)
    localStorage.setItem("selected_language", lang);

    // Recarrega a página para o Google aplicar a tradução automaticamente
    window.location.reload();
};

// 2. INICIALIZAÇÃO DA PÁGINA E ANIMAÇÕES
document.addEventListener("DOMContentLoaded", () => {
    const headerContainer = document.getElementById("header-container");
    const logoImg = document.getElementById("logo-img");
    const logoTexto = document.getElementById("logo-texto");
    const navLinks = document.querySelectorAll(".nav-link");
    const btnMobile = document.getElementById("btn-mobile");
    const menuMobile = document.getElementById("menu-mobile");
    const menuLinks = document.querySelectorAll(".menu-link");
    const iconMenu = document.getElementById("icon-menu");
    const iconClose = document.getElementById("icon-close");

    // 2.1. TRANSFORMAÇÃO DO CABEÇALHO EM PÍLULA AO ROLAR (SCROLL)
    function checkScroll() {
        if (window.scrollY > 80) {
            headerContainer.classList.add("bg-white/95", "backdrop-blur-md", "shadow-2xl", "max-w-5xl");
            headerContainer.classList.remove("max-w-7xl");
            
            if (logoImg) logoImg.classList.add("brightness-0");
            if (logoTexto) {
                logoTexto.classList.add("text-gray-900");
                logoTexto.classList.remove("text-white");
            }

            navLinks.forEach(link => {
                link.classList.add("text-gray-700", "hover:text-black");
                link.classList.remove("text-white/90", "hover:text-white");
            });

            btnMobile.classList.add("text-gray-900");
            btnMobile.classList.remove("text-white");
        } else {
            headerContainer.classList.remove("bg-white/95", "backdrop-blur-md", "shadow-2xl", "max-w-5xl");
            headerContainer.classList.add("max-w-7xl");

            if (logoImg) logoImg.classList.remove("brightness-0");
            if (logoTexto) {
                logoTexto.classList.remove("text-gray-900");
                logoTexto.classList.add("text-white");
            }

            navLinks.forEach(link => {
                link.classList.remove("text-gray-700", "hover:text-black");
                link.classList.add("text-white/90", "hover:text-white");
            });

            btnMobile.classList.remove("text-gray-900");
            btnMobile.classList.add("text-white");
        }
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll();

    // 2.2. HIGHLIGHT DO LINK ATIVO
    const sections = document.querySelectorAll("section");

    function updateActiveNav() {
        let currentSectionId = "";
        const triggerPoint = window.innerHeight * 0.3;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= triggerPoint) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute("href")?.replace("#", "");
            if (href === currentSectionId) {
                link.classList.add("font-bold", "scale-105");
                link.classList.remove("font-normal", "opacity-75");
            } else {
                link.classList.remove("font-bold", "scale-105");
                link.classList.add("font-normal");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav);
    updateActiveNav();

    // 2.3. MENU MOBILE TOGGLE
    function toggleMenu() {
        const isOpen = !menuMobile.classList.contains("hidden");
        if (!isOpen) {
            menuMobile.classList.remove("hidden");
            iconMenu.classList.add("hidden");
            iconClose.classList.remove("hidden");
        } else {
            menuMobile.classList.add("hidden");
            iconMenu.classList.remove("hidden");
            iconClose.classList.add("hidden");
        }
    }

    if (btnMobile) btnMobile.addEventListener("click", toggleMenu);
    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (!menuMobile.classList.contains("hidden")) toggleMenu();
        });
    });

    // 2.4. BOTÃO FLUTUANTE DO WHATSAPP (ESCONDE NA SEÇÃO DE CONTATO)
    const btnWhatsapp = document.getElementById("btn-whatsapp");
    const secaoContato = document.getElementById("contato");

    if (btnWhatsapp && secaoContato) {
        const waObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    btnWhatsapp.classList.add("opacity-0", "pointer-events-none", "scale-90");
                } else {
                    btnWhatsapp.classList.remove("opacity-0", "pointer-events-none", "scale-90");
                }
            });
        }, { threshold: 0.2 });

        waObserver.observe(secaoContato);
    }

    // 2.5. MENU DE IDIOMAS (Visibilidade e texto do botão)
    const btnLangToggle = document.getElementById("btn-lang-toggle");
    const langMenu = document.getElementById("lang-menu");
    const currentLangText = document.getElementById("current-lang-text");

    if (btnLangToggle && langMenu) {
        btnLangToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            langMenu.classList.toggle("hidden");
            langMenu.classList.toggle("flex");
        });

        document.addEventListener("click", () => {
            langMenu.classList.add("hidden");
            langMenu.classList.remove("flex");
        });
    }

    // Lê qual idioma está salvo no navegador e aplica a sigla no botão
    const savedLang = localStorage.getItem("selected_language") || "pt";
    if (currentLangText) {
        currentLangText.textContent = savedLang.toUpperCase();
    }
});