import http from "../Http.js"
import { getShowsTask, filterShowsByListType } from "./fns.js"
import { isEmpty } from "ramda"

const NoShows = m(".container.empty", [
  m("p.empty-title h5", "You have no shows yet!"),
  m("p.empty-subtitle", "Click search to find your shows.")
])

const selectedShows = () => {
  const toDetailsPage = (mdl) => (show) => {
    mdl.state.details.selected(show.objectId)
    m.route.set(`/details/${show.objectId}`)
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
            onclick: () => toDetailsPage(mdl)(show),
            src: show.image
          })
        )
      )
  }
}

const Home = () => {
  return {
    oninit: ({ attrs: { mdl } }) => getShowsTask(mdl)(http),
    view: ({ attrs: { mdl } }) =>
      m(
        "section.tiles",
        isEmpty(mdl.user.shows()) ? NoShows : m(selectedShows, { mdl })
      )
  }
}
export default Home
