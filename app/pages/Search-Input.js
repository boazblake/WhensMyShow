import m from "mithril"
import http from "../Http.js"
import { searchShows } from "./fns.js"

const SearchInput = () => {
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
            onchange: () => searchShows(mdl, http)
          })
        ])
      )
  }
}

export default SearchInput
