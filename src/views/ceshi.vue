<template>
  <div class="camera_outer">
    <video
      id="videoCamera"
      :width="videoWidth"
      :height="videoHeight"
      autoplay
    ></video>
    <canvas
      style="display: none"
      id="canvasCamera"
      :width="videoWidth"
      :height="videoHeight"
    ></canvas>

    <div v-if="imgSrc" class="img_bg_camera">
      <img :src="imgSrc" alt="" class="tx_img" />
    </div>
    <button @click="getCompetence()">打开摄像头</button>
    <button @click="stopNavigator()">关闭摄像头</button>
    　　　　　<button @click="setImage()">拍照</button>
    <p>提示：{{ a }}</p>
    <!-- <p>摄像头列表:{{ videoArr }}</p> -->
    <select v-model="modelSel" style="width: 200px" @on-change="changeSel">
      <option v-for="(item, index) in videoArr" :value="item.id" :key="index">
        {{ item.label }}
      </option>
    </select>
  </div>
</template>
  <script>
export default {
  data() {
    return {
      videoWidth: 480,
      videoHeight: 320,
      imgSrc: "",
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
      a: null,
      modelSel: "",
      videoArr: [], //摄像头列表
      arr: [
        {
          label: "camera2 1, facing front",
          id: "53fe53cbf589e948f10b471f5571dd490bf42c7304e1d75e08ccce885b270330",
        },
        {
          label: "camera2 3, facing front",
          id: "4a995e34b9a44131236dc3e3842bd4f74e2f7558fa74fdacb19a6159e4ffac04",
        },
        {
          label: "camera2 5, facing front",
          id: "a64d4b9b1ad8b7e0060832e34be51694e7b6c80edd7b970cfb1d09265e109a86",
        },
        {
          label: "camera2 7, facing back",
          id: "7cae84298b539ea9dbcd0624dc1589d53396147e03991c16e9652be7224d633a",
        },
        {
          label: "camera2 6, facing back",
          id: "96335bcf72cc29cd2d89189332cb7815fb8b5a04126392fba324795784e37f1e",
        },
        {
          label: "camera2 4, facing back",
          id: "55d8c631556073363ddf5f2af871459972c99343f2db7efaccf74edabb6f2f46",
        },
        {
          label: "camera2 2, facing back",
          id: "d116047b49aaaef015d9b96a4a7eacffedf2cf98d77113bf74ba579378afc172",
        },
        {
          label: "camera2 0, facing back",
          id: "c59e4a082ae9793ac42ba7cde90d7d350f1b816b9723aa6cadab94b725fec677",
        },
      ],
    };
  },
  methods: {
    // 调用权限（打开摄像头功能）
    getCompetence() {
      var _this = this;
      this.thisCancas = document.getElementById("canvasCamera");
      this.thisContext = this.thisCancas.getContext("2d");
      this.thisVideo = document.getElementById("videoCamera");
      console.log(this.thisVideo);
      // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          // 首先获取现存的getUserMedia(如果存在)
          var getUserMedia =
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.getUserMedia;
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser")
            );
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }
      var constraints = {
        audio: false,
        video: {
          width: this.videoWidth,
          height: this.videoHeight,
          transform: "scaleX(-1)",
        },
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
          // 旧的浏览器可能没有srcObject
          if ("srcObject" in _this.thisVideo) {
            _this.thisVideo.srcObject = stream;
          } else {
            // 避免在新的浏览器中使用它，因为它正在被弃用。
            _this.thisVideo.src = window.URL.createObjectURL(stream);
          }
          _this.thisVideo.onloadedmetadata = function (e) {
            _this.thisVideo.play();
          };
          // _this.thisVideo.srcObject = stream;
        })
        .catch((err) => {
          console.log(err);
          this.a = err + "————报错";
        });

      /**得到所有的设备*/
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          console.log(devices);
          this.videoArr = [];
          devices.forEach((device) => {
            if (device.kind == "videoinput") {
              this.videoArr.push({
                label: device.label,
                id: device.deviceId,
              });
            }
          });
        })
        .catch(function (err) {
          // layer.msg(err.name + ": " + err.message);
          alert(`${err}`);
        });
    },
    //切换下拉
    changeSel(val) {
      const videoConstraints = {};
      if (val === "") {
        videoConstraints.facingMode = "environment";
      } else {
        videoConstraints.deviceId = { exact: val };
      }
      var constraints = {
        video: videoConstraints,
      };
      this.getUserMedia(constraints);
    },

    //  绘制图片（拍照功能）

    setImage() {
      var _this = this;
      // 点击，canvas画图
      _this.thisContext.drawImage(
        _this.thisVideo,
        0,
        0,
        _this.videoWidth,
        _this.videoHeight
      );
      // 获取图片base64链接
      var image = this.thisCancas.toDataURL("image/png");
      _this.imgSrc = image;
      this.$emit("refreshDataList", this.imgSrc);
    },
    // base64转文件

    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(",");
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    // 关闭摄像头

    stopNavigator() {
      this.thisVideo.srcObject.getTracks()[0].stop();
    },
  },
  mounted() {},
};
</script>
  <style lang="scss" >
// .camera_outer {
//   position: relative;
//   overflow: hidden;
//   // background: url("../../assets/img/user_0608_04.png") no-repeat center;
//   background-size: 100%;
//   video,
//   canvas,
//   .tx_img {
//     -moz-transform: scaleX(-1);
//     -webkit-transform: scaleX(-1);
//     -o-transform: scaleX(-1);
//     transform: scaleX(-1);
//   }
//   .btn_camera {
//     position: absolute;
//     bottom: 4px;
//     left: 0;
//     right: 0;
//     height: 50px;
//     background-color: rgba(0, 0, 0, 0.3);
//     line-height: 50px;
//     text-align: center;
//     color: #ffffff;
//   }
//   .bg_r_img {
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     top: 0;
//   }
//   .img_bg_camera {
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     top: 0;
//     img {
//       width: 100%;
//       height: 100%;
//     }
//     .img_btn_camera {
//       position: absolute;
//       bottom: 0;
//       left: 0;
//       right: 0;
//       height: 50px;
//       line-height: 50px;
//       text-align: center;
//       background-color: rgba(0, 0, 0, 0.3);
//       color: #ffffff;
//       .loding_img {
//         width: 50px;
//         height: 50px;
//       }
//     }
//   }
// }
</style>