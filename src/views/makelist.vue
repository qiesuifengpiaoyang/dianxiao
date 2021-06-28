<template>
  <div class="makegroup-wrapper">
    <div class="ordertab">
      <van-nav-bar
        title="我的拼单"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <ul class="shopcat-box">
      <li v-for="(item, index) in list" :key="index" @click="makegroupcl(item)">
        <div
          class="img"
          :style="{ backgroundImage: `url(${item.cover_img})` }"
        ></div>
        <div class="con">
          <div class="tit">{{ item.title }}</div>
          <div class="cfig">
            {{ item.group_price }} <del>{{ item.price }}</del>
          </div>
        </div>
        <div class="open-level">
          <div class="open">
            <template>
              <span v-if="item.open === 1">已开团</span>
              <span v-else-if="item.open === 2">未开团</span>
              <span v-else-if="item.open === 3">已解散</span>
            </template>
          </div>
          <div class="level">
            <template>
              <span v-if="item.level === 1">团长</span>
              <span v-else-if="item.level === 2">副团长</span>
              <span v-else-if="item.level === 3">成员</span>
            </template>
          </div>
        </div>
        <div class="create_time">创建时间：{{ item.create_time }}</div>
      </li>
    </ul>
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
    };
  },
  mounted() {
    this.listcl();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
      // this.$router.replace({
      //     name:"personal"
      // })
    },
    makegroupcl(o) {
      if (o.open === 2) {
        this.$router.push({
          name: "makegroup",
          params: { team_id: o.team_id },
        });
      }
    },
    listcl() {
      let that = this;
      const toas1 = that.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      axios.post(`${apiHost}/team`).then((res) => {
        let { data } = res;
        let { status, message, info } = data;
        toas1.clear();
        if (status === 1) {
          that.list = [].concat(...info);
        } else {
          that.$toast(`${message}`);
        }
      });
    },
  },
};
</script>
<style lang="scss">
.makegroup-wrapper {
  .ordertab {
    .van-nav-bar {
      // background-color: transparent;
      // .van-nav-bar__left {
        // & > .van-icon {
        //   color: #fff;
        // }
        // & > .van-nav-bar__text {
        //   color: #fff;
        // }
      // }
      // .van-ellipsis {
      //   color: #fff;
      // }
    }
    .van-nav-bar__text {
      line-height: 1;
    }
  }
  .shopcat-box {
    min-height: 100vh;
    margin-top: 12px;
    li {
      padding: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #9c9c9c;
      margin-bottom: 12px;
      background: #fff;
      position: relative;
      .open-level {
        font-size: 13px;
        text-align: center;
      }
      .create_time {
        font-size: 10px;
        position: absolute;
        right: 12px;
        bottom: 10px;
      }
      .tit {
        font-size: 13px;
        color: #151516;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 5px;
      }
      .con {
        align-self: baseline;
        flex: 1;
        padding: 0 10px;
        min-width: 0;
      }
      .img {
        width: 1.4rem;
        height: 1.4rem;
        background-position: center;
        background-size: cover;
      }
      .num {
        font-size: 12px;
      }
      .cfig {
        font-size: 13px;
        del {
          font-size: 10px;
        }
      }
    }
  }
}
</style>