<template>
  <div class="tx-dx-goods">
    <!-- <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
        class="fbpl"
        >
            <template #right>
                <van-icon name="weapp-nav" size="18" />
            </template>
        </van-nav-bar>
        <div style="height:.9rem"></div> -->
    <div class="top-stick-box">
      <svg
        @click.stop="onClickLeftIcon"
        class="icon-left-full-fill"
        style="vertical-align: middle; fill: currentColor; overflow: hidden"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1745"
      >
        <path
          d="M512 149.333333c200.298667 0 362.666667 162.368 362.666667 362.666667s-162.368 362.666667-362.666667 362.666667S149.333333 712.298667 149.333333 512 311.701333 149.333333 512 149.333333z m42.666667 168.085334L360.085333 512 554.666667 706.581333 599.914667 661.333333l-149.333334-149.333333 149.333334-149.333333L554.666667 317.418667z"
          p-id="1746"
        ></path>
      </svg>
      <van-icon name="more" @click="onClickRight" />
    </div>
    <div>
      <van-swipe class="swiper-n2" :show-indicators="false" @change="onChange">
        <van-swipe-item
          v-for="(item, index) in goods.carousel_img"
          :key="index"
        >
          <a href="javascript:;">
            <img :src="item" :alt="goods.title" />
            <!-- <img v-lazy="item" :alt="goods.title" /> -->
          </a>
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">{{ current + 1 }}/{{ currentlen }}</div>
        </template>
      </van-swipe>
      <div class="goods-tit">
        <div class="tit-price">
          <span class="item1">
            <i>¥</i>
            <!-- +type === 2 ? goods.group_price : goods.price || "0.00" -->
            <span class="item1_1">{{ goods.price }}</span>
            <span class="item1_2">
              <!-- <del>¥{{goods.market_price || '0.00'}}</del> -->
              <del>¥{{ goods.market_price || "0.00" }}</del>
            </span>
          </span>
          <span class="item2" v-if="goods.ticket">返券{{ goods.ticket }}</span>
        </div>
        <div class="tit-text">
          {{ goods.title }}
          <span class="freight">{{
            goods.freight == 0 ? "包邮" : "邮费：￥" + goods.freight
          }}</span>
        </div>
        <div class="tit-plu-10">
          <van-tag
            v-for="(il, index) in goods.label"
            :key="index"
            type="success"
            >{{ il }}</van-tag
          >
        </div>
        <div class="tit-plu-1" v-if="!!filgose(goods.service)">
          <span>{{ filgose(goods.service) }}</span>
        </div>
      </div>
      <van-cell
        v-if="+type !== 2"
        title="已选"
        :value="spec_config_value_copy"
        is-link
        class="goods-config"
        @click="spec_config_cl"
      />
      <div class="goods-evaluate" v-if="this.evaluateArr.length > 0">
        <van-cell
          title="商品评价"
          class="evaluate-lan"
          value="查看全部"
          is-link
          @click="evaluate_cl"
        />
        <ul>
          <li v-for="(item, index) in evaluateArr" :key="index">
            <div class="hed">
              <!-- <img :src="item.head_img" alt=""> -->
              <img v-lazy="item.head_img" alt="" />
              <span>{{ item.username }}</span>
            </div>
            <div class="con">{{ item.comment }}</div>
          </li>
        </ul>
      </div>
      <div class="goods-detail">
        <div class="hed">商品详情</div>
        <div v-html="goods.detail"></div>
      </div>
    </div>

    <van-action-sheet v-model="spec_config_show" class="spec_config_plu-1">
      <div class="hed">
        <!-- <img class="hed-img" :src="goods.cover_img" alt=""> -->
        <img class="hed-img" v-lazy="goods.cover_img" alt="" />
        <div class="hed-box">
          <div>
            <p class="item1" v-if="!!+spec_opt_money">
              <template v-if="goods.spec_type === 1">
                <small>¥</small>{{ spec_opt_money }}
              </template>
              <template v-else> <small>¥</small>{{ spec_opt_money }} </template>
            </p>
            <p class="item2">
              已选：
              <template v-if="goods.spec_type === 1">
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
      <div v-if="goods.spec_type === 2">
        <div
          class="con-list-1"
          v-for="(item, index) in goods.spec"
          :key="index"
        >
          <div class="con-h-1">{{ item.title }}：</div>
          <ul class="con-c-1">
            <li
              v-for="(it, ind) in item.list"
              :key="ind"
              :class="[ind === item.specid ? 'on' : '']"
              @click="
                spec_config_radio_cl(
                  item,
                  it,
                  ind,
                  index,
                  goods.spec.length,
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
    <van-goods-action class="shop-btn-box">
      <van-goods-action-icon icon="share" text="分享" @click="onShare" />
      <van-goods-action-icon
        class="shopche1"
        icon="cart-o"
        text="购物车"
        :badge="shop_num"
        @click="spec_shop_num_cl"
      >
        <span :class="['shopche-ani', shopanibool ? 'on' : '']"
          >+{{ spec_config_num }}</span
        >
        <span>购物车</span>
      </van-goods-action-icon>

      <van-goods-action-button
        class="shop-btn-dan"
        v-if="+type === 2"
        type="danger"
        text="发起拼团"
        @click="onTuanlist"
      />
      <van-goods-action-button
        class="shop-btn-warn"
        v-else
        type="warning"
        text="加入购物车"
        @click="spec_config_cl"
      />
    </van-goods-action>
    <more-btn :showpop.sync="showpop" />
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelectShare"
    />

    <van-popup v-model="showcanvasrq" get-container="body">
      <canvas id="canvasrq"></canvas>
    </van-popup>
  </div>
</template>
<script>
import qs from "qs";
import { apiHost, specfield } from "@/plugins/path";
import axios from "@/plugins/axios";
import moreBtn from "@/components/morebtn.vue";
import ClipboardJS from "clipboard";
import qrcode from "qrcode";
export default {
  data() {
    return {
      showcanvasrq: false,
      showShare: false,
      offsettop: "0",
      showpop: false,
      shopanibool: false,
      sheetShow: false,
      current: 0,
      currentlen: 0,
      errtext: "",
      spec_config_show: false,
      minimum_purchasing: 0, //最低购买数量
      unit: "", //单位
      spec_config_value: "种类规格",
      spec_config_value_copy: "请选择种类规格",
      spec_config_obj: {},
      spec_config_price: 0,
      spec_config_stock: 0,
      spec_config_num: 1,
      commodity_id: this.$route.params.id,
      type: this.$route.params.type,
      liindex: 0,
      liind: 0,
      liarr: [],
      shop_num: "",
      shop_num_ar: [],
      evaluateArr: [],
      goods: {},
      spec_config_radio_arr: [],

      spec_opt_arr: [], // 选择规格以后进行缓存
      spec_opt_obj: {},
      spec_opt_val: "种类规格",
      spec_opt_money: "", //选择的规格——别人写的
      select_size: "", //选择的规格——自己写的
      spec_opt_shop: [],

      actions: [],
      options: [
        [
          { name: "复制链接", icon: "link", id: 1, className: "clipboardUrl" },
          { name: "二维码", icon: "qrcode", id: 2, className: "rqUrl" },
        ],
      ],
    };
  },
  components: {
    moreBtn,
  },
  mounted() {
    this.firstAPI();
  },
  methods: {
    onShare() {
      this.showShare = !this.showShare;
    },
    onSelectShare(option) {
      let that = this;
      if (option.id === 1) {
        that.$nextTick(() => {
          let clipboardUrl = new ClipboardJS(".clipboardUrl", {
            text: function () {
              return window.location.href;
            },
          });
          clipboardUrl.on("success", function (e) {
            that.$toast({
              message: "复制成功",
              forbidClick: true,
            });
            e.clearSelection();
            clipboardUrl.destroy();
          });
          clipboardUrl.on("error", function (e) {
            that.$toast({
              message: "该浏览器不支持自动复制",
              forbidClick: true,
            });
            clipboardUrl.destroy();
          });
        });
      } else if (option.id === 2) {
        that.showcanvasrq = true;
        that.$nextTick(() => {
          var canvas = document.getElementById("canvasrq");
          qrcode.toCanvas(
            canvas,
            `${window.location.href}`,
            { width: 200, margin: 2 },
            function (error) {
              if (error) console.error(error);
              console.log("success!");
            }
          );
        });
      }
      that.showShare = false;
    },
    onClickLeftIcon() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.showpop = !this.showpop;
    },
    evaluate_cl() {
      this.$router.push({
        name: "evaluate",
        params: { commodity_id: this.commodity_id },
      });
    },
    spec_shop_num_cl() {
      this.$router.push({
        name: "shopcat",
      });
    },
    onClickIconMore() {},
    onShoplist() {
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
            commodity_id: that.commodity_id,
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
    onTuanlist() {
      let that = this;
      const toas1 = that.$toast.loading({
        duration: 0,
        message: "创建中...",
        forbidClick: true,
      });
      axios
        .post(
          `${apiHost}/team/add`,
          qs.stringify({
            commodity_id: that.commodity_id,
          })
        )
        .then((res) => {
          let { data } = res;
          let { status, message, info } = data;
          toas1.clear();
          that.$toast(`${message}`);
          if (status === 1) {
            that.$router.push({
              name: "makelist",
            });
          }
        });
    },
    spec_config_num_cl(v) {
      if (v > 200) {
        this.$toast("最多200个");
        this.spec_config_num = 200;
      } else {
        this.spec_config_num = v;
      }
    },
    spec_config_radio_cl(o, it, i, index, len, title) {
      /**
       * o 子集
       * it 子集value
       * i 子集下标——规格
       * index 父级下标
       * len 所有子集之和
       */
      this.$set(this.goods.spec, index, o);
      let spec_opt_obj = { ...this.spec_opt_obj };
      if (o.specid === i) {
        //取消选中
        o.specid = `999${index}`;
        this.$delete(this.spec_opt_obj, index);
        this.spec_opt_obj = [].concat(this.spec_opt_obj);
      } else {
        //选中的规格
        o.specid = i;
        spec_opt_obj[index] = { value: it };
        // spec_opt_obj[title] = it;
        this.spec_opt_obj = spec_opt_obj; //value
      }
      let spec_opt_arr_len = Object.keys(this.spec_opt_obj);
      let spec_opt_len = spec_opt_arr_len.length;
      if (spec_opt_len === len) {
        this.spec_opt_val = this.filter_spec_opt(this.spec_opt_obj).join(","); //，全角改为了半角
        this.spec_opt_money = this.filter_spec_opt_money_val(
          this.goods.spec_config,
          this.filter_spec_opt(this.spec_opt_obj).join(""),
          this.spec_config_num
        );
      }
    },
    spec_config_btn() {
      if (this.goods.spec_type === 1) {
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
            ref_page: this.commodity_id,
            address_id: JSON.stringify(this.filter_spec_opt_shop()),
            // address_id: this.filter_spec_opt_shop(),
          };
        } else {
          data = {
            type: this.type,
            shopping_id: this.spec_config_num + "",
            ref_page: this.commodity_id,
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
    spec_config_cl(n) {
      this.spec_config_show = !this.spec_config_show;
      if (n === 1) {
        return;
      }
      if (this.spec_config_show) {
        this.shopanibool = false;
      } else {
        setTimeout(() => {
          this.shopanibool = true;
        }, 500);
      }
    },
    onChange(index) {
      this.current = index;
    },
    firstAPI() {
      let that = this;
      const toas1 = that.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      Promise.all([
        axios.post(
          `${apiHost}/detail`,
          qs.stringify({
            type: that.type,
            id: that.commodity_id,
          })
        ),
        axios.post(
          `${apiHost}/comment`,
          qs.stringify({
            commodity_id: that.commodity_id,
            page: 1,
            limit: 2,
          })
        ),
      ]).then((res) => {
        toas1.clear();
        let [detailarr, commentarr, shoppingarr] = res;
        let detaildata = detailarr.data;
        let commentdata = commentarr.data;
        let errortext = "";
        if (detaildata.status === 1) {
          let obj = { ...detaildata.info };
          this.minimum_purchasing = obj.minimum_purchasing; //最低购买数量
          this.unit = obj.unit; //单位
          if (obj.spec_type === 2) {
            obj.spec = that.filter2spec(obj.spec);
            obj.spec_config = that.filter_spec_opt_money(obj.spec_config);
          } else {
            that.spec_opt_money = obj.price;
          }
          that.currentlen = Array.isArray(obj.carousel_img)
            ? obj.carousel_img.length
            : 0;
          that.goods = obj;
        } else {
          errortext += detaildata.message;
        }
        if (commentdata.status === 1) {
          that.evaluateArr = commentdata.info;
        } else {
          errortext += "," + commentdata.message;
        }
        if (commentdata.status !== 1 || detaildata.status !== 1) {
          that.$toast(`${errortext}`);
        }
      });
    },
    filter1(o) {
      let str = "";
      let obj = { ...o };
      let fiarr = specfield;
      for (let i in obj) {
        if (!fiarr.includes(i)) {
          str += `${obj[i]}`;
        }
      }
      return str;
    },
    filgose(o) {
      if (Array.isArray(o)) {
        return o.join(" . ");
      } else {
        return "";
      }
    },
    filter2spec(arr) {
      let ar = [];
      arr.map((item, index) => {
        item.specid = `999${index}`;
        ar.push(item);
      });
      return ar;
    },
    filter_spec_opt(obj) {
      let arr = [];
      Object.keys(obj).forEach((item) => {
        arr.push(obj[item].value);
      });
      return arr;
    },
    filter_spec_opt_money_val(arr, str, num) {
      let total = 0;
      let fiarr = specfield;
      let ar = [];
      arr.forEach((item) => {
        if (item.strd === str) {
          total = item.price;
          for (let i in item) {
            if (!fiarr.includes(i)) {
              ar.push(`${i}:${item[i]}`);
            }
          }
          this.spec_opt_shop = ar;
        }
      });
      return total;
    },
    filter_spec_opt_shop() {
      if (this.goods.spec_type === 2) {
        return this.spec_opt_shop.join(",");
      } else {
        return "";
      }
    },
    filter_spec_opt_money(arr) {
      let fiarr = specfield;
      let ar = [];
      arr.forEach((item) => {
        let str = "";
        for (let i in item) {
          if (!fiarr.includes(i)) {
            str += `${item[i]}`;
          }
        }
        item.strd = str;
        ar.push(item);
      });
      return ar;
    },
  },
};
</script>
<style lang="scss">
.tx-dx-goods {
  font-size: 14px;
  min-height: 100vh;
  padding-bottom: 2rem;
  .shop-btn-box {
    .shop-btn-warn,
    .shop-btn-dan {
      height: 50px;
      border-radius: 0 !important;
      margin-right: 0;
    }
    .shopche1 {
      position: relative;
      min-width: 1.5rem;
      .shopche-ani {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translate3d(-50%, 0, 0);
        font-weight: bold;
        font-size: 16px;
        color: #e02e24;
        opacity: 0;
        &.on {
          animation: animup 0.3s ease-in-out both;
        }
      }
    }
  }

  .swiper-n2 {
    .custom-indicator {
      text-align: center;
      position: absolute;
      right: 0.12rem;
      bottom: 0.14rem;
      height: 20px;
      line-height: 20px;
      color: #fff;
      font-size: 12px;
      padding: 0 10px;
      border-radius: 5px;
      background-color: rgba(0, 0, 0, 0.3409);
    }
    .van-swipe-item {
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .goods-tit {
    padding: 12px 12px 0;
    background: #fff;
    .tit-plu-10 {
      .van-tag--success {
        margin-right: 12px;
        margin-bottom: 12px;
      }
    }
    .tit-plu-1 {
      position: relative;
      padding: 12px 0;
      font-size: 12px;
      &::after {
        content: "";
        display: block;
        position: absolute;
        border: 0;
        top: 0;
        right: -100%;
        bottom: -100%;
        left: 0;
        transform-origin: 0 0;
        pointer-events: none;
        transform: scale(0.5);
        width: 200%;
        box-sizing: border-box;
        border-top: 1px solid #f2f2f2;
      }
      .van-cell__title {
        display: flex;
        align-items: center;
      }
      .item-0 {
        position: relative;
        display: inline-block;
        &:first-child {
          margin-left: 0;
        }
        margin-left: 20px;
      }
      .item-cl {
        display: inline-block;
        height: 2px;
        width: 2px;
        border-radius: 50%;
        background-color: #9c9c9c;
        position: absolute;
        left: 0;
        top: 0.2rem;
      }
    }
    .tit-text {
      font-size: 16px;
      letter-spacing: 1px;
      margin: 6px 0 8px;
      text-align: justify;
      font-weight: bold;
      color: #151516;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .freight {
        font-size: 12px;
      }
    }
    .tit-price {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #e02e24;
      font-size: 12px;
      i {
        font-weight: 700;
        font-size: 12px;
        margin-right: 2px;
      }
      .item1_1 {
        letter-spacing: 0;
        font-size: 20px;
        line-height: 1;
        font-weight: 700;
      }
      .item1_2 {
        margin-left: 5px;
        font-weight: 400;
        color: #58595b;
        font-size: 12px;
      }
      .item2 {
        color: #58595b;
        font-size: 12px;
      }
    }
  }
  .goods-config {
    padding: 12px;
    background: #fff;
    margin-top: 12px;
    // font-size: 14px;
  }
  .goods-evaluate {
    padding: 12px;
    background: #fff;
    margin-top: 12px;
    .evaluate-lan {
      padding: 0 0 12px 0;
    }
    li {
      padding: 10px 0;
      border-bottom: 1px solid #f4f4f4;
    }
    .hed {
      display: flex;
      align-items: center;
      img {
        width: 0.5rem;
        height: 0.5rem;
        display: block;
        border-radius: 100%;
        margin-right: 10px;
      }
    }
    .con {
      padding-top: 10px;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      // word-break: break-all;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      text-align: left;
      text-align: justify;
      max-height: 50px;
    }
  }
  .goods-detail {
    background: #fff;
    margin-top: 12px;
    font-size: 14px;
    padding: 12px;
    .hed {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 12px;
    }
    img {
      display: block;
      width: 100%;
      // margin: 10px 0;
    }
  }
  .tit-plu-1-con {
    height: 50vh;
    font-size: 14px;
    padding: 12px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    color: #151516;
    .item-0 {
      margin-bottom: 10px;
    }
    .item-1 {
      display: flex;
      align-items: center;
    }
    .item-1-1 {
      height: 2px;
      width: 2px;
      border-radius: 50%;
      background-color: #9c9c9c;
    }
    .item-1-2 {
      margin-left: 5px;
    }
    .item-2 {
      color: #9c9c9c;
      margin: 6px 0 0 10px;
      text-align: justify;
      letter-spacing: 1px;
      display: inline-block;
      font-size: 13px;
    }
  }
  .spec_config_plu-1 {
    overflow: inherit;
    border-radius: 0;
    height: 60vh;
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
}
</style>