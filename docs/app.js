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
require.register("App.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var toRoutes = function toRoutes(mdl) {
  return function (acc, route) {
    acc[route.route] = {
      onmatch: function onmatch(args, path, fullroute) {
        if (route.group.includes("authenticated") && !mdl.state.isAuth()) {
          mdl.route.set(m.route.get());
        }
        mdl.state.route = route;
        mdl.state.anchor = path.split("#")[1];
        var isAnchor = Boolean(mdl.state.anchor);
        route.onmatch(mdl, args, path, fullroute, isAnchor);
      },
      render: function render() {
        return route.component(mdl);
      }
    };
    return acc;
  };
};

var App = function App(mdl) {
  return mdl.Routes.reduce(toRoutes(mdl), {});
};

exports.default = App;
});

;require.register("Layout.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

var _ramda = require("ramda");

var _SearchInput = require("./pages/Search/SearchInput.js");

var _SearchInput2 = _interopRequireDefault(_SearchInput);

var _HomeToolBar = require("./pages/Home/HomeToolBar.js");

var _HomeToolBar2 = _interopRequireDefault(_HomeToolBar);

var _Elements = require("./components/Elements.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavBar = function NavBar(_ref) {
  var mdl = _ref.attrs.mdl;

  var isActive = function isActive(route) {
    return route.route == _mithril2.default.route.get();
  };

  return {
    view: function view(_ref2) {
      var mdl = _ref2.attrs.mdl;

      return (0, _mithril2.default)("nav", (0, _mithril2.default)("ul.tab tab-block", mdl.Routes.filter((0, _ramda.propEq)("isNav", true)).map(function (route, idx) {
        return (0, _mithril2.default)("li.tab-item", { key: idx, class: isActive(route) && "active" }, (0, _mithril2.default)("li", { class: "tab-item" }, (0, _mithril2.default)("a", { href: "#!" + route.route }, route.name)));
      })));
    }
  };
};

var showSearchBar = function showSearchBar(mdl) {
  return _mithril2.default.route.get() === "/search" && (0, _mithril2.default)(_SearchInput2.default, { mdl: mdl });
};

var showHomeBar = function showHomeBar(mdl) {
  return _mithril2.default.route.get() === "/home" && (0, _mithril2.default)(_HomeToolBar2.default, { mdl: mdl });
};

var Header = function Header() {
  return {
    view: function view(_ref3) {
      var mdl = _ref3.attrs.mdl;
      return (0, _mithril2.default)(".header", [(0, _mithril2.default)("h1", mdl.state.route.name), (0, _mithril2.default)(NavBar, { mdl: mdl }), mdl.state.isLoading() && (0, _mithril2.default)(_Elements.ProgressBar, { mdl: mdl }), mdl.state.isLoading() && (0, _mithril2.default)(_Elements.Loader), showHomeBar(mdl), showSearchBar(mdl)]);
    }
  };
};

var Main = function Main() {
  return { view: function view(_ref4) {
      var children = _ref4.children;
      return (0, _mithril2.default)("section.main", children);
    } };
};

var Layout = function Layout() {
  return {
    view: function view(_ref5) {
      var children = _ref5.children,
          mdl = _ref5.attrs.mdl;
      return (0, _mithril2.default)(".app", [(0, _mithril2.default)(Header, { mdl: mdl }), (0, _mithril2.default)(Main, { mdl: mdl }, children)]);
    }
  };
};

exports.default = Layout;
});

;require.register("Models.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = undefined;

var _mithrilStream = require("mithril-stream");

var _mithrilStream2 = _interopRequireDefault(_mithrilStream);

var _Routes = require("./Routes.js");

var _Routes2 = _interopRequireDefault(_Routes);

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = exports.log = function log(m) {
  return function (v) {
    console.log(m, v);
    return v;
  };
};
var userHasAlready = function userHasAlready(mdl) {
  return function (result) {
    return (0, _ramda.any)((0, _ramda.propEq)("id", result.id), mdl.user.shows());
  };
};

var state = {
  paginate: {
    page: (0, _mithrilStream2.default)(1),
    total_pages: (0, _mithrilStream2.default)(0),
    total_results: (0, _mithrilStream2.default)(0)
  },
  query: (0, _mithrilStream2.default)(""),
  isLoading: (0, _mithrilStream2.default)(false),
  loadingProgress: {
    max: (0, _mithrilStream2.default)(0),
    value: (0, _mithrilStream2.default)(0)
  },
  item: {
    selected: (0, _mithrilStream2.default)(false),
    showMenu: (0, _mithrilStream2.default)(false)
  },
  currentList: (0, _mithrilStream2.default)("Watching")
};

var data = {
  shows: (0, _mithrilStream2.default)([])
};

var errors = {
  search: (0, _mithrilStream2.default)([]),
  user: (0, _mithrilStream2.default)([])
};

var user = {
  shows: (0, _mithrilStream2.default)([]),
  lists: (0, _mithrilStream2.default)(["Watching", "Wishlist"])
};

var Model = {
  log: log,
  Routes: _Routes2.default,
  state: state,
  user: user,
  data: data,
  errors: errors,
  userHasAlready: userHasAlready
};

exports.default = Model;
});

