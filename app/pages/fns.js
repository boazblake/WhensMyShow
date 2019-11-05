import { over, lensProp, map, compose, propEq, prop, find, set } from "ramda"

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
  status
}) => ({
  name,
  first_air_date,
  poster_path,
  overview,
  id,
  status
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
