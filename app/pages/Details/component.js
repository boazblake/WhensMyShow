import m from "mithril"
import http from "../../utils/http.js"

let getId = () => m.route.get().split("/")[2]

const getShowDetails = (mdl, http) => http.getTask(http.detailsUrl(getId()))

const Details = () => {
  let data = {}
  return {
    oninit: ({ attrs: { mdl } }) =>
      getShowDetails(mdl, http).fork(mdl.log("e"), (d) => (data = d)),
    view: () =>
      m(".contains", [
        m("h1", "DETAILS PAGE"),
        m("code", m("pre", JSON.stringify(data, null, 4)))
      ])
  }
}

export default Details
