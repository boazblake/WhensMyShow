import m from "mithril"
import { ListSelector } from "../../components/Elements.js"

const FilterLists = () => {
  const selectList = (mdl, list) => mdl.state.currentList(list)
  return {
    view: ({ attrs: { mdl } }) =>
      m(".dropdown", [
        m("a.btn btn-link dropdown-toggle", { tabindex: "0" }, [
          mdl.state.currentList(),
          m("i.icon icon-caret")
        ]),
        m(
          "ul.menu",
          mdl.user.lists().map((list, idx) =>
            m(ListSelector, {
              list,
              action: () => selectList(mdl, list),
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
