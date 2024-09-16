import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import appStore, { BearState } from '../stores/app';

import litLogo from '../assets/lit.svg'
import viteLogo from '/vite.svg'

@customElement('home-page')
export class HomePage extends LitElement {
  @property({ attribute: false })
  counter: number = 0;

  @property({ attribute: false })
  showCounter: boolean = false;

  @property({ attribute: false })
  appState: BearState = appStore.getState()

  @property({ attribute: false })
  bears: number = this.appState.bears;

  constructor() {
    super();

    // we need to subscribe to appStore state changes to rerender the UI when state has been updated
    appStore.subscribe((state) => {
      // update bears locally
      this.bears = state.bears;
    });
  }

  render() {
    return html`
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src=${viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://lit.dev" target="_blank">
          <img src=${litLogo} class="logo lit" alt="Lit logo" />
        </a>
      </div>
      <slot></slot>
      <div class="card">
        <button @click=${() => this.handleAdd()} part="button">
          Bears is ${this.bears}
        </button>
        <button @click=${() => this.handleRemove()} part="button">
          Remove All Bears
        </button>
      </div>

      ${this.renderCounter()}
    `
  }

  renderCounter() {
    return html`
    <div class="card">
      Counter ${this.counter}
      <button @click=${this._onClick}>Add</button>
    </div>
    `
  }

  private handleAdd() {
    this.appState.increasePopulation();
    this.requestUpdate();
  }

  private handleRemove() {
    this.appState.removeAllBears();
    this.requestUpdate();
  }

  private _onClick() {
    this.counter++;
  }

  static styles = css`

    .logo {
      height: 6em;
      padding: 1.5em;
      will-change: filter;
      transition: filter 300ms;
    }
    .logo:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.lit:hover {
      filter: drop-shadow(0 0 2em #325cffaa);
    }

    .card {
      padding: 2em;
    }

    .read-the-docs {
      color: #888;
    }

    ::slotted(h1) {
      font-size: 3.2em;
      line-height: 1.1;
    }

    a {
      font-weight: 500;
      color: #646cff;
      text-decoration: inherit;
    }
    a:hover {
      color: #535bf2;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #fff;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'home-page': HomePage
  }
}