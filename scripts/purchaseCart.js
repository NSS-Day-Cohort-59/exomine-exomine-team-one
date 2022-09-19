import { getTransientState } from "./database.js"

export const PurchaseCart = () => {
    const transientState = getTransientState()

    let html = `<h2>Space Cart</h2>
    <ul id="minerals-in-cart">
    </ul>`

    return html += `<button type="button" name="purchase-btn" />Confirm Purchase`
}

document.addEventListener(
    "click",
    event => {
        if (event.target.name === "purchase-btn") {
            // Add code later to save purchase
        }
    }
)
