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

export const mergeWithCurrentList = (shows) => (data) =>
  data.results.map((r) =>
    compose(
      updateResults(r),
      find(propEq("id", r.id))
    )(shows)
  )

export const getShows = (mdl, http) =>
  http.getTask(http.backendlessUrl("shows?pagesize=100")).map(map(toSearchVm))
