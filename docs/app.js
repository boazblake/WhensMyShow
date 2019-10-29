!function(){"use strict";var t="undefined"==typeof global?self:global;if("function"!=typeof t.require){var e={},n={},r={},a={}.hasOwnProperty,o=/^\.\.?(\/|$)/,u=function(t,e){for(var n,r=[],a=(o.test(e)?t+"/"+e:e).split("/"),u=0,i=a.length;u<i;u++)n=a[u],".."===n?r.pop():"."!==n&&""!==n&&r.push(n);return r.join("/")},i=function(t){return t.split("/").slice(0,-1).join("/")},l=function(e){return function(n){var r=u(i(e),n);return t.require(r,e)}},s=function(t,e){var r=p&&p.createHot(t),a={id:t,exports:{},hot:r};return n[t]=a,e(a.exports,l(t),a),a.exports},c=function(t){return r[t]?c(r[t]):t},d=function(t,e){return c(u(i(t),e))},f=function(t,r){null==r&&(r="/");var o=c(t);if(a.call(n,o))return n[o].exports;if(a.call(e,o))return s(o,e[o]);throw new Error("Cannot find module '"+t+"' from '"+r+"'")};f.alias=function(t,e){r[e]=t};var v=/\.[^.\/]+$/,m=/\/index(\.[^\/]+)?$/,g=function(t){if(v.test(t)){var e=t.replace(v,"");a.call(r,e)&&r[e].replace(v,"")!==e+"/index"||(r[e]=t)}if(m.test(t)){var n=t.replace(m,"");a.call(r,n)||(r[n]=t)}};f.register=f.define=function(t,r){if(t&&"object"==typeof t)for(var o in t)a.call(t,o)&&f.register(o,t[o]);else e[t]=r,delete n[t],g(t)},f.list=function(){var t=[];for(var n in e)a.call(e,n)&&t.push(n);return t};var p=t._hmr&&new t._hmr(d,f,e,n);f._cache=n,f.hmr=p&&p.wrap,f.brunch=!0,t.require=f}}(),function(){"undefined"==typeof window?this:window;require.register("components/button.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),o=r(a),u=function(){return{view:function(t){var e=t.attrs,n=e.classList,r=e.action,a=e.label;return(0,o["default"])("button.btn."+n,{onclick:r},a)}}};t["default"]=u}),require.register("components/canvas.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),o=r(a),u=function(){return{oncreate:function(t){var e=t.dom,n=t.attrs,r=n.ctx,a=(n.mdl,e.getContext("2d"));r&&a.putImageData(r,0,0)},view:function(t){var e=t.attrs,n=e.classList,r=e.id;return(0,o["default"])("canvas."+n,{id:r})}}};t["default"]=u}),require.register("components/navbar.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),o=r(a),u=e("./button.js"),i=r(u),l=e("../model"),s=function(){return{view:function(t){var e=t.attrs.mdl;return(0,o["default"])("nav.navbar","/easel"==o["default"].route.get()?e.artworks.map(l.isEmpty)&&(0,o["default"])(i["default"],{mdl:e,classList:"navBtn",action:function(){e.preventUpdate(!1),e.orientation="portrait",o["default"].route.set("/print")},label:"View Gallery"}):(0,o["default"])(i["default"],{mdl:e,classList:"navBtn",action:function(){e.preventUpdate(!0),o["default"].route.set("/easel")},label:"Commision New Painting"}))}}};t["default"]=s}),require.register("components/toolbar.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),o=r(a),u=e("./button.js"),i=r(u),l=function(){return{view:function(t){var e=t.attrs.mdl;return(0,o["default"])("aside.navbar",(0,o["default"])(i["default"],{mdl:e,classList:"toolBtn",action:function(){e.preventUpdate(!0),e.orientation="portrait",o["default"].route.set("/easel")},label:"New Painting"}),(0,o["default"])(i["default"],{mdl:e,classList:"toolBtn",action:function(){e.preventUpdate(!1),e.orientation.includes("portrait")?e.orientation="animated.rollAround.landscape":e.orientation="animated.rollAround.portrait"},label:e.orientation.includes("portrait")?"landscape":"portrait"}))}}},s=function(){return{view:function(t){var e=t.attrs.mdl;return"/easel"==o["default"].route.get()&&(0,o["default"])(l,{mdl:e})}}};t["default"]=s}),require.register("initialize.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}var a=e("mithril"),o=r(a),u=e("./model.js"),i=r(u),l=e("./components/navbar"),s=r(l),c=e("./components/toolbar"),d=r(c),f=e("./pages/easel.js"),v=r(f),m=e("./pages/gallery.js"),g=r(m),p=function(){return{view:function(t){var e=t.children;return(0,o["default"])("section.main",e)}}},h=function(){return{view:function(t){var e=t.children,n=t.attrs.mdl;return(0,o["default"])(".app",[(0,o["default"])(s["default"],{mdl:n}),(0,o["default"])(p,{mdl:n},e),(0,o["default"])(d["default"],{mdl:n})])}}},_=function(t){return{"/easel":{render:function(){return(0,o["default"])(h,{mdl:t},(0,o["default"])(v["default"],{mdl:t,key:Date.now()}))}},"/gallery":{onmatch:function(){if(0==t.artworks().length)return o["default"].route.set("/easel")},render:function(){return(0,o["default"])(h,{mdl:t},(0,o["default"])(g["default"],{mdl:t}))}}}};document.addEventListener("DOMContentLoaded",function(){var t=document.body;o["default"].route(t,"/gallery",_(i["default"]))})}),require.register("model.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function a(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function o(t){return Array.isArray(t)?t:Array.from(t)}Object.defineProperty(t,"__esModule",{value:!0}),t.isEmpty=t.range=t.getHue=t.getHeight=t.getWidth=t.getRotation=t.getPosition=t.rest=t.last=t.log=void 0;var u=e("mithril-stream"),i=r(u),l=((0,i["default"])(600),(0,i["default"])(600),t.log=function(t){return function(e){return console.log(t,e),e}}),s=function(t,e){return Math.floor(Math.random()*(e-t)+t)},c=(t.last=function(t){return t[t.length-1]},t.rest=function v(t){var e=o(t),v=(e[0],e.slice(1));return v},t.getPosition=function(t){return{x:s(0,t.width()),y:s(0,t.height())}},t.getRotation=function(){return s(0,360)},t.getWidth=function(t){return s(0,t.width())},t.getHeight=function(t){return s(0,t.height())},t.getHue=function(){return s(0,999)},t.range=function(t){return[].concat(a(Array(t).keys()))},t.isEmpty=function(t){return 0==t.length},function(t,e){var n={id:t.artworks().length,art:e};t.artworks.map(function(t){return t.push(n)})}),d=["circle","square","triangle"],f={count:(0,i["default"])(s(30,70)),preventUpdate:(0,i["default"])(!0),shapes:d,width:(0,i["default"])(600),height:(0,i["default"])(600),artworks:(0,i["default"])([]),canvas:(0,i["default"])(null),ctx:(0,i["default"])(null),dom:(0,i["default"])(null),saveArt:c,log:l,orientation:"portrait"};t["default"]=f}),require.register("pages/easel.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),o=r(a),u=e("../components/canvas.js"),i=r(u),l=e("../paint.js"),s=r(l),c=function(){return{oninit:function(t){var e=t.attrs.mdl;if(e.preventUpdate()){var n=document.createElement("canvas"),r=n.getContext("2d");r.imageSmoothingQuality="high",r.filter="brightness(0.8)",r.scale(.8,.8),(0,s["default"])({ctx:r,mdl:e});var a=r.getImageData(0,0,e.width(),e.height());e.canvas(a),e.ctx(r),e.dom(n),e.saveArt(e,a)}},view:function(t){var e=t.attrs.mdl;return(0,o["default"])(".easel",(0,o["default"])(i["default"],{id:"canvas",mdl:e,classList:e.orientation,ctx:e.canvas()}))}}};t["default"]=c}),require.register("pages/gallery.js",function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(t,"__esModule",{value:!0});var a=e("mithril"),o=r(a),u=e("../components/canvas"),i=r(u),l=e("../components/button"),s=r(l),c=function(){return{view:function(t){var e=t.attrs.mdl;return console.log("canvas",e.canvas()),(0,o["default"])("aside.navbar.toolbar",null!==e.canvas()&&[(0,o["default"])(s["default"],{mdl:e,classList:"toolBtn",action:function(t){t.redraw=!1;var n=document.createElement("a");n.href=e.dom().toDataURL("image/png"),n.download="AI_Painter_lot#"+e.artworks.length+".jpg",n.style.display="none",document.body.appendChild(n),n.click(),n.remove()},download:""+e.canvas(),label:"Download"})])}}},d=function(t){var e=t.attrs.close;return{view:function(t){var n=t.children,r=t.attrs.mdl;return(0,o["default"])(".modalBackground",{onclick:function(){return e()}},(0,o["default"])(".modal",[n,(0,o["default"])(c,{mdl:r})]))}}},f=function(t){var e=t.attrs.mdl;return e.canvas(null)},v=function(){return{show:!1,close:function(t){return t.show=!t.show},oninit:f,view:function(t){var e=t.state,n=t.attrs.mdl;return[(0,o["default"])(".gallery",n.artworks().map(function(t){var r=t.art;return(0,o["default"])(s["default"],{classList:"paintBtn",action:function(t){var r=t.target,a=r.getContext("2d");a.filter="brightness(1)";var o=a.getImageData(0,0,n.width(),n.height());n.canvas(o),n.dom(r),e.close(e),window.scrollTo(0,0)},label:(0,o["default"])(i["default"],{mdl:n,ctx:r,classList:"canvas"})})})),e.show&&(0,o["default"])(d,{close:function(){f({attrs:{mdl:n}}),e.close(e)},mdl:n},(0,o["default"])(i["default"],{ctx:n.canvas(),classList:"canvas"}))]}}};t["default"]=v}),require.register("paint.js",function(t,e,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("./model"),a=function(t,e,n,r){return"hsla("+t+", "+e+", "+n+", "+r+")"},o=function(t,e,n,r,o,u){var i=a(u,"60%","50%",.75);t.save(),t.fillStyle=i,t.translate(e.x,e.y),t.rotate(n),t.fillRect(-r/2,-o/2,r,o),t.restore()},u=function(t,e,n,r,o,u){var i=a(u,"60%","50%",.75);t.save(),t.fillStyle=i,t.translate(e.x,e.y),t.rotate(n),t.beginPath(),t.moveTo(r,0),t.lineTo(0,-r/4),t.lineTo(0,r/4),t.closePath(),t.fill(),t.restore()},i=function(t,e){return function(n){return"triangle"==n?u(t,(0,r.getPosition)(e),(0,r.getRotation)(),(0,r.getWidth)(e),(0,r.getHeight)(e),(0,r.getHue)()):"square"==n?o(t,(0,r.getPosition)(e),(0,r.getRotation)(),(0,r.getWidth)(e),(0,r.getHeight)(e),(0,r.getHue)()):void 0}},l=function(t){return t.shapes[Math.floor(Math.random()*t.shapes.length)]},s=function(t){var e=t.ctx,n=t.mdl;return(0,r.range)(n.count()).map(function(t){return l(n)}).map(i(e,n))};t["default"]=s}),require.register("___globals___",function(t,e,n){})}(),require("___globals___");