;require.register("Routes.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

var _Layout = require("./Layout.js");

var _Layout2 = _interopRequireDefault(_Layout);

var _component = require("./pages/Home/component.js");

var _component2 = _interopRequireDefault(_component);

var _component3 = require("./pages/Search/component.js");

var _component4 = _interopRequireDefault(_component3);

var _component5 = require("./pages/Details/component.js");

var _component6 = _interopRequireDefault(_component5);

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Main = [{
  id: "home",
  name: "Home",
  // icon: Icons.home,
  route: "/home",
  isNav: true,
  group: [],
  children: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor && scrollToAnchor(mdl.state.anchor);
  },
  component: function component(mdl) {
    return (0, _mithril2.default)(_Layout2.default, { mdl: mdl }, (0, _mithril2.default)(_component2.default, { mdl: mdl }));
  }
}, {
  id: "search",
  name: "Search",
  // icon: Icons.search,
  route: "/search",
  isNav: true,
  group: [],
  children: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor && scrollToAnchor(mdl.state.anchor);
  },
  component: function component(mdl) {
    return (0, _mithril2.default)(_Layout2.default, { mdl: mdl }, (0, _mithril2.default)(_component4.default, { mdl: mdl }));
  }
}, {
  id: "details",
  name: "Details",
  // icon: Icons.search,
  route: "/details/:id",
  isNav: false,
  group: [],
  children: [],
  onmatch: function onmatch(mdl, args, path, fullroute, isAnchor) {
    isAnchor && scrollToAnchor(mdl.state.anchor);
  },
  component: function component(mdl) {
    return (0, _mithril2.default)(_Layout2.default, { mdl: mdl }, (0, _mithril2.default)(_component6.default, { mdl: mdl }));
  }
}];

var Routes = (0, _ramda.flatten)([Main]);
exports.default = Routes;
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
exports.Menu = exports.MenuItem = exports.DropDown = exports.CheckBox = exports.Input = exports.Button = exports.ListSelector = exports.NavBar = exports.ProgressBar = exports.Paginator = exports.Loader = undefined;

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

var _ramda = require("ramda");

var _fns = require("../pages/fns");

var _http = require("../utils/http.js");

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loader = exports.Loader = function Loader() {
  return {
    view: function view() {
      return (0, _mithril2.default)(".loader", [(0, _mithril2.default)("."), (0, _mithril2.default)(".")]);
    }
  };
};

var Paginator = exports.Paginator = function Paginator() {
  var fetchShows = function fetchShows(mdl) {
    return (0, _fns.searchShows)(mdl, _http2.default);
  };

  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      var _mdl$state$paginate = mdl.state.paginate,
          page = _mdl$state$paginate.page,
          total_pages = _mdl$state$paginate.total_pages,
          total_results = _mdl$state$paginate.total_results;

      if (total_results()) {
        var viewModel = void 0,
            totalPages = (0, _ramda.range)(1, total_pages() + 1);

        if (totalPages.length > 6) {
          var firstThree = (0, _ramda.take)(3, totalPages);
          var lastThree = (0, _ramda.takeLast)(3, totalPages);
          viewModel = (0, _ramda.flatten)([firstThree, (0, _mithril2.default)("span", "..."), lastThree]);
        } else {
          viewModel = totalPages;
        }

        return (0, _mithril2.default)("ul.pagination.navbar", [(0, _mithril2.default)("li.page-item", {
          class: page() == 1 ? "disabled" : "c-hand",
          onclick: function onclick() {
            page() !== 1 && page(page() - 1);
            fetchShows(mdl);
          }
        }, (0, _mithril2.default)("a[tabindex='-1']", "Previous")), viewModel.map(function (p) {
          return (0, _mithril2.default)("li.page-item.c-hand", {
            class: page() == p && "active c-auto",
            onclick: function onclick() {
              if (Number(p)) {
                page(p);
                fetchShows(mdl);
              }
            }
          }, (0, _mithril2.default)("a", p));
        }), (0, _mithril2.default)("li.page-item", {
          class: page() == total_pages() ? "disabled" : "c-hand",
          onclick: function onclick() {
            page() !== total_pages() && page(page() + 1);
            fetchShows(mdl);
          }
        }, (0, _mithril2.default)("a", "Next"))]);
      }
    }
  };
};

