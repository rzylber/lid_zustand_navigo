import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import appStore, { BearState } from '../stores/app';

@customElement('about-page')
export class AboutPage extends LitElement {

    @property({ attribute: false })
    appState: BearState =  appStore.getState()

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
          Bears is ${this.bears}
        </div>
    `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'about-page': AboutPage
    }
}