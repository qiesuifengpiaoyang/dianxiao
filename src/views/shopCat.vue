
<template>
  <div class="tx-dx-shopcat">
    <van-nav-bar
      title="购物车列表"
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
    <div style="height: 1.12rem"></div>
    <div class="shopcat-box">
      <van-checkbox-group
        v-model="result"
        ref="checkboxGroup"
        v-if="list.length > 0"
      >
        <van-swipe-cell v-for="(item, index) in list" :key="'list'+item.id">
          <div class="catli">
            <div class="shopdown">
              <div v-if="item.stock === 0">库存不足</div>
              <div v-else-if="item.status === 0">已下架</div>
              <van-checkbox
                :name="index"
                v-if="item.status === 1"
                @click.stop="changegf"
              />
            </div>
            <van-card
              :num="item.num"
              :title="item.title"
              :thumb="item.cover_img"
            >
              <template #tags>
                <div class="tag-box">
                  <button @click="deleteBtn(item.id)">删除</button>
                  <div>
                    {{ specv(item.spec) }}
                  </div>
                </div>
              </template>
              <template #price>
                <span style="font-weight: bold">¥{{ item.spec.price }}</span>
                <span
                  style="
                    margin-left: 20px;
                    text-decoration: line-through;
                    color: #ccc;
                  "
                  >{{ item.spec.market_price }}</span
                >
              </template>
              <template #num>
                <van-stepper
                  :value="item.num"
                  :min="item.minimum_purchasing"
                  disable-input
                  async-change
                  @plus="onPlus(item, index)"
                  @minus="onMinus(item, index)"
                />
              </template>
            </van-card>
          </div>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="delshopcl(item)"
            />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>
      <van-empty description="暂无订单" v-if="emptyshow" />
    </div>

    <van-submit-bar
      :price="price"
      button-text="提交订单"
      @submit="onSubShopCat"
      :disabled="!result.length"
      v-if="list.length > 0"
    >
      <van-checkbox v-model="checkedcat" @click.stop="onchcat"
        >全选</van-checkbox
      >
    </van-submit-bar>
    <more-btn :showpop.sync="showpop" />
  </div>
