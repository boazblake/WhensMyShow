import m from "mithril"
import http from "../Http.js"
import { searchShowsTask, onError } from "./fns.js"

const SearchInput = () => {
  const searchShows = (mdl) =>
    searchShowsTask(mdl)(http).fork(onError(mdl)("search"), mdl.data.shows)

  return {
    view: ({ attrs: { mdl } }) =>
      m(
        ".searchForm",
        m(".form-group", [
          m("input.form-input", {
            type: "text",
            id: "search",
            placeholder: "search",
            value: mdl.state.query(),
            oninput: (e) => mdl.state.query(e.target.value),
            onchange: () => searchShows(mdl)
          })
        ])
      )
  }
}

export default SearchInput
