import m from "mithril"
import http from "../../Http.js"
import { over, lensProp, anyPass, has, propEq } from "ramda"
import { getShows, updateShowStatus, filterIncorrectAttrTypes } from "../fns.js"
import { ListSelector } from "../../components/Elements.js"

const itemSelected = (mdl) => (result) => mdl.state.item.showMenu() == result.id
const propIsDefined = (attr) => (result) => result[attr] !== undefined

const showListSelection = (mdl) =>
  anyPass([itemSelected(mdl), propIsDefined("objectId")])

const saveDto = (d, value) => ({
  body: over(lensProp("status"), () => value, d)
})

const updateUserShows = (mdl) => (result, list) =>
  http
    .putTask(
      http.backendlessUrl(`shows\\${result.objectId}`),
      saveDto(result, list)
    )
    .chain((_) => getShows(mdl, http))
    .fork(mdl.errors, (d) => {
      mdl.user.shows(d)
      mdl.data.shows(
        updateShowStatus(mdl.user.shows())({
          results: mdl.data.shows()
        }).results
      )
    })

const addUserShows = (mdl) => (result, list) =>
  http
    .postTask(http.backendlessUrl("shows"), saveDto(result, list))
    .chain((_) => getShows(mdl, http))
    .fork(mdl.errors, (d) => {
      mdl.user.shows(d)
      mdl.data.shows(
        updateShowStatus(mdl.user.shows())({
          results: mdl.data.shows()
        }).results
      )
    })

const ListSelection = () => {
  return {
    view: ({ attrs: { mdl, result } }) => {
      return m(
        "ul.menu",
        mdl.user.lists().map((list, idx) =>
          m(ListSelector, {
            list,
            active: list == result.status,
            key: idx,
            mdl,
            action: () => {
              if (result.status != list) {
                result.status == undefined
                  ? addUserShows(mdl)(result, list)
                  : updateUserShows(mdl)(result, list)
              }
            }
          })
        )
      )
    }
  }
}

const Result = () => {
  return {
    view: ({ attrs: { mdl, result } }) => {
      // console.log(result.objectId)
      return m(".menu", [
        m("img.img-responsive.img-fit-cover", {
          class: mdl.userHasAlready(mdl)(result) && "selected",
          onclick: () => mdl.state.item.showMenu(result.id),
          src: http.imagesUrl(result.poster_path)
        }),

        showListSelection(mdl)(result) &&
          m(ListSelection, {
            mdl,
            result
          })
      ])
    },
    onbeforeremove: ({ attrs: { mdl, result } }) =>
      console.log(result.id, "removed")
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
