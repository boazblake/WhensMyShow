import m from "mithril"
import http from "../../utils/http.js"
import { any, map, propEq, over, lensProp } from "ramda"
import { toSearchVm, mergeWithCurrentList } from "../fns.js"
import { ListSelector } from "../../components/Elements.js"

const loadShows = http.getTask(http.backendlessUrl).map(map(toSearchVm))

const saveDto = (d, value) => ({
  body: over(lensProp("status"), () => value, d)
})

const updateUserShows = (mdl) => (result, list) =>
  http
    .postTask(http.backendlessUrl, saveDto(result, list))
    .chain((_) => loadShows)
    .fork(mdl.errors, (d) => {
      mdl.user.shows(d)
      mdl.data(mergeWithCurrentList(mdl.user.shows())({ results: mdl.data() }))
    })

const ShowListSelection = () => {
  return {
    view: ({ attrs: { mdl, result, active } }) => {
      console.log("result.status", result.status)
      return m(
        "ul.menu",
        mdl.user.lists().map((list, idx) => {
          console.log(
            "result in show list sel",
            result,
            list,
            list == result.status,
            active
          )
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

const Result = ({ attrs: { mdl, result } }) => {
  const userHasAlready = (mdl) => (result) =>
    any(propEq("id", result.id), mdl.user.shows())

  let selected = userHasAlready(mdl)(result)

  return {
    view: ({ attrs: { mdl, result } }) => {
      return m(".tileCard", [
        m("img.img-responsive.img-fit-cover", {
          class: userHasAlready(mdl)(result) && "selected",
          onclick: () => {
            selected = !selected
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
}

const SearchResults = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        "section.tiles",
        mdl.data()
          ? mdl
              .data()
              .map((result, idx) => m(Result, { mdl, result, key: idx }))
          : []
      )
  }
}

export default SearchResults
