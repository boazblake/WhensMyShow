import m from "mithril"
import http from "../Http.js"
import { isNil, map, prop } from "ramda"
import { Loader } from "../components/Elements"
import { getShowDetailsTask, deleteShowTask, onError } from "./fns.js"

const deleteShow = (show, mdl) =>
  deleteShowTask(http)(mdl)(show).fork(onError(mdl)("user"), (updatedShows) => {
    m.route.set("/home")
    mdl.user.shows(updatedShows)
  })

const getId = () => m.route.get().split("/")[2]

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
    view: ({ attrs: { show, mdl } }) =>
      m(".menu", [
        m("img.img-responsive.img-fit-cover", {
          src: http.imagesUrl(show.poster_path)
        }),
        m(
          "b.btn btn-action btn-error btn-s s-circle deleteIcon ",
          {
            onclick: () => deleteShow(show, mdl)
          },
          m("i.icon icon-cross")
        ),
        m(TextBlock, {
          label: "first_air_date ",
          text: show.first_air_date
        }),
        m(TextBlock, {
          label: "last_air_date ",
          text: show.last_air_date
        }),
        m(TextBlock, {
          label: "Status:  ",
          text: show.status
        }),
        m(TextBlock, {
          label: "Network:  ",
          text: map(prop("name"), show.networks).join()
        }),
        show.next_episode_to_air &&
          m(TextBlock, {
            label: "Next Air Date:  ",
            text: show.next_episode_to_air.air_date
          }),
        m(TextBlock, {
          label: "number_of_episodes:  ",
          text: show.number_of_episodes
        }),
        m(TextBlock, {
          label: "number_of_seasons:  ",
          text: show.number_of_seasons
        })
      ])
  }
}

const Details = () => {
  return {
    oninit: ({ attrs: { mdl } }) => getShowDetails(http)(mdl),
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
