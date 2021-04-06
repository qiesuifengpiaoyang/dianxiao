
<template>
  <div class="tx-dx-turnlist" :style="`height:${sty}vh`">
    <!-- <van-nav-bar
      title="中奖记录"
      left-text="返回"
      left-arrow
      class="fbpl"
      @click-left="onClickLeft"
    /> -->
    <van-nav-bar
      title="中奖记录"
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

    <div class="turnlist-box">
      <ul v-if="list.length">
        <li
          v-for="(item, index) in list"
          :key="'index' + index"
          @click="gog(item, index)"
        >
          <p class="title">
            转盘名称：
            <span>{{ item.turntable_title }}</span>
          </p>
          <p>
            转盘类型：
            <span v-if="item.type == 1">天天有奖</span>
            <span v-else>互助转吧</span>
          </p>
          <p>
            奖品名称：
            <span>{{ item.prize_title }}</span>
          </p>
          <p>
            奖品价值：
            <span>{{ item.prize_money }}</span>
          </p>
          <p>
            中奖时间：
            <span>{{ item.create_time }}</span>
          </p>
          <p>
            奖品封面图：
            <img class="imgs" :src="item.prize_cover_img" alt />
          </p>
          <div>
            是否领取：
            <span v-if="item.draw == 0">
              未领取——
              <input
                v-if="item.type != 1"
                type="button"
                value="提现"
                @click="conversion(2, item.draw_id, item.turntable_id)"
              />
              <input
                type="button"
                value="领取商品"
                @click="conversion(1, item.draw_id, item.turntable_id)"
              />
            </span>
            <span v-if="item.draw == 1">已领取奖品</span>
            <span v-if="item.draw == 2">已提现</span>
          </div>
          <!-- 11-4——修改：为【领取奖品时】才显示【是否支付】及【支付地址】 -->
          <div v-if="item.draw == 1">
            <p>
              是否支付：
              <span v-if="item.pay == 1">已支付{{ item.pay_money }}</span>
              <span v-else>未支付</span>
            </p>
            <p v-if="item.pay == 2">
              支付地址：
              <input
                type="button"
                value="前往支付"
                class="zflj"
                @click="zhifuyoufei(item.direct_url)"
              />
            </p>
          </div>
          <p v-if="zksq" @click="zhanshi(item.draw_id, index)">展开详情</p>
          <p v-if="!zksq" @click="shouqi(index)">收起详情</p>
          <div v-if="!zksq" class="particulars">
            <p>
              奖品简介：<span>{{ item.prize_synopsis }}</span>
            </p>
            <p>
              奖品详情：<span>{{ item.prize_detail }}</span>
            </p>
            <p v-if="item.draw == 1">
              联系人：<span>{{ item.username }}</span>
            </p>
            <p v-if="item.draw == 1">
              联系手机：<span>{{ item.mobile }}</span>
            </p>
            <p v-if="item.draw == 1">
              地址：<span
                >{{ item.province }}{{ item.market }}{{ item.area }}</span
              >
            </p>
            <p v-if="item.draw == 1">
              详细地址：<span>{{ item.address }}</span>
            </p>
          </div>
        </li>
        <li v-if="noMores">暂无更多数据</li>
      </ul>
      <div v-else class="zwxx">暂无中奖记录</div>
    </div>
    <more-btn :showpop.sync="showpop" />
  </div>
