import Stream from "mithril-stream"
import Routes from "./Routes.js"

export const log = (m) => (v) => {
  console.log(m, v)
  return v
}

const state = {
  page: Stream(1),
  query: Stream(""),
  isLoading: Stream(false),
  loadingProgress: {
    max: Stream(0),
    value: Stream(0)
  },
  currentList: Stream("Watching")
}

const user = {
  shows: Stream([]),
  lists: Stream(["Watching", "Wishlist"])
}

const Model = {
  Routes,
  state,
  user,
  data: Stream([]),
  errors: Stream([])
}

export default Model
