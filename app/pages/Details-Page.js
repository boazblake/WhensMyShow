import http from "../Http.js"
import { isNil, map, prop } from "ramda"
import { Loader, Button } from "../components/Elements"
import {
  getShowDetailsTask,
  deleteShowTask,
  onError,
  updateShowNotesTask
} from "./fns.js"

const deleteShow = (mdl) => (show) =>
  deleteShowTask(http)(mdl)(show).fork(
    onError(mdl)("details"),
    (updatedShows) => {
      m.route.set("/home")
      mdl.user.shows(updatedShows)
    }
  )

const updateShowNotes = (mdl) => (show) =>
  updateShowNotesTask(http)(mdl)(show).fork(
    onError(mdl)("details"),
    m.route.set(m.route.get())
  )

const getId = () => m.route.param().id

const formatError = (error) => JSON.parse(JSON.stringify(error))

const getShowDetails = (http) => (mdl) =>
  getShowDetailsTask(http)(getId()).fork((e) => {
    mdl.errors.details(formatError(e))
  }, mdl.data.details)

const TextBlock = () => {
  return {
    view: ({ attrs: { label, text } }) =>
      m(".formGroup", [m("strong", label), ("time", text)])
  }
}

const DetailCard = () => {
  return {
    view: ({ attrs: { show, mdl } }) => {
      console.log(show)
      return m(".menu.columns", [
        m(
          "",
          { class: "col-6" },
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
          })
        ),
        m("div.form-group.col-6", [
          m("label.form-label[for='notes']", "Notes"),
          m("textarea.form-input[id='notes'][placeholder='Notes'][rows='10']", {
            value: show.notes,
            oninput: (e) => (show.notes = e.target.value)
          }),
          m(Button, {
            classList: "",
            action: () => updateShowNotes(mdl)(show),
            label: "Save Notes"
          })
        ])
      ])
    }
  }
}

const Details = () => {
  return {
    oninit: ({ attrs: { mdl } }) => {
      console.log("details", mdl.user.shows())
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
                  onclick: () => deleteShow(mdl.data.details(), mdl)
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
