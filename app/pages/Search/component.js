import m from "mithril"
import SearchInput from "./SearchInput.js"
import SearchResults from "./SearchResults.js"

const Search = () => {
  return {
    view: ({ attrs: { mdl } }) => m(".search", [m(SearchResults, { mdl })]),
    onbeforeremove: ({ attrs: { mdl } }) => {
      mdl.state.query("")
      mdl.data.shows([])
    }
  }
}

export default Search
