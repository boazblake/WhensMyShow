import m from "mithril"
import Model from "./Models.js"
import App from "./App.js"

document.addEventListener("DOMContentLoaded", () => {
  const root = document.body
  m.route(root, "/home", App(Model))
})
