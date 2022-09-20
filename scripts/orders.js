import { getColonies, getMinerals, getTransientState, getPurchasedMinerals } from "./database.js"

const colonies = getColonies()
const minerals = getMinerals()

export const Orders = () => {
    const purchases = getPurchasedMinerals()
    const transientState = getTransientState()

    let html = `<h2>Colony Minerals</h2>
    <ul id="purchases">`

    if (Object.keys(transientState).includes("governorId") && transientState.governorId !== 0) { // Displays the orders for the selected governor's colony
        html = `<h2>${colonies.find(colony => colony.id === transientState.colonyId).planetName} Minerals</h2>
        <ul id="purchases">`

        html += purchases.map(purchase => {
            if (purchase.colonyId === transientState.colonyId) {
                return `<li>${purchase.amount} tons of ${minerals.find(mineral => mineral.id === purchase.mineralId).name}</li>`
            }
        }).join("")
    }
    
    return html += `</ul>`
}