import Page from 'classes/Page';

export default class Home extends Page {
  constructor() {
    super({
      element: '._containter',
    });
  }

  create() {
    super.create();
  }

  destroy() {
    super.destroy()

    this.link.removeEventListeners()
  }
}