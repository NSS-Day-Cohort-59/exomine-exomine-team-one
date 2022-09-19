import { getFacilities } from "./database.js";

const facilities = getFacilities()

export const Facilities = () => {
    let html = `<label for="facility-select">Facilities</label>
    <select id="facility-select">
    <option value="0">Choose a facility</option>`

    html += facilities.map(facility => {
        if (facility.active === true) {
            return `<option value="${facility.id}">${facility.name}</option>`
        }
    }).join("")

    return html += `</select>`
}