<template>
  <div class="box">
    <van-nav-bar
      title="兑换奖品"
      left-text="返回"
      left-arrow
      class="fbpl"
      @click-left="onClickLeft"
    />
    <ul class="list">
      <li v-for="item in prize" :key="item.id">
        <div class="imgs">
          <img :src="item.icon" alt="" />
        </div>
        <div class="text">
          <p>
            {{ item.title }}
            <span v-if="item.draw == 1">已被领取</span>
            <span v-else>未领取</span>
          </p>
          <div class="aaa">
            <input type="button" value="查看详情" @click="examines(item.id)" />
            <input
              type="button"
              value="兑换"
              @click="conversions(item.draw, item.id)"
            />
          </div>
        </div>
      </li>
    </ul>
    <div class="popup" @click="price" v-if="states">
      <div class="popup-content">
        <p>
          您需要补差价<span>{{ differences_money }}元</span>
        </p>
        <p>点击此处跳转支付宝补差价</p>
      </div>
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
      states: false,
      turntable_id: null, //赚吧转盘编号
      draw_id: null, //中奖记录编号
      prize: [], //奖品列表
      differences_money: null, //差价
      direct_url: null, //支付宝支付链接
    };
  },
  created() {
    var url = window.location.href; //获取网址的hash值
    //如果网址存在“?”
    if (url.includes("?")) {
      //获取hash“?”后面的值
      var arrArg = url.split("?")[1];
      //获取“=”后面的值
      var _pageSize = arrArg.split("=")[1];
      if (url.includes("&")) {
        var _value = arrArg.split("&"); //拆分每组参数
        this.draw_id = parseInt(_value[0].split("=")[1]);
        this.turntable_id = parseInt(_value[1].split("=")[1]);
      }
    }else{
        this.$toast("访问不合法！")
        return;
    }
    console.log(this.draw_id,this.turntable_id);
    axios
      .post(
        `${apiHost}/turntable`,
        qs.stringify({
          turntable_id: this.turntable_id
        })
      )
      .then((val) => {
        let res = val.data.info.prize;
        this.prize = res;
        console.log(res, this.prize, "接口返回并且赋值");
      });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    //查看详情
    examines(id) {
      console.log(id);
      this.$router.push({
        name: "turnprize",
        params: { id: id },
      });
    },
    //补差价
    price() {
    //   this.states = false;
      // this.direct_url//支付宝支付链接
      console.log(this.direct_url);
      window.open(this.direct_url,"_blank");
    },
    //兑换
    conversions(draw, id) {
      console.log(draw, id);
      if (draw === 2) {
        axios
          .post(
            `${apiHost}/turntable/bonusProcessing`,
            qs.stringify({
              type: 2, //2奖品置换
              draw_id: this.draw_id, //中奖记录编号
              prize_id: id, //要置换的奖品编号
            })
          )
          .then((val) => {
            console.log(val, "兑换接口返回的参数");
            let data = val.data;
            if (data.status == 1) {
              this.$toast(`${data.message}`);
            } else {
              this.$toast(`${data.message}`);
            }
            if (!(data.info == [])) {
              if (data.info.has_pay == 1) {
                console.log("需要发起第三方支付补差价金额");
                this.states = true;
                this.differences_money = data.info.differences_money; //差价
                this.direct_url = data.info.direct_url; //支付宝支付链接
              }
            }
          });
      } else {
        this.$toast("奖品已被兑换");
      }
    },
  },
};
</script>

<style  lang="scss">
* {
  margin: 0;
  padding: 0;
}
.box {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  box-sizing: border-box;
  padding: 50px 0 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;

  .list {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > li {
      width: 90%;
      box-sizing: border-box;
      padding: 5px;
      margin: 5px 0;
      display: flex;
      .imgs {
        width: 100px;
        height: 100px;
        overflow: hidden;
        border-radius: 10px;
        margin-right: 15px;
        box-shadow: 5px 5px 10px #999;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .text {
        box-sizing: border-box;
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        & input {
          padding: 3px 5px;
          border-radius: 5px;
          margin-right: 20px;
          background-color: salmon;
          display: inline-block;
        }
        & span {
          margin-left: 50px;
          font-size: 14px;
          color: #999;
        }
      }
    }
    & > li:nth-child(2n + 1) {
      background-color: #f5f5f5;
    }
  }
  .popup {
    position: absolute;
    width: 100%;
    height: 100vh;
    // z-index: 999;
    background-color: rgba($color: #000000, $alpha: 0.5);
    .popup-content {
      position: absolute;
      width: 270px;
      padding: 20px 0;
      border: 1px solid red;
      border-radius: 10px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: #000;
      background-color: #fff;
      & span{
          display: inline-block;
          padding: 0 5px;
          color: red;
      }
    }
  }
}
</style>