/**
 * Get the value of a form input.
 * @param {EventTarget} formTarget The target form of the form-submission event.
 * @param {String} inputName Name of input as in form.
 * @returns Value of the form input.
 */
export default function getInputValue(formTarget, inputName) {
    return formTarget[inputName].value;
}