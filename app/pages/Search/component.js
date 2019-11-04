import m from "mithril"
import SearchInput from "./SearchInput.js"
import SearchResults from "./SearchResults.js"

const Search = () => {
  return {
    view: ({ attrs: { mdl } }) => m(".search", [m(SearchResults, { mdl })])
  }
}

export default Search