var ProgressBar = exports.ProgressBar = function ProgressBar() {
  return {
    view: function view(_ref2) {
      var _ref2$attrs$mdl$state = _ref2.attrs.mdl.state.loadingProgress,
          value = _ref2$attrs$mdl$state.value,
          max = _ref2$attrs$mdl$state.max;

      return (0, _mithril2.default)(".progressBar", (0, _mithril2.default)("progress.progress", { max: max(), value: value() }));
    }
  };
};

var NavBar = exports.NavBar = function NavBar() {
  return {
    view: function view(_ref3) {
      var children = _ref3.children,
          mdl = _ref3.attrs.mdl;
      return (0, _mithril2.default)("header", { class: "navbar" }, children.map(function (child) {
        return (0, _mithril2.default)("section", { class: "navbar-section" }, child);
      }));
    }
  };
};

var ListSelector = exports.ListSelector = function ListSelector() {
  return {
    view: function view(_ref4) {
      var _ref4$attrs = _ref4.attrs,
          list = _ref4$attrs.list,
          action = _ref4$attrs.action,
          active = _ref4$attrs.active;

      return (0, _mithril2.default)("li.menu-item", (0, _mithril2.default)("a.btn", {
        class: active && "active",
        onclick: action
      }, list));
    }
  };
};

var Button = exports.Button = function Button() {
  return {
    view: function view(_ref5) {
      var _ref5$attrs = _ref5.attrs,
          classList = _ref5$attrs.classList,
          action = _ref5$attrs.action,
          label = _ref5$attrs.label;
      return (0, _mithril2.default)("button.btn." + classList, { onclick: action }, label);
    }
  };
};

