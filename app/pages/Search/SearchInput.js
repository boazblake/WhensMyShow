import m from "mithril"
import http from "../../utils/http.js"
import { searchShows } from "../fns.js"
import { Paginator } from "../../components/Elements.js"

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
          }),

          m(Paginator, { mdl })
        ])
      )
  }
}

export default SearchInput
