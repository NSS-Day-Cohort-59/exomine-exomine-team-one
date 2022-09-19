import { getGovernors } from "./database.js"

const governors = getGovernors()

export const Governors = () => {
    let html = `<label for="governor-select">Governors</label>
    <select id="governors-select">
    <option value="governor-0">Choose a governor</option>`

    html += governors.map(governor => {
        if (governor.active === true) {
            return `<option value="${governor.id}">${governor.name}</option>`
        }
    }).join("")

    return html += `</select>`
}