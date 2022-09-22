import { getMinerals, getFacilityMinerals, getFacilities, getTransientState, setFacilityMinerals } from "./database.js"

const minerals = getMinerals()
const facilities = getFacilities()

export const Minerals = () => {
    const facilityMinerals = getFacilityMinerals()
    const transientState = getTransientState()
    let html = "<h2>Facility Minerals</h2>" // Default HTML

    if (transientState.facilityId !== 0 && Object.keys(transientState).includes("facilityId")) { // If facilityId is not defined, don't display anything but the original h2
        html = `<h2>${facilities.find(facility => facility.id === transientState.facilityId).name}</h2>` // Finds the matching facilityName based on the currently selected Facility

        html += facilityMinerals.map(facMin => {
            if (facMin.facilityId === transientState.facilityId && facMin.amount > 0) {
                const matchingMineral = minerals.find(mineral => mineral.id === facMin.mineralId)
                return `<input type="radio" name="mineral" value="${facMin.id}"/>${facMin.amount} tons of ${matchingMineral.name}`
            }
        }).join("") // For each value of facilityMinerals, it runs the code inside, then joins the return values to a single string
    }
    return html
}

document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "mineral") {
            setFacilityMinerals(parseInt(event.target.value)) // Sets the facilityMineral ID in transientState 
        }
        document.dispatchEvent(new CustomEvent("stateChanged"))
    }
)
