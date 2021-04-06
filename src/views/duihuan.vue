<template>
  <div class="box">
    <!-- <van-nav-bar
      title="领取奖品"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      class="fbpl"
    /> -->
        <van-nav-bar
      title="领取奖品"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      class="fbpl"
    >
      <template #right>
        <van-icon name="weapp-nav" size="18" />
      </template>
    </van-nav-bar>

    <!-- 商品介绍 -->
    <div class="jieshao">
      <div>
        <img :src="prize.prize_cover_img" alt="" />
      </div>
      <div class="text">
        <p>
          奖品名称：<span>{{ prize.prize_title }}</span>
        </p>
        <p>
          奖品价值：<span>{{ prize.prize_money }}</span>
        </p>
        <p>
          奖品描述：<span>{{ prize.prize_synopsis }}</span>
        </p>
      </div>
    </div>

    <!-- 邮费 -->
    <div class="postage">
      <span>邮费：</span>
      <span>{{price / 100}}元</span>
    </div>
    <div style="height: 0.3rem"></div>
    <div class="shopcat-address">
      <van-cell
        :icon="addressli.icon"
        is-link
        @click="shopcatadscl"
        class="sad"
      >
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #title>
          <div v-if="!addresslia.mobile">请选择收货地址</div>
          <div v-else>
            <p>{{ addresslia.mobile }}</p>
            <p>
              {{ addresslia.province }}{{ addresslia.market
              }}{{ addresslia.area }}
            </p>
            <p>
              {{ addresslia.address }}
            </p>
          </div>
        </template>
      </van-cell>
    </div>

    <!-- 商品详情 -->
    <div class="xiangqing">
      <p>详情：</p>
      <div v-html="prize.prize_detail"></div>
    </div>

    <!-- 邮费说明 -->
    <div class="freight">
      <p>邮费说明：</p>
      <div v-html="postage"></div>
    </div>

        <!--支付方式-->
    <div class="zffs01">
      <van-radio-group v-model="radiopay">
        <van-cell-group>
          <van-cell
            :class="`p-${item.icon}`"
            :title="item.name"
            clickable
            @click="radiopay = item.id"
            :icon="item.icon"
            v-for="(item, index) in actionsPay"
            :key="index"
          >
            <template #right-icon>
              <van-radio :name="item.id" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>

    <van-submit-bar :price="price" button-text="确认领取" @submit="onSubPay" />
    
    <more-btn :showpop.sync="showpop" />
  </div>
