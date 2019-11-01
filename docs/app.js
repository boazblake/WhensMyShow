(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("Models.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithrilStream = require("mithril-stream");

var _mithrilStream2 = _interopRequireDefault(_mithrilStream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var State = {
  isLoggedIn: (0, _mithrilStream2.default)(false)
};

var User = (0, _mithrilStream2.default)({});

var Home = {
  cal: { isLarge: (0, _mithrilStream2.default)(true) }
};

var Models = { User: User, Home: Home, State: State };

exports.default = Models;
});

;require.register("components/Calendar.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Input from "./Inputs"

var months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

var calendarHeader = function calendarHeader() {
  return {
    view: function view() {
      return (0, _mithril2.default)("div.calendar-header", days.map(function (d) {
        return (0, _mithril2.default)("div.calendar-date", d);
      }));
    }
  };
};

var calendarBody = function calendarBody() {
  return {
    view: function view() {
      return (0, _mithril2.default)("div.calendar-body", [(0, _mithril2.default)("div.calendar-date.prev-month", (0, _mithril2.default)("button.date-item", "26")), (0, _mithril2.default)("div.calendar-date.prev-month", (0, _mithril2.default)("button.date-item", "27")), (0, _mithril2.default)("div.calendar-date.prev-month", (0, _mithril2.default)("button.date-item", "28")), (0, _mithril2.default)("div.calendar-date", (0, _mithril2.default)("button.date-item", "1")), (0, _mithril2.default)("div.calendar-date", (0, _mithril2.default)("button.date-item", "2")), (0, _mithril2.default)("div.calendar-date", (0, _mithril2.default)("button.date-item", "3")), (0, _mithril2.default)(".calendar-date.tooltip[data-tooltip='Today']", (0, _mithril2.default)("button.date-item.date-today", "4")), (0, _mithril2.default)(".calendar-date.tooltip[data-tooltip='Not available']", (0, _mithril2.default)("button.date-item[disabled]", "5")), (0, _mithril2.default)("div.calendar-date", (0, _mithril2.default)("button.date-item", "6")), (0, _mithril2.default)("div.calendar-date", (0, _mithril2.default)("button.date-item", "7")), (0, _mithril2.default)(".calendar-date.tooltip[data-tooltip='You have appointments']", (0, _mithril2.default)("button.date-item.badge", "8")), (0, _mithril2.default)("div.calendar-date", (0, _mithril2.default)("button.date-item", "9")), (0, _mithril2.default)("div.calendar-date", (0, _mithril2.default)("button.date-item", "10")), (0, _mithril2.default)("div.calendar-date", (0, _mithril2.default)("button.date-item", "11")), (0, _mithril2.default)("div.calendar-date", (0, _mithril2.default)("button.date-item", "12")), (0, _mithril2.default)("div.calendar-date", (0, _mithril2.default)("button.date-item", "13")), (0, _mithril2.default)("div.calendar-date", (0, _mithril2.default)("button.date-item", "14")), (0, _mithril2.default)("div.calendar-date", (0, _mithril2.default)("button.date-item", "15")), (0, _mithril2.default)("div.calendar-date.calendar-range.range-start", (0, _mithril2.default)("button.date-item", "16")), (0, _mithril2.default)("div.calendar-date.calendar-range", (0, _mithril2.default)("button.date-item", "17")), (0, _mithril2.default)("div.calendar-date.calendar-range", (0, _mithril2.default)("button.date-item", "18")), (0, _mithril2.default)("div.calendar-date.calendar-range", (0, _mithril2.default)("button.date-item", "19")), (0, _mithril2.default)("div.calendar-date.calendar-range.range-end", (0, _mithril2.default)("button.date-item", "20")), (0, _mithril2.default)("div.calendar-date", (0, _mithril2.default)("button.date-item", "21")), (0, _mithril2.default)("div.calendar-date", (0, _mithril2.default)("button.date-item", "22")), (0, _mithril2.default)("div.calendar-date", (0, _mithril2.default)("button.date-item", "23")), (0, _mithril2.default)("div.calendar-date", (0, _mithril2.default)("button.date-item", "24")), (0, _mithril2.default)("div.calendar-date", (0, _mithril2.default)("button.date-item", "25")), (0, _mithril2.default)("div.calendar-date", (0, _mithril2.default)("button.date-item", "26")), (0, _mithril2.default)("div.calendar-date", (0, _mithril2.default)("button.date-item", "27")), (0, _mithril2.default)("div.calendar-date", (0, _mithril2.default)("button.date-item", "28")), (0, _mithril2.default)("div.calendar-date", (0, _mithril2.default)("button.date-item", "29")), (0, _mithril2.default)("div.calendar-date", (0, _mithril2.default)("button.date-item", "30")), (0, _mithril2.default)("div.calendar-date", (0, _mithril2.default)("button.date-item", "31")), (0, _mithril2.default)("div.calendar-date.next-month", (0, _mithril2.default)("button.date-item", "1"))]);
    }
  };
};

var Calendar = function Calendar() {
  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          mdl = _ref$attrs.mdl,
          large = _ref$attrs.large;
      return (0, _mithril2.default)("div.calendar", { class: large && "calendar-lg" }, [(0, _mithril2.default)("div.calendar-nav.navbar", [(0, _mithril2.default)("button.btn.btn-action.btn-link.btn-lg", (0, _mithril2.default)("i.icon.icon-arrow-left")),
      // m(Input, { mdl, type: "checkbox", label: "calendar size" applicationCache, id: "calendar size", classList:"", value }),
      (0, _mithril2.default)("div.navbar-primary", "March 2017"), (0, _mithril2.default)("button.btn.btn-action.btn-link.btn-lg", (0, _mithril2.default)("i.icon.icon-arrow-right"))]), (0, _mithril2.default)("div.calendar-container", [(0, _mithril2.default)(calendarHeader, { mdl: mdl }), (0, _mithril2.default)(calendarBody, { mdl: mdl })])]);
    }
  };
};

