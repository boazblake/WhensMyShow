import Stream from "mithril-stream"

const State = {
  today: new Date(),
  isLoggedIn: Stream(false)
}

const User = Stream({})

const Home = {
  cal: { isLarge: Stream(true) }
}

const Models = { User, Home, State }

export default Models
