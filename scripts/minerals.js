import { getMinerals, getFacilityMinerals, getFacilities, getTransientState, setMinerals } from "./database.js";

const minerals = getMinerals()
const facilityMinerals = getFacilityMinerals()
const facilities = getFacilities()

export const Minerals = () => {
    const transientState = getTransientState()
    let html = "<h2>Facility Minerals</h2>"
    if (transientState.facilityId !== 0 && Object.keys(transientState).includes("facilityId")) {
        html = `<h2>${facilities.find(facility => facility.id === transientState.facilityId).name}</h2>`
        for (const currentObject of facilityMinerals) {
            if (currentObject.facilityId === transientState.facilityId) {
                const matchingMineral = minerals.find(mineral => {
                    if (mineral.id === currentObject.mineralId) {
                        return mineral
                    }
                })
                // const matchingFacility = facilities.find(facility => facility.id === currentObject.facilityId)
                html += `
            <input type="radio" name="mineral" value="${matchingMineral.id}"/>${currentObject.amount} tons of ${matchingMineral.name}`
            }
        }
    }
    return html
}

document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "mineral") {
            setMinerals(parseInt(event.target.value))

        }
    }
)
