import { over, lensProp, map } from "ramda"

const toSearchVm = ({
  original_name,
  backdrop_path,
  poster_path,
  overview,
  id
}) => ({
  original_name,
  backdrop_path,
  poster_path,
  overview,
  id
})

export const formatSearchData = over(lensProp("results"), map(toSearchVm))
