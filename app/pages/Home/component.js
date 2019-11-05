import m from "mithril"
import http from "../../utils/http.js"
import { toSearchVm } from "../fns.js"
import { map, isEmpty, filter, propEq } from "ramda"

const NoShows = m(".container.empty", [
  m("p.empty-title h5", "You have no shows yet!"),
  m("p.empty-subtitle", "Click search to find your shows.")
])

const ShowSelectedShows = () => {
  const filterShowsByList = (mdl) =>
    filter(propEq("status", mdl.state.currentList()), mdl.user.shows())

  return {
    view: ({ attrs: { mdl } }) =>
      filterShowsByList(mdl).map((show, idx) =>
        m("img.img-responsive.img-fit-cover", {
          key: idx,
          src: http.imagesUrl(show.poster_path)
        })
      )
  }
}

const Home = () => {
  const getUserData = ({ attrs: { mdl } }) =>
    http
      .getTask(http.backendlessUrl)
      .map(map(toSearchVm))
      .fork(mdl.errors, (d) => mdl.user.shows(d))
  return {
    oninit: getUserData,
    view: ({ attrs: { mdl } }) =>
      m(
        "section.tiles",
        isEmpty(mdl.user.shows()) ? NoShows : m(ShowSelectedShows, { mdl })
      )
  }
}
export default Home
