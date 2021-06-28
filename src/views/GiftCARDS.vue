<template>
  <div class="box">
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      :border="false"
      class="ordertab"
    />
    <!-- <ul class="navigation">
      <li
        v-for="(item, index) in navigationText"
        :key="item"
        :class="[index == navLi ? 'navLiC' : '']"
        @click="navBtn(index)"
      >
        {{ item }}
      </li>
    </ul> -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="firstAPI"
    >
      <ul class="evaluate-list">
        <li v-for="(item, index) in list" :key="index">
          <div>
            <p>{{ item.remark }}</p>
            <p>{{ item.create_time }}</p>
          </div>
          <div>{{ item.status ? "-" : "+" }}{{ item.card }}</div>
        </li>
      </ul>
      <van-empty description="暂无记录" v-if="emptyshow" />
    </van-list>
  </div>
</template>
<script>
import axios from "@/plugins/axios";
import qs from "qs";
import { apiHost, specfield } from "@/plugins/path";
export default {
  data() {
    return {
      //   navigationText: ["购物卡收支明细", "7天即将过期购物卡明细"],
      navLi: 0,
      list: [],
      emptyshow: false,
      loading: false,
      finished: false,
      page: 0,
      title: "",
      //   limit: 20,
    };
  },
  created() {
    console.log('更新于14点19分');
  },
  methods: {
    //导航
    // navBtn(index) {
    //   this.navLi = index;
    // },
    firstAPI() {
      // qs.stringify({
      //     page:that.page,
      //     page:that.page
      // })
      console.log(1);
      let that = this;
      that.page = that.page + 1;
      console.log(`${apiHost}/getExchangeCard`);
      axios
        .get(`${apiHost}/getExchangeCard`, {
          params: {
            page: that.page,
          },
        })
        .then((res) => {
          console.log(res.data.info.data);
          let { data } = res;
          let { info, status, message } = data;
          if (status === 1) {
            this.title = `消费积分(余额:${info.sum_card})`;
            if (info.data.length < 10) {
              that.finished = true;
            }
            if (info.data.length === 0 && that.page === 1) {
              that.emptyshow = true;
            }
            if (info.data.length > 0) {
              that.list = that.list.concat(...info.data);
            }
          } else {
            that.$toast(`${message}`);
            that.finished = true;
          }
          that.loading = false;
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang='scss'>
.box {
  min-height: 100vh;
  font-size: 0.26rem;
  padding-top: 0.9rem;
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
      color: #151516;
      // color: #fff;
    }
    .van-ellipsis {
      // color: #fff;
    }
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
  .navigation {
    display: flex;
    border-bottom: 1px solid #e4e4e4;
    & > li {
      width: 50%;
      text-align: center;
      padding-top: 0.1rem;
    }
    .navLiC {
      color: red;
      &::after {
        content: "";
        width: 30%;
        height: 5px;
        display: block;
        margin: 0 auto;
        border-bottom: 3px solid rgb(255, 0, 0);
      }
    }
  }
  .evaluate-list {
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
      }
    }
  }
}
</style>