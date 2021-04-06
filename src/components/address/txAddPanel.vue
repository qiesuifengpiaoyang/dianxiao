<template>
  <div>
    <!-- 挂载到 body 节点下 -->
    <van-popup
      v-model="panelShow"
      get-container="body"
      :close-on-click-overlay="false"
      class="co-address-panel"
    >
      <div class="hed">
        <template v-if="is_edit">修改收货地址</template>
        <template v-else>添加收货地址</template>
        <van-icon name="clear" @click="address_pop_close_fn" />
      </div>
      <div class="con">
        <van-cell-group>
          <van-field
            v-model="username"
            label="收货人"
            placeholder="收货人姓名"
          />
          <van-field
            v-model="mobile"
            type="tel"
            pattern="/[0-9]*/"
            label="手机号"
            placeholder="收货人手机号"
          />
          <txpicker3
            :reglist="reglist"
            :pcd="pcd"
            :is_edit="is_edit"
            @onHideRegionFn="onHideRegionFn"
          />
          <van-field
            v-model="address"
            type="textarea"
            autosize
            label="详细地址"
            placeholder="如街道、门牌号、小区、乡镇、村等"
          />
        </van-cell-group>
      </div>
      <div class="fot" @click="address_pop_fn">保存</div>
    </van-popup>
  </div>
</template>
<script>
import qs from "qs";
import { store, Y } from "@/plugins/store.js";
import axios from "@/plugins/axios";
import txpicker3 from "@/components/picker3.vue";
import { apiHost, specfield } from "@/plugins/path";
export default {
  data() {
    return {
      pcd: "",
      username: "",
      mobile: "",
      address: "",
      address_id: "",
      index: 0,
      is_default: 0,
      list: {},
      reglist: {},
      storedata: store.state,
    };
  },
  props: {
    panelShow: {},
    addpop: {},
    is_edit: {},
  },
  components: {
    txpicker3,
  },
  watch: {
    addpop: {
      handler(n) {
        // if(n.hasOwnProperty("province_id")){
        this.username = this.addpop.username;
        this.mobile = this.addpop.mobile;
        this.address = this.addpop.address;
        this.index = this.addpop.index;
        this.is_default = this.addpop.is_default;
        this.province_id = this.addpop.province_id;
        this.area_id = this.addpop.area_id;
        this.market_id = this.addpop.market_id;
        this.province = this.addpop.province;
        this.area = this.addpop.area;
        this.market = this.addpop.market;
        this.address_id = this.addpop.id;

        if (Y.includes(this.province_id + "1")) {
          this.pcd =
            this.province && this.area ? `${this.province} ${this.area}` : "";
        } else {
          this.pcd =
            this.province && this.market && this.area
              ? `${this.province} ${this.market} ${this.area}`
              : "";
        }
        this.reglist = {
          province: this.province,
          market: this.market,
          area: this.area,
          province_id: this.province_id,
          market_id: this.market_id,
          area_id: this.area_id,
        };

        // }
      },
      deep: true,
    },
  },
  methods: {
    onHideRegionFn(o) {
      this.province_id = o.province_id;
      this.area_id = o.area_id;
      this.market_id = o.market_id;
      this.province = o.province;
      this.area = o.area;
      this.market = o.market;
      if (Y.includes(o.province_id + "1")) {
        this.pcd = o.province && o.area ? `${o.province} ${o.area}` : "";
      } else {
        this.pcd =
          o.province && o.market && o.area
            ? `${o.province} ${o.market} ${o.area}`
            : "";
      }
      this.reglist = {
        province: this.province,
        market: this.market,
        area: this.area,
        province_id: this.province_id,
        market_id: this.market_id,
        area_id: this.area_id,
      };
    },
    address_pop_close_fn() {
      this.$emit("update:panelShow", false);
    },
    address_pop_fn() {
      let that = this;
      if (!that.username) {
        return that.$toast("收货人姓名不能为空");
      }
      if (!that.mobile) {
        return that.$toast("收货人手机号不能为空");
      }
      if (!that.address) {
        return that.$toast("收货人详细地址不能为空");
      }
      if (!that.province_id && !that.city_id && !that.district_id) {
        return that.$toast("收货人地区不能为空");
      }
      const toast1 = that.$toast.loading({
        duration: 0,
        message: "提交中...",
        forbidClick: true,
      });
      let info = {
        username: that.username,
        mobile: that.mobile,
        province: that.province,
        province_id: that.province_id,
        market_id: that.market_id,
        market: that.market,
        area_id: that.area_id,
        area: that.area,
        address: that.address,
      };
      let index = that.index;
      if (that.is_edit) {
        info.is_default = that.is_default;
        info.address_id = that.address_id;
      } else if (that.storedata.addressList.length === 0) {
        info.is_default = 1;
      } else {
        info.is_default = 0;
      }
      // console.log(info)
      // return ;
      axios.post(`${apiHost}/address/edit`, qs.stringify(info)).then((res) => {
        console.log(res);
        let { data } = res;
        let { status, message, info } = data;
        toast1.clear();
        if (status === 1) {
          this.$emit("address_pop_fn", info, index);
          this.$emit("update:panelShow", false);
        } else {
          that.$toast({
            message,
            forbidClick: true,
          });
        }
      });
    },
  },
};
</script>
<style lang="scss">
.co-address-panel {
  font-size: 14px;
  padding: 12px;
  overflow: initial;
  top: 10%;
  width: 85%;
  border-radius: 15px;
  transform: translate3d(-50%, 0, 0);
  .van-popup__close-icon--top-right {
    top: -7px;
    right: -7px;
  }
  .hed {
    font-size: 16px;
    border-bottom: 1px solid #f4f4f4;
    padding-bottom: 12px;
    line-height: 1;
    text-align: center;
    position: relative;
    .van-icon-clear {
      position: absolute;
      right: 0;
      top: -0.06rem;
      font-size: 22px;
      color: #ccc;
    }
  }
  .con {
    .van-cell {
      padding: 10px 0;
      .van-field__label {
        width: 4.4em;
      }
      input {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .fot {
    position: relative;
    display: inline-block;
    width: 100%;
    text-align: center;
    height: 0.7rem;
    line-height: 0.7rem;
    margin-top: 12px;
    color: #fff;
    border-radius: 5px;
    background-color: #e02e24;
  }
}
</style>