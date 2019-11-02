import m from "mithril"
import { Button } from "./Elements"
import Stream from "mithril-stream"
import { getDaysInMonth } from "date-fns"

const months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const calendarHeader = () => {
  return {
    view: () =>
      m("div.calendar-header", daysOfWeek.map((d) => m("div.calendar-date", d)))
  }
}

const calendarBody = () => {
  return {
    view: () =>
      m("div.calendar-body", [
        m("div.calendar-date.prev-month", m("button.date-item", "26")),
        m("div.calendar-date.prev-month", m("button.date-item", "27")),
        m("div.calendar-date.prev-month", m("button.date-item", "28")),
        m("div.calendar-date", m("button.date-item", "1")),
        m("div.calendar-date", m("button.date-item", "2")),
        m("div.calendar-date", m("button.date-item", "3")),
        m(
          ".calendar-date.tooltip[data-tooltip='Today']",
          m("button.date-item.date-today", "4")
        ),
        m(
          ".calendar-date.tooltip[data-tooltip='Not available']",
          m("button.date-item[disabled]", "5")
        ),
        m("div.calendar-date", m("button.date-item", "6")),
        m("div.calendar-date", m("button.date-item", "7")),
        m(
          ".calendar-date.tooltip[data-tooltip='You have appointments']",
          m("button.date-item.badge", "8")
        ),
        m("div.calendar-date", m("button.date-item", "9")),
        m("div.calendar-date", m("button.date-item", "10")),
        m("div.calendar-date", m("button.date-item", "11")),
        m("div.calendar-date", m("button.date-item", "12")),
        m("div.calendar-date", m("button.date-item", "13")),
        m("div.calendar-date", m("button.date-item", "14")),
        m("div.calendar-date", m("button.date-item", "15")),
        m(
          "div.calendar-date.calendar-range.range-start",
          m("button.date-item", "16")
        ),
        m("div.calendar-date.calendar-range", m("button.date-item", "17")),
        m("div.calendar-date.calendar-range", m("button.date-item", "18")),
        m("div.calendar-date.calendar-range", m("button.date-item", "19")),
        m(
          "div.calendar-date.calendar-range.range-end",
          m("button.date-item", "20")
        ),
        m("div.calendar-date", m("button.date-item", "21")),
        m("div.calendar-date", m("button.date-item", "22")),
        m("div.calendar-date", m("button.date-item", "23")),
        m("div.calendar-date", m("button.date-item", "24")),
        m("div.calendar-date", m("button.date-item", "25")),
        m("div.calendar-date", m("button.date-item", "26")),
        m("div.calendar-date", m("button.date-item", "27")),
        m("div.calendar-date", m("button.date-item", "28")),
        m("div.calendar-date", m("button.date-item", "29")),
        m("div.calendar-date", m("button.date-item", "30")),
        m("div.calendar-date", m("button.date-item", "31")),
        m("div.calendar-date.next-month", m("button.date-item", "1"))
      ])
  }
}

const Calendar = ({ attrs: { mdl } }) => {
  let month = mdl.State.today.getMonth()
  let year = mdl.State.today.getFullYear()
  let day = mdl.State.today.getDay()

  const state = {
    months,
    daysOfWeek,
    day,
    month,
    year,
    daysInMonth: getDaysInMonth(month)
  }

  console.log("month", state)

  return {
    view: ({ attrs: { mdl, large } }) =>
      m("div.calendar", { class: large && "calendar-lg" }, [
        m("div.calendar-nav.navbar", [
          m(
            "button.btn.btn-action.btn-link.btn-lg",
            {
              onclick: (e) => state.month--
            },
            m("i.icon.icon-arrow-left")
          ),
          m("div.navbar-primary", [
            `${state.months[state.month]} ${state.year}`
          ]),
          m(
            "button.btn.btn-action.btn-link.btn-lg",
            { onclick: state.month++ },
            m("i.icon.icon-arrow-right")
          )
        ]),
        m("div.calendar-container", [
          m(calendarHeader, { mdl }),
          m(calendarBody, { mdl })
        ])
      ])
  }
}

export default Calendar
