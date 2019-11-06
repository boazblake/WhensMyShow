import m from "mithril"

export const Loader = () => {
  return {
    view: () => m(".loader", [m("."), m(".")])
  }
}

export const Paginator = () => {
  return {
    view: ({
      attrs: {
        mdl: {
          state: { paginate }
        }
      }
    }) => {
      let { page, total_pages, total_results } = paginate
      console.log(
        "page",
        page(),
        "pages",
        total_pages(),
        "results",
        total_results()
      )
      return m("ul.pagination", [
        m("li.page-item.disabled", m("a[href='#'][tabindex='-1']", "Previous")),
        m("li.page-item.active", m("a[href='#']", "1")),
        m("li.page-item", m("a[href='#']", "2")),
        m("li.page-item", m("a[href='#']", "3")),
        m("li.page-item", m("span", "...")),
        m("li.page-item", m("a[href='#']", "12")),
        m("li.page-item", m("a[href='#']", "Next"))
      ])
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
      // console.log("MAX", max(), "value: ", value())
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
