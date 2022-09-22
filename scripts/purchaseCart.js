import { getTransientState, getFacilityMinerals, purchaseMineral, getMinerals, getFacilities } from "./database.js"

const facilities = getFacilities()
const minerals = getMinerals()

export const PurchaseCart = () => {
    const transientState = getTransientState()
    const facilityMinerals = getFacilityMinerals()

    let html = `<h2>Space Cart</h2>
    <ul id="minerals-in-cart">`

    if (transientState.facilityMineralIds.length > 0) {
        html += transientState.facilityMineralIds.map(Id => {
            const facMin = facilityMinerals.find(mineral => mineral.id === Id)

            return `<li>1 ton of ${minerals.find(mineral => mineral.id === facMin.mineralId).name} from ${facilities.find(facility => facility.id === facMin.facilityId).name}</li>`
        })
    }

    return html += `</ul>
    <button type="button" name="purchase-btn" />Confirm Purchase`
}

document.addEventListener(
    "click",
    event => {
        if (event.target.name === "purchase-btn") {
            purchaseMineral() // Last function in database
        }
    }
)
