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
  is,
  anyPass
} from "ramda"

export const log = (m) => (v) => {
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

export const onError = (mdl) => (type) => (error) => mdl.errors[type](error)

const onSuccess = (mdl) => (d) => {
  mdl.user.shows(d)
  mdl.data.shows(
    updateShowStatus(mdl.user.shows())({
      results: mdl.data.shows()
    }).results
  )
}

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
    .fork(onError(mdl)("search"), (data) => {
      mdl.state.paginate.total_pages(data.total_pages)
      mdl.state.paginate.total_results(data.total_results)
      mdl.data.shows(data.results)
    })

const itemSelected = (mdl) => (result) =>
  mdl.state.searchItem.showMenu() == result.id
export const propIsDefined = (attr) => (result) => result[attr] !== undefined

export const showListSelection = (mdl) =>
  anyPass([itemSelected(mdl), propIsDefined("objectId")])

export const saveDto = (d, value) => ({
  body: over(lensProp("status"), () => value, d)
})

export const addUserShowsTask = (http) => (mdl) => (result) => (list) =>
  http
    .postTask(http.backendlessUrl("shows"), saveDto(result, list))
    .chain((_) => getShows(mdl, http))
    .fork(onError(mdl)("search"), onSuccess(mdl))

export const updateUserShowsTask = (http) => (mdl) => (result) => (list) =>
  http
    .putTask(
      http.backendlessUrl(`shows\\${result.objectId}`),
      saveDto(result, list)
    )
    .chain((_) => getShows(mdl, http))
    .fork(onError(mdl)("search"), onSuccess(mdl))

export const deleteShowTask = (http) => (mdl) => (show) =>
  http
    .deleteTask(http.backendlessUrl(`shows/${mdl.state.details.selected()}`))
    .chain((_) => getShows(mdl, http))

export const getShowDetailsTask = (http) => (id) =>
  http.getTask(http.detailsUrl(id))

export const filterShowsByListType = (mdl) =>
  filter(propEq("status", mdl.state.currentList()), mdl.user.shows())
