export default class Form {
    constructor(formId, submitBtnClasses, onSubmitCallback) {
        this.form = document.getElementById(formId)
        this.submitButton = this.form.getElementsByClassName(submitBtnClasses)[0]
        this.onSubmitCallback = onSubmitCallback

        this.addDefaultEventListeners()
    }

    addDefaultEventListeners () {
        this.submitButton.addEventListener('click', this.submit.bind(this))
    }

    getData () {
        let result = {}
        let inputs = this.form.getElementsByTagName('input')
        for (let index = 0; index < inputs.length; ++index) {
            result[inputs[index].name] = inputs[index].value
        }

        return result;
    }

    validate () {
        return true;
    }

    submit () {
        if (this.validate()) {
            let data = this.getData()
            this.onSubmitCallback(data)
        }

        return false;
    }
}