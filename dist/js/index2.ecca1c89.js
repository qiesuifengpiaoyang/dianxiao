(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["index2"],{"076e":function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("van-tabbar",{attrs:{route:"",value:e.active,"active-color":"#e02e24","inactive-color":"#000"}},[r("van-tabbar-item",{attrs:{icon:"home-o",name:"首页",to:"/"}},[e._v("首页")]),r("van-tabbar-item",{attrs:{icon:"apps-o",name:"分类",to:"/classification/6"}},[e._v("分类")]),r("van-tabbar-item",{attrs:{icon:"shopping-cart-o",name:"购物车",to:"/shopcat"}},[e._v("购物车")]),r("van-tabbar-item",{attrs:{icon:"contact",name:"个人中心",to:"/personal"}},[e._v("个人中心")]),r("van-tabbar-item",{attrs:{icon:"home-o"},on:{click:e.fh}},[e._v("同心台")])],1)},o=[],a={data:function(){return{}},props:{active:{}},methods:{fh:function(){window.location.href="/#/"}}},i=a,c=r("2877"),s=Object(c["a"])(i,n,o,!1,null,null,null);t["a"]=s.exports},11754:function(e,t,r){"use strict";var n=r("dce7"),o=r.n(n);o.a},4127:function(e,t,r){"use strict";var n=r("d233"),o=r("b313"),a=Object.prototype.hasOwnProperty,i={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},c=Array.isArray,s=Array.prototype.push,l=function(e,t){s.apply(e,c(t)?t:[t])},u=Date.prototype.toISOString,f=o["default"],p={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:n.encode,encodeValuesOnly:!1,format:f,formatter:o.formatters[f],indices:!1,serializeDate:function(e){return u.call(e)},skipNulls:!1,strictNullHandling:!1},d=function(e){return"string"===typeof e||"number"===typeof e||"boolean"===typeof e||"symbol"===typeof e||"bigint"===typeof e},h=function e(t,r,o,a,i,s,u,f,h,y,m,v,b){var g=t;if("function"===typeof u?g=u(r,g):g instanceof Date?g=y(g):"comma"===o&&c(g)&&(g=n.maybeMap(g,(function(e){return e instanceof Date?y(e):e})).join(",")),null===g){if(a)return s&&!v?s(r,p.encoder,b,"key"):r;g=""}if(d(g)||n.isBuffer(g)){if(s){var w=v?r:s(r,p.encoder,b,"key");return[m(w)+"="+m(s(g,p.encoder,b,"value"))]}return[m(r)+"="+m(String(g))]}var j,O=[];if("undefined"===typeof g)return O;if(c(u))j=u;else{var x=Object.keys(g);j=f?x.sort(f):x}for(var S=0;S<j.length;++S){var k=j[S],N=g[k];if(!i||null!==N){var C=c(g)?"function"===typeof o?o(r,k):r:r+(h?"."+k:"["+k+"]");l(O,e(N,C,o,a,i,s,u,f,h,y,m,v,b))}}return O},y=function(e){if(!e)return p;if(null!==e.encoder&&void 0!==e.encoder&&"function"!==typeof e.encoder)throw new TypeError("Encoder has to be a function.");var t=e.charset||p.charset;if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var r=o["default"];if("undefined"!==typeof e.format){if(!a.call(o.formatters,e.format))throw new TypeError("Unknown format option provided.");r=e.format}var n=o.formatters[r],i=p.filter;return("function"===typeof e.filter||c(e.filter))&&(i=e.filter),{addQueryPrefix:"boolean"===typeof e.addQueryPrefix?e.addQueryPrefix:p.addQueryPrefix,allowDots:"undefined"===typeof e.allowDots?p.allowDots:!!e.allowDots,charset:t,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:p.charsetSentinel,delimiter:"undefined"===typeof e.delimiter?p.delimiter:e.delimiter,encode:"boolean"===typeof e.encode?e.encode:p.encode,encoder:"function"===typeof e.encoder?e.encoder:p.encoder,encodeValuesOnly:"boolean"===typeof e.encodeValuesOnly?e.encodeValuesOnly:p.encodeValuesOnly,filter:i,formatter:n,serializeDate:"function"===typeof e.serializeDate?e.serializeDate:p.serializeDate,skipNulls:"boolean"===typeof e.skipNulls?e.skipNulls:p.skipNulls,sort:"function"===typeof e.sort?e.sort:null,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:p.strictNullHandling}};e.exports=function(e,t){var r,n,o=e,a=y(t);"function"===typeof a.filter?(n=a.filter,o=n("",o)):c(a.filter)&&(n=a.filter,r=n);var s,u=[];if("object"!==typeof o||null===o)return"";s=t&&t.arrayFormat in i?t.arrayFormat:t&&"indices"in t?t.indices?"indices":"repeat":"indices";var f=i[s];r||(r=Object.keys(o)),a.sort&&r.sort(a.sort);for(var p=0;p<r.length;++p){var d=r[p];a.skipNulls&&null===o[d]||l(u,h(o[d],d,f,a.strictNullHandling,a.skipNulls,a.encode?a.encoder:null,a.filter,a.sort,a.allowDots,a.serializeDate,a.formatter,a.encodeValuesOnly,a.charset))}var m=u.join(a.delimiter),v=!0===a.addQueryPrefix?"?":"";return a.charsetSentinel&&("iso-8859-1"===a.charset?v+="utf8=%26%2310003%3B&":v+="utf8=%E2%9C%93&"),m.length>0?v+m:""}},4328:function(e,t,r){"use strict";var n=r("4127"),o=r("9e6a"),a=r("b313");e.exports={formats:a,parse:o,stringify:n}},"4de4":function(e,t,r){"use strict";var n=r("23e7"),o=r("b727").filter,a=r("1dde"),i=r("ae40"),c=a("filter"),s=i("filter");n({target:"Array",proto:!0,forced:!c||!s},{filter:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}})},5576:function(e,t,r){"use strict";var n=r("d5dd"),o=r.n(n);o.a},5681:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("van-popup",{attrs:{value:e.show,"get-container":"body"}},[r("div",{staticClass:"tx-dx-searchmask"},[r("div",{staticClass:"searchmask-hed"},[r("van-icon",{attrs:{name:"arrow-left"},on:{click:e.arrowLeftCl}}),r("div",{staticClass:"searchinp-right"},[r("form",{attrs:{action:"/"}},[r("van-search",{ref:"vansearch",attrs:{"show-action":"",placeholder:"请输入搜索关键词"},on:{search:e.onSearch},scopedSlots:e._u([{key:"action",fn:function(){return[r("div",{on:{click:e.onSearch}},[e._v("搜索")])]},proxy:!0}]),model:{value:e.searchvalue,callback:function(t){e.searchvalue=t},expression:"searchvalue"}})],1)])],1),r("div",{staticClass:"searchmask-con"},[r("div",{staticClass:"item1"},[r("div",{staticClass:"item1-1"},[r("van-icon",{attrs:{name:"clock"}}),e._v(" 最近搜索 ")],1),r("van-icon",{attrs:{name:"delete"}})],1),r("div",{staticClass:"item1-box"},e._l(e.searchmenu,(function(t){return r("van-tag",{key:t.value,attrs:{round:"",color:"#f4f4f4","text-color":"#58595b"},on:{click:function(r){return e.jsTotag(t.value)}}},[e._v(e._s(t.value))])})),1)])])])},o=[],a=(r("4de4"),r("fb6a"),r("4328"),r("a813"),r("be3b"),{data:function(){return{searchvalue:this.$route.params.keyword,searchmenu:JSON.parse(localStorage.getItem("searchmenu"))||[]}},props:{show:{default:!1},form:{},formNar:{}},watch:{form:function(e,t){"close"===e&&(this.searchvalue="")}},mounted:function(){},methods:{parantDOMcl:function(){this.$refs.vansearch.querySelector("input[type=search]").focus()},arrowLeftCl:function(){"classification"===this.formNar?this.$emit("update:show",!1):window.location.href="".concat(sessionStorage.getItem("seurl"))},jsTotag:function(e){this.searchvalue=e,this.onSearch()},onSearch:function(){var e=this,t=e.$route.params;t.keyword=e.searchvalue;var r,n=JSON.parse(localStorage.getItem("searchmenu"))||[];n.length;r=n.filter((function(t){return t.value!==e.searchvalue})),r.unshift({value:e.searchvalue}),r.length>8&&(r=r.slice(0,8)),localStorage.setItem("searchmenu",JSON.stringify(r)),e.$emit("onSearch",{opt_name:t.opt_name,keyword:e.searchvalue,type:t.type,class_id:t.class_id})}}}),i=a,c=(r("11754"),r("2877")),s=Object(c["a"])(i,n,o,!1,null,null,null);t["a"]=s.exports},"9e6a":function(e,t,r){"use strict";var n=r("d233"),o=Object.prototype.hasOwnProperty,a=Array.isArray,i={allowDots:!1,allowPrototypes:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:n.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},c=function(e){return e.replace(/&#(\d+);/g,(function(e,t){return String.fromCharCode(parseInt(t,10))}))},s=function(e,t){return e&&"string"===typeof e&&t.comma&&e.indexOf(",")>-1?e.split(","):e},l="utf8=%26%2310003%3B",u="utf8=%E2%9C%93",f=function(e,t){var r,f={},p=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,d=t.parameterLimit===1/0?void 0:t.parameterLimit,h=p.split(t.delimiter,d),y=-1,m=t.charset;if(t.charsetSentinel)for(r=0;r<h.length;++r)0===h[r].indexOf("utf8=")&&(h[r]===u?m="utf-8":h[r]===l&&(m="iso-8859-1"),y=r,r=h.length);for(r=0;r<h.length;++r)if(r!==y){var v,b,g=h[r],w=g.indexOf("]="),j=-1===w?g.indexOf("="):w+1;-1===j?(v=t.decoder(g,i.decoder,m,"key"),b=t.strictNullHandling?null:""):(v=t.decoder(g.slice(0,j),i.decoder,m,"key"),b=n.maybeMap(s(g.slice(j+1),t),(function(e){return t.decoder(e,i.decoder,m,"value")}))),b&&t.interpretNumericEntities&&"iso-8859-1"===m&&(b=c(b)),g.indexOf("[]=")>-1&&(b=a(b)?[b]:b),o.call(f,v)?f[v]=n.combine(f[v],b):f[v]=b}return f},p=function(e,t,r,n){for(var o=n?t:s(t,r),a=e.length-1;a>=0;--a){var i,c=e[a];if("[]"===c&&r.parseArrays)i=[].concat(o);else{i=r.plainObjects?Object.create(null):{};var l="["===c.charAt(0)&&"]"===c.charAt(c.length-1)?c.slice(1,-1):c,u=parseInt(l,10);r.parseArrays||""!==l?!isNaN(u)&&c!==l&&String(u)===l&&u>=0&&r.parseArrays&&u<=r.arrayLimit?(i=[],i[u]=o):i[l]=o:i={0:o}}o=i}return o},d=function(e,t,r,n){if(e){var a=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,i=/(\[[^[\]]*])/,c=/(\[[^[\]]*])/g,s=r.depth>0&&i.exec(a),l=s?a.slice(0,s.index):a,u=[];if(l){if(!r.plainObjects&&o.call(Object.prototype,l)&&!r.allowPrototypes)return;u.push(l)}var f=0;while(r.depth>0&&null!==(s=c.exec(a))&&f<r.depth){if(f+=1,!r.plainObjects&&o.call(Object.prototype,s[1].slice(1,-1))&&!r.allowPrototypes)return;u.push(s[1])}return s&&u.push("["+a.slice(s.index)+"]"),p(u,t,r,n)}},h=function(e){if(!e)return i;if(null!==e.decoder&&void 0!==e.decoder&&"function"!==typeof e.decoder)throw new TypeError("Decoder has to be a function.");if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var t="undefined"===typeof e.charset?i.charset:e.charset;return{allowDots:"undefined"===typeof e.allowDots?i.allowDots:!!e.allowDots,allowPrototypes:"boolean"===typeof e.allowPrototypes?e.allowPrototypes:i.allowPrototypes,arrayLimit:"number"===typeof e.arrayLimit?e.arrayLimit:i.arrayLimit,charset:t,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:i.charsetSentinel,comma:"boolean"===typeof e.comma?e.comma:i.comma,decoder:"function"===typeof e.decoder?e.decoder:i.decoder,delimiter:"string"===typeof e.delimiter||n.isRegExp(e.delimiter)?e.delimiter:i.delimiter,depth:"number"===typeof e.depth||!1===e.depth?+e.depth:i.depth,ignoreQueryPrefix:!0===e.ignoreQueryPrefix,interpretNumericEntities:"boolean"===typeof e.interpretNumericEntities?e.interpretNumericEntities:i.interpretNumericEntities,parameterLimit:"number"===typeof e.parameterLimit?e.parameterLimit:i.parameterLimit,parseArrays:!1!==e.parseArrays,plainObjects:"boolean"===typeof e.plainObjects?e.plainObjects:i.plainObjects,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:i.strictNullHandling}};e.exports=function(e,t){var r=h(t);if(""===e||null===e||"undefined"===typeof e)return r.plainObjects?Object.create(null):{};for(var o="string"===typeof e?f(e,r):e,a=r.plainObjects?Object.create(null):{},i=Object.keys(o),c=0;c<i.length;++c){var s=i[c],l=d(s,o[s],r,"string"===typeof e);a=n.merge(a,l,r)}return n.compact(a)}},b313:function(e,t,r){"use strict";var n=String.prototype.replace,o=/%20/g,a=r("d233"),i={RFC1738:"RFC1738",RFC3986:"RFC3986"};e.exports=a.assign({default:i.RFC3986,formatters:{RFC1738:function(e){return n.call(e,o,"+")},RFC3986:function(e){return String(e)}}},i)},d233:function(e,t,r){"use strict";var n=Object.prototype.hasOwnProperty,o=Array.isArray,a=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),i=function(e){while(e.length>1){var t=e.pop(),r=t.obj[t.prop];if(o(r)){for(var n=[],a=0;a<r.length;++a)"undefined"!==typeof r[a]&&n.push(r[a]);t.obj[t.prop]=n}}},c=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},n=0;n<e.length;++n)"undefined"!==typeof e[n]&&(r[n]=e[n]);return r},s=function e(t,r,a){if(!r)return t;if("object"!==typeof r){if(o(t))t.push(r);else{if(!t||"object"!==typeof t)return[t,r];(a&&(a.plainObjects||a.allowPrototypes)||!n.call(Object.prototype,r))&&(t[r]=!0)}return t}if(!t||"object"!==typeof t)return[t].concat(r);var i=t;return o(t)&&!o(r)&&(i=c(t,a)),o(t)&&o(r)?(r.forEach((function(r,o){if(n.call(t,o)){var i=t[o];i&&"object"===typeof i&&r&&"object"===typeof r?t[o]=e(i,r,a):t.push(r)}else t[o]=r})),t):Object.keys(r).reduce((function(t,o){var i=r[o];return n.call(t,o)?t[o]=e(t[o],i,a):t[o]=i,t}),i)},l=function(e,t){return Object.keys(t).reduce((function(e,r){return e[r]=t[r],e}),e)},u=function(e,t,r){var n=e.replace(/\+/g," ");if("iso-8859-1"===r)return n.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(n)}catch(o){return n}},f=function(e,t,r){if(0===e.length)return e;var n=e;if("symbol"===typeof e?n=Symbol.prototype.toString.call(e):"string"!==typeof e&&(n=String(e)),"iso-8859-1"===r)return escape(n).replace(/%u[0-9a-f]{4}/gi,(function(e){return"%26%23"+parseInt(e.slice(2),16)+"%3B"}));for(var o="",i=0;i<n.length;++i){var c=n.charCodeAt(i);45===c||46===c||95===c||126===c||c>=48&&c<=57||c>=65&&c<=90||c>=97&&c<=122?o+=n.charAt(i):c<128?o+=a[c]:c<2048?o+=a[192|c>>6]+a[128|63&c]:c<55296||c>=57344?o+=a[224|c>>12]+a[128|c>>6&63]+a[128|63&c]:(i+=1,c=65536+((1023&c)<<10|1023&n.charCodeAt(i)),o+=a[240|c>>18]+a[128|c>>12&63]+a[128|c>>6&63]+a[128|63&c])}return o},p=function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],n=0;n<t.length;++n)for(var o=t[n],a=o.obj[o.prop],c=Object.keys(a),s=0;s<c.length;++s){var l=c[s],u=a[l];"object"===typeof u&&null!==u&&-1===r.indexOf(u)&&(t.push({obj:a,prop:l}),r.push(u))}return i(t),e},d=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},h=function(e){return!(!e||"object"!==typeof e)&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},y=function(e,t){return[].concat(e,t)},m=function(e,t){if(o(e)){for(var r=[],n=0;n<e.length;n+=1)r.push(t(e[n]));return r}return t(e)};e.exports={arrayToObject:c,assign:l,combine:y,compact:p,decode:u,encode:f,isBuffer:h,isRegExp:d,maybeMap:m,merge:s}},d510:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"tx-dx-index2"},[r("div",{staticClass:"empty-h12"}),r("van-swipe",{staticClass:"swiper-n2",attrs:{autoplay:"3000","show-indicators":!1}},e._l(e.listswiper,(function(t,n){return r("van-swipe-item",{key:n,on:{click:function(r){return e.jsToDetail(t.turntable_id,t.type,t.commodity_id)}}},[r("a",{attrs:{href:"javascript:;"}},[r("img",{attrs:{src:t.img,alt:t.text}})])])})),1),r("van-grid",{staticClass:"list-circle-n2",attrs:{"icon-size":"80%",border:!1,"column-num":"4"}},e._l(e.listch,(function(t,n){return r("van-grid-item",{key:n,attrs:{icon:t.url,text:t.text},on:{click:function(r){return e.jsToModular(t)}}})})),1),r("Footer",{attrs:{active:"首页"}})],1)},o=[],a=r("076e"),i=r("5681"),c=(r("4328"),r("a813")),s=r("be3b"),l={data:function(){return{lpdsq:null,deg:0,turntable_id:null,current:0,form:"",isShowSearch:!1,listswiper:[],listch:[{modular_id:6,url:"./static/img/huanlegou.png",text:"代理专区"}]}},components:{Footer:a["a"],SearchMask:i["a"]},created:function(){},mounted:function(){this.firstAPI()},methods:{firstAPI:function(){var e=this,t=e.$toast.loading({duration:0,message:"加载中...",forbidClick:!0});s["a"].post("".concat(c["b"],"/shopping/advert")).then((function(r){t.clear();var n=r.data,o=n.status,a=n.info,i=n.message;1===o?e.listswiper=a:e.$toast("".concat(i))}),(function(e){t.clear()})),this.dsq()},dsq:function(){var e=this;this.lpdsq=setInterval((function(){e.deg+=15,e.deg>=360&&(e.deg=0)}),20)},jsToModular:function(e){999===e?this.$router.push({name:"everyday"}):998===e?this.$router.push({name:"lucky"}):this.$router.push({path:"classification/".concat(e.modular_id)})},jsToDetail:function(e,t,r){1==t?this.$router.push({name:"goods",params:{id:r,type:t}}):this.$router.push({name:"lucky",params:{turntable_id:e}})}},beforeDestroy:function(){clearInterval(this.lpdsq)}},u=l,f=(r("5576"),r("2877")),p=Object(f["a"])(u,n,o,!1,null,null,null);t["default"]=p.exports},d5dd:function(e,t,r){},dce7:function(e,t,r){},fb6a:function(e,t,r){"use strict";var n=r("23e7"),o=r("861d"),a=r("e8b5"),i=r("23cb"),c=r("50c4"),s=r("fc6a"),l=r("8418"),u=r("b622"),f=r("1dde"),p=r("ae40"),d=f("slice"),h=p("slice",{ACCESSORS:!0,0:0,1:2}),y=u("species"),m=[].slice,v=Math.max;n({target:"Array",proto:!0,forced:!d||!h},{slice:function(e,t){var r,n,u,f=s(this),p=c(f.length),d=i(e,p),h=i(void 0===t?p:t,p);if(a(f)&&(r=f.constructor,"function"!=typeof r||r!==Array&&!a(r.prototype)?o(r)&&(r=r[y],null===r&&(r=void 0)):r=void 0,r===Array||void 0===r))return m.call(f,d,h);for(n=new(void 0===r?Array:r)(v(h-d,0)),u=0;d<h;d++,u++)d in f&&l(n,u,f[d]);return n.length=u,n}})}}]);