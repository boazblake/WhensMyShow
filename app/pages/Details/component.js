import m from "mithril"
import http from "../../utils/http.js"
import { isEmpty } from "ramda"
import { Loader } from "../../components/Elements"

let getId = () => m.route.get().split("/")[2]

const getShowDetails = (mdl, http) => http.getTask(http.detailsUrl(getId()))

const Details = () => {
  let data = {}
  return {
    oninit: ({ attrs: { mdl } }) =>
      getShowDetails(mdl, http).fork(mdl.log("e"), (d) => (data = d)),
    view: () =>
      m(".container", [
        m("h1", "DETAILS PAGE"),
        isEmpty(data)
          ? m(Loader)
          : [
              m("img.img-responsive.img-fit-cover", {
                src: http.imagesUrl(data.poster_path)
              }),
              m("code", "first_air_date: ", data.first_air_date),
              m("code", "last_air_date: ", data.last_air_date),
              m("code", "status: ", data.status),
              m(
                "code",
                m(
                  "pre",
                  "last episode",
                  JSON.stringify(data.last_episode_to_air, null, 4)
                )
              ),
              m(
                "code",
                m(
                  "pre",
                  "next episode",
                  JSON.stringify(data.next_episode_to_air, null, 4)
                )
              ),
              m("code", "network name: ", data.networks.name),
              m("code", "number_of_episodes: ", data.number_of_episodes),
              m("code", "number_of_seasons: ", data.number_of_seasons)
              // m("code", m("pre", JSON.stringify(data, null, 4)))
            ]
      ])
  }
}

export default Details
