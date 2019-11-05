import m from "mithril"
import SearchInput from "./pages/Search/SearchInput.js"
import HomeToolBar from "./pages/Home/HomeToolBar.js"

const NavBar = ({ attrs: { mdl } }) => {
  const isActive = (route) => route.route == m.route.get()

  return {
    view: ({ attrs: { mdl } }) => {
      return m(
        "nav",
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

const showSearchBar = (mdl) =>
  m.route.get() === "/search" && m(SearchInput, { mdl })

const showHomeBar = (mdl) =>
  m.route.get() === "/home" && m(HomeToolBar, { mdl })

const Header = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".header", [
        m("h1", mdl.state.route.name),
        m(NavBar, { mdl }),
        showHomeBar(mdl),
        showSearchBar(mdl)
      ])
  }
}

const Main = () => {
  return { view: ({ children }) => m("section.main", children) }
}

const Layout = () => {
  return {
    view: ({ children, attrs: { mdl } }) =>
      m(".app", [m(Header, { mdl }), m(Main, { mdl }, children)])
  }
}

export default Layout