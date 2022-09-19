import { Exomine } from "./Exomine.js"

const renderHTML = () => {
    const container = document.getElementById("container")
    container.innerHTML = Exomine()
}

renderHTML()

document.addEventListener(
    "stateChanged",
    event => {
        console.log(`State changed. Refreshing all HTML...`)
        renderHTML()
    }
)