
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
    <van-nav-bar title="转盘详情" left-text="返回" left-arrow class="fbpl" @click-left="onClickLeft" />

    <div class="table-list-1" v-if="list.open != 0">
      <div class="hed">
        <div class="hed-left">
          <!-- <div class="hed-img">
            <img src="" alt="" />
          </div>-->
          <div class="hed-tit">
            <p class="username">{{ username }}</p>
            <p>
              券余额：
              <span>{{ list.ticket }}</span>
            </p>
            <p>
              积分余额：
              <span>{{ list.available_amount }}</span>
            </p>
          </div>
        </div>
        <div class="hed-right">
          <span @click="recordbtn">中奖记录</span>
        </div>
      </div>
    </div>
    <div class="table-list-1" v-else></div>

    <!-- 开盘倒计时/结束倒计时 -->
    <div class="wheel_popup">
      <!-- open === 1 -->
      <div v-if="list.open === 1">
        <p>转盘未开启</p>
        <p>敬请期待</p>
      </div>
      <!-- open === 2 -->
      <div v-else-if="list.open === 2">
        <p>
          开盘资金：{{ list.now_money }} /
          <span class="huise">{{ list.money }}</span>
        </p>
        <p v-if="parseInt(lists.draw_money)">剩余可抽取奖金：{{ lists.draw_money }}</p>
        <div v-if="parseInt(list.now_money) >= parseInt(list.money)">
          <p>最新投入金额：{{ lists.now_money }}</p>
          <p>剩余可抽取奖金：{{ lists.draw_money }}</p>
          <p v-if="list_zt">
            开盘倒计时：{{ time.hours }}时{{ time.minutes }}分{{
            time.seconds
            }}秒
          </p>
          <p v-else>
            <span class="underway">抽奖进行中！</span>
            <br />
            <span>
              您的剩余抽奖次数：
              <span class="underway">{{ list.num }}</span>次
            </span>
          </p>
        </div>
      </div>
      <!-- open === 3 -->
      <div v-else-if="list.open === 3">
        <p>抽奖已经结束</p>
      </div>
      <!-- open === 0 -->
      <div v-else>
        <p>暂无轮盘信息</p>
      </div>
    </div>

    <!-- 轮盘——————旧版本 -->
    <!-- <div class="wheel_wp">
      <img src="../imgs/s-dial_bg.png" />
      <div
        v-for="(item, index) in icon"
        :key="item.title"
        class="icon"
        :class="`icon${index}`"
        :style="'transform:rotate(' + degs[index] + 'deg)'"
        @click="iconbtn(item)"
      >
        <img :src="item.icon" alt />
      </div>
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
    </div>-->

    <!-- 轮盘——————新版本 -->
    <div class="turntableNew">
      <div class="wrapper">
        <div
          class="light"
          v-for="(item, index) in icon"
          :key="item.id"
          :style="'transform: rotate(' + degg[index] + 'deg)'"
        ></div>
        <div class="panel">
          <div
            class="sector"
            v-for="(item, index) in icon"
            :key="item.id + 'er'"
            :style="'transform: rotate(' + degg[index] + 'deg)'"
          >
            <div
              class="sector-inner"
              :style="'transform: translateX(-180px) rotate(' + angles + 'deg)'"
            >
              <div>
                <img :src="item.icon" alt />
                <!-- <span>谢谢参与{{ item.id }}</span> -->
              </div>
            </div>
          </div>
          <div
            class="pointer"
            @click="choujiang"
            :style="'transform: rotate(' + rotateDeg + 'deg)'"
          >开始抽奖</div>
        </div>
      </div>
      <div class="result"></div>
    </div>

    <!-- 当前中奖人员信息 -->
    <ul class="speech" v-if="speech.length">
      <div>当前轮盘的中奖信息</div>
      <li v-for="item in speech" :key="item.create_time" @click="speechbtn(item.username)">
        恭喜
        <span>{{ item.username }}</span>于
        <span>{{ item.create_time }}</span>中奖
        <span>{{ item.money }}</span>。
        <span>查看获奖感言</span>
      </li>
    </ul>

    <!-- 资金盘注入信息 -->
    <ul class="wheel_circulation" v-if="list.open == 2">
      <div>资金盘注入信息：</div>
      <li v-for="(item, index) in date" :key="item + index" :class="{ anim: animate == true }">
        用户
        <span>{{ item.username }}</span>于
        <span>{{ item.create_time }}</span>投入
        <span>{{ item.money }}</span>
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
          投入数量需为
          <span>{{ list.ticket / list.draw_times }}</span>的整数倍
        </p>
        <p>
          可获得抽奖次数：
          <span>{{ cishu }}</span>次！
        </p>
        <div class="roll-integral">
          <label>
            券余额
            <input type="radio" v-model="gender" value="1" name="roll-integral" />
          </label>
          <label>
            积分余额
            <input type="radio" v-model="gender" value="2" name="roll-integral" />
          </label>
        </div>
        <div class="inpBox">
          <input type="button" value="取消" @click="zjqx" :key="'ljcyqx'" />
          <input type="button" value="确定" @click="zjqd" :key="'ljcyqd'" />
        </div>
      </div>

      <!-- 我要追加 -->
      <div v-else class="participation-div">
        <p class="participation-div-title">我要追加</p>
        <p class="jinggao" v-if="hint">请输入{{ list.ticket / list.draw_times }}的整数倍</p>
        <input type="text" v-model="canyu" :key="'zj'" />
        <p>
          投入数量需为
          <span>{{ list.ticket / list.draw_times }}</span>的整数倍
        </p>
        <p>
          可获得抽奖次数：
          <span>{{ cishu }}</span>次！
        </p>
        <div class="roll-integral">
          <label>
            券余额
            <input type="radio" v-model="gender" value="1" name="roll-integral" />
          </label>
          <label>
            积分余额
            <input type="radio" v-model="gender" value="2" name="roll-integral" />
          </label>
        </div>
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

    <!-- 中奖后，发表获奖感言 -->
    <div class="publish" v-show="tanchu">
      <div class="publish-content" @click="turnspeech">
        <p>
          恭喜您获得
          <span class="jp">{{ prize }}</span>奖品一份
        </p>
        <p>点击请前往发表获奖感言！</p>
      </div>
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
      zp: [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        },
        {
          id: 4
        },
        {
          id: 5
        },
        {
          id: 6
        },
        {
          id: 7
        },
        {
          id: 8
        },
        {
          id: 9
        },
        {
          id: 10
        }
      ],//新版本轮盘模拟数据
      degg: [],
      angles: null, //角度
      rotateDeg: 19, //转盘指针初始角度
      zzTime: null, //转盘指针定时器
      speech: [], //当前轮盘的中奖者
      // degs: [30, 90, 150, -150, -90, -30],//————旧版本轮盘角度数据
      icon: [], //奖品图标
      countDownzt: 0, //倒计时的定时器状态
      djsdsq: false, //倒计时的定时器
      realTimedsq: false, //实时数据定时器
      realTimedsqzt: 0, //实时数据定时器状态
      qcdsq: false, //清除定时器
      draw_id: null, //中奖记录编号
      gender: "",
      animate: true, //获奖者的轮播
      draw: {},
      canyu: null, //参与投入的数量
      cishu: 0, //获得的抽奖次数
      cyzjs: false, //参与/追加 弹出层
      hint: false, //参与|追加 的金额警告
      explain: true, //加载时候的说明弹出层
      deg: 0, //指针转动的角度
      isStart: 360 / 6, // 每片扇形的角度
      zhuangtai: false, //显示状态
      wheelBtn: "立即参与", //立即参与/我要追加
      prize: "duangduang", //奖品
      tanchu: false, //获奖弹出层
      prizeSH: false, //获奖提示的显示与隐藏
      jishu: 0, //用于存储点击抽奖的状态
      time: {}, //开始抽奖的倒计时
      list_zt: true, //开奖倒计时 | 您的剩余抽奖次数
      drawzhuangtai: false, //转盘是否开始
      date: [], //最新投入记录
      list: {}, //首次加载的数据
      lists: {}, //实时的数据
      username: sessionStorage.getItem("name"),
      currentlen: 0,
      current: 0,
      pageshow: false,
      showmsg: false,
      checked: false,
      turntable_id: null,
      ss: null,
      djs: null,
      toas1: this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true
      })
    };
  },
  created() {
    var url = window.location.href; //获取网址的hash值
    console.log(url, "url地址");
    //如果网址存在“?”
    if (url.includes("?")) {
      //获取hash“?”后面的值
      var arrArg = url.split("?")[1];
      this.turntable_id = parseInt(arrArg);
    }

    console.log(this.turntable_id, "turntable_id值", "时间：22：37");
    //首次进入的弹窗说明
    if (localStorage.getItem("tablelen") === "true") {
      this.explain = false;
    }

    //turntable接口————首次加载的数据
    this.PostTurntable();

    //“立即参与”/“我要追加”
    if (this.list.num < 1) {
      this.wheelBtn = "立即参与";
    } else {
      this.wheelBtn = "我要追加";
    }

    //获奖者的轮播
    this.carousel();

    //更改原型的
    this.firstAPI();
  },
  mounted() {},
  watch: {
    canyu() {
      this.cishu = this.canyu / (this.list.ticket / this.list.draw_times);
    },
    //监听“参与追加”的弹出层状态，禁止|解除滚动条滚动
    cyzjs() {
      if (this.cyzjs) {
        this.stop(); //禁止滚动条滚动
      } else {
        this.move(); //取消滚动限制
      }
    }
  },
  methods: {
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

    //说明条款上面的确认
    showbtncl() {
      if (this.checked) {
        this.explain = false;
        localStorage.setItem("tablelen", true);
      }
    },

    //修改原型
    firstAPI() {
      Date.prototype.toLocaleString = function() {
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
    },

    //奖品信息
    iconbtn(item) {
      this.$toast(`奖品：${item.title}，价值：${item.money}元！`);
    },

    //Turntable接口
    PostTurntable() {
      axios
        .post(
          `${apiHost}/turntable`,
          qs.stringify({
            turntable_id: this.turntable_id || 0
          })
        )
        .then(res => {
          console.log(res);
          console.log(res.data.status);
          let { data } = res;
          let { info, status, message } = data;
          this.pageshow = true;

          if (status === 1) {
            this.list = { ...info };
            console.log(this.list, this.turntable_id, "首页数据");
            // this.icon = info.prize;
            if (!(this.icon.toString() == info.prize.toString())) {
              this.icon = info.prize;
            }
            //新版本轮盘——计算相关数据
            //icon替换成zp即为新版本轮盘的模拟数据
            let deg = 360 / this.icon.length;
            for (let i = 1; i < this.icon.length; i++) {
              this.degg.push(deg * i);
            }
            this.angles = deg;
            console.log(this.degg, "数组", this.angles, "角度");
            console.log(this.icon, "这是奖品列表");

            //最新数据———turntable/latestInputRecord
            if (info.open == 3) {
              return;
            }
            this.PostLatestInputRecord();
          } else {
            this.empty = true;
            this.emptyText = message;
          }
        });

      this.toas1.clear();
    },

    //最新数据——turntable/latestInputRecord
    PostLatestInputRecord() {
      // clearInterval(ss);
      axios
        .post(
          `${apiHost}/turntable/latestInputRecord`,
          qs.stringify({
            turntable_id: this.list.turntable_id
          })
        )
        .then(val => {
          let data = val.data.info;
          this.lists = data;
          this.list.now_money = data.now_money; //奖池中最新投入金额
          this.list.open = data.open; //open
          // this.list.num = data.num//可抽奖次数；
          //最新投入记录
          if (!(this.date.toString() == data.putinto.toString())) {
            this.date = data.putinto;
          }
          if (data.draw.length) {
            console.log("有人中奖了");
          }
          //中奖信息
          if (!(this.speech.toString() == data.draw.toString())) {
            this.speech = data.draw;
            console.log(this.speech, "获奖者信息");
          }
          // this.toas1.clear();

          console.log(
            data,
            "这里是最新获取的数据",
            this.list,
            "这里是最新的首页数据"
          );

          this.realTimedsqzt++;
          this.realTime(); //定时器————访问最新数据

          //判断是否开启了转盘
          if (data.countdown_time) {
            console.log("开启了转盘");
            this.countDownzt++;
            this.CDorRD();
          } else {
            console.log("未开启转盘");
            this.drawzhuangtai = false; //是否开启抽奖按钮
            this.list_zt = true;
          }

          // this.realTime();//最新数据
        });
    },


    // //定时器————访问最新数据
    realTime() {
      if (this.realTimedsqzt !== 1) {
        return;
      }
      console.log("访问最新数据定时器状态");
      this.ss = setInterval(() => {
        //主动清除定时器
        if (this.realTimedsq) {
          console.log("清除了访问最新数据的定时器");
          clearInterval(this.ss);
        }
        this.PostLatestInputRecord(); //最新数据
      }, 1000);
    },

    //定时器————倒计时 | 您的剩余抽奖次数
    countDown() {
      if (this.countDownzt !== 1) {
        return;
      }
      console.log("倒计时定时器状态");
      this.djs = setInterval(() => {
        console.log("倒计时定时器状态");
        //主动清除定时器
        if (this.drawzhuangtai) {
          console.log("清除了倒计时的定时器");
          clearInterval(this.djs);
        }
        this.CDorRD();
      }, 1000);
    },

    //倒计时 | 您的剩余抽奖次数
    CDorRD() {
      let kscj = this.lists.countdown_time * 1000 + this.list.countdown * 1000; //这是开始抽奖的时间
      let date = new Date().getTime(); //本地时间
      console.log(this.list, "倒计时 | 您的剩余抽奖次数", kscj, date);
      //退出条件
      if (kscj < date) {
        console.log("倒计时已经结束，正在抽奖");
        this.djsdsq = true; //清除倒计时的定时器
        this.countDownzt = 0; //恢复状态
        this.drawzhuangtai = true;
        this.list_zt = false;
        return;
      } else {
        this.countDownzt++;
        this.countDown(); //启动倒计时定时器
        console.log("正在倒计时，倒计时后开始抽奖");
        this.drawzhuangtai = false;
        this.list_zt = true; //true开奖倒计时 | false您的剩余抽奖次数
      }
      //倒计时的时间 = 开始抽奖的时间 - 本地时间
      let countDown = Math.floor((kscj - date) / 1000);
      this.time = this.getFormatDuration(countDown); //页面渲染倒计时
    },

    //抽奖——————旧版本
    // start() {
    //   if (!this.drawzhuangtai) {
    //     this.$toast("转盘还未开启，敬请期待！");
    //     return;
    //   }
    //   this.jishu++; //累计点击的次数，防止重复点击
    //   if (this.jishu > 1) {
    //     this.$toast("请勿重复点击，谢谢合作！");
    //     return;
    //   }
    //   var quans = parseInt(Math.random() * 6, 10) + 3; //圈数——几圈
    //   var quanchang = quans * 360; //圈长——跑几圈有多长
    //   var rangeAngle = parseInt(Math.random() * 361, 10); //射程角
    //   var zj = rangeAngle + quanchang; //实际旋转几圈再停止
    //   this.deg = 0;
    //   var aaa = setInterval(() => {
    //     if (this.deg < zj) {
    //       this.deg += 15;
    //     } else {
    //       clearInterval(aaa);

    //       //一次性定时器
    //       var qqq = setInterval(() => {
    //         this.prizeSH = false;
    //         this.jishu = 0; //恢复点击的状态
    //         clearInterval(qqq);
    //       }, 1000);

    //       //访问抽奖接口
    //       axios
    //         .post(
    //           `${apiHost}/turntable/draw`,
    //           qs.stringify({
    //             turntable_id: this.list.turntable_id
    //           })
    //         )
    //         .then(val => {
    //           let res = val.data.info;
    //           console.log(val, res, "这是抽奖接口的返回信息");
    //           this.list.num = res.draw_num; //剩余抽奖次数
    //           this.draw_id = res.draw_id; //中奖记录编号
    //           if (res.lottery_results) {
    //             console.log("中奖");
    //             this.prize = res.money;
    //             console.log(res.money, this.prize, this.draw_id);
    //             this.stop(); //禁止滚动条滚动
    //             this.tanchu = true;
    //             // this.$toast(`恭喜您获得${res.money}元现金奖品一份！`);
    //           }

    //           //访问首页
    //           this.PostTurntable();
    //           console.log(
    //             "每次点击抽奖后，访问一次首页数据，看看转盘是否还开启的"
    //           );
    //         });
    //     }
    //   }, 20);
    // },

    //新版本抽奖
    choujiang() {
      if (!this.drawzhuangtai) {
        this.$toast("转盘还未开启，敬请期待！");
        return;
      }
      this.jishu++; //累计点击的次数，防止重复点击
      if (this.jishu > 1) {
        this.$toast("请勿重复点击，谢谢合作！");
        return;
      }
      this.rotateDeg = 19; //初始化
      let rotateDegS = Math.random() * 360 + 1080; //圈长
      var aaa = setInterval(() => {
        if (this.rotateDeg < rotateDegS) {
          this.rotateDeg += 15; //指针转圈圈
        } else {
          this.jishu = 0;
          clearInterval(aaa);
          axios
            .post(
              `${apiHost}/turntable/draw`,
              qs.stringify({
                turntable_id: this.list.turntable_id
              })
            )
            .then(val => {
              let res = val.data.info;
              console.log(res, "这是抽奖接口的返回信息");
              this.list.num = res.draw_num; //剩余抽奖次数
              this.draw_id = res.draw_id; //中奖记录编号
              if (res.lottery_results) {
                console.log("中奖");
                this.prize = res.money;
                console.log(res.money, this.prize, this.draw_id);
                this.stop(); //禁止滚动条滚动
                this.tanchu = true;
                // this.$toast(`恭喜您获得${res.money}元现金奖品一份！`);
              }

              //访问首页
              this.PostTurntable();
              console.log(
                "每次点击抽奖后，访问一次首页数据，看看转盘是否还开启的"
              );
            });
        }
      }, 20);
    },

    //发表获奖感言
    turnspeech() {
      this.move(); //取消滚动条禁止
      this.tanchu = !this.tanchu;
      this.$router.push({
        name: "turnspeech",
        params: { draw_id: this.draw_id }
      });
    },

    //查看获奖者信息
    speechbtn(username) {
      this.$router.push(
        `speech?username=${username}&id=${this.list.turntable_id}`
      );
    },

    //中奖记录按钮
    recordbtn() {
      this.$router.push({
        name: `recocrd`
      });
    },

    onClickLeft() {
      this.$router.go(-1);
    },

    onChange(index) {
      this.current = index;
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

    //参与/追加
    btn() {
      if (this.list.open === 2) {
        this.cyzjs = true; //显示隐藏弹出层
      } else {
        console.log("转盘暂未开启，敬请期待！");
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
        1
        // this.canyu % (this.list.ticket / this.list.draw_times) === 0 &&
        // this.canyu != "" &&
        // this.canyu != "null" &&
        // this.canyu > 0
      ) {
        if (!this.gender) {
          this.$toast("请填写充值类型！");
          return;
        }
        // 验证数据合法性
        if (this.gender == 1) {
          if (parseInt(this.canyu) > parseInt(this.list.ticket)) {
            this.$toast("您的卷余额不足！");
            return;
          }
        } else {
          if (parseInt(this.canyu) > parseInt(this.list.available_amount)) {
            this.$toast("您的积分余额不足！");
            return;
          }
        }
        console.log("参与/追加——确定按钮");
        //上传数据
        axios
          .post(
            `${apiHost}/turntable/investmentVoucher`,
            qs.stringify({
              turntable_id: parseInt(this.list.turntable_id),
              money: this.canyu,
              // type: 1, //这是模拟数据
              type: parseInt(this.gender)
            })
          )
          .then(res => {
            this.qcdsq = true;
            if (res.data.status === 1) {
              this.$toast(`${res.data.message}`);
            }
            this.PostTurntable();
          });

        this.hint = false; //输入的金额不规范 提示
        this.cyzjs = false; //我要追加 | 立即参与  的弹出层的  显示 | 隐藏
        // this.countDown();//启动倒计时的定时器
      } else {
        this.hint = true;
      }
    },

    //禁止滚动
    stop() {
      var mo = function(e) {
        e.preventDefault();
      };
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", mo, false); //禁止页面滑动
    },

    /***取消滑动限制***/
    move() {
      var mo = function(e) {
        e.preventDefault();
      };
      document.body.style.overflow = ""; //出现滚动条
      document.removeEventListener("touchmove", mo, false);
    }
  },

  //页面销毁前
  beforeDestroy() {
    console.log("离开当前页面的时候，清除定时器");
    clearInterval(this.ss); //定时器————访问最新数据
    clearInterval(this.djs); //倒计时
  }
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
  padding: 0 0 40px 0;
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
        color: #000;
        .username {
          font-size: 14px;
        }
        & span {
          color: #9c9c9c;
        }
      }
    }
    .hed-right {
      color: #000;
      border: 1px solid #9c9c9c;
      border-radius: 5px;
      box-shadow: 1px 1px 5px #bbb;
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
      .roll-integral {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        & label {
          display: flex;
          align-items: center;
        }
        & input {
          margin: 5px;
          padding: 2px;
        }
      }
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
        & input {
          width: 50%;
        }
        & input:nth-child(2) {
          // background-color: red;
          border-color: red;
        }
      }
    }
  }
  // 开盘倒计时/结束倒计时
  .wheel_popup {
    position: relative;
    width: 80%;
    margin-top: 20px;
    border: 1px solid #ccc;
    background-color: #f5f5f5;
    box-shadow: 5px 5px 10px #ccc;
    line-height: 2em;
    padding: 10px 0;
    text-align: center;
    .huise {
      color: #9c9c9c;
    }
    .underway {
      color: red;
      font-size: 16px;
      font-weight: bold;
    }
  }
  //轮盘————旧版本
  // .wheel_wp {
  //   width: 320px;
  //   height: 320px;
  //   position: relative;
  //   // margin: 0 auto;
  //   margin-top: 10px;
  //   img {
  //     display: block;
  //     width: 100%;
  //     height: 100%;
  //   }
  //   .wheel_pointer {
  //     position: absolute;
  //     width: 95px;
  //     height: 95px;
  //     top: 50%;
  //     left: 50%;
  //     margin: -46px 0 0 -46px;
  //   }
  //   .wheel_suspension {
  //     position: absolute;
  //     top: 0;
  //     width: 100%;
  //     border: 1px solid #736aff;
  //     text-align: center;
  //     padding: 20px 0;
  //     background-color: #00ffff;
  //     .wheel_prize {
  //       color: red;
  //       font-weight: bold;
  //       font-size: 18px;
  //     }
  //   }
  //   .icon {
  //     position: absolute;
  //     width: 50px;
  //     box-shadow: 0px 0px 10px #fff;
  //   }
  //   .icon0 {
  //     top: 70px;
  //     right: 90px;
  //   }
  //   .icon1 {
  //     top: 145px;
  //     right: 50px;
  //   }
  //   .icon2 {
  //     top: 220px;
  //     right: 95px;
  //   }
  //   .icon3 {
  //     top: 220px;
  //     left: 95px;
  //   }
  //   .icon4 {
  //     top: 145px;
  //     left: 50px;
  //   }
  //   .icon5 {
  //     top: 70px;
  //     left: 90px;
  //   }
  // }

  //轮盘——————新版本
  .turntableNew {
    position: relative;
    width: 100%;
    padding-top: 20px;
    margin-top: 20px;
    font-size: 16px;
    overflow: hidden;
    .wrapper {
      position: relative;
      width: 320px;
      height: 320px;
      box-sizing: content-box;
      margin: 0 auto;
      padding: 20px;
      background-color: #ff5555;
      box-shadow: #000000 0px 0px 10px;
      border-radius: 50%;

      .light {
        position: absolute;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        top: 5px;
        left: 175px;
        transform-origin: 5px 175px;
      }
      .light-twinkling {
        animation: 1s twinkling 3, 100ms 3s twinkling 3;
      }
      .light:nth-child(2n) {
        background-color: rebeccapurple;
      }

      .light:nth-child(2n + 1) {
        background-color: red;
      }
      .panel {
        position: relative;
        height: 320px;
        width: 320px;
        background-color: #b7b7b7;
        border-radius: 50%;
        transform: rotate(-18deg);
        .sector {
          position: absolute;
          left: 160px;
          top: 0px;
          width: 160px;
          height: 320px;
          font-size: 14px;
          border-radius: 0px 200px 200px 0;
          overflow: hidden;
          transform-origin: left center;
          &:nth-child(2n + 1) .sector-inner {
            background: rgb(255, 174, 0);
          }
          &:nth-child(2n) .sector-inner {
            background: rgb(248, 193, 74);
          }
          & .sector-inner {
            position: relative;
            text-align: center;
            width: 180px;
            padding: 5px 3px 0 57px;
            height: 320px;
            transform-origin: right center;
            border-radius: 100px 0 0 100px;
            overflow: hidden;
            & div {
              position: relative;
              width: 50%;
              margin: 0 auto;
              margin-top: 20px;
              transform-origin: center;
              transform: rotate(-19deg);
              color: #d46854;
              & img {
                position: relative;
                display: block;
                width: 100%;
                left: 40%;
              }
            }
          }
        }
      }
      .pointer {
        position: absolute;
        left: 135px;
        top: 135px;
        z-index: 10;
        height: 50px;
        width: 50px;
        padding: 6px;
        color: #fff899;
        line-height: 15px;
        font-size: 12px;
        text-align: center;
        background-color: #ff5350;
        border-radius: 50%;
        border: 1px solid #ff5350;
        // transform: rotate(19deg);
        // transition: transform 3s cubic-bezier(0.2, 0.93, 0.43, 1);//css转圈圈
        padding: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        &::after {
          content: "";
          position: absolute;
          // transform: rotate(19deg);
          left: 15px;
          top: -40px;
          border-width: 24px 10px;
          border-style: solid;
          border-color: transparent;
          border-bottom-color: #ff5350;
          transform-origin: center;
        }
      }
    }
    .result {
      position: relative;
      margin: 20px 60px;
    }
  }

  //当前轮盘的获奖者
  .speech {
    width: 80%;
    height: 100px;
    border: 1px solid blueviolet;
    padding: 5px;
    overflow-y: auto;
    margin: 20px 0;
    & > div:nth-child(1) {
      color: #999;
      font-size: 14px;
    }
    & > li {
      width: 100%;
      padding: 5px 0;
      & > span {
        color: blueviolet;
        font-weight: bold;
        display: inline-block;
        padding: 0 5px;
        font-size: 16px;
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
      padding: 0 5px;
    }
    & > div {
      color: #999;
      padding: 5px;
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
    background-color: #fbbb5f;
    box-shadow: 1px 1px 5px #ccc;
    border-radius: 5px;
    // border: 1px solid #ccc;
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
  .publish {
    position: absolute;
    width: 100%;
    height: 100vh;
    background-color: rgba($color: #000000, $alpha: 0.5);
    z-index: 100;
    .publish-content {
      position: absolute;
      width: 200px;
      background-color: #fff;
      // box-sizing: content-box;
      padding: 15px 0;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 1px solid red;
      text-align: center;
    }
    .jp {
      color: red;
      font-weight: bold;
      display: inline-block;
      padding: 0 5px;
    }
  }
}
</style>