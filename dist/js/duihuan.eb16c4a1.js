(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["duihuan"],{"0cbb":function(e,t,r){"use strict";var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("van-popup",{staticClass:"scgood-plu-01",attrs:{value:e.showpop,"overlay-style":{background:"rgba(0,0,0,0)"}},on:{"click-overlay":e.clickoverlay}},[r("ul",[r("li",{on:{click:function(t){return e.gohref(1)}}},[r("van-icon",{attrs:{name:"home-o"}}),r("span",[e._v("首页")])],1),r("li",{on:{click:function(t){return e.gohref(2)}}},[r("van-icon",{attrs:{name:"shopping-cart-o"}}),r("span",[e._v("购物车")])],1),r("li",{on:{click:function(t){return e.gohref(3)}}},[r("van-icon",{attrs:{name:"apps-o"}}),r("span",[e._v("分类搜索")])],1),r("li",{on:{click:function(t){return e.gohref(4)}}},[r("van-icon",{attrs:{name:"contact"}}),r("span",[e._v("我的")])],1)])])},n=[],a=(r("ac1f"),r("5319"),{data:function(){return{}},props:{showpop:{}},mounted:function(){},methods:{gohref:function(e){1===e?this.$router.replace({name:"index2"}):2===e?this.$router.replace({name:"shopcat"}):3===e?this.$router.replace({name:"classification",params:{type:1}}):4===e&&(window.location.href="/#/me")},clickoverlay:function(){this.$emit("update:showpop",!1)}}}),o=a,s=r("2877"),c=Object(s["a"])(o,i,n,!1,null,null,null);t["a"]=c.exports},1528:function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"box"},[r("van-nav-bar",{staticClass:"fbpl",attrs:{title:"领取奖品","left-text":"返回","left-arrow":""},on:{"click-left":e.onClickLeft,"click-right":e.onClickRight},scopedSlots:e._u([{key:"right",fn:function(){return[r("van-icon",{attrs:{name:"weapp-nav",size:"18"}})]},proxy:!0}])}),r("div",{staticClass:"jieshao"},[r("div",[r("img",{attrs:{src:e.prize.prize_cover_img,alt:""}})]),r("div",{staticClass:"text"},[r("p",[e._v(" 奖品名称："),r("span",[e._v(e._s(e.prize.prize_title))])]),r("p",[e._v(" 奖品价值："),r("span",[e._v(e._s(e.prize.prize_money))])]),r("p",[e._v(" 奖品描述："),r("span",[e._v(e._s(e.prize.prize_synopsis))])])])]),r("div",{staticClass:"postage"},[r("span",[e._v("邮费：")]),r("span",[e._v(e._s(e.price/100)+"元")])]),r("div",{staticStyle:{height:"0.3rem"}}),r("div",{staticClass:"shopcat-address"},[r("van-cell",{staticClass:"sad",attrs:{icon:e.addressli.icon,"is-link":""},on:{click:e.shopcatadscl},scopedSlots:e._u([{key:"title",fn:function(){return[e.addresslia.mobile?r("div",[r("p",[e._v(e._s(e.addresslia.mobile))]),r("p",[e._v(" "+e._s(e.addresslia.province)+e._s(e.addresslia.market)+e._s(e.addresslia.area)+" ")]),r("p",[e._v(" "+e._s(e.addresslia.address)+" ")])]):r("div",[e._v("请选择收货地址")])]},proxy:!0}])})],1),r("div",{staticClass:"xiangqing"},[r("p",[e._v("详情：")]),r("div",{domProps:{innerHTML:e._s(e.prize.prize_detail)}})]),r("div",{staticClass:"freight"},[r("p",[e._v("邮费说明：")]),r("div",{domProps:{innerHTML:e._s(e.postage)}})]),r("div",{staticClass:"zffs01"},[r("van-radio-group",{model:{value:e.radiopay,callback:function(t){e.radiopay=t},expression:"radiopay"}},[r("van-cell-group",e._l(e.actionsPay,(function(t,i){return r("van-cell",{key:i,class:"p-"+t.icon,attrs:{title:t.name,clickable:"",icon:t.icon},on:{click:function(r){e.radiopay=t.id}},scopedSlots:e._u([{key:"right-icon",fn:function(){return[r("van-radio",{attrs:{name:t.id}})]},proxy:!0}],null,!0)})})),1)],1)],1),r("van-submit-bar",{attrs:{price:e.price,"button-text":"确认领取"},on:{submit:e.onSubPay}}),r("more-btn",{attrs:{showpop:e.showpop},on:{"update:showpop":function(t){e.showpop=t}}})],1)},n=[],a=r("4328"),o=r.n(a),s=r("a813"),c=r("be3b"),l=r("0cbb"),u={data:function(){return{showpop:!1,postage:null,addresslia:{mobile:"",province:"",market:"",area:"",address:""},addressli:{icon:"add-square",icon1:"location",id:"",mobile:"",province:"",province_id:0,market:"",market_id:0,area:"",area_id:0,address:""},prize:[],has_pay:"",actionsPay:[{id:1,name:"支付宝",icon:"alipay"},{id:2,name:"余额支付",icon:"gold-coin"}],price:0,radiopay:1,address_id:this.$route.params.address_id||0}},created:function(){console.log(this.$router.params),this.dzxq(),this.jpxq(),this.freight()},components:{moreBtn:l["a"]},updated:function(){""!=this.addresslia.mobile&&(this.prize.province==this.addresslia.province?this.price=100*this.prize.freight:this.price=100*this.prize.freight_out),console.log(this.radiopay)},methods:{dzxq:function(){var e=this;c["a"].post("".concat(s["b"],"/address/detail"),o.a.stringify({address_id:this.$route.params.address_id||0})).then((function(t){var r=t.data,i=r.info,n=(r.message,r.status);console.log(i,"地址详情"),1==n&&(e.addresslia.mobile=i.mobile,e.addresslia.province=i.province,e.addresslia.market=i.market,e.addresslia.area=i.area,e.addresslia.address=i.address)}))},freight:function(){var e=this;c["a"].post("".concat(s["b"],"/turntable/class")).then((function(t){var r=t.data,i=r.info;r.message,r.status;e.postage=i.freight}))},shopcatadscl:function(){this.$router.push({path:"/addresses",query:{ref_page:"duihuan",address_id:this.$route.params.address_id||0,draw_id:this.$route.params.draw_id}})},jpxq:function(){var e=this;console.log(this.$route.params.draw_id,"定位一下"),c["a"].post("".concat(s["b"],"/turntable/detail"),o.a.stringify({draw_id:this.$route.params.draw_id})).then((function(t){var r=t.data,i=r.status,n=r.message,a=r.info;console.log(a,"这是商品详情"),e.prize=a,console.log(e.addresslia,e.addresslia.mobile,"收获地址"),-1==i&&e.$toast("".concat(n))}))},onSubPay:function(){var e=this;this.addresslia.mobile?(console.log(this.$route.params.draw_id,"中奖记录编号",this.$route.params.address_id,"收货地址编号"),c["a"].post("".concat(s["b"],"/turntable/bonusProcessing"),o.a.stringify({draw_id:this.$route.params.draw_id,type:1,address_id:this.$route.params.address_id,pay_type:this.radiopay})).then((function(t){var r=t.data,i=r.info,n=r.message;r.status;console.log(i,"中奖记录奖金处理"),e.$toast("".concat(n)),1==i.has_pay&&(window.location.href=i.direct_url)}))):this.$toast("请选择收货地址")},onClickLeft:function(){this.$router.go(-1)},onClickRight:function(){this.showpop=!this.showpop}}},d=u,p=(r("de94"),r("2877")),f=Object(p["a"])(d,i,n,!1,null,null,null);t["default"]=f.exports},4127:function(e,t,r){"use strict";var i=r("d233"),n=r("b313"),a=Object.prototype.hasOwnProperty,o={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},s=Array.isArray,c=Array.prototype.push,l=function(e,t){c.apply(e,s(t)?t:[t])},u=Date.prototype.toISOString,d=n["default"],p={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:i.encode,encodeValuesOnly:!1,format:d,formatter:n.formatters[d],indices:!1,serializeDate:function(e){return u.call(e)},skipNulls:!1,strictNullHandling:!1},f=function(e){return"string"===typeof e||"number"===typeof e||"boolean"===typeof e||"symbol"===typeof e||"bigint"===typeof e},h=function e(t,r,n,a,o,c,u,d,h,y,m,v,g){var b=t;if("function"===typeof u?b=u(r,b):b instanceof Date?b=y(b):"comma"===n&&s(b)&&(b=i.maybeMap(b,(function(e){return e instanceof Date?y(e):e})).join(",")),null===b){if(a)return c&&!v?c(r,p.encoder,g,"key"):r;b=""}if(f(b)||i.isBuffer(b)){if(c){var _=v?r:c(r,p.encoder,g,"key");return[m(_)+"="+m(c(b,p.encoder,g,"value"))]}return[m(r)+"="+m(String(b))]}var w,k=[];if("undefined"===typeof b)return k;if(s(u))w=u;else{var j=Object.keys(b);w=d?j.sort(d):j}for(var x=0;x<w.length;++x){var O=w[x],S=b[O];if(!o||null!==S){var C=s(b)?"function"===typeof n?n(r,O):r:r+(h?"."+O:"["+O+"]");l(k,e(S,C,n,a,o,c,u,d,h,y,m,v,g))}}return k},y=function(e){if(!e)return p;if(null!==e.encoder&&void 0!==e.encoder&&"function"!==typeof e.encoder)throw new TypeError("Encoder has to be a function.");var t=e.charset||p.charset;if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var r=n["default"];if("undefined"!==typeof e.format){if(!a.call(n.formatters,e.format))throw new TypeError("Unknown format option provided.");r=e.format}var i=n.formatters[r],o=p.filter;return("function"===typeof e.filter||s(e.filter))&&(o=e.filter),{addQueryPrefix:"boolean"===typeof e.addQueryPrefix?e.addQueryPrefix:p.addQueryPrefix,allowDots:"undefined"===typeof e.allowDots?p.allowDots:!!e.allowDots,charset:t,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:p.charsetSentinel,delimiter:"undefined"===typeof e.delimiter?p.delimiter:e.delimiter,encode:"boolean"===typeof e.encode?e.encode:p.encode,encoder:"function"===typeof e.encoder?e.encoder:p.encoder,encodeValuesOnly:"boolean"===typeof e.encodeValuesOnly?e.encodeValuesOnly:p.encodeValuesOnly,filter:o,formatter:i,serializeDate:"function"===typeof e.serializeDate?e.serializeDate:p.serializeDate,skipNulls:"boolean"===typeof e.skipNulls?e.skipNulls:p.skipNulls,sort:"function"===typeof e.sort?e.sort:null,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:p.strictNullHandling}};e.exports=function(e,t){var r,i,n=e,a=y(t);"function"===typeof a.filter?(i=a.filter,n=i("",n)):s(a.filter)&&(i=a.filter,r=i);var c,u=[];if("object"!==typeof n||null===n)return"";c=t&&t.arrayFormat in o?t.arrayFormat:t&&"indices"in t?t.indices?"indices":"repeat":"indices";var d=o[c];r||(r=Object.keys(n)),a.sort&&r.sort(a.sort);for(var p=0;p<r.length;++p){var f=r[p];a.skipNulls&&null===n[f]||l(u,h(n[f],f,d,a.strictNullHandling,a.skipNulls,a.encode?a.encoder:null,a.filter,a.sort,a.allowDots,a.serializeDate,a.formatter,a.encodeValuesOnly,a.charset))}var m=u.join(a.delimiter),v=!0===a.addQueryPrefix?"?":"";return a.charsetSentinel&&("iso-8859-1"===a.charset?v+="utf8=%26%2310003%3B&":v+="utf8=%E2%9C%93&"),m.length>0?v+m:""}},4328:function(e,t,r){"use strict";var i=r("4127"),n=r("9e6a"),a=r("b313");e.exports={formats:a,parse:n,stringify:i}},5319:function(e,t,r){"use strict";var i=r("d784"),n=r("825a"),a=r("7b0b"),o=r("50c4"),s=r("a691"),c=r("1d80"),l=r("8aa5"),u=r("14c3"),d=Math.max,p=Math.min,f=Math.floor,h=/\$([$&'`]|\d\d?|<[^>]*>)/g,y=/\$([$&'`]|\d\d?)/g,m=function(e){return void 0===e?e:String(e)};i("replace",2,(function(e,t,r,i){var v=i.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,g=i.REPLACE_KEEPS_$0,b=v?"$":"$0";return[function(r,i){var n=c(this),a=void 0==r?void 0:r[e];return void 0!==a?a.call(r,n,i):t.call(String(n),r,i)},function(e,i){if(!v&&g||"string"===typeof i&&-1===i.indexOf(b)){var a=r(t,e,this,i);if(a.done)return a.value}var c=n(e),f=String(this),h="function"===typeof i;h||(i=String(i));var y=c.global;if(y){var w=c.unicode;c.lastIndex=0}var k=[];while(1){var j=u(c,f);if(null===j)break;if(k.push(j),!y)break;var x=String(j[0]);""===x&&(c.lastIndex=l(f,o(c.lastIndex),w))}for(var O="",S=0,C=0;C<k.length;C++){j=k[C];for(var P=String(j[0]),E=d(p(s(j.index),f.length),0),$=[],N=1;N<j.length;N++)$.push(m(j[N]));var z=j.groups;if(h){var A=[P].concat($,E,f);void 0!==z&&A.push(z);var D=String(i.apply(void 0,A))}else D=_(P,f,E,$,z,i);E>=S&&(O+=f.slice(S,E)+D,S=E+P.length)}return O+f.slice(S)}];function _(e,r,i,n,o,s){var c=i+e.length,l=n.length,u=y;return void 0!==o&&(o=a(o),u=h),t.call(s,u,(function(t,a){var s;switch(a.charAt(0)){case"$":return"$";case"&":return e;case"`":return r.slice(0,i);case"'":return r.slice(c);case"<":s=o[a.slice(1,-1)];break;default:var u=+a;if(0===u)return t;if(u>l){var d=f(u/10);return 0===d?t:d<=l?void 0===n[d-1]?a.charAt(1):n[d-1]+a.charAt(1):t}s=n[u-1]}return void 0===s?"":s}))}}))},"7f75":function(e,t,r){},"9e6a":function(e,t,r){"use strict";var i=r("d233"),n=Object.prototype.hasOwnProperty,a=Array.isArray,o={allowDots:!1,allowPrototypes:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:i.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},s=function(e){return e.replace(/&#(\d+);/g,(function(e,t){return String.fromCharCode(parseInt(t,10))}))},c=function(e,t){return e&&"string"===typeof e&&t.comma&&e.indexOf(",")>-1?e.split(","):e},l="utf8=%26%2310003%3B",u="utf8=%E2%9C%93",d=function(e,t){var r,d={},p=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,f=t.parameterLimit===1/0?void 0:t.parameterLimit,h=p.split(t.delimiter,f),y=-1,m=t.charset;if(t.charsetSentinel)for(r=0;r<h.length;++r)0===h[r].indexOf("utf8=")&&(h[r]===u?m="utf-8":h[r]===l&&(m="iso-8859-1"),y=r,r=h.length);for(r=0;r<h.length;++r)if(r!==y){var v,g,b=h[r],_=b.indexOf("]="),w=-1===_?b.indexOf("="):_+1;-1===w?(v=t.decoder(b,o.decoder,m,"key"),g=t.strictNullHandling?null:""):(v=t.decoder(b.slice(0,w),o.decoder,m,"key"),g=i.maybeMap(c(b.slice(w+1),t),(function(e){return t.decoder(e,o.decoder,m,"value")}))),g&&t.interpretNumericEntities&&"iso-8859-1"===m&&(g=s(g)),b.indexOf("[]=")>-1&&(g=a(g)?[g]:g),n.call(d,v)?d[v]=i.combine(d[v],g):d[v]=g}return d},p=function(e,t,r,i){for(var n=i?t:c(t,r),a=e.length-1;a>=0;--a){var o,s=e[a];if("[]"===s&&r.parseArrays)o=[].concat(n);else{o=r.plainObjects?Object.create(null):{};var l="["===s.charAt(0)&&"]"===s.charAt(s.length-1)?s.slice(1,-1):s,u=parseInt(l,10);r.parseArrays||""!==l?!isNaN(u)&&s!==l&&String(u)===l&&u>=0&&r.parseArrays&&u<=r.arrayLimit?(o=[],o[u]=n):o[l]=n:o={0:n}}n=o}return n},f=function(e,t,r,i){if(e){var a=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,o=/(\[[^[\]]*])/,s=/(\[[^[\]]*])/g,c=r.depth>0&&o.exec(a),l=c?a.slice(0,c.index):a,u=[];if(l){if(!r.plainObjects&&n.call(Object.prototype,l)&&!r.allowPrototypes)return;u.push(l)}var d=0;while(r.depth>0&&null!==(c=s.exec(a))&&d<r.depth){if(d+=1,!r.plainObjects&&n.call(Object.prototype,c[1].slice(1,-1))&&!r.allowPrototypes)return;u.push(c[1])}return c&&u.push("["+a.slice(c.index)+"]"),p(u,t,r,i)}},h=function(e){if(!e)return o;if(null!==e.decoder&&void 0!==e.decoder&&"function"!==typeof e.decoder)throw new TypeError("Decoder has to be a function.");if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var t="undefined"===typeof e.charset?o.charset:e.charset;return{allowDots:"undefined"===typeof e.allowDots?o.allowDots:!!e.allowDots,allowPrototypes:"boolean"===typeof e.allowPrototypes?e.allowPrototypes:o.allowPrototypes,arrayLimit:"number"===typeof e.arrayLimit?e.arrayLimit:o.arrayLimit,charset:t,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:o.charsetSentinel,comma:"boolean"===typeof e.comma?e.comma:o.comma,decoder:"function"===typeof e.decoder?e.decoder:o.decoder,delimiter:"string"===typeof e.delimiter||i.isRegExp(e.delimiter)?e.delimiter:o.delimiter,depth:"number"===typeof e.depth||!1===e.depth?+e.depth:o.depth,ignoreQueryPrefix:!0===e.ignoreQueryPrefix,interpretNumericEntities:"boolean"===typeof e.interpretNumericEntities?e.interpretNumericEntities:o.interpretNumericEntities,parameterLimit:"number"===typeof e.parameterLimit?e.parameterLimit:o.parameterLimit,parseArrays:!1!==e.parseArrays,plainObjects:"boolean"===typeof e.plainObjects?e.plainObjects:o.plainObjects,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:o.strictNullHandling}};e.exports=function(e,t){var r=h(t);if(""===e||null===e||"undefined"===typeof e)return r.plainObjects?Object.create(null):{};for(var n="string"===typeof e?d(e,r):e,a=r.plainObjects?Object.create(null):{},o=Object.keys(n),s=0;s<o.length;++s){var c=o[s],l=f(c,n[c],r,"string"===typeof e);a=i.merge(a,l,r)}return i.compact(a)}},b313:function(e,t,r){"use strict";var i=String.prototype.replace,n=/%20/g,a=r("d233"),o={RFC1738:"RFC1738",RFC3986:"RFC3986"};e.exports=a.assign({default:o.RFC3986,formatters:{RFC1738:function(e){return i.call(e,n,"+")},RFC3986:function(e){return String(e)}}},o)},d233:function(e,t,r){"use strict";var i=Object.prototype.hasOwnProperty,n=Array.isArray,a=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),o=function(e){while(e.length>1){var t=e.pop(),r=t.obj[t.prop];if(n(r)){for(var i=[],a=0;a<r.length;++a)"undefined"!==typeof r[a]&&i.push(r[a]);t.obj[t.prop]=i}}},s=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},i=0;i<e.length;++i)"undefined"!==typeof e[i]&&(r[i]=e[i]);return r},c=function e(t,r,a){if(!r)return t;if("object"!==typeof r){if(n(t))t.push(r);else{if(!t||"object"!==typeof t)return[t,r];(a&&(a.plainObjects||a.allowPrototypes)||!i.call(Object.prototype,r))&&(t[r]=!0)}return t}if(!t||"object"!==typeof t)return[t].concat(r);var o=t;return n(t)&&!n(r)&&(o=s(t,a)),n(t)&&n(r)?(r.forEach((function(r,n){if(i.call(t,n)){var o=t[n];o&&"object"===typeof o&&r&&"object"===typeof r?t[n]=e(o,r,a):t.push(r)}else t[n]=r})),t):Object.keys(r).reduce((function(t,n){var o=r[n];return i.call(t,n)?t[n]=e(t[n],o,a):t[n]=o,t}),o)},l=function(e,t){return Object.keys(t).reduce((function(e,r){return e[r]=t[r],e}),e)},u=function(e,t,r){var i=e.replace(/\+/g," ");if("iso-8859-1"===r)return i.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(i)}catch(n){return i}},d=function(e,t,r){if(0===e.length)return e;var i=e;if("symbol"===typeof e?i=Symbol.prototype.toString.call(e):"string"!==typeof e&&(i=String(e)),"iso-8859-1"===r)return escape(i).replace(/%u[0-9a-f]{4}/gi,(function(e){return"%26%23"+parseInt(e.slice(2),16)+"%3B"}));for(var n="",o=0;o<i.length;++o){var s=i.charCodeAt(o);45===s||46===s||95===s||126===s||s>=48&&s<=57||s>=65&&s<=90||s>=97&&s<=122?n+=i.charAt(o):s<128?n+=a[s]:s<2048?n+=a[192|s>>6]+a[128|63&s]:s<55296||s>=57344?n+=a[224|s>>12]+a[128|s>>6&63]+a[128|63&s]:(o+=1,s=65536+((1023&s)<<10|1023&i.charCodeAt(o)),n+=a[240|s>>18]+a[128|s>>12&63]+a[128|s>>6&63]+a[128|63&s])}return n},p=function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],i=0;i<t.length;++i)for(var n=t[i],a=n.obj[n.prop],s=Object.keys(a),c=0;c<s.length;++c){var l=s[c],u=a[l];"object"===typeof u&&null!==u&&-1===r.indexOf(u)&&(t.push({obj:a,prop:l}),r.push(u))}return o(t),e},f=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},h=function(e){return!(!e||"object"!==typeof e)&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},y=function(e,t){return[].concat(e,t)},m=function(e,t){if(n(e)){for(var r=[],i=0;i<e.length;i+=1)r.push(t(e[i]));return r}return t(e)};e.exports={arrayToObject:s,assign:l,combine:y,compact:p,decode:u,encode:d,isBuffer:h,isRegExp:f,maybeMap:m,merge:c}},de94:function(e,t,r){"use strict";var i=r("7f75"),n=r.n(i);n.a}}]);