
<template>
  <!-- v-if="explain" -->
  <div class="tx-dx-table" v-if="pageshow">
    <!-- 首次进入的弹窗说明 -->
    <div class="shouquan" v-if="explain">
      <div class="shouquan-content">
        <p>说明</p>
        <p class="shouquan-content-content">
          <span v-html="list.declare"></span>
        </p>
        <van-checkbox class="checkbox" v-model="checked">同意</van-checkbox>
        <div class="btn" @click="showbtncl">确认</div>
      </div>
    </div>
    <van-nav-bar
      title="转盘详情"
      left-text="返回"
      left-arrow
      class="fbpl"
      @click-left="onClickLeft"
    />
    <div class="table-list-1" v-if="list.open != 0">
      <div class="hed">
        <div class="hed-left">
          <div class="hed-img">
            <img src="" alt="" />
          </div>
          <div class="hed-tit">
            <p class="username">{{ username }}</p>
            <p>券余额：{{ list.ticket }}</p>
            <p>积分余额：{{ list.available_amount }}</p>
          </div>
        </div>
        <div class="hed-right">
          <span @click="record">中奖记录</span>
        </div>
      </div>
    </div>

    <!-- 开盘倒计时/结束倒计时 -->
    <div class="wheel_popup">
      <div v-if="list.open === 1">
        <p>转盘未开启</p>
        <p>敬请期待</p>
      </div>
      <div v-else-if="list.open === 2 && lists.now_money < list.money">
        <p>开盘资金：{{ list.now_money }} / {{ list.money }}</p>
      </div>
      <div v-else-if="list.open === 2 && lists.now_money >= list.money">
        <p v-if="list_zt">
          开盘倒计时：{{ time.hours }}时{{ time.minutes }}分{{ time.seconds }}秒
        </p>
        <p v-else>
          您的剩余抽奖次数：<span>{{ draw.draw_num }}</span
          >次
        </p>
      </div>
      <div v-else-if="list.open === 3">
        <p>抽奖已经结束</p>
      </div>
      <div v-else-if="list.open === 0">
        <p>暂无轮盘信息</p>
      </div>
    </div>

    <!-- 轮盘 -->
    <div class="wheel_wp">
      <img src="../imgs/s-dial_bg.png" />
      <div
        class="wheel_pointer"
        @click="start"
        :style="
          '-webkit-transform:rotate(' +
          deg +
          'deg) translateZ(0);transform:rotate(' +
          deg +
          'deg) translateZ(0)'
        "
      >
        <img src="../imgs/s-dial_pointer.png" />
      </div>
      <!-- 悬浮层————显示中了什么奖励 -->
      <div class="wheel_suspension" v-if="prizeSH" v-html="prizeSHC"></div>
    </div>

    <!-- 获奖者的轮播 -->
    <ul class="wheel_circulation">
      <li
        v-for="(item, index) in date"
        :key="item + index"
        :class="{ anim: animate == true }"
      >
        恭喜用户<span>{{ item.username }}</span
        >于<span>{{ item.create_time }}</span
        >中奖<span>{{ item.money }}</span>
      </li>
    </ul>

    <!-- 立即参与|我要追加 按钮 -->
    <input type="button" :value="wheelBtn" class="wheel_btn" @click="btn" />

    <!-- 立即参与/我要追加 的投入页面 -->
    <div class="participation" v-show="cyzjs">
      <!-- 立即参与 -->
      <div v-if="false" class="participation-div">
        <p class="participation-div-title">立即参与</p>
        <input type="text" v-model="canyu" :key="'cy'" />
        <p>
          投入数量需为<span>{{ list.ticket / list.draw_times }}</span
          >的整数倍
        </p>
        <p>
          可获得抽奖次数：<span>{{ cishu }}</span
          >次！
        </p>
        <div class="inpBox">
          <input type="button" value="取消" @click="zjqx" :key="'ljcyqx'" />
          <input type="button" value="确定" @click="zjqd" :key="'ljcyqd'" />
        </div>
      </div>

      <!-- 我要追加 -->
      <div v-else class="participation-div">
        <p class="participation-div-title">我要追加</p>
        <p class="jinggao" v-if="hint">
          请输入{{ list.ticket / list.draw_times }}的整数倍
        </p>
        <input type="text" v-model="canyu" :key="'zj'" />
        <p>
          投入数量需为<span>{{ list.ticket / list.draw_times }}</span
          >的整数倍
        </p>
        <p>
          可获得抽奖次数：<span>{{ cishu }}</span
          >次！
        </p>
        <div class="inpBox">
          <input type="button" value="取消" @click="zjqx" :key="'wyzjqx'" />
          <input type="button" value="确定" @click="zjqd" :key="'wyzjqd'" />
        </div>
      </div>
    </div>

    <!-- 游戏介绍说明 -->
    <div class="wheel_introduce">
      <p class="wheel_introduce_title">转盘介绍！</p>
      <span class="wheel_introduce_content" v-html="list.introduce"></span>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import { apiHost, specfield } from "@/plugins/path";
