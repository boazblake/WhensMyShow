import m from "mithril"
import http from "../../utils/http.js"
import { formatSearchData, mergeWithCurrentList } from "../fns.js"
import { Paginator } from "../../components/Elements.js"

const SearchInput = () => {
  const searchShows = (mdl) => {
    return http
      .getTask(http.searchUrl(mdl.state.paginate.page())(mdl.state.query()))
      .map(formatSearchData)
      .map(mergeWithCurrentList(mdl.user.shows()))
      .fork(
        (err) => (mdl.error = err),
        (data) => {
          mdl.state.paginate.total_pages(data.total_pages)
          mdl.state.paginate.total_results(data.total_results)
          mdl.data.shows(data.results)
        }
      )
  }

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
          }),

          m(Paginator, { mdl })
        ])
      )
  }
}

export default SearchInput
