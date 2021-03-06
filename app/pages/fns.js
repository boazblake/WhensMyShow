import {
  replace,
  without,
  assoc,
  lensPath,
  over,
  lensProp,
  map,
  compose,
  propEq,
  prop,
  find,
  set,
  filter,
  view,
  not,
  anyPass,
  pluck,
  reject,
  join,
  equals
} from "ramda"

export const log = (m) => (v) => {
  console.log(m, v)
  return v
}

export const formatError = (error) => JSON.parse(JSON.stringify(error))

export const getEpisodeLink = (path) => (links) =>
  view(lensPath([path, "href"]), links)

const formatLinks = (links) =>
  without(
    [undefined],
    [
      getEpisodeLink("previousepisode")(links),
      getEpisodeLink("nextepisode")(links)
    ]
  ).map(makeHttps)

const toEpisodeViewModel = ({
  name,
  season,
  number,
  airdate,
  image,
  _links
}) => ({
  name,
  season,
  number,
  airdate,
  image: image && (makeHttps(image.original) || makeHttps(image.medium)),
  links: formatLinks(_links)
})

const toDetailsViewModel = ({
  image,
  tvmazeId,
  objectId,
  listStatus,
  name,
  notes
}) => ({
  webChannel,
  network,
  status,
  genres,
  premiered,
  summary,
  _links
}) => ({
  name,
  notes,
  genre: join(" ", genres),
  premiered,
  summary,
  links: formatLinks(_links),
  image,
  tvmazeId,
  objectId,
  listStatus,
  webChannel: webChannel && webChannel.name,
  network: network && network.name,
  status
})

const makeHttps = replace("http", "https")

export const toSearchViewModel = ({ name, image, id }) => ({
  image: image && (makeHttps(image.original) || makeHttps(image.medium)),
  tvmazeId: id,
  name
})

export const toDbModel = ({ listStatus, notes, name, tvmazeId, image }) => ({
  image,
  listStatus,
  notes,
  name,
  tvmazeId
})

export const onError = (mdl) => (type) => (error) => mdl.errors[type](error)

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
    compose(updateResults(r), find(propEq("tvmazeId", r.tvmazeId)))(shows)
  )

export const getShows = (http) =>
  http.getTask(http.backendlessUrl("prodshows?pagesize=100"))

export const searchShowsTask = (mdl) => (http) =>
  http
    .getTask(http.searchUrl(mdl.state.query()))
    .map(pluck("show"))
    .map(map(toSearchViewModel))
    .map(rejectWithAttr("image")(null))
    .map(updateShowStatus(mdl.user.shows()))

const itemSelected = (mdl) => (result) =>
  equals(prop("tvmazeId", result), mdl.state.searchItem.showMenu())

export const propIsDefined = (attr) => compose(not, propEq(attr, undefined))

export const showListSelection = (mdl) =>
  anyPass([itemSelected(mdl), propIsDefined("objectId")])

const updateListStatus = (show) => (listType) =>
  over(lensProp("listStatus"), () => listType, show)

const createBody = (dto) => ({
  body: dto
})

export const toDto = (show, listType) =>
  createBody(updateListStatus(show)(listType))

export const addUserShowsTask = (http) => (mdl) => (show) => (list) =>
  http
    .postTask(http.backendlessUrl("prodshows"), toDto(show, list))
    .chain((_) => getShows(http))
    .map(mdl.user.shows)

export const updateUserShowsTask = (http) => (show) => (list) =>
  http
    .putTask(
      http.backendlessUrl(`prodshows\\${show.objectId}`),
      toDto(show, list)
    )
    .chain((_) => getShows(http))

export const deleteShowTask = (http) => (id) =>
  http
    .deleteTask(http.backendlessUrl(`prodshows/${id}`))
    .chain((_) => getShows(http))

export const updateShowDetailsTask = (http) => (mdl) => (dto) =>
  http
    .putTask(http.backendlessUrl(`prodshows/${mdl.data.details().objectId}`), {
      body: dto
    })
    .chain(({ objectId }) => getShowDetailsTask(mdl)(http)(objectId))

const getShowDetails = (mdl) => (http) => (show) =>
  http
    .getTask(http.tvMazeDetailsUrl(show.tvmazeId))
    .map(toDetailsViewModel(show))

const findShowInDbTask = (http) => (id) =>
  http.getTask(http.backendlessUrl(`prodshows/${id}`))

export const getShowDetailsTask = (mdl) => (http) => (id) =>
  findShowInDbTask(http)(id).chain(getShowDetails(mdl)(http))

export const filterShowsByListType = (mdl) =>
  filter(propEq("listStatus", mdl.state.currentList()), mdl.user.shows())

export const getEpisodeTask = (http) => (episodeUrl) =>
  http.getTask(episodeUrl).map(toEpisodeViewModel)