var Input = exports.Input = function Input(_ref6) {
  var _ref6$attrs = _ref6.attrs,
      type = _ref6$attrs.type,
      label = _ref6$attrs.label,
      action = _ref6$attrs.action,
      id = _ref6$attrs.id,
      placeholder = _ref6$attrs.placeholder;

  return {
    view: function view(_ref7) {
      var value = _ref7.attrs.value;
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

var CheckBox = exports.CheckBox = function CheckBox(_ref8) {
  var _ref8$attrs = _ref8.attrs,
      label = _ref8$attrs.label,
      action = _ref8$attrs.action,
      id = _ref8$attrs.id,
      type = _ref8$attrs.type;

  return {
    view: function view(_ref9) {
      var value = _ref9.attrs.value;
      return (0, _mithril2.default)(".form-group", [(0, _mithril2.default)("label.form-" + type, { for: id, onclick: action }, (0, _mithril2.default)("input", {
        type: "checkbox",
        checked: value
      }), (0, _mithril2.default)("i.form-icon", {
        id: id
      }), label)]);
    }
  };
};

var DropDown = exports.DropDown = function DropDown(_ref10) {
  var _ref10$attrs = _ref10.attrs,
      label = _ref10$attrs.label,
      classList = _ref10$attrs.classList;

  return {
    view: function view(_ref11) {
      var children = _ref11.children;
      return (0, _mithril2.default)(".dropdown", { class: classList }, (0, _mithril2.default)("a.btn btn-link dropdown-toggle", { href: "#", tabindex: "0" }, label, (0, _mithril2.default)("i.icon icon-caret")), children);
    }
  };
};

var MenuItem = exports.MenuItem = function MenuItem() {
  return {
    view: function view(_ref12) {
      var children = _ref12.children;
      return (0, _mithril2.default)("li.menu-item", children);
    }
  };
};

var Menu = exports.Menu = function Menu() {
  return {
    view: function view(_ref13) {
      var children = _ref13.children;
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

;require.register("pages/Details/component.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

var _http = require("../../utils/http.js");

var _http2 = _interopRequireDefault(_http);

var _ramda = require("ramda");

var _Elements = require("../../components/Elements");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getId = function getId() {
  return _mithril2.default.route.get().split("/")[2];
};

var getShowDetails = function getShowDetails(mdl, http) {
  return http.getTask(http.detailsUrl(getId()));
};

var Details = function Details() {
  var data = {};
  return {
    oninit: function oninit(_ref) {
      var mdl = _ref.attrs.mdl;
      return getShowDetails(mdl, _http2.default).fork(mdl.log("e"), function (d) {
        return data = d;
      });
    },
    view: function view() {
      return (0, _mithril2.default)(".container", [(0, _mithril2.default)("h1", "DETAILS PAGE"), (0, _ramda.isEmpty)(data) ? (0, _mithril2.default)(_Elements.Loader) : (0, _mithril2.default)("code", (0, _mithril2.default)("pre", JSON.stringify(data, null, 4)))]);
    }
  };
};

exports.default = Details;
});

;require.register("pages/Home/HomeToolBar.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

var _Elements = require("../../components/Elements.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FilterLists = function FilterLists() {
  var selectList = function selectList(mdl, list) {
    return mdl.state.currentList(list);
  };
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return (0, _mithril2.default)(".dropdown", [(0, _mithril2.default)("a.btn btn-link dropdown-toggle", { tabindex: "0" }, [mdl.state.currentList(), (0, _mithril2.default)("i.icon icon-caret")]), (0, _mithril2.default)("ul.menu", mdl.user.lists().map(function (list, idx) {
        return (0, _mithril2.default)(_Elements.ListSelector, {
          list: list,
          action: function action() {
            return selectList(mdl, list);
          },
          key: idx,
          mdl: mdl
        });
      }))]);
    }
  };
};

var HomeToolBar = function HomeToolBar() {
  return {
    view: function view(_ref2) {
      var mdl = _ref2.attrs.mdl;
      return (0, _mithril2.default)("nav.navbar", (0, _mithril2.default)(FilterLists, { mdl: mdl }));
    }
  };
};

exports.default = HomeToolBar;
});

;require.register("pages/Home/component.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

var _http = require("../../utils/http.js");

var _http2 = _interopRequireDefault(_http);

var _fns = require("../fns.js");

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NoShows = (0, _mithril2.default)(".container.empty", [(0, _mithril2.default)("p.empty-title h5", "You have no shows yet!"), (0, _mithril2.default)("p.empty-subtitle", "Click search to find your shows.")]);

var ShowSelectedShows = function ShowSelectedShows() {
  var filterShowsByList = function filterShowsByList(mdl) {
    return (0, _ramda.filter)((0, _ramda.propEq)("status", mdl.state.currentList()), mdl.user.shows());
  };

  var deleteShow = function deleteShow(show, mdl) {
    _http2.default.deleteTask(_http2.default.backendlessUrl("shows/" + show.objectId)).chain(function (_) {
      return (0, _fns.getShows)(mdl, _http2.default);
    }).fork(function (e) {
      return mdl.log("e")(e);
    }, function (d) {
      return mdl.user.shows(d);
    });
  };

  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return filterShowsByList(mdl).map(function (show, idx) {
        return (0, _mithril2.default)(".tileCard", {
          key: idx
        }, [(0, _mithril2.default)("img.img-responsive.img-fit-cover", {
          onclick: function onclick() {
            return _mithril2.default.route.set("/details/" + show.id);
          },
          src: _http2.default.imagesUrl(show.poster_path)
        }), (0, _mithril2.default)("b.btn btn-action btn-error btn-s s-circle deleteIcon ", {
          onclick: function onclick() {
            return deleteShow(show, mdl);
          }
        }, (0, _mithril2.default)("i.icon icon-cross"))]);
      });
    }
  };
};

var Home = function Home() {
  return {
    oninit: function oninit(_ref2) {
      var mdl = _ref2.attrs.mdl;
      return (0, _fns.getShows)(mdl, _http2.default).fork(mdl.errors, function (d) {
        return mdl.user.shows(d);
      });
    },
    view: function view(_ref3) {
      var mdl = _ref3.attrs.mdl;
      return (0, _mithril2.default)("section.tiles", (0, _ramda.isEmpty)(mdl.user.shows()) ? NoShows : (0, _mithril2.default)(ShowSelectedShows, { mdl: mdl }));
    },
    onbeforeremove: function onbeforeremove(_ref4) {
      var mdl = _ref4.attrs.mdl;
      return mdl.state.currentList("Watching");
    }
  };
};
exports.default = Home;
});

