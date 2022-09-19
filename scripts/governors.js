import { getGovernors, getTransientState, setGovernors } from "./database.js"

const governors = getGovernors()

export const Governors = () => {
    const currentId = getTransientState().governorId

    let html = `<label for="governors-select">Governors</label>
    <select id="governors-select">
    <option value="0">Choose a Governor</option>`

    html += governors.map(governor => {
        if (governor.active === true) {
            if (governor.id === currentId) { // Keeps the current selection displayed when rendering HTML
                return `<option value="${governor.id}" selected>${governor.name}</option>`
            } else {
                return `<option value="${governor.id}">${governor.name}</option>`
            }
        }
    }).join("")

    return html += `</select>`
}

document.addEventListener(
    "change",
    event => {
        if (event.target.id === "governors-select") {
            setGovernors(parseInt(event.target.value))
        }
    }
)