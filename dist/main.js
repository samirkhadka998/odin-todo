(()=>{"use strict";var e,n,r,t,a,o,i,c,s,u,d,p,l,f,v={426:(e,n,r)=>{r.d(n,{Z:()=>c});var t=r(81),a=r.n(t),o=r(645),i=r.n(o)()(a());i.push([e.id,"*{\n    margin:0;\n    padding: 0;\n    box-sizing: border-box;\n}\n\nbody{\n    background-color: rgb(16, 130, 230);\n}\n\nh1 {\n    font-family: system-ui;\n}\n\n.wrapper {\n    height: 100vh;\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    grid-template-rows: 10% 80% 10%;\n}\n\nnav {\n    background: red;\n    grid-area: 1/1/2/5;\n}\n\n\naside {\n    background: aliceblue;\n    grid-area: 2/1/3/2;\n}\n\nmain {\n    background: antiquewhite;\n    grid-area: 2/2/3/5;\n}\n\nfooter {\n    background: aquamarine;\n    grid-area: 3/1/4/5;\n}",""]);const c=i},645:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var r="",t=void 0!==n[5];return n[4]&&(r+="@supports (".concat(n[4],") {")),n[2]&&(r+="@media ".concat(n[2]," {")),t&&(r+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),r+=e(n),t&&(r+="}"),n[2]&&(r+="}"),n[4]&&(r+="}"),r})).join("")},n.i=function(e,r,t,a,o){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(t)for(var c=0;c<this.length;c++){var s=this[c][0];null!=s&&(i[s]=!0)}for(var u=0;u<e.length;u++){var d=[].concat(e[u]);t&&i[d[0]]||(void 0!==o&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=o),r&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=r):d[2]=r),a&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=a):d[4]="".concat(a)),n.push(d))}},n}},81:e=>{e.exports=function(e){return e[1]}},379:e=>{var n=[];function r(e){for(var r=-1,t=0;t<n.length;t++)if(n[t].identifier===e){r=t;break}return r}function t(e,t){for(var o={},i=[],c=0;c<e.length;c++){var s=e[c],u=t.base?s[0]+t.base:s[0],d=o[u]||0,p="".concat(u," ").concat(d);o[u]=d+1;var l=r(p),f={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==l)n[l].references++,n[l].updater(f);else{var v=a(f,t);t.byIndex=c,n.splice(c,0,{identifier:p,updater:v,references:1})}i.push(p)}return i}function a(e,n){var r=n.domAPI(n);return r.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;r.update(e=n)}else r.remove()}}e.exports=function(e,a){var o=t(e=e||[],a=a||{});return function(e){e=e||[];for(var i=0;i<o.length;i++){var c=r(o[i]);n[c].references--}for(var s=t(e,a),u=0;u<o.length;u++){var d=r(o[u]);0===n[d].references&&(n[d].updater(),n.splice(d,1))}o=s}}},569:e=>{var n={};e.exports=function(e,r){var t=function(e){if(void 0===n[e]){var r=document.querySelector(e);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}n[e]=r}return n[e]}(e);if(!t)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");t.appendChild(r)}},216:e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},565:(e,n,r)=>{e.exports=function(e){var n=r.nc;n&&e.setAttribute("nonce",n)}},795:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var n=e.insertStyleElement(e);return{update:function(r){!function(e,n,r){var t="";r.supports&&(t+="@supports (".concat(r.supports,") {")),r.media&&(t+="@media ".concat(r.media," {"));var a=void 0!==r.layer;a&&(t+="@layer".concat(r.layer.length>0?" ".concat(r.layer):""," {")),t+=r.css,a&&(t+="}"),r.media&&(t+="}"),r.supports&&(t+="}");var o=r.sourceMap;o&&"undefined"!=typeof btoa&&(t+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),n.styleTagTransform(t,e,n.options)}(n,e,r)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},589:e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}}},m={};function h(e){var n=m[e];if(void 0!==n)return n.exports;var r=m[e]={id:e,exports:{}};return v[e](r,r.exports,h),r.exports}h.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return h.d(n,{a:n}),n},h.d=(e,n)=>{for(var r in n)h.o(n,r)&&!h.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},h.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),h.nc=void 0,e=h(379),n=h.n(e),r=h(795),t=h.n(r),a=h(569),o=h.n(a),i=h(565),c=h.n(i),s=h(216),u=h.n(s),d=h(589),p=h.n(d),l=h(426),(f={}).styleTagTransform=p(),f.setAttributes=c(),f.insert=o().bind(null,"head"),f.domAPI=t(),f.insertStyleElement=u(),n()(l.Z,f),l.Z&&l.Z.locals&&l.Z.locals})();