<!--收货地址-->
<template>
  <div class="addresses-wrapper" v-cloak>
    <van-nav-bar
      title="收货地址"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      class="fbpl"
    />
    <div style="height: 0.92rem"></div>
    <ul class="address-list" v-if="listShow === 2">
      <li
        v-for="(item, index) in list"
        :key="index"
        :ref="`index${index}`"
        :class="[radio === item.id ? 'on' : '']"
      >
        <div class="li-hed">
          {{ item.username }}&nbsp;{{ item.mobile }}&nbsp;
        </div>
        <div class="li-con">
          {{ item.province }}&nbsp;{{ item.market }}&nbsp;{{
            item.area
          }}&nbsp;{{ item.address }}
        </div>
        <div class="li-push" v-if="ref_page === 'duihuan'">
          <van-icon name="success" v-if="+address_idsy === +item.id" />
          <div v-else @click="address_idsycl(item)">使用</div>
        </div>
        <div class="li-push" v-if="ref_page === 'shoporder'">
          <van-icon name="success" v-if="+address_idsy === +item.id" />
          <div v-else @click="address_idsycl(item)">使用</div>
        </div>
        <div class="li-fot">
          <div class="fot-left">
            <div
              :class="[!!+item.is_default ? 'a' : 'b', 'fot-left-radio']"
              @click="add_def_fn(item, index)"
            >
              <van-icon name="checked" class="aa" v-if="!!+item.is_default" />
              <van-icon name="circle" class="bb" v-else />
              <template v-if="!!+item.is_default">
                <span class="on">已设为默认</span>
              </template>
              <template v-else>
                <span>设为默认</span>
              </template>
            </div>
          </div>
          <div class="fot-right">
            <!-- <span @click="setStick(index)">{{!item.is_top ? '置顶' : '取消置顶' }}</span> -->
            <span @click="add_del_fn(item.id, index)">删除</span>
            <span @click="address_edit_fn(item, index)">修改</span>
          </div>
        </div>
      </li>
      <li class="li-empty"></li>
    </ul>
    <div v-if="listShow === 3" class="address-empty">
      <van-icon name="location-o" />
      <p>暂无收货地址</p>
    </div>
    <div
      class="address-add"
      v-if="listShow === 3 || listShow === 2"
      @click="address_add_fn"
    >
      <van-icon name="add-square" />添加收货地址
    </div>
    <tx-add-panel
      :panelShow.sync="panelShow"
      :addpop="addpop"
      :is_edit="is_edit"
      @address_pop_fn="address_pop_fn"
    />
  </div>
