import m from "mithril"
import Model from "./model.js"
import Landing from "./pages/Landing/component"
import Home from "./pages/Home/component"

const Main = () => {
  return { view: ({ children }) => m("section.main", children) }
}

const Layout = () => {
  return {
    view: ({ children, attrs: { mdl } }) =>
      m(".app", [m(Main, { mdl }, children)])
  }
}

const routes = (mdl) => {
  return {
    "/landing": {
      render: () => m(Layout, { mdl }, m(Landing, { mdl }))
    },
    "/home/:name": {
      onmatch: (a, b, c) => {
        !mdl.User().name && m.route.set("/landing")
        return console.log(a, b, c)
      },
      render: () => m(Layout, { mdl }, m(Home, { mdl, key: name }))
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const root = document.body
  m.route(root, "/landing", routes(Model))
})
