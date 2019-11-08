import m from "mithril"
import Layout from "./Layout.js"
import Home from "./pages/Home-Page.js"
import Search from "./pages/Search-Page.js"
import Details from "./pages/Details-Page.js"
import { flatten } from "ramda"

const Main = [
  {
    id: "home",
    name: "Home",
    // icon: Icons.home,
    route: "/home",
    isNav: true,
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
    isNav: true,
    group: [],
    children: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor && scrollToAnchor(mdl.state.anchor)
    },
    component: (mdl) => m(Layout, { mdl }, m(Search, { mdl }))
  },
  {
    id: "details",
    name: "Details",
    // icon: Icons.search,
    route: "/details/:id",
    isNav: false,
    group: [],
    children: [],
    onmatch: (mdl, args, path, fullroute, isAnchor) => {
      isAnchor && scrollToAnchor(mdl.state.anchor)
    },
    component: (mdl) => m(Layout, { mdl }, m(Details, { mdl }))
  }
]

const Routes = flatten([Main])
export default Routes
