import m from "mithril"
import http from "../../Http.js"
import { isEmpty, map, prop } from "ramda"
import { Loader } from "../../components/Elements"

let getId = () => m.route.get().split("/")[2]

const getShowDetails = (mdl, http) => http.getTask(http.detailsUrl(getId()))

const TextBlock = () => {
  return {
    view: ({ attrs: { label, text } }) =>
      m(".formGroup", [m("strong", label), ("time", text)])
  }
}

const DetailCard = () => {
  return {
    view: ({ attrs: { show } }) =>
      m(".menu", [
        m("img.img-responsive.img-fit-cover", {
          src: http.imagesUrl(show.poster_path)
        }),
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
        // m("code", m("pre", JSON.stringify(show, null, 4)))
      ])
  }
}

const Details = () => {
  let data = {}
  return {
    oninit: ({ attrs: { mdl } }) =>
      getShowDetails(mdl, http).fork(mdl.log("e"), (d) => (data = d)),
    view: () =>
      m(".container", [
        isEmpty(data) ? m(Loader) : m(DetailCard, { show: data })
      ])
  }
}

export default Details
