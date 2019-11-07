import { over, lensProp, map, compose, propEq, prop, find, set } from "ramda"

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

export const formatSearchData = over(lensProp("results"), map(toSearchVm))

const updateResults = (result) => (show) =>
  show ? set(lensProp("status"), prop("status", show), result) : result

export const mergeWithCurrentList = (shows) => (data) => {
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

export const searchShows = (mdl, http) => {
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
