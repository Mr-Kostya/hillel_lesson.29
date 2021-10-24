class TodoFormView {
    static FORM_ELEMENT_SELECTOR = '.todo_form'
    static TEXTAREA_ELEMENT_SELECTOR = '.todo_textarea'
    static SUBMIT_BUTTON_ELEMENT = '.submit'

    #$formElement;
    #options;

    constructor(options) {
        this.#$formElement = this.init();
        this.#options = options;
    }

    init() {
        return $(`
            <form class="${TodoFormView.FORM_ELEMENT_SELECTOR}">
                <textarea name="form" class="${TodoFormView.TEXTAREA_ELEMENT_SELECTOR}"></textarea>
                <button type="submit" class="${TodoFormView.SUBMIT_BUTTON_ELEMENT}">Add ToDo</button>
            </form>
        `).on('submit', (e) => this.#handleSubmit(e))
    }

    appendTo($el) {
        $el.append(this.#$formElement);
    }

    #handleSubmit(e) {
        e.preventDefault()
        const $element = $(e.target)
        const [data] = $element.serializeArray()

        if (!data) {
            alert('Field is required')
            return
        }
        
        this.#options.onCreate(data.value).then(() => {
            $element.trigger("reset")
        })
    }
}
