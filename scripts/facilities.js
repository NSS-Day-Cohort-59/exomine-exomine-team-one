import { getFacilities, getTransientState, setFacility } from "./database.js";

const facilities = getFacilities()

const governorChosen = () => {
    const transientState = getTransientState()
    if (!Object.keys(transientState).includes("governorId") || transientState.governorId === 0) {
        return `disabled`
    } else {
        return ``
    }
}

export const Facilities = () => {
    const currentId = getTransientState().facilityId

    let html = `<label for="facility-select">Facilities</label>
    <select id="facility-select" ${governorChosen()}>
    <option value="0">Choose a Facility</option>`

    html += facilities.map(facility => {
        if (facility.active === true) {
            if (facility.id === currentId) { // Keeps the current selection displayed when rendering HTML
                return `<option value="${facility.id}" selected>${facility.name}</option>`
            } else {
                return `<option value="${facility.id}">${facility.name}</option>`
            }
        }
    }).join("")

    return html += `</select>`
}

document.addEventListener(
    "change",
    event => {
        if (event.target.id === "facility-select") {
            setFacility(parseInt(event.target.value))
            document.dispatchEvent(new CustomEvent("stateChanged"))
        }
    }
)