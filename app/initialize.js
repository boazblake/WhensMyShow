import m from "mithril"
import Model from "./Models.js"
import routes from "./App.js"

document.addEventListener("DOMContentLoaded", () => {
  const root = document.body
  m.route(root, "/home", routes(Model))
})
