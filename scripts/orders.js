import { getColonies, getMinerals, getTransientState, getPurchasedMinerals } from "./database.js"

const colonies = getColonies()
const minerals = getMinerals()

export const Orders = () => {
    const purchases = getPurchasedMinerals()
    const transientState = getTransientState()

    let html = `<h2>Colony Minerals</h2>
    <ul id="purchases">`

    if (Object.keys(transientState).includes("governorId") && transientState.governorId !== 0) { // Checks if a valid governor is selected
        html = `<h2>${colonies.find(colony => colony.id === transientState.colonyId).planetName} Minerals</h2> 
        <ul id="purchases">` // Creates the unique colony header

        html += purchases.map(purchase => {
            if (purchase.colonyId === transientState.colonyId) { // Only displays if the purchase is for that colony
                return `<li>${purchase.amount} tons of ${minerals.find(mineral => mineral.id === purchase.mineralId).name}</li>` // Will return an error until the purchase button is refactored 
            }
        }).join("")
    }
    
    return html += `</ul>`
}