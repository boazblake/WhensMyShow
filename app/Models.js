import { baseUrl, apiKey } from "./secrets.js"

const baseSearchUrl = (baseUrl) => (apiKey) => (page) => (query) =>
  `${baseUrl}/search/multi?api_key=${apiKey}&language=en-US&query=${query}&page=${page}&include_adult=false?`

const baseDetailsUrl = (baseUrl) => (apiKey) => (id) =>
  `${baseUrl}/tv/${id}?api_key=${apiKey}&language=en-US`

const baseImagesUrl = (baseUrl) => (apiKey) => (id) =>
  `${baseUrl}/tv/${id}/images?api_key=${apiKey}&language=en-US`

export const searchUrl = baseSearchUrl(baseUrl)(apiKey)

export const detailsUrl = baseDetailsUrl(baseUrl)(apiKey)

export const imagesUrl = (img) =>
  `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${img}`

const state = {
  page: 1,
  query: ""
}

const Model = {
  state,
  data: {},
  error: {}
}

export default Model
