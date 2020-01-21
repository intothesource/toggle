class Toggle extends HTMLElement {

    static get observedAttributes() {
        return ['data-its-toggle-checked', 'data-its-toggle-name'];
    }

    constructor() {
        super();
        this.componentCreated = false;
        this.toggleName = 'nothing yet';
        this.inputElement;
        this.labelElement;
    }

    connectedCallback() {
        console.log('CONNECTED: ', this.isConnected, this.componentCreated, this.toggleName);
        if (!this.componentCreated) {
            this.componentCreated = true;
            if (this.dataset.itsToggleName) {
                this.createElements(this.dataset.itsToggleName);
            } else {
                const randomName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                this.createElements(randomName);
            }

            this.toggleState = this.hasAttribute('data-its-toggle-checked');
        }
    }

    disconnectedCallback() {
        console.log('DISCONNECTED', this.isConnected, this.componentCreated, this.toggleName);
        if (this.inputElement) {
            this.removeChild(this.inputElement);
        }
        if (this.labelElement) {
            this.removeChild(this.labelElement);
        }
    }

    createElements(toggleName) {
        this.toggleName = toggleName;
        this.inputElement = document.createElement('input');
        this.labelElement = document.createElement('label');

        this.inputElement.setAttribute('type', 'checkbox');
        this.inputElement.setAttribute('id', `its-toggle-${toggleName}`);
        this.inputElement.setAttribute('name', `${toggleName}`);
        this.inputElement.setAttribute('data-its-toggle-input', '');

        this.labelElement.setAttribute('for', `its-toggle-${toggleName}`);
        this.labelElement.setAttribute('data-its-toggle-label', '');

        this.appendChild(this.inputElement);
        this.appendChild(this.labelElement);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.toggleState = this.hasAttribute('data-its-toggle-checked');
    }

    get toggleState() {
        return this.querySelector('input').checked;
    }

    set toggleState(bool) {
        if (this.querySelector('input')) {
            this.querySelector('input').checked = bool;
        }
    }
}

window.customElements.define('its-toggle', Toggle);