exports.default = Calendar;
});

;require.register("components/Elements.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menu = exports.MenuItem = exports.DropDown = exports.CheckBox = exports.Input = exports.Button = exports.NavBar = undefined;

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavBar = exports.NavBar = function NavBar() {
  return {
    view: function view(_ref) {
      var children = _ref.children,
          mdl = _ref.attrs.mdl;
      return (0, _mithril2.default)("header", { class: "navbar" }, children.map(function (child) {
        return (0, _mithril2.default)("section", { class: "navbar-section" }, child);
      }));
    }
  };
};

var Button = exports.Button = function Button() {
  return {
    view: function view(_ref2) {
      var _ref2$attrs = _ref2.attrs,
          action = _ref2$attrs.action,
          label = _ref2$attrs.label;
      return (0, _mithril2.default)("button.btn", { onclick: action }, label);
    }
  };
};

var Input = exports.Input = function Input(_ref3) {
  var _ref3$attrs = _ref3.attrs,
      type = _ref3$attrs.type,
      label = _ref3$attrs.label,
      action = _ref3$attrs.action,
      id = _ref3$attrs.id,
      placeholder = _ref3$attrs.placeholder;

  return {
    view: function view(_ref4) {
      var value = _ref4.attrs.value;
      return (0, _mithril2.default)(".form-group", [(0, _mithril2.default)("label.form-label", { for: id }, label), (0, _mithril2.default)("input.form-input", {
        type: type,
        id: id,
        placeholder: placeholder,
        value: value,
        onchange: action
      })]);
    }
  };
};

var CheckBox = exports.CheckBox = function CheckBox(_ref5) {
  var _ref5$attrs = _ref5.attrs,
      label = _ref5$attrs.label,
      action = _ref5$attrs.action,
      id = _ref5$attrs.id,
      type = _ref5$attrs.type;

  return {
    view: function view(_ref6) {
      var value = _ref6.attrs.value;
      return (0, _mithril2.default)(".form-group", [(0, _mithril2.default)("label.form-" + type, { for: id, onclick: action }, (0, _mithril2.default)("input", {
        type: "checkbox",
        checked: value
      }), (0, _mithril2.default)("i.form-icon", {
        id: id
      }), label)]);
    }
  };
};

var DropDown = exports.DropDown = function DropDown(_ref7) {
  var _ref7$attrs = _ref7.attrs,
      label = _ref7$attrs.label,
      classList = _ref7$attrs.classList;

  return {
    view: function view(_ref8) {
      var children = _ref8.children;
      return (0, _mithril2.default)(".dropdown", { class: classList }, (0, _mithril2.default)("a.btn btn-link dropdown-toggle", { href: "#", tabindex: "0" }, label, (0, _mithril2.default)("i.icon icon-caret")), children);
    }
  };
};

var MenuItem = exports.MenuItem = function MenuItem() {
  return {
    view: function view(_ref9) {
      var children = _ref9.children;
      return (0, _mithril2.default)("li.menu-item", children);
    }
  };
};

var Menu = exports.Menu = function Menu() {
  return {
    view: function view(_ref10) {
      var children = _ref10.children;
      return (0, _mithril2.default)("ul.menu", children.map(function (child) {
        return (0, _mithril2.default)(MenuItem, child);
      }));
    }
  };
};
});

