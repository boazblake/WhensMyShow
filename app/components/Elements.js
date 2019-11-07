import m from "mithril"
import { range, take, takeLast, flatten } from "ramda"
import { searchShows } from "../pages/fns"
import http from "../utils/http.js"

export const Loader = () => {
  return {
    view: () => m(".loader", [m("."), m(".")])
  }
}

export const Paginator = () => {
  const fetchShows = (mdl) => searchShows(mdl, http)

  return {
    view: ({ attrs: { mdl } }) => {
      let { page, total_pages, total_results } = mdl.state.paginate
      if (total_results()) {
        let viewModel,
          totalPages = range(1, total_pages() + 1)

        if (totalPages.length > 6) {
          let firstThree = take(3, totalPages)
          let lastThree = takeLast(3, totalPages)
          viewModel = flatten([firstThree, m("span", "..."), lastThree])
        } else {
          viewModel = totalPages
        }

        return m("ul.pagination.navbar", [
          m(
            "li.page-item",
            {
              class: page() == 1 ? "disabled" : "c-hand",
              onclick: () => {
                if (page() !== 1 && page(page() - 1)) {
                  fetchShows(mdl)
                }
              }
            },
            m("a[tabindex='-1']", "Previous")
          ),
          viewModel.map((p) =>
            m(
              "li.page-item.c-hand",
              {
                class: page() == p && "active c-auto",
                onclick: () => {
                  if (Number(p) && p !== page()) {
                    page(p)
                    fetchShows(mdl)
                  }
                }
              },
              m("a", p)
            )
          ),
          m(
            "li.page-item",
            {
              class: page() == total_pages() ? "disabled" : "c-hand",
              onclick: () => {
                if (page() < total_pages() && page(page() + 1)) {
                  fetchShows(mdl)
                }
              }
            },
            m("a", "Next")
          )
        ])
      }
    }
  }
}

export const ProgressBar = () => {
  return {
    view: ({
      attrs: {
        mdl: {
          state: {
            loadingProgress: { value, max }
          }
        }
      }
    }) => {
      return m(
        ".progressBar",
        m("progress.progress", { max: max(), value: value() })
      )
    }
  }
}

export const NavBar = () => {
  return {
    view: ({ children, attrs: { mdl } }) =>
      m(
        "header",
        { class: "navbar" },
        children.map((child) =>
          m("section", { class: "navbar-section" }, child)
        )
      )
  }
}

export const ListSelector = () => {
  return {
    view: ({ attrs: { list, action, active } }) => {
      return m(
        "li.menu-item",
        m(
          "a.btn",
          {
            class: active && "active",
            onclick: action
          },
          list
        )
      )
    }
  }
}

export const Button = () => {
  return {
    view: ({ attrs: { classList, action, label } }) =>
      m(`button.btn.${classList}`, { onclick: action }, label)
  }
}

export const Input = ({ attrs: { type, label, action, id, placeholder } }) => {
  return {
    view: ({ attrs: { value } }) =>
      m(".form-group", [
        m("label.form-label", { for: id }, label),
        m("input.form-input", {
          type,
          id,
          placeholder,
          value,
          onchange: action
        })
      ])
  }
}

export const CheckBox = ({ attrs: { label, action, id, type } }) => {
  return {
    view: ({ attrs: { value } }) =>
      m(".form-group", [
        m(
          `label.form-${type}`,
          { for: id, onclick: action },
          m("input", {
            type: "checkbox",
            checked: value
          }),
          m("i.form-icon", {
            id
          }),
          label
        )
      ])
  }
}

export const DropDown = ({ attrs: { label, classList } }) => {
  return {
    view: ({ children }) =>
      m(
        ".dropdown",
        { class: classList },
        m(
          "a.btn btn-link dropdown-toggle",
          { href: "#", tabindex: "0" },
          label,
          m("i.icon icon-caret")
        ),
        children
      )
  }
}

export const MenuItem = () => {
  return {
    view: ({ children }) => m("li.menu-item", children)
  }
}

export const Menu = () => {
  return {
    view: ({ children }) =>
      m("ul.menu", children.map((child) => m(MenuItem, child)))
  }
}
