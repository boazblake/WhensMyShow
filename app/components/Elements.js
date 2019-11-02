import m from "mithril"

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
