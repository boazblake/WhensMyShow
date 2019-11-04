import m from "mithril"
import Layout from "./Layout.js"
import Home from "./pages/Home/component.js"
import Search from "./pages/Search/component.js"
import { flatten } from "ramda"

const Main = [
  {
    id: "home",
    name: "Home",
    // icon: Icons.home,
    route: "/home",
    position: ["nav"],
    group: [],
    children: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor && scrollToAnchor(mdl.state.anchor)
    },
    component: (mdl) => m(Layout, { mdl }, m(Home, { mdl }))
  },
  {
    id: "search",
    name: "Search",
    // icon: Icons.search,
    route: "/search",
    position: ["nav"],
    group: [],
    children: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor && scrollToAnchor(mdl.state.anchor)
    },
    component: (mdl) => m(Layout, { mdl }, m(Search, { mdl }))
  }
]

const Routes = flatten([Main])
export default Routes
