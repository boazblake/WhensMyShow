import Stream from "mithril-stream"
import Routes from "./Routes.js"

const state = {
  paginate: {
    page: Stream(1),
    total_pages: Stream(0),
    total_results: Stream(0)
  },
  query: Stream(""),
  isLoading: Stream(false),
  loadingProgress: {
    max: Stream(0),
    value: Stream(0)
  },
  item: {
    selected: Stream(false),
    showMenu: Stream(false)
  },
  currentList: Stream("Watching")
}

const data = {
  shows: Stream([]),
  details: Stream(null)
}

const errors = {
  details: Stream(null),
  search: Stream(null),
  user: Stream(null)
}

const user = {
  shows: Stream([]),
  lists: Stream(["Watching", "Wishlist"])
}

const Model = {
  Routes,
  state,
  user,
  data,
  errors
}

export default Model
