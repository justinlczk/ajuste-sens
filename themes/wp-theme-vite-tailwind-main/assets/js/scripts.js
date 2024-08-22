import Swiper from 'swiper';
import {Navigation, Pagination} from 'swiper/modules';
// import Swiper and modules styles
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
    // Handler when the DOM is fully loaded
    console.log('js executed...');

// init Swiper:
    const swiper = new Swiper('.swiper', {
        // configure Swiper to use modules
        slidesPerView: "auto",
        spaceBetween: 48,
        autoplay: true,
    });

    const textsElements = document.querySelectorAll('.scroll-section__text');
    const imagesElements = document.querySelectorAll('.scroll-section__img');
    const lengthTextsElements = textsElements.length * 0.25 * 100;


    const tlTextsElements = gsap.timeline({
        scrollTrigger: {
            trigger: ".scroll-section",
            start: "top top",
            end: `+=${lengthTextsElements}%`,
            scrub: true,
            //markers: true,
            pin: ".scroll-section",
            anticipatePin: 1,
            onUpdate: (self) => {
                console.log(self.progress);
                // I want to animate the text elements 1 by 1 as the scroll progresses
                textsElements.forEach((el, index) => {
                    if (index <= self.progress * textsElements.length && index >= self.progress * textsElements.length - 1) {
                        gsap.to(el, {color: "rgba(255, 0, 0, 1)", duration: 0.5});
                    } else {
                        gsap.to(el, {color: "rgba(255, 0, 0, .25)", duration: 0.5});
                    }
                });
                // same with the images
                imagesElements.forEach((el, index) => {
                    if (index <= self.progress * imagesElements.length && index >= self.progress * imagesElements.length - 1) {
                        gsap.to(el, {opacity: 1, display: "block", duration: 0.5});
                    } else {
                        gsap.to(el, {opacity: 0, display: "none", duration: 0.5});
                    }
                });
            }
        }
    });

    tlTextsElements
        .fromTo(".scroll-section__bar",
            {top: "0%", translateY: "0%", ease: "none"},
            {top: "100%", translateY: "-100%", ease: "none"});


});

