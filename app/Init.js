import m from "mithril"
import Model from "./Models.js"
import App from "./App.js"

if ("serviceWorker" in navigator && process.env.NODE_ENV == "production") {
  console.log("testing process env", process)
  navigator.serviceWorker.register("sw.js")
}

document.addEventListener("DOMContentLoaded", () => {
  const root = document.body
  m.route(root, "/home", App(Model))
})