;require.register("components/Schedule.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schedule = function Schedule() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return (0, _mithril2.default)(".schedule", "Schedule");
    }
  };
};

exports.default = Schedule;
});

;require.register("initialize.js", function(exports, require, module) {
"use strict";

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

var _Models = require("./Models.js");

var _Models2 = _interopRequireDefault(_Models);

var _component = require("./pages/Landing/component");

var _component2 = _interopRequireDefault(_component);

var _component3 = require("./pages/Home/component");

var _component4 = _interopRequireDefault(_component3);

var _Elements = require("./components/Elements");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Main = function Main() {
  return { view: function view(_ref) {
      var children = _ref.children;
      return (0, _mithril2.default)("section.main", children);
    } };
};

var Logout = function Logout() {
  return {
    view: function view(_ref2) {
      var mdl = _ref2.attrs.mdl;
      return (0, _mithril2.default)(_Elements.Button, {
        action: function action() {
          _mithril2.default.route.set("/landing");
          mdl.State.isLoggedIn(false);
        },
        mdl: mdl,
        label: "logout"
      });
    }
  };
};

var Navigation = function Navigation() {
  return {
    view: function view(_ref3) {
      var mdl = _ref3.attrs.mdl;
      return (0, _mithril2.default)(_Elements.NavBar, { mdl: mdl }, mdl.State.isLoggedIn() && (0, _mithril2.default)(Logout, { mdl: mdl }));
    }
  };
};

var Layout = function Layout() {
  return {
    view: function view(_ref4) {
      var children = _ref4.children,
          mdl = _ref4.attrs.mdl;
      return (0, _mithril2.default)(".app", [(0, _mithril2.default)(Navigation, { mdl: mdl }), (0, _mithril2.default)(Main, { mdl: mdl }, children)]);
    }
  };
};

var routes = function routes(mdl) {
  return {
    "/landing": {
      render: function render() {
        return (0, _mithril2.default)(Layout, { mdl: mdl }, (0, _mithril2.default)(_component2.default, { mdl: mdl }));
      }
    },
    "/home/:name": {
      onmatch: function onmatch(a, b, c) {
        !mdl.User().name && _mithril2.default.route.set("/landing");
        mdl.State.isLoggedIn(true);
      },
      render: function render() {
        return (0, _mithril2.default)(Layout, { mdl: mdl }, (0, _mithril2.default)(_component4.default, { mdl: mdl, key: name }));
      }
    }
  };
};

document.addEventListener("DOMContentLoaded", function () {
  var root = document.body;
  _mithril2.default.route(root, "/home/anon", routes(_Models2.default));
});
});

;require.register("pages/Home/component.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

var _Calendar = require("../../components/Calendar.js");

var _Calendar2 = _interopRequireDefault(_Calendar);

var _Schedule = require("../../components/Schedule.js");

var _Schedule2 = _interopRequireDefault(_Schedule);

var _Elements = require("../../components/Elements");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Toolbar = function Toolbar() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl,
          children = _ref.children;
      return (0, _mithril2.default)(_Elements.NavBar, { mdl: mdl }, children);
    }
  };
};

var Config = function Config() {
  return {
    view: function view(_ref2) {
      var mdl = _ref2.attrs.mdl;
      return (0, _mithril2.default)(_Elements.DropDown, { mdl: mdl, classList: "dropdown-right", label: "Cal Options" }, (0, _mithril2.default)(_Elements.Menu, {}, [(0, _mithril2.default)(_Elements.CheckBox, {
        label: "Large",
        id: "cal-size",
        type: "switch",
        action: function action(e) {
          return mdl.Home.cal.isLarge(!mdl.Home.cal.isLarge());
        },
        value: mdl.Home.cal.isLarge()
      })]));
    }
  };
};

