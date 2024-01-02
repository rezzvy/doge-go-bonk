import Model from "./mvc/model.js";
import View from "./mvc/view.js";
import Controller from "./mvc/controller.js";

const model = new Model();
const view = new View();
const controller = new Controller(model, view);

function init() {
  controller.init();
  fitScreen()
}

function fitScreen() {
  document.querySelector(".app-container").style.setProperty("--screen-size", window.innerHeight + "px");
}

document.addEventListener("DOMContentLoaded", init);
window.addEventListener('resize', fitScreen)
