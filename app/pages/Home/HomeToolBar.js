import m from "mithril"
import { ListSelector } from "../../components/Elements.js"

const FilterLists = () => {
  const selectList = (mdl, list) => mdl.state.currentList(list)
  let show = true
  return {
    view: ({ attrs: { mdl } }) =>
      m(".dropdown", [
        m(
          "a.btn btn-link dropdown-toggle",
          { onclick: () => (show = true), tabindex: "0" },
          [mdl.state.currentList(), m("i.icon icon-caret")]
        ),
        show &&
          m(
            "ul.menu",
            mdl.user.lists().map((list, idx) =>
              m(ListSelector, {
                list,
                action: () => {
                  selectList(mdl, list)
                  show = false
                },
                key: idx,
                mdl
              })
            )
          )
      ])
  }
}

const HomeToolBar = () => {
  return {
    view: ({ attrs: { mdl } }) => m("nav.navbar", m(FilterLists, { mdl }))
  }
}

export default HomeToolBar
