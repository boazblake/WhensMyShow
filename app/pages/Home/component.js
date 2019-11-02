import m from "mithril"
import Search from "./search.js"
import Results from "./results.js"

const Home = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".main", [m(Search, { mdl }), m(Results, { mdl })])
  }
}

export default Home
