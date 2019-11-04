import m from "mithril"
import SearchInput from "./pages/Search/SearchInput.js"

const showSearch = (mdl) =>
  m.route.get() == "/search" && m(SearchInput, { mdl })

const Header = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".header", [m("h1", mdl.state.route.name), showSearch(mdl)])
  }
}

const Main = () => {
  return { view: ({ children }) => m("section.main", children) }
}

const NavBar = ({ attrs: { mdl } }) => {
  const isActive = (route) => route.route == m.route.get()

  return {
    view: ({ attrs: { mdl } }) => {
      return m(
        "navbar.container",
        m(
          "ul.tab tab-block",
          mdl.Routes.map((route, idx) =>
            m(
              "li.tab-item",
              { key: idx, class: isActive(route) && "active" },
              m(
                "li",
                { class: "tab-item" },
                m("a", { href: `#!${route.route}` }, route.name)
              )
            )
          )
        )
      )
    }
  }
}

const Layout = () => {
  return {
    view: ({ children, attrs: { mdl } }) =>
      m(".app", [
        m(Header, { mdl }),
        m(Main, { mdl }, children),
        m(NavBar, { mdl })
      ])
  }
}

export default Layout
