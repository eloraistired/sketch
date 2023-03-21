/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import GSAP from 'gsap';

import Component from 'classes/Component';

import each from 'lodash/each';

export default class Preloader extends Component {
  constructor({ canvas }) {
    super({
      element: '._container',
      elements: {
        number: '.right_wrapper span.loader_'
      },
    });

    this.canvas = canvas;



    this.length = 0;

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
      });

      this.animateOut.to(this.elements.titleSpans, {
        duration: 1.5,
        ease: 'expo.out',
        stagger: 0.1,
        y: '150%',
      });

      this.animateOut.to(
        this.elements.numberText,
        {
          duration: 1.5,
          ease: 'expo.out',
          stagger: 0.1,
          y: '100%',
        },
        '-=1.4'
      );

      this.animateOut.to(this.element, {
        autoAlpha: 0,
        duration: 1.5,
      });

      this.animateOut.call((_) => {
        this.destroy();
      });
    });
  }

  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
}
