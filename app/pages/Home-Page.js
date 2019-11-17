import http from "../Http.js"
import {
  getShows,
  filterShowsByListType,
  deleteShowTask,
  onError
} from "./fns.js"
import { isEmpty } from "ramda"

const NoShows = m(".container.empty", [
  m("p.empty-title h5", "You have no shows yet!"),
  m("p.empty-subtitle", "Click search to find your shows.")
])

const getShowsTask = (mdl) => (http) =>
  getShows(http).fork(mdl.errors, mdl.user.shows)

const selectedShows = () => {
  const toDetailsPage = (mdl) => (show) => {
    mdl.state.details.selected(show.objectId)
    m.route.set(`/details/${show.objectId}`)
  }

  const deleteShow = (mdl) => (show) =>
    deleteShowTask(http)(show.objectId).fork(
      onError(mdl)("details"),
      (updatedShows) => {
        m.route.set("/home")
        mdl.user.shows(updatedShows)
      }
    )

  return {
    view: ({ attrs: { mdl } }) =>
      filterShowsByListType(mdl).map((show, idx) =>
        m(
          "li.menu",
          {
            key: idx
          },
          [
            m(
              "b.btn btn-action btn-error btn-s deleteIcon ",
              {
                onclick: () => deleteShow(mdl)(show)
              },
              m("i.icon icon-cross")
            ),
            m("img.img-responsive.img-fit-cover", {
              onclick: () => toDetailsPage(mdl)(show),
              src: show.image
            })
          ]
        )
      )
  }
}

const Home = () => {
  return {
    oninit: ({ attrs: { mdl } }) => getShowsTask(mdl)(http),
    view: ({ attrs: { mdl } }) =>
      m(
        "ul.tiles",
        isEmpty(mdl.user.shows()) ? NoShows : m(selectedShows, { mdl })
      )
  }
}
export default Home
