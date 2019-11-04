import { over, lensProp, map } from "ramda"

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

export const formatDetailData = log("wtf")
