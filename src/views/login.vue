<template>
  <div class="login-wrapper">
    <!-- <div  @click="ceshi" class="ceshihm"></div> -->
    <div class="logo"></div>
    <div class="login-form">
      <van-cell value="登录" :border="false" class="denglu" />
      <van-field
        v-model="mobile"
        label
        type="tel"
        placeholder="请输入您的手机号"
      />
      <van-field v-model="pwd" label type="password" placeholder="密码" />
      <van-field
        v-model="captcha_code"
        class="captcha-code"
        label="验证码"
        placeholder="验证码"
      >
        <template #extra>
          <img
            :src="captcha_code_img"
            alt
            v-if="!!captcha_code_img"
            class="captcha-code-img"
            @click="captcha_code_img_fn"
          />
        </template>
      </van-field>

      <p class="agreement">
        <input type="checkbox" v-model="abc" @click="abc = !abc" /><span
          @click="privacy"
          >我已阅读并同意《同心台服务协议及隐私协议》</span
        >
      </p>
      <!-- <p class="agreement" @click="privacy">请仔细阅读《隐私协议》</p> -->
      <!-- <div class="agreement" :class="pitch ? 'agreementColor' : ''" >
        <input type="checkbox" id="agreementId" :checked="pitch" @click="checkboxBtn"/>
        <span @click="privacy">《隐私协议》</span>
      </div> -->
      <div @click="signInFn" class="sign-in-btn">登录</div>
      <div class="wjmm" @click="wjmm">忘记密码</div>
    </div>
    <div class="login-register" @click="loginRegister">快速注册</div>
    <!-- <popup></popup> -->
    <p class="records" @click="referenceBtn">蜀ICP备20018437号-1</p>
  </div>
</template>
<script>
// import popup from "@/components/popup.vue";
// import axios from "@/tool/axios.js";
import qs from "qs";
import { apiHost, specfield } from "@/plugins/path";
import axios from "@/plugins/axios";
export default {
  data() {
    return {
      abc: "",
      pitch: false,
      mobile: "",
      pwd: "",
      captcha_code: "",
      captcha_code_img: "",
      // apiUrl: this.$store.state.apiDomain,
    };
  },
  components: {
    // popup,
  },
  computed: {
    disabled() {
      return !(this.mobile && this.pwd && this.captcha_code);
    },
  },
  mounted() {
    this.captcha_code_img_fn();
  },

  methods: {
    //备案号
    referenceBtn() {
      window.location.href = "https://beian.miit.gov.cn/#/home";
    },
    checkboxBtn() {
      this.pitch = !this.pitch;
    },
    privacy() {
      this.$router.push({
        name: "privacy",
      });
    },
    wjmm() {
      this.$router.push("wjmm");
    },
    // ceshi() {
    //   window.location.href = "//192.168.0.9:8080/#/userInfo";
    // },
    loginRegister() {
      this.$router.push("register");
    },
    captcha_code_img_fn() {
      axios.get(`${apiHost}/captchaSrc`).then((res) => {
        let { data } = res;
        if (data.status === 1) {
          this.captcha_code_img = data.info.src;
        } else {
          this.$toast(data.message);
        }
      });
    },
    signInFn() {
      let that = this;
      if (that.disabled) {
        return;
      }
      if (!that.abc) {
        this.$toast("请先阅读并同意相关协议");
        return;
      }
      const toast1 = that.$toast.loading({
        message: "登录中...",
        forbidClick: true,
        duration: 0,
      });
      axios
        .post(
          `${apiHost}/login`,
          qs.stringify({
            mobile: this.mobile,
            pwd: this.pwd,
            captcha_code: this.captcha_code,
          })
        )
        .then((res) => {
          toast1.clear();
          let { data } = res;
          if (data.status === 1) {
            if (!!that.$route.query && that.$route.query.redirect) {
              that.$router.replace(that.$route.query.redirect);
            } else {
              that.$router.replace("/");
            }
          } else {
            this.$toast(data.message);
          }
        })
        .catch(() => {
          toast1.clear();
        });
    },
  },
  watch: {
    disabled() {},
  },
};
</script>
<style lang="scss">
.login-wrapper {
  position: relative;
  background: #fbbb5f;
  min-height: 100vh;
  overflow: hidden;
  // .ceshihm {
  //   width: 0.1rem;
  //   height: 0.1rem;
  //   position: absolute;
  //   left: 40%;
  //   top: 0.1rem;
  // }
  .ceshi {
    font-size: 0.24rem;
    text-align: left;
  }
  .logo {
    width: 2rem;
    height: 2rem;
    margin: 0.7rem auto;
  }
  .login-form {
    background-color: #fff;
    margin: 0 0.24rem;
    padding: 0.2rem;
    border-radius: 5px;
    .wjmm {
      padding-top: 0.24rem;
      text-align: right;
      font-size: 0.24rem;
    }
    .van-cell__value--alone {
      font-size: 0.4rem;
    }
    .van-field__control {
      font-size: 0.28rem;
    }
    // font-size: .4rem;
    // .denglu{
    //     font-size: .2rem;
    // }
    .captcha-code {
      padding-right: 0;
      font-size: 0.28rem;
      .van-cell__title {
        text-align: left;
        width: 1.4rem;
      }
      .captcha-code-img {
        width: 1.5rem;
      }
      > div {
        align-self: center;
      }
    }
    .agreement {
      display: flex;
      align-items: center;
      margin-top: 0.2rem;
      padding-left: 16px;
      font-size: 0.26rem;
      text-align: left;
      // color: rgb(107, 110, 253);
      color: rgb(0, 4, 255);
      & > span {
        padding-left: 0.2rem;
        // text-decoration: underline;
      }
    }
    .agreementColor {
      color: rgb(0, 4, 255);
    }
    .sign-in-btn {
      color: #fff;
      background: #42cbfd;
      border-radius: 5px;
      /* padding: 0.1rem 0; */
      margin-top: 0.2rem;
      font-size: 0.3rem;
      height: 0.8rem;
      /* line-height: 1; */
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .login-register {
    border: 2px solid #7489ac;
    color: #7489ac;
    border-radius: 5px;
    margin: 0 0.24rem;
    /* padding: 0.1rem 0; */
    margin-top: 0.5rem;
    background: transparent;
    font-size: 0.3rem;
    height: 0.8rem;
    /* line-height: 1; */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .records {
    position: absolute;
    bottom: 0.1rem;
    width: 100%;
    text-align: center;
    font-size: 0.24rem;
  }
}
</style>