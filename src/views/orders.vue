
<template>
  <div class="tx-dx-orders">
    <div class="ordertab">
      <van-nav-bar
        title="我的订单"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <div>
        <span
          @click="jsTabsbar(item.id)"
          :class="[+step === item.id ? 'on' : '']"
          v-for="(item, index) in stepArr"
          :key="index"
          >{{ item.text }}</span
        >
      </div>
    </div>
    <div class="orderlist-box">
      <van-list v-model="loading" :finished="finished" @load="firstAPI">
        <ul v-if="list.length > 0" class="orderlist">
          <li
            v-for="(it, index) in list"
            :key="it.order_id"
            @click="orderdetailCl(it)"
          >
            <div class="hed">
              <span></span>
              <span class="hed-2">
                <template v-if="it.cancel === 1"> 交易已取消 </template>
                <template v-else>
                  {{
                    it.step === 1
                      ? "交易完成"
                      : it.step === 2
                      ? "待支付"
                      : it.step === 3
                      ? "待发货"
                      : it.step === 4
                      ? "待收货"
                      : "待评论"
                  }}
                </template>
              </span>
            </div>
            <div class="conbox">
              <div class="item1">
                <div
                  class="item1_1"
                  v-for="(op, index) in it.shop.slice(0, 4)"
                  :key="index"
                >
                  <img :src="op.cover_img" alt="" />
                  <!-- <p>{{op.title}}</p> -->
                </div>
              </div>
              <div class="item2">
                <p
                  v-for="(op, index) in it.shop.slice(0, 4)"
                  :key="index + 'title'"
                >
                  {{ op.title }}
                </p>
                <!-- <p>蓝色；2000毫安</p> -->
                <p>共{{ it.shop.length }}件</p>
              </div>
            </div>
            <div class="money">
              <span class="item1">创建时间：{{ it.create_time }}</span>
              <span class="item2"
                >实付：<span>¥ {{ it.pay_money }}</span></span
              >
            </div>
            <div class="btnbox">
              <div v-if="it.step === 1">
                <!-- <van-button color="#151516" class="bc9c9c9c" :hairline="true" plain @click.stop="redCallFn(it, 98)" v-if="it.cancel == 1">再次购买</van-button> -->
                <van-button
                  color="#151516"
                  class="bc9c9c9c"
                  :hairline="true"
                  plain
                  @click.stop="redCallFn(it, 97)"
                  v-if="it.cancel == 1"
                  >删除订单</van-button
                >
              </div>
              <!-- <div v-if="it.step === 2"> -->
              <div v-if="it.step !== 1">
                <!-- <van-button color="#e02e24" @click.stop="redCallFn(it,100)" v-if="it.cancel === 0">去支付</van-button> -->
                <van-button
                  color="#e02e24"
                  @click.stop="redCallFn(it, 100)"
                  v-if="it.cancel === 0 && it.step === 2"
                  >去支付</van-button
                >
                <!-- <van-button color="#151516" class="bc9c9c9c" :hairline="true" plain @click.stop="redCallFn(it, 98)" v-if="it.cancel == 1">再次购买</van-button> -->
                <van-button
                  color="#151516"
                  class="bc9c9c9c"
                  :hairline="true"
                  plain
                  @click.stop="redCallFn(it, 99, index)"
                  v-if="it.cancel === 0"
                  >取消订单</van-button
                >
                <van-button
                  color="#151516"
                  class="bc9c9c9c"
                  :hairline="true"
                  plain
                  @click.stop="redCallFn(it, 97)"
                  v-if="it.cancel == 1"
                  >删除订单</van-button
                >
              </div>
              <div v-if="it.step === 3">
                <!-- <van-button color="#151516" class="bc9c9c9c" :hairline="true" plain @click.stop="redCallFn(it, 98)">再次购买</van-button> -->
                <!-- <van-button color="#151516" class="bc9c9c9c" :hairline="true" plain @click.stop="redCallFn(it, 96)">查看物流</van-button>
                            <van-button color="#151516" class="bc9c9c9c" :hairline="true" plain @click.stop="redCallFn(it, 95)">申请退款</van-button>
                            <van-button color="#151516" class="bc9c9c9c" :hairline="true" plain @click.stop="redCallFn(it, 94)">延长收货</van-button> -->
              </div>
              <!-- <div v-if="it.step === 4> -->
              <div v-if="it.step === 4 && it.cancel === 0">
                <van-button
                  color="#e02e24"
                  @click.stop="redCallFn(it, 93, index)"
                  >确认收货</van-button
                >
                <!-- <van-button color="#151516" class="bc9c9c9c" :hairline="true" plain @click.stop="redCallFn(it, 96)">查看物流</van-button>
                            <van-button color="#151516" class="bc9c9c9c" :hairline="true" plain @click.stop="redCallFn(it, 95)">申请退款</van-button>
                            <van-button color="#151516" class="bc9c9c9c" :hairline="true" plain @click.stop="redCallFn(it, 94)">延长收货</van-button> -->
              </div>
              <div v-if="it.step === 5">
                <van-button
                  color="#e02e24"
                  @click.stop="redCallFn(it, 92, index)"
                  >立即评价</van-button
                >
                <!-- <van-button color="#151516" class="bc9c9c9c" :hairline="true" plain @click.stop="redCallFn(it, 98)">再次购买</van-button> -->
                <van-button
                  color="#151516"
                  class="bc9c9c9c"
                  :hairline="true"
                  plain
                  @click.stop="redCallFn(it, 97)"
                  >删除订单</van-button
                >
                <!-- <van-button color="#151516" class="bc9c9c9c" :hairline="true" plain @click.stop="redCallFn(it, 96)">查看物流</van-button>
                            <van-button color="#151516" class="bc9c9c9c" :hairline="true" plain @click.stop="redCallFn(it, 95)">申请退款</van-button>-->
              </div>
            </div>
          </li>
        </ul>
        <div class="orders-empty" v-if="listempty">
          <van-icon name="orders-o" />
          <p class="item1">你还没有相关的订单</p>
        </div>
        <template #finished>
          <div class="orders-empty-1" v-if="finished && +step !== 0">
            没找到订单？试试<span @click="orderAllCl">查看全部</span>
          </div>
          <div class="orders-empty-1" v-if="finished && +step === 0">
            您已经没有更多的订单了
          </div>
        </template>
      </van-list>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import { apiHost, specfield } from "@/plugins/path";
