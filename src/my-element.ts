import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { until } from 'lit/directives/until.js';
import Navigo from 'navigo';

import appStore, { BearState } from './stores/app';

import './pages/home';

@customElement('my-element')
export class MyElement extends LitElement {
  @property({ attribute: false })
  counter: number = 0;

  @property({ attribute: false })
  showCounter: boolean = false;

  @property({ attribute: false })
  appState: BearState = appStore.getInitialState();

  @property({ attribute: false })
  bears: number = this.appState.bears;

  @property()
  route: string = 'home'

  private router

  constructor() {
    super();

    this.router = new Navigo('/', { hash: true });

    this.router
      .on({
        '/': () => this.route = 'home',
        '/about': () => this.route = 'about',
      })
      .resolve();
  }

  render() {
    return html`
      <nav>
        <a href="#/" @click=${() => this.router.navigate('/')}>Home</a>
        <a href="#/about" @click=${() => this.router.navigate('/about')}>About</a>
      </nav>
      <main>
        ${until(this.routerRender(), html`<span>Loading...</span>`)}
      </main>
    `;
  }

  async routerRender() {
    // TODO: não pode ser assim, pois ele recria o component??   
    if (this.route === 'home') return html`<home-page></home-page>`;
    else {
      await import('./pages/about')
      return html`<about-page></about-page>`;
    }
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