</template>
<script>
import qs, { parse } from "qs";
import { apiHost, specfield } from "@/plugins/path";
import axios from "@/plugins/axios";
import moreBtn from "@/components/morebtn.vue";
export default {
  data() {
    return {
      showpop:false,//右上角的菜单
      postage: null, //邮费说明
      addresslia: {
        mobile: "",
        province: "",
        market: "",
        area: "",
        address: "",
      },
      addressli: {
        icon: "add-square",
        icon1: "location",
        id: "",
        mobile: "",
        province: "",
        province_id: 0,
        market: "",
        market_id: 0,
        area: "",
        area_id: 0,
        address: "",
      }, //收货地址
      // zhifutc: false, //支付邮费弹窗
      prize: [], //商品详情
      has_pay: "", //支付链接
      actionsPay: [
        /*{id:1,name:"微信",icon:"wechat"},*/ {
          id: 1,
          name: "支付宝",
          icon: "alipay",
        },
        { id: 2, name: "余额支付", icon: "gold-coin" },
      ], //支付方式
      price: 0, //提交订单
      radiopay: 1,
      address_id: this.$route.params.address_id || 0,
    };
  },
  created() {
    console.log(this.$router.params);
    //收货地址详情
    this.dzxq();

    //奖品详情
    this.jpxq();

    //邮费说明
    this.freight();
  },
    components: {
    moreBtn
  },
  updated() {
    if (this.addresslia.mobile != "") {
      if (this.prize.province == this.addresslia.province) {
        this.price = this.prize.freight * 100;
      } else {
        this.price = this.prize.freight_out * 100;
      }
    }
    console.log(this.radiopay);
    // this.jpxq();
    // this.dzxq();
  },
  methods: {
    dzxq() {
      axios
        .post(
          `${apiHost}/address/detail`,
          qs.stringify({
            address_id: this.$route.params.address_id || 0,
          })
        )
        .then((val) => {
          let { data } = val;
          let { info, message, status } = data;
          console.log(info, "地址详情");
          if (status == 1) {
            // this.addresslia = info;
            this.addresslia.mobile = info.mobile;
            this.addresslia.province = info.province;
            this.addresslia.market = info.market;
            this.addresslia.area = info.area;
            this.addresslia.address = info.address;
          }
        });
    },
    //邮费说明
    freight() {
      axios.post(`${apiHost}/turntable/class`).then((val) => {
        let { data } = val;
        let { info, message, status } = data;
        this.postage = info.freight;
      });
    },
    //收货地址
    shopcatadscl() {
      // console.log(this.prize.business, "222222222222222222");
      // if (!this.prize.business) {
      //   this.$toast("商品信息有误！");
      //   return;
      // }
        this.$router.push({
          path: "/addresses",
          query: {
            ref_page: "duihuan",
            address_id: this.$route.params.address_id || 0,
            draw_id: this.$route.params.draw_id,
          },
        });
    },
    //奖品详情
    jpxq() {
      console.log(this.$route.params.draw_id, "定位一下");
      axios
        .post(
          `${apiHost}/turntable/detail`,
          qs.stringify({
            draw_id: this.$route.params.draw_id,
          })
        )
        .then((val) => {
          let { data } = val;
          let { status, message, info } = data;
          console.log(info, "这是商品详情");
          this.prize = info;
          // console.log(info.province,'商品地址');
          console.log(this.addresslia, this.addresslia.mobile, "收获地址");
          if (status == -1) {
            this.$toast(`${message}`);
          }
        });
    },
    //提交订单
    onSubPay() {
      if (!this.addresslia.mobile) {
        this.$toast("请选择收货地址");
        return;
      }
      console.log(
        this.$route.params.draw_id,
        "中奖记录编号",
        this.$route.params.address_id,
        "收货地址编号"
      );
      //11-4——修改收货地址id
      axios
        .post(
          `${apiHost}/turntable/bonusProcessing`,
          qs.stringify({
            draw_id: this.$route.params.draw_id,
            type: 1,
            address_id: this.$route.params.address_id,
            pay_type: this.radiopay
          })
        )
        .then((val) => {
          let { data } = val;
          let { info, message, status } = data;
          console.log(info, "中奖记录奖金处理");
          this.$toast(`${message}`);
          if (info.has_pay == 1) {
            // this.has_pay = info.direct_url; //支付链接
            window.location.href = info.direct_url; //支付链接
          }
        });
    },
    //地址
    //返回
    onClickLeft() {
      this.$router.go(-1);
    },
        //右上角的更多菜单
    onClickRight(){
      this.showpop = !this.showpop;
    }
  },
};
</script>
<style lang="scss">
.box {
  min-height: 100vh;
  padding-bottom: 2rem;
  font-size: 14px;
  position: relative;
  background-color: #f4f4f4;
  .fbpl {
    box-shadow: 0px 3px 5px #f5f5f5;
  }
  //商品介绍
  .jieshao {
    width: 100%;
    margin-top: 1rem;
    padding: 0.2rem;
    background-color: #ffffff;
    display: flex;
    & span {
      color: red;
    }
    // .text{
    // display: flex;
    // flex-direction: column;
    // justify-content: space-between;
    // }
    & > div:nth-child(1) {
      //   position: relative;
      width: 30vw;
      height: 30vw;
      background-color: red;
      margin-right: 10px;
      border-radius: 10px;
      overflow: hidden;
      & > img {
        width: 100%;
        height: 100%;
      }
    }
  }

  //邮费
  .postage{
    width: 100%;
    padding: 0.2rem;
    margin-top: 0.2rem;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    & span{
      color: #333;
      &:nth-child(2){
        color: #999;
      }
    }
  }

  //收获地址
  .shopcat-address {
    position: relative;
    .sad {
      align-items: center;
      padding: 16px 12px;
    }
    i.van-icon-add-square,
    i.van-icon-location {
      color: #e02e24;
      font-size: 20px;
    }
    &::after {
      content: "";
      position: absolute;
      display: inline-block;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background-position: 0 0;
      background-size: cover;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABGUAAAAGCAMAAABdG9OLAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAPUExURf///xWn1tojP+2Rn4rT6zXCHwQAAABPSURBVFjD7dDBCQAhAAPBeNp/zZZwIgR8TAoIw2b8bOVo87vZPDtf42bk5ORPyCM+OTl5VR7xycnJq/KIT05OXpVHfHJy8qo84pOTk1flG/eHGIuy2bRIAAAAAElFTkSuQmCC);
    }
  }

  //邮费说明
  .freight {
    padding: 10px;
    background-color: #fff;
    margin-top: 10px;
    & > p {
      font-size: 0.3rem;
      font-weight: bold;
    }
    & > div {
      margin-top: 10px;
      text-indent: 2em;
    }
  }

  //详情
  .xiangqing {
    width: 100%;
    padding: 12px;
    background-color: #ffffff;
    margin-top: 0.3rem;
    & > p {
      font-size: 0.3rem;
      font-weight: bold;
    }
    & > div {
      text-indent: 2em;
    }
  }

  //收货地址
  .shdz {
    width: 100%;
    margin-top: 12px;
    padding: 10px;
    background-color: #ffffff;
  }
  .dizhi {
    width: 100%;
    height: 50vw;
    overflow: auto;
    // padding: 12px;
    background-color: #ffffff;
    .dizhiC {
      & > p {
        color: #999;
      }
      .xuanze {
        & > label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          &:nth-child(2n) {
            background-color: #ddd;
          }
        }
      }
    }
  }

  //支付方式
  .zffs01 {
    margin-top: 12px;
    .van-icon-wechat {
      color: rgba(37, 171, 17, 1);
      font-size: 20px;
    }
    .van-icon-gold-coin {
      color: #e02e24;
      font-size: 20px;
    }
    .van-icon-alipay {
      color: rgba(18, 154, 234, 1);
      font-size: 20px;
    }
  }
  .zhifuyoufei {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0.25rem;
    background-color: rgba($color: #000000, $alpha: 0.3);
    & > div {
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      & > p {
        padding-bottom: 10px;
      }
      & input {
        padding: 5px;
        border-radius: 5px;
        border: 1px solid #999;
        &:nth-child(1) {
          margin-right: 50px;
        }
      }
    }
  }
}
</style>