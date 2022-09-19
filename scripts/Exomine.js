import { Governors } from "./governors.js"
import { Facilities } from "./facilities.js"
import { Orders } from "./orders.js"

//Add imports later to add in each empty space
export const Exomine = () => {
    return `<section id="choices-section">
        <div class="choices-div">
            ${ Governors() }
        </div>
        <div class="choices-div">
            ${ Facilities() }
        </div>
    </section>
    <aside id="orders">
            ${ Orders() }
    </aside>
    <section id="minerals-section">
        <div class="minerals_box" id="minerals-div">

        </div>
        <div class="minerals_box" id="spaceCart-div">

        </div>
    </section>`
}