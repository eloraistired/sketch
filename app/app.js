import 'app.scss'

import Preloader from 'components/Preloader'

class App {
    constructor() {
        this.createContent()

        this.createPreloader()
    }

    createPreloader() {
        this.preloader = new Preloader({
            canvas: this.canvas
        })

        this.preloader.once('completed', this.onPreloaded.bind(this))
    }

  

    createContent() {
        this.content = document.querySelector('._container')
    }

    onPreloaded() {
        this.page.show()
    }
}

window.ASSETS = ['/static/fav/favicon-48x48.png', '/static/fav/favicon-32x32.png', '/static/fav/favicon-16x16.png']

new App()
