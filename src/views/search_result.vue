<template>
  <div class="tx-dx-sgood">
    <div class="sgood-sear-box">
      <van-icon name="arrow-left" @click.stop="arrowleft" />
      <div class="sgood-sear-right" @click.stop="closeTagPar">
        <van-icon name="search" />
        <van-tag
          color="#959595"
          style="margin-left: 0.2rem"
          text-color="#fff"
          closeable
          size="medium"
          v-if="keyword"
          @close="closeTag"
          >{{ keyword }}</van-tag
        >
        <div v-else style="font-size: 14px">搜索当前分类需要的商品</div>
        <van-field
          value="输入框已禁用"
          disabled
          style="padding: 0; width: 20px; opacity: 0"
        />
      </div>
      <van-icon
        class="good-sear-right-home"
        name="weapp-nav"
        size="20"
        @click="onClickRight"
      />
    </div>
    <div class="sgood-box">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="listcl"
      >
        <van-grid :column-num="2" class="sgood-list">
          <van-grid-item
            v-for="(item, index) in list"
            :key="item.id"
            @click="jsToDetail(item)"
          >
            <div class="list-img" :style="{ height }">
              <img :src="item.cover_img" alt="" v-lazy="item.cover_img" />
            </div>
            <div class="list-con">
              <div class="con-title">{{ item.title }}</div>
              <div class="con-price">
                <div class="price"><small>¥</small>{{ item.price }}</div>
                <!-- 添加购物车 -->
                <!-- <div class="ava"> -->
                <van-icon
                  name="cart"
                  @click.stop="spec_config_cl(index, 'gwc')"
                />
                <!-- </div> -->
              </div>
            </div>
          </van-grid-item>
        </van-grid>
      </van-list>
      <!-- <van-empty description="暂无商品" v-if="emptyshow"/> -->
    </div>
    <to-top />
    <van-action-sheet v-model="spec_config_show" class="spec_config_plu-1">
      <div class="hed">
        <!-- <img class="hed-img" :src="goods.cover_img" alt=""> -->
        <img class="hed-img" v-lazy="lists.cover_img" alt="" />
        <div class="hed-box">
          <div>
            <p class="item1" v-if="!!+spec_opt_money">
              <template v-if="lists.spec_type === 1">
                <small>¥</small>{{ spec_opt_money }}
              </template>
              <template v-else> <small>¥</small>{{ spec_opt_money }} </template>
            </p>
            <p class="item2">
              已选：
              <template v-if="lists.spec_type === 1">
                {{ spec_config_num
                }}<!-- 个 -->{{ unit }}
              </template>
              <template v-else>
                <span>{{ spec_opt_val }}</span>
                <span v-if="spec_config_num"
                  >，{{ spec_config_num }}{{ unit }}</span
                >
              </template>
            </p>
          </div>
          <van-icon name="close" class="hed-close" @click="spec_config_cl(1)" />
        </div>
      </div>
      <div v-if="lists.spec_type === 2">
        <div
          class="con-list-1"
          v-for="(item, index) in lists.spec"
          :key="index"
        >
          <div class="con-h-1">{{ item.title }}：</div>
          <ul class="con-c-1">
            <li
              v-for="(it, ind) in item.lists"
              :key="ind"
              :class="[ind === item.specid ? 'on' : '']"
              @click="
                spec_config_radio_cl(
                  item,
                  it,
                  ind,
                  index,
                  lists.spec.length,
                  item.title
                )
              "
            >
              {{ it }}
            </li>
          </ul>
        </div>
      </div>
      <div class="con-list-2">
        <div>数量：</div>
        <!-- <van-stepper v-model="spec_config_num" disable-input @change="spec_config_num_cl"/> -->
        <!-- 设置最大值 -->
        <van-stepper
          v-model="spec_config_num"
          disable-input
          :min="minimum_purchasing"
          max="200"
          @change="spec_config_num_cl"
        />
      </div>

      <div class="btn" @click="spec_config_btn">加入购物车</div>
    </van-action-sheet>
    <more-btn :showpop.sync="showpop" />
    <search-mask
      :show.sync="isShowSearch"
      :form="form"
      formNar="classification"
      ref="searchmasksync"
      @onSearch="onSearch"
    />
  </div>
