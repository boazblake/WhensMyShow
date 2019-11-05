import m from "mithril"
import http from "../../utils/http.js"
import { log } from "../../Models.js"
import { concat, any, map, propEq, over, lensProp } from "ramda"
import { toSearchVm } from "../fns.js"
import { ListSelector } from "../../components/Elements.js"

const loadShows = http.getTask(http.backendlessUrl).map(map(toSearchVm))

const saveDto = (d, value) => ({
  body: over(lensProp("status"), () => value, d)
})

const updateUserShows = (mdl) => (result, list) =>
  http
    .postTask(http.backendlessUrl, saveDto(result, list))
    .chain((_) => loadShows)
    .fork(mdl.errors, (d) => mdl.user.shows(concat(d, mdl.user.shows())))

const ShowListSelection = () => {
  return {
    view: ({ attrs: { mdl, result } }) =>
      m(
        "ul.menu",
        mdl.user.lists().map((list, idx) =>
          m(ListSelector, {
            list,
            active: list == result.status && "active",
            key: idx,
            mdl,
            action: () => updateUserShows(mdl)(result, list)
          })
        )
      )
  }
}

const Result = () => {
  const userHasAlready = (mdl) => (result) =>
    any(propEq("id", result.id), mdl.user.shows())

  let selected = false

  return {
    view: ({ attrs: { mdl, result } }) =>
      m(".tileCard", [
        m("img.img-responsive.img-fit-cover", {
          class: userHasAlready(mdl)(result) && "selected",
          onclick: () => {
            selected = !userHasAlready(mdl)(result)
          },
          src: http.imagesUrl(result.poster_path)
        }),
        selected &&
          m(ShowListSelection, {
            mdl,
            result,
            active: userHasAlready(mdl)(result)
          })
      ])
  }
}

const SearchResults = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        "section.tiles",
        mdl.data && mdl.data.results
          ? mdl.data.results.map((result, idx) =>
              m(Result, { mdl, result, key: idx })
            )
          : []
      )
  }
}

export default SearchResults