</template>
<script>
import Footer from "@/components/footer.vue";
import moreBtn from "@/components/morebtn.vue";
import qs, { parse } from "qs";
import { apiHost, specfield } from "@/plugins/path";
import axios from "@/plugins/axios";
import { debounce } from "lodash-es";
export default {
  data() {
    return {
      toast1:null,
      showpop: false,
      emptyshow: false,
      result: [],
      checkedcat: false,
      price: 0,
      list: [],
    };
  },
  props: {
    active: {
      type: Number,
      default: 0,
    },
  },
  components: {
    Footer,
    moreBtn,
  },
  mounted() {
    this.firstAPI();
  },
  methods: {
    //删除购物车
    deleteBtn(id){
      axios.post(`${apiHost}/delShoppingCard`,qs.stringify({
        shopping_id:id
      })).then((res)=>{
        this.$toast(`${res.data.message}`);
        this.firstAPI()
      })
    },
    onClickRight() {
      this.showpop = !this.showpop;
    },
    firstAPI() {
      let that = this;
      const toast1 = that.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: "加载中...",
      });
      axios.post(`${apiHost}/shopping`).then((res) => {
        toast1.clear();
        let { data } = res;
        let { status, info, message } = data;
        if (status === 1) {
          Array.isArray(info) ? (this.list = info) : [];
          if (this.list.length === 0) {
            this.emptyshow = true;
          }
        } else {
          that.$toast(`${message}`);
        }
      });
    },
    specv(o) {
      let filarr = specfield;
      let arr = [];
      Object.keys(o).map((i, index) => {
        if (!filarr.includes(i)) {
          arr.push(o[i]);
        }
      });
      return arr.join();
    },
    changegf() {
      if (this.result.length === this.list.length) {
        this.checkedcat = true;
      } else {
        this.checkedcat = false;
      }
      this.onchcata();
    },
    onchcata() {
      let price = 0;
      this.result.forEach((item) => {
        console.log(item, "价格信息");
        //11-4——修改：价格计算
        // price = price*100 + this.list[item].num * this.list[item].spec.price*100;//修改
        price += this.list[item].spec.price * 100 * this.list[item].num;
      });
      this.price = price;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onPlus(o, i) {
      let obj = { ...o };
      obj.num = +o.num + 1;
      this.onChange(obj, obj.id, i, 1);
    },
    onMinus(o, i) {
      let obj = { ...o };
      obj.num = +obj.num - 1;
      this.onChange(obj, obj.id, i, 2);
    },
    onchcat(v) {
      if (this.checkedcat) {
        this.$refs.checkboxGroup.toggleAll(true);
        this.onchcata();
      } else {
        this.$refs.checkboxGroup.toggleAll();
        this.price = 0;
      }
    },
    onChange(o, shopping_id, index, type) {
      let that = this;
      const toast1 = that.$toast.loading({ duration: 0, forbidClick: true });
      axios
        .post(
          `${apiHost}/modifiedNum`,
          qs.stringify({ shopping_id, type: type })
        )
        .then((res) => {
          toast1.clear();
          let { data } = res;
          let { status, info, message } = data;
          if (status === 1) {
            that.$set(that.list, index, o);
            let price = 0;
            that.result.map((item) => {
              //11-4——修改：价格计算
              //    price = price*100 + that.list[item].spec.price * that.list[item].num*100
              price += this.list[item].spec.price * 100 * this.list[item].num;
            });
            this.price = price;
          }
          that.$toast(`${message}`);
        });
    },
    delshopcl(item) {
      let that = this;
      let shopping_id = item.id;
      let itnumpay = item.num * item.spec.price;
      const toast1 = that.$toast.loading({ duration: 0, forbidClick: true });
      axios
        .post(`${apiHost}/delShoppingCard`, qs.stringify({ shopping_id }))
        .then((res) => {
          let { data } = res;
          let { status, message } = data;
          toast1.clear();
          if (status === 1) {
            that.list = that.list.filter((item) => {
              return item.id !== shopping_id;
            });
            that.onchcata();
          }
          that.$toast(`${message}`);
        });
    },
    onSubShopCat() {
      let shopping_id = [];
      this.toast1 = this.$toast.loading({ duration: 0, forbidClick: true });
      this.result.map((i) => {
        shopping_id.push(this.list[i].id);
      });
      console.log(shopping_id, "定位");
      
      this.$router.push({
        name: "shopOrder",
        params: { shopping_id: shopping_id.join(",") },
      });
    },
  },
  beforeDestroy(){
this.toast1.clear();
  }
};
</script>
<style lang="scss" >
.tx-dx-shopcat {
  // background: #fff;
  min-height: 100vh;
  padding-bottom: 2rem;
  .shopcat-box {
    .shopdown {
      width: 0.5rem;
      font-size: 14px;
      color: #ccc;
      align-self: center;
    }
  }
  .catli {
    display: flex;
    .van-stepper {
      button {
        width: 20px;
        height: 20px;
      }
      input {
        height: 20px;
        font-size: 12px;
        width: 24px;
      }
    }
  }
  .van-swipe-cell {
    position: relative;
    background: #fff;
    padding-left: 12px;
    margin-bottom: 12px;
    .van-checkbox__label {
      flex: 1;
    }
  }
  .van-card {
    background-color: #fff;
    flex: 1;
    padding: 8px 12px;
  }
  .delete-button {
    height: 100%;
  }
}
.tag-box {
  position: relative;
  margin-top: 0.1rem;
  color: rgba(204, 204, 204, 1);
  .van-tag {
    margin-right: 0.1rem;
  }
  &>div{
    width: 75%;
  }
  &>button{
    position: absolute;
    right: 0;
    width: 20%;
    line-height: 0.4rem;
    background-color: rgb(252, 185, 0);
    color: #fff;
  }
}
</style>