</template>
<script>
import qs from "qs";
import { apiHost, specfield } from "@/plugins/path";
import axios from "@/plugins/axios";
import { _throttle } from "@/plugins/public";
import moreBtn from "@/components/morebtn.vue";
// import ClipboardJS from "clipboard";
export default {
  data() {
    return {
      zksq: true, //奖品详情的展开与收起
      showpop: false, //右上角的菜单
      zhifutc: false,
      prize_id: null,
      youfei: null, //邮费
      drawId: null,
      // gender: "0",
      dizhival: [], //地址
      dizhi: false,
      list: [], //数据
      has_pay: null,
      // animate: [], //（显示/隐藏）状态
      page: 1,
      limit: 10,
      scrollHeight: 0, //高度
      js: 0,
      sty: 100,
      noMores: false,
    };
  },
  created() {
    this.zjxxjl();
  },
  components: {
    moreBtn,
  },
  // watch: {
  // gender: {
  // handler(val) {
  // //0是默认的提示信息
  // if (!val) {
  //   this.newestData = []; //重置
  //   return;
  // }

  //邮费信息
  // this.youfeixx();
  // },
  // deep: true,
  // },
  // },

  mounted() {
    // this.firstAPI();
    window.addEventListener("scroll", () => {
      const scrollY =
        document.documentElement.scrollTop || document.body.scrollTop; // 滚动条在Y轴上的滚动距离

      const vh =
        document.compatMode === "CSS1Compat"
          ? document.documentElement.clientHeight
          : document.body.clientHeight; // 页面的可视高度（能看见的）

      const allHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      ); // 页面的总高度（所有的）

      if (scrollY + vh + 100 >= allHeight) {
        // 当滚动条滑到页面底部
        // console.log(scrollY + vh, allHeight);
        this.js++;
        if (this.js === 1) {
          this.page += 1;
          this.zjxxjl();
        }
      }
    });
  },
  methods: {
    //支付邮费
    zhifuyoufei(res) {
      if (this.has_pay) {
        console.log(res, "支付链接has_pay");
        window.location.href = this.has_pay; //支付链接
      } else {
        console.log(res, "支付链接res");
        window.location.href = res; //支付链接
      }
    },
    //中奖信息记录
    zjxxjl: _throttle(function (_type, index) {
      if (this.noMores) {
        return;
      }
      axios
        .post(
          `${apiHost}/turntable/winningRecord`,
          qs.stringify({
            page: this.page,
            limit: this.limit,
          })
        )
        .then((res) => {
          console.log(res);
          let val = res.data.info;
          // this.list = [...val];
          console.log(this.list, "push之前");
          for (const item of val) {
            // item.push({
            //   assign:'99999'
            // })
            this.list.push(item);
          }
          //如果返回的数据长度小于传入的数据长度或者返回的数据长度为0，表明没有更多的数据了
          if (val.length < this.limit || !val.kength) {
            this.noMores = true;
          }
          console.log(this.list, "push之后");

          setTimeout(() => {
            this.js = 0;
            console.log(this.js, "js");
          }, 500);
          // for (let i = 0; i < val.length; i++) {
          //   this.animate.push("99999");
          // }
        });
    }, 500),
    // zjxxjl() {
    // axios
    //   .post(
    //     `${apiHost}/turntable/winningRecord`,
    //     qs.stringify({
    //       page: this.page,
    //       limit: 4,
    //     })
    //   )
    //   .then((res) => {
    //     console.log(res);
    //     let val = res.data.info;
    //     // this.list = [...val];
    //     console.log(this.list, "push之前");
    //     for (const item of val) {
    //       this.list.push(item);
    //     }
    //     console.log(this.list, "push之后");
    //     // for (let i = 0; i < val.length; i++) {
    //     //   this.animate.push("99999");
    //     // }
    //   });
    // },
    //邮费
    youfeixx() {
      //商品详情
      console.log(this.drawId);
      axios
        .post(
          `${apiHost}/turntable/prize`,
          qs.stringify({
            prize_id: this.drawId,
          })
        )
        .then((val) => {
          let { data } = val;
          let { info, message, status } = data;
          console.log(info, "商品详情");
          console.log(
            this.dizhival[parseInt(this.gender)].province,
            "中奖记录中的地址的省份"
          );
          console.log(info.shenfen, "商品详情中的地址的省份");
          if (
            this.dizhival[parseInt(this.gender)].province.indexOf(
              info.shenfen
            ) != -1
          ) {
            //如果用户选择的收货地址和商家发货地址相同，则省内邮费
            this.youfei = info.freight;
          } else {
            this.youfei = info.freight_out; //省外邮费
          }
        });
    },
    quedingxz() {
      axios
        .post(
          `${apiHost}/turntable/bonusProcessing`,
          qs.stringify({
            draw_id: this.drawId,
            type: 1,
            address_id: this.dizhival[parseInt(this.gender)].id,
          })
        )
        .then((val) => {
          let { data } = val;
          let { info, message, status } = data;
          console.log(info, "中奖记录奖金处理");
          this.$toast(`${message}`);
          if (info.has_pay == 1) {
            this.has_pay = info.direct_url; //支付链接
            console.log("进入支付链接", info.direct_url, this.has_pay);
            this.dizhi = !this.dizhi;
            this.zhifutc = true; //支付邮费弹窗
          } else {
            this.zjxxjl(info); //中奖信息记录
            this.dizhi = !this.dizhi;
          }
        });
    },
    //查看轮盘列表
    examines() {
      this.$router.push({
        name: "turnlist",
      });
    },
    firstAPI() {},
    gog(item, index) {
      // console.log(this.list[index]);
    },
    //显示
    zhanshi(draw_id, index) {
      this.zksq = !this.zksq;
      axios
        .post(
          `${apiHost}/turntable/detail`,
          qs.stringify({
            draw_id: draw_id,
          })
        )
        .then((val) => {
          let { data } = val;
          let { info, message, status } = data;
          if (status != 1) {
            this.$toast(`${message}`);
            return;
          }
          this.list[idnex].push({
            prize_synopsis: info.prize_synopsis,
            prize_detail: info.prize_detail,
            username: info.username,
            mobile: info.mobile,
            province: info.province,
            market: info.market,
            area: info.area,
            address: info.address,
          });
          console.log(this.list,index,'追踪定位一下');
        });
    },
    //收起
    shouqi(idnex){
      this.zksq = !this.zksq;
      let zz = this.list[index].indexOf('prize_synopsis')
      console.log(zz,'位置');
      this.list[index].splice(zz,8);
      console.log(this.list,index,'删除后数组');
    },

    // state(index) {
    //   if (this.animate[index] !== index) {
    //     this.animate.splice(index, 1, index);0
    //   } else {
    //     this.animate.splice(index, 1, "99999");
    //   }
    //   // this.$forceUpdate() //强制刷新
    // },

    //兑换
    conversion(n, id, turntable_id) {
      console.log(n, id, turntable_id);
      this.drawId = id;
      if (n == 1) {
        // this.$router.push(`/duihuan/${id}/${0}`)

        // let shopping_id = [];
        // this.$toast.loading({ duration: 0, forbidClick: true });
        // this.result.map((i) => {
        //   shopping_id.push(this.list[i].id);
        // });
        // this.$router.push({
        //   name: "duihuan",
        //   params: { draw_id: id}
        // });
        this.$router.push(`/duihuan/${id}/${0}`);
      } else {
        this.dizhi = false;
        axios
          .post(
            `${apiHost}/turntable/bonusProcessing`,
            qs.stringify({
              draw_id: id,
              type: n,
              address_id: 32,
            })
          )
          .then((res) => {
            console.log(res, "提现接口返回信息");
            this.$toast(`${res.data.message}`);
            this.zjxxjl(); ////中奖信息记录
          });
      }
      // if (n == 2) {
      // axios
      //   .post(
      //     `${apiHost}/turntable/bonusProcessing`,
      //     qs.stringify({
      //       draw_id: id,
      //       type: n,
      //       address_id:32
      //     })
      //   )
      //   .then((res) => {
      //     console.log(res, "提现接口返回信息");
      //     // if (res.data.status == 1) {
      //     this.$toast(`${res.data.message}`);
      //     // }
      //   });
      // } else {
      //   console.log(n, id, turntable_id, "这是1的领取奖品");
      //   // this.$router.push(`prizelists?id=${id}&turntable_id=${turntable_id}`);
      //   this.$router.push({
      //     name: "shopOrder",
      //     params: { shopping_id: id+'?' },
      //   });
      // }
    },

    links(item) {
      console.log(item);
      window.open(item, "_blank");
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.showpop = !this.showpop;
    },
  },
};
</script>
<style lang="scss" >
.tx-dx-turnlist {
  min-height: 150vh;
  .turnlist-box {
    padding-top: 0.9rem;

    font-size: 13px;
    .zwxx {
      width: 100%;
      padding: 10px;
      background-color: #fff;
      margin-top: 10px;
    }
    li {
      background: #fff;
      margin-bottom: 12px;
      padding: 12px;
      position: relative;
      color: #333;
      input {
        width: 1.4rem;
        text-align: center;
        border: 1px solid #999;
        margin-left: 0.1rem;
        border-radius: 0.1rem;
        padding: 0.1rem 0;
      }
      & span {
        color: #969799;
      }
      .imgs {
        width: 100px;
        height: 100px;
        display: block;
        margin: 0.18rem;
        box-shadow: 0px 0px 5px #999;
        border-radius: 0.1rem;
      }
      .zflj {
        border: 1px solid #999;
        padding: 5px;
      }
      .particulars{
        border: 1px solid #999;
        border-radius: 10px;
      }
    }
    .title {
      font-size: 14px;
      text-align: justify;
      margin-bottom: 5px;
      color: #151516;
      & button {
        color: #333;
      }
    }
    .arrow {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      font-size: 0.6rem;
      color: #969799;
    }
    .btn {
      margin-right: 10px;
      margin-top: 10px;
      background-color: transparent;
      border: 1px solid #999;
      padding: 5px;
      border-radius: 5px;
    }

    //处理记录（折叠）
    // .record {
    //   padding: 10px 0;
    //   .recordInp {
    //     background-color: transparent;
    //     display: inline-block;
    //     border: 1px solid #999;
    //     padding: 7px;
    //   }
    //显示/隐藏
    // .recordC {
    //   width: 100%;
    //   overflow: hidden;
    //   // padding: 10px;
    //   border: 1px solid #999;
    //   margin-top: 5px;
    //   & > div {
    //     padding: 10px 0;
    //   }
    //   & > div:nth-child(2n + 1) {
    //     background-color: #eee;
    //   }
    //   & p {
    //     padding: 5px 5px;
    //     img {
    //       border-radius: 10px;
    //       padding: 5px;
    //       box-shadow: 3px 3px 5px #999;
    //     }
    //   }
    //   //超链接
    //   .links {
    //     color: #0000ee;
    //     cursor: pointer;
    //   }
    //   .zfbbtn {
    //     border: 1px solid #f5f5f5;
    //     padding: 5px;
    //     background-color: blanchedalmond;
    //     box-shadow: 1px 1px 3px #999;
    //     border-radius: 5px;
    //   }
    // }
    // .imgs {
    //   width: 100px;
    //   height: 100px;
    //   display: block;
    // }
    // }
  }
  .dizhi {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba($color: #000000, $alpha: 0.3);
    font-size: 0.25rem;
    .dizhiC {
      position: relative;
      width: 90vw;
      // height: 40vh;
      padding: 0.45rem 0;
      background-color: #fff;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      & > p {
        text-align: center;
        font-size: 0.3rem;
        font-weight: bold;
        padding: 0.2rem 0;
        color: red;
      }
      .xuanze {
        width: 95%;
        height: 150px;
        // height: 50%;
        overflow: auto;
        box-sizing: border-box;
        border: 1px solid #999;
        margin: 0 auto;
        & > label {
          padding: 0.1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          &:nth-child(2n) {
            background-color: rgb(223, 223, 223);
          }
          & p:nth-child(1) {
            color: red;
          }
        }
      }
      .dizhiBtn {
        display: flex;
        justify-content: space-around;
        & > input {
          padding: 0.2rem 0.3rem;
          margin-top: 0.2rem;
          border: 1px solid #999;
          border-radius: 0.1rem;
        }
      }
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
  //悬浮层
  .suspension {
    position: fixed;
    box-sizing: border-box;
    padding: 20px;
    text-align: center;
    font-size: 16px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    top: 80vh;
    left: 35vh;
    right: 5vh;
    bottom: 5vh;
    border-radius: 50%;
    margin: auto;
    background-color: #f5f5f5;
    box-shadow: 5px 5px 10px #999;
    z-index: 999;
  }
}
</style>