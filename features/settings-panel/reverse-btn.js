import store from "../../app/store.js";
import { setText } from "../../utils/show-hide.js";

document.getElementById("set-panel__reverse-btn").addEventListener("click", () => reverseBtn());

let reverseBtnState = 0;

function reverseBtn() {
  store.state.reverseBtnState = reverseBtnState === 0 ? 1 : 0;
  console.log(store.state.reverseBtnState)

  setText(
    "set-panel__reverse-btn",
    reverseBtnState === 1 ? "Deutsch → Fremdsprache" : "Fremdsprache → Deutsch"
  );
}