;require.register("pages/Search/SearchInput.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

var _http = require("../../utils/http.js");

var _http2 = _interopRequireDefault(_http);

var _fns = require("../fns.js");

var _Elements = require("../../components/Elements.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchInput = function SearchInput() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return (0, _mithril2.default)(".searchForm", (0, _mithril2.default)(".form-group", [(0, _mithril2.default)("input.form-input", {
        type: "text",
        id: "search",
        placeholder: "search",
        value: mdl.state.query(),
        oninput: function oninput(e) {
          return mdl.state.query(e.target.value);
        },
        onchange: function onchange() {
          return (0, _fns.searchShows)(mdl, _http2.default);
        }
      }), (0, _mithril2.default)(_Elements.Paginator, { mdl: mdl })]));
    }
  };
};

exports.default = SearchInput;
});

;require.register("pages/Search/SearchResults.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

var _http = require("../../utils/http.js");

var _http2 = _interopRequireDefault(_http);

var _ramda = require("ramda");

var _fns = require("../fns.js");

var _Elements = require("../../components/Elements.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saveDto = function saveDto(d, value) {
  return {
    body: (0, _ramda.over)((0, _ramda.lensProp)("status"), function () {
      return value;
    }, d)
  };
};

var updateUserShows = function updateUserShows(mdl) {
  return function (result, list) {
    return _http2.default.postTask(_http2.default.backendlessUrl("shows"), saveDto(result, list)).chain(function (_) {
      return (0, _fns.getShows)(mdl, _http2.default);
    }).fork(mdl.errors, function (d) {
      mdl.user.shows(d);
      mdl.data.shows((0, _fns.mergeWithCurrentList)(mdl.user.shows())({ results: mdl.data.shows() }));
    });
  };
};

var ShowListSelection = function ShowListSelection() {
  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          mdl = _ref$attrs.mdl,
          result = _ref$attrs.result,
          active = _ref$attrs.active;

      return (0, _mithril2.default)("ul.menu", mdl.user.lists().map(function (list, idx) {
        return (0, _mithril2.default)(_Elements.ListSelector, {
          list: list,
          active: list == result.status,
          key: idx,
          mdl: mdl,
          action: function action() {
            return !active && updateUserShows(mdl)(result, list);
          }
        });
      }));
    }
  };
};

var Result = function Result() {
  return {
    view: function view(_ref2) {
      var _ref2$attrs = _ref2.attrs,
          mdl = _ref2$attrs.mdl,
          result = _ref2$attrs.result;

      return (0, _mithril2.default)(".tileCard", [(0, _mithril2.default)("img.img-responsive.img-fit-cover", {
        class: mdl.userHasAlready(mdl)(result) && "selected",
        onclick: function onclick() {
          return mdl.state.item.showMenu(result.id);
        },
        src: _http2.default.imagesUrl(result.poster_path)
      }), mdl.state.item.showMenu() == result.id && (0, _mithril2.default)(ShowListSelection, {
        mdl: mdl,
        result: result,
        active: mdl.userHasAlready(mdl)(result)
      })]);
    },
    onbeforeremove: function onbeforeremove() {
      return console.log("bye");
    }
  };
};

var SearchResults = function SearchResults() {
  return {
    view: function view(_ref3) {
      var mdl = _ref3.attrs.mdl;
      return (0, _mithril2.default)("section.tiles", mdl.data.shows() ? mdl.data.shows().map(function (result, idx) {
        return (0, _mithril2.default)(Result, { mdl: mdl, result: result, key: idx });
      }) : []);
    }
  };
};

exports.default = SearchResults;
});

;require.register("pages/Search/component.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

var _SearchInput = require("./SearchInput.js");

var _SearchInput2 = _interopRequireDefault(_SearchInput);

var _SearchResults = require("./SearchResults.js");

var _SearchResults2 = _interopRequireDefault(_SearchResults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Search = function Search() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return (0, _mithril2.default)(".search", [(0, _mithril2.default)(_SearchResults2.default, { mdl: mdl })]);
    },
    onbeforeremove: function onbeforeremove(_ref2) {
      var mdl = _ref2.attrs.mdl;

      mdl.state.query("");
      mdl.data.shows([]);
    }
  };
};

exports.default = Search;
});

