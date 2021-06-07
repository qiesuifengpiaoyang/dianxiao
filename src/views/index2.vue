<template>
  <div class="tx-dx-index2">
    <!-- <div class="class-sear-box">
            <div class="sear-box" @click="searchMaskCl">
                <van-icon name="search" />
                <span>搜索您需要的商品</span>
            </div>
        </div> -->
    <div class="empty-h12"></div>
    <van-swipe autoplay="3000" class="swiper-n2" :show-indicators="false">
      <van-swipe-item
        v-for="(item, index) in listswiper"
        :key="index"
        @click="jsToDetail(item.turntable_id, item.type, item.commodity_id)"
      >
        <a href="javascript:;">
          <img :src="item.img" :alt="item.text" />
        </a>
      </van-swipe-item>
    </van-swipe>
    <van-grid
      class="list-circle-n2"
      icon-size="80%"
      :border="false"
      column-num="4"
    >
      <van-grid-item
        v-for="(item, index) in listch"
        :key="index"
        :icon="item.url"
        :text="item.text"
        @click="jsToModular(item)"
      />
    </van-grid>
    <!-- 21-5-11修改，暂时关闭抽奖入口 -->
    <!-- <div class="turntable-box">
      <div>
        <p>天天有奖</p>
        <div @click="jsToModular(999)">
          <div class="djjr">点击进入</div>
          <div class="zhizhen">
            <img src="../imgs/sz.png" alt="" />
          </div>
          <img src="../imgs/s-dial_bg.png" alt="" />
          <img
            src="../imgs/s-dial_pointer.png"
            class="zqq"
            :style="
              '-webkit-transform:rotate(' +
              deg +
              'deg) translateZ(0);transform:rotate(' +
              deg +
              'deg) translateZ(0)'
            "
          />
        </div>
      </div>
      <div>
        <p>互助转吧</p>
        <div @click="jsToModular(998)">
          <div class="djjr">点击进入</div>
          <div class="zhizhen">
            <img src="../imgs/sz.png" alt="" />
          </div>
          <img
            src="../imgs/s-dial_bg.png"
            alt=""
            :style="
              '-webkit-transform:rotate(' +
              deg +
              'deg) translateZ(0);transform:rotate(' +
              deg +
              'deg) translateZ(0)'
            "
          />
          <img src="../imgs/s-dial_pointer.png" class="zqq" />
        </div>
      </div>
    </div> -->
    <!-- <div class="ceshi">
      <div class="ceshibox">
        <div class="imgbox">
          <img src="../imgs/logo.png" alt="">
        </div>
        <div class="textbox">
          翻
        </div>
      </div>
    </div> -->
    <!-- <search-mask 
            formNar="classification"
            :form="form"
            :show.sync="isShowSearch"
        /> -->
    <Footer active="首页" />
  </div>