</template>
<script>
import qs from "qs";
import { apiHost, specfield } from "@/plugins/path";
import axios from "@/plugins/axios";
import ToTop from "@/components/top.vue";
import searchMask from "@/components/searchMask.vue";
import moreBtn from "@/components/morebtn.vue";
export default {
  data() {
    return {
      list: [],
      isShowSearch: false,
      emptyshow: false,
      loading: false,
      finished: false,
      showpop: false,
      page: 0,
      height: 0,
      type: this.$route.params.type,
      id: this.$route.params.id,
      form: "",
      keyword: this.$route.params.keyword,
      //21-6-9添加购物车
      lists: {},
      spec_config_show: false,
      spec_opt_money: "", //选择的规格——别人写的
      spec_opt_val: "种类规格",
      spec_config_value_copy: "请选择种类规格",
      spec_config_num: 1,
      unit: "", //单位
      minimum_purchasing: 0, //最低购买数量
      list_id: 0, //产品列表的编号ID
    };
  },
  created() {
    this.height = window.screen.width / 2 - 50 * 0.1 + "px";
  },
  components: {
    searchMask,
    ToTop,
    moreBtn,
  },
  watch: {
    spec_config_show: {
      handler(n) {
        if (!n) {
          this.lists = {};
        }
      },
    },
  },
  methods: {
    //添加购物车
    spec_config_cl(n, f) {
      console.log(n, "n");
      console.log(f, "f");
      if (f === "gwc") {
        this.lists = this.list[n];
        this.list_id = this.list[n].id;
      }
      this.spec_config_show = !this.spec_config_show;
      if (n === 1) {
        return;
      }
      console.log(this.spec_config_show, "this.spec_config_show");
      if (this.spec_config_show) {
        this.shopanibool = false;
      } else {
        setTimeout(() => {
          this.shopanibool = true;
        }, 500);
      }
    },
    spec_config_num_cl(v) {
      if (v > 200) {
        this.$toast("最多200个");
        this.spec_config_num = 200;
      } else {
        this.spec_config_num = v;
      }
    },
    spec_config_btn() {
      console.log(this.lists.spec_type, "this.lists.spec_type");
      if (this.lists.spec_type === 1) {
        this.spec_config_cl();

        this.spec_config_value_copy = `${this.spec_config_num}个`;
      } else {
        if (["0", "0.00", 0, ""].includes(this.spec_opt_money)) {
          this.$toast("请选择规格");
          return;
        }
        this.spec_config_value_copy = `${this.spec_opt_val},${this.spec_config_num}个`;
        this.spec_config_cl();
      }
      //复消产品不进入购物车，直接购买
      console.log(this.type, "this.type");
      if (this.type == 6) {
        /**
         * 这是订单界面获取的方式
         * type: this.$route.params.type, //新增的【复消商品】——类型
         * num: this.$route.params.shopping_id, //新增的【复消商品】——数量
         * commodity_id: this.$route.params.ref_page, //新增的【复消商品】——商品ID
         * specification: this.$route.params.address_id, //新增的【复消商品】——规格
         */
        let data = {};
        if (!this.filter_spec_opt_shop()) {
          data = {
            type: this.type,
            shopping_id: this.spec_config_num + "",
            ref_page: this.list_id,
            address_id: JSON.stringify(this.filter_spec_opt_shop()),
            // address_id: this.filter_spec_opt_shop(),
          };
        } else {
          data = {
            type: this.type,
            shopping_id: this.spec_config_num + "",
            ref_page: this.list_id,
            // address_id: JSON.stringify(this.filter_spec_opt_shop()),
            address_id: this.filter_spec_opt_shop(),
          };
        }
        this.$router.push({
          name: "shopOrder",
          //不知道是不是动态路由不能太长，名字就随便占用了吧
          params: data,
        });
        return;
      } else {
        this.onShoplist();
      }
    },
    onShoplist() {
      console.log(this.list_id, "this.list_id");
      let that = this;
      const toas1 = that.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      axios
        .post(
          `${apiHost}/addShoppingCart`,
          qs.stringify({
            type: that.type,
            commodity_id: that.list_id,
            num: that.spec_config_num,
            spec: that.filter_spec_opt_shop(),
          })
        )
        .then((res) => {
          let { data } = res;
          let { status, message, info } = data;
          toas1.clear();
          that.$toast(`${message}`);
        });
    },
    filter_spec_opt_shop() {
      if (this.lists.spec_type === 2) {
        return this.spec_opt_shop.join(",");
      } else {
        return "";
      }
    },
    //----购物车相关结束
    onClickRight() {
      this.showpop = !this.showpop;
    },
    arrowleft() {
      this.$router.go(-1);
      // let obj = this.$route.params;
      // if (!!this.keyword) {
      //   this.page = 0;
      //   this.list = [];
      //   this.keyword = "";
      //   this.loading = true;
      //   this.listcl();
      //   this.$router.replace({
      //     name: "search_result",
      //     params: {
      //       type: obj.type,
      //       class_id: obj.class_id,
      //       opt_name: obj.opt_name,
      //     },
      //   });
      // } else {
      //   this.$router.replace({
      //     name: "classification",
      //     params: { type: obj.type },
      //   });
      // }
    },
    onSearch(o) {
      this.$router.replace({
        name: "search_result",
        params: {
          opt_name: o.opt_name,
          keyword: o.keyword,
          type: o.type,
          class_id: o.class_id,
        },
      });
      this.showSe();
      this.page = 0;
      this.list = [];
      this.keyword = o.keyword;
      this.loading = true;
      this.listcl();
    },
    showSe() {
      this.isShowSearch = !this.isShowSearch;
    },
    closeTagPar() {
      this.showSe();
      console.log(1);
      this.form = "click";
      this.$nextTick(() => {
        this.$refs.searchmasksync.parantDOMcl();
      });
    },
    closeTag() {
      this.showSe();
      console.log(2);
      this.form = "close";
    },
    jsToDetail(it) {
      this.$router.push({
        name: "goods",
        params: { id: it.id, type: this.type },
      });
    },
    listcl() {
      let obj;
      if (this.$route.params) {
        obj = this.$route.params;
      } else if (this.$router.params) {
        obj = this.$router.params;
      } else if (this.$router.query) {
        obj = this.$router.query;
      } else if (this.$route.query) {
        obj = this.$route.query;
      }
      let that = this;
      let toast1;
      that.page = that.page + 1;
      axios
        .post(
          `${apiHost}/commodity`,
          qs.stringify({
            type: that.type,
            class_id: that.class_id || obj.class_id,
            keyword: that.keyword || obj.keyword,
            page: that.page,
            limit: 10,
          })
        )
        .then((res) => {
          let { data } = res;
          let { info, message, status } = data;
          if (status === 1) {
            if (info.length < 10) {
              that.finished = true;
            }
            if (info.length === 0 && that.page === 1) {
              that.emptyshow = true;
            }
            if (info.length > 0) {
              that.list = that.list.concat(...info);
            }
            console.log(that.list[0].cover_img, "list");
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
.tx-dx-sgood {
  // min-height: 100vh;
  .sgood-sear-box {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    width: 100%;
    padding: 0.1rem;
    font-size: 26px;
    background: #fff;
    color: #9c9c9c;
    display: flex;
    align-items: center;
    .good-sear-right-home {
      margin-left: 12px;
    }
    // .van-icon-arrow-left{

    // }
    .sgood-sear-right {
      flex: 1;
      background: #ededed;
      border-radius: 5px;
      display: flex;
      align-items: center;
      padding: 5px 12px;
      margin-left: 0.2rem;
      line-height: 24px;
      font-size: 24px;
      .van-icon-search {
        font-size: 20px;
      }
    }
  }
  .sgood-box {
    padding-top: 0.9rem;
  }
  .spec_config_plu-1 {
    overflow: inherit;
    border-radius: 0;
    height: 60vh;
    font-size: 0.26rem;
    .van-action-sheet__content {
      height: 100%;
      padding: 1.8rem 0 2rem 0;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      .btn {
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 2;
        width: 100%;
        height: 1rem;
        background: #e02e24;
        color: #fff;
        text-align: center;
        line-height: 1rem;
        font-size: 16px;
        letter-spacing: 1px;
      }

      .con {
        flex: 1;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        max-height: 80vh;
        min-height: 40vh;
        padding-bottom: 1.2rem;
      }
      .con-list-2 {
        padding: 12px 12px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .con-list-1 {
        padding: 12px 12px 0;
        .con-h-1 {
          margin-bottom: 12px;
        }
        ul {
          li {
            width: auto;
            display: inline-block;
            background: #f5f5f5;
            margin: 0 10px 10px 0;
            color: #151516;
            font-size: 13px;
            line-height: 1.8;
            padding: 0 10px;
            border-radius: 2px;
            &.on {
              background: #e02e24;
              color: #fff;
            }
          }
        }
      }

      .hed {
        padding: 12px;
        border-bottom: 1px solid #f4f4f4;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10;
        width: 100%;
        background: #fff;
        height: 1.6rem;
        .hed-img {
          width: 1.6rem;
          height: 1.6rem;
          position: absolute;
          left: 12px;
          top: -0.2rem;
          border: 1px solid #f2f2f2;
          border-radius: 5px;
          z-index: 1;
          background: #fff;
        }
        .hed-box {
          padding-left: 1.8rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .hed-close {
            font-size: 20px;
          }
          .item1 {
            color: #e02e24;
            font-size: 16px;
            span {
              font-size: 12px;
            }
            small {
              font-size: 10px;
              margin-right: 2px;
            }
          }
          .item2 {
            font-size: 13px;
            color: #151516;
          }
        }
      }
    }
  }
  .sgood-list {
    font-size: 12px;
    color: #151516;
    .list-img {
      width: 100%;
      position: relative;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
        display: block;
        border: 0;
      }
    }
    .list-con {
      padding: 10px 5px;
      min-width: 0;
      .con-title {
        width: 100%;
        height: 14px;
        line-height: 1.2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 5px;
      }
      .price {
        font-size: 14px;
        color: #e02e24;
        font-weight: bold;
      }
      .con-price {
        display: flex;
        justify-content: space-between;
        .van-icon {
          font-size: 0.3rem;
          color: rgb(240, 50, 50);
        }
      }
    }
    .van-grid-item {
      margin-bottom: 0.2rem;
      min-width: 0;
      &:nth-child(2n + 1) {
        padding-right: 0.1rem;
      }
      &:nth-child(2n + 2) {
        padding-left: 0.1rem;
      }
      .van-grid-item__content {
        padding: 0;
        justify-content: inherit;
        align-items: inherit;
      }
    }
  }
}
</style>