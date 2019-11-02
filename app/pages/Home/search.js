import m from "mithril"
import { searchUrl } from "../../Models.js"
import { formatSearchData } from "./fns.js"

const Search = () => {
  const searchShows = (mdl) => {
    m.request({ url: searchUrl(mdl.state.page)(mdl.state.query) }).then(
      (data) => {
        mdl.data = formatSearchData(data)
      },
      (err) => (mdl.error = err)
    )
  }

  return {
    view: ({ attrs: { mdl } }) =>
      m(
        ".search",
        m(".form-group", [
          m("label.form-label", { for: "search" }, "Search"),
          m("input.form-input", {
            type: "text",
            id: "search",
            placeholder: "search",
            value: mdl.state.query,
            oninput: (e) => {
              mdl.state.query = e.target.value
            },
            onchange: (e) => searchShows(mdl)
          })
        ])
      )
  }
}

export default Search
