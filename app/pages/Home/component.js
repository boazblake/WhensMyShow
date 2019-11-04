import m from "mithril"
import http from "../../utils/http.js"
import { toSearchVm } from "../fns.js"
import { map, isEmpty } from "ramda"
import { EmptyState } from "../../components/Elements.js"

const Home = () => {
  const getUserData = ({ attrs: { mdl } }) =>
    http
      .getTask(http.backendlessUrl)
      .map(map(toSearchVm))
      .fork(mdl.errors, (d) => mdl.user.shows(d))
  return {
    oninit: getUserData,
    view: ({ attrs: { mdl } }) =>
      m(
        "section.tiles",
        isEmpty(mdl.user.shows())
          ? m(".container.empty", [
              m("p.empty-title h5", "You have no shows yet!"),
              m("p.empty-subtitle", "Click search to find your shows.")
            ])
          : mdl.user.shows().map((show, idx) =>
              m("img.img-responsive.img-fit-cover", {
                key: idx,
                src: http.imagesUrl(show.poster_path)
              })
            )
      )
  }
}
export default Home
