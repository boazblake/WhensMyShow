import m from "mithril"
import Calendar from "../../components/Calendar.js"
import Schedule from "../../components/Schedule.js"
import { NavBar, DropDown, CheckBox, Menu } from "../../components/Elements"

const Toolbar = () => {
  return {
    view: ({ attrs: { mdl }, children }) => m(NavBar, { mdl }, children)
  }
}

const Config = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        DropDown,
        { mdl, classList: "dropdown-right", label: "Cal Options" },
        m(Menu, {}, [
          m(CheckBox, {
            label: "Large",
            id: "cal-size",
            type: "switch",
            action: (e) => mdl.Home.cal.isLarge(!mdl.Home.cal.isLarge()),
            value: mdl.Home.cal.isLarge()
          })
        ])
      )
  }
}

const Home = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".home", [
        m(Toolbar, { mdl }, [m("h1", "HOME"), m(Config, { mdl })]),
        m(Calendar, { mdl, large: mdl.Home.cal.isLarge() }),
        m(Schedule, { mdl })
      ])
  }
}

export default Home
