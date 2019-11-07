import m from "mithril"
import http from "../../Http.js"
import { searchShows } from "../fns.js"
import { Paginator } from "../../components/Elements.js"

const SearchInput = () => {
  const paginateFn = (mdl) => searchShows(mdl, http)

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

          m(Paginator, { mdl, paginateFn })
        ])
      )
  }
}

export default SearchInput
