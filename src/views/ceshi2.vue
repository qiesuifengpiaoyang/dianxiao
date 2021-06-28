<template>
  <div>
    <!--开启摄像头-->
    <Button type="primary" @click="callCamera" style="margin-right: 10px"
      >开启摄像头</Button
    >
    <Button @click="changePhoto" style="margin-right: 10px">切换摄像头</Button>
    <!--关闭摄像头-->
    <Button type="primary" @click="closeCamera">关闭摄像头</Button>
    <!--canvas截取流-->
    <canvas ref="canvas" width="640" height="480"></canvas>
    <!--图片展示-->
    <video ref="video" width="640" height="480" autoplay></video>
    <!--确认-->
    <Button type="primary" @click="photograph">拍照</Button>

    <Select v-model="modelSel" style="width: 200px" @on-change="changeSel">
      <Option v-for="(item, index) in videoArr" :value="item.id" :key="index">{{
        item.label
      }}</Option>
    </Select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      videoArr: [], //所有的摄像头
      modelSel: "", //
      myInterval: null,
    };
  },
  created() {
    this.changePhoto();
  },
  methods: {
    // 调用摄像头
    callCamera() {
      // H5调用电脑摄像头API
      navigator.mediaDevices
        .getUserMedia({
          //   video: true,
          audio: false,
          video: {
            width: this.videoWidth,
            height: this.videoHeight,
            transform: "scaleX(-1)",
          },
        })
        .then((success) => {
          // 摄像头开启成功
          this.$refs["video"].srcObject = success;
          // 实时拍照效果
          this.$refs["video"].play();
        })
        .catch((error) => {
          console.error("摄像头开启失败，请检查摄像头是否可用！");
        });
    },
    // 拍照
    photograph() {
      let ctx = this.$refs["canvas"].getContext("2d");
      // 把当前视频帧内容渲染到canvas上
      ctx.drawImage(this.$refs["video"], 0, 0, 640, 480);
      // 转base64格式、图片格式转换、图片质量压缩---支持两种格式image/jpeg+image/png
      let imgBase64 = this.$refs["canvas"].toDataURL("image/jpeg", 0.7);

      /**------------到这里为止，就拿到了base64位置的地址，后面是下载功能----------*/

      // 由字节转换为KB 判断大小
      let str = imgBase64.replace("data:image/jpeg;base64,", "");
      let strLength = str.length;
      let fileLength = parseInt(strLength - (strLength / 8) * 2); // 图片尺寸  用于判断
      let size = (fileLength / 1024).toFixed(2);
      console.log(size); // 上传拍照信息  调用接口上传图片 .........
      // 保存到本地
      let ADOM = document.createElement("a");
      ADOM.href = this.headImgSrc;
      ADOM.download = new Date().getTime() + ".jpeg";
      ADOM.click();
    },
    // 关闭摄像头
    closeCamera() {
      if (!this.$refs["video"].srcObject) return;
      let stream = this.$refs["video"].srcObject;
      let tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      this.$refs["video"].srcObject = null;
    },

    //切换本地摄像头
    changePhoto() {
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
          layer.msg(err.name + ": " + err.message);
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

    /**打开摄像头*/
    getUserMedia(constraints, success, error) {
      if (navigator.mediaDevices.getUserMedia) {
        //最新的标准API
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then((success) => {
            // 摄像头开启成功
            this.$refs["video"].srcObject = success;
            // 实时拍照效果
            this.$refs["video"].play();
          })
          .catch(error);
      } else if (navigator.webkitGetUserMedia) {
        //webkit核心浏览器
        navigator.webkitGetUserMedia(constraints, success, error);
      } else if (navigator.mozGetUserMedia) {
        //firfox浏览器
        navigator.mozGetUserMedia(constraints, success, error);
      } else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUserMedia(constraints, success, error);
      }
    },
  },
};
</script>