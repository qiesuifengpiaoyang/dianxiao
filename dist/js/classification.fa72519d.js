(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["classification"],{"076e":function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("van-tabbar",{attrs:{route:"",value:e.active,"active-color":"#e02e24","inactive-color":"#000"}},[r("van-tabbar-item",{attrs:{icon:"home-o",name:"首页",to:"/"}},[e._v("首页")]),r("van-tabbar-item",{attrs:{icon:"apps-o",name:"分类",to:"/classification/6"}},[e._v("分类")]),r("van-tabbar-item",{attrs:{icon:"shopping-cart-o",name:"购物车",to:"/shopcat"}},[e._v("购物车")]),r("van-tabbar-item",{attrs:{icon:"contact",name:"个人中心",to:"/personal"}},[e._v("个人中心")]),r("van-tabbar-item",{attrs:{icon:"home-o"},on:{click:e.fh}},[e._v("同心台")])],1)},o=[],i={data:function(){return{}},props:{active:{}},methods:{fh:function(){window.location.href="/#/"}}},a=i,c=r("2877"),s=Object(c["a"])(a,n,o,!1,null,null,null);t["a"]=s.exports},"0ecd":function(e,t,r){},1451:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("van-button",{class:["top-box",e.show?"onc":"onb"],attrs:{icon:"arrow-up",type:"primary"},on:{click:e.jsToTop}},[e._v("顶部")])},o=[],i={data:function(){return{closeRequest:!0,show:!1}},props:{classNc:{}},mounted:function(){var e=this;e.$nextTick((function(){e.classNc?document.querySelector(".".concat(e.classNc)).addEventListener("scroll",e.onScroll):window.addEventListener("scroll",e.onScroll)}))},methods:{onScroll:function(){var e,t=this;e=t.classNc?document.querySelector(".".concat(t.classNc)):document.documentElement,e.scrollTop>=300?(t.show=!0,t.closeRequest=!0):(t.show=!1,t.closeRequest=!1)},jsToTop:function(){var e,t=this;this.$nextTick((function(){t.closeRequest=!0,e=t.classNc?document.querySelector(".".concat(t.classNc)):document.documentElement,e.scrollTop=0}))}}},a=i,c=(r("1d66"),r("2877")),s=Object(c["a"])(a,n,o,!1,null,null,null);t["a"]=s.exports},"1d66":function(e,t,r){"use strict";var n=r("ce13"),o=r.n(n);o.a},4127:function(e,t,r){"use strict";var n=r("d233"),o=r("b313"),i=Object.prototype.hasOwnProperty,a={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},c=Array.isArray,s=Array.prototype.push,l=function(e,t){s.apply(e,c(t)?t:[t])},u=Date.prototype.toISOString,f=o["default"],p={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:n.encode,encodeValuesOnly:!1,format:f,formatter:o.formatters[f],indices:!1,serializeDate:function(e){return u.call(e)},skipNulls:!1,strictNullHandling:!1},d=function(e){return"string"===typeof e||"number"===typeof e||"boolean"===typeof e||"symbol"===typeof e||"bigint"===typeof e},y=function e(t,r,o,i,a,s,u,f,y,m,h,v,b){var g=t;if("function"===typeof u?g=u(r,g):g instanceof Date?g=m(g):"comma"===o&&c(g)&&(g=n.maybeMap(g,(function(e){return e instanceof Date?m(e):e})).join(",")),null===g){if(i)return s&&!v?s(r,p.encoder,b,"key"):r;g=""}if(d(g)||n.isBuffer(g)){if(s){var j=v?r:s(r,p.encoder,b,"key");return[h(j)+"="+h(s(g,p.encoder,b,"value"))]}return[h(r)+"="+h(String(g))]}var O,w=[];if("undefined"===typeof g)return w;if(c(u))O=u;else{var x=Object.keys(g);O=f?x.sort(f):x}for(var N=0;N<O.length;++N){var k=O[N],S=g[k];if(!a||null!==S){var _=c(g)?"function"===typeof o?o(r,k):r:r+(y?"."+k:"["+k+"]");l(w,e(S,_,o,i,a,s,u,f,y,m,h,v,b))}}return w},m=function(e){if(!e)return p;if(null!==e.encoder&&void 0!==e.encoder&&"function"!==typeof e.encoder)throw new TypeError("Encoder has to be a function.");var t=e.charset||p.charset;if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var r=o["default"];if("undefined"!==typeof e.format){if(!i.call(o.formatters,e.format))throw new TypeError("Unknown format option provided.");r=e.format}var n=o.formatters[r],a=p.filter;return("function"===typeof e.filter||c(e.filter))&&(a=e.filter),{addQueryPrefix:"boolean"===typeof e.addQueryPrefix?e.addQueryPrefix:p.addQueryPrefix,allowDots:"undefined"===typeof e.allowDots?p.allowDots:!!e.allowDots,charset:t,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:p.charsetSentinel,delimiter:"undefined"===typeof e.delimiter?p.delimiter:e.delimiter,encode:"boolean"===typeof e.encode?e.encode:p.encode,encoder:"function"===typeof e.encoder?e.encoder:p.encoder,encodeValuesOnly:"boolean"===typeof e.encodeValuesOnly?e.encodeValuesOnly:p.encodeValuesOnly,filter:a,formatter:n,serializeDate:"function"===typeof e.serializeDate?e.serializeDate:p.serializeDate,skipNulls:"boolean"===typeof e.skipNulls?e.skipNulls:p.skipNulls,sort:"function"===typeof e.sort?e.sort:null,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:p.strictNullHandling}};e.exports=function(e,t){var r,n,o=e,i=m(t);"function"===typeof i.filter?(n=i.filter,o=n("",o)):c(i.filter)&&(n=i.filter,r=n);var s,u=[];if("object"!==typeof o||null===o)return"";s=t&&t.arrayFormat in a?t.arrayFormat:t&&"indices"in t?t.indices?"indices":"repeat":"indices";var f=a[s];r||(r=Object.keys(o)),i.sort&&r.sort(i.sort);for(var p=0;p<r.length;++p){var d=r[p];i.skipNulls&&null===o[d]||l(u,y(o[d],d,f,i.strictNullHandling,i.skipNulls,i.encode?i.encoder:null,i.filter,i.sort,i.allowDots,i.serializeDate,i.formatter,i.encodeValuesOnly,i.charset))}var h=u.join(i.delimiter),v=!0===i.addQueryPrefix?"?":"";return i.charsetSentinel&&("iso-8859-1"===i.charset?v+="utf8=%26%2310003%3B&":v+="utf8=%E2%9C%93&"),h.length>0?v+h:""}},4328:function(e,t,r){"use strict";var n=r("4127"),o=r("9e6a"),i=r("b313");e.exports={formats:i,parse:o,stringify:n}},"6a7e":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"tx-dx-classification"},[r("van-tree-select",{staticClass:"tree-select-n2",attrs:{items:e.listch,"main-active-index":e.active},on:{"update:mainActiveIndex":function(t){e.active=t},"update:main-active-index":function(t){e.active=t},"click-nav":e.jsToNav},scopedSlots:e._u([{key:"content",fn:function(){return e._l(e.listObj[e.active],(function(t){return r("div",{key:t.id,staticClass:"select-n2-box"},[r("div",{staticClass:"titbox"},[r("div",{staticClass:"tit"},[e._v(e._s(t.title))])]),r("van-grid",{attrs:{"column-num":3,border:!1}},e._l(t.children,(function(t,n){return r("van-grid-item",{key:n,on:{click:function(r){return e.jsToCommodity(t)}}},[r("van-image",{attrs:{src:t.icon}}),r("p",[e._v(e._s(t.title))])],1)})),1)],1)}))},proxy:!0}])}),r("to-top",{attrs:{classNc:"van-tree-select__content"}}),r("Footer",{attrs:{active:"分类"}})],1)},o=[],i=(r("d81d"),r("076e")),a=r("1451"),c=r("4328"),s=r.n(c),l=r("a813"),u=r("be3b"),f={data:function(){return{active:"",type:this.$route.params.type,listObj:{},listch:[{modular_id:6,text:"代理专区"}]}},components:{Footer:i["a"],ToTop:a["a"]},mounted:function(){this.leftSelect(),this.firstAPI(this.type,0)},methods:{onClickLeft:function(){this.$router.go(-1)},leftSelect:function(){var e=this;this.listch.map((function(t,r){t.modular_id===+e.type&&(e.active=r)}))},firstAPI:function(e,t){var r=this,n=r.$toast.loading({duration:0,message:"加载中...",forbidClick:!0});u["a"].post("".concat(l["b"],"/class"),s.a.stringify({type:+e})).then((function(e){n.clear();var o=e.data,i=o.status,a=o.info,c=o.message;1===i?r.datacl1(a,t):r.$toast({message:c,forbidClick:!0})}))},datacl1:function(e,t){var r=this;if(Array.isArray(e))if(0!==e.length){var n=e[0];if(n.hasOwnProperty("children"))r.$set(r.listObj,t,e);else{var o=[],i={};i.children=e,i.id=9999,i.title="热门分类",o.push(i),r.$set(r.listObj,t,o)}}else r.$toast("无商品类型")},jsToNav:function(e){var t=this;this.active=e;var r=this.listch[e].modular_id;this.type=r,this.$router.push({name:"classification",params:{type:r}}),setTimeout((function(){t.firstAPI(r,e)}),200)},jsToCommodity:function(e){this.$router.push({name:"search_result",params:{type:this.type,class_id:e.id,opt_name:e.title}})}}},p=f,d=(r("6ecc"),r("2877")),y=Object(d["a"])(p,n,o,!1,null,null,null);t["default"]=y.exports},"6ecc":function(e,t,r){"use strict";var n=r("0ecd"),o=r.n(n);o.a},"9e6a":function(e,t,r){"use strict";var n=r("d233"),o=Object.prototype.hasOwnProperty,i=Array.isArray,a={allowDots:!1,allowPrototypes:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:n.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},c=function(e){return e.replace(/&#(\d+);/g,(function(e,t){return String.fromCharCode(parseInt(t,10))}))},s=function(e,t){return e&&"string"===typeof e&&t.comma&&e.indexOf(",")>-1?e.split(","):e},l="utf8=%26%2310003%3B",u="utf8=%E2%9C%93",f=function(e,t){var r,f={},p=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,d=t.parameterLimit===1/0?void 0:t.parameterLimit,y=p.split(t.delimiter,d),m=-1,h=t.charset;if(t.charsetSentinel)for(r=0;r<y.length;++r)0===y[r].indexOf("utf8=")&&(y[r]===u?h="utf-8":y[r]===l&&(h="iso-8859-1"),m=r,r=y.length);for(r=0;r<y.length;++r)if(r!==m){var v,b,g=y[r],j=g.indexOf("]="),O=-1===j?g.indexOf("="):j+1;-1===O?(v=t.decoder(g,a.decoder,h,"key"),b=t.strictNullHandling?null:""):(v=t.decoder(g.slice(0,O),a.decoder,h,"key"),b=n.maybeMap(s(g.slice(O+1),t),(function(e){return t.decoder(e,a.decoder,h,"value")}))),b&&t.interpretNumericEntities&&"iso-8859-1"===h&&(b=c(b)),g.indexOf("[]=")>-1&&(b=i(b)?[b]:b),o.call(f,v)?f[v]=n.combine(f[v],b):f[v]=b}return f},p=function(e,t,r,n){for(var o=n?t:s(t,r),i=e.length-1;i>=0;--i){var a,c=e[i];if("[]"===c&&r.parseArrays)a=[].concat(o);else{a=r.plainObjects?Object.create(null):{};var l="["===c.charAt(0)&&"]"===c.charAt(c.length-1)?c.slice(1,-1):c,u=parseInt(l,10);r.parseArrays||""!==l?!isNaN(u)&&c!==l&&String(u)===l&&u>=0&&r.parseArrays&&u<=r.arrayLimit?(a=[],a[u]=o):a[l]=o:a={0:o}}o=a}return o},d=function(e,t,r,n){if(e){var i=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,a=/(\[[^[\]]*])/,c=/(\[[^[\]]*])/g,s=r.depth>0&&a.exec(i),l=s?i.slice(0,s.index):i,u=[];if(l){if(!r.plainObjects&&o.call(Object.prototype,l)&&!r.allowPrototypes)return;u.push(l)}var f=0;while(r.depth>0&&null!==(s=c.exec(i))&&f<r.depth){if(f+=1,!r.plainObjects&&o.call(Object.prototype,s[1].slice(1,-1))&&!r.allowPrototypes)return;u.push(s[1])}return s&&u.push("["+i.slice(s.index)+"]"),p(u,t,r,n)}},y=function(e){if(!e)return a;if(null!==e.decoder&&void 0!==e.decoder&&"function"!==typeof e.decoder)throw new TypeError("Decoder has to be a function.");if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var t="undefined"===typeof e.charset?a.charset:e.charset;return{allowDots:"undefined"===typeof e.allowDots?a.allowDots:!!e.allowDots,allowPrototypes:"boolean"===typeof e.allowPrototypes?e.allowPrototypes:a.allowPrototypes,arrayLimit:"number"===typeof e.arrayLimit?e.arrayLimit:a.arrayLimit,charset:t,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:a.charsetSentinel,comma:"boolean"===typeof e.comma?e.comma:a.comma,decoder:"function"===typeof e.decoder?e.decoder:a.decoder,delimiter:"string"===typeof e.delimiter||n.isRegExp(e.delimiter)?e.delimiter:a.delimiter,depth:"number"===typeof e.depth||!1===e.depth?+e.depth:a.depth,ignoreQueryPrefix:!0===e.ignoreQueryPrefix,interpretNumericEntities:"boolean"===typeof e.interpretNumericEntities?e.interpretNumericEntities:a.interpretNumericEntities,parameterLimit:"number"===typeof e.parameterLimit?e.parameterLimit:a.parameterLimit,parseArrays:!1!==e.parseArrays,plainObjects:"boolean"===typeof e.plainObjects?e.plainObjects:a.plainObjects,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:a.strictNullHandling}};e.exports=function(e,t){var r=y(t);if(""===e||null===e||"undefined"===typeof e)return r.plainObjects?Object.create(null):{};for(var o="string"===typeof e?f(e,r):e,i=r.plainObjects?Object.create(null):{},a=Object.keys(o),c=0;c<a.length;++c){var s=a[c],l=d(s,o[s],r,"string"===typeof e);i=n.merge(i,l,r)}return n.compact(i)}},b313:function(e,t,r){"use strict";var n=String.prototype.replace,o=/%20/g,i=r("d233"),a={RFC1738:"RFC1738",RFC3986:"RFC3986"};e.exports=i.assign({default:a.RFC3986,formatters:{RFC1738:function(e){return n.call(e,o,"+")},RFC3986:function(e){return String(e)}}},a)},ce13:function(e,t,r){},d233:function(e,t,r){"use strict";var n=Object.prototype.hasOwnProperty,o=Array.isArray,i=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),a=function(e){while(e.length>1){var t=e.pop(),r=t.obj[t.prop];if(o(r)){for(var n=[],i=0;i<r.length;++i)"undefined"!==typeof r[i]&&n.push(r[i]);t.obj[t.prop]=n}}},c=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},n=0;n<e.length;++n)"undefined"!==typeof e[n]&&(r[n]=e[n]);return r},s=function e(t,r,i){if(!r)return t;if("object"!==typeof r){if(o(t))t.push(r);else{if(!t||"object"!==typeof t)return[t,r];(i&&(i.plainObjects||i.allowPrototypes)||!n.call(Object.prototype,r))&&(t[r]=!0)}return t}if(!t||"object"!==typeof t)return[t].concat(r);var a=t;return o(t)&&!o(r)&&(a=c(t,i)),o(t)&&o(r)?(r.forEach((function(r,o){if(n.call(t,o)){var a=t[o];a&&"object"===typeof a&&r&&"object"===typeof r?t[o]=e(a,r,i):t.push(r)}else t[o]=r})),t):Object.keys(r).reduce((function(t,o){var a=r[o];return n.call(t,o)?t[o]=e(t[o],a,i):t[o]=a,t}),a)},l=function(e,t){return Object.keys(t).reduce((function(e,r){return e[r]=t[r],e}),e)},u=function(e,t,r){var n=e.replace(/\+/g," ");if("iso-8859-1"===r)return n.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(n)}catch(o){return n}},f=function(e,t,r){if(0===e.length)return e;var n=e;if("symbol"===typeof e?n=Symbol.prototype.toString.call(e):"string"!==typeof e&&(n=String(e)),"iso-8859-1"===r)return escape(n).replace(/%u[0-9a-f]{4}/gi,(function(e){return"%26%23"+parseInt(e.slice(2),16)+"%3B"}));for(var o="",a=0;a<n.length;++a){var c=n.charCodeAt(a);45===c||46===c||95===c||126===c||c>=48&&c<=57||c>=65&&c<=90||c>=97&&c<=122?o+=n.charAt(a):c<128?o+=i[c]:c<2048?o+=i[192|c>>6]+i[128|63&c]:c<55296||c>=57344?o+=i[224|c>>12]+i[128|c>>6&63]+i[128|63&c]:(a+=1,c=65536+((1023&c)<<10|1023&n.charCodeAt(a)),o+=i[240|c>>18]+i[128|c>>12&63]+i[128|c>>6&63]+i[128|63&c])}return o},p=function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],n=0;n<t.length;++n)for(var o=t[n],i=o.obj[o.prop],c=Object.keys(i),s=0;s<c.length;++s){var l=c[s],u=i[l];"object"===typeof u&&null!==u&&-1===r.indexOf(u)&&(t.push({obj:i,prop:l}),r.push(u))}return a(t),e},d=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},y=function(e){return!(!e||"object"!==typeof e)&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},m=function(e,t){return[].concat(e,t)},h=function(e,t){if(o(e)){for(var r=[],n=0;n<e.length;n+=1)r.push(t(e[n]));return r}return t(e)};e.exports={arrayToObject:c,assign:l,combine:m,compact:p,decode:u,encode:f,isBuffer:y,isRegExp:d,maybeMap:h,merge:s}},d81d:function(e,t,r){"use strict";var n=r("23e7"),o=r("b727").map,i=r("1dde"),a=r("ae40"),c=i("map"),s=a("map");n({target:"Array",proto:!0,forced:!c||!s},{map:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}})}}]);