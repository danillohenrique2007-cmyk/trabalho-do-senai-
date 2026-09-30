document.addEventListener("DOMContentLoaded", () => {
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

  /* ==========================================
     MENU MOBILE
  ========================================== */

  if (menuButton && mainNav) {
    menuButton.addEventListener("click", () => {
      const isOpen =
        mainNav.classList.toggle("active");

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("active");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );
      });
    });
  }


  /* ==========================================
     BARRA DE PROGRESSO
  ========================================== */

  function updateProgress() {
    if (!progress) {
      return;
    }

    const scrollTop =
      window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    if (documentHeight <= 0) {
      progress.style.width = "0%";
      return;
    }

    const percentage =
      (scrollTop / documentHeight) * 100;

    progress.style.width =
      `${Math.min(100, percentage)}%`;
  }


  /* ==========================================
     LINK ATIVO DO MENU
  ========================================== */

  function updateActiveLink() {
    const position =
      window.scrollY + 180;

    let current =
      "inicio";

    sections.forEach((section) => {
      if (position >= section.offsetTop) {
        current =
          section.id;
      }
    });

    navLinks.forEach((link) => {
      const href =
        link.getAttribute("href");

      link.classList.toggle(
        "active",
        href === `#${current}`
      );
    });
  }


  /* ==========================================
     ANIMAÇÕES AO ROLAR
  ========================================== */

  const revealElements =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

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
          threshold: 0.12
        }
      );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

  }


  /* ==========================================
     CONTADORES ANIMADOS
  ========================================== */

  const counters =
    document.querySelectorAll(
      "[data-counter]"
    );

  function animateCounter(element) {

    if (
      element.dataset.done === "true"
    ) {
      return;
    }

    element.dataset.done =
      "true";

    const target =
      Number(
        element.dataset.counter
      );

    if (Number.isNaN(target)) {
      return;
    }

    const duration =
      1300;

    const start =
      performance.now();

    function animate(currentTime) {

      const elapsed =
        currentTime - start;

      const progressValue =
        Math.min(
          elapsed / duration,
          1
        );

      const eased =
        1 -
        Math.pow(
          1 - progressValue,
          3
        );

      const value =
        Math.floor(
          target * eased
        );

      element.textContent =
        value;

      if (
        progressValue < 1
      ) {

        requestAnimationFrame(
          animate
        );

      } else {

        element.textContent =
          target;

      }
    }

    requestAnimationFrame(
      animate
    );
  }


  if (
    "IntersectionObserver" in window
  ) {

    const counterObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (
              entry.isIntersecting
            ) {

              animateCounter(
                entry.target
              );

              observer.unobserve(
                entry.target
              );
            }

          });

        },
        {
          threshold: 0.6
        }
      );

    counters.forEach((counter) => {
      counterObserver.observe(
        counter
      );
    });

  } else {

    counters.forEach(
      animateCounter
    );

  }


  /* ==========================================
     CURIOSIDADES
  ========================================== */

  const facts = [
    "A inteligência artificial pode analisar grandes volumes de dados em pouco tempo.",

    "Sistemas de reconhecimento são uma das áreas em que técnicas de IA podem ser aplicadas.",

    "A autonomia de sistemas militares levanta debates sobre responsabilidade e supervisão humana.",

    "O uso de IA em segurança envolve questões técnicas, jurídicas e éticas.",

    "A regulamentação internacional é um dos temas discutidos quando se fala em sistemas autônomos."
  ];

  const factText =
    document.querySelector(
      ".fact-text"
    );

  const factDots = [
    ...document.querySelectorAll(
      ".fact-dot"
    )
  ];

  let currentFact =
    0;


  function showFact(index) {

    if (!factText) {
      return;
    }

    currentFact =
      index;

    factText.classList.add(
      "fact-changing"
    );

    setTimeout(() => {

      factText.textContent =
        facts[currentFact];

      factText.classList.remove(
        "fact-changing"
      );

    }, 160);


    factDots.forEach(
      (dot, dotIndex) => {

        dot.classList.toggle(
          "active",
          dotIndex === currentFact
        );

      }
    );
  }


  factDots.forEach(
    (dot, index) => {

      dot.addEventListener(
        "click",
        () => {

          showFact(index);

        }
      );

    }
  );


  if (factText) {

    showFact(0);

    setInterval(() => {

      const next =
        (currentFact + 1) %
        facts.length;

      showFact(next);

    }, 6000);

  }


  /* ==========================================
     EFEITO DE LUZ SEGUINDO O MOUSE
  ========================================== */

  const glowCards =
    document.querySelectorAll(
      ".glow-card"
    );

  glowCards.forEach((card) => {

    card.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left;

        const y =
          event.clientY -
          rect.top;

        card.style.setProperty(
          "--mouse-x",
          `${x}px`
        );

        card.style.setProperty(
          "--mouse-y",
          `${y}px`
        );

      }
    );

  });


  /* ==========================================
     BOTÃO VOLTAR AO TOPO
  ========================================== */

  const backToTop =
    document.querySelector(
      ".back-to-top"
    );

  if (backToTop) {

    window.addEventListener(
      "scroll",
      () => {

        if (
          window.scrollY > 650
        ) {

          backToTop.classList.add(
            "show"
          );

        } else {

          backToTop.classList.remove(
            "show"
          );

        }

      },
      {
        passive: true
      }
    );


    backToTop.addEventListener(
      "click",
      () => {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );
  }


  /* ==========================================
     ANO AUTOMÁTICO
  ========================================== */

  const yearElements =
    document.querySelectorAll(
      ".current-year"
    );

  yearElements.forEach(
    (element) => {

      element.textContent =
        new Date().getFullYear();

    }
  );


  /* ==========================================
     EFEITO PARALLAX DO HERO
  ========================================== */

  const hero =
    document.querySelector(
      ".hero"
    );

  const heroContent =
    document.querySelector(
      ".hero-content"
    );

  if (
    hero &&
    heroContent
  ) {

    window.addEventListener(
      "scroll",
      () => {

        const scroll =
          window.scrollY;

        if (
          scroll <
          window.innerHeight
        ) {

          heroContent.style.transform =
            `translateY(${scroll * 0.10}px)`;

        }

      },
      {
        passive: true
      }
    );
  }


  /* ==========================================
     SCROLL GERAL
  ========================================== */

  window.addEventListener(
    "scroll",
    () => {

      updateProgress();

      updateActiveLink();

    },
    {
      passive: true
    }
  );


  /* ==========================================
     INICIALIZAÇÃO
  ========================================== */

  updateProgress();

  updateActiveLink();

});
