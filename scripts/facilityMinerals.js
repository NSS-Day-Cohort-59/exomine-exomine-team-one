import { getMinerals, getFacilityMinerals, getFacilities, getTransientState, setMinerals } from "./database.js";

const minerals = getMinerals()
const facilities = getFacilities()

export const Minerals = () => {
    const facilityMinerals = getFacilityMinerals()
    const transientState = getTransientState()
    let html = "<h2>Facility Minerals</h2>" // Default HTML

    if (transientState.facilityId !== 0 && Object.keys(transientState).includes("facilityId")) { // If facilityId is not defined, don't display anything but the original h2
        html = `<h2>${facilities.find(facility => facility.id === transientState.facilityId).name}</h2>` // Finds the matching facilityName based on the currently selected Facility

        html += facilityMinerals.map(facMin => {
            if (facMin.facilityId === transientState.facilityId) {
                const matchingMineral = minerals.find(mineral => mineral.id === facMin.mineralId)
            }
        }).join("") // For each value of facilityMinerals, it runs the code inside, then joins the return values to a single string

    }
    return html
}

document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "mineral") {
            setMinerals(parseInt(event.target.value))

            const transientState = getTransientState()
            const facilityMinerals = getFacilityMinerals() // Gets the list of facility Minerals

            const facMin = facilityMinerals.find(mineral => mineral.id === parseInt(event.target.value)) // Finds the matching Facility Mineral

            const cartList = document.querySelector("#minerals-in-cart") // Defines the HTML element we are changing.
            cartList.innerHTML = `<li>1 ton of ${minerals.find(mineral => mineral.id === facMin.mineralId).name} from ${facilities.find(facility => facility.id === facMin.facilityId).name}</li>`
        }
    }
)
