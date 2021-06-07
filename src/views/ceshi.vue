<template>
  <div class="box">
    <video
      id="video"
      width="480"
      height="320"
      controls
      :srcObject="srcObject"
    ></video>
    <div>
      <button id="capture">拍照</button>
    </div>
    <canvas id="canvas" width="480" height="320"></canvas>
  </div>
</template>
<script>
export default {
  data() {
    return {
      srcObject: null,
    };
  },
  mounted() {
    if (
      navigator.mediaDevices.getUserMedia ||
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia
    ) {
      //调用用户媒体设备, 访问摄像头
      console.log("1");
      alert(`1`);
      this.getUserMedia({ video: { width: 480, height: 320 } });
    } else {
      console.log("else");
      alert(`else`);
      alert("不支持访问用户媒体");
    }
  },
  methods: {
    getUserMedia(constraints) {
        
      console.log("2");
      alert(`2`);
      console.log(constraints);
      if (navigator.mediaDevices.getUserMedia) {
        //最新的标准API
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then((success) => {
            console.log("3");
            alert(`3`);
            this.srcObject = success;
          })
          .catch((errors) => {
            console.log("4");
            alert(`4`);
            console.log(errors);
            alert(`${errors}`);
          });
      } else if (navigator.webkitGetUserMedia) {
        //webkit核心浏览器
        navigator.webkitGetUserMedia(constraints);
      } else if (navigator.mozGetUserMedia) {
        //firfox浏览器
        navigator.mozGetUserMedia(constraints);
      } else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUserMedia(constraints);
      }
    },
  },
};
</script>
<style lang='scss'>
.box {
}
</style>