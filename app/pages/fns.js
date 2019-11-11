import {
  toPairs,
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
  not,
  is,
  anyPass,
  pluck,
  reject,
  isNil,
  join,
  isEmpty,
  head,
  complement,
  equals
} from "ramda"

export const log = (m) => (v) => {
  console.log(m, v)
  return v
}

const getExternalId = compose(
  join("="),
  head,
  toPairs,
  reject(isNil)
)

export const toViewModel = ({
  name,
  webChannel,
  network,
  externals,
  image,
  id,
  status,
  objectId,
  listStatus
}) => ({
  name,
  webChannel: webChannel && webChannel.name,
  network: network && network.name,
  image: image && (image.original || image.medium),
  tvmazeId: id,
  endpoint: getExternalId(externals),
  status,
  objectId,
  listStatus
})

export const toSearchViewModel = ({ externals, image, id }) => ({
  image: image && (image.original || image.medium),
  tvmazeId: id,
  endpoint: getExternalId(externals)
})

export const toDbModel = ({
  listStatus,
  endpoint,
  notes,
  tvmazeId,
  image
}) => ({
  endpoint,
  image,
  listStatus,
  notes,
  tvmazeId
})

export const onError = (mdl) => (type) => (error) => mdl.errors[type](error)

const onSuccess = (mdl) => (d) => {
  mdl.user.shows(d)
  // updating the mdl.data with show details from the user list and the search results list.
  mdl.data.shows(updateShowStatus(mdl.user.shows())(mdl.data.shows()))
}

const rejectWithAttr = (attr) => (value) => reject(propEq(attr, value))

const updateResults = (result) => (show) => {
  if (show) {
    return assoc(
      "objectId",
      show.objectId,
      set(lensProp("listStatus"), prop("listStatus", show), result)
    )
  } else {
    return result
  }
}

export const updateShowStatus = (shows) => (data) =>
  data.map((r) =>
    compose(
      updateResults(r),
      find(propEq("tvmazeId", r.tvmazeId))
    )(shows)
  )

export const getShows = (http) =>
  http.getTask(http.backendlessUrl("devshows?pagesize=100"))

export const searchShows = (mdl, http) =>
  http
    .getTask(http.searchUrl(mdl.state.query()))
    .map(pluck("show"))
    .map(map(toSearchViewModel))
    .map(rejectWithAttr("image")(null))
    .map(updateShowStatus(mdl.user.shows()))
    .fork(onError(mdl)("search"), (data) => {
      // mdl.state.paginate.total_pages(data.total_pages)
      // mdl.state.paginate.total_results(data.total_results)
      mdl.data.shows(data)
    })

const itemSelected = (mdl) => (result) =>
  equals(prop("tvmazeId", result), mdl.state.searchItem.showMenu())

export const propIsDefined = (attr) =>
  compose(
    not,
    propEq(attr, undefined)
  )

export const showListSelection = (mdl) =>
  anyPass([itemSelected(mdl), propIsDefined("objectId")])

const updateListStatus = (show) => (listType) =>
  over(lensProp("listStatus"), () => listType, show)

const createBody = (dto) => ({
  body: dto
})

export const toDto = (show, listType) =>
  createBody(updateListStatus(show)(listType))

export const addUserShowsTask = (http) => (mdl) => (result) => (list) =>
  http
    .postTask(http.backendlessUrl("devshows"), toDto(result, list))
    .chain((_) => getShows(http))
    .map(mdl.user.shows)
    .fork(onError(mdl)("search"), onSuccess(mdl))

export const updateUserShowsTask = (http) => (mdl) => (result) => (list) =>
  http
    .putTask(
      http.backendlessUrl(`devshows\\${result.objectId}`),
      toDto(result, list)
    )
    .chain((_) => getShows(http))
    .fork(onError(mdl)("search"), onSuccess(mdl))

export const deleteShowTask = (http) => (mdl) =>
  http
    .deleteTask(http.backendlessUrl(`devshows/${mdl.state.details.selected()}`))
    .chain((_) => getShows(http))

// export const updateShowNotesTask = (http) => (mdl) => (notes) =>
//   http.putTask(
//     http.backendlessUrl(`devshows/${mdl.state.details.selected()}`),
//     {
//       body: {
//         notes
//       }
//     }
//   )

export const getShowDetailsTask = (http) => (id) =>
  http.getTask(http.detailsUrl(id)).map(toViewModel)

export const filterShowsByListType = (mdl) =>
  filter(propEq("listStatus", mdl.state.currentList()), mdl.user.shows())