;require.register("pages/fns.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchShows = exports.getShows = exports.mergeWithCurrentList = exports.formatSearchData = exports.toSearchVm = undefined;

var _ramda = require("ramda");

var toSearchVm = exports.toSearchVm = function toSearchVm(_ref) {
  var name = _ref.name,
      first_air_date = _ref.first_air_date,
      poster_path = _ref.poster_path,
      overview = _ref.overview,
      id = _ref.id,
      status = _ref.status,
      objectId = _ref.objectId;
  return {
    name: name,
    first_air_date: first_air_date,
    poster_path: poster_path,
    overview: overview,
    id: id,
    status: status,
    objectId: objectId
  };
};

var formatSearchData = exports.formatSearchData = (0, _ramda.over)((0, _ramda.lensProp)("results"), (0, _ramda.map)(toSearchVm));

var updateResults = function updateResults(result) {
  return function (show) {
    return show ? (0, _ramda.set)((0, _ramda.lensProp)("status"), (0, _ramda.prop)("status", show), result) : result;
  };
};

var mergeWithCurrentList = exports.mergeWithCurrentList = function mergeWithCurrentList(shows) {
  return function (data) {
    data.results.map(function (r) {
      return (0, _ramda.compose)(updateResults(r), (0, _ramda.find)((0, _ramda.propEq)("id", r.id)))(shows);
    });
    return data;
  };
};

var getShows = exports.getShows = function getShows(mdl, http) {
  return http.getTask(http.backendlessUrl("shows?pagesize=100")).map((0, _ramda.map)(toSearchVm));
};

var searchShows = exports.searchShows = function searchShows(mdl, http) {
  return http.getTask(http.searchUrl(mdl.state.paginate.page())(mdl.state.query())).map(formatSearchData).map(mergeWithCurrentList(mdl.user.shows())).fork(function (err) {
    return mdl.error = err;
  }, function (data) {
    mdl.state.paginate.total_pages(data.total_pages);
    mdl.state.paginate.total_results(data.total_results);
    mdl.data.shows(data.results);
  });
};
});

;require.register("secrets.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var apiKey = exports.apiKey = "1e4d78ab60660282c63379725fc9b111";
var tmdbAuth = exports.tmdbAuth = {
  Authorization: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTRkNzhhYjYwNjYwMjgyYzYzMzc5NzI1ZmM5YjExMSIsInN1YiI6IjVkYmNjMjBjOTdhNGU2MDAxNTdjNjkxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TgL91o4VHyQo4cm3KLx6nVICyrn8E8pXDC1zMdlDFsU"
};
var baseUrl = exports.baseUrl = "https://api.themoviedb.org/3";
});

;require.register("utils/animations.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animateChildrenLimitsExit = exports.slideModalOut = exports.animate = exports.animateChildrenLimitsEntrance = exports.animateChildrenEntrance = exports.animateSidebarEntrance = exports.animateComponentEntrance = exports.IsLoading = undefined;

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var IsLoading = exports.IsLoading = (0, _mithril2.default)('.holder', [(0, _mithril2.default)('.preloader', [(0, _mithril2.default)('div'), (0, _mithril2.default)('div'), (0, _mithril2.default)('div'), (0, _mithril2.default)('div'), (0, _mithril2.default)('div'), (0, _mithril2.default)('div'), (0, _mithril2.default)('div')])]);

var animateComponentEntrance = exports.animateComponentEntrance = function animateComponentEntrance(idx) {
  return function (_ref) {
    var dom = _ref.dom;

    dom.style.opacity = 0;
    return setTimeout(function () {
      dom.classList.toggle('stretchRight');
      dom.style.opacity = 1;
    }, idx * 100 + 20);
  };
};

var animateSidebarEntrance = exports.animateSidebarEntrance = function animateSidebarEntrance(_ref2) {
  var dom = _ref2.dom;

  dom.style.opacity = 0;
  dom.classList.toggle('slideRight');
  dom.style.opacity = 1;
};

var animateChildrenEntrance = exports.animateChildrenEntrance = function animateChildrenEntrance(_ref3) {
  var dom = _ref3.dom;

  var children = [].concat(_toConsumableArray(dom.children));

  return children.map(function (child, idx) {
    child.style.opacity = 0;
    setTimeout(function () {
      child.classList.toggle('slideRight');
      child.style.opacity = 1;
    }, (idx + 1) * 10);
  });
};

var animateChildrenLimitsEntrance = exports.animateChildrenLimitsEntrance = function animateChildrenLimitsEntrance(idx) {
  return function (_ref4) {
    var dom = _ref4.dom;

    dom.style.opacity = 0;
    setTimeout(function () {
      dom.classList.toggle('slideDown');
      dom.style.opacity = 1;
    }, (idx + 1) * 200);
  };
};

var animate = exports.animate = function animate(dir) {
  return function (_ref5) {
    var dom = _ref5.dom;

    dom.style.opacity = 0;
    setTimeout(function () {
      dom.classList.toggle(dir);
      dom.style.opacity = 1;
    }, 200);
  };
};

var slideModalOut = exports.slideModalOut = function slideModalOut(_ref6) {
  var dom = _ref6.dom;

  return new Promise(function () {
    dom.classList.remove('slideRight');
    return setTimeout(function () {
      dom.classList.add('reverseAnimation', 'slideRight');
    }, 200);
  });
};

var animateChildrenLimitsExit = exports.animateChildrenLimitsExit = function animateChildrenLimitsExit(_ref7) {
  var dom = _ref7.dom;
  return new Promise(function () {
    [].concat(_toConsumableArray(dom.children)).reverse().map(function (child, idx) {
      return setTimeout(function () {
        child.style.display = 'none';
      }, idx * 100);
    });
  });
};
});