import axios from "@/plugins/axios";
export default {
  data() {
    return {
      list: [],
      listempty: false,
      stepArr: [
        { id: 0, text: "全部" },
        { id: 1, text: "已完成" },
        { id: 2, text: "待支付" },
        { id: 3, text: "待发货" },
        { id: 4, text: "待收货" },
        { id: 5, text: "待评价" },
      ],
      loading: false,
      finished: false,
      page: 0,
      limit: 8,
      step: this.$route.params.type,
      cancel: "",
    };
  },
  mounted() {
    console.log("修改确认2");
  },
  methods: {
    onClickLeft() {
      this.$router.replace({
        name: "personal",
      });
    },
    redCallFn(o, n, index) {
      let that = this;
      // n==99 取消订单
      if (n === 99) {
        that.$dialog
          .confirm({
            message: "请您再确认一次",
          })
          .then(() => {
            const toast1 = that.$toast.loading({
              duration: 0,
              message: "订单取消中...",
              forbidClick: true,
            });
            axios
              .post(
                `${apiHost}/order/cancel`,
                qs.stringify({ order_id: o.order_id, step: o.step })
              )
              .then((res) => {
                toast1.clear();
                let { data } = res;
                let { status, message } = data;

                if (status === 1) {
                  if (+that.step === 0) {
                    let obj = { ...o };
                    obj.cancel = 1;
                    that.$set(that.list, index, obj);
                  } else {
                    let listarr;
                    listarr = that.list.filter((item) => {
                      return item.order_id !== o.order_id;
                    });
                    let len = listarr.length;
                    if (len === 0) {
                      that.listempty = true;
                    }
                    that.list = listarr;
                  }
                }
                that.$toast(`${message}`);
              });
          });
      } else if (n === 97) {
        that.$dialog
          .confirm({
            title: "确认删除订单？",
            message: "删除之后订单无法恢复，无法处理您的售后问题，请慎重考虑",
          })
          .then(() => {
            const toast1 = that.$toast.loading({
              duration: 0,
              message: "订单取消中...",
              forbidClick: true,
            });
            axios
              .post(
                `${apiHost}/order/delete`,
                qs.stringify({ order_id: o.order_id })
              )
              .then((res) => {
                toast1.clear();
                let { data } = res;
                let { status, message } = data;
                let listarr;
                if (status === 1) {
                  listarr = that.list.filter((item) => {
                    return item.order_id !== o.order_id;
                  });
                  let len = listarr.length;
                  if (len === 0) {
                    that.listempty = true;
                  }
                  that.list = listarr;
                }
                that.$toast(`${message}`);
              });
          });
      } else if (n === 93) {
        that.$dialog
          .confirm({
            title: "确认收货？",
            message: "确认收货",
          })
          .then(() => {
            const toast1 = that.$toast.loading({
              duration: 0,
              message: "收货中...",
              forbidClick: true,
            });
            axios
              .post(
                `${apiHost}/order/take`,
                qs.stringify({ order_id: o.order_id })
              )
              .then((res) => {
                toast1.clear();
                let { data } = res;
                let { status, message } = data;
                if (status === 1) {
                  if (+that.step === 0) {
                    let obj = { ...o };
                    obj.step = 5;

                    that.$set(that.list, index, obj);
                  } else {
                    let listarr;
                    listarr = that.list.filter((item) => {
                      return item.order_id !== o.order_id;
                    });
                    let len = listarr.length;
                    if (len === 0) {
                      that.listempty = true;
                    }
                    that.list = listarr;
                  }
                }
                that.$toast(`${message}`);
              });
          });
      } else if (n === 92) {
        console.log(o);
        let shoparr = Array.isArray(o.shop) ? o.shop : [];
        if (shoparr.length === 0) {
          that.$toast("系统错误，暂无商品可评论");
        } else if (shoparr.length === 1) {
          sessionStorage.setItem("shopping", JSON.stringify(shoparr[0]));
          sessionStorage.setItem("comshop", "");
          that.$router.push({
            name: "comments",
            params: { shopping_id: shoparr[0].shopping_id },
          });
        } else {
          sessionStorage.setItem("comshop", JSON.stringify(o.shop));
          sessionStorage.setItem("shopping", "");
          that.$router.push({
            name: "cachecomments",
          });
        }
      } else if (n === 98) {
        that.$router.push({
          name: "goods",
          params: { id: o.shop[0].commodity_id, type: o.type },
        });
      } else if (n === 100) {
        const toast1 = that.$toast.loading({
          duration: 0,
          message: "支付中...",
          forbidClick: true,
        });
        axios
          .get(`${apiHost}/order/pay`, { params: { order_id: o.order_id } })
          .then((res) => {
            toast1.clear();
            let { data } = res;
            let { status, message, info } = data;

            if (status === 1) {
              window.location.href = info.direct_url;
              //    if(info.has_pay === 1){
              //         window.location.href = info.direct_url;
              //     }else if(info.has_pay === 0){
              //         that.$toast(`${message}`)
              //         that.$router.replace({
              //             name:"orders",
              //             params:{type:3}
              //         })// 支付成功待收货
              //     }
            } else {
              that.$toast(`${message}`);
            }
          });
      }
    },
    orderdetailCl(it) {
      this.$router.push({
        name: "order",
        params: { order_id: it.order_id },
      });
    },
    as(o) {
      let obj = [];
      Object.keys(o).map((i) => {
        if (!specfield.includes(i)) {
          obj.push(o[i]);
        }
      });
      return obj.join(",");
    },
    orderAllCl() {
      this.step = 0;
      this.page = 0;
      this.list = [];
      this.firstAPI();
    },
    jsTabsbar(o) {
      if (+this.step !== o) {
        this.$router.replace({
          name: "orders",
          params: { type: o },
        });
        this.step = o;
        this.listempty = false;
        this.page = 0;
        this.list = [];
        this.loading = true;
        this.finished = false;
        this.firstAPI();
      }
    },
    firstAPI() {
      let that = this;
      that.page = that.page + 1;
      let CancelToken = axios.cancelToken;
      axios
        .post(
          `${apiHost}/order`,
          qs.stringify({ step: +that.step, page: that.page, limit: 10 }),
          {
            cancelToken: new CancelToken(function executor(c) {
              that.cancel = c;
            }),
          }
        )
        .then((res) => {
          let { data } = res;
          let { info, status, message } = data;
          if (status === 1) {
            if (info.length < 10) {
              that.finished = true;
            }
            if (info.length === 0 && that.page === 1) {
              that.listempty = true;
            }
            if (info.length > 0) {
              that.list = that.list.concat(...info);
            }
          } else {
            that.$toast(`${message}`);
            that.finished = true;
          }
          that.loading = false;
        });
    },
  },
};
</script>
<style lang="scss" >
.tx-dx-orders {
  min-height: 100vh;
  .orderlist-box {
    padding-top: 1.6rem;
  }
  .orderlist {
    li {
      font-size: 14px;
      margin-bottom: 12px;
    }
    .hed {
      background: #fff;
      padding: 8px 12px;
      display: flex;
      justify-content: space-between;
      .hed-2 {
        color: #e02e24;
        white-space: nowrap;
        overflow-x: hidden;
        text-overflow: ellipsis;
        line-height: normal;
      }
    }
    .money {
      background: #fff;
      display: flex;
      justify-content: space-between;
      padding: 8px 12px;
      font-size: 12px;
      .item2 {
        span {
          font-size: 14px;
        }
      }
    }
    .btnbox {
      border-top: 1px solid #f4f4f4;
      padding: 8px 12px;
      background: #fff;
      overflow: hidden;
      .van-button {
        height: 30px;
        float: right;
        min-width: 1.6rem;
        padding: 0;
        margin-right: 0.2rem;
        &:first-child {
          margin-right: 0;
        }
      }
      .bc9c9c9c {
        border-color: #9c9c9c !important;
      }
    }
    .conbox {
      border-top: 1px solid #f4f4f4;
      padding: 5px 12px;
      background: #f4f4f4;
      display: flex;
      // justify-content: space-between;
      // align-items: center;
      .item1 {
        img {
          width: 1.6rem;
          height: 1.6rem;
          display: block;
          background: #f4f4f4;
        }
        // flex: 1;
        // display: flex;
        // align-items: center;
        // min-width: 0;
        // .item1_1{
        // margin-right: .1rem;
        // width: 1.6rem;
        // &:last-child{
        //     margin-right: 0;
        // }
        // img{
        //     width: 1.6rem;
        //     height: 1.6rem;
        //     display: block;
        //     background: #f4f4f4;
        // }
        // p{
        //     overflow: hidden;
        //     text-overflow: ellipsis;
        //     height: 14px;
        //     font-size: 10px;
        //     line-height: 1;
        //     margin-top: 5px;
        //     white-space: nowrap;
        // }
        // }
      }
      .item2 {
        // width: 12px;
        font-size: 12px;
        color: #9c9c9c;
        // text-align: center;
        margin-left: 0.2rem;

        width: 70vw;
        & > p:nth-child(1) {
          color: #333;
          overflow: hidden; /*超出部分隐藏*/
          white-space: nowrap; /*不换行*/
          text-overflow: ellipsis; /*超出部分文字以...显示*/
        }
      }
      /*
            .item3{
                color: #9c9c9c;
                align-self: baseline;
            }
            .item2{
                flex: 1;
                align-self: baseline;
                padding: 6px;
                display: flex;
                flex-direction: column;
                height: 2rem;
            }
            .item2_1{
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .item2_2{
                margin-top: 5px;
                color: #9c9c9c;
                font-size: 12px;
                line-height: 1.2;
                height: 12px;
            }
            .item2_3{
                margin-top: 5px;
            }
            .item1{
                width: 2rem;
                height: 2rem;
                img{
                    width: 100%;
                    display: block;
                }
            }*/
    }
  }
  .ordertab {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    font-size: 16px;
    background: #fff;
    border-bottom: 1px solid #ccc;
    height: 1.6rem;
    z-index: 10;
    > div {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 0.8rem;
    }
    .van-nav-bar__text,
    .van-icon-arrow-left,
    .van-icon-weapp-nav {
      color: #151516;
    }
    span {
      position: relative;
      height: 0.8rem;
      line-height: 0.8rem;
      &.on {
        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background: #e02e24;
        }
      }
    }
  }
  .orders-empty-1 {
    color: #9c9c9c;
    font-size: 14px;
    text-align: center;
    // margin: .2rem 0 1rem;
    span {
      color: #0076ff;
    }
  }
  .orders-empty {
    color: #9c9c9c;
    font-size: 14px;
    text-align: center;
    margin-top: 2rem;
    .van-icon-orders-o {
      font-size: 2rem;
    }
    .item1 {
      color: #58595b;
      margin-top: 0.1rem;
    }
  }
}
</style>