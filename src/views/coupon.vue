
<template>
  <div class="tx-dx-coupon">
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      :border="false"
      class="ordertab"
    />
    <div v-if="pageshow">
      <!-- <ul class="couponlist-box" v-if="list.length > 0">
        <li v-for="item in list" :key="item.id">
          <div>
            <p class="money">{{ item.money }}<small>元</small></p>
            <p class="expire">{{item.status === 1 ? '已使用' : '未使用'}}</p>
          </div>

          <div class="grant">发放时间：{{ item.create_time }}</div>
        </li>
      </ul> -->
      <ul class="evaluate-list" v-if="list.length > 0">
        <li v-for="item in list" :key="item.id">
          <div>
            <p>{{ item.remark }}</p>
            <p>{{ item.create_time }}</p>
          </div>
          <div>
            <p>{{ item.status === 1 ? "-" : "+" }}{{ item.money }}</p>
            <!-- <p>{{item.status === 1 ? '已使用' : '未使用'}}</p> -->
          </div>
        </li>
      </ul>
      <van-empty description="无代金劵" v-else />
    </div>
  </div>
</template>
<script>
import qs from "qs";
import { apiHost, specfield } from "@/plugins/path";
import axios from "@/plugins/axios";
export default {
  data() {
    return {
      list: [],
      pageshow: false,
      title: "",
    };
  },
  mounted() {
    this.firstAPI();
    console.log("更新于14点19分");
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    firstAPI() {
      let that = this;
      const toast1 = that.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      axios.post(`${apiHost}/coupon`).then((res) => {
        toast1.clear();
        let { data } = res;
        let { info, status, message } = data;
        this.pageshow = true;
        if (status === 1) {
          that.title = `优惠券(余额:${info.sum_coupon})`;
          that.list = [].concat(info.data);
          console.log(this.list, "list");
        } else {
          that.$toast(`${message}`);
        }
      });
    },
  },
};
</script>
<style lang="scss" >
.tx-dx-coupon {
  min-height: 100vh;
  // .couponlist-box {
  //   padding-top: 0.8rem;
  //   font-size: 14px;
  //   li {
  //     display: flex;
  //     align-items: center;
  //     justify-content: space-between;
  //     background: #fff;
  //     margin-bottom: 12px;
  //     padding: 16px 12px;
  //     color: #9c9c9c;
  //     .expire {
  //       color: #e02e24;
  //       font-size: 12px;
  //       line-height: 1.4;
  //     }
  //     .grant {
  //     }
  //     .money {
  //       font-size: 26px;
  //       color: #e02e24;
  //     }
  //     small {
  //       font-size: 10px;
  //       margin-left: 5px;
  //     }
  //   }
  // }
  .evaluate-list {
    font-size: 0.26rem;
    padding-top: 0.8rem;
    & > li {
      border-bottom: 1px solid #e4e4e4;
      padding: 0.2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > div:first-child {
        width: 80%;
        & > p:last-child {
          color: #888;
          margin-top: 0.1rem;
        }
      }
      & > :last-child {
        color: red;
        & > p:first-child {
          font-size: 0.5rem;
        }
        & > p:last-child {
          font-size: 0.23rem;
        }
      }
    }
  }
  .ordertab {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    font-size: 16px;
    // background: #fff;
    border-bottom: 1px solid #ccc;
    height: 0.8rem;
    z-index: 10;
    > div {
      display: flex;
      align-items: center;
      justify-content: space-around;
      height: 0.8rem;
    }
    .van-nav-bar__text,
    .van-icon-arrow-left,
    .van-icon-weapp-nav {
      color: #000000;
      // color: #fff;
    }
    // .van-nav-bar__title {
    //   color: #fff;
    // }
    span {
      position: relative;
      height: 0.8rem;
      line-height: 0.8rem;
      &.on {
        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background: #e02e24;
        }
      }
    }
  }
}
</style>