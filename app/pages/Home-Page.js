import m from "mithril"
import http from "../Http.js"
import { getShows, filterShowsByListType } from "./fns.js"
import { isEmpty } from "ramda"

const NoShows = m(".container.empty", [
  m("p.empty-title h5", "You have no shows yet!"),
  m("p.empty-subtitle", "Click search to find your shows.")
])

const ShowSelectedShows = () => {
  const navigateToRoute = (mdl) => (show) => {
    mdl.state.details.selected(show.objectId)
    m.route.set(`/details/${show.id}`)
  }

  return {
    view: ({ attrs: { mdl } }) =>
      filterShowsByListType(mdl).map((show, idx) =>
        m(
          ".tileCard",
          {
            key: idx
          },
          m("img.img-responsive.img-fit-cover", {
            onclick: () => navigateToRoute(mdl)(show),
            src: http.imagesUrl(show.poster_path)
          })
        )
      )
  }
}

const Home = () => {
  return {
    oninit: ({ attrs: { mdl } }) =>
      getShows(mdl, http).fork(mdl.errors, (d) => mdl.user.shows(d)),
    view: ({ attrs: { mdl } }) =>
      m(
        "section.tiles",
        isEmpty(mdl.user.shows()) ? NoShows : m(ShowSelectedShows, { mdl })
      )
  }
}
export default Home
