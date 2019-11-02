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
require.register("App.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

var _component = require("./pages/Home/component.js");

var _component2 = _interopRequireDefault(_component);

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
    "/home": {
      onmatch: function onmatch(a, b, c) {},
      render: function render() {
        return (0, _mithril2.default)(Layout, { mdl: mdl }, (0, _mithril2.default)(_component2.default, { mdl: mdl }));
      }
    }
  };
};

exports.default = routes;
});

;require.register("Models.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imagesUrl = exports.detailsUrl = exports.searchUrl = undefined;

var _secrets = require("./secrets.js");

var baseSearchUrl = function baseSearchUrl(baseUrl) {
  return function (apiKey) {
    return function (page) {
      return function (query) {
        return baseUrl + "/search/multi?api_key=" + apiKey + "&language=en-US&query=" + query + "&page=" + page + "&include_adult=false?";
      };
    };
  };
};

var baseDetailsUrl = function baseDetailsUrl(baseUrl) {
  return function (apiKey) {
    return function (id) {
      return baseUrl + "/tv/" + id + "?api_key=" + apiKey + "&language=en-US";
    };
  };
};

var baseImagesUrl = function baseImagesUrl(baseUrl) {
  return function (apiKey) {
    return function (id) {
      return baseUrl + "/tv/" + id + "/images?api_key=" + apiKey + "&language=en-US";
    };
  };
};

var searchUrl = exports.searchUrl = baseSearchUrl(_secrets.baseUrl)(_secrets.apiKey);

var detailsUrl = exports.detailsUrl = baseDetailsUrl(_secrets.baseUrl)(_secrets.apiKey);

var imagesUrl = exports.imagesUrl = function imagesUrl(img) {
  return "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + img;
};

var state = {
  page: 1,
  query: ""
};

var Model = {
  state: state,
  data: {},
  error: {}
};

exports.default = Model;
});

;require.register("components/Calendar.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

var _Elements = require("./Elements");

var _mithrilStream = require("mithril-stream");

var _mithrilStream2 = _interopRequireDefault(_mithrilStream);

var _dateFns = require("date-fns");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

var calendarHeader = function calendarHeader() {
  return {
    view: function view() {
      return (0, _mithril2.default)("div.calendar-header", daysOfWeek.map(function (d) {
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

var Calendar = function Calendar(_ref) {
  var mdl = _ref.attrs.mdl;

  var month = mdl.State.today.getMonth();
  var year = mdl.State.today.getFullYear();
  var day = mdl.State.today.getDay();

  var state = {
    months: months,
    daysOfWeek: daysOfWeek,
    day: day,
    month: month,
    year: year,
    daysInMonth: (0, _dateFns.getDaysInMonth)(month)
  };

  console.log("month", state);

  return {
    view: function view(_ref2) {
      var _ref2$attrs = _ref2.attrs,
          mdl = _ref2$attrs.mdl,
          large = _ref2$attrs.large;
      return (0, _mithril2.default)("div.calendar", { class: large && "calendar-lg" }, [(0, _mithril2.default)("div.calendar-nav.navbar", [(0, _mithril2.default)("button.btn.btn-action.btn-link.btn-lg", {
        onclick: function onclick(e) {
          return state.month--;
        }
      }, (0, _mithril2.default)("i.icon.icon-arrow-left")), (0, _mithril2.default)("div.navbar-primary", [state.months[state.month] + " " + state.year]), (0, _mithril2.default)("button.btn.btn-action.btn-link.btn-lg", { onclick: state.month++ }, (0, _mithril2.default)("i.icon.icon-arrow-right"))]), (0, _mithril2.default)("div.calendar-container", [(0, _mithril2.default)(calendarHeader, { mdl: mdl }), (0, _mithril2.default)(calendarBody, { mdl: mdl })])]);
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
          classList = _ref2$attrs.classList,
          action = _ref2$attrs.action,
          label = _ref2$attrs.label;
      return (0, _mithril2.default)("button.btn." + classList, { onclick: action }, label);
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

var _App = require("./App.js");

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {
  var root = document.body;
  _mithril2.default.route(root, "/home", (0, _App2.default)(_Models2.default));
});
});

;require.register("pages/Home/component.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

var _search = require("./search.js");

var _search2 = _interopRequireDefault(_search);

var _results = require("./results.js");

var _results2 = _interopRequireDefault(_results);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function Home() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return (0, _mithril2.default)(".main", [(0, _mithril2.default)(_search2.default, { mdl: mdl }), (0, _mithril2.default)(_results2.default, { mdl: mdl })]);
    }
  };
};

exports.default = Home;
});

;require.register("pages/Home/fns.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatSearchData = undefined;

var _ramda = require("ramda");

var toSearchVm = function toSearchVm(_ref) {
  var original_name = _ref.original_name,
      backdrop_path = _ref.backdrop_path,
      poster_path = _ref.poster_path,
      overview = _ref.overview,
      id = _ref.id;
  return {
    original_name: original_name,
    backdrop_path: backdrop_path,
    poster_path: poster_path,
    overview: overview,
    id: id
  };
};

var formatSearchData = exports.formatSearchData = (0, _ramda.over)((0, _ramda.lensProp)("results"), (0, _ramda.map)(toSearchVm));
});

;require.register("pages/Home/results.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

var _Models = require("../../Models.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Results = function Results() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return (0, _mithril2.default)(".results.columns", mdl.data && mdl.data.results ? mdl.data.results.map(function (result) {
        return (0, _mithril2.default)(".column col-9", [(0, _mithril2.default)(".tile", [(0, _mithril2.default)(".tile-icon", (0, _mithril2.default)(".example-tile-icon", (0, _mithril2.default)("img", { src: "" + (0, _Models.imagesUrl)(result.poster_path) }))), (0, _mithril2.default)(".tile-content", [(0, _mithril2.default)("p.tile-title", result.original_name), (0, _mithril2.default)("p.tile-subtitle", result.overview)]), (0, _mithril2.default)(".tile-action", (0, _mithril2.default)("button.btn btn-primary", "Details"))])]);
      }) : []);
    }
  };
};

exports.default = Results;
});

;require.register("pages/Home/search.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

var _Models = require("../../Models.js");

var _fns = require("./fns.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Search = function Search() {
  var searchShows = function searchShows(mdl) {
    _mithril2.default.request({ url: (0, _Models.searchUrl)(mdl.state.page)(mdl.state.query) }).then(function (data) {
      mdl.data = (0, _fns.formatSearchData)(data);
    }, function (err) {
      return mdl.error = err;
    });
  };

  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return (0, _mithril2.default)(".search", (0, _mithril2.default)(".form-group", [(0, _mithril2.default)("label.form-label", { for: "search" }, "Search"), (0, _mithril2.default)("input.form-input", {
        type: "text",
        id: "search",
        placeholder: "search",
        value: mdl.state.query,
        oninput: function oninput(e) {
          mdl.state.query = e.target.value;
        },
        onchange: function onchange(e) {
          return searchShows(mdl);
        }
      })]));
    }
  };
};

exports.default = Search;
});

;require.register("secrets.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var apiKey = exports.apiKey = "1e4d78ab60660282c63379725fc9b111";

var baseUrl = exports.baseUrl = "https://api.themoviedb.org/3";
});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map