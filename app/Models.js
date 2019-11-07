import Stream from "mithril-stream"
import Routes from "./Routes.js"
import { any, propEq } from "ramda"

export const log = (m) => (v) => {
  console.log(m, v)
  return v
}

const userHasAlready = (mdl) => (result) =>
  any(propEq("id", result.id), mdl.user.shows())

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
  shows: Stream([])
}

const errors = {
  search: Stream([]),
  user: Stream([])
}

const user = {
  shows: Stream([]),
  lists: Stream(["Watching", "Wishlist"])
}

const Model = {
  log,
  Routes,
  state,
  user,
  data,
  errors,
  userHasAlready
}

export default Model
