```javascript
document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =========================================
       MENU MOBILE
    ========================================= */

    const menuButton = document.querySelector(".menu-button");
    const navigation = document.querySelector(".main-nav");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            navigation.classList.toggle("active");

            const expanded =
                menuButton.getAttribute("aria-expanded") === "true";

            menuButton.setAttribute(
                "aria-expanded",
                String(!expanded)
            );
        });

        navigation.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navigation.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });
        });
    }


    /* =========================================
       BARRA DE PROGRESSO
    ========================================= */

    const progressBar =
        document.querySelector(".scroll-progress");

    function updateProgressBar() {
        if (!progressBar) {
            return;
        }

        const scrollTop = window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (documentHeight <= 0) {
            progressBar.style.width = "0%";
            return;
        }

        const progress =
            (scrollTop / documentHeight) * 100;

        progressBar.style.width =
            `${Math.min(progress, 100)}%`;
    }


    /* =========================================
       LINK ATIVO DO MENU
    ========================================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navigationLinks =
        document.querySelectorAll(".main-nav a");

    function updateActiveNavigation() {
        let currentSection = "";

        const position =
            window.scrollY + 180;

        sections.forEach((section) => {
            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                position >= sectionTop &&
                position < sectionTop + sectionHeight
            ) {
                currentSection =
                    section.getAttribute("id");
            }
        });

        navigationLinks.forEach((link) => {
            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSection}`
            ) {
                link.classList.add("active");
            }
        });
    }


    /* =========================================
       ANIMAÇÕES AO ROLAR
    ========================================= */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .fade-up, .animate-on-scroll"
        );

    if ("IntersectionObserver" in window) {
        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {
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


    /* =========================================
       CONTADORES ANIMADOS
    ========================================= */

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );

    function animateCounter(element) {

        if (
            element.dataset.animated === "true"
        ) {
            return;
        }

        element.dataset.animated =
            "true";

        const target =
            Number(
                element.dataset.counter
            );

        if (
            Number.isNaN(target)
        ) {
            return;
        }

        const duration = 1600;

        const startTime =
            performance.now();

        function updateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );

            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );

            const currentValue =
                Math.floor(
                    eased * target
                );

            element.textContent =
                currentValue;

            if (progress < 1) {
                requestAnimationFrame(
                    updateCounter
                );
            } else {
                element.textContent =
                    target;
            }
        }

        requestAnimationFrame(
            updateCounter
        );
    }


    if (
        counters.length > 0 &&
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
                    threshold: 0.5
                }
            );

        counters.forEach((counter) => {
            counterObserver.observe(counter);
        });

    } else {

        counters.forEach((counter) => {
            animateCounter(counter);
        });
    }


    /* =========================================
       CARDS INTERATIVOS
    ========================================= */

    const interactiveCards =
        document.querySelectorAll(
            ".interactive-card"
        );

    interactiveCards.forEach((card) => {

        card.addEventListener(
            "mouseenter",
            () => {
                card.classList.add("hovered");
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {
                card.classList.remove("hovered");
            }
        );
    });


    /* =========================================
       CURIOSIDADES
    ========================================= */

    const facts = [
        "A inteligência artificial é utilizada em sistemas de reconhecimento, análise de dados e automação.",
        "Sistemas de IA podem analisar grandes volumes de informações em pouco tempo.",
        "O desenvolvimento de sistemas autônomos levanta importantes questões sobre responsabilidade humana.",
        "A utilização de inteligência artificial no setor militar envolve debates sobre segurança e regulamentação.",
        "O avanço tecnológico pode trazer benefícios, mas também cria novos desafios para governos e sociedade."
    ];

    const factText =
        document.querySelector(
            ".fact-text"
        );

    const factDots =
        document.querySelectorAll(
            ".fact-dot"
        );

    let currentFact = 0;

    function showFact(index) {

        if (!factText) {
            return;
        }

        currentFact = index;

        factText.classList.add(
            "fact-changing"
        );

        setTimeout(() => {

            factText.textContent =
                facts[currentFact];

            factText.classList.remove(
                "fact-changing"
            );

        }, 180);

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


    /* =========================================
       EFEITO PARALLAX DO HERO
    ========================================= */

    const hero =
        document.querySelector(".hero");

    const heroContent =
        document.querySelector(
            ".hero-content"
        );

    if (hero && heroContent) {

        window.addEventListener(
            "scroll",
            () => {

                const scroll =
                    window.scrollY;

                if (
```
