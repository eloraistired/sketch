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
                content: '.preloader .preloader_wrapper',
                buttonText: '.preloader .preloader_action_text .preloader_actionText',
                button: '.preloader .preloader_footer'
            },
        });

        this.preloader = element;



        this.length = 0;
        this.assets = {
            lenght: [],
            percent: 0
        }

        this.createLoader();
    }

    createLoader() {
        this.assets.lenght = [...window.ASSETS, window.NAVIGATION].length

        this.loadAsset(window.ASSETS)
        this.loadNodes(window.NAVIGATION)
    }

    loadAsset(ASSETS) {
        each(ASSETS, (image) => {

            const media = new window.Image();

            media.crossOrigin = 'anonymous';
            media.src = image;

            media.onload = (_) => {
                // texture.image = media;

                this.onAssetLoaded();
            };

        })

    }

    loadNodes(NAVIGATION) {
        fetch(NAVIGATION, {
                method: 'GET',
                mode: "no-cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Request-Type": "ne/xhr"
                }
            })
            .then(res => {
                console.log("res1", res)
                return res.text();
            })
            .then(res => {
                const doc = document.createElement('div')
                doc.innerHTML = res
                console.log("res2", doc)

                this.length++
                this.updateLoader()

            })
            .catch(res => {
                console.log("Exception : ", res);
            })
    }

    onAssetLoaded(image) {
        this.length++

        this.updateLoader()
    }

    updateLoader() {
        this.assets.percent = this.length / this.assets.lenght;
        this.elements.number.innerHTML = `${Math.round(this.assets.percent * 100)}%`;

        if (this.assets.percent === 1) {
            this.onLoaded();
        }
    }

    onLoaded() {
        return new Promise((resolve) => {
            this.emit('completed');

            this.animateIn = GSAP.timeline({
                delay: 1,
            })

            this.animateIn.set(this.elements.wobblePath, {
                attr: {
                    d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z'
                }
            })
            this.animateIn.to(this.elements.wobblePath, {
                duration: 0.8,
                ease: 'power4.in',
                attr: {
                    d: 'M 0 100 V 50 Q 50 0 100 50 V 100 z'
                }
            }, 0)
            this.animateIn.to(this.elements.wobblePath, {
                duration: 0.3,
                ease: 'power2',
                attr: {
                    d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z'
                }
            })

            this.animateIn.to(this.elements.content.childNodes, {
                    duration: 1.5,
                    ease: 'expo.out',
                    color: '#fff',
                    stagger: -.2
                },
                '-=.7'
            )


            this.animateIn.to(this.elements.number, {
                duration: 1.5,
                ease: 'expo.out',
                y: '150%',
            })

            this.animateIn.to(this.elements.number, {
                    duration: 1.5,
                    ease: 'expo.out',
                    y: '100%',
                },
                '-=3.5'
            )

            this.animateIn.to(this.elements.buttonText, {
                duration: .5,
                ease: 'expo.out',
                y: '0%',
            },
            '-=.5'
            )





            this.animateIn.call((_) => {
                this.element.classList.add('loaded')
                this.elements.button.addEventListener('click', this.onBegin.bind(this), { once: true })
            });
        });
    }

    onBegin() {
            this.animateOut = GSAP.timeline({
                delay: 1,
            })
            this.animateOut.set(this.elements.wobblePath, {
                attr: {
                    d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z'
                }
            })
            this.animateOut.to(this.elements.wobblePath, {
                duration: 0.3,
                ease: 'power2.in',
                attr: {
                    d: 'M 0 0 V 50 Q 50 0 100 50 V 0 z'
                }
            })
            this.animateOut.to(this.elements.wobblePath, {
                duration: 0.8,
                ease: 'power4',
                attr: {
                    d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z'
                }
            })

             this.animateOut.to(this.elements.content.childNodes, {
                duration: 1.5,
                ease: 'expo.out',
                color: '#fff',
                stagger: -.2
            }, '-=.7')


            
            this.animateOut.to(this.element, {
                autoAlpha: 0,
                duration: 1.5,
            }, '-=2')

        


        this.animateOut.call((_) => {
            this.destroy();
        });
    }

    destroy() {
        this.element.parentNode.removeChild(this.element);
    }
}
