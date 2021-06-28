<!--收货地址-->
<template>
  <div class="evaluate-wrapper">
    <van-nav-bar
      title="余额记录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      class="fbpl"
    />
    <div style="height: 0.92rem"></div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="firstAPI"
    >
      <ul class="evaluate-list">
        <li v-for="(item, index) in list" :key="index">
          <div class="type">
            <template v-if="item.type === 1"> 订单返利 </template>
            <template v-if="item.type === 2"> 订单支付 </template>
            <template v-if="item.type === 3"> 转盘抽奖 </template>
            <template v-if="item.type === 4"> 订单退款 </template>
            <template v-if="item.type === 5"> 订单取消扣除返利 </template>
            <template v-if="item.type === 6"> 兑换原始积分 </template>
            <template v-if="item.type === 7"> 转吧拥有权获利 </template>
            <template v-if="item.type === 8"> 返点 </template>
            <template v-if="item.type === 9"> 领取奖品 </template>
          </div>
          <div
            :class="[
              'money',
              item.type === 1 || item.type === 4 || item.type === 5 ? 'on' : '',
            ]"
          >
            {{ filtersymbol(item.type) }} ¥{{ item.money }}
          </div>
          <div class="create_time">{{ item.create_time }}</div>
        </li>
      </ul>
      <van-empty description="暂无记录" v-if="emptyshow" />
    </van-list>
  </div>
</template>
<script>
import qs from "qs";
import axios from "@/plugins/axios";
import { debounce } from "lodash-es";
import { apiHost, specfield } from "@/plugins/path";
import { store } from "@/plugins/store.js";
import txAddPanel from "@/components/address/txAddPanel.vue";
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      list: [],
      emptyshow: false,
      loading: false,
      finished: false,
      page: 0,
      limit: 10,
      commodity_id: this.$route.params.commodity_id,
    };
  },
  created() {},
  mounted() {
    // this.firstAPI()
  },
  methods: {
    filtersymbol(s) {
        return s === 1 || s === 4 || s === 5 || s === 7 || s === 8 ? "+" : "-";
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    filtername(n) {
      return `${n ? n.substring(0, 1) : "用"}***`;
    },
    imgprecl(item, n) {
      ImagePreview({
        images: item.img,
        startPosition: n,
      });
    },
    filtertime(n) {
      return n.substring(0, 10);
    },
    firstAPI() {
      let that = this;
      that.page = that.page + 1;
      axios
        .post(
          `${apiHost}/balance/log`,
          qs.stringify({ page: that.page, limit: 20 })
        )
        .then((res) => {
          let { data } = res;
          let { info, status, message } = data;
          if (status === 1) {
            if (info.length < 20) {
              that.finished = true;
            }
            if (info.length === 0 && that.page === 1) {
              that.emptyshow = true;
            }
            if (info.length > 0) {
              that.list = that.list.concat(...info);
            }
          } else {
            that.$toast(`${message}`);
            that.finished = true;
          }
          that.loading = false;
        });
    },
  },
};
</script>
<style lang="scss">
.evaluate-wrapper {
  font-size: 16px;
  padding-bottom: 1.4rem;
  // min-height: 100vh;
  .evaluate-empty {
    text-align: center;
    font-size: 100px;
    color: #ccc;
    padding: 20px 0;
    p {
      font-size: 16px;
      color: #58595b;
    }
  }
  .evaluate-list {
    li {
      background: #fff;
      padding: 24px 12px;
      margin-bottom: 12px;
      position: relative;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      .money {
        &.on {
          color: #07c160;
        }
      }
      .create_time {
        position: absolute;
        right: 12px;
        bottom: 6px;
        font-size: 12px;
        color: #58595b;
      }
    }
  }
}
</style>