</template>
<script>
import qs from "qs";
import axios from "@/plugins/axios";
import { debounce } from "lodash-es";
import { apiHost, specfield } from "@/plugins/path";
import { store } from "@/plugins/store.js";
import txAddPanel from "@/components/address/txAddPanel.vue";
export default {
  data() {
    return {
      list: [],
      listShow: 1,
      radio: 0,
      address_idsy: this.$route.query.address_id || 0,
      shopping_id: this.$route.query.shopping_id || 0,
      btnEnaled: true,
      btnshow: false,
      panelShow: false,
      is_edit: true,
      isShow: false,
      ref_page: this.$route.query.ref_page,
      addpop: {},
    };
  },
  components: {
    txAddPanel,
  },
  watch: {
    is_edit: {
      handler() {
        this.address_list_fn();
      },
      deep: true,
    },
    panelShow: {
      handler() {
        this.address_list_fn();
      },
      deep: true,
    },
  },
  created() {
    let that = this;
    // 删除地址
    that.add_del_fn = debounce(that.add_del_fn, 500, {
      leading: true,
      trailing: false,
    });
    // 修改默认地址
    that.add_def_fn = debounce(that.add_def_fn, 500, {
      leading: true,
      trailing: false,
    });
  },
  mounted() {
    this.address_list_fn();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    address_idsycl(o) {
      if (this.$route.query.ref_page == "duihuan") {
        this.address_idsy = o.id;
        // sessionStorage.setItem("addrep", JSON.stringify(o));
        this.$router.replace({
          name: "duihuan",
          params: {
            ref_page: "addresses",
            draw_id: this.$route.query.draw_id,
            address_id: this.address_idsy,
          },
        });
      } else {
        this.address_idsy = o.id;
        sessionStorage.setItem("addrep", JSON.stringify(o));
        this.$router.replace({
          name: "shopOrder",
          params: {
            ref_page: "addresses",
            address_id: this.address_idsy,
            shopping_id: this.shopping_id,
          },
        });
      }
    },
    panelShow_fn() {
      this.panelShow = !this.panelShow;
    },
    address_pop_fn(n, index) {
      if (this.is_edit) {
        this.$set(this.list, index, n);
      } else {
        // this.list.push(n)
        this.list.unshift(n);
      }
      store.setAddressListAction(this.list);
    },
    address_edit_fn(item, index) {
      // 编辑
      this.is_edit = true;
      this.panelShow_fn();
      this.addpop = item;
      this.addpop.index = index;
    },
    address_add_fn() {
      let that = this;
      if (this.list.length > 10) {
        return this.$toast({
          message: "地址最多10条",
          forbidClick: true,
        });
      }
      // 新增
      this.panelShow_fn();
      this.is_edit = false;
      this.addpop = {};
    },
    emptyaddpop() {
      let that = this;
      that.addpop = {};
    },
    address_list_fn() {
      let that = this;
      const toast1 = that.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      axios.post(`${apiHost}/address`).then((res) => {
        let { data } = res;
        let { status, message, info } = data;
        let listShow = 3;
        toast1.clear();
        if (status === 1) {
          if (Array.isArray(info)) {
            if (info.length > 0) {
              listShow = 2;
            }
          }

          let copyinfo = info;
          copyinfo.map((item) => {
            if (+item.is_default === 1) {
              that.radio = item.address_id;
            }
          });
          that.list = [].concat(...info);
          store.setAddressListAction(that.list);
        } else {
          that.$toast({
            message,
            forbidClick: true,
          });
        }
        that.listShow = listShow;
      });
    },
    add_def_fn(item, index) {
      let that = this;
      if (!!+item.is_default) {
        return;
      }
      const toast1 = that.$toast.loading({
        duration: 0,
        message: "设置中...",
        forbidClick: true,
      });
      axios
        .post(
          `${apiHost}/address/modifyDefault`,
          qs.stringify({ address_id: item.id })
        )
        .then((res) => {
          let { data } = res;
          let { status, message, info } = data;
          if (status === 1) {
            that.list.map((it) => {
              if (it.id === item.id) {
                it.is_default = 1;
              } else {
                it.is_default = 0;
              }
            });
          } else {
            that.$toast({
              message,
              forbidClick: true,
            });
          }
          toast1.clear();
        });
    },
    add_del_fn(id, index) {
      let that = this;
      let sd = [];
      that.$dialog
        .alert({
          message: "确定要删除该地址吗？",
        })
        .then(() => {
          // on close
          const toast1 = that.$toast.loading({
            duration: 0,
            message: "处理中...",
            forbidClick: true,
          });
          axios
            .post(`${apiHost}/address/delete`, qs.stringify({ id }))
            .then((res) => {
              let { data } = res;
              let { status, message, info } = data;
              if (status === 1) {
                sd = that.list.filter((item) => {
                  return item.id !== id;
                });
                that.radio = id;
                that.$refs["index" + index][0].addEventListener(
                  "animationend",
                  () => {
                    that.list = sd;
                    store.setAddressListAction(that.list);
                    that.$toast("地址删除成功");
                  }
                );
              } else {
                that.$toast(`${message}`);
              }
              toast1.clear();
            });
        });
    },
    /*
        setStick(index){
            let that = this;
            if(that.btnEnaled){
                that.btnEnaled = false;
                let listArrp = that.list[index];
                let is_top = listArrp.is_top;
                let id = listArrp.address_id;
                let url = !!listArrp.is_top ? `${apiHost}/address_cancel_top` : `${apiHost}/address_top`;
                let params = qs.stringify({id});
                axios.post(url, params)
                .then((res)=>{
                    that.btnEnaled = true;
                    let {data} = res;
                    let {status, message, info} = data;
                    if(status === 1){
                        listArrp.is_top = !is_top;
                        that.$toast({
                            message:`${!!is_top ? '取消':''}置顶成功`,
                            forbidClick:true
                        });
                        listArrp.top_time = Date.now() / 1e3;
                        that.list.length < 2 ? that.btnEnaled = true : that.stickAnimation(index);
                        
                    }else{
                        that.$toast({
                            message:`'地址'${!!is_top ? '取消':''}置顶不成功，建议稍后重试`,
                            forbidClick:true
                        });
                    }
                }).catch((err)=>{
                    that.btnEnaled = true;
                    that.$toast({
                        message:`'地址'${!!is_top ? '取消':''}置顶不成功，建议稍后重试`,
                        forbidClick:true
                    });
                })
            }
        },
        stickAnimation(e, radiocopy) {
            try{
            var t = this
                , n = this.list.concat()
                , r = n[e]
                , o = document.querySelectorAll(".address-list li")
                , i = o[e];
            n.sort(this.addressListSortFun);
           
            var s = n.indexOf(r)
                , a = o[e + 1].offsetTop - i.offsetTop;
            if (s !== e) {
                var c = this.createDom(a, "move-from")
                    , d = this.createDom(0, "move-to")
                    , u = o[s]
                    , l = s < e
                    , f = Math.abs(i.offsetTop - u.offsetTop)
                    , p = i.parentElement
                    , h = i.style.cssText;
                p.insertBefore(c, i.nextElementSibling),
                p.insertBefore(d, l ? u : u.nextElementSibling),
                i.style.position = "absolute",
                i.style.zIndex = "10",
                this.addTransaction([i, c, d]),
                setTimeout((function() {
                    d.style.height = a + "px",
                    c.style.height = "0",
                    i.style.transform = i.style["-webkit-transform"] = "translateY(".concat(l ? -f - a : f, "px)")
                }
                ), 0),
                setTimeout((function() {
                    t.removeDom([c, d]),
                    i.style.cssText = h,
                    t.list = t.list.sort(t.addressListSortFun),
                    t.btnEnaled = !0;
                    // t.radio = radiocopy;
                }
                ), 330)
            } else{ this.btnEnaled = !0}
            }catch(e){console.log(e)}
               
        }
         ,
        addressListSortFun(e, t) {
                var n = e || {}
                  , r = t || {};
                return ((n.is_top ? -n.top_time : -n.top_time / 2 || n.address_id) || 0) - ((r.is_top ? -r.top_time : -r.top_time / 2 || r.address_id) || 0)
            }
            ,
        createDom (e, t) {
            var n = document.createElement("DIV");
            return n.id = t,
            n.style.opacity = "0",
            n.style.height = e + "px",
            n
        },
        removeDom (e) {
            return [].concat(e).forEach((function(e) {
                e.parentElement.removeChild(e)
            }
            ))
        },
        addTransaction (e) {
            return [].concat(e).forEach((function(e) {
                e.style.transition = e.style["-webkit-transition"] = "all ".concat(.3, "s ease-in-out")
            }
            ))
        },
        */
  },
};
</script>
<style lang="scss">
.addresses-wrapper {
  font-size: 16px;
  padding-bottom: 1.4rem;

  .address-empty {
    text-align: center;
    font-size: 100px;
    color: #ccc;
    padding: 20px 0;
    p {
      font-size: 16px;
      color: #58595b;
    }
  }
  .address-list {
    li {
      background: #fff;
      padding: 12px 0;
      margin-bottom: 12px;
      position: relative;
      &.on {
        animation: as 0.3s ease-in-out both;
      }
    }
    .li-push {
      position: absolute;
      right: 12px;
      top: 20%;
      width: 1rem;
      height: 0.4rem;
      line-height: 0.4rem;
      text-align: center;
      font-size: 0.24rem;

      i {
        color: #e02e24;
        font-size: 0.4rem;
      }
      div {
        border: 1px solid #db5858;
        border-radius: 5px;
        color: red;
      }
    }
    .li-empty {
      height: 1px;
      opacity: 0;
      margin-bottom: 0;
      position: relative;
      background-color: #fff;
      width: 100%;
    }
    .li-hed {
      padding: 0 12px 12px;
    }
    .li-con {
      padding: 0 1.4rem 12px 12px;
    }
    .li-fot {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #f4f4f4;
      padding: 12px 12px 0;
      color: #9c9c9c;
      .fot-left-radio {
        display: flex;
        align-items: center;
        span {
          margin-left: 0.1rem;
        }
      }
      .a .aa {
        color: #e02e24;
      }
      .a {
        color: #9c9c9c;

        .on {
          color: #e02e24;
        }
      }
    }
    .fot-right {
      span {
        margin-left: 18px;
      }
    }
  }
  .address-add {
    position: fixed;
    left: 50%;
    bottom: 0.2rem;
    z-index: 1;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 0.9rem;
    background-color: #e02e24;
    color: #fff;
    font-size: 18px;
    border-radius: 5px;
    transform: translate3d(-50%, 0, 0);
    i {
      margin-right: 0.1rem;
      font-size: 26px;
    }
  }
}
@keyframes as {
  0% {
    left: 0;
  }
  100% {
    left: -100%;
  }
}
</style>