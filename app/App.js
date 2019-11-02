import m from "mithril"
import Home from "./pages/Home/component.js"

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
    "/home": {
      onmatch: (a, b, c) => {},
      render: () => m(Layout, { mdl }, m(Home, { mdl }))
    }
  }
}

export default routes
