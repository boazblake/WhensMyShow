import m from "mithril"
import http from "../../utils/http.js"
import { formatSearchData, mergeWithCurrentList } from "../fns.js"

const SearchInput = () => {
  const searchShows = (mdl) => {
    return http
      .getTask(http.searchUrl(mdl.state.page())(mdl.state.query()))
      .map(formatSearchData)
      .map(mergeWithCurrentList(mdl.user.shows()))
      .fork(
        (err) => (mdl.error = err),
        (data) => {
          mdl.data.shows(data)
        }
      )
  }

  return {
    view: ({ attrs: { mdl } }) =>
      m(
        ".searchInput",
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
