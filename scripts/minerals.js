import { getMinerals, getFacilityMinerals, getFacilities, getTransientState, setMinerals } from "./database.js";

const minerals = getMinerals()
const facilities = getFacilities()

export const Minerals = () => {
    const facilityMinerals = getFacilityMinerals()
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
                html += `<input type="radio" name="mineral" value="${matchingMineral.id}"/>${currentObject.amount} tons of ${matchingMineral.name}`
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

            const transientState = getTransientState()
            const facilityMinerals = getFacilityMinerals()
            const [, mineralId] = event.target.innerHTML.split(" tons of ")

            const facMin = facilityMinerals.find(mineral => {
                if (mineral.mineralId === parseInt(event.target.value) && mineral.facilityId === transientState.facilityId) {
                    return mineral
                }
            })

            const cartList = document.querySelector("#minerals-in-cart")
            cartList.innerHTML = `<li>1 ton of ${minerals.find(mineral => mineral.id === facMin.mineralId).name} from ${facilities.find(facility => facility.id === facMin.facilityId).name}</li>`
        }
    }
)
