/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import GSAP from 'gsap';

import Component from 'classes/Component';

import each from 'lodash/each';

export default class Preloader extends Component {
    constructor({
        element
    }) {
        super({
            element,
            elements: {
                number: '.preloader .preloader_text .preloader_numberText',
                wobblePath: '._wobble .overlay .overlay__path',
                content: '.preloader .preloader_wrapper'
            },
        });

        this.preloader = element;



        this.length = 0;

        this.element

        this.createLoader();
    }

    createLoader() {
        each(window.ASSETS, (image) => {

            const media = new window.Image();

            media.crossOrigin = 'anonymous';
            media.src = image;

            media.onload = (_) => {
                // texture.image = media;

                this.onAssetLoaded();
            };

        });
    }

    onAssetLoaded(image) {
        this.length++;

        const percent = this.length / window.ASSETS.length;

        this.elements.number.innerHTML = `${Math.round(percent * 100)}%`;

        if (percent === 1) {
            this.onLoaded();
        }
    }

    onLoaded() {
        return new Promise((resolve) => {
            this.emit('completed');

            this.animateOut = GSAP.timeline({
                delay: 1,
            })

            this.animateOut.set(this.elements.wobblePath, {
                attr: {
                    d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z'
                }
            })
            this.animateOut.to(this.elements.wobblePath, {
                duration: 0.8,
                ease: 'power4.in',
                attr: {
                    d: 'M 0 100 V 50 Q 50 0 100 50 V 100 z'
                }
            }, 0)
            this.animateOut.to(this.elements.wobblePath, {
                duration: 0.3,
                ease: 'power2',
                attr: {
                    d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z'
                }
            })

            this.animateOut.to(this.elements.content.childNodes, {
                duration: 1.5,
                ease: 'expo.out',
                color: '#fff',
                stagger: -.2
            },
            '-=.7'
            )


            this.animateOut.to(this.elements.number, {
                duration: 1.5,
                ease: 'expo.out',
                y: '150%',
            })

            this.animateOut.to(
                this.elements.number, {
                    duration: 1.5,
                    ease: 'expo.out',
                    y: '100%',
                },
                '-=1.4'
            )




            // GSAP.timeline({ delay: 2 })


            // this.animateOut.to(this.element, {
            //   autoAlpha: 0,
            //   duration: 1.5,
            // });

            this.animateOut.call((_) => {
                this.element.classList.add('loaded')
                // this.destroy();
            });
        });
    }

    destroy() {
        this.element.parentNode.removeChild(this.element);
    }
}
