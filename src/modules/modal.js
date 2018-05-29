export default class Modal {
    constructor (modalId, {openButtonId, closeElementsClasses}) {
        this.modalElement = document.getElementById(modalId)
        if (openButtonId) {
            this.openButton = document.getElementById(openButtonId)
        }

        this.closeElements = []
        closeElementsClasses.forEach(classes => this.closeElements.push(
            this.modalElement.getElementsByClassName(classes)[0]
        ))


        this.addDefaultEventListeners()
    }

    open () {
        this.modalElement.classList.add('visible')
    }

    close () {
        this.modalElement.classList.remove('visible')
    }

    addDefaultEventListeners () {
        if (this.openButton) {
            this.openButton.addEventListener('click', this.open.bind(this))
        }

        for (let index = 0; index < this.closeElements.length; ++index) {
            this.closeElements[index].addEventListener('click', this.close.bind(this))
        }
    }
}