;require.register("utils/helpers.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsonCopy = exports.scrollToAnchor = exports.getRoute = exports.debounce = exports.filterTask = exports._paginate = exports._direction = exports._sort = exports._search = exports.addTerms = exports.infiniteScroll = exports.isEmpty = exports.log = exports.makeRoute = undefined;

var _mithril = require('mithril');

var _mithril2 = _interopRequireDefault(_mithril);

var _ramda = require('ramda');

var _data = require('data.task');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var makeRoute = exports.makeRoute = (0, _ramda.compose)((0, _ramda.join)('-'), (0, _ramda.split)(' '), (0, _ramda.trim)(), (0, _ramda.toLower)());
var log = exports.log = function log(m) {
  return function (v) {
    console.log(m, v);
    return v;
  };
};

var isEmpty = exports.isEmpty = function isEmpty(data) {
  return data.length == 0;
};

var infiniteScroll = exports.infiniteScroll = function infiniteScroll(mdl) {
  return function (e) {
    var route = mdl.state.route;
    var length = mdl.data[route].data.length;
    var setpoint = 10 * length * mdl.state.scrollPos;
    if (e.target.scrollTop - mdl.state.scrollPos >= setpoint) {
      mdl.state.scrollPos++ + e.target.scrollTop;
    }
  };
};

var addTerms = exports.addTerms = function addTerms(item) {
  var terms = (0, _ramda.compose)((0, _ramda.join)(' '), _ramda.values, (0, _ramda.props)(['uuid', 'id', 'name']))(item);

  return (0, _ramda.assoc)('_terms', terms, item);
};

var byTerms = function byTerms(query) {
  return (0, _ramda.compose)((0, _ramda.test)(new RegExp(query, 'i')), (0, _ramda.prop)('name'));
};

var _search = exports._search = function _search(query) {
  return (0, _ramda.compose)((0, _ramda.filter)(byTerms(query)));
};

var _sort = exports._sort = function _sort(p) {
  return (0, _ramda.sortBy)((0, _ramda.compose)(_ramda.toLower, toString, (0, _ramda.prop)(p)));
};

var _direction = exports._direction = function _direction(dir) {
  return dir == 'asc' ? _ramda.identity : _ramda.reverse;
};

var _paginate = exports._paginate = function _paginate(offset) {
  return function (limit) {
    return function (data) {
      return (0, _ramda.slice)((0, _ramda.max)(0, (0, _ramda.min)(offset, data.length)), (0, _ramda.min)(offset + limit, data.length), data);
    };
  };
};

var filterTask = exports.filterTask = function filterTask(query) {
  return function (prop) {
    return function (direction) {
      return function (offset) {
        return function (limit) {
          return (0, _ramda.compose)(_data2.default.of, (0, _ramda.map)(_paginate(offset)(limit)), (0, _ramda.map)(_direction(direction)), (0, _ramda.map)(_sort(prop)), _search(query));
        };
      };
    };
  };
};

var debounce = exports.debounce = function debounce(wait, now) {
  return function (fn) {
    var timeout = undefined;
    return function () {
      var context = this;
      var args = arguments;
      var later = function later() {
        timeout = undefined;
        if (!now) fn.apply(context, args);
      };
      var callNow = now && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      console.log(fn);
      if (callNow) fn.apply(context, args);
    };
  };
};

var getRoute = exports.getRoute = function getRoute(int) {
  return _mithril2.default.route.get().split('/')[int];
};

var scrollToAnchor = exports.scrollToAnchor = function scrollToAnchor(anchor) {
  var is = function is(el) {
    return el !== undefined && el !== null;
  };

  //if you pass an undefined anchor it will scroll to the top of the body
  var targetEl = is(anchor) ? document.getElementById(anchor) : document.body;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var target = is(targetEl) ? targetEl.getBoundingClientRect().top : 0;
  window.scroll({
    top: target + scrollTop - 10,
    left: 0,
    behavior: 'smooth'
  });
};

var jsonCopy = exports.jsonCopy = function jsonCopy(src) {
  return JSON.parse(JSON.stringify(src));
};
});

