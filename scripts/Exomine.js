import { Governors } from "./governors.js"
import { Facilities } from "./facilities.js"
import { Orders } from "./orders.js"
import { PurchaseCart } from "./purchaseCart.js"
import { Minerals } from "./facilityMinerals.js"




//Add imports later to add in each empty space
export const Exomine = () => {
    return `<aside id="orders">
            ${Orders()}
    </aside>
    <section id="choices-section">
        <div class="choices-div">
            ${Governors()}
        </div>
        <div class="choices-div">
            ${Facilities()}
        </div>
    </section>
    <section id="minerals-section">
        <div class="minerals_box" id="minerals-div">
        ${Minerals()}
        </div>
        <div class="purchase_box" id="spaceCart-div">
        ${PurchaseCart()}
        </div>
        </section>`
}