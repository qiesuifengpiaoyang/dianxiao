<template>
  <div class="box">
    <!-- <van-nav-bar
      title="互助转吧"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      class="fbpl"
    /> -->
    <van-nav-bar
      title="互助转吧"
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

    <!-- 免责申明 -->
    <div class="shouquan" v-if="explain">
      <div class="shouquan-content">
        <p>说明</p>
        <p class="shouquan-content-content">
          <span v-html="first.declare"></span>
        </p>
        <van-checkbox class="checkbox" v-model="checked">同意</van-checkbox>
        <div class="btn" @click="showbtncl">确认</div>
      </div>
    </div>

    <!-- 【公司转吧】/【个人转吧】 -->
    <div class="classify">
      <input
        type="button"
        :class="{ xz: num == index }"
        v-for="(item, index) in zb"
        :key="item"
        :value="item"
        @click="selects(index)"
      />
    </div>

    <!-- 下拉菜单 -->
    <van-dropdown-menu class="pullDown">
      <van-dropdown-item v-model="type" :options="option1" />
    </van-dropdown-menu>

    <!-- 余额 -->
    <div class="balance">
      <div>
        <p>
          电商余额：<span>{{ first.balance }}</span>
        </p>
        <p>
          积分余额：<span>{{ first.available_amount }}</span>
        </p>
      </div>
      <input type="button" value="中奖记录" @click="winnerRecord" />
    </div>

    <!-- 【拥有权】抽奖
          parseInt.draw_possess小于100，说明【拥有权】还未分配完
     -->
    <!-- <div v-if="parseInt(newestData.draw_possess) !== 100" class="ownership"> -->
    <div
      v-if="parseFloat(this.newestData.draw_possess).toFixed(2) !== '100.00'"
      class="ownership"
    >
      <!-- 使用【电商卷】/【互帮积分】进行抽奖 -->
      <div class="multiple" v-if="type">
        <p>使用：</p>
        <div @click="change(0)">
          <input
            type="radio"
            v-model="options"
            value="integral"
            id="integral"
          />
          <!-- <span>互帮积分</span> -->
          <span>积分余额</span>
          <span class="hint">{{ newestData.available_amount }}/次</span>
        </div>
        <div @click="change(1)">
          <input type="radio" v-model="options" value="roll" id="roll" />
          <!-- <span>卷余额</span -->
          <span>电商余额</span
          ><span class="hint">{{ newestData.balance }}/次</span>
        </div>
      </div>
      <p v-if="type">
        【{{ newestData.title }}】拥有权：<span>{{
          newestData.draw_possess
        }}</span>
      </p>
      <!-- 拥有权抽奖 -->
      <div class="sudokubox">
        <div class="grid" @click="ownershipLottery">
          <div class="qian equal" :class="{ qians: choice == true }">
            <div class="imgbox">
              <img src="../imgs/logo.png" alt="" />
            </div>
            <div class="textbox">翻</div>
          </div>
          <div class="hou equal" :class="{ hous: choice == true }">
            <!-- <div class="imgbox">
              <img src="../imgs/logo.png" alt="" />
            </div> -->
            <div class="againstbox">
              <span>{{ prizeTitle }}</span>
            </div>
          </div>
          <!-- <div class="qian equal" :class="{ qians: choice == true }">正面</div>
          <div class="hou equal" :class="{ hous: choice == true }">
            反面
            <span>{{ prizeTitle }}</span>
          </div> -->
        </div>
      </div>
    </div>

    <!-- 【商品】抽奖 -->
    <div v-else class="commodityBox">
      <!-- 转盘信息 -->
      <div class="message">
        <p v-if="latestInputRecord.open == 1">转盘未开启，敬请期待！</p>
        <div v-else-if="latestInputRecord.open == 2">
          <!-- 判断【投入资金】是否达到【奖池预设】 -->
          <div
            v-if="
              parseInt(latestInputRecord.draw_money) <
              parseInt(newestData.money)
            "
          >
            <p>
              您拥有该转盘拥有权：<span>{{
                latestInputRecord.possess[0].prop
              }}</span>
            </p>
            <p>
              最新投入资金：<span>{{ latestInputRecord.draw_money }}</span
              >/<span>{{ newestData.money }}</span>
            </p>
            <p>
              您的抽奖次数：<span>{{ latestInputRecord.num }}</span>
            </p>
          </div>

          <!-- 判断【抽奖倒计时】是否结束 -->
          <div v-else-if="djsgb">
            开盘倒计时：{{ time.hours }}时{{ time.minutes }}分{{
              time.seconds
            }}秒
          </div>

          <!-- 【开始抽奖】的信息 -->
          <div v-else>
            <p>
              您拥有该转盘拥有权：<span>{{
                latestInputRecord.possess[0].prop
              }}</span>
            </p>
            <p>
              您的抽奖次数：<span>{{ latestInputRecord.num }}</span>
            </p>
          </div>
        </div>
        <p v-else-if="latestInputRecord.open == 3">已经结束</p>
      </div>

      <!-- 商品转盘 -->
      <div class="commodityDialBox">
        <!-- 商品九宫格抽奖 -->
        <div class="commodity">
          <div
            class="commodityGrid"
            v-for="(item, index) in newestData.prize"
            :key="item + index"
            @click="lotteryDraw(index)"
          >
            <div
              class="commodityQian commodityEqual"
              :class="{ commodityQians: choices == index }"
            >
              <div class="imgbox">
                <img src="../imgs/logo.png" alt="" />
              </div>
              <div class="textbox">翻</div>
            </div>

            <div
              class="commodityHou commodityEqual"
              :class="{ commodityHous: choices == index }"
            >
              <div class="againstbox">
                <span>{{ prizeTitles }}</span>
              </div>
            </div>
            <!-- <div
              class="commodityQian commodityEqual"
              :class="{ commodityQians: choices == index }"
            >
              正面
            </div> -->
            <!-- <div
              class="commodityHou commodityEqual"
              :class="{ commodityHous: choices == index }"
            >
              反面
              <span>{{ prizeTitles }}</span>
            </div> -->
          </div>
        </div>
      </div>

      <!-- 投注 -->
      <div class="betBox" v-if="parseInt(newestData.draw_possess) == 100">
        <input
          type="button"
          value="我要追加"
          v-if="parseInt(latestInputRecord.num)"
          @click="tzorzj = !tzorzj"
        />
        <input
          type="button"
          value="我要投注"
          v-else
          @click="tzorzj = !tzorzj"
        />
      </div>
    </div>

    <!-- 我要投注/我要追加——弹出层 -->
    <div class="betPopUp" v-if="tzorzj">
      <div>
        <p v-if="parseInt(latestInputRecord.num)">我要投注</p>
        <p v-else>我要追加</p>
        <input type="text" v-model="canyu" pattern="请输入您要投入的金额" />
        <p>投入数量需为<span></span>的整数倍</p>
        <p>
          可获得抽奖次数：
          <span>{{ acquire }}</span
          >次！
        </p>
        <div class="roll-integral">
          <label>
            电商券
            <input
              type="radio"
              v-model="gender"
              value="1"
              name="roll-integral"
            />
          </label>
          <label>
            互帮积分
            <input
              type="radio"
              v-model="gender"
              value="2"
              name="roll-integral"
            />
          </label>
        </div>
        <div class="inpBox">
          <input type="button" value="取消" @click="tzorzj = !tzorzj" />
          <input type="button" value="确定" @click="zjqd" />
        </div>
      </div>
    </div>

    <!-- 【拥有权】中奖者信息 -->
    <ul class="winner" :class="{ anim: animate == true }" v-if="winner.length">
      <p>拥有权中奖人员信息</p>
      <li v-for="(item, index) in winner" :key="item.create_time + index">
        恭喜<span>{{ item.username }}</span
        >于<span>{{ item.create_time }}</span
        >抽中<span>{{ item.money }}的拥有权！</span>
      </li>
    </ul>

    <!-- 【商品】中奖者信息 -->
    <ul class="winner" :class="{ anim: animate == true }" v-if="drawArr.length">
      <p>商品中奖人员信息</p>
      <li v-for="(item, index) in drawArr" :key="item.username + index">
        恭喜<span>{{ item.username }}</span
        >于<span>{{ item.create_time }}抽中{{ item.money }}</span>
      </li>
    </ul>

    <!-- 中奖后，发表获奖感言 -->
    <div class="publish" v-show="zjtc">
      <div class="publish-content" @click="turnspeech">
        <p>
          恭喜您获得
          <span class="jp">{{ prizeTitles }}</span
          >奖品一份
        </p>
        <p>点击请前往发表获奖感言！</p>
      </div>
    </div>

    <!-- 说明文本 -->
    <div class="explain" v-if="newestData.introduce">
      <p>说明</p>
      <div v-html="newestData.introduce"></div>
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
      showpop: false, //右上角的菜单
      acquire: null, //【投入】弹出层展示的抽奖次数
      time: {}, //开始抽奖的倒计时
      tzorzj: false, //我要投注/我要追加
      canyu: null, //我要投注/我要追加——投入金额
      gender: "1",
      options: "integral",
      explain: true, //加载时候的说明弹出层
      checked: false,
      first: [], //首页数据
      zb: ["公司转吧", "个人转吧"],
      num: 0, //添加样式——【公司转吧】/【个人转吧】
      turntable_id:false,//是否是从【首页的轮播图】进入的——修改
      type: 0, //下拉菜单
      rollBalance: null, //卷余额
      integralBalance: null, //积分余额
      option1: [{ text: "请选择转盘类型", value: 0 }], //下拉菜单
      cou: 0, //防止重复点击
      choice: false, //选中——【拥有权】
      prizeTitle: null, //【拥有权】反面
      prizeTitles: null, //【九宫格抽奖】反面
      choices: null, //选中——【九宫格抽奖】
      djsgb: true, //倒计时状态
      zjtc: false, //中奖弹窗
      draw_id: null, //中奖记录编号
      grid: [1, 2, 3, 4, 5, 6, 7, 8, 9], //模拟数据——格子数量
      animate: false,
      drawArr: [], //【商品】中奖记录
      winner: [], //【拥有权】中奖者的信息
      // postWinnerTime: null, //定时器——中奖者的信息
      winnerTime: null, //定时器——中奖者信息的轮播
      postMessageTime: null, //定时器——访问最新信息
      newestData: [], //最新的数据
      latestInputRecord: [], //转盘最新投入记录
      toas0: null,
      toas1: null, //加载中...
      toas2: null,
      shicha: 0,
    };
  },
  components: {
    moreBtn,
  },

  created() {
    //修改
    //判断是否是从【首页的轮播图】进入的
    if(this.$route.params.turntable_id){
      this.type = parseInt(this.$route.params.turntable_id);
      this.turntable_id = true;
      console.log(this.type,'type');
      console.log(this.$route.params.turntable_id,'路由信息');
      console.log(this.turntable_id,'标识符');
    }
    this.toas0 = this.$toast.loading({
      duration: 0,
      message: "加载中...",
      forbidClick: true,
    });
    //首次进入的弹窗说明
    if (localStorage.getItem("lucky") === "true") {
      this.explain = false;
    }

    //免责申明
    this.exemption();

    //访问最新信息
    this.postMessage();

    //倒计时
    this.djs();

    //实时访问最新信息
    this.postMessageTime = setInterval(() => {
      this.djs();
      this.postMessage();
    }, 1000);

    // //获取中奖者信息
    // this.postWinner();

    // //实时获取中奖者信息
    // this.postWinnerTime = setInterval(() => {
    //   this.postWinner();
    // }, 1000);

    //中奖者信息的轮播
    this.winnerTime = setInterval(() => {
      this.winnerMarquee(); //——拥有权中奖记录
      this.drawArrMarquee(); //——商品中奖记录
    }, 300);
  },

  updated() {
    this.touru();
  },

  watch: {
    //下拉菜单
    type: {
      handler(val) {
        this.cou = 0;
        this.turntable_id = false;//如果手动更换了【转盘类型】，则取消【从轮播图点进来的】
        //0是默认的提示信息
        if (!val) {
          this.newestData = []; //重置
          return;
        }

        //访问最新信息
        this.postMessage();
      },
      deep: true,
    },
  },

  methods: {
    //免责申明
    exemption() {
      axios.post(`${apiHost}/turntable/class`).then((val) => {
        let { data } = val;
        let { status, message, info } = data;
        if (status != 1) {
          this.$toast(`${message}`);
          return;
        }

        //首页数据——免责申明和分类转盘列表
        this.first = info;

        //将接口返回的类型信息push进option1
        for (let i = 1; i <= info.class.length; i++) {
          let obj = Object.create(null);
          obj.text = info.class[i - 1].title; //房类/车类/家电类等等
          obj.value = i;
          obj.id = info.class[i - 1].id; //转盘开启状态
          this.option1.push(obj);
          this.toas0.clear(); //结束【加载中...】
        }
      });
    },
    djs() {
      let kscj = this.latestInputRecord.countdown_time; //开始倒计时时间
      if (this.newestData.countdown_type == 1) {
        this.shicha = this.newestData.countdown;
      } else if (this.newestData.countdown_type == 2) {
        this.shicha = this.newestData.countdown * 60;
      } else if (this.newestData.countdown_type == 3) {
        this.shicha = this.newestData.countdown * 60 * 60;
      } else if (this.newestData.countdown_type == 3) {
        this.shicha = this.newestData.countdown * 60 * 60 * 24;
      }
      let date = parseInt(new Date().getTime() / 1000); // 当前时间戳
      if (kscj + this.shicha - date >= 0) {
        this.djsgb = true;
        this.time = this.getFormatDuration(kscj + this.shicha - date);
      } else {
        // console.log(kscj + this.shicha - date);
        this.djsgb = false; //倒计时结束
      }
    },
    //说明条款上面的确认
    showbtncl() {
      if (this.checked) {
        this.explain = false;
        localStorage.setItem("lucky", true);
      }
    },

    //【公司转吧】于【个人转吧】切换
    //【个人转吧】未开放
    selects(val) {
      if (val === 1) {
        this.$toast("暂未开放");
        return;
      }
      this.num = val;
    },

    //访问最新信息
    postMessage() {
      if (!this.type) {
        // this.toas1.clear(); //结束【加载中...】
        return;
      }
      let data = {};
      //
      /**
       * 修改
       * 如果存在路由信息params.turntable_id
       * 则说明是从【轮播图】点进来的
       * *如果this.turntable_id【轮播图的标示】为假了
       * *说明用户进来之后手动更改了【转盘类型】
       */
      if (this.$route.params.turntable_id && this.turntable_id) {
        data = {
          turntable_id: this.$route.params.turntable_id,
        };
      } else {
        data = {
          class_id: this.option1[this.type].id,
        };
      }
      axios
        .post(
          `${apiHost}/turntable/list`,
          qs.stringify(data)
        )
        .then((val) => {
          let { data } = val;
          let { status, message, info } = data;
          if (status != 1) {
            this.$toast(`${message}`);
            //11-4——修改：【暂无转盘信息】的时候重置信息
            this.newestData = []; //重置
            this.type = 0; //重置
            return;
          }

          //最新信息
          this.newestData = info;

          // this.newestData.draw_possess = 100.0; //模拟数据
          if (parseFloat(this.newestData.draw_possess).toFixed(2) == "100.00") {
            //访问【转盘最新投入记录】
            this.postLatestInputRecord();
          }
        });
    },

    //访问【转盘最新投入记录】
    postLatestInputRecord() {
      axios
        .post(
          `${apiHost}/turntable/latestInputRecord`,
          qs.stringify({
            turntable_id: this.newestData.turntable_id,
          })
        )
        .then((val) => {
          let { data } = val;
          let { status, message, info } = data;
          if (status != 1) {
            this.$toast(`${message}`);
            return;
          }

          this.latestInputRecord = info;

          //中奖记录——【拥有权】
          if (!(JSON.stringify(this.winner) === JSON.stringify(info.possess))) {
            for (let i = this.winner.length; i < info.length; i++) {
              this.winner.push(info[i]);
            }
          }
          if (!(JSON.stringify(this.drawArr) === JSON.stringify(info.draw))) {
            for (let i = this.drawArr.length; i < info.length; i++) {
              this.drawArr.push(info[i]);
            }
          }
        });
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

    //选择付费方式
    change(item) {
      if (item) {
        this.options = "roll";
      } else {
        this.options = "integral";
      }
    },

    //【拥有权】抽奖
    ownershipLottery() {
      this.cou++;
      if (this.cou > 1) {
        this.$toast("请勿重复点击 \n^_^");
        return;
      }
      if (!this.option1[this.type].id) {
        this.$toast("请选择转盘类型");
        this.cou = 0; //重置
        return;
      }
      //修改
      //互帮积分或者卷余额--
      if(this.options === 'integral'){
        //互帮积分——积分余额
        this.first.balance-=this.newestData.available_amount
      }else{
        //电商余额——卷余额
        this.first.available_amount-=this.newestData.balance
      }
      // if(!this.option1[this.type].zhuangtai){
      //   this.$toast("当前转盘暂未开启");
      // this.cou = 0;//重置
      //   return;
      // }
      // if (!this.rollBalance || !this.integralBalance) {
      //   this.$toast("您的余额不足");
      //   this.cou = 0; //重置
      //   return;
      // }

      this.postOwnership(); //请求【拥有权】抽奖接口
    },

    //【拥有权】抽奖接口
    postOwnership() {
      //判断是使用的【电商卷】还是【互帮积分】
      let type;
      if (this.options === "integral") {
        //积分余额——互帮积分
        type = 2;
      } else {
        //电商余额——卷余额
        type = 1;
      }
      axios
        .post(
          `${apiHost}/turntable/possess`,
          qs.stringify({
            turntable_id: this.newestData.turntable_id,
            type: type,
          })
        )
        .then((val) => {
          let { data } = val;
          let { status, message, info } = data;

          //重置状态
          setTimeout(() => {
            this.choice = false; //重置翻牌

            //因为卡片翻转的css动画有个过渡时间，需要单独计算
            setTimeout(() => {
              this.cou = 0; //重置计数器
            }, 800);
          }, 3000);

          //错误信息
          if (status != 1) {
            this.$toast(`${message}`);
            return;
          }

          //中奖情况
          if (!info.lottery_results) {
            // this.$toast("未中奖")
            this.prizeTitle = "未中奖";
          } else {
            // this.$toast(`抽中拥有权${info.prop}`)
            this.prizeTitle = `恭喜您抽中拥有权${info.prop}`;
          }

          this.choice = true; //翻牌
        });
    },

    /*【拥有权】中奖的轮播*/
    winnerMarquee() {
      this.animate = true;
      //   setTimeout(() => {
      this.winner.push(this.winner[0]);
      this.winner.shift();
      this.animate = false; // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
      //   }, 1000);
    },

    /*【商品】中奖的轮播*/
    drawArrMarquee() {
      this.animates = true;
      //   setTimeout(() => {
      this.drawArr.push(this.drawArr[0]);
      this.drawArr.shift();
      this.animates = false; // 这个地方如果不把animates 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
      //   }, 1000);
    },

    //我要投注/我要追加——确定
    zjqd() {
      let toas1 = this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      let reg = /^\+?[1-9]\d*$/;
      if (!reg.test(this.canyu)) {
        this.$toast("请正确输入！");
        return false;
      }
      axios
        .post(
          `${apiHost}/turntable/investmentVoucher`,
          qs.stringify({
            turntable_id: this.newestData.turntable_id,
            money: this.canyu,
            type: parseInt(this.gender),
          })
        )
        .then((val) => {
          let { data } = val;
          let { status, message, info } = data;
          //错误信息
          if (status != 1) {
            this.$toast(`${message}`);
            return;
          }
          this.tzorzj = !this.tzorzj;
          this.exemption(); //重新获取首页数据
          toas1.clear(); //结束【加载中...】
        });
    },

    //在【投入】弹出层显示的抽奖次数
    touru() {
      if (this.gender == "1") {
        this.acquire = Math.floor(this.canyu / this.newestData.balance);
      } else {
        this.acquire = Math.floor(
          this.canyu / this.newestData.available_amount
        );
      }
    },

    //九宫格抽奖
    lotteryDraw(index) {
      this.toas2 = this.$toast.loading({
        duration: 0,
        message: "",
        forbidClick: true,
      });
      let kscj = this.latestInputRecord.countdown_time; //多少秒后开启抽奖
      let date = parseInt(new Date().getTime() / 1000); // 当前时间戳
      if (kscj == 0 || kscj + this.shicha - date >= 0) {
        this.$toast("转盘即将开始，请稍后");
        return;
      }
      this.cou++;
      if (this.cou > 1) {
        this.$toast("请勿重复点击 \n^_^");
        return;
      }
      if (!this.latestInputRecord.num) {
        this.$toast("您的抽奖次数不足！");
        this.cou = 0;
        return;
      }
      this.postZhuanPanChouJiang(index);
    },

    //转盘抽奖
    postZhuanPanChouJiang(index) {
      axios
        .post(
          `${apiHost}/turntable/lotteryDraw`,
          qs.stringify({
            turntable_id: this.newestData.turntable_id,
          })
        )
        .then((val) => {
          let { data } = val;
          let { status, message, info } = data;
          this.toas2.clear(); //结束【加载中...】
          if (status != 1) {
            this.$toast(`${message}`);
            this.cou = 0;
            return;
          }

          //重置状态
          setTimeout(() => {
            this.choices = null; //重置翻牌

            //因为卡片翻转的css动画有个过渡时间，需要单独计算
            setTimeout(() => {
              this.cou = 0; //重置计数器
            }, 800);
          }, 3000);

          this.choices = index; //翻牌

          this.draw_id = info.draw_id; //中奖记录编号

          if (info.lottery_results) {
            this.prizeTitles = info.prize_title; //奖品名称
            setTimeout(() => {
              this.zjtc = true; //中奖弹出层
            }, 1000);
          } else {
            this.prizeTitles = "未中奖"; //奖品名称
            this.zjtc = false;
          }
        });
    },

    //前往发表获奖感言
    turnspeech() {
      this.zjtc = !this.zjtc;
      this.$router.push({
        name: "turnspeech",
        params: { draw_id: this.draw_id },
      });
    },

    //中奖记录
    winnerRecord() {
      this.$router.push({
        name: `recocrd`,
      });
    },

    //返回
    onClickLeft() {
      this.$router.go(-1);
    },
    //右上角的更多菜单
    onClickRight() {
      this.showpop = !this.showpop;
    },
  },

  //页面销毁前
  beforeDestroy() {
    clearInterval(this.postMessageTime); //定时器————访问最新信息
    clearInterval(this.winnerTime); //定时器————中奖者信息的轮播
  },
};
</script>
<style lang="scss">
.box {
  position: relative;
  background: #fff;
  min-height: 100vh;
  font-size: 0.26rem;
  padding: 50px 5vw;

  //免责申明
  .shouquan {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba($color: #000000, $alpha: 0.5);
    z-index: 999;
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

  //【公司转吧】/【个人转吧】
  .classify {
    width: 100%;
    margin-top: 10px;
    & > input {
      width: 50%;
      padding: 0.2rem 0;
      border-radius: 5px;
    }
    & > .xz {
      background-color: red;
      color: #fff;
      font-weight: bold;
    }
  }

  //下拉菜单
  .pullDown {
    margin-top: 0.3rem;
  }

  //余额
  .balance {
    width: 100%;
    margin-top: 0.3rem;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > input {
      padding: 2px 5px;
      border: 1px solid #999;
      border-radius: 5px;
      box-shadow: 2px 2px 2px #cccccc;
    }
  }

  //选择
  .multiple {
    width: 80vw;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    & > div {
      display: flex;
      align-items: center;
      & > span {
        display: inline-block;
        padding: 0 3px;
      }
      & .hint {
        font-size: 0.2rem;
        color: #999;
      }
    }
  }

  //【拥有权】模块儿
  .ownership {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: space-around;
    //九宫格抽奖
    .sudokubox {
      width: 65vw;
      margin-top: 0.2rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      /*单个格子 */
      .grid {
        position: relative;
        text-align: center;
        width: 100%;
        padding-top: 156%;
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
            // height: 50%;
            height: 0;
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
            font-size: 1rem;
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
  }

  //我要投注/我要追加——按钮
  .betBox {
    margin-top: 0.3rem;
    & > input {
      border: 1px solid #999;
      border-radius: 0.1rem;
      padding: 0.1rem 0.2rem;
    }
  }

  //我要投注/我要追加——弹出层
  .betPopUp {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba($color: #000000, $alpha: 0.5);
    & > div {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      padding: 0.5rem 0;
      width: 70vw;
      border-radius: 0.1rem;
      box-shadow: 3px 3px 8px #999;
      display: flex;
      flex-direction: column;
      align-items: center;
      input {
        padding: 0.1rem 0.3rem;
        border-radius: 0.1rem;
        border: 1px solid #999;
        margin-top: 0.1rem;
      }
      & > div {
        width: 100%;
        margin-top: 0.1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
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
    & > p {
      color: #999;
      font-size: 0.2rem;
    }
    & span {
      // display: inline-block;
      // padding: 0 0.2rem;
      color: red;
    }
    .anim {
      transition: all 1s;
      margin-top: -30px;
    }
    li {
      list-style: none;
      margin-bottom: 10px;
      // line-height: 30px;
      // height: 30px;
    }
  }

  //【商品】模块儿
  .commodityBox {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .message span {
      color: red;
      display: inline-block;
      padding: 0 3px;
    }
    //商品转盘
    .commodityDialBox {
      width: 100%;
      margin-top: 0.5rem;
      //九宫格抽奖
      .commodity {
        width: 90vw;
        margin: 0 auto;
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        /*单个格子 */
        .commodityGrid {
          position: relative;
          text-align: center;
          width: 32%;
          margin-top: 2%;
          padding-top: 50%;
          border-radius: 0.1rem;
          transform-style: preserve-3d;
          overflow: hidden;
          .commodityEqual {
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
              // height: 50%;
              height: 0;
              padding-top: 50%;
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
          .commodityQian {
            z-index: 2;
            background-color: coral;
            transform: rotateY(0deg);
          }

          /*反面 */
          .commodityHou {
            z-index: 1;
            background-color: rgb(255, 0, 242);
            transform: rotateY(-180deg);
          }

          //控制前面
          .commodityQians {
            transform: rotateY(180deg);
            z-index: 1;
          }

          //控制后面
          .commodityHous {
            transform: rotateY(0deg);
            z-index: 2;
          }
        }
      }
    }
  }

  //中奖后信息弹窗——前往发表获奖感言
  .publish {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba($color: #000000, $alpha: 0.5);
    z-index: 100;
    .publish-content {
      position: absolute;
      width: 70vw;
      background-color: #fff;
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

  //说明条款
  .explain {
    width: 100%;
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