const database = {
    governors: [
        { id: 1, name: "Zavala", active: true, colonyId: 4 },
        { id: 2, name: "Ikora Rey", active: true, colonyId: 6 },
        { id: 3, name: "Xur", active: true, colonyId: 7 },
        { id: 4, name: "Shaxx", active: true, colonyId: 2 },
        { id: 5, name: "Mara Sov", active: false, colonyId: 1 },
        { id: 6, name: "Osiris", active: true, colonyId: 3 },
        { id: 7, name: "Dominus Ghaul", active: false, colonyId: 5 },
        { id: 8, name: "Eris Morn", active: false, colonyId: 8 },
        { id: 9, name: "Savathun", active: true, colonyId: 10 },
        { id: 10, name: "Saint-14", active: true, colonyId: 9 }
    ],
    colonies: [
        { id: 1, planetName: "Mercury" },
        { id: 2, planetName: "Venus" },
        { id: 3, planetName: "Mars" },
        { id: 4, planetName: "Earth" },
        { id: 5, planetName: "Europa" },
        { id: 6, planetName: "Jupiter" },
        { id: 7, planetName: "Neptune" },
        { id: 8, planetName: "Nessus" },
        { id: 9, planetName: "Saturn" },
        { id: 10, planetName: "Pluto" }
    ],
    facilities: [
        { id: 1, name: 'Cabal Mines', active: true },
        { id: 2, name: 'Kessel Mines', active: true },
        { id: 3, name: 'Minemoon', active: false },
        { id: 4, name: 'Concordian Mines', active: true },
        { id: 5, name: 'Smokey Mines', active: true },
        { id: 6, name: 'Steam Mines', active: false },
        { id: 7, name: 'Rushing mines', active: true },
        { id: 8, name: 'Rocky Mines', active: true }
    ],
    minerals: [
        { id: 1, name: 'Relic Iron' },
        { id: 2, name: 'Hadronic Essence' },
        { id: 3, name: 'Spirit Bloom' },
        { id: 4, name: 'Magnesium' }
    ],
    facilityMinerals: [
        { id: 1, facilityId: 1, mineralId: 1, amount: 600 },
        { id: 2, facilityId: 1, mineralId: 4, amount: 2 },
        { id: 3, facilityId: 2, mineralId: 3, amount: 150 },
        { id: 4, facilityId: 2, mineralId: 2, amount: 200 },
        { id: 5, facilityId: 2, mineralId: 1, amount: 300 },
        { id: 6, facilityId: 3, mineralId: 2, amount: 400 },
        { id: 7, facilityId: 3, mineralId: 3, amount: 300 },
        { id: 8, facilityId: 4, mineralId: 1, amount: 150 },
        { id: 9, facilityId: 4, mineralId: 2, amount: 200 },
        { id: 10, facilityId: 4, mineralId: 3, amount: 300 },
        { id: 12, facilityId: 5, mineralId: 1, amount: 550 },
        { id: 13, facilityId: 5, mineralId: 4, amount: 800 },
        { id: 14, facilityId: 6, mineralId: 2, amount: 200 },
        { id: 15, facilityId: 7, mineralId: 2, amount: 50 },
        { id: 16, facilityId: 7, mineralId: 3, amount: 200 },
        { id: 17, facilityId: 7, mineralId: 4, amount: 150 },
        { id: 18, facilityId: 8, mineralId: 2, amount: 1000 },
        { id: 19, facilityId: 8, mineralId: 1, amount: 1000 },
    ],
    purchasedMinerals: [
        {
            id: 0,
            colonyId: 0,
            mineralId: 0,
            amount: 0
        }
    ],
    transientState: {
        facilityMineralIds: []
    }
}

export const getGovernors = () => {
    return database.governors.map(governor => ({ ...governor }))
}
export const getColonies = () => {
    return database.colonies.map(colony => ({ ...colony }))
}
export const getFacilities = () => {
    return database.facilities.map(f => ({ ...f }))
}
export const getMinerals = () => {
    return database.minerals.map(min => ({ ...min }))
}
export const getFacilityMinerals = () => {
    return database.facilityMinerals.map(fm => ({ ...fm }))
}
export const getTransientState = () => {
    return { ...database.transientState }
}
export const getPurchasedMinerals = () => {
    return database.purchasedMinerals.map(purchase => ({ ...purchase }))
}

export const setGovernors = (governorId) => {
    database.transientState.governorId = governorId
    database.transientState.facilityMineralIds = []
}
export const setColonies = (colonyId) => {
    database.transientState.colonyId = colonyId
    database.transientState.facilityMineralIds = []
}
export const setFacility = (facilityId) => {
    database.transientState.facilityId = facilityId
}
export const setFacilityMinerals = (facilityMineralId) => {
    const currentMineralIds = new Set() // Creates a new Set that will store the facility Ids from each facilityMineralId selected

    database.transientState.facilityMineralIds.forEach(mineralId => { // Fills the set with each currently selected facilityMineralId's facilityId 
        currentMineralIds.add(database.facilityMinerals.find(mineral => mineral.id === mineralId).facilityId)
    })

    if (!currentMineralIds.has(database.facilityMinerals.find(mineral => mineral.id === facilityMineralId).facilityId)) { // If the set doesn't include the facilityId from our new mineral, 
        database.transientState.facilityMineralIds.push(facilityMineralId)                                                     // it will add it to the database.
    } else { // Otherwise, it will replace it.
        const index = [...currentMineralIds].indexOf(database.facilityMinerals.find(mineral => mineral.id === facilityMineralId).facilityId) // Converts the set to an array, then finds the index
        database.transientState.facilityMineralIds[index] = facilityMineralId // Replaces the value of that facility's mineral in the database, at the index we defined
    }
}

export const purchaseMineral = () => {
    if (database.transientState.facilityMineralIds.length > 0) { // Only runs if a mineral is chosen
        // Create a const that is a spread copy of transientState
        let newOrder = { ...database.transientState }

        //! Iterate through the array to call the code on each ID 
        for (const ID of database.transientState.facilityMineralIds) {

            // Create const for matching facilityMineral, so we can access all the data we need
            const facMin = database.facilityMinerals.find(facMin => facMin.id === ID)

            // Finds an existing order for the specified colony & mineral
            const matchingPurchase = database.purchasedMinerals.find(purchase => {
                if (purchase.mineralId === facMin.mineralId && purchase.colonyId === newOrder.colonyId) {
                    return purchase
                }
            })

            if (!matchingPurchase) { // Only runs if there is not an existing order
                //Create a unique ID for each *NEW* order
                const newId = database.purchasedMinerals.at(-1).id + 1
                newOrder.id = newId

                // Add the mineral ID and amount (Always 1 for a new order)
                newOrder.mineralId = facMin.mineralId
                newOrder.amount = 1

                // Subtract 1 from the factoryMineral
                facMin.amount--

                // Delete the extra keys
                delete newOrder.facilityId
                delete newOrder.facilityMineralIds
                delete newOrder.governorId

                // Push the order to the database
                database.purchasedMinerals.push(newOrder)
            } else {
                // Add 1 to the order. Subtract one from the factoryMineral
                matchingPurchase.amount++
                facMin.amount--
            }

            // Remove the facilityMineralId from transientState
            database.transientState.facilityMineralIds = []

            // Reset newOrder for the next order
            newOrder = { ...database.transientState }
        }
        
        // Dispatch Custom Event to render new HTML
        document.dispatchEvent(new CustomEvent("stateChanged"))
    }
}