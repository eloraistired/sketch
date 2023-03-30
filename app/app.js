import 'app.scss'

import Preloader from 'components/Preloader'


import Home from 'pages/Home';

class App {
    constructor() {
        this.createContent()
        this.createPreloader()
        this.createPages()
    }

    createPreloader() {
        this.preloader = new Preloader({
            element: '._preloader'
        })

        this.preloader.once('completed', this.onPreloaded.bind(this))
    }



    createContent() {
        this.content = document.querySelector('._container')
    }

    onPreloaded() {
        this.page.show()
    }

    createPages() {
    
        this.page = new Home();
        this.page.create();
    }
}

// for testing purpose, can be include dynamically
window.ASSETS = ['/static/fav/favicon-48x48.png', '/static/fav/favicon-32x32.png', '/static/fav/favicon-16x16.png']
window.NAVIGATION = '/'

new App()


// // testing -- uwu(butterscotch)
// import gsap from 'gsap'

// const overlayPath = '._wobble .overlay .overlay__path'
// let isAnimating = true
// gsap.timeline({
//         onComplete: () => isAnimating = false
//     })
//     // bitch go up
//     .set(overlayPath, {
//         attr: {
//             d: 'M 0 100 V 100 Q 50 100 100 100 V 100 z'
//         }
//     })
//     .to(overlayPath, {
//         duration: 0.8,
//         ease: 'power4.in',
//         attr: {
//             d: 'M 0 100 V 50 Q 50 0 100 50 V 100 z'
//         }
//     }, 0)
//     .to(overlayPath, {
//         duration: 0.3,
//         ease: 'power2',
//         attr: {
//             d: 'M 0 100 V 0 Q 50 0 100 0 V 100 z'
//         },
//         onComplete: () => {
//             frame.classList.add('frame--menu-open');
//             menuWrap.classList.add('menu-wrap--open');
//         }
//     })
//     // now reveal
//     .set(overlayPath, { 
//         attr: { d: 'M 0 0 V 100 Q 50 100 100 100 V 0 z' }
//     })
//     .to(overlayPath, { 
//         duration: 0.3,
//         ease: 'power2.in',
//         attr: { d: 'M 0 0 V 50 Q 50 0 100 50 V 0 z' }
//     })
//     .to(overlayPath, { 
//         duration: 0.8,
//         ease: 'power4',
//         attr: { d: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' }
//     })