import axios from "@/plugins/axios";
import ClipboardJS from "clipboard";
const tablelen = localStorage.getItem("tablelen");
export default {
  data() {
    return {
      animate: true, //获奖者的轮播
      prizeSHC: `恭喜您抽中了豪华大礼包<span class="wheel_prize">${this.prize}</span>一份！`,
      draw: {},
      canyu: null, //参与投入的数量
      cishu: null, //获得的抽奖次数
      cyzjs: false, //参与/追加 弹出层
      hint: false, //参与|追加 的金额警告
      explain: true, //加载时候的说明弹出层
      deg: 0, //指针转动的角度
      isStart: 360 / 6, // 每片扇形的角度
      zhuangtai: false, //显示状态
      wheelBtn: "立即参与", //立即参与/我要追加
      // prize: "duangduang", //奖品
      prizeSH: false, //获奖提示的显示与隐藏
      jishu: 0, //用于存储点击抽奖的状态
      time: {}, //开始抽奖的倒计时
      list_zt: true, //开奖倒计时 | 您的剩余抽奖次数
      drawzhuangtai: false, //
      date: ["数据1", "数据2", "数据3", "数据4", "数据5", "数据6", "数据7"],
      list: {},
      lists: {},
      username: sessionStorage.getItem("name"),
      currentlen: 0,
      current: 0,
      pageshow: false,
      showmsg: false,
      checked: false,
      turntable_id: this.$route.params.turntable_id,
    };
  },
  created() {
    //首次进入的弹窗说明
    if (localStorage.getItem("tablelen") === "true") {
      this.explain = false;
    }
  },
  mounted() {
    this.firstAPI();
  },
  watch: {
    canyu() {
      this.cishu = this.canyu / (this.list.ticket / this.list.draw_times);
    },
    //监听“参与追加”的弹出层状态，禁止|解除滚动条滚动
    cyzj() {
      if (this.cyzj) {
        this.stop(); //禁止滚动条滚动
      } else {
        this.move(); //取消滚动限制
      }
    },
  },
  methods: {
    //轮盘——抽奖
    start() {
      this.jishu++; //累计点击的次数，防止重复点击
      if (this.jishu === 1) {
        if (this.drawzhuangtai) {
          var quans = parseInt(Math.random() * 6, 10) + 3; //圈数——几圈
          var quanchang = quans * 360; //圈长——跑几圈有多长
          var rangeAngle = parseInt(Math.random() * 361, 10); //射程角
          var zj = rangeAngle + quanchang; //实际旋转几圈再停止
          this.deg = 0;
          this.draw.draw_num--;
          var aaa = setInterval(() => {
            if (this.deg < zj) {
              this.deg += 15;
            } else {
              clearInterval(aaa);
              axios
                .post(
                  `${apiHost}/turntable`,
                  qs.stringify({
                    turntable_id: this.list.turntable_id,
                  })
                )
                .then((res) => {
                  console.log(Number(res.data.info.now_money));
                  if (Number(res.data.info.now_money)) {
                    axios
                      .post(
                        `${apiHost}/turntable/draw`,
                        qs.stringify({
                          turntable_id: this.list.turntable_id,
                        })
                      )
                      .then((val) => {
                        let res = val.data.info;
                        this.draw = res;
                        this.prizeSH = true; //显示获奖提示框
                        if (res.lottery_results) {
                          console.log("中奖");
                          this.prizeSHC = `恭喜您中奖<span class="wheel_prize">${res.money}</span>元奖品一份`;
                          //访问转盘首页接口，看转盘是否结束了
                          axios
                            .post(
                              `${apiHost}/turntable`,
                              qs.stringify({
                                turntable_id: this.list.turntable_id,
                              })
                            )
                            .then((res) => {
                              this.list.open = res.data.info.open;
                            });
                        } else {
                          console.log("未中奖");
                          this.prizeSHC = `很遗憾，您此次未能中奖`;
                        }

                        //一次性定时器
                        var qqq = setInterval(() => {
                          this.prizeSH = false;
                          this.jishu = 0; //恢复点击的状态
                          clearInterval(qqq);
                        }, 1500);
                      });
                      
                      //首页
                      axios.post(`${apiHost}/turntable`,
                        qs.stringify({
                          turntable_id:this.list.turntable_id
                        })
                      )
                      .then((res)=>{
                        if(!(Number(res.data.info.now_money))){
                          this.firstAPI();
                        }
                      })
                  }
                });
            }
          }, 20);
        } else {
          alert("还未到开奖时间！");
        }
      } else {
        console.log("请勿重复点击，谢谢合作！");
      }
    },

    //说明条款上面的确认
    showbtncl() {
      if (this.checked) {
        this.explain = false;
        localStorage.setItem("tablelen", true);
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onChange(index) {
      this.current = index;
    },
    firstAPI() {
      Date.prototype.toLocaleString = function () {
        // 补0   例如 2018/7/10 14:7:2  补完后为 2018/07/10 14:07:02
        function addZero(num) {
          if (num < 10) return "0" + num;
          return num;
        }
        // 按自定义拼接格式返回
        return (
          this.getFullYear() +
          "/" +
          addZero(this.getMonth() + 1) +
          "/" +
          addZero(this.getDate()) +
          " " +
          addZero(this.getHours()) +
          ":" +
          addZero(this.getMinutes()) +
          ":" +
          addZero(this.getSeconds())
        );
      };

      let that = this;
      let turntable_id = that.turntable_id;
      const toast1 = that.$toast.loading({
        duration: 0,
        forbidClick: true,
      });

      //加载显示的

      axios
        .post(
          `${apiHost}/turntable`,
          qs.stringify({
            turntable_id: turntable_id || 0,
          })
        )
        .then((res) => {
          let { data } = res;
          let { info, status, message } = data;
          that.pageshow = true;
          if (status === 1) {
            that.list = { ...info };
            //1秒访问一次接口
            this.ssfw();
          } else {
            that.empty = true;
            that.emptyText = message;
          }
          //“立即参与”/“我要追加”
          if (that.list.num < 1) {
            that.wheelBtn = "立即参与";
          } else {
            that.wheelBtn = "我要追加";
          }
        });

      //1秒访问一次接口
      // this.ssfw();

      //获奖者的轮播
      this.carousel();

      toast1.clear(); //加载
    },
    //1秒一次访问
    ssfw() {
      var ss = setInterval(() => {
        //实时访问接口信息
        axios
          .post(
            `${apiHost}/turntable/latestInputRecord`,
            qs.stringify({
              turntable_id: this.list.turntable_id,
            })
          )
          .then((val) => {
            var lists = val.data.info;
            this.lists = lists;
            this.list.now_money = lists.now_money;
            this.list.open = lists.open;
            //如果信息数组没有发生改变，就不动他
            if (!(this.date.toString() == lists.putinto.toString())) {
              this.date = lists.putinto;
            }
            this.lists.now_money = Number(lists.now_money);
            //金额已经满，准备开启抽奖
            if (Number(lists.now_money) >= Number(this.list.money)) {
              let kscj =
                lists.countdown_time * 1000 + this.list.countdown * 1000; //这是开始抽奖的时间
              let date = new Date().getTime(); //本地时间
              //倒计时的时间 = 开始抽奖的时间 - 本地时间
              let djs = Math.floor((kscj - date) / 1000) + 10;
              this.time = this.getFormatDuration(djs); //页面渲染倒计时
              //是否正在进行抽奖
              console.log(djs);
              if (djs <= 0) {
                console.log("抽奖进行中！");
                this.list_zt = false; //开奖倒计时 | 您的剩余抽奖次数
                this.drawzhuangtai = true;
                //访问一次抽奖接口
                axios
                  .post(
                    `${apiHost}/turntable`,
                    qs.stringify({
                      turntable_id: this.list.turntable_id,
                    })
                  )
                  .then((vallss) => {
                    this.draw.draw_num = vallss.data.info.num; //开奖倒计时结束后显示抽奖次数
                  });
                if (lists.now_money <= 0) {
                  console.log("奖池已空，抽奖结束！");
                }
                clearInterval(ss); //停止定时器
              }
            }
          });
      }, 1000);
    },

    //获奖者的轮播
    carousel() {
      setInterval(() => {
        this.animate = true; // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
        setTimeout(() => {
          //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
          this.date.push(this.date[0]); // 将数组的第一个元素添加到数组的
          this.date.shift(); //删除数组的第一个元素
          this.animate = false; // margin-top 为0 的时候取消过渡动画，实现无缝滚动
        }, 500);
      }, 1000);
    },

    //中奖记录
    record() {
      console.log();
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

    //立即参与
    btn() {
      if (this.list.open === 2) {
        this.cyzjs = true; //显示隐藏弹出层
      } else {
        console.log("本次抽奖已经停止，敬请期待！");
      }
    },

    //参与/追加——取消按钮
    zjqx() {
      this.cyzjs = false;
      this.hint = false; //输入的金额不规范 提示
    },

    //参与/追加——确定按钮
    zjqd() {
      //判断输入的参数是否为X的整数倍
      if (
        this.canyu % (this.list.ticket / this.list.draw_times) === 0 &&
        this.canyu != "" &&
        this.canyu != "null" &&
        this.canyu > 0
      ) {
        console.log("1");
        //上传数据
        axios
          .post(
            `${apiHost}/turntable/investmentVoucher`,
            qs.stringify({
              turntable_id: this.list.turntable_id,
              money: this.canyu,
              type: 1,
            })
          )
          .then((res) => {
            let { data } = res;
            let { info, status, message } = data;
            // this.pageshow = true;

            //重新获取数据——更新数据
            if (status === 1) {
              axios
                .post(
                  `${apiHost}/turntable/latestInputRecord`,
                  qs.stringify({ turntable_id: this.list.turntable_id })
                )
                .then((res) => {
                  var val = res.data.info;
                  this.draw.draw_num = val.num;
                  this.lists = val;
                  console.log(val);
                });
            } else {
              this.empty = true;
              this.emptyText = message;
            }
          });

        this.hint = false; //输入的金额不规范 提示
        this.cyzjs = false; //我要追加 | 立即参与  的弹出层的  显示 | 隐藏
      } else {
        this.hint = true;
      }
    },

    //禁止滚动
    stop() {
      var mo = function (e) {
        e.preventDefault();
      };
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", mo, false); //禁止页面滑动
    },

    /***取消滑动限制***/
    move() {
      var mo = function (e) {
        e.preventDefault();
      };
      document.body.style.overflow = ""; //出现滚动条
      document.removeEventListener("touchmove", mo, false);
    },
  },
};
</script>
<style lang="scss" >
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.tx-dx-table {
  position: relative;
  width: 100%;
  font-size: 14px;
  min-height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .shouquan {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.5);
    z-index: 9999;
    .shouquan-content {
      position: absolute;
      width: 80%;
      padding: 20px;
      background-color: #fff;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
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
      .shouquan-content-content {
        text-indent: 2em;
      }
    }
  }
  .table-list-1 {
    font-size: 13px;
    color: #9c9c9c;
    padding-top: 0.9rem;
    width: 100%;
    .hed {
      width: 100%;
      padding: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .hed-left {
      display: flex;
      font-size: 12px;
      .hed-img {
        width: 1.1rem;
        height: 1.1rem;
        background: #f4f4f4;
        border-radius: 100%;
        margin-right: 0.2rem;
      }
      .hed-tit {
        .username {
          font-size: 14px;
        }
      }
    }
    .hed-right {
      border: 1px solid #9c9c9c;
      border-radius: 2px;
      height: 0.6rem;
      padding: 0 10px;
      display: flex;
      align-items: center;
      span {
        line-height: 1;
      }
    }
    .tit {
      color: #151516;
      font-size: 14px;
      margin-bottom: 8px;
    }
    .synopsis {
      margin-bottom: 10px;
      text-align: justify;
      img {
        max-width: 100%;
        display: block;
      }
    }
    .detail {
      margin-bottom: 10px;
      text-align: justify;
      img {
        max-width: 100%;
        display: block;
      }
    }
  }
  //立即参与/我要追加 的弹出层
  .participation {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.5);
    z-index: 9998;
    .participation-div {
      position: absolute;
      width: 80%;
      padding: 10px;
      border: 1px solid red;
      background-color: #fff;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      & > p {
        color: #666;
        & > span {
          color: red;
          display: inline-block;
          padding: 0 5px;
          font-weight: 600;
        }
      }
      .jinggao {
        color: red;
        font-size: 14px;
      }
      .participation-div-title {
        color: #444;
        font-size: 18px;
        font-weight: bold;
      }
      input {
        border: 1px solid #999;
        padding: 5px 10px;
        margin-top: 15px;
        margin-bottom: 10px;
        border-radius: 5px;
      }
      .inpBox {
        width: 100%;
        display: flex;
        justify-content: space-around;
        & input:nth-child(2) {
          // background-color: red;
          border-color: red;
        }
      }
    }
  }
  // 开盘倒计时/结束倒计时
  .wheel_popup {
    width: 80%;
    margin-top: 20px;
    border: 1px solid #ccc;
    background-color: #f5f5f5;
    line-height: 2em;
    padding: 10px 0;
    text-align: center;
  }
  //轮盘——抽奖
  .wheel_wp {
    width: 320px;
    height: 320px;
    position: relative;
    // margin: 0 auto;
    margin-top: 10px;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
    .wheel_pointer {
      position: absolute;
      width: 95px;
      height: 95px;
      top: 50%;
      left: 50%;
      margin: -46px 0 0 -46px;
    }
    .wheel_suspension {
      position: absolute;
      top: 0;
      width: 100%;
      border: 1px solid #736aff;
      text-align: center;
      padding: 20px 0;
      background-color: #00ffff;
      .wheel_prize {
        color: red;
        font-weight: bold;
        font-size: 18px;
      }
    }
  }
  //获奖者的轮播
  .wheel_circulation {
    width: 80%;
    height: 190px;
    overflow: hidden;
    // padding: 10px;
    border: 1px solid #ccc;
    // margin: 0 auto;
    .anim {
      transition: all 0.5s;
      margin-top: 0px;
    }
    & > li {
      width: 100%;
      height: 45px;
    }
    & span {
      color: red;
      display: inline-block;
      padding: 0 5px;
      &:nth-child(3) {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
  //按钮
  .wheel_btn {
    display: block;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px 30%;
    // margin: 0 auto;
    margin-top: 30px;
    &:hover {
      cursor: pointer;
    }
  }
  //转盘游戏介绍说明
  .wheel_introduce {
    width: 80%;
    border: 1px solid #ccc;
    margin-top: 20px;
    padding: 10px;
    .wheel_introduce_title {
      width: 100%;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .wheel_introduce_content {
      display: block;
      text-indent: 2em;
    }
  }
}
</style>