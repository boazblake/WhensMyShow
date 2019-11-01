import m from "mithril"

const Input = ({ attrs: { type, label, action, id, classList } }) => {
  return {
    view: ({ attrs: { value } }) => [
      m("label.label", { class: classList, for: id }, label),
      m("input.input", { class: classList, id, type, value, onchange: action })
    ]
  }
}

export default Input
