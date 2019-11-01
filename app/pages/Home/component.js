import m from "mithril"
import Calendar from "../../components/Calendar.js"
import Schedule from "../../components/Schedule.js"

const Home = ({ attrs: { mdl } }) => {
  console.log(mdl.User())
  return {
    view: ({ attrs: { mdl } }) =>
      m(".home", [m("h1", "HOME"), m(Calendar, { mdl }), m(Schedule, { mdl })])
  }
}

export default Home
