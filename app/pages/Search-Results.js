import m from "mithril"
import http from "../Http.js"
import {
  showListSelection,
  propIsDefined,
  updateUserShowsTask,
  addUserShowsTask
} from "./fns.js"
import { ListSelector } from "../components/Elements.js"

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
            active: list == result.listStatus,
            key: idx,
            mdl,
            action: () => {
              if (result.listStatus != list) {
                result.listStatus == undefined
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
          onclick: () => mdl.state.searchItem.showMenu(result.tvmazeId),
          src: result.image
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
