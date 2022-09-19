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
        { id: 2, facilityId: 1, mineralId: 4, amount: 70 },
        { id: 3, facilityId: 2, mineralId: 3, amount: 150 },
        { id: 4, facilityId: 2, mineralId: 2, amount: 200 },
        { id: 5, facilityId: 2, mineralId: 1, amount: 300 },
        { id: 6, facilityId: 3, mineralId: 2, amount: 400 },
        { id: 7, facilityId: 3, mineralId: 3, amount: 300 },
        { id: 8, facilityId: 4, mineralId: 1, amount: 150 },
        { id: 9, facilityId: 4, mineralId: 2, amount: 200 },
        { id: 10, facilityId: 4, mineralId: 3, amount: 300 },
        { id: 11, facilityId: 4, mineralId: 4, amount: 220 },
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
            id: 1,
            colonyId: 1,
            mineralId: 1,
            amount: 1
        }
    ],
    transientState: {}
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
    return {...database.transientState}
}

export const setGovernors = (governorId) => {
    database.transientState.governorId = governorId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}
export const setColonies = (colonyId) => {
    database.transientState.colonyId = colonyId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}
export const setFacility = (facilityId) => {
    database.transientState.facilityId = facilityId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}
export const setMinerals = (mineralId) => {
    database.transientState.mineralId = mineralId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}











export const purchaseMineral = () => {

    // Broadcast custom event to entire documement so that the
    // application can re-render and update state
    document.dispatchEvent(new CustomEvent("stateChanged"))
}
