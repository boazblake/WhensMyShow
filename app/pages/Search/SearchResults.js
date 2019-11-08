import m from "mithril"
import http from "../../Http.js"
import {
  showListSelection,
  propIsDefined,
  updateUserShowsTask,
  addUserShowsTask
} from "../fns.js"
import { ListSelector } from "../../components/Elements.js"

const updateUserShows = (mdl) => (result, list) =>
  updateUserShowsTask(http)(mdl)(result)(list)

const addUserShows = (mdl) => (result, list) =>
  addUserShowsTask(http)(mdl)(result)(list)

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
    view: ({ attrs: { mdl, result } }) =>
      m(".menu", [
        m("img.img-responsive.img-fit-cover", {
          class: propIsDefined("objectId")(result) && "selected",
          onclick: () => mdl.state.searchItem.showMenu(result.id),
          src: http.imagesUrl(result.poster_path)
        }),

        showListSelection(mdl)(result) &&
          m(ListSelection, {
            mdl,
            result
          })
      ])
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
