import m from "mithril"
import Stream from "mithril-stream"
import Input from "../../components/Input.js"
import Button from "../../components/Button.js"

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
  console.log(status, data, m.route.set("home", { name: mdl.User().name }))
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
          classList: "",
          id: "login-email",
          type: "email",
          action: (e) => data.email(e.target.value),
          value: data.email()
        }),
        m(Input, {
          label: "Password",
          classList: "",
          id: "login-password",
          type: "password",
          action: (e) => data.password(e.target.value),
          value: data.password()
        }),
        m(Input, {
          label: "name",
          classList: "",
          id: "login-name",
          type: "name",
          action: (e) => data.name(e.target.value),
          value: data.name()
        }),
        m(Button, {
          classList: "",
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
          classList: "",
          id: "login-email",
          type: "email",
          action: (e) => data.email(e.target.value),
          value: data.email()
        }),
        m(Input, {
          label: "Password",
          classList: "",
          id: "login-password",
          type: "password",
          action: (e) => data.password(e.target.value),
          value: data.password()
        }),
        m(Button, {
          classList: "",
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
        form.login()
          ? m(LoginForm, { mdl, data: form })
          : m(RegisterForm, { mdl, data: form }),
        m(Input, {
          label: "Login",
          classList: "",
          id: "login-login",
          type: "checkbox",
          action: (e) => {
            form.login(!form.login())
            console.log("register", form.login())
          },
          value: form.login()
        })
      ])
  }
}

export default Landing
