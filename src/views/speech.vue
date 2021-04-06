
<template>
  <div class="tx-dx-speech">
    <van-nav-bar
      title="获奖感言"
      left-text="返回"
      left-arrow
      class="fbpl"
      @click-left="onClickLeft"
    />
    <div class="speech-box">
      <div class="whole">
        <video :src="videoOptions" controls="controls" width="100%">
          您的浏览器不支持 video 标签。
        </video>
      </div>
    </div>
    <div class="message">
        <p>中奖时间：<span v-if="draw.create_time">{{draw.create_time}}元</span></p>
        <p>中奖金额：<span v-if="draw.money">{{draw.money}}</span></p>
    </div>
    <div class="text">
      <p>
        <span>{{ draw.username }}</span
        >获奖感言
      </p>
      <div>{{ draw.content }}</div>
    </div>
  </div>
</template>
<script>
import qs from "qs";
import { apiHost, specfield } from "@/plugins/path";
import axios from "@/plugins/axios";
import ClipboardJS from "clipboard";
export default {
  data() {
    return {
      videoOptions: null, //视频
      message: null,
      fileList: [],
      videosrc: null,
      videosrcshow: false,
      filename: null, //路径
      username: null,
      id: null,
      draw: [],
    };
  },
  created() {
    var urls = window.location.href; //获取网址的hash值
    var url = decodeURI(urls); //地址传中文会乱码
    //如果网址存在“?”
    if (url.includes("?")) {
      //获取hash“?”后面的值
      var arrArg = url.split("?")[1];
      //获取“=”后面的值
      var _pageSize = arrArg.split("=")[1];
      //   console.log(_pageSize);
      if (url.includes("&")) {
        var _value = arrArg.split("&"); //拆分每组参数
        this.username = _value[0].split("=")[1];
        this.id = parseInt(_value[1].split("=")[1]);
      }
    } else {
      this.$toast("访问出错，请正确进行访问！");
      return;
    }
    console.log(this.username, this.id);
    axios
      .post(
        `${apiHost}/turntable/latestInputRecord`,
        qs.stringify({
          turntable_id: this.id,
        })
      )
      .then((val) => {
        let data = val.data.info.draw;
        // data = [
        //   {
        //     username: "丽娅1",
        //     video:
        //       "http://www.tongxintailm.com/upload/2020_09_08/5f56ea100ca986073.MP4",
        //     content: "啊手动阀为士大夫违法发生的",
        //     money: "10.00",
        //     create_time: "2020-09-09 17:41:04",
        //   },
        //   {
        //     username: "丽娅2",
        //     video:
        //       "http://www.tongxintailm.com/upload/2020_09_08/5f56ea100ca986073.MP4",
        //     content: "啊手动阀为士大夫违法发生的",
        //     money: "10.00",
        //     create_time: "2020-09-09 17:41:04",
        //   },
        //   {
        //     username: "丽娅3",
        //     video:
        //       "http://www.tongxintailm.com/upload/2020_09_08/5f56ea100ca986073.MP4",
        //     content: "啊手动阀为士大夫违法发生的",
        //     money: "10.00",
        //     create_time: "2020-09-09 17:41:04",
        //   },
        // ];

        console.log(data, "接口返回的信息");
        if (!data.length) {
          this.$toast("暂无中奖信息");
        } else {
          this.draw = data.find((t) => t.username == `${this.username}`);
          this.videoOptions = this.draw.video;
          console.log(this.draw, "获奖者信息");
          console.log(this.videoOptions, "视频信息");
        }
      });
  },
  mounted() {},
  methods: {
    //返回上一级
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" >
.tx-dx-speech {
  font-size: 16px;
  min-height: 100vh;
  background: #fff;
  padding-bottom: 50px;
  .speech-box {
    width: 100%;
    padding: 1rem 12px 12px;
    .whole {
      width: 100%;
      // background-color: blueviolet;
      padding: 20px 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
  //感言
  .text {
    width: 80%;
    padding: 12px;
    border: 1px solid rgb(245, 48, 48);
    margin: 0 auto;
    & > p {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
    & > div {
      margin-top: 15px;
      text-indent: 2em;
    }
  }
  .message{
      width: 80%;
      padding: 12px 0;
      margin: 0 auto;
      &>p{
          padding: 5px 0;
          &>span{
              font-weight: bold;
              color: red;
          }
      }
  }
}
</style>