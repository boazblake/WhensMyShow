import m from "mithril"

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

const Calendar = () => {
  return {
    view: ({ attrs: { mdl } }) => m(".calendar", "CALENDAR")
  }
}

export default Calendar
