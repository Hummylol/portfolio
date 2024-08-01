gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);


document.addEventListener("DOMContentLoaded", function () {
    const lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        smoothTouch: false
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    const footer = document.querySelector(".footer");
    const lastCard = document.querySelector(".card.scroll");
    const pinnedSections = gsap.utils.toArray(".pinned");

    document.querySelector('.side button:nth-child(1)').addEventListener('click', () => {
        gsap.to(window, { duration: 1, scrollTo: "#projects", ease: "power2.inOut" });
    });
    document.querySelector('.side button:nth-child(2)').addEventListener('click', () => {
        gsap.to(window, { duration: 1, scrollTo: "#skills", ease: "power2.inOut" });
    });
    document.querySelector('.side button:nth-child(4)').addEventListener('click', () => {
        gsap.to(window, { duration: 1.8, scrollTo: "#horscroll", ease: "power2.inOut" });
    });
    
    pinnedSections.forEach((section, index, sections) => {
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: index === sections.length - 1 ? `+=${lastCard.offsetHeight / 1}` : footer.offsetTop - window.innerHeight,
                pin: true,
                pinSpacing: false,
                scrub: 1,
            }
        });
        gsap.fromTo(section,
            {
                scale: 1,
                filter: "blur(0px) brightness(1)"
            },
            {
                scale: 0.4,
                borderRadius: "10%",
                filter: "blur(2px) brightness(0.5)",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: index === sections.length - 1 ? `+=${lastCard.offsetHeight / 1}` : footer.offsetTop - window.innerHeight,
                    scrub: 1,
                }
            }
        );
    });
    gsap.set(".dot", { visibility: "visible" });

    gsap.to(".dot", {
        y: -20,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: "power2.outIn"
    });
    gsap.from(".img h1", {
        duration: 1.5,
        opacity: 0,
        y: 50,
        ease: "power3"
    });

    gsap.from(".img p", {
        duration: 1.5,
        opacity: 0,
        y: 50,
        ease: "power3",
        delay: 0.1
    });

    gsap.fromTo(".humaid",
        {
            scale: 1,
        },
        {
            x: 1300,
            color: "white",
            duration: 1,
            ease: "power2.out",
            opacity: 0,
            scrollTrigger: {
                trigger: ".img h1",
                start: "bottom 40%",
                end: "bottom -100%",
                scrub: true
            }
        }
    );

    gsap.fromTo(".contentpara",
        {
            y: 0,
        },
        {
            y: 100,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".img h1",
                start: "bottom 40%",
                end: "bottom -100%",
                scrub: true
            }
        }
    );


    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    document.querySelectorAll(".shuffle-target").forEach(element => {
    element.dataset.value = element.innerText;

    let interval = null;

    element.onmouseover = event => {
        let iteration = 0;

        clearInterval(interval);

        interval = setInterval(() => {
            event.target.innerText = event.target.innerText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return event.target.dataset.value[index];
                    }

                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");

            if (iteration >= event.target.dataset.value.length) {
                clearInterval(interval);
            }

            iteration += 1/3;
        }, 30);
    };
});




});