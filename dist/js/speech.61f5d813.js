(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["speech"],{1276:function(e,t,n){"use strict";var r=n("d784"),i=n("44e7"),o=n("825a"),a=n("1d80"),c=n("4840"),l=n("8aa5"),s=n("50c4"),u=n("14c3"),f=n("9263"),d=n("d039"),p=[].push,h=Math.min,y=4294967295,m=!d((function(){return!RegExp(y,"y")}));r("split",2,(function(e,t,n){var r;return r="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,n){var r=String(a(this)),o=void 0===n?y:n>>>0;if(0===o)return[];if(void 0===e)return[r];if(!i(e))return t.call(r,e,o);var c,l,s,u=[],d=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),h=0,m=new RegExp(e.source,d+"g");while(c=f.call(m,r)){if(l=m.lastIndex,l>h&&(u.push(r.slice(h,c.index)),c.length>1&&c.index<r.length&&p.apply(u,c.slice(1)),s=c[0].length,h=l,u.length>=o))break;m.lastIndex===c.index&&m.lastIndex++}return h===r.length?!s&&m.test("")||u.push(""):u.push(r.slice(h)),u.length>o?u.slice(0,o):u}:"0".split(void 0,0).length?function(e,n){return void 0===e&&0===n?[]:t.call(this,e,n)}:t,[function(t,n){var i=a(this),o=void 0==t?void 0:t[e];return void 0!==o?o.call(t,i,n):r.call(String(i),t,n)},function(e,i){var a=n(r,e,this,i,r!==t);if(a.done)return a.value;var f=o(e),d=String(this),p=c(f,RegExp),v=f.unicode,g=(f.ignoreCase?"i":"")+(f.multiline?"m":"")+(f.unicode?"u":"")+(m?"y":"g"),b=new p(m?f:"^(?:"+f.source+")",g),w=void 0===i?y:i>>>0;if(0===w)return[];if(0===d.length)return null===u(b,d)?[d]:[];var x=0,k=0,E=[];while(k<d.length){b.lastIndex=m?k:0;var O,S=u(b,m?d:d.slice(k));if(null===S||(O=h(s(b.lastIndex+(m?0:k)),d.length))===x)k=l(d,k,v);else{if(E.push(d.slice(x,k)),E.length===w)return E;for(var j=1;j<=S.length-1;j++)if(E.push(S[j]),E.length===w)return E;k=x=O}}return E.push(d.slice(x)),E}]}),!m)},2532:function(e,t,n){"use strict";var r=n("23e7"),i=n("5a34"),o=n("1d80"),a=n("ab13");r({target:"String",proto:!0,forced:!a("includes")},{includes:function(e){return!!~String(o(this)).indexOf(i(e),arguments.length>1?arguments[1]:void 0)}})},4127:function(e,t,n){"use strict";var r=n("d233"),i=n("b313"),o=Object.prototype.hasOwnProperty,a={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},c=Array.isArray,l=Array.prototype.push,s=function(e,t){l.apply(e,c(t)?t:[t])},u=Date.prototype.toISOString,f=i["default"],d={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:r.encode,encodeValuesOnly:!1,format:f,formatter:i.formatters[f],indices:!1,serializeDate:function(e){return u.call(e)},skipNulls:!1,strictNullHandling:!1},p=function(e){return"string"===typeof e||"number"===typeof e||"boolean"===typeof e||"symbol"===typeof e||"bigint"===typeof e},h=function e(t,n,i,o,a,l,u,f,h,y,m,v,g){var b=t;if("function"===typeof u?b=u(n,b):b instanceof Date?b=y(b):"comma"===i&&c(b)&&(b=r.maybeMap(b,(function(e){return e instanceof Date?y(e):e})).join(",")),null===b){if(o)return l&&!v?l(n,d.encoder,g,"key"):n;b=""}if(p(b)||r.isBuffer(b)){if(l){var w=v?n:l(n,d.encoder,g,"key");return[m(w)+"="+m(l(b,d.encoder,g,"value"))]}return[m(n)+"="+m(String(b))]}var x,k=[];if("undefined"===typeof b)return k;if(c(u))x=u;else{var E=Object.keys(b);x=f?E.sort(f):E}for(var O=0;O<x.length;++O){var S=x[O],j=b[S];if(!a||null!==j){var A=c(b)?"function"===typeof i?i(n,S):n:n+(h?"."+S:"["+S+"]");s(k,e(j,A,i,o,a,l,u,f,h,y,m,v,g))}}return k},y=function(e){if(!e)return d;if(null!==e.encoder&&void 0!==e.encoder&&"function"!==typeof e.encoder)throw new TypeError("Encoder has to be a function.");var t=e.charset||d.charset;if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var n=i["default"];if("undefined"!==typeof e.format){if(!o.call(i.formatters,e.format))throw new TypeError("Unknown format option provided.");n=e.format}var r=i.formatters[n],a=d.filter;return("function"===typeof e.filter||c(e.filter))&&(a=e.filter),{addQueryPrefix:"boolean"===typeof e.addQueryPrefix?e.addQueryPrefix:d.addQueryPrefix,allowDots:"undefined"===typeof e.allowDots?d.allowDots:!!e.allowDots,charset:t,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:d.charsetSentinel,delimiter:"undefined"===typeof e.delimiter?d.delimiter:e.delimiter,encode:"boolean"===typeof e.encode?e.encode:d.encode,encoder:"function"===typeof e.encoder?e.encoder:d.encoder,encodeValuesOnly:"boolean"===typeof e.encodeValuesOnly?e.encodeValuesOnly:d.encodeValuesOnly,filter:a,formatter:r,serializeDate:"function"===typeof e.serializeDate?e.serializeDate:d.serializeDate,skipNulls:"boolean"===typeof e.skipNulls?e.skipNulls:d.skipNulls,sort:"function"===typeof e.sort?e.sort:null,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:d.strictNullHandling}};e.exports=function(e,t){var n,r,i=e,o=y(t);"function"===typeof o.filter?(r=o.filter,i=r("",i)):c(o.filter)&&(r=o.filter,n=r);var l,u=[];if("object"!==typeof i||null===i)return"";l=t&&t.arrayFormat in a?t.arrayFormat:t&&"indices"in t?t.indices?"indices":"repeat":"indices";var f=a[l];n||(n=Object.keys(i)),o.sort&&n.sort(o.sort);for(var d=0;d<n.length;++d){var p=n[d];o.skipNulls&&null===i[p]||s(u,h(i[p],p,f,o.strictNullHandling,o.skipNulls,o.encode?o.encoder:null,o.filter,o.sort,o.allowDots,o.serializeDate,o.formatter,o.encodeValuesOnly,o.charset))}var m=u.join(o.delimiter),v=!0===o.addQueryPrefix?"?":"";return o.charsetSentinel&&("iso-8859-1"===o.charset?v+="utf8=%26%2310003%3B&":v+="utf8=%E2%9C%93&"),m.length>0?v+m:""}},4328:function(e,t,n){"use strict";var r=n("4127"),i=n("9e6a"),o=n("b313");e.exports={formats:o,parse:i,stringify:r}},"44e7":function(e,t,n){var r=n("861d"),i=n("c6b6"),o=n("b622"),a=o("match");e.exports=function(e){var t;return r(e)&&(void 0!==(t=e[a])?!!t:"RegExp"==i(e))}},"47cc":function(e,t,n){},"5a34":function(e,t,n){var r=n("44e7");e.exports=function(e){if(r(e))throw TypeError("The method doesn't accept regular expressions");return e}},"7db0":function(e,t,n){"use strict";var r=n("23e7"),i=n("b727").find,o=n("44d2"),a=n("ae40"),c="find",l=!0,s=a(c);c in[]&&Array(1)[c]((function(){l=!1})),r({target:"Array",proto:!0,forced:l||!s},{find:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),o(c)},"9e6a":function(e,t,n){"use strict";var r=n("d233"),i=Object.prototype.hasOwnProperty,o=Array.isArray,a={allowDots:!1,allowPrototypes:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:r.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},c=function(e){return e.replace(/&#(\d+);/g,(function(e,t){return String.fromCharCode(parseInt(t,10))}))},l=function(e,t){return e&&"string"===typeof e&&t.comma&&e.indexOf(",")>-1?e.split(","):e},s="utf8=%26%2310003%3B",u="utf8=%E2%9C%93",f=function(e,t){var n,f={},d=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,p=t.parameterLimit===1/0?void 0:t.parameterLimit,h=d.split(t.delimiter,p),y=-1,m=t.charset;if(t.charsetSentinel)for(n=0;n<h.length;++n)0===h[n].indexOf("utf8=")&&(h[n]===u?m="utf-8":h[n]===s&&(m="iso-8859-1"),y=n,n=h.length);for(n=0;n<h.length;++n)if(n!==y){var v,g,b=h[n],w=b.indexOf("]="),x=-1===w?b.indexOf("="):w+1;-1===x?(v=t.decoder(b,a.decoder,m,"key"),g=t.strictNullHandling?null:""):(v=t.decoder(b.slice(0,x),a.decoder,m,"key"),g=r.maybeMap(l(b.slice(x+1),t),(function(e){return t.decoder(e,a.decoder,m,"value")}))),g&&t.interpretNumericEntities&&"iso-8859-1"===m&&(g=c(g)),b.indexOf("[]=")>-1&&(g=o(g)?[g]:g),i.call(f,v)?f[v]=r.combine(f[v],g):f[v]=g}return f},d=function(e,t,n,r){for(var i=r?t:l(t,n),o=e.length-1;o>=0;--o){var a,c=e[o];if("[]"===c&&n.parseArrays)a=[].concat(i);else{a=n.plainObjects?Object.create(null):{};var s="["===c.charAt(0)&&"]"===c.charAt(c.length-1)?c.slice(1,-1):c,u=parseInt(s,10);n.parseArrays||""!==s?!isNaN(u)&&c!==s&&String(u)===s&&u>=0&&n.parseArrays&&u<=n.arrayLimit?(a=[],a[u]=i):a[s]=i:a={0:i}}i=a}return i},p=function(e,t,n,r){if(e){var o=n.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,a=/(\[[^[\]]*])/,c=/(\[[^[\]]*])/g,l=n.depth>0&&a.exec(o),s=l?o.slice(0,l.index):o,u=[];if(s){if(!n.plainObjects&&i.call(Object.prototype,s)&&!n.allowPrototypes)return;u.push(s)}var f=0;while(n.depth>0&&null!==(l=c.exec(o))&&f<n.depth){if(f+=1,!n.plainObjects&&i.call(Object.prototype,l[1].slice(1,-1))&&!n.allowPrototypes)return;u.push(l[1])}return l&&u.push("["+o.slice(l.index)+"]"),d(u,t,n,r)}},h=function(e){if(!e)return a;if(null!==e.decoder&&void 0!==e.decoder&&"function"!==typeof e.decoder)throw new TypeError("Decoder has to be a function.");if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var t="undefined"===typeof e.charset?a.charset:e.charset;return{allowDots:"undefined"===typeof e.allowDots?a.allowDots:!!e.allowDots,allowPrototypes:"boolean"===typeof e.allowPrototypes?e.allowPrototypes:a.allowPrototypes,arrayLimit:"number"===typeof e.arrayLimit?e.arrayLimit:a.arrayLimit,charset:t,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:a.charsetSentinel,comma:"boolean"===typeof e.comma?e.comma:a.comma,decoder:"function"===typeof e.decoder?e.decoder:a.decoder,delimiter:"string"===typeof e.delimiter||r.isRegExp(e.delimiter)?e.delimiter:a.delimiter,depth:"number"===typeof e.depth||!1===e.depth?+e.depth:a.depth,ignoreQueryPrefix:!0===e.ignoreQueryPrefix,interpretNumericEntities:"boolean"===typeof e.interpretNumericEntities?e.interpretNumericEntities:a.interpretNumericEntities,parameterLimit:"number"===typeof e.parameterLimit?e.parameterLimit:a.parameterLimit,parseArrays:!1!==e.parseArrays,plainObjects:"boolean"===typeof e.plainObjects?e.plainObjects:a.plainObjects,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:a.strictNullHandling}};e.exports=function(e,t){var n=h(t);if(""===e||null===e||"undefined"===typeof e)return n.plainObjects?Object.create(null):{};for(var i="string"===typeof e?f(e,n):e,o=n.plainObjects?Object.create(null):{},a=Object.keys(i),c=0;c<a.length;++c){var l=a[c],s=p(l,i[l],n,"string"===typeof e);o=r.merge(o,s,n)}return r.compact(o)}},a940:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"tx-dx-speech"},[n("van-nav-bar",{staticClass:"fbpl",attrs:{title:"获奖感言","left-text":"返回","left-arrow":""},on:{"click-left":e.onClickLeft}}),n("div",{staticClass:"speech-box"},[n("div",{staticClass:"whole"},[n("video",{attrs:{src:e.videoOptions,controls:"controls",width:"100%"}},[e._v(" 您的浏览器不支持 video 标签。 ")])])]),n("div",{staticClass:"message"},[n("p",[e._v("中奖时间："),e.draw.create_time?n("span",[e._v(e._s(e.draw.create_time)+"元")]):e._e()]),n("p",[e._v("中奖金额："),e.draw.money?n("span",[e._v(e._s(e.draw.money))]):e._e()])]),n("div",{staticClass:"text"},[n("p",[n("span",[e._v(e._s(e.draw.username))]),e._v("获奖感言 ")]),n("div",[e._v(e._s(e.draw.content))])])],1)},i=[],o=(n("7db0"),n("caad"),n("ac1f"),n("2532"),n("1276"),n("4328")),a=n.n(o),c=n("a813"),l=n("be3b"),s=(n("b311"),{data:function(){return{videoOptions:null,message:null,fileList:[],videosrc:null,videosrcshow:!1,filename:null,username:null,id:null,draw:[]}},created:function(){var e=this,t=window.location.href,n=decodeURI(t);if(n.includes("?")){var r=n.split("?")[1];r.split("=")[1];if(n.includes("&")){var i=r.split("&");this.username=i[0].split("=")[1],this.id=parseInt(i[1].split("=")[1])}l["a"].post("".concat(c["b"],"/turntable/latestInputRecord"),a.a.stringify({turntable_id:this.id})).then((function(t){var n=t.data.info.draw;n.length?(e.draw=n.find((function(t){return t.username=="".concat(e.username)})),e.videoOptions=e.draw.video):e.$toast("暂无中奖信息")}))}else this.$toast("访问出错，请正确进行访问！")},mounted:function(){},methods:{onClickLeft:function(){this.$router.go(-1)}}}),u=s,f=(n("d718"),n("2877")),d=Object(f["a"])(u,r,i,!1,null,null,null);t["default"]=d.exports},ab13:function(e,t,n){var r=n("b622"),i=r("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(n){try{return t[i]=!1,"/./"[e](t)}catch(r){}}return!1}},b311:function(e,t,n){
/*!
 * clipboard.js v2.0.6
 * https://clipboardjs.com/
 * 
 * Licensed MIT © Zeno Rocha
 */
(function(t,n){e.exports=n()})(0,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t){function n(e){var t;if("SELECT"===e.nodeName)e.focus(),t=e.value;else if("INPUT"===e.nodeName||"TEXTAREA"===e.nodeName){var n=e.hasAttribute("readonly");n||e.setAttribute("readonly",""),e.select(),e.setSelectionRange(0,e.value.length),n||e.removeAttribute("readonly"),t=e.value}else{e.hasAttribute("contenteditable")&&e.focus();var r=window.getSelection(),i=document.createRange();i.selectNodeContents(e),r.removeAllRanges(),r.addRange(i),t=r.toString()}return t}e.exports=n},function(e,t){function n(){}n.prototype={on:function(e,t,n){var r=this.e||(this.e={});return(r[e]||(r[e]=[])).push({fn:t,ctx:n}),this},once:function(e,t,n){var r=this;function i(){r.off(e,i),t.apply(n,arguments)}return i._=t,this.on(e,i,n)},emit:function(e){var t=[].slice.call(arguments,1),n=((this.e||(this.e={}))[e]||[]).slice(),r=0,i=n.length;for(r;r<i;r++)n[r].fn.apply(n[r].ctx,t);return this},off:function(e,t){var n=this.e||(this.e={}),r=n[e],i=[];if(r&&t)for(var o=0,a=r.length;o<a;o++)r[o].fn!==t&&r[o].fn._!==t&&i.push(r[o]);return i.length?n[e]=i:delete n[e],this}},e.exports=n,e.exports.TinyEmitter=n},function(e,t,n){var r=n(3),i=n(4);function o(e,t,n){if(!e&&!t&&!n)throw new Error("Missing required arguments");if(!r.string(t))throw new TypeError("Second argument must be a String");if(!r.fn(n))throw new TypeError("Third argument must be a Function");if(r.node(e))return a(e,t,n);if(r.nodeList(e))return c(e,t,n);if(r.string(e))return l(e,t,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function a(e,t,n){return e.addEventListener(t,n),{destroy:function(){e.removeEventListener(t,n)}}}function c(e,t,n){return Array.prototype.forEach.call(e,(function(e){e.addEventListener(t,n)})),{destroy:function(){Array.prototype.forEach.call(e,(function(e){e.removeEventListener(t,n)}))}}}function l(e,t,n){return i(document.body,e,t,n)}e.exports=o},function(e,t){t.node=function(e){return void 0!==e&&e instanceof HTMLElement&&1===e.nodeType},t.nodeList=function(e){var n=Object.prototype.toString.call(e);return void 0!==e&&("[object NodeList]"===n||"[object HTMLCollection]"===n)&&"length"in e&&(0===e.length||t.node(e[0]))},t.string=function(e){return"string"===typeof e||e instanceof String},t.fn=function(e){var t=Object.prototype.toString.call(e);return"[object Function]"===t}},function(e,t,n){var r=n(5);function i(e,t,n,r,i){var o=a.apply(this,arguments);return e.addEventListener(n,o,i),{destroy:function(){e.removeEventListener(n,o,i)}}}function o(e,t,n,r,o){return"function"===typeof e.addEventListener?i.apply(null,arguments):"function"===typeof n?i.bind(null,document).apply(null,arguments):("string"===typeof e&&(e=document.querySelectorAll(e)),Array.prototype.map.call(e,(function(e){return i(e,t,n,r,o)})))}function a(e,t,n,i){return function(n){n.delegateTarget=r(n.target,t),n.delegateTarget&&i.call(e,n)}}e.exports=o},function(e,t){var n=9;if("undefined"!==typeof Element&&!Element.prototype.matches){var r=Element.prototype;r.matches=r.matchesSelector||r.mozMatchesSelector||r.msMatchesSelector||r.oMatchesSelector||r.webkitMatchesSelector}function i(e,t){while(e&&e.nodeType!==n){if("function"===typeof e.matches&&e.matches(t))return e;e=e.parentNode}}e.exports=i},function(e,t,n){"use strict";n.r(t);var r=n(0),i=n.n(r),o="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var l=function(){function e(t){c(this,e),this.resolveOptions(t),this.initSelection()}return a(e,[{key:"resolveOptions",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=e.action,this.container=e.container,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var e=this,t="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return e.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[t?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=i()(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=i()(this.target),this.copyText()}},{key:"copyText",value:function(){var e=void 0;try{e=document.execCommand(this.action)}catch(t){e=!1}this.handleResult(e)}},{key:"handleResult",value:function(e){this.emitter.emit(e?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),document.activeElement.blur(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(e){if(void 0!==e){if(!e||"object"!==("undefined"===typeof e?"undefined":o(e))||1!==e.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&e.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(e.hasAttribute("readonly")||e.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=e}},get:function(){return this._target}}]),e}(),s=l,u=n(1),f=n.n(u),d=n(2),p=n.n(d),h="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function m(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function v(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function g(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var b=function(e){function t(e,n){m(this,t);var r=v(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return r.resolveOptions(n),r.listenClick(e),r}return g(t,e),y(t,[{key:"resolveOptions",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"===typeof e.action?e.action:this.defaultAction,this.target="function"===typeof e.target?e.target:this.defaultTarget,this.text="function"===typeof e.text?e.text:this.defaultText,this.container="object"===h(e.container)?e.container:document.body}},{key:"listenClick",value:function(e){var t=this;this.listener=p()(e,"click",(function(e){return t.onClick(e)}))}},{key:"onClick",value:function(e){var t=e.delegateTarget||e.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new s({action:this.action(t),target:this.target(t),text:this.text(t),container:this.container,trigger:t,emitter:this})}},{key:"defaultAction",value:function(e){return w("action",e)}},{key:"defaultTarget",value:function(e){var t=w("target",e);if(t)return document.querySelector(t)}},{key:"defaultText",value:function(e){return w("text",e)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],t="string"===typeof e?[e]:e,n=!!document.queryCommandSupported;return t.forEach((function(e){n=n&&!!document.queryCommandSupported(e)})),n}}]),t}(f.a);function w(e,t){var n="data-clipboard-"+e;if(t.hasAttribute(n))return t.getAttribute(n)}t["default"]=b}])["default"]}))},b313:function(e,t,n){"use strict";var r=String.prototype.replace,i=/%20/g,o=n("d233"),a={RFC1738:"RFC1738",RFC3986:"RFC3986"};e.exports=o.assign({default:a.RFC3986,formatters:{RFC1738:function(e){return r.call(e,i,"+")},RFC3986:function(e){return String(e)}}},a)},caad:function(e,t,n){"use strict";var r=n("23e7"),i=n("4d64").includes,o=n("44d2"),a=n("ae40"),c=a("indexOf",{ACCESSORS:!0,1:0});r({target:"Array",proto:!0,forced:!c},{includes:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),o("includes")},d233:function(e,t,n){"use strict";var r=Object.prototype.hasOwnProperty,i=Array.isArray,o=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),a=function(e){while(e.length>1){var t=e.pop(),n=t.obj[t.prop];if(i(n)){for(var r=[],o=0;o<n.length;++o)"undefined"!==typeof n[o]&&r.push(n[o]);t.obj[t.prop]=r}}},c=function(e,t){for(var n=t&&t.plainObjects?Object.create(null):{},r=0;r<e.length;++r)"undefined"!==typeof e[r]&&(n[r]=e[r]);return n},l=function e(t,n,o){if(!n)return t;if("object"!==typeof n){if(i(t))t.push(n);else{if(!t||"object"!==typeof t)return[t,n];(o&&(o.plainObjects||o.allowPrototypes)||!r.call(Object.prototype,n))&&(t[n]=!0)}return t}if(!t||"object"!==typeof t)return[t].concat(n);var a=t;return i(t)&&!i(n)&&(a=c(t,o)),i(t)&&i(n)?(n.forEach((function(n,i){if(r.call(t,i)){var a=t[i];a&&"object"===typeof a&&n&&"object"===typeof n?t[i]=e(a,n,o):t.push(n)}else t[i]=n})),t):Object.keys(n).reduce((function(t,i){var a=n[i];return r.call(t,i)?t[i]=e(t[i],a,o):t[i]=a,t}),a)},s=function(e,t){return Object.keys(t).reduce((function(e,n){return e[n]=t[n],e}),e)},u=function(e,t,n){var r=e.replace(/\+/g," ");if("iso-8859-1"===n)return r.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(r)}catch(i){return r}},f=function(e,t,n){if(0===e.length)return e;var r=e;if("symbol"===typeof e?r=Symbol.prototype.toString.call(e):"string"!==typeof e&&(r=String(e)),"iso-8859-1"===n)return escape(r).replace(/%u[0-9a-f]{4}/gi,(function(e){return"%26%23"+parseInt(e.slice(2),16)+"%3B"}));for(var i="",a=0;a<r.length;++a){var c=r.charCodeAt(a);45===c||46===c||95===c||126===c||c>=48&&c<=57||c>=65&&c<=90||c>=97&&c<=122?i+=r.charAt(a):c<128?i+=o[c]:c<2048?i+=o[192|c>>6]+o[128|63&c]:c<55296||c>=57344?i+=o[224|c>>12]+o[128|c>>6&63]+o[128|63&c]:(a+=1,c=65536+((1023&c)<<10|1023&r.charCodeAt(a)),i+=o[240|c>>18]+o[128|c>>12&63]+o[128|c>>6&63]+o[128|63&c])}return i},d=function(e){for(var t=[{obj:{o:e},prop:"o"}],n=[],r=0;r<t.length;++r)for(var i=t[r],o=i.obj[i.prop],c=Object.keys(o),l=0;l<c.length;++l){var s=c[l],u=o[s];"object"===typeof u&&null!==u&&-1===n.indexOf(u)&&(t.push({obj:o,prop:s}),n.push(u))}return a(t),e},p=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},h=function(e){return!(!e||"object"!==typeof e)&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},y=function(e,t){return[].concat(e,t)},m=function(e,t){if(i(e)){for(var n=[],r=0;r<e.length;r+=1)n.push(t(e[r]));return n}return t(e)};e.exports={arrayToObject:c,assign:s,combine:y,compact:d,decode:u,encode:f,isBuffer:h,isRegExp:p,maybeMap:m,merge:l}},d718:function(e,t,n){"use strict";var r=n("47cc"),i=n.n(r);i.a}}]);