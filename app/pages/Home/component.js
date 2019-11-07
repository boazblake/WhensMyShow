import m from "mithril"
import http from "../../Http.js"
import { getShows, deleteShowTask } from "../fns.js"
import { isEmpty, filter, propEq } from "ramda"

const deleteShow = (show, mdl) => deleteShowTask(http)(mdl)(show)

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
        m(
          ".tileCard",
          {
            key: idx
          },
          [
            m("img.img-responsive.img-fit-cover", {
              onclick: () => m.route.set(`/details/${show.id}`),
              src: http.imagesUrl(show.poster_path)
            }),

            m(
              "b.btn btn-action btn-error btn-s s-circle deleteIcon ",
              {
                onclick: () => deleteShow(show, mdl)
              },
              m("i.icon icon-cross")
            )
          ]
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
