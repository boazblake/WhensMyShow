import m from "mithril"
import http from "../../utils/http.js"
import { over, lensProp } from "ramda"
import { getShows, mergeWithCurrentList } from "../fns.js"
import { ListSelector } from "../../components/Elements.js"

const saveDto = (d, value) => ({
  body: over(lensProp("status"), () => value, d)
})

const updateUserShows = (mdl) => (result, list) =>
  http
    .postTask(http.backendlessUrl("shows"), saveDto(result, list))
    .chain((_) => getShows(mdl, http))
    .fork(mdl.errors, (d) => {
      mdl.user.shows(d)
      mdl.data.shows(
        mergeWithCurrentList(mdl.user.shows())({ results: mdl.data.shows() })
      )
    })

const ShowListSelection = () => {
  return {
    view: ({ attrs: { mdl, result, active } }) => {
      return m(
        "ul.menu",
        mdl.user.lists().map((list, idx) => {
          return m(ListSelector, {
            list,
            active: list == result.status,
            key: idx,
            mdl,
            action: () => !active && updateUserShows(mdl)(result, list)
          })
        })
      )
    }
  }
}

const Result = () => {
  return {
    view: ({ attrs: { mdl, result } }) => {
      return m(".tileCard", [
        m("img.img-responsive.img-fit-cover", {
          class: mdl.userHasAlready(mdl)(result) && "selected",
          onclick: () => mdl.state.item.showMenu(result.id),
          src: http.imagesUrl(result.poster_path)
        }),
        mdl.state.item.showMenu() == result.id &&
          m(ShowListSelection, {
            mdl,
            result,
            active: mdl.userHasAlready(mdl)(result)
          })
      ])
    },
    onbeforeremove: () => console.log("bye")
  }
}

const SearchResults = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        "section.tiles",
        mdl.data.shows()
          ? mdl.data
              .shows()
              .map((result, idx) => m(Result, { mdl, result, key: idx }))
          : []
      )
  }
}

export default SearchResults
