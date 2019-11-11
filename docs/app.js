!function(){"use strict";var t="undefined"==typeof global?self:global;if("function"!=typeof t.require){var e={},n={},r={},a={}.hasOwnProperty,u=/^\.\.?(\/|$)/,o=function(t,e){for(var n,r=[],a=(u.test(e)?t+"/"+e:e).split("/"),o=0,i=a.length;o<i;o++)n=a[o],".."===n?r.pop():"."!==n&&""!==n&&r.push(n);return r.join("/")},i=function(t){return t.split("/").slice(0,-1).join("/")},s=function(e){return function(n){var r=o(i(e),n);return t.require(r,e)}},l=function(t,e){var r=h&&h.createHot(t),a={id:t,exports:{},hot:r};return n[t]=a,e(a.exports,s(t),a),a.exports},d=function(t){return r[t]?d(r[t]):t},c=function(t,e){return d(o(i(t),e))},f=function(t,r){null==r&&(r="/");var u=d(t);if(a.call(n,u))return n[u].exports;if(a.call(e,u))return l(u,e[u]);throw new Error("Cannot find module '"+t+"' from '"+r+"'")};f.alias=function(t,e){r[e]=t};var m=/\.[^.\/]+$/,p=/\/index(\.[^\/]+)?$/,v=function(t){if(m.test(t)){var e=t.replace(m,"");a.call(r,e)&&r[e].replace(m,"")!==e+"/index"||(r[e]=t)}if(p.test(t)){var n=t.replace(p,"");a.call(r,n)||(r[n]=t)}};f.register=f.define=function(t,r){if(t&&"object"==typeof t)for(var u in t)a.call(t,u)&&f.register(u,t[u]);else e[t]=r,delete n[t],v(t)},f.list=function(){var t=[];for(var n in e)a.call(e,n)&&t.push(n);return t};var h=t._hmr&&new t._hmr(c,f,e,n);f._cache=n,f.hmr=h&&h.wrap,f.brunch=!0,t.require=f}}(),function(){var t;"undefined"==typeof window?this:window;require.register("App.js",function(t,e,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(t){return function(e,n){return e[n.route]={onmatch:function(e,r,a){n.group.includes("authenticated")&&!t.state.isAuth()&&t.route.set(m.route.get()),t.state.route=n,t.state.anchor=r.split("#")[1];var u=Boolean(t.state.anchor);n.onmatch(t,e,r,a,u)},render:function(){return n.component(t)}},e}},a=function(t){return t.Routes.reduce(r(t),{})};t["default"]=a}),require.register("Http.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function a(t){t.lengthComputable&&(p["default"].state.loadingProgress.max(t.total),p["default"].state.loadingProgress.value(t.loaded),m.redraw())}function u(){return!1}function o(){return p["default"].state.isLoading(!0),!1}function i(){return p["default"].state.isLoading(!1),p["default"].state.loadingProgress.max(0),p["default"].state.loadingProgress.value(0),!1}Object.defineProperty(t,"__esModule",{value:!0});var s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},l=e("./secrets.js"),d=e("data.task"),c=r(d),f=e("./Models.js"),p=r(f),v={config:function(t){t.onprogress=a,t.onload=u,t.onloadstart=o,t.onloadend=i}},h=function(t){return t.state.isLoading(!t.state.isLoading),m.request},g=function(t,e){var n={"Content-Type":"application/json;charset=utf-8"}&&["Get","POST","PUT","PATCH"].includes(e.method);return{headers:s({},n)}},b=function(t){return function(e){return new c["default"](function(n,r){return h(p["default"])(t,s({},e,g(t,e),v)).then(r,n)})}},w=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return b(t)(s({},e,{method:"GET"}))},y=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return b(t)(s({},e,{method:"POST"}))},_=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return console.log(e),b(t)(s({},e,{method:"PUT"}))},k=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return b(t)(s({},e,{method:"DELETE"}))},j="https://api.backendless.com/7F421158-889B-FD93-FF62-1ACDCD07AD00/1D9BEF3E-0CCC-D6C6-FF60-1A0B849A3E00/data/",S=function(t){return function(e){return t+"/search/shows?q="+e}},M=function(t){return function(e){return t+"/shows/"+e}},T=function(t){return j+t},P=function(t){return S(l.tvMazeBaseUrl)(t)},I=function(t){return M(l.tvMazeBaseUrl)(t)},E={getTask:w,postTask:y,putTask:_,deleteTask:k,searchUrl:P,tvMazeDetailsUrl:I,backendlessUrl:T};t["default"]=E}),require.register("Init.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var a=e("mithril"),u=r(a),o=e("./Models.js"),i=r(o),s=e("./App.js"),l=r(s);"serviceWorker"in navigator,document.addEventListener("DOMContentLoaded",function(){var t=document.body;u["default"].route(t,"/home",(0,l["default"])(i["default"]))})}),require.register("Layout.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),u=r(a),o=e("ramda"),i=e("./pages/Search-Input.js"),s=r(i),l=e("./pages/Home-ToolBar.js"),d=r(l),c=e("./components/Elements.js"),f=function(t){var e=(t.attrs.mdl,function(t){return t.route==u["default"].route.get()});return{view:function(t){var n=t.attrs.mdl;return(0,u["default"])("nav",(0,u["default"])("ul.tab tab-block",n.Routes.filter((0,o.propEq)("isNav",!0)).map(function(t,n){return(0,u["default"])("li.tab-item",{key:n,"class":e(t)&&"active"},(0,u["default"])("li",{"class":"tab-item"},(0,u["default"])("a",{href:"#!"+t.route},t.name)))})))}}},m=function(t){return"/search"===u["default"].route.get()&&(0,u["default"])(s["default"],{mdl:t})},p=function(t){return"/home"===u["default"].route.get()&&(0,u["default"])(d["default"],{mdl:t})},v=function(){return{view:function(t){var e=t.attrs.mdl;return(0,u["default"])(".header",[e.state.isLoading()&&(0,u["default"])(c.ProgressBar,{mdl:e}),(0,u["default"])(f,{mdl:e}),e.state.isLoading()&&(0,u["default"])(c.Loader),p(e),m(e)])}}},h=function(){return{view:function(t){var e=t.children;return(0,u["default"])("section.main",e)}}},g=function(){return{view:function(t){var e=t.children,n=t.attrs.mdl;return(0,u["default"])(".app",[(0,u["default"])(v,{mdl:n}),(0,u["default"])(h,{mdl:n},e)])}}};t["default"]=g}),require.register("Models.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril-stream"),u=r(a),o=e("./Routes.js"),i=r(o),s={paginate:{page:(0,u["default"])(1),total_pages:(0,u["default"])(0),total_results:(0,u["default"])(0)},query:(0,u["default"])(""),isLoading:(0,u["default"])(!1),loadingProgress:{max:(0,u["default"])(null),value:(0,u["default"])(null)},searchItem:{showMenu:(0,u["default"])(!1)},details:{selected:(0,u["default"])(null)},currentList:(0,u["default"])("Watching")},l={shows:(0,u["default"])([]),details:(0,u["default"])(null)},d={details:(0,u["default"])(null),search:(0,u["default"])(null),user:(0,u["default"])(null)},c={shows:(0,u["default"])([]),lists:(0,u["default"])(["Watching","Wishlist"])},f={Routes:i["default"],state:s,user:c,data:l,errors:d};t["default"]=f}),require.register("Routes.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),u=r(a),o=e("./Layout.js"),i=r(o),s=e("./pages/Home-Page.js"),l=r(s),d=e("./pages/Search-Page.js"),c=r(d),f=e("./pages/Details-Page.js"),m=r(f),p=e("ramda"),v=[{id:"home",name:"Home",route:"/home",isNav:!0,group:[],children:[],onmatch:function(t,e,n,r,a){a&&scrollToAnchor(t.state.anchor)},component:function(t){return(0,u["default"])(i["default"],{mdl:t},(0,u["default"])(l["default"],{mdl:t}))}},{id:"search",name:"Search",route:"/search",isNav:!0,group:[],children:[],onmatch:function(t,e,n,r,a){a&&scrollToAnchor(t.state.anchor)},component:function(t){return(0,u["default"])(i["default"],{mdl:t},(0,u["default"])(c["default"],{mdl:t}))}},{id:"details",name:"Details",route:"/details/:id",isNav:!1,group:[],children:[],onmatch:function(t,e,n,r,a){a&&scrollToAnchor(t.state.anchor)},component:function(t){return(0,u["default"])(i["default"],{mdl:t},(0,u["default"])(m["default"],{mdl:t}))}}],h=(0,p.flatten)([v]);t["default"]=h}),require.register("components/Calendar.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),u=r(a),o=(e("./Elements"),e("mithril-stream")),i=(r(o),e("date-fns")),s=["January","Febuary","March","April","May","June","July","August","September","October","November","December"],l=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],d=function(){return{view:function(){return(0,u["default"])("div.calendar-header",l.map(function(t){return(0,u["default"])("div.calendar-date",t)}))}}},c=function(){return{view:function(){return(0,u["default"])("div.calendar-body",[(0,u["default"])("div.calendar-date.prev-month",(0,u["default"])("button.date-item","26")),(0,u["default"])("div.calendar-date.prev-month",(0,u["default"])("button.date-item","27")),(0,u["default"])("div.calendar-date.prev-month",(0,u["default"])("button.date-item","28")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","1")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","2")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","3")),(0,u["default"])(".calendar-date.tooltip[data-tooltip='Today']",(0,u["default"])("button.date-item.date-today","4")),(0,u["default"])(".calendar-date.tooltip[data-tooltip='Not available']",(0,u["default"])("button.date-item[disabled]","5")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","6")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","7")),(0,u["default"])(".calendar-date.tooltip[data-tooltip='You have appointments']",(0,u["default"])("button.date-item.badge","8")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","9")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","10")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","11")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","12")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","13")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","14")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","15")),(0,u["default"])("div.calendar-date.calendar-range.range-start",(0,u["default"])("button.date-item","16")),(0,u["default"])("div.calendar-date.calendar-range",(0,u["default"])("button.date-item","17")),(0,u["default"])("div.calendar-date.calendar-range",(0,u["default"])("button.date-item","18")),(0,u["default"])("div.calendar-date.calendar-range",(0,u["default"])("button.date-item","19")),(0,u["default"])("div.calendar-date.calendar-range.range-end",(0,u["default"])("button.date-item","20")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","21")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","22")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","23")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","24")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","25")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","26")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","27")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","28")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","29")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","30")),(0,u["default"])("div.calendar-date",(0,u["default"])("button.date-item","31")),(0,u["default"])("div.calendar-date.next-month",(0,u["default"])("button.date-item","1"))])}}},f=function(t){var e=t.attrs.mdl,n=e.State.today.getMonth(),r=e.State.today.getFullYear(),a=e.State.today.getDay(),o={months:s,daysOfWeek:l,day:a,month:n,year:r,daysInMonth:(0,i.getDaysInMonth)(n)};return console.log("month",o),{view:function(t){var e=t.attrs,n=e.mdl,r=e.large;return(0,u["default"])("div.calendar",{"class":r&&"calendar-lg"},[(0,u["default"])("div.calendar-nav.navbar",[(0,u["default"])("button.btn.btn-action.btn-link.btn-lg",{onclick:function(t){return o.month--}},(0,u["default"])("i.icon.icon-arrow-left")),(0,u["default"])("div.navbar-primary",[o.months[o.month]+" "+o.year]),(0,u["default"])("button.btn.btn-action.btn-link.btn-lg",{onclick:o.month++},(0,u["default"])("i.icon.icon-arrow-right"))]),(0,u["default"])("div.calendar-container",[(0,u["default"])(d,{mdl:n}),(0,u["default"])(c,{mdl:n})])])}}};t["default"]=f}),require.register("components/Elements.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0}),t.Menu=t.MenuItem=t.DropDown=t.CheckBox=t.Input=t.Button=t.ListSelector=t.NavBar=t.ProgressBar=t.Paginator=t.Loader=void 0;var a=e("mithril"),u=r(a),o=e("ramda"),i=(t.Loader=function(){return{view:function(){return(0,u["default"])(".loader",[(0,u["default"])("."),(0,u["default"])(".")])}}},t.Paginator=function(){return{view:function(t){var e=t.attrs,n=e.mdl,r=e.paginateFn,a=n.state.paginate,i=a.page,s=a.total_pages,l=a.total_results;if(l()){var d=void 0,c=(0,o.range)(1,s()+1);if(c.length>6){var f=(0,o.take)(3,c),m=(0,o.takeLast)(3,c);d=(0,o.flatten)([f,(0,u["default"])("span","..."),m])}else d=c;return(0,u["default"])("ul.pagination.navbar",[(0,u["default"])("li.page-item",{"class":1==i()?"disabled":"c-hand",onclick:function(){1!==i()&&i(i()-1)&&r(n)}},(0,u["default"])("a[tabindex='-1']","Previous")),d.map(function(t){return(0,u["default"])("li.page-item.c-hand",{"class":i()==t&&"active c-auto",onclick:function(){Number(t)&&t!==i()&&(i(t),r(n))}},(0,u["default"])("a",t))}),(0,u["default"])("li.page-item",{"class":i()==s()?"disabled":"c-hand",onclick:function(){i()<s()&&i(i()+1)&&r(n)}},(0,u["default"])("a","Next"))])}}}},t.ProgressBar=function(){return{view:function(t){var e=t.attrs.mdl.state.loadingProgress,n=e.value,r=e.max;return(0,u["default"])(".progressBar",(0,u["default"])("progress.progress",{max:r(),value:n()}))}}},t.NavBar=function(){return{view:function(t){var e=t.children;t.attrs.mdl;return(0,u["default"])("header",{"class":"navbar"},e.map(function(t){return(0,u["default"])("section",{"class":"navbar-section"},t)}))}}},t.ListSelector=function(){return{view:function(t){var e=t.attrs,n=e.list,r=e.action,a=e.active;return(0,u["default"])("li.menu-item",(0,u["default"])("a.btn",{"class":a&&"active",onclick:r},n))}}},t.Button=function(){return{view:function(t){var e=t.attrs,n=e.classList,r=e.action,a=e.label;return(0,u["default"])("button.btn."+n,{onclick:r},a)}}},t.Input=function(t){var e=t.attrs,n=e.type,r=e.label,a=e.action,o=e.id,i=e.placeholder;return{view:function(t){var e=t.attrs.value;return(0,u["default"])(".form-group",[(0,u["default"])("label.form-label",{"for":o},r),(0,u["default"])("input.form-input",{type:n,id:o,placeholder:i,value:e,onchange:a})])}}},t.CheckBox=function(t){var e=t.attrs,n=e.label,r=e.action,a=e.id,o=e.type;return{view:function(t){var e=t.attrs.value;return(0,u["default"])(".form-group",[(0,u["default"])("label.form-"+o,{"for":a,onclick:r},(0,u["default"])("input",{type:"checkbox",checked:e}),(0,u["default"])("i.form-icon",{id:a}),n)])}}},t.DropDown=function(t){var e=t.attrs,n=e.label,r=e.classList;return{view:function(t){var e=t.children;return(0,u["default"])(".dropdown",{"class":r},(0,u["default"])("a.btn btn-link dropdown-toggle",{href:"#",tabindex:"0"},n,(0,u["default"])("i.icon icon-caret")),e)}}},t.MenuItem=function(){return{view:function(t){var e=t.children;return(0,u["default"])("li.menu-item",e)}}});t.Menu=function(){return{view:function(t){var e=t.children;return(0,u["default"])("ul.menu",e.map(function(t){return(0,u["default"])(i,t)}))}}}}),require.register("components/Schedule.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),u=r(a),o=function(){return{view:function(t){t.attrs.mdl;return(0,u["default"])(".schedule","Schedule")}}};t["default"]=o}),require.register("pages/Details-Page.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("../Http.js"),u=r(a),o=e("ramda"),i=e("../components/Elements"),s=e("./fns.js"),l=function(t,e){return(0,s.updateShowDetailsTask)(u["default"])(t)(e).fork((0,s.onError)(t)("details"),t.data.details)},d=function(){var t=void 0,e=function(e){return function(n){return(0,s.getEpisodeTask)(u["default"])(n).fork((0,s.onError)(e)("episodes"),function(e){return t=e})}};return{oninit:function(t){var n=t.attrs,r=n.mdl,a=n.eps;return e(r)(a)},view:function(e){var n=e.attrs;n.mdl,n.eps;return t&&m(".episode.column",[m("img.img-responsive.img-fit-cover",{src:t.image}),m(h,{label:t.name+":  ",text:t.airdate}),m(h,{label:"Season - Ep:  ",text:t.season+" - "+t.number})])}}},c=function(){var t=!0;return{view:function(e){var n=e.attrs,r=n.mdl,a=n.list;return m(".dropdown",[m("a.btn btn-link dropdown-toggle",{onclick:function(){return t=!0},tabindex:"0"},[a,m("i.icon icon-caret")]),t&&m("ul.menu",r.user.lists().map(function(e,n){return m(i.ListSelector,{list:e,action:function(){l(r,{listStatus:e}),t=!1},key:n,mdl:r})}))])}}},f=function(t){return function(e){return(0,s.deleteShowTask)(u["default"])(e.objectId).fork((0,s.onError)(t)("details"),function(e){m.route.set("/home"),t.user.shows(e)})}},p=function(){return m.route.param().id},v=function(t){return function(e){return(0,s.getShowDetailsTask)(e)(t)(p()).fork(function(t){return e.errors.details((0,s.formatError)(t))},e.data.details)}},h=function(){return{view:function(t){var e=t.attrs,n=e.label,r=e.text;return m(".formGroup",[m("strong",n),r])}}},g=function(){var t=!1;return{view:function(e){var n=e.attrs,r=n.show,a=n.mdl;return m(".menu.columns",[m("div.form-group.col-6",[m(h,{label:r.name}),m("img.img-responsive.img-fit-cover",{src:r.image}),m("b.btn btn-action btn-error btn-s s-circle deleteIcon ",{onclick:function(){return f(a)(r)}},m("i.icon icon-cross")),(r.network||r.webChannel)&&m(h,{label:"Channel: ",text:r.network||r.webChannel}),m(h,{label:"Status:  ",text:r.status}),m(h,{label:"Genre:  ",text:r.genre})]),m("div.form-group.col-6",[m(c,{mdl:a,list:r.listStatus}),m("label.form-label[for='notes']","Notes"),m("textarea.form-input[id='notes'][placeholder='Notes'][rows='10']",{value:r.notes,oninput:function(t){return r.notes=t.target.value}}),m(i.Button,{classList:"",action:function(){return l(a,{notes:r.notes})},label:"Save Notes"})]),m(".accordian.columns.col-12",{onclick:function(){return t=!t}},m("a.h2","Episodes"),m(".accordion-body",t&&r.links.map(function(t,e){return m(d,{mdl:a,eps:t,key:e})})))])}}},b=function(){return{oninit:function(t){var e=t.attrs.mdl;v(u["default"])(e)},view:function(t){var e=t.attrs.mdl;return m(".container",[(0,o.isNil)(e.data.details())?m(i.Loader):m(g,{mdl:e,show:e.data.details()}),null!==e.errors.details()&&m(".toast.toast-error",[m("p",[e.errors.details().response.status_message,m("b.btn btn-action btn-error btn-s s-circle deleteIcon ",{onclick:function(){return f(e)(e.data.details())}},m("i.icon icon-cross"))]),m("p","Choose a different show")])])},onbeforeremove:function(t){var e=t.attrs.mdl;e.errors.details(null),e.data.details(null),e.state.details.selected(null)}}};t["default"]=b}),require.register("pages/Home-Page.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("../Http.js"),u=r(a),o=e("./fns.js"),i=e("ramda"),s=m(".container.empty",[m("p.empty-title h5","You have no shows yet!"),m("p.empty-subtitle","Click search to find your shows.")]),l=function(t){return function(e){return(0,o.getShows)(e).fork(t.errors,t.user.shows)}},d=function(){var t=function(t){return function(e){t.state.details.selected(e.objectId),m.route.set("/details/"+e.objectId)}};return{view:function(e){var n=e.attrs.mdl;return(0,o.filterShowsByListType)(n).map(function(e,r){return m(".tileCard",{key:r},m("img.img-responsive.img-fit-cover",{onclick:function(){return t(n)(e)},src:e.image}))})}}},c=function(){return{oninit:function(t){var e=t.attrs.mdl;return l(e)(u["default"])},view:function(t){var e=t.attrs.mdl;return m("section.tiles",(0,i.isEmpty)(e.user.shows())?s:m(d,{mdl:e}))}}};t["default"]=c}),require.register("pages/Home-ToolBar.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),u=r(a),o=e("../components/Elements.js"),i=function(){var t=function(t,e){return t.state.currentList(e)},e=!0;return{view:function(n){var r=n.attrs.mdl;return(0,u["default"])(".dropdown",[(0,u["default"])("a.btn btn-link dropdown-toggle",{onclick:function(){return e=!0},tabindex:"0"},[r.state.currentList(),(0,u["default"])("i.icon icon-caret")]),e&&(0,u["default"])("ul.menu",r.user.lists().map(function(n,a){return(0,u["default"])(o.ListSelector,{list:n,action:function(){t(r,n),e=!1},key:a,mdl:r})}))])}}},s=function(){return{view:function(t){var e=t.attrs.mdl;return(0,u["default"])("nav.navbar",(0,u["default"])(i,{mdl:e}))}}};t["default"]=s}),require.register("pages/Search-Input.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),u=r(a),o=e("../Http.js"),i=r(o),s=e("./fns.js"),l=function(){var t=function(t){return(0,s.searchShowsTask)(t)(i["default"]).fork((0,s.onError)(t)("search"),t.data.shows)};return{view:function(e){var n=e.attrs.mdl;return(0,u["default"])(".searchForm",(0,u["default"])(".form-group",[(0,u["default"])("input.form-input",{type:"text",id:"search",placeholder:"search",value:n.state.query(),oninput:function(t){return n.state.query(t.target.value)},onchange:function(){return t(n)}})]))}}};t["default"]=l}),require.register("pages/Search-Page.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),u=r(a),o=e("./Search-Results.js"),i=r(o),s=function(){return{view:function(t){var e=t.attrs.mdl;return(0,u["default"])(".search",[(0,u["default"])(i["default"],{mdl:e})])},onbeforeremove:function(t){var e=t.attrs.mdl;e.state.query(""),e.data.shows([]),e.state.paginate.page(1),e.state.paginate.total_pages(0),e.state.paginate.total_results(0),e.state.searchItem.showMenu(!1)}}};t["default"]=s}),require.register("pages/Search-Results.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),u=r(a),o=e("../Http.js"),i=r(o),s=e("./fns.js"),l=e("../components/Elements.js"),d=function(t){return function(e){t.user.shows(e),t.data.shows((0,s.updateShowStatus)(t.user.shows())(t.data.shows()))}},c=function(t){return function(e,n){return(0,s.updateUserShowsTask)(i["default"])(e)(n).fork((0,s.onError)(t)("search"),d(t))}},f=function(t){return function(e,n){return(0,s.addUserShowsTask)(i["default"])(t)(e)(n).fork((0,s.onError)(t)("search"),d(t))}},m=function(){return{view:function(t){var e=t.attrs,n=e.mdl,r=e.result;return(0,u["default"])("ul.menu",n.user.lists().map(function(t,e){return(0,u["default"])(l.ListSelector,{list:t,active:t==r.listStatus,key:e,mdl:n,action:function(){r.listStatus!=t&&(void 0==r.listStatus?f(n)(r,t):c(n)(r,t))}})}))}}},p=function(){return{view:function(t){var e=t.attrs,n=e.mdl,r=e.result;return(0,u["default"])(".menu",[(0,u["default"])("img.img-responsive.img-fit-cover",{"class":(0,s.propIsDefined)("objectId")(r)&&"selected",onclick:function(){return n.state.searchItem.showMenu(r.tvmazeId)},src:r.image}),(0,s.showListSelection)(n)(r)&&(0,u["default"])(m,{mdl:n,result:r})])}}},v=function(){return{view:function(t){var e=t.attrs.mdl;return(0,u["default"])("section.tiles",e.data.shows()?e.data.shows().map(function(t,n){return(0,u["default"])(p,{mdl:e,result:t,key:n})}):[])}}};t["default"]=v}),require.register("pages/fns.js",function(t,e,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getEpisodeTask=t.filterShowsByListType=t.getShowDetailsTask=t.updateShowDetailsTask=t.deleteShowTask=t.updateUserShowsTask=t.addUserShowsTask=t.toDto=t.showListSelection=t.propIsDefined=t.searchShowsTask=t.getShows=t.updateShowStatus=t.onError=t.toDbModel=t.toSearchViewModel=t.formatError=t.log=void 0;var r=e("ramda"),a=(t.log=function(t){return function(e){return console.log(t,e),e}},t.formatError=function(t){return JSON.parse(JSON.stringify(t))},function(t){return(0,r.without)([void 0],[(0,r.view)((0,r.lensPath)(["previousepisode","href"]),t),(0,r.view)((0,r.lensPath)(["nextepisode","href"]),t)])}),u=function(t){var e=t.name,n=t.season,r=t.number,u=t.airdate,o=t.image,s=t._links;return{name:e,season:n,number:r,airdate:u,image:o&&(i(o.original)||i(o.medium)),links:a(s)}},o=function(t){var e=t.image,n=t.tvmazeId,u=t.objectId,o=t.listStatus,i=t.name,s=t.notes;return function(t){var l=t.webChannel,d=t.network,c=t.status,f=t.genres,m=t.premiered,p=t.summary,v=t._links;return{name:i,notes:s,genre:(0,r.join)(" ",f),premiered:m,summary:p,links:a(v),image:e,tvmazeId:n,objectId:u,listStatus:o,webChannel:l&&l.name,network:d&&d.name,status:c}}},i=(0,r.replace)("http","https"),s=t.toSearchViewModel=function(t){var e=t.name,n=t.image,r=t.id;return{image:n&&(i(n.original)||i(n.medium)),tvmazeId:r,name:e}},l=(t.toDbModel=function(t){var e=t.listStatus,n=t.notes,r=t.name,a=t.tvmazeId,u=t.image;return{image:u,listStatus:e,notes:n,name:r,tvmazeId:a}},t.onError=function(t){return function(e){return function(n){return t.errors[e](n)}}},function(t){return function(e){return(0,r.reject)((0,r.propEq)(t,e))}}),d=function(t){return function(e){return e?(0,r.assoc)("objectId",e.objectId,(0,r.set)((0,r.lensProp)("listStatus"),(0,r.prop)("listStatus",e),t)):t}},c=t.updateShowStatus=function(t){return function(e){return e.map(function(e){return(0,r.compose)(d(e),(0,r.find)((0,r.propEq)("tvmazeId",e.tvmazeId)))(t)})}},f=t.getShows=function(t){return t.getTask(t.backendlessUrl("prodshows?pagesize=100"))},m=(t.searchShowsTask=function(t){return function(e){return e.getTask(e.searchUrl(t.state.query())).map((0,r.pluck)("show")).map((0,r.map)(s)).map(l("image")(null)).map(c(t.user.shows()))}},function(t){return function(e){return(0,r.equals)((0,r.prop)("tvmazeId",e),t.state.searchItem.showMenu())}}),p=t.propIsDefined=function(t){return(0,r.compose)(r.not,(0,r.propEq)(t,void 0))},v=(t.showListSelection=function(t){return(0,r.anyPass)([m(t),p("objectId")])},function(t){return function(e){return(0,r.over)((0,r.lensProp)("listStatus"),function(){return e},t)}}),h=function(t){return{body:t}},g=t.toDto=function(t,e){return h(v(t)(e))},b=(t.addUserShowsTask=function(t){return function(e){return function(n){return function(r){return t.postTask(t.backendlessUrl("prodshows"),g(n,r)).chain(function(e){return f(t)}).map(e.user.shows)}}}},t.updateUserShowsTask=function(t){return function(e){return function(n){return t.putTask(t.backendlessUrl("prodshows\\"+e.objectId),g(e,n)).chain(function(e){return f(t)})}}},t.deleteShowTask=function(t){return function(e){return t.deleteTask(t.backendlessUrl("prodshows/"+e)).chain(function(e){return f(t)})}},t.updateShowDetailsTask=function(t){return function(e){return function(n){return t.putTask(t.backendlessUrl("prodshows/"+e.data.details().objectId),{body:n}).chain(function(n){var r=n.objectId;return y(e)(t)(r)})}}},function(t){return function(t){return function(e){return t.getTask(t.tvMazeDetailsUrl(e.tvmazeId)).map(o(e))}}}),w=function(t){return function(e){return t.getTask(t.backendlessUrl("prodshows/"+e))}},y=t.getShowDetailsTask=function(t){return function(e){return function(n){return w(e)(n).chain(b(t)(e))}}};t.filterShowsByListType=function(t){return(0,r.filter)((0,r.propEq)("listStatus",t.state.currentList()),t.user.shows())},t.getEpisodeTask=function(t){return function(e){return t.getTask(e).map(u)}}}),require.register("secrets.js",function(t,e,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.tmdbApiKey="1e4d78ab60660282c63379725fc9b111",t.tmdbAuth={Authorization:"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZTRkNzhhYjYwNjYwMjgyYzYzMzc5NzI1ZmM5YjExMSIsInN1YiI6IjVkYmNjMjBjOTdhNGU2MDAxNTdjNjkxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TgL91o4VHyQo4cm3KLx6nVICyrn8E8pXDC1zMdlDFsU"},t.tmdbBaseUrl="https://api.themoviedb.org/3",t.tvMazeApiKey="F4-A2-dEzYi0oXvzbNWON3_nrnPSt9Yv",t.tvMazeBaseUrl="https://api.tvmaze.com"}),require.register("utils/animations.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function a(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}Object.defineProperty(t,"__esModule",{value:!0}),t.animateChildrenLimitsExit=t.slideModalOut=t.animate=t.animateChildrenLimitsEntrance=t.animateChildrenEntrance=t.animateSidebarEntrance=t.animateComponentEntrance=t.IsLoading=void 0;var u=e("mithril"),o=r(u);t.IsLoading=(0,o["default"])(".holder",[(0,o["default"])(".preloader",[(0,o["default"])("div"),(0,o["default"])("div"),(0,o["default"])("div"),(0,o["default"])("div"),(0,o["default"])("div"),(0,o["default"])("div"),(0,o["default"])("div")])]),t.animateComponentEntrance=function(t){return function(e){var n=e.dom;return n.style.opacity=0,setTimeout(function(){n.classList.toggle("stretchRight"),n.style.opacity=1},100*t+20)}},t.animateSidebarEntrance=function(t){var e=t.dom;e.style.opacity=0,e.classList.toggle("slideRight"),e.style.opacity=1},t.animateChildrenEntrance=function(t){var e=t.dom,n=[].concat(a(e.children));return n.map(function(t,e){t.style.opacity=0,setTimeout(function(){t.classList.toggle("slideRight"),t.style.opacity=1},10*(e+1))})},t.animateChildrenLimitsEntrance=function(t){return function(e){var n=e.dom;n.style.opacity=0,setTimeout(function(){n.classList.toggle("slideDown"),n.style.opacity=1},200*(t+1))}},t.animate=function(t){return function(e){var n=e.dom;n.style.opacity=0,setTimeout(function(){n.classList.toggle(t),n.style.opacity=1},200)}},t.slideModalOut=function(t){var e=t.dom;return new Promise(function(){return e.classList.remove("slideRight"),setTimeout(function(){e.classList.add("reverseAnimation","slideRight")},200)})},t.animateChildrenLimitsExit=function(t){var e=t.dom;return new Promise(function(){[].concat(a(e.children)).reverse().map(function(t,e){return setTimeout(function(){t.style.display="none"},100*e)})})}}),require.register("utils/helpers.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0}),t.jsonCopy=t.scrollToAnchor=t.debounce=t.filterTask=t._paginate=t._direction=t._sort=t._search=t.addTerms=t.infiniteScroll=void 0;var a=e("ramda"),u=e("data.task"),o=r(u),i=(t.infiniteScroll=function(t){return function(e){var n=t.state.route,r=t.data[n].data.length,a=10*r*t.state.scrollPos;e.target.scrollTop-t.state.scrollPos>=a&&t.state.scrollPos++ +e.target.scrollTop}},t.addTerms=function(t){var e=(0,a.compose)((0,a.join)(" "),a.values,(0,a.props)(["uuid","id","name"]))(t);return(0,a.assoc)("_terms",e,t)},function(t){return(0,a.compose)((0,a.test)(new RegExp(t,"i")),(0,a.prop)("name"))}),s=t._search=function(t){return(0,a.compose)((0,a.filter)(i(t)))},l=t._sort=function(t){return(0,a.sortBy)((0,a.compose)(a.toLower,toString,(0,a.prop)(t)))},d=t._direction=function(t){return"asc"==t?a.identity:a.reverse},c=t._paginate=function(t){return function(e){return function(n){return(0,a.slice)((0,a.max)(0,(0,a.min)(t,n.length)),(0,a.min)(t+e,n.length),n)}}};t.filterTask=function(t){return function(e){return function(n){return function(r){return function(u){return(0,a.compose)(o["default"].of,(0,a.map)(c(r)(u)),(0,a.map)(d(n)),(0,a.map)(l(e)),s(t))}}}}},t.debounce=function(t,e){return function(n){var r=void 0;return function(){var a=this,u=arguments,o=function(){r=void 0,e||n.apply(a,u)},i=e&&!r;clearTimeout(r),r=setTimeout(o,t),console.log(n),i&&n.apply(a,u)}}},t.scrollToAnchor=function(t){var e=function(t){return void 0!==t&&null!==t},n=e(t)?document.getElementById(t):document.body,r=window.pageYOffset||document.documentElement.scrollTop,a=e(n)?n.getBoundingClientRect().top:0;
window.scroll({top:a+r-10,left:0,behavior:"smooth"})},t.jsonCopy=function(t){return JSON.parse(JSON.stringify(t))}}),require.register("utils/index.js",function(t,e,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("./animations.js");Object.keys(r).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return r[e]}})});var a=e("./helpers.js");Object.keys(a).forEach(function(e){"default"!==e&&"__esModule"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return a[e]}})})}),require.alias(".pnpm/registry.npmjs.org/process/0.11.10/node_modules/process/browser.js","process"),t=require("process"),require.register("___globals___",function(t,e,n){window.m=e("mithril")})}(),require("___globals___");