import { setText, show, hide } from "../../utils/show-hide.js";

hide('set-panel');

document.getElementById("menu__theme-btn").addEventListener("click", () => changeTheme());

function changeTheme() {
  document.body.classList.toggle("u-dark-theme");
  document.body.classList.toggle("u-light-theme");

  const isDarkMode = document.body.classList.contains("u-dark-theme");
  setText("menu__theme-btn", isDarkMode ? "dunkel" : "hell");
}

document.getElementById('menu__set-btn')
  .addEventListener('click', () => {
    document.getElementById('set-panel').classList.remove("u-hidden");
    document.getElementById('wl-panel').classList.add("u-hidden");
  });

document.getElementById('menu__wl-btn')
  .addEventListener('click', () => {
    document.getElementById('set-panel').classList.add("u-hidden");
    document.getElementById('wl-panel').classList.remove("u-hidden");
  });

