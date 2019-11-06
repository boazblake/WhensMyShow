import m from "mithril"
import http from "../../utils/http.js"
import { getShows } from "../fns.js"
import { isEmpty, filter, propEq } from "ramda"

const NoShows = m(".container.empty", [
  m("p.empty-title h5", "You have no shows yet!"),
  m("p.empty-subtitle", "Click search to find your shows.")
])

const ShowSelectedShows = () => {
  const filterShowsByList = (mdl) =>
    filter(propEq("status", mdl.state.currentList()), mdl.user.shows())

  const deleteShow = (show, mdl) => {
    http
      .deleteTask(http.backendlessUrl(`shows/${show.objectId}`))
      .chain((_) => getShows(mdl, http))
      .fork(mdl.errors, (d) => mdl.user.shows(d))
  }

  let isHovered = null

  return {
    view: ({ attrs: { mdl } }) =>
      filterShowsByList(mdl).map((show, idx) =>
        m(
          ".tileCard",
          {
            key: idx,
            onmouseenter: () => (isHovered = idx),
            onmouseleave: () => (isHovered = null)
          },
          [
            isHovered == idx &&
              m(
                "b.btn btn-action btn-error btn-s s-circle deleteIcon",
                { onclick: () => deleteShow(show, mdl) },
                m("i.icon icon-cross")
              ),

            m("img.img-responsive.img-fit-cover", {
              src: http.imagesUrl(show.poster_path)
            })
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
      ),
    onbeforeremove: ({ attrs: { mdl } }) => mdl.state.currentList("Watching")
  }
}
export default Home
