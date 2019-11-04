import m from "mithril"
import http from "../../utils/http.js"
import { log } from "../../Models.js"
import { concat, any, map, propEq, over, lensProp } from "ramda"
import { toSearchVm } from "../fns.js"

const loadShows = http.getTask(http.backendlessUrl).map(map(toSearchVm))

const saveDto = (d) => ({
  body: over(lensProp("status"), () => "selected", d)
})

const Result = () => {
  const updateUserShows = (mdl) => (result) =>
    http
      .postTask(http.backendlessUrl, saveDto(result))
      .chain((_) => loadShows)
      .fork(mdl.errors, (d) => mdl.user.shows(concat(d, mdl.user.shows())))

  const isSelected = (mdl) => (result) =>
    any(propEq("id", result.id), mdl.user.shows())

  return {
    view: ({ attrs: { mdl, result } }) =>
      m("img.img-responsive.img-fit-cover", {
        class: isSelected(mdl)(result) && "selected",
        onclick: () => updateUserShows(mdl)(result),
        src: http.imagesUrl(result.poster_path)
      })
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
