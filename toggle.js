class Toggle extends HTMLElement {

    static get observedAttributes() {
        return ['data-its-toggle-checked', 'data-its-toggle-name'];
    }

    constructor() {
        super();
        this.componentCreated = false;
        this.toggleName = 'nothing yet';
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

    }

    createElements(toggleName) {
        this.toggleName = toggleName;
        const inputElement = document.createElement('input');
        const labelElement = document.createElement('label');

        inputElement.setAttribute('type', 'checkbox');
        inputElement.setAttribute('id', `its-toggle-${toggleName}`);
        inputElement.setAttribute('name', `${toggleName}`);
        inputElement.setAttribute('data-its-toggle-input', '');

        labelElement.setAttribute('for', `its-toggle-${toggleName}`);
        labelElement.setAttribute('data-its-toggle-label', '');

        this.appendChild(inputElement);
        this.appendChild(labelElement);
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
