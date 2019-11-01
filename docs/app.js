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
require.register("components/Button.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = function Button() {
  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          classList = _ref$attrs.classList,
          action = _ref$attrs.action,
          label = _ref$attrs.label;
      return (0, _mithril2.default)("button.btn." + classList, { onclick: action }, label);
    }
  };
};

exports.default = Button;
});

;require.register("components/Calendar.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var Calendar = function Calendar() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return (0, _mithril2.default)(".calendar", "CALENDAR");
    }
  };
};

exports.default = Calendar;
});

;require.register("components/Input.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Input = function Input(_ref) {
  var _ref$attrs = _ref.attrs,
      type = _ref$attrs.type,
      label = _ref$attrs.label,
      action = _ref$attrs.action,
      id = _ref$attrs.id,
      classList = _ref$attrs.classList;

  return {
    view: function view(_ref2) {
      var value = _ref2.attrs.value;
      return [(0, _mithril2.default)("label.label", { class: classList, for: id }, label), (0, _mithril2.default)("input.input", { class: classList, id: id, type: type, value: value, onchange: action })];
    }
  };
};

exports.default = Input;
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

var _model = require("./model.js");

var _model2 = _interopRequireDefault(_model);

var _component = require("./pages/Landing/component");

var _component2 = _interopRequireDefault(_component);

var _component3 = require("./pages/Home/component");

var _component4 = _interopRequireDefault(_component3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Main = function Main() {
  return { view: function view(_ref) {
      var children = _ref.children;
      return (0, _mithril2.default)("section.main", children);
    } };
};

var Layout = function Layout() {
  return {
    view: function view(_ref2) {
      var children = _ref2.children,
          mdl = _ref2.attrs.mdl;
      return (0, _mithril2.default)(".app", [(0, _mithril2.default)(Main, { mdl: mdl }, children)]);
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
        return console.log(a, b, c);
      },
      render: function render() {
        return (0, _mithril2.default)(Layout, { mdl: mdl }, (0, _mithril2.default)(_component4.default, { mdl: mdl, key: name }));
      }
    }
  };
};

document.addEventListener("DOMContentLoaded", function () {
  var root = document.body;
  _mithril2.default.route(root, "/landing", routes(_model2.default));
});
});

;require.register("model.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithrilStream = require("mithril-stream");

var _mithrilStream2 = _interopRequireDefault(_mithrilStream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = (0, _mithrilStream2.default)({});

var Model = { User: User };

exports.default = Model;
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function Home(_ref) {
  var mdl = _ref.attrs.mdl;

  console.log(mdl.User());
  return {
    view: function view(_ref2) {
      var mdl = _ref2.attrs.mdl;
      return (0, _mithril2.default)(".home", [(0, _mithril2.default)("h1", "HOME"), (0, _mithril2.default)(_Calendar2.default, { mdl: mdl }), (0, _mithril2.default)(_Schedule2.default, { mdl: mdl })]);
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

var _Input = require("../../components/Input.js");

var _Input2 = _interopRequireDefault(_Input);

var _Button = require("../../components/Button.js");

var _Button2 = _interopRequireDefault(_Button);

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
      return (0, _mithril2.default)("form.form", [(0, _mithril2.default)("h1", "REGISTER"), (0, _mithril2.default)(_Input2.default, {
        label: "Email",
        classList: "",
        id: "login-email",
        type: "email",
        action: function action(e) {
          return data.email(e.target.value);
        },
        value: data.email()
      }), (0, _mithril2.default)(_Input2.default, {
        label: "Password",
        classList: "",
        id: "login-password",
        type: "password",
        action: function action(e) {
          return data.password(e.target.value);
        },
        value: data.password()
      }), (0, _mithril2.default)(_Input2.default, {
        label: "name",
        classList: "",
        id: "login-name",
        type: "name",
        action: function action(e) {
          return data.name(e.target.value);
        },
        value: data.name()
      }), (0, _mithril2.default)(_Button2.default, {
        classList: "",
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
      return (0, _mithril2.default)("form.form", [(0, _mithril2.default)("h1", "LOGIN"), (0, _mithril2.default)(_Input2.default, {
        label: "Email",
        classList: "",
        id: "login-email",
        type: "email",
        action: function action(e) {
          return data.email(e.target.value);
        },
        value: data.email()
      }), (0, _mithril2.default)(_Input2.default, {
        label: "Password",
        classList: "",
        id: "login-password",
        type: "password",
        action: function action(e) {
          return data.password(e.target.value);
        },
        value: data.password()
      }), (0, _mithril2.default)(_Button2.default, {
        classList: "",
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
      return (0, _mithril2.default)(".landing", [form.login() ? (0, _mithril2.default)(LoginForm, { mdl: mdl, data: form }) : (0, _mithril2.default)(RegisterForm, { mdl: mdl, data: form }), (0, _mithril2.default)(_Input2.default, {
        label: "Login",
        classList: "",
        id: "login-login",
        type: "checkbox",
        action: function action(e) {
          form.login(!form.login());
          console.log("register", form.login());
        },
        value: form.login()
      })]);
    }
  };
};

exports.default = Landing;
});

;require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map