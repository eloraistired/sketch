/* eslint-disable no-unused-vars */
import GSAP from 'gsap';

import Prefix from 'prefix';

import each from 'lodash/each';
import map from 'lodash/map';

export default class Page {
  constructor({ element }) {
    this.selector = element;

    this.transformPrefix = Prefix('transform');
  }

  create() {
    console.log(this.selector, 'called');
    this.element = document.querySelector(this.selector);


    each(this.selectorChildren, (entry, key) => {
      if (
        entry instanceof window.HTMLElement ||
        entry instanceof window.NodeList ||
        Array.isArray(entry)
      ) {
        this.elements[key] = entry;
      } else {
        this.elements[key] = document.querySelectorAll(entry);

        if (this.elements[key].length === 0) {
          this.elements[key] = null;
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry);
        }
      }
    });


  }



  show(animation) {
  //   return new Promise((resolve) => {
  //     if (animation) {
  //       this.animationIn = animation;
  //     } else {
  //       this.animationIn = GSAP.timeline();
  //       this.animationIn.fromTo(
  //         this.element,
  //         {
  //           autoAlpha: 0,
  //         },
  //         {
  //           autoAlpha: 1,
  //         }
  //       );
  //     }

  //     this.animationIn.call((_) => {
  //       this.addEventListeners();

  //       resolve();
  //     });
  //   });
  }

  hide() {
    return new Promise((resolve) => {
      this.destroy();

      this.animationIn = GSAP.timeline();

      this.animationIn.to(this.element, {
        autoAlpha: 0,
        onComplete: resolve,
      });
    });
  }

  // Events

  onResize() {
    if (this.elements.wrapper) {
      this.scroll.limit =
        this.elements.wrapper.clientHeight - window.innerHeight;
    }

    each(this.animations, (animation) => animation.onResize());
  }

  onWheel({ pixelY }) {
    this.scroll.target += pixelY;
  }

  // Loop

  update() {
    this.scroll.target = GSAP.utils.clamp(
      0,
      this.scroll.limit,
      this.scroll.target
    );

    this.scroll.current = GSAP.utils.interpolate(
      this.scroll.current,
      this.scroll.target,
      0.1
    );

    if (this.scroll.current < 0.01) {
      this.scroll.current = 0;
    }

    if (this.elements.wrapper) {
      this.elements.wrapper.style[
        this.transformPrefix
      ] = `translateY(-${this.scroll.current}px)`;
    }
  }

  // Listeners

  addEventListeners() {}

  removeEventListeners() {}

  // Destroy

  destroy() {
    this.removeEventListeners();
  }
}