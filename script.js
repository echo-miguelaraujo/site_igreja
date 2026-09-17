// Inicializa os ícones Lucide
lucide.createIcons();

document.addEventListener("DOMContentLoaded", () => {
    // 1. FUNCIONALIDADE DO MENU MOBILE
    const btnMobile = document.getElementById("btn-mobile");
    const menuMobile = document.getElementById("menu-mobile");
    const menuLinks = document.querySelectorAll(".menu-link");

    // Abre e fecha o menu
    btnMobile.addEventListener("click", () => {
        menuMobile.classList.toggle("hidden");
    });

    // Fecha o menu ao clicar em qualquer link
    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            menuMobile.classList.add("hidden");
        });
    });
});