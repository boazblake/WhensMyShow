import http from "../Http.js"
import { isNil } from "ramda"
import { Loader, Button, ListSelector } from "../components/Elements"
import {
  getShowDetailsTask,
  deleteShowTask,
  updateShowDetailsTask,
  onError,
  formatError,
  updateShowNotesTask
} from "./fns.js"

const updateShow = (mdl, update) =>
  updateShowDetailsTask(http)(mdl)(update).fork(
    onError(mdl)("details"),
    mdl.data.details
  )

const ListSelection = () => {
  let showOpts = true
  return {
    view: ({ attrs: { mdl, list } }) =>
      m(".dropdown", [
        m(
          "a.btn btn-link dropdown-toggle",
          { onclick: () => (showOpts = true), tabindex: "0" },
          [list, m("i.icon icon-caret")]
        ),
        showOpts &&
          m(
            "ul.menu",
            mdl.user.lists().map((list, idx) =>
              m(ListSelector, {
                list,
                action: () => {
                  updateShow(mdl, { listStatus: list })
                  showOpts = false
                },
                key: idx,
                mdl
              })
            )
          )
      ])
  }
}

const deleteShow = (mdl) => (show) =>
  deleteShowTask(http)(show.objectId).fork(
    onError(mdl)("details"),
    (updatedShows) => {
      m.route.set("/home")
      mdl.user.shows(updatedShows)
    }
  )

const getId = () => m.route.param().id

const getShowDetails = (http) => (mdl) =>
  getShowDetailsTask(mdl)(http)(getId()).fork(
    (e) => mdl.errors.details(formatError(e)),
    mdl.data.details
  )

const TextBlock = () => {
  return {
    view: ({ attrs: { label, text } }) =>
      m(".formGroup", [m("strong", label), ("time", text)])
  }
}

const DetailCard = () => {
  return {
    view: ({ attrs: { show, mdl } }) => {
      // console.log("show", show)
      return m(".menu.columns", [
        m("div.form-group.col-6", [
          m(TextBlock, {
            label: show.name
          }),
          m("img.img-responsive.img-fit-cover", {
            src: show.image
          }),
          m(
            "b.btn btn-action btn-error btn-s s-circle deleteIcon ",
            {
              onclick: () => deleteShow(mdl)(show)
            },
            m("i.icon icon-cross")
          ),
          show.network &&
            m(TextBlock, {
              label: "network: ",
              text: show.network
            }),
          show.webChannel &&
            m(TextBlock, {
              label: "webChannel ",
              text: show.webChannel
            }),
          m(TextBlock, {
            label: "Status:  ",
            text: show.status
          }),
          m(TextBlock, {
            label: "Genre:  ",
            text: show.genre
          })
        ]),
        m("div.form-group.col-6", [
          m(ListSelection, { mdl, list: show.listStatus }),

          m("label.form-label[for='notes']", "Notes"),
          m("textarea.form-input[id='notes'][placeholder='Notes'][rows='10']", {
            value: show.notes,
            oninput: (e) => (show.notes = e.target.value)
          }),
          m(Button, {
            classList: "",
            action: () => updateShow(mdl, { notes: show.notes }),
            label: "Save Notes"
          })
        ]),
        m(TextBlock, {
          label: "Links:  ",
          text: m("pre", JSON.stringify(show.links, null, 4))
        })
      ])
    }
  }
}

const Details = () => {
  return {
    oninit: ({ attrs: { mdl } }) => {
      getShowDetails(http)(mdl)
    },
    view: ({ attrs: { mdl } }) => {
      return m(".container", [
        isNil(mdl.data.details())
          ? m(Loader)
          : m(DetailCard, { mdl, show: mdl.data.details() }),
        mdl.errors.details() !== null &&
          m(".toast.toast-error", [
            m("p", [
              mdl.errors.details().response.status_message,
              m(
                "b.btn btn-action btn-error btn-s s-circle deleteIcon ",
                {
                  onclick: () => deleteShow(mdl)(mdl.data.details())
                },
                m("i.icon icon-cross")
              )
            ]),
            m("p", "Choose a different show")
          ])
      ])
    },
    onbeforeremove: ({ attrs: { mdl } }) => {
      mdl.errors.details(null)
      mdl.data.details(null)
      mdl.state.details.selected(null)
    }
  }
}

export default Details
