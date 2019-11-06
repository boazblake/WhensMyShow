import { baseUrl, apiKey, tmdbAuth } from "../secrets.js"
import Task from "data.task"
import m from "mithril"
import Model from "../Models.js"

function onProgress(e) {
  if (e.lengthComputable) {
    Model.state.loadingProgress.max(e.total)
    Model.state.loadingProgress.value(e.loaded)
    m.redraw()
  }
}

function onLoad() {
  return false
}

function onLoadStart() {
  Model.state.isLoading(true)
  return false
}
function onLoadEnd() {
  Model.state.isLoading(false)
  Model.state.loadingProgress.max(0)
  Model.state.loadingProgress.value(0)
  return false
}

const xhrProgress = {
  config: (xhr) => {
    // console.log(xhr)
    xhr.onprogress = onProgress
    xhr.onload = onLoad
    xhr.onloadstart = onLoadStart
    xhr.onloadend = onLoadEnd
  }
}

const _http = (mdl) => {
  mdl.state.isLoading(!mdl.state.isLoading)
  return m.request
}

const headers = (url) => {
  let tmdbBearerToken = url.includes("themoviedb") && tmdbAuth
  return {
    headers: {
      ...tmdbBearerToken,
      "Content-Type": "application/json;charset=utf-8"
    }
  }
}

const _task = (url) => (args) =>
  new Task((rej, res) =>
    _http(Model)(url, { ...args, ...headers(url), ...xhrProgress }).then(
      res,
      rej
    )
  )

const getTask = (url, args = {}) =>
  _task(url)({
    ...args,
    method: "GET"
  })
const postTask = (url, args = {}) =>
  _task(url)({
    ...args,
    method: "POST"
  })
const putTask = (url, args = {}) =>
  _task(url)({
    ...args,
    method: "PUT"
  })
const deleteTask = (url, args = {}) =>
  _task(url)({
    ...args,
    method: "DELETE"
  })

const baseSearchUrl = (baseUrl) => (apiKey) => (page) => (query) =>
  `${baseUrl}/search/multi?api_key=${apiKey}&language=en-US&query=${query}&page=${page}&include_adult=false`

const baseDetailsUrl = (baseUrl) => (apiKey) => (id) =>
  `${baseUrl}/tv/${id}?api_key=${apiKey}&language=en-US`
// &append_to_response=recommendations,similar,latest,airing_today,on_the_air
const baseImagesUrl = (baseUrl) => (apiKey) => (id) =>
  `${baseUrl}/tv/${id}/images?api_key=${apiKey}&language=en-US`

const backEndlessBaseUrl =
  "https://api.backendless.com/7F421158-889B-FD93-FF62-1ACDCD07AD00/1D9BEF3E-0CCC-D6C6-FF60-1A0B849A3E00/data/"

const backendlessUrl = (url) => backEndlessBaseUrl + url

// const shows = (shows) => `data/${shows}?pagesize=100`

const searchUrl = baseSearchUrl(baseUrl)(apiKey)

const detailsUrl = baseDetailsUrl(baseUrl)(apiKey)

const imagesUrl = (img) =>
  `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${img}`

const http = {
  getTask,
  postTask,
  putTask,
  deleteTask,
  baseSearchUrl,
  baseDetailsUrl,
  baseImagesUrl,
  searchUrl,
  detailsUrl,
  imagesUrl,
  backendlessUrl
}

export default http
