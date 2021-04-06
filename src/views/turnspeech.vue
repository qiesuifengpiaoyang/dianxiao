
<template>
  <div class="tx-dx-speech">
    <van-nav-bar
      title="发表中将感言"
      left-text="返回"
      left-arrow
      class="fbpl"
      @click-left="onClickLeft"
    />
    <div class="speech-box">
      <div style="position: relative; height: 3rem">
        <van-uploader
          :preview-full-image="false"
          upload-text="上传视频"
          accept="video/*"
          upload-icon="video"
          v-model="fileList"
          :after-read="afterRead"
          :max-count="1"
          @oversize="onOversize"
        >
          <template #preview-cover>
            <div class="preview-cover van-ellipsis" @click.stop="previewcl">
              预览视频
            </div>
          </template>
        </van-uploader>
      </div>
      <van-field
        v-model="message"
        rows="5"
        autosize
        label
        type="textarea"
        placeholder="请输入文字感言"
        class="textarea"
      />
      <div class="btn" @click="btnspeechcl">确认上传</div>
    </div>
    <van-popup
      @close="closecl"
      :closeable="true"
      :close-on-click-overlay="false"
      v-model="videosrcshow"
      get-container="body"
      style="width: 65%; background: transparent"
    >
      <video
        controls
        id="video"
        :src="videosrc"
        width="100%"
        webkit-playsinline
        playsinline
        x5-playsinline
        x-webkit-airplay="allow"
        autoplay
      />
    </van-popup>
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
      message: null,
      fileList: [],
      videosrc: null,
      videosrcshow: false,
      filename: null, //路径
    };
  },
  mounted() {
    //         var canvas = document.getElementById("canvas");
    // var image = document.getElementById('video');
    // image.setAttribute("preload", 'auto')
    // image.addEventListener('loadeddata', ()=>{
    //     var ctx = canvas.getContext("2d");
    //         console.log(canvas.toDataURL("image/jpeg"))
    //         ctx.drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104);
    //         var img = new Image();
    //          img.width = 400;
    //             img.height = 300;
    //             img.src=canvas.toDataURL("image/jpeg")
    //             image.setAttribute("poster",canvas.toDataURL("image/jpeg"));
    //         img.onload = function(){
    //         var output = document.getElementById("output");
    //                                 output.appendChild(img);
    //         }
    // })
    //         var video = document.getElementById("video");
    //         video.setAttribute("preload", 'auto')
    //           console.log('221',video)
    //           this.$nextTick(()=>{
    //               video.onloadeddata = function(evt) {
    //                   console.log('44')
    //               }
    // video.addEventListener('loadeddata', ()=>{
    //     console.log('22')
    //                         var output = document.getElementById("output");
    //                         var canvas = document.createElement("canvas");
    //                         canvas.width = "100%";
    //                         canvas.height = "3rem";
    //                         canvas.getContext('2d').drawImage(video,33, 71, 104, 124, 21, 20, 87, 104);
    //                         var img = new Image();
    //                         img.src = canvas.toDataURL("image/png");
    //                         img.width = 400;
    //                         img.height = 300;
    //                         output.appendChild(img);
    //                         console.log(img)
    // })
    //           })
  },
  methods: {
    closecl() {
      document.getElementById("video").pause();
    },
    //预览视频
    previewcl() {
      this.videosrcshow = true;
      let vdom = document.getElementById("video");
      if (vdom) {
        vdom.play();
      }
    },
    //上传视频
    afterRead(file) {
      console.log(file, "上传视频");
      this.videosrc = file.content;
      this.uploadFile(file, 1, "card_img_front");
      //     var video = document.getElementById("video");
      //     console.log(video,2)

      // if (window.FileReader) {
      //         var fr = new FileReader();
      //         fr.onloadend = function (e) {
      //             var video = document.createElement("video");
      //             video.setAttribute("preload", 'auto')
      //             video.controls = "controls";
      //             video.src = "./static/oceans.mp4"//e.target.result;
      //             video.width = 300;
      //             video.height = 200;
      //             document.getElementById("videoBox").appendChild(video);
      //                 video.addEventListener('loadeddata', ()=>{
      //                 console.log(video,1)
      //                 setTimeout(()=>{
      //                 var output = document.getElementById("output");
      //                 var canvas = document.createElement("canvas");
      //                 canvas.width = "100%";
      //                 canvas.height = "3rem";
      //                 canvas.getContext('2d').drawImage(video, 0, 0, canvas.width,
      //                         canvas.height);

      //                 var img = document.createElement("img");
      //                 img.src = canvas.toDataURL("image/jpeg");
      //                 img.width = 400;
      //                 img.height = 300;
      //                 output.appendChild(img);
      //                 },2000)
      //             });
      //         };
      //         fr.readAsDataURL(file.file);

      //     }
      //     document.querySelector(".van-uploader__preview")
    },
    uploadFile: function (file, n, s) {
      let formdata = new FormData();
      formdata.append("file", file.file);
      const toast1 = this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      axios.post(`${apiHost}/uploadVideo`, formdata).then((res) => {
        toast1.clear();
        console.log(res, "这是上传视频后的返回接口");
        let { data } = res;
        console.log(data.info.filename);
        if (data.status === 1) {
          this.$toast(`${data.message}`);
          this.filename = data.info.filename;
        } else {
          this.$toast(`${data.message}`);
        }
      });
    },
    onOversize(file) {
      console.log(file);
      // Toast('文件大小不能超过 500kb');
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onChange(index) {
      this.current = index;
    },
    btnspeechcl() {
      let that = this;
      const toast1 = that.$toast.loading({
        duration: 0,
        forbidClick: true,
      });
      console.log(that.filename);
      axios
        .post(
          `${apiHost}/turntable/winningSpeech`,
          qs.stringify({
            video: that.filename,
            content: that.message,
            draw_id: that.$route.params.draw_id || 0,
          })
        )
        .then((res) => {
          console.log(res, "这是【确认上传】的返回接口");
          let { data } = res;
          let { info, status, message } = data;
          that.pageshow = true;
          toast1.clear();

          if (status === 1) {
            that.$dialog
              .alert({
                message: `${message}`,
              })
              .then(() => {
                // 上传成功后跳转中奖记录
                console.log("发表成功，这里进行跳转");
                // this.$router.replace({ name: "recocrd" });
                // this.$router.push({
                //   name: "duihuan",
                //   params: { draw_id: this.$route.params.draw_id},
                // });
                this.$router.push(`/duihuan/${this.$route.params.draw_id}/${0}`)
              });
          } else {
            that.$dialog
              .alert({
                message: `${message}`,
              })
              .then(() => {
                console.log("已发表过感言，这里进行跳转");
                this.$router.replace({ name: "recocrd" }); //这里是跳转【中奖记录】
              });
          }
        });
    },
  },
};
</script>
<style lang="scss" >
.tx-dx-speech {
  min-height: 100vh;
  .speech-box {
    padding: 1rem 12px 12px;
    background: #fff;
    .videoBox {
      position: absolute;
      left: 50%;
      top: 0;
      width: 80%;
      height: 3rem;
      transform: translate3d(-50%, 0, 0);
      video {
        height: 100%;
      }
    }
    .video-clear {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 0.5rem;
    }
    .van-uploader {
      display: block;
    }
    .van-uploader__preview {
      margin: 0;
    }
    .van-uploader__wrapper {
      display: block;
    }
    .van-uploader__preview-delete {
      z-index: 10;
    }
    // .van-uploader__upload,
    // .van-uploader__preview,
    .van-uploader {
      position: relative;
      width: 80%;
      margin: 10px auto;
      height: 3rem;
      .preview-cover {
        position: absolute;
        box-sizing: border-box;
        bottom: 0;
        width: 100%;
        padding: 4px;
        color: #fff;
        font-size: 12px;
        text-align: center;
        background: rgba(0, 0, 0, 0.3);
      }
    }
    .van-uploader__upload,
    .van-uploader__file {
      position: relative;
      width: 100%;
      margin: 0 auto;
      min-height: 3rem;
      text-align: center;
    }
    .textarea {
      padding: 10px 0;
      .van-field__label {
        width: 5em;
        margin: 0;
        padding-top: 10px;
      }
      .van-field__body {
        padding: 10px;
        border: 1px solid #f4f4f4;
      }
    }
    .btn {
      width: 100%;
      height: 0.8rem;
      background: #e02e24;
      color: #fff;
      text-align: center;
      line-height: 0.8rem;
      font-size: 16px;
      letter-spacing: 1px;
      border-radius: 2px;
    }
  }
  .cover_img {
    img {
      width: 100%;
      display: block;
    }
  }
  .speech-list-3 {
    font-size: 16px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    width: 100%;
    .van-nav-bar {
      height: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .van-icon-arrow-left {
        color: #151516;
      }
      .van-nav-bar__text {
        height: 0.8rem;
        line-height: 0.8rem;
        color: #151516;
      }
    }
    background: #fff;
  }
  .speech-list-2 {
    font-size: 14px;
    padding: 0.8rem 0 0;
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
    }
    .title {
      background: #fff;
      padding: 12px;
      text-align: justify;
    }
    .money {
      background: #fff;
      padding: 0 12px 12px;
      text-align: right;
      font-size: 12px;
      color: #e02e24;
      span {
        margin-left: 2px;
        font-size: 15px;
      }
    }
  }
  .speech-list-1 {
    background: #fff;
    font-size: 13px;
    color: #9c9c9c;
    margin-top: 12px;
    padding: 12px;
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
}
</style>