<template>
  <div class="box">
    <!-- <van-nav-bar
      title="天天有奖"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      class="fbpl"
    /> -->
    <van-nav-bar
      title="天天有奖"
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

    <!-- 首次进入的免责申明 -->
    <div class="declare" v-if="declarebox">
      <div class="declare-text">
        <p>免责申明</p>
        <div v-html="luckTurntable.declare"></div>
        <van-checkbox class="checkbox" v-model="checked">同意</van-checkbox>
        <div class="btn" @click="showbtncl">确认</div>
      </div>
    </div>

    <!-- 幸运积分 -->
    <div class="message">
      <p>
        我的幸运积分：<span>{{ luckTurntable.luck_integral }}</span>
      </p>
      <div>
        <input type="button" value="领取幸运积分" @click="getIntegral" />
        <input type="button" value="中奖记录" @click="winnerRecord" />
      </div>
    </div>

    <!-- 转盘状态 -->
    <div class="turntableState">
      <p v-if="luckTurntable.open == 0">暂无转盘信息</p>
      <div v-if="luckTurntable.open == 1">
        <p>转盘暂未开启，敬请期待！</p>
        <p>
          开启倒计时：{{ timerDate.hours }}时{{ timerDate.minutes }}分{{
            timerDate.seconds
          }}秒
        </p>
      </div>
      <p v-if="luckTurntable.open == 2">转盘正在进行中！</p>
      <p v-if="luckTurntable.open == 3">转盘已经结束，请期待下一轮的开启！</p>
    </div>

    <!-- 九宫格抽奖 -->
    <div class="sudokubox">
      <div
        class="grid"
        v-for="(item, index) in luckTurntable.prize"
        :key="item + index"
        @click="choujiang(index)"
      >
        <div class="qian equal" :class="{ qians: choice == index }">
          <div class="imgbox">
            <img src="../imgs/logo.png" alt="" />
          </div>
          <div class="textbox">翻</div>
        </div>
        <div class="hou equal" :class="{ hous: choice == index }">
          <!-- <div class="imgbox">
            <img src="../imgs/logo.png" alt="" />
          </div> -->
          <div class="againstbox">
            <span>{{ prizeTitle }}</span>
          </div>
        </div>
        <!-- <div class="qian equal" :class="{ qians: choice == index }">正面</div> -->
        <!-- <div class="hou equal" :class="{ hous: choice == index }">
          反面
          <span>{{ prizeTitle }}</span>
        </div> -->
      </div>
    </div>

    <!-- 中奖的对话框 -->
    <div class="prizewinning" v-if="prizewinning">
      <div class="prizewinning-content">
        <p>恭喜您中奖</p>
        <p>{{ prizeTitle }}</p>
        <div class="prizewinning-inp">
          <input
            type="button"
            value="稍后兑换"
            @click="prizewinning = !prizewinning"
          />
          <input
            type="button"
            value="前往中奖记录兑换"
            @click="convertibility"
          />
        </div>
      </div>
    </div>

    <!-- 中奖者信息 -->
    <ul class="winner" :class="{ anim: animate == true }" v-if="winner.length">
      <li v-for="item in winner" :key="item.name">
        <!-- {{ item }} -->
        恭喜<span>{{ item.username }}</span
        >于<span>{{ item.create_time }}</span
        >抽中<span>{{ item.money }}</span>
      </li>
    </ul>

    <!-- 说明文本 -->
    <div class="explain">
      <p>说明</p>
      <div v-html="luckTurntable.introduce"></div>
    </div>
    <more-btn :showpop.sync="showpop" />
  </div>
