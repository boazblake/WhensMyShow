import m from "mithril"
import Models from "./Models.js"
import Landing from "./pages/Landing/component"
import Home from "./pages/Home/component"
import { Button, NavBar } from "./components/Elements"

const Main = () => {
  return { view: ({ children }) => m("section.main", children) }
}

const Logout = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(Button, {
        action: () => {
          m.route.set("/landing")
          mdl.State.isLoggedIn(false)
        },
        mdl,
        label: "logout"
      })
  }
}

const Navigation = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(NavBar, { mdl }, mdl.State.isLoggedIn() && m(Logout, { mdl }))
  }
}

const Layout = () => {
  return {
    view: ({ children, attrs: { mdl } }) =>
      m(".app", [m(Navigation, { mdl }), m(Main, { mdl }, children)])
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
        mdl.State.isLoggedIn(true)
      },
      render: () => m(Layout, { mdl }, m(Home, { mdl, key: name }))
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const root = document.body
  m.route(root, "/home/anon", routes(Models))
})
