import {
  assoc,
  over,
  lensProp,
  map,
  compose,
  propEq,
  prop,
  find,
  set,
  filter,
  is
} from "ramda"

const log = (m) => (v) => {
  console.log(m, v)
  return v
}

export const toSearchVm = ({
  name,
  first_air_date,
  poster_path,
  overview,
  id,
  status,
  objectId
}) => ({
  name,
  first_air_date,
  poster_path,
  overview,
  id,
  status,
  objectId
})

export const filterIncorrectAttrTypes = (type) => (attr) =>
  filter(
    compose(
      is(type),
      prop(attr)
    )
  )

export const formatSearchData = over(
  lensProp("results"),
  compose(
    map(toSearchVm),
    compose(filterIncorrectAttrTypes(String)("poster_path"))
  )
)

const updateResults = (result) => (show) => {
  if (show) {
    return assoc(
      "objectId",
      show.objectId,
      set(lensProp("status"), prop("status", show), result)
    )
  } else {
    return result
  }
}

export const updateShowStatus = (shows) => (data) => {
  let newResults = data.results.map((r) =>
    compose(
      updateResults(r),
      find(propEq("id", r.id))
    )(shows)
  )
  data.results = newResults
  return data
}

export const getShows = (mdl, http) =>
  http.getTask(http.backendlessUrl("shows?pagesize=100")).map(map(toSearchVm))

export const searchShows = (mdl, http) =>
  http
    .getTask(http.searchUrl(mdl.state.paginate.page())(mdl.state.query()))
    .map(formatSearchData)
    .map(updateShowStatus(mdl.user.shows()))
    .fork(
      (err) => (mdl.error = err),
      (data) => {
        mdl.state.paginate.total_pages(data.total_pages)
        mdl.state.paginate.total_results(data.total_results)
        mdl.data.shows(data.results)
      }
    )
