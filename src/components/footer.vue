<!--
$emit:onFvtabCl
$on:onFvtabCl
-->

<template>
  <van-tabbar
    route
    :value="active"
    :fixed="false"
    active-color="#fbbb5f"
    inactive-color="#cecfd8"
    class="van-tabbar-box"
  >
    <van-tabbar-item icon="home-o" name="首页" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="apps-o" name="分类" to="/classification/6"
      >分类</van-tabbar-item
    >
    <van-tabbar-item icon="shopping-cart-o" name="购物车" to="/shopcat"
      >购物车</van-tabbar-item
    >
    <van-tabbar-item icon="contact" name="我的" @click="toMeBtn"
      >我的</van-tabbar-item
    >
    <!-- <van-tabbar-item icon="contact" name="个人中心" to="/personal">个人中心</van-tabbar-item> -->
    <!-- <van-tabbar-item icon="home-o" @click="fh">同心台</van-tabbar-item> -->
  </van-tabbar>
</template>
<script>
export default {
  data() {
    return {
      // active:0
    };
  },

  props: {
    active: {},
  },
  methods: {
    // fh() {
    //   console.log("返回同心台");
    //   window.location.href = "/#/";
    // },
    toMeBtn() {
      window.location.href = "/#/me";
    },
    // fvtabCl(active){
    //     this.$emit('onFvtabCl', active)
    // }
  },
};
</script>
<style lang="scss" >
.van-tabbar-box {
  z-index: 10 !important;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
  .van-tabbar-item {
    font-size: 0.24rem;
  }
  .van-tabbar-item__icon {
    font-size: 0.34rem;
  }
  .van-tabbar-item__text {
    // font-size: .12rem;
  }
  .itemon {
    .van-tabbar-item__icon {
      animation: myfirst 0.1s;
      color: #fbbb5f;
    }
    .van-tabbar-item__text {
      color: #fbbb5f;
    }
  }
}
</style>