;require.register("utils/http.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _secrets = require("../secrets.js");

var _data = require("data.task");

var _data2 = _interopRequireDefault(_data);

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

var _Models = require("../Models.js");

var _Models2 = _interopRequireDefault(_Models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function onProgress(e) {
  if (e.lengthComputable) {
    console.log("onprogress", e.total, e.loaded);
    _Models2.default.state.loadingProgress.max(e.total);
    _Models2.default.state.loadingProgress.value(e.loaded);
    _mithril2.default.redraw();
  }
}

function onLoad() {
  return false;
}

function onLoadStart() {
  _Models2.default.state.isLoading(true);
  return false;
}
function onLoadEnd() {
  _Models2.default.state.isLoading(false);
  _Models2.default.state.loadingProgress.max(0);
  _Models2.default.state.loadingProgress.value(0);
  return false;
}

var xhrProgress = {
  config: function config(xhr) {
    // console.log(xhr)
    xhr.onprogress = onProgress;
    xhr.onload = onLoad;
    xhr.onloadstart = onLoadStart;
    xhr.onloadend = onLoadEnd;
  }
};

var _http = function _http(mdl) {
  mdl.state.isLoading(!mdl.state.isLoading);
  return _mithril2.default.request;
};

var headers = function headers(url) {
  var tmdbBearerToken = url.includes("themoviedb") && _secrets.tmdbAuth;
  return {
    headers: _extends({}, tmdbBearerToken)
  };
};

var _task = function _task(url) {
  return function (args) {
    return new _data2.default(function (rej, res) {
      return _http(_Models2.default)(url, _extends({}, args, headers(url), xhrProgress)).then(res, rej);
    });
  };
};

var getTask = function getTask(url) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _task(url)(_extends({}, args, {
    method: "GET"
  }));
};
var postTask = function postTask(url) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _task(url)(_extends({}, args, {
    method: "POST"
  }));
};
var putTask = function putTask(url) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _task(url)(_extends({}, args, {
    method: "PUT"
  }));
};
var deleteTask = function deleteTask(url) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _task(url)(_extends({}, args, {
    method: "DELETE"
  }));
};

var baseSearchUrl = function baseSearchUrl(baseUrl) {
  return function (apiKey) {
    return function (page) {
      return function (query) {
        return baseUrl + "/search/multi?api_key=" + apiKey + "&language=en-US&query=" + query + "&page=" + page + "&include_adult=false";
      };
    };
  };
};

var baseDetailsUrl = function baseDetailsUrl(baseUrl) {
  return function (apiKey) {
    return function (id) {
      return baseUrl + "/tv/" + id + "?api_key=" + apiKey + "&language=en-US&append_to_response=recommendations,similar,latest,airing_today,on_the_air";
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

var backEndlessBaseUrl = "https://api.backendless.com/7F421158-889B-FD93-FF62-1ACDCD07AD00/1D9BEF3E-0CCC-D6C6-FF60-1A0B849A3E00/data/";

var backendlessUrl = function backendlessUrl(url) {
  return backEndlessBaseUrl + url;
};

// const shows = (shows) => `data/${shows}?pagesize=100`

var searchUrl = baseSearchUrl(_secrets.baseUrl)(_secrets.apiKey);

var detailsUrl = baseDetailsUrl(_secrets.baseUrl)(_secrets.apiKey);

var imagesUrl = function imagesUrl(img) {
  return "https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + img;
};

var http = {
  getTask: getTask,
  postTask: postTask,
  putTask: putTask,
  deleteTask: deleteTask,
  baseSearchUrl: baseSearchUrl,
  baseDetailsUrl: baseDetailsUrl,
  baseImagesUrl: baseImagesUrl,
  searchUrl: searchUrl,
  detailsUrl: detailsUrl,
  imagesUrl: imagesUrl,
  backendlessUrl: backendlessUrl
};

exports.default = http;
});

;require.register("utils/index.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _animations = require("./animations.js");

Object.keys(_animations).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _animations[key];
    }
  });
});

var _helpers = require("./helpers.js");

Object.keys(_helpers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _helpers[key];
    }
  });
});

var _http = require("./http.js");

Object.keys(_http).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _http[key];
    }
  });
});
});

;require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map