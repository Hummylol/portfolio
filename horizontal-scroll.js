gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
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

    const content = document.querySelector(".content");
        let contentwidth = content.offsetWidth;
        let amountToScroll = contentwidth - window.innerWidth;
        console.log(amountToScroll)
        const a = gsap.to(content, {
            x: -amountToScroll,
            duration: 1,
            ease: "none"
        });

        ScrollTrigger.create({
            trigger: ".horizontal-scrolling",
            start: "top 20%",
            end: "+=" + amountToScroll,
            pin: true,
            animation: a,
            scrub: 1
        })
});