</template>
<script>
import qs from "qs";
import { apiHost, specfield } from "@/plugins/path";
import axios from "@/plugins/axios";
import moreBtn from "@/components/morebtn.vue";
export default {
  data() {
    return {
      showpop:false,//右上角的菜单
      checked: false, //免责说明的复选框
      declarebox: true, //免责说明弹框
      luckTurntable: [], //幸运积分转盘
      luckTurntableReal: null, //实时访问幸运积分转盘
      // countDownTimer: null, //倒计时定时器
      timerDate: [], //倒计时时间
      prizeTitle: null, //	幸运转盘中奖的奖品名称
      prizewinning: false, //中奖的对话框
      animate: false,
      prizeId: null, //中奖记录编号
      winner: [],
      grid: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], //模拟数据——格子数量
      choice: null, //用户选择的目标
      cou: 0, //点击抽奖计数
      toas1: null, //加载中...
      // zjxx: [],
    };
  },
    components: {
    moreBtn
  },
  created() {
    this.toas1 = this.$toast.loading({
      duration: 0,
      message: "加载中...",
      forbidClick: true,
    });
    //幸运积分转盘
    this.postLuckTurntable();

    //获取中奖者信息
    // this.zjzxx();

    //中奖者信息的轮播
    // if (this.winner.length > 2) {
    setInterval(this.showMarquee, 300);
    // }

    //判断是否弹出‘免责说明
    if (localStorage.getItem("tablelen") == "true") {
      this.declarebox = false;
    }

    //实时查询幸运积分转盘、中奖者信息
    this.luckTurntableReal = setInterval(() => {
      this.postLuckTurntable();
      //获取中奖者信息
      // this.zjzxx();
    }, 1000);
  },
  mounted() {
    this.toas1.clear();
  },
  methods: {
    //中奖信息
    zjzxx() {
      axios
        .post(
          `${apiHost}/turntable/latestInputRecord`,
          qs.stringify({
            turntable_id: parseInt(this.luckTurntable.turntable_id) || 0,
          })
        )
        .then((val) => {
          let { data } = val;
          let { info, status, message } = data;
          console.log(info, "中奖者信息");
          if (status != 1) {
            this.$toast(`${message}`);
            return;
          }
          if (info.draw.length) {
            if (!(this.winner.toString() == info.draw.toString())) {
              for (let i = this.winner.length; i < info.draw.length; i++) {
                this.winner.push(info.draw[i]);
              }
            }
          }
          // this.winner = info;
        });
    },
    //幸运积分转盘
    postLuckTurntable() {
      axios.post(`${apiHost}/turntable/luckTurntable`).then((val) => {
        // console.log(val, "这是‘幸运积分转盘’接口返回的");
        let { data } = val;
        let { info, status, message } = data;
        if (status != 1) {
          this.$toast(`${message}`);
        }
        this.luckTurntable = info; //幸运积分转盘

        //如果转盘状态为1，就显示开启倒计时
        if (info.open == 1) {
          this.countDown(info.open_time);
        }
        this.zjzxx();
      });
    },

    //倒计时
    countDown(open_time) {
      let presentTime = Math.ceil(Date.now() / 1000); //获取当前时间的秒数
      let openTime = this.timestampL(open_time); //获取【接口返回的开始时间】的秒数
      this.timerDate = this.getFormatDuration(openTime - presentTime); //秒转时分秒
      // this.countDownTimer = setInterval(() => {
      //   presentTime = Math.ceil(Date.now() / 1000); //获取当前时间的秒数
      //   this.timerDate = this.getFormatDuration(openTime - presentTime); //秒转时分秒
      // }, 1000);
      console.log(this.timerDate);
    },

    //中奖者信息的轮播
    showMarquee() {
      this.animate = true;
      //   setTimeout(() => {
      this.winner.push(this.winner[0]);
      this.winner.shift();
      this.animate = false; // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
      //   }, 1000);
    },

    //说明条款上面的确认
    showbtncl() {
      if (this.checked) {
        this.declarebox = false;
        localStorage.setItem("tablelen", true);
      }
    },

    //领取幸运积分
    getIntegral() {
      axios.post(`${apiHost}/turntable/luckIntegral`).then((res) => {
        let { data } = res;
        let { info, status, message } = data;
        if (status != 1) {
          this.$toast(`${message}`);
        } else {
          this.$toast(`${message}\n${info.luck_integral}积分`);
        }
      });
      this.postLuckTurntable(); //更新【幸运积分转盘】的数据
    },

    //中奖记录
    winnerRecord() {
      this.$router.push({
        name: `recocrd`,
      });
    },

    //抽奖
    choujiang(index) {
      this.cou++;
      if (this.cou > 1) {
        this.$toast("请勿重复点击 \n^_^");
        return;
      }
      if (!this.luckTurntable.luck_integral) {
        this.$toast("您的积分不足 \n^_^");
        this.cou = 0; //重置
        return;
      }
      this.luckLotteryDraw(index); //请求抽奖接口
    },

    //请求抽奖接口
    luckLotteryDraw(index) {
      axios
        .post(
          `${apiHost}/turntable/luckLotteryDraw`,
          qs.stringify({
            turntable_id: parseInt(this.luckTurntable.turntable_id),
          })
        )
        .then((response) => {
          this.choice = index; //翻开指定的牌
          console.log(response, "抽奖接口的返回数据");
          let { data } = response;
          let { info, message, status } = data;
          //返回状态为1，才是访问正常，否则有其他状况
          //比如积分不足
          if (status != 1) {
            this.$toast(`${message}`);
            return;
          }
          if (info.lottery_results == 1) {
            //中奖
            this.prizeTitle = info.prize_title; //奖品名称
            this.prizeId = info.draw_id; //中奖记录编号
            //弹出对话框
            this.prizewinning = true;
          } else {
            this.prizeTitle = "很遗憾未能中奖"; //奖品名称
          }
        });

      //判断，如果没有中奖，则规定时间后将牌翻回去
      //如果中奖了，则在用户点击了‘兑换’按钮后立即将牌翻回去
      setTimeout(() => {
        console.log("打印123");
        this.choice = null; //重置
        this.cou = 0; //充值
      }, 3000);
    },

    //中奖兑换
    convertibility(num) {
      this.prizewinning = false;
      // this.$router.push({
      //   name: `recocrd`,
      // });
      //11-4——修改：中奖后直接前往领取奖品
      this.$router.push(`/duihuan/${this.prizeId}/${0}`);
    },

    //字符串转时间戳
    timestampL(openTime) {
      let time = openTime.substring(0, 19);
      time = time.replace(/-/g, "/");
      var timestamp = new Date(time).getTime();
      // console.log(timestamp);
      return Math.ceil(timestamp / 1000);
    },

    //秒转时分秒
    getFormatDuration(second) {
      let result = parseInt(second);
      let h =
        Math.floor(result / 3600) < 10
          ? "0" + Math.floor(result / 3600)
          : Math.floor(result / 3600);
      let m =
        Math.floor((result / 60) % 60) < 10
          ? "0" + Math.floor((result / 60) % 60)
          : Math.floor((result / 60) % 60);
      let s =
        Math.floor(result % 60) < 10
          ? "0" + Math.floor(result % 60)
          : Math.floor(result % 60);
      return { hours: `${h}`, minutes: `${m}`, seconds: `${s}` };
    },

    //返回
    onClickLeft() {
      this.$router.go(-1);
    },
    //右上角的更多菜单
    onClickRight(){
      this.showpop = !this.showpop;
    }
  },

  //页面销毁前
  beforeDestroy() {
    console.log("离开当前页面的时候，清除定时器");
    clearInterval(this.luckTurntableReal); //定时器————实时访问幸运积分转盘
  },
};
</script>
<style lang="scss">
.box {
  background: #fff;
  min-height: 100vh;
  font-size: 0.26rem;
  padding: 50px 0;

  //免责申明
  .declare {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: #999;
    z-index: 999;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .declare-text {
      position: relative;
      width: 70vw;
      padding: 10px;
      background-color: #fff;
      & > p {
        text-align: center;
      }
      & > div {
        text-indent: 2em;
      }
      .checkbox {
        zoom: 90%;
        margin-top: 20px;
      }
      .btn {
        display: block;
        width: 60%;
        padding: 5px 0;
        border: 1px solid #ccc;
        border-radius: 5px;
        text-align: center;
        margin: 0 auto;
      }
    }
  }

  //积分详情
  .message {
    width: 90vw;
    padding: 10px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > div {
      display: flex;
      flex-direction: column;
      & > input {
        background-color: #fff;
        border: 1px solid #333;
        padding: 0.08rem;
        border-radius: 5px;
        box-shadow: 3px 2px 2px #ddd;
        &:nth-child(2) {
          margin-top: 0.1rem;
        }
      }
    }
  }

  //转盘状态
  .turntableState {
    width: 90vw;
    padding: 10px;
    margin: 0 auto;
    color: red;
    font-size: 0.3rem;
    text-align: center;
    text-shadow: 0 1px #ff0;
  }

  //九宫格抽奖
  .sudokubox {
    width: 90vw;
    margin: 0 auto;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    /*单个格子 */
    .grid {
      position: relative;
      text-align: center;
      width: 32%;
      margin-top: 2%;
      padding-top: 50%;
      border-radius: 0.1rem;
      transform-style: preserve-3d;
      overflow: hidden;
      .equal {
        backface-visibility: hidden;
        transition: 0.8s ease-out;
        transform-style: preserve-3d;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 1px solid red;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        .imgbox {
          position: relative;
          width: 50%;
          height: 0;
          // height: 50%;
          padding-bottom: 50%;

          & img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
        }
        .textbox {
          font-size: 0.5rem;
          width: 50%;
          height: 50%;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        .againstbox {
          width: 50%;
          height: 50%;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
      }

      /*正面 */
      .qian {
        z-index: 2;
        background-color: coral;
        transform: rotateY(0deg);
      }

      /*反面 */
      .hou {
        z-index: 1;
        background-color: rgb(255, 0, 242);
        transform: rotateY(-180deg);
      }

      //控制前面
      .qians {
        transform: rotateY(180deg);
        z-index: 1;
      }

      //控制后面
      .hous {
        transform: rotateY(0deg);
        z-index: 2;
      }
    }
  }

  //中奖者信息
  .winner {
    width: 90vw;
    height: 150px;
    overflow: hidden;
    border: 1px solid black;
    transition: all 0.5s;
    margin: 0 auto;
    margin-top: 0.5rem;
    padding: 10px;
    .anim {
      transition: all 1s;
      margin-top: -30px;
    }
    li {
      list-style: none;
      line-height: 30px;
      // height: 30px;
      & span {
        display: inline-block;
        padding: 0 3px;
        color: red;
      }
    }
  }

  //中奖的弹窗
  .prizewinning {
    position: absolute;
    background-color: rgba($color: #000000, $alpha: 0.2);
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 99;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    .prizewinning-content {
      padding: 0.5rem;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 5px 5px 5px #ccc;
      & > p {
        padding: 3px 0;
      }
      .prizewinning-inp {
        display: flex;
        justify-content: space-around;
        & > input {
          padding: 2px 5px;
          border: 1px solid #999;
          margin-top: 0.5rem;
          &:nth-child(1) {
            margin-right: 0.5rem;
          }
        }
      }
    }
  }

  //说明条款
  .explain {
    width: 90vw;
    padding: 10px;
    margin: 0 auto;
    margin-top: 0.5rem;
    background-color: #f5f5f5;
    & > p {
      text-align: center;
      padding: 10px;
      font-size: 0.4rem;
      font-weight: bold;
    }
    & > div {
      text-indent: 2em;
    }
  }
}
</style>