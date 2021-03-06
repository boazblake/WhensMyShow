import m from "mithril"
import SearchResults from "./Search-Results.js"

const Search = () => {
  return {
    view: ({ attrs: { mdl } }) => m(".search", [m(SearchResults, { mdl })]),
    onbeforeremove: ({ attrs: { mdl } }) => {
      mdl.state.query("")
      mdl.data.shows([])
      mdl.state.paginate.page(1)
      mdl.state.paginate.total_pages(0)
      mdl.state.paginate.total_results(0)
      mdl.state.searchItem.showMenu(false)
    }
  }
}

export default Search
