import m from "mithril"
import Stream from "mithril-stream"
import { Button, Input, CheckBox } from "../../components/Elements.js"

import Task from "data.task"

const form = {
  login: Stream(false),
  email: Stream(""),
  password: Stream(""),
  name: Stream("")
}

const authUserTask = (data) => Task.of(data.name())

const onResult = (status) => (mdl) => (data) => {
  mdl.User.map((usr) => (usr.name = data))
  m.route.set("/home/:name", { name: mdl.User().name })
}

const authUser = (mdl) => (data) =>
  authUserTask(data).fork(onResult("error")(mdl), onResult("success")(mdl))

const RegisterForm = ({ attrs: { mdl } }) => {
  return {
    view: ({ attrs: { data } }) =>
      m("form.form", [
        m("h1", "REGISTER"),
        m(Input, {
          label: "Email",
          id: "login-email",
          type: "email",
          placeholder: "email@email.com",
          action: (e) => data.email(e.target.value),
          value: data.email()
        }),
        m(Input, {
          label: "Password",
          id: "login-password",
          type: "password",
          placeholder: "allowed chars",
          action: (e) => data.password(e.target.value),
          value: data.password()
        }),
        m(Input, {
          label: "name",
          id: "login-name",
          type: "name",
          placeholder: "first last",
          action: (e) => data.name(e.target.value),
          value: data.name()
        }),
        m(Button, {
          action: () => {
            authUser(mdl)(form)
          },
          label: "SUBMIT"
        })
      ])
  }
}

const LoginForm = ({ attrs: { mdl } }) => {
  return {
    view: ({ attrs: { data } }) =>
      m("form.form", [
        m("h1", "LOGIN"),
        m(Input, {
          label: "Email",
          id: "login-email",
          type: "email",
          placeholder: "email@email.com",
          action: (e) => data.email(e.target.value),
          value: data.email()
        }),
        m(Input, {
          label: "Password",
          id: "login-password",
          type: "password",
          placeholder: "allowed chars",
          action: (e) => data.password(e.target.value),
          value: data.password()
        }),
        m(Button, {
          action: () => {
            authUser(mdl)(form)
          },
          label: "SUBMIT"
        })
      ])
  }
}

const Landing = () => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(".landing", [
        m(CheckBox, {
          label: "Login",
          id: "login-or-register",
          type: "switch",
          action: (e) => {
            form.login(!form.login())
            console.log("register", form.login())
          },
          value: form.login()
        }),

        form.login()
          ? m(LoginForm, { mdl, data: form })
          : m(RegisterForm, { mdl, data: form })
      ])
  }
}

export default Landing