</template>
<script>
import Footer from "@/components/footer.vue";
import SearchMask from "@/components/searchMask.vue";
import qs from "qs";
import { apiHost, specfield } from "@/plugins/path";
import axios from "@/plugins/axios";
export default {
  data() {
    return {
      lpdsq: null, //轮盘定时器
      deg: 0,
      turntable_id: null,
      current: 0,
      form: "",
      isShowSearch: false,
      listswiper: [
        // type 商品类型 1批发商品 2社区拼团 3欢乐购 41元购
      ],
      listch: [
        {
          modular_id: 1,
          url: "./static/img/pifashangpin.png",
          text: "批发部",
        },
        // {
        //   modular_id: 2, // 2
        //   url: "./static/img/shequpintuan.png",
        //   text: "开心拼吧",
        // },
        // {
        //   modular_id: 3,
        //   url: "./static/img/huanlegou.png",
        //   text: "欢乐购",
        // },
        // {
        //   modular_id: 4,
        //   url: "./static/img/yiyuangou.png",
        //   text: "一元购",
        // },
        // {
        //   modular_id: 6,
        //   url: "./static/img/huanlegou.png",
        //   text: "复消商品",
        // },
        {
          modular_id: 6,
          url: "./static/img/huanlegou.png",
          text: "代理专区",
        },
        // ,{
        // modular_id:999, // 5
        // url:'../dx/static/img/zhuanpan.png',
        // text:'转盘'
        // }
      ],
    };
  },
  components: {
    Footer,
    SearchMask,
  },
  created() {
    console.log(apiHost);
    console.log("确认修改3");
  },
  mounted() {
    this.firstAPI();
  },
  methods: {
    // searchMaskCl(){
    //     this.isShowSearch = !this.isShowSearch;
    //     sessionStorage.setItem("seurl",window.location.href)
    //     this.form = 'close';
    // },
    firstAPI() {
      let that = this;
      const toas1 = that.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });

      axios.post(`${apiHost}/shopping/advert`).then(
        (res) => {
          toas1.clear();
          let { data } = res;
          let { status, info, message } = data;
          if (status === 1) {
            that.listswiper = info;
            console.log(that.listswiper, "首页advert");
          } else {
            that.$toast(`${message}`);
          }
        },
        function (error) {
          toas1.clear();
          console.log(error, "服务器返回的错误信息");
        }
      );

      //启动定时器
      this.dsq();
    },
    dsq() {
      this.lpdsq = setInterval(() => {
        this.deg += 15;
        if (this.deg >= 360) {
          this.deg = 0;
        }
      }, 20);
    },
    jsToModular(item) {
      if (item === 999) {
        //天天幸运
        this.$router.push({
          name: "everyday",
        });
      } else if (item === 998) {
        //幸运转吧
        this.$router.push({
          name: "lucky",
        });
      } else {
        this.$router.push({
          path: `classification/${item.modular_id}`,
        });
      }
    },
    jsToDetail(turntable_id, type, commodity_id) {
      console.log(turntable_id, type, commodity_id);
      if (type == 1) {
        //跳转商品详情
        this.$router.push({
          name: "goods",
          params: { id: commodity_id, type: type },
        });
      } else {
        //跳转轮盘
        this.$router.push({
          name: "lucky",
          params: {
            turntable_id: turntable_id,
          },
        });
      }
      // if (this.listswiper.length === index + 1) {
      //   console.log("跳转转盘列表");
      //   this.$router.push({
      //     name: "turnlist",
      //   });
      // } else {
      // this.$router.push({
      //   name: "goods",
      //   params: { id: item.commodity_id, type: item.type },
      // });
      // }
    },
  },

  //页面销毁前停止定时器
  beforeDestroy() {
    clearInterval(this.lpdsq);
  },
};
</script>
<style lang="scss">
.tx-dx-index2 {
  overflow: hidden;
  padding-bottom: 1.5rem;
  background: #fff;
  min-height: 100vh;
  // .ceshi{
  //   font-size: 0.8rem;
  //   width: 100vw;
  //   padding: 10px;
  //   display: flex;
  //   justify-content: space-around;
  //   align-items: center;
  //   .ceshibox{
  //     width: 30vw;
  //     height: 35vw;
  //     border-radius: 0.2rem;
  //     display: flex;
  //     flex-direction: column;
  //     justify-content: space-around;
  //     align-items: center;
  //     background-color: rgb(0, 215, 243);
  //     .imgbox{
  //       width: 15vw;
  //       height: 15vw;
  //       & img{
  //         width: 100%;
  //         height: 100%;
  //       }
  //     }
  //     .textbox{
  //       width: 15vw;
  //       height: 15vw;
  //       display: flex;
  //       justify-content: space-around;
  //       align-items: center;
  //     }
  //   }
  // }
  .class-sear-box {
    padding: 12px;
    overflow: hidden;
    .sear-box {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      background-color: #ededed;
      height: 0.7rem;
      color: #9c9c9c;
      font-size: 14px;
      border-style: solid;
      .van-icon {
        font-size: 16px;
      }
    }
  }
  .swiper-n2 {
    border-radius: 10px;
    margin: 0 12px;
    // height: 345px;
    height: calc((100vw - 24px) / 16 * 9);
    // max-height: 56.25vw;
    // overflow: hidden;
    .van-swipe-item {
      img {
        width: 100%;
        height: 100%;
        // object-fit: fill;
      }
    }
  }
  .list-circle-n2 {
    position: relative;
    z-index: 10;
    .van-grid-item__content {
      background-color: transparent;
      // padding: 16px 0 0;
      span {
        color: rgb(0, 0, 0);
        font-family: "PingFangSC-Regular";
        font-size: 13px;
        line-height: 16px;
      }
    }
  }
  .turntable-box {
    position: relative;
    margin-top: 0.3rem;
    padding: 0.1rem;
    display: flex;
    align-items: center;

    .djjr {
      font-size: 0.25rem;
      font-weight: bold;
      position: absolute;
      top: 30%;
      left: 38%;
      z-index: 998;
    }
    & > div {
      position: relative;
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .zhizhen {
        position: absolute;
        width: 100px;
        height: 100px;
        top: 60%;
        animation: mymove 1s infinite;
        z-index: 999;
        // @keyframes mymove {
        //   0% {
        //     transform: scale(1); /*开始为原始大小*/
        //   }
        //   25% {
        //     transform: scale(1.1); /*放大1.1倍*/
        //   }
        //   50% {
        //     transform: scale(1);
        //   }
        //   75% {
        //     transform: scale(1.1);
        //   }
        // }

        @keyframes mymove {
          0% {
            transform: rotateX(0deg); /*开始为原始大小*/
          }
          25% {
            transform: rotateX(40deg); /*放大1.1倍*/
          }
          50% {
            transform: rotateX(0deg);
          }
          75% {
            transform: rotateX(40deg);
          }
        }
      }
      & > div {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        animation: donghua 1s infinite;
        @keyframes donghua {
          0% {
            transform: scale(1); /*开始为原始大小*/
          }
          25% {
            transform: scale(1.1); /*放大1.1倍*/
          }
          50% {
            transform: scale(1);
          }
          75% {
            transform: scale(1.1);
          }
        }
      }
      img {
        width: 90%;
      }
      p {
        font-weight: bold;
        font-size: 0.3rem;
        padding: 0.1rem;
        color: #333;
      }
      .zqq {
        position: absolute;
        // top: 74px;
        top: 37%;
        width: 25%;
      }
    }
  }
}
.css-in-hed {
  display: none;
  .lb {
    position: absolute;
    z-index: -2;
  }
}
.fstp-mark {
  position: relative;
  overflow: hidden;
  .banner-swiper-box {
    overflow: hidden;
    position: relative;
    width: 100%;
    margin: 0 0 -1.3rem;
  }
}
.css-in-list-circle0 {
  margin: 12px;
  display: flex;
  overflow: hidden;
  border-radius: 10px;
  > div {
    position: relative;
    overflow: hidden;
    img {
      width: 100%;
      display: block;
    }
    .line {
      height: 20px;
      top: 22px;
      width: 1px;
      background-color: rgb(246, 246, 246);
      position: absolute;
      right: 0;
    }
  }
}
.ft-svg {
  position: relative;
  left: -20%;
  bottom: -0.7rem;
  background: #fff;
  height: 1.2rem;
  width: 150%;
  border-top-left-radius: 100%;
  border-top-right-radius: 100%;
}
.ft-svg svg {
  display: block;
  position: absolute;
  bottom: -0.10667rem;
  left: 0;
  z-index: 4;
  width: 100%;
  height: 100%;
  fill: #fff;
}
</style>