var Home = function Home() {
  return {
    view: function view(_ref3) {
      var mdl = _ref3.attrs.mdl;
      return (0, _mithril2.default)(".home", [(0, _mithril2.default)(Toolbar, { mdl: mdl }, [(0, _mithril2.default)("h1", "HOME"), (0, _mithril2.default)(Config, { mdl: mdl })]), (0, _mithril2.default)(_Calendar2.default, { mdl: mdl, large: mdl.Home.cal.isLarge() }), (0, _mithril2.default)(_Schedule2.default, { mdl: mdl })]);
    }
  };
};

exports.default = Home;
});

;require.register("pages/Landing/component.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

var _mithrilStream = require("mithril-stream");

var _mithrilStream2 = _interopRequireDefault(_mithrilStream);

var _Elements = require("../../components/Elements.js");

var _data = require("data.task");

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var form = {
  login: (0, _mithrilStream2.default)(false),
  email: (0, _mithrilStream2.default)(""),
  password: (0, _mithrilStream2.default)(""),
  name: (0, _mithrilStream2.default)("")
};

var authUserTask = function authUserTask(data) {
  return _data2.default.of(data.name());
};

var onResult = function onResult(status) {
  return function (mdl) {
    return function (data) {
      mdl.User.map(function (usr) {
        return usr.name = data;
      });
      console.log(status, data, _mithril2.default.route.set("home", { name: mdl.User().name }));
      _mithril2.default.route.set("/home/:name", { name: mdl.User().name });
    };
  };
};

var authUser = function authUser(mdl) {
  return function (data) {
    return authUserTask(data).fork(onResult("error")(mdl), onResult("success")(mdl));
  };
};

var RegisterForm = function RegisterForm(_ref) {
  var mdl = _ref.attrs.mdl;

  return {
    view: function view(_ref2) {
      var data = _ref2.attrs.data;
      return (0, _mithril2.default)("form.form", [(0, _mithril2.default)("h1", "REGISTER"), (0, _mithril2.default)(_Elements.Input, {
        label: "Email",
        id: "login-email",
        type: "email",
        placeholder: "email@email.com",
        action: function action(e) {
          return data.email(e.target.value);
        },
        value: data.email()
      }), (0, _mithril2.default)(_Elements.Input, {
        label: "Password",
        id: "login-password",
        type: "password",
        placeholder: "allowed chars",
        action: function action(e) {
          return data.password(e.target.value);
        },
        value: data.password()
      }), (0, _mithril2.default)(_Elements.Input, {
        label: "name",
        id: "login-name",
        type: "name",
        placeholder: "first last",
        action: function action(e) {
          return data.name(e.target.value);
        },
        value: data.name()
      }), (0, _mithril2.default)(_Elements.Button, {
        action: function action() {
          authUser(mdl)(form);
        },
        label: "SUBMIT"
      })]);
    }
  };
};

var LoginForm = function LoginForm(_ref3) {
  var mdl = _ref3.attrs.mdl;

  return {
    view: function view(_ref4) {
      var data = _ref4.attrs.data;
      return (0, _mithril2.default)("form.form", [(0, _mithril2.default)("h1", "LOGIN"), (0, _mithril2.default)(_Elements.Input, {
        label: "Email",
        id: "login-email",
        type: "email",
        placeholder: "email@email.com",
        action: function action(e) {
          return data.email(e.target.value);
        },
        value: data.email()
      }), (0, _mithril2.default)(_Elements.Input, {
        label: "Password",
        id: "login-password",
        type: "password",
        placeholder: "allowed chars",
        action: function action(e) {
          return data.password(e.target.value);
        },
        value: data.password()
      }), (0, _mithril2.default)(_Elements.Button, {
        action: function action() {
          authUser(mdl)(form);
        },
        label: "SUBMIT"
      })]);
    }
  };
};

var Landing = function Landing() {
  return {
    view: function view(_ref5) {
      var mdl = _ref5.attrs.mdl;
      return (0, _mithril2.default)(".landing", [(0, _mithril2.default)(_Elements.CheckBox, {
        label: "Login",
        id: "login-or-register",
        type: "switch",
        action: function action(e) {
          form.login(!form.login());
          console.log("register", form.login());
        },
        value: form.login()
      }), form.login() ? (0, _mithril2.default)(LoginForm, { mdl: mdl, data: form }) : (0, _mithril2.default)(RegisterForm, { mdl: mdl, data: form })]);
    }
  };
};

exports.default = Landing;
});

;require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map