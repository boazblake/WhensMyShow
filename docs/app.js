!function(){"use strict";var t="undefined"==typeof global?self:global;if("function"!=typeof t.require){var e={},n={},r={},a={}.hasOwnProperty,u=/^\.\.?(\/|$)/,o=function(t,e){for(var n,r=[],a=(u.test(e)?t+"/"+e:e).split("/"),o=0,i=a.length;o<i;o++)n=a[o],".."===n?r.pop():"."!==n&&""!==n&&r.push(n);return r.join("/")},i=function(t){return t.split("/").slice(0,-1).join("/")},l=function(e){return function(n){var r=o(i(e),n);return t.require(r,e)}},d=function(t,e){var r=h&&h.createHot(t),a={id:t,exports:{},hot:r};return n[t]=a,e(a.exports,l(t),a),a.exports},s=function(t){return r[t]?s(r[t]):t},c=function(t,e){return s(o(i(t),e))},f=function(t,r){null==r&&(r="/");var u=s(t);if(a.call(n,u))return n[u].exports;if(a.call(e,u))return d(u,e[u]);throw new Error("Cannot find module '"+t+"' from '"+r+"'")};f.alias=function(t,e){r[e]=t};var m=/\.[^.\/]+$/,p=/\/index(\.[^\/]+)?$/,v=function(t){if(m.test(t)){var e=t.replace(m,"");a.call(r,e)&&r[e].replace(m,"")!==e+"/index"||(r[e]=t)}if(p.test(t)){var n=t.replace(p,"");a.call(r,n)||(r[n]=t)}};f.register=f.define=function(t,r){if(t&&"object"==typeof t)for(var u in t)a.call(t,u)&&f.register(u,t[u]);else e[t]=r,delete n[t],v(t)},f.list=function(){var t=[];for(var n in e)a.call(e,n)&&t.push(n);return t};var h=t._hmr&&new t._hmr(c,f,e,n);f._cache=n,f.hmr=h&&h.wrap,f.brunch=!0,t.require=f}}(),function(){var t;"undefined"==typeof window?this:window;require.register("App.js",function(t,e,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(t){return function(e,n){return e[n.route]={onmatch:function(e,r,a){n.group.includes("authenticated")&&!t.state.isAuth()&&t.route.set(m.route.get()),t.state.route=n,t.state.anchor=r.split("#")[1];var u=Boolean(t.state.anchor);n.onmatch(t,e,r,a,u)},render:function(){return n.component(t)}},e}},a=function(t){return t.Routes.reduce(r(t),{})};t["default"]=a}),require.register("Layout.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),u=r(a),o=e("ramda"),i=e("./pages/Search/SearchInput.js"),l=r(i),d=e("./pages/Home/HomeToolBar.js"),s=r(d),c=e("./components/Elements.js"),f=function(t){var e=(t.attrs.mdl,function(t){return t.route==u["default"].route.get()});return{view:function(t){var n=t.attrs.mdl;return(0,u["default"])("nav",(0,u["default"])("ul.tab tab-block",n.Routes.filter((0,o.propEq)("isNav",!0)).map(function(t,n){return(0,u["default"])("li.tab-item",{key:n,"class":e(t)&&"active"},(0,u["default"])("li",{"class":"tab-item"},(0,u["default"])("a",{href:"#!"+t.route},t.name)))})))}}},m=function(t){return"/search"===u["default"].route.get()&&(0,u["default"])(l["default"],{mdl:t})},p=function(t){return"/home"===u["default"].route.get()&&(0,u["default"])(s["default"],{mdl:t})},v=function(){return{view:function(t){var e=t.attrs.mdl;return(0,u["default"])(".header",[e.state.isLoading()&&(0,u["default"])(c.ProgressBar,{mdl:e}),(0,u["default"])("h1",e.state.route.name),(0,u["default"])(f,{mdl:e}),e.state.isLoading()&&(0,u["default"])(c.Loader),p(e),m(e)])}}},h=function(){return{view:function(t){var e=t.children;return(0,u["default"])("section.main",e)}}},g=function(){return{view:function(t){var e=t.children,n=t.attrs.mdl;return(0,u["default"])(".app",[(0,u["default"])(v,{mdl:n}),(0,u["default"])(h,{mdl:n},e)])}}};t["default"]=g}),require.register("Models.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0}),t.log=void 0;var a=e("mithril-stream"),u=r(a),o=e("./Routes.js"),i=r(o),l=e("ramda"),d=t.log=function(t){return function(e){return console.log(t,e),e}},s=function(t){return function(e){return(0,l.any)((0,l.propEq)("id",e.id),t.user.shows())}},c={paginate:{page:(0,u["default"])(1),total_pages:(0,u["default"])(0),total_results:(0,u["default"])(0)},query:(0,u["default"])(""),isLoading:(0,u["default"])(!1),loadingProgress:{max:(0,u["default"])(0),value:(0,u["default"])(0)},item:{selected:(0,u["default"])(!1),showMenu:(0,u["default"])(!1)},currentList:(0,u["default"])("Watching")},f={shows:(0,u["default"])([])},m={search:(0,u["default"])([]),user:(0,u["default"])([])},p={shows:(0,u["default"])([]),lists:(0,u["default"])(["Watching","Wishlist"])},v={log:d,Routes:i["default"],state:c,user:p,data:f,errors:m,userHasAlready:s};t["default"]=v}),require.register("Routes.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),u=r(a),o=e("./Layout.js"),i=r(o),l=e("./pages/Home/component.js"),d=r(l),s=e("./pages/Search/component.js"),c=r(s),f=e("./pages/Details/component.js"),m=r(f),p=e("ramda"),v=[{id:"home",name:"Home",route:"/home",isNav:!0,group:[],children:[],onmatch:function(t,e,n,r,a){a&&scrollToAnchor(t.state.anchor)},component:function(t){return(0,u["default"])(i["default"],{mdl:t},(0,u["default"])(d["default"],{mdl:t}))}},{id:"search",name:"Search",route:"/search",isNav:!0,group:[],children:[],onmatch:function(t,e,n,r,a){a&&scrollToAnchor(t.state.anchor)},component:function(t){return(0,u["default"])(i["default"],{mdl:t},(0,u["default"])(c["default"],{mdl:t}))}},{id:"details",name:"Details",route:"/details/:id",isNav:!1,group:[],children:[],onmatch:function(t,e,n,r,a){a&&scrollToAnchor(t.state.anchor)},component:function(t){return(0,u["default"])(i["default"],{mdl:t},(0,u["default"])(m["default"],{mdl:t}))}}],h=(0,p.flatten)([v]);t["default"]=h}),require.register("components/Calendar.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),u=r(a),o=(e("./Elements"),e("mithril-stream")),i=(r(o),e("date-fns")),l=["January","Febuary","March","April","May","June","July","August","September","October","November","December"],d=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],s=function(){return{view:function(){return(0,u["default"])("div.calendar-header",d.map(function(t){return(0,u["default"])("div.calendar-date",t)}))}}},c=function(){return{view:function(){return(0,u["default"])("div.calendar-body",[(0,u["default"])("div.calendar-date.prev-month",(0,u["default"])("button.date-item","26")),(0,u["default"])("div.calendar-date.prev-month",(0,u["default"])("button.date-item","27")),(0,u["default"])("div.calendar-date.prev-month",(0,u["default"])("button.date-item","28")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","1")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","2")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","3")),(0,u["default"])(".calendar-date.tooltip[data-tooltip='Today']",(0,u["default"])("button.date-item.date-today","4")),(0,u["default"])(".calendar-date.tooltip[data-tooltip='Not available']",(0,u["default"])("button.date-item[disabled]","5")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","6")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","7")),(0,u["default"])(".calendar-date.tooltip[data-tooltip='You have appointments']",(0,u["default"])("button.date-item.badge","8")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","9")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","10")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","11")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","12")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","13")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","14")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","15")),(0,u["default"])("div.calendar-date.calendar-range.range-start",(0,u["default"])("button.date-item","16")),(0,u["default"])("div.calendar-date.calendar-range",(0,u["default"])("button.date-item","17")),(0,u["default"])("div.calendar-date.calendar-range",(0,u["default"])("button.date-item","18")),(0,u["default"])("div.calendar-date.calendar-range",(0,u["default"])("button.date-item","19")),(0,u["default"])("div.calendar-date.calendar-range.range-end",(0,u["default"])("button.date-item","20")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","21")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","22")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","23")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","24")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","25")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","26")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","27")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","28")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","29")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","30")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","31")),(0,u["default"])("div.calendar-date.next-month",(0,u["default"])("button.date-item","1"))])}}},f=function(t){var e=t.attrs.mdl,n=e.State.today.getMonth(),r=e.State.today.getFullYear(),a=e.State.today.getDay(),o={months:l,daysOfWeek:d,day:a,month:n,year:r,daysInMonth:(0,i.getDaysInMonth)(n)};return console.log("month",o),{view:function(t){var e=t.attrs,n=e.mdl,r=e.large;return(0,u["default"])("div.calendar",{"class":r&&"calendar-lg"},[(0,u["default"])("div.calendar-nav.navbar",[(0,u["default"])("button.btn.btn-action.btn-link.btn-lg",{onclick:function(t){return o.month--}},(0,u["default"])("i.icon.icon-arrow-left")),(0,u["default"])("div.navbar-primary",[o.months[o.month]+" "+o.year]),(0,u["default"])("button.btn.btn-action.btn-link.btn-lg",{onclick:o.month++},(0,u["default"])("i.icon.icon-arrow-right"))]),(0,u["default"])("div.calendar-container",[(0,u["default"])(s,{mdl:n}),(0,u["default"])(c,{mdl:n})])])}}};t["default"]=f}),require.register("components/Elements.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0}),t.Menu=t.MenuItem=t.DropDown=t.CheckBox=t.Input=t.Button=t.ListSelector=t.NavBar=t.ProgressBar=t.Paginator=t.Loader=void 0;var a=e("mithril"),u=r(a),o=e("ramda"),i=e("../pages/fns"),l=e("../utils/http.js"),d=r(l),s=(t.Loader=function(){return{view:function(){return(0,u["default"])(".loader",[(0,u["default"])("."),(0,u["default"])(".")])}}},t.Paginator=function(){var t=function(t){return(0,i.searchShows)(t,d["default"])};return{view:function(e){var n=e.attrs.mdl,r=n.state.paginate,a=r.page,i=r.total_pages,l=r.total_results;if(l()){var d=void 0,s=(0,o.range)(1,i()+1);if(s.length>6){var c=(0,o.take)(3,s),f=(0,o.takeLast)(3,s);d=(0,o.flatten)([c,(0,u["default"])("span","..."),f])}else d=s;return(0,u["default"])("ul.pagination.navbar",[(0,u["default"])("li.page-item",{"class":1==a()?"disabled":"c-hand",onclick:function(){1!==a()&&a(a()-1),t(n)}},(0,u["default"])("a[tabindex='-1']","Previous")),d.map(function(e){return(0,u["default"])("li.page-item.c-hand",{"class":a()==e&&"active c-auto",onclick:function(){Number(e)&&(a(e),t(n))}},(0,u["default"])("a",e))}),(0,u["default"])("li.page-item",{"class":a()==i()?"disabled":"c-hand",onclick:function(){a()!==i()&&a(a()+1),t(n)}},(0,u["default"])("a","Next"))])}}}},t.ProgressBar=function(){return{view:function(t){var e=t.attrs.mdl.state.loadingProgress,n=e.value,r=e.max;return(0,u["default"])(".progressBar",(0,u["default"])("progress.progress",{max:r(),value:n()}))}}},t.NavBar=function(){return{view:function(t){var e=t.children;t.attrs.mdl;return(0,u["default"])("header",{"class":"navbar"},e.map(function(t){return(0,u["default"])("section",{"class":"navbar-section"},t)}))}}},t.ListSelector=function(){return{view:function(t){var e=t.attrs,n=e.list,r=e.action,a=e.active;return(0,u["default"])("li.menu-item",(0,u["default"])("a.btn",{"class":a&&"active",onclick:r},n))}}},t.Button=function(){return{view:function(t){var e=t.attrs,n=e.classList,r=e.action,a=e.label;return(0,u["default"])("button.btn."+n,{onclick:r},a)}}},t.Input=function(t){var e=t.attrs,n=e.type,r=e.label,a=e.action,o=e.id,i=e.placeholder;return{view:function(t){var e=t.attrs.value;return(0,u["default"])(".form-group",[(0,u["default"])("label.form-label",{"for":o},r),(0,u["default"])("input.form-input",{type:n,id:o,placeholder:i,value:e,onchange:a})])}}},t.CheckBox=function(t){var e=t.attrs,n=e.label,r=e.action,a=e.id,o=e.type;return{view:function(t){var e=t.attrs.value;return(0,u["default"])(".form-group",[(0,u["default"])("label.form-"+o,{"for":a,onclick:r},(0,u["default"])("input",{type:"checkbox",checked:e}),(0,u["default"])("i.form-icon",{id:a}),n)])}}},t.DropDown=function(t){var e=t.attrs,n=e.label,r=e.classList;return{view:function(t){var e=t.children;return(0,u["default"])(".dropdown",{"class":r},(0,u["default"])("a.btn btn-link dropdown-toggle",{href:"#",tabindex:"0"},n,(0,u["default"])("i.icon icon-caret")),e)}}},t.MenuItem=function(){return{view:function(t){var e=t.children;return(0,u["default"])("li.menu-item",e)}}});t.Menu=function(){return{view:function(t){var e=t.children;return(0,u["default"])("ul.menu",e.map(function(t){return(0,u["default"])(s,t)}))}}}}),require.register("components/Schedule.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),u=r(a),o=function(){return{view:function(t){t.attrs.mdl;return(0,u["default"])(".schedule","Schedule")}}};t["default"]=o}),require.register("initialize.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var a=e("mithril"),u=r(a),o=e("./Models.js"),i=r(o),l=e("./App.js"),d=r(l);document.addEventListener("DOMContentLoaded",function(){var t=document.body;u["default"].route(t,"/home",(0,d["default"])(i["default"]))})}),require.register("pages/Details/component.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),u=r(a),o=e("../../utils/http.js"),i=r(o),l=e("ramda"),d=e("../../components/Elements"),s=function(){return u["default"].route.get().split("/")[2]},c=function(t,e){return e.getTask(e.detailsUrl(s()))},f=function(){var t={};return{oninit:function(e){var n=e.attrs.mdl;return c(n,i["default"]).fork(n.log("e"),function(e){return t=e})},view:function(){return(0,u["default"])(".container",[(0,u["default"])("h1","DETAILS PAGE"),(0,l.isEmpty)(t)?(0,u["default"])(d.Loader):(0,u["default"])("code",(0,u["default"])("pre",JSON.stringify(t,null,4)))])}}};t["default"]=f}),require.register("pages/Home/HomeToolBar.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),u=r(a),o=e("../../components/Elements.js"),i=function(){var t=function(t,e){return t.state.currentList(e)},e=!0;return{view:function(n){var r=n.attrs.mdl;return(0,u["default"])(".dropdown",[(0,u["default"])("a.btn btn-link dropdown-toggle",{onclick:function(){return e=!0},tabindex:"0"},[r.state.currentList(),(0,u["default"])("i.icon icon-caret")]),e&&(0,u["default"])("ul.menu",r.user.lists().map(function(n,a){return(0,u["default"])(o.ListSelector,{list:n,action:function(){t(r,n),e=!1},key:a,mdl:r})}))])}}},l=function(){return{view:function(t){var e=t.attrs.mdl;return(0,u["default"])("nav.navbar",(0,u["default"])(i,{mdl:e}))}}};t["default"]=l}),require.register("pages/Home/component.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),u=r(a),o=e("../../utils/http.js"),i=r(o),l=e("../fns.js"),d=e("ramda"),s=(0,u["default"])(".container.empty",[(0,u["default"])("p.empty-title h5","You have no shows yet!"),(0,u["default"])("p.empty-subtitle","Click search to find your shows.")]),c=function(){var t=function(t){return(0,d.filter)((0,d.propEq)("status",t.state.currentList()),t.user.shows())},e=function(t,e){i["default"].deleteTask(i["default"].backendlessUrl("shows/"+t.objectId)).chain(function(t){return(0,l.getShows)(e,i["default"])}).fork(function(t){return e.log("e")(t)},function(t){return e.user.shows(t)})};return{view:function(n){var r=n.attrs.mdl;return t(r).map(function(t,n){return(0,u["default"])(".tileCard",{key:n},[(0,u["default"])("img.img-responsive.img-fit-cover",{onclick:function(){return u["default"].route.set("/details/"+t.id)},src:i["default"].imagesUrl(t.poster_path)}),(0,u["default"])("b.btn btn-action btn-error btn-s s-circle deleteIcon ",{onclick:function(){return e(t,r)}},(0,u["default"])("i.icon icon-cross"))])})}}},f=function(){return{oninit:function(t){var e=t.attrs.mdl;return(0,l.getShows)(e,i["default"]).fork(e.errors,function(t){return e.user.shows(t)})},view:function(t){var e=t.attrs.mdl;return(0,u["default"])("section.tiles",(0,d.isEmpty)(e.user.shows())?s:(0,u["default"])(c,{mdl:e}))},onbeforeremove:function(t){var e=t.attrs.mdl;return e.state.currentList("Watching")}}};t["default"]=f}),require.register("pages/Search/SearchInput.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),u=r(a),o=e("../../utils/http.js"),i=r(o),l=e("../fns.js"),d=e("../../components/Elements.js"),s=function(){return{view:function(t){var e=t.attrs.mdl;return(0,u["default"])(".searchForm",(0,u["default"])(".form-group",[(0,u["default"])("input.form-input",{type:"text",id:"search",placeholder:"search",value:e.state.query(),oninput:function(t){return e.state.query(t.target.value)},onchange:function(){return(0,l.searchShows)(e,i["default"])}}),(0,u["default"])(d.Paginator,{mdl:e})]))}}};t["default"]=s}),require.register("pages/Search/SearchResults.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),u=r(a),o=e("../../utils/http.js"),i=r(o),l=e("ramda"),d=e("../fns.js"),s=e("../../components/Elements.js"),c=function(t,e){return{body:(0,l.over)((0,l.lensProp)("status"),function(){return e},t)}},f=function(t){return function(e,n){return i["default"].postTask(i["default"].backendlessUrl("shows"),c(e,n)).chain(function(e){return(0,d.getShows)(t,i["default"])}).fork(t.errors,function(e){t.user.shows(e),t.data.shows((0,d.mergeWithCurrentList)(t.user.shows())({results:t.data.shows()}).results)})}},m=function(){return{view:function(t){var e=t.attrs,n=e.mdl,r=e.result,a=e.active;return(0,u["default"])("ul.menu",n.user.lists().map(function(t,e){return(0,u["default"])(s.ListSelector,{list:t,active:t==r.status,key:e,mdl:n,action:function(){return!a&&f(n)(r,t)}})}))}}},p=function(){return{view:function(t){var e=t.attrs,n=e.mdl,r=e.result;return(0,u["default"])(".tileCard",[(0,u["default"])("img.img-responsive.img-fit-cover",{"class":n.userHasAlready(n)(r)&&"selected",onclick:function(){return n.state.item.showMenu(r.id)},src:i["default"].imagesUrl(r.poster_path)}),n.state.item.showMenu()==r.id&&(0,u["default"])(m,{mdl:n,result:r,active:n.userHasAlready(n)(r)})])},onbeforeremove:function(){return console.log("bye")}}},v=function(){return{view:function(t){var e=t.attrs.mdl;return(0,u["default"])("section.tiles",e.data.shows()?e.data.shows().map(function(t,n){return(0,u["default"])(p,{mdl:e,result:t,key:n})}):[])}}};t["default"]=v}),require.register("pages/Search/component.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),u=r(a),o=e("./SearchResults.js"),i=r(o),l=function(){return{view:function(t){var e=t.attrs.mdl;return(0,u["default"])(".search",[(0,u["default"])(i["default"],{mdl:e})])},onbeforeremove:function(t){var e=t.attrs.mdl;e.state.query(""),e.data.shows([]),e.state.paginate.page(1),e.state.paginate.total_pages(0),e.state.paginate.total_results(0),e.state.item.showMenu(!1)}}};t["default"]=l}),require.register("pages/fns.js",function(t,e,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.searchShows=t.getShows=t.mergeWithCurrentList=t.formatSearchData=t.toSearchVm=void 0;var r=e("ramda"),a=t.toSearchVm=function(t){var e=t.name,n=t.first_air_date,r=t.poster_path,a=t.overview,u=t.id,o=t.status,i=t.objectId;return{name:e,first_air_date:n,poster_path:r,overview:a,id:u,status:o,objectId:i}},u=t.formatSearchData=(0,r.over)((0,r.lensProp)("results"),(0,r.map)(a)),o=function(t){return function(e){return e?(0,r.set)((0,r.lensProp)("status"),(0,r.prop)("status",e),t):t}},i=t.mergeWithCurrentList=function(t){return function(e){var n=e.results.map(function(e){return(0,r.compose)(o(e),(0,r.find)((0,r.propEq)("id",e.id)))(t)});return e.results=n,e}};t.getShows=function(t,e){return e.getTask(e.backendlessUrl("shows?pagesize=100")).map((0,r.map)(a))},t.searchShows=function(t,e){return e.getTask(e.searchUrl(t.state.paginate.page())(t.state.query())).map(u).map(i(t.user.shows())).fork(function(e){return t.error=e},function(e){t.state.paginate.total_pages(e.total_pages),t.state.paginate.total_results(e.total_results),t.data.shows(e.results)})}}),require.register("secrets.js",function(t,e,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.apiKey="1e4d78ab60660282c63379725fc9b111",t.tmdbAuth={Authorization:"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTRkNzhhYjYwNjYwMjgyYzYzMzc5NzI1ZmM5YjExMSIsInN1YiI6IjVkYmNjMjBjOTdhNGU2MDAxNTdjNjkxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TgL91o4VHyQo4cm3KLx6nVICyrn8E8pXDC1zMdlDFsU"},t.baseUrl="https://api.themoviedb.org/3"}),require.register("utils/animations.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function a(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}Object.defineProperty(t,"__esModule",{value:!0}),t.animateChildrenLimitsExit=t.slideModalOut=t.animate=t.animateChildrenLimitsEntrance=t.animateChildrenEntrance=t.animateSidebarEntrance=t.animateComponentEntrance=t.IsLoading=void 0;var u=e("mithril"),o=r(u);t.IsLoading=(0,o["default"])(".holder",[(0,o["default"])(".preloader",[(0,o["default"])("div"),(0,o["default"])("div"),(0,o["default"])("div"),(0,o["default"])("div"),(0,o["default"])("div"),(0,o["default"])("div"),(0,o["default"])("div")])]),t.animateComponentEntrance=function(t){return function(e){var n=e.dom;return n.style.opacity=0,setTimeout(function(){n.classList.toggle("stretchRight"),n.style.opacity=1},100*t+20)}},t.animateSidebarEntrance=function(t){var e=t.dom;e.style.opacity=0,e.classList.toggle("slideRight"),e.style.opacity=1},t.animateChildrenEntrance=function(t){var e=t.dom,n=[].concat(a(e.children));return n.map(function(t,e){t.style.opacity=0,setTimeout(function(){t.classList.toggle("slideRight"),t.style.opacity=1},10*(e+1))})},t.animateChildrenLimitsEntrance=function(t){return function(e){var n=e.dom;n.style.opacity=0,setTimeout(function(){n.classList.toggle("slideDown"),n.style.opacity=1},200*(t+1))}},t.animate=function(t){return function(e){var n=e.dom;n.style.opacity=0,setTimeout(function(){n.classList.toggle(t),n.style.opacity=1},200)}},t.slideModalOut=function(t){var e=t.dom;return new Promise(function(){return e.classList.remove("slideRight"),setTimeout(function(){e.classList.add("reverseAnimation","slideRight")},200)})},t.animateChildrenLimitsExit=function(t){var e=t.dom;return new Promise(function(){[].concat(a(e.children)).reverse().map(function(t,e){return setTimeout(function(){t.style.display="none"},100*e)})})}}),require.register("utils/helpers.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0}),t.jsonCopy=t.scrollToAnchor=t.getRoute=t.debounce=t.filterTask=t._paginate=t._direction=t._sort=t._search=t.addTerms=t.infiniteScroll=t.isEmpty=t.log=t.makeRoute=void 0;var a=e("mithril"),u=r(a),o=e("ramda"),i=e("data.task"),l=r(i),d=(t.makeRoute=(0,o.compose)((0,o.join)("-"),(0,o.split)(" "),(0,o.trim)(),(0,o.toLower)()),t.log=function(t){return function(e){return console.log(t,e),e}},t.isEmpty=function(t){return 0==t.length},t.infiniteScroll=function(t){return function(e){var n=t.state.route,r=t.data[n].data.length,a=10*r*t.state.scrollPos;e.target.scrollTop-t.state.scrollPos>=a&&t.state.scrollPos++ +e.target.scrollTop}},t.addTerms=function(t){var e=(0,o.compose)((0,o.join)(" "),o.values,(0,o.props)(["uuid","id","name"]))(t);return(0,o.assoc)("_terms",e,t)},function(t){return(0,o.compose)((0,o.test)(new RegExp(t,"i")),(0,o.prop)("name"))}),s=t._search=function(t){return(0,o.compose)((0,o.filter)(d(t)))},c=t._sort=function(t){return(0,o.sortBy)((0,o.compose)(o.toLower,toString,(0,o.prop)(t)))},f=t._direction=function(t){return"asc"==t?o.identity:o.reverse},m=t._paginate=function(t){return function(e){return function(n){return(0,o.slice)((0,o.max)(0,(0,o.min)(t,n.length)),(0,o.min)(t+e,n.length),n)}}};t.filterTask=function(t){return function(e){return function(n){return function(r){return function(a){return(0,o.compose)(l["default"].of,(0,o.map)(m(r)(a)),(0,o.map)(f(n)),(0,o.map)(c(e)),s(t))}}}}},t.debounce=function(t,e){return function(n){var r=void 0;return function(){var a=this,u=arguments,o=function(){r=void 0,e||n.apply(a,u)},i=e&&!r;clearTimeout(r),r=setTimeout(o,t),console.log(n),i&&n.apply(a,u)}}},t.getRoute=function(t){return u["default"].route.get().split("/")[t]},t.scrollToAnchor=function(t){var e=function(t){return void 0!==t&&null!==t},n=e(t)?document.getElementById(t):document.body,r=window.pageYOffset||document.documentElement.scrollTop,a=e(n)?n.getBoundingClientRect().top:0;window.scroll({top:a+r-10,left:0,behavior:"smooth"})},t.jsonCopy=function(t){return JSON.parse(JSON.stringify(t))}}),require.register("utils/http.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function a(t){t.lengthComputable&&(console.log("onprogress",t.total,t.loaded),v["default"].state.loadingProgress.max(t.total),v["default"].state.loadingProgress.value(t.loaded),m["default"].redraw())}function u(){return!1}function o(){return v["default"].state.isLoading(!0),!1}function i(){return v["default"].state.isLoading(!1),v["default"].state.loadingProgress.max(0),v["default"].state.loadingProgress.value(0),!1}Object.defineProperty(t,"__esModule",{value:!0});var l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},d=e("../secrets.js"),s=e("data.task"),c=r(s),f=e("mithril"),m=r(f),p=e("../Models.js"),v=r(p),h={config:function(t){t.onprogress=a,t.onload=u,t.onloadstart=o,t.onloadend=i}},g=function(t){return t.state.isLoading(!t.state.isLoading),m["default"].request},b=function(t){var e=t.includes("themoviedb")&&d.tmdbAuth;return{headers:l({},e)}},y=function(t){return function(e){return new c["default"](function(n,r){return g(v["default"])(t,l({},e,b(t),h)).then(r,n)})}},_=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return y(t)(l({},e,{method:"GET"}))},w=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return y(t)(l({},e,{method:"POST"}))},j=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return y(t)(l({},e,{method:"PUT"}))},M=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return y(t)(l({},e,{method:"DELETE"}))},k=function(t){return function(e){return function(n){return function(r){return t+"/search/multi?api_key="+e+"&language=en-US&query="+r+"&page="+n+"&include_adult=false"}}}},L=function(t){return function(e){return function(n){return t+"/tv/"+n+"?api_key="+e+"&language=en-US&append_to_response=recommendations,similar,latest,airing_today,on_the_air"}}},S=function(t){return function(e){return function(n){return t+"/tv/"+n+"/images?api_key="+e+"&language=en-US"}}},P="https://api.backendless.com/7F421158-889B-FD93-FF62-1ACDCD07AD00/1D9BEF3E-0CCC-D6C6-FF60-1A0B849A3E00/data/",E=function(t){return P+t},T=k(d.baseUrl)(d.apiKey),O=L(d.baseUrl)(d.apiKey),q=function(t){return"https://image.tmdb.org/t/p/w185_and_h278_bestv2/"+t},C={getTask:_,postTask:w,putTask:j,deleteTask:M,baseSearchUrl:k,baseDetailsUrl:L,baseImagesUrl:S,searchUrl:T,detailsUrl:O,imagesUrl:q,backendlessUrl:E};t["default"]=C}),require.register("utils/index.js",function(t,e,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("./animations.js");Object.keys(r).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return r[e]}})});var a=e("./helpers.js");Object.keys(a).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return a[e]}})});var u=e("./http.js");Object.keys(u).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return u[e]}})})}),require.alias("process/browser.js","process"),t=require("process"),require.register("___globals___",function(t,e,n){})}(),require("___globals___");