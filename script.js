(() => {
  "use strict";

  const menuButton = document.getElementById("menuButton");
  const mainNav = document.getElementById("mainNav");
  const progress = document.getElementById("scrollProgress");

  const navLinks = [
    ...document.querySelectorAll(".main-nav a")
  ];

  const sections = [
    ...document.querySelectorAll("main section[id]")
  ];

  const revealElements = document.querySelectorAll(".reveal");

  // ==========================================
  // MENU MOBILE
  // ==========================================

  function toggleMenu() {
    const isOpen = mainNav.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );
  }

  if (menuButton) {
    menuButton.addEventListener(
      "click",
      toggleMenu
    );
  }

  // Fecha o menu quando um link é selecionado
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {

      mainNav.classList.remove("open");

      menuButton?.setAttribute(
        "aria-expanded",
        "false"
      );

    });
  });


  // ==========================================
  // BARRA DE PROGRESSO
  // ==========================================

  function updateScrollProgress() {

    const scrollTop = window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const percentage =
      documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    if (progress) {

      progress.style.width =
        `${percentage}%`;

    }
  }


  // ==========================================
  // LINK ATIVO DO MENU
  // ==========================================

  function updateActiveLink() {

    const marker =
      window.scrollY + 150;

    let current =
      "inicio";

    sections.forEach((section) => {

      if (marker >= section.offsetTop) {

        current =
          section.id;

      }

    });

    navLinks.forEach((link) => {

      link.classList.toggle(
        "active",
        link.getAttribute("href") ===
          `#${current}`
      );

    });
  }


  // ==========================================
  // EVENTO DE ROLAGEM
  // ==========================================

  window.addEventListener(
    "scroll",
    () => {

      updateScrollProgress();
      updateActiveLink();

    },
    {
      passive: true
    }
  );


  // ==========================================
  // ANIMAÇÕES AO ROLAR A PÁGINA
  // ==========================================

  const observer =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12,

        rootMargin:
          "0px 0px -40px 0px"
      }
    );


  revealElements.forEach((element) => {

    observer.observe(element);

  });


  // ==========================================
  // INICIALIZAÇÃO
  // ==========================================

  updateScrollProgress();

  updateActiveLink();

})();