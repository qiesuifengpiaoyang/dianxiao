<template>
  <van-popup :value="show" get-container="body">
    <div class="tx-dx-searchmask">
      <div class="searchmask-hed">
        <van-icon name="arrow-left" @click="arrowLeftCl" />
        <div class="searchinp-right">
          <form action="/">
            <van-search
              v-model="searchvalue"
              show-action
              placeholder="请输入搜索关键词"
              @search="onSearch"
              ref="vansearch"
            >
              <template #action>
                <div @click="onSearch">搜索</div>
              </template>
            </van-search>
          </form>
        </div>
      </div>
      <div class="searchmask-con">
        <div class="item1">
          <div class="item1-1">
            <van-icon name="clock" />
            最近搜索
          </div>
          <van-icon name="delete" />
        </div>
        <div class="item1-box">
          <van-tag
            @click="jsTotag(ite.value)"
            round
            color="#f4f4f4"
            text-color="#58595b"
            v-for="ite in searchmenu"
            :key="ite.value"
            >{{ ite.value }}</van-tag
          >
        </div>
      </div>
    </div>
  </van-popup>
</template>
<script>
import qs from "qs";
import { apiHost, specfield } from "@/plugins/path";
import axios from "@/plugins/axios";
import { debounce } from "lodash-es";
export default {
  data() {
    return {
      searchvalue: this.$route.params.keyword,
      searchmenu: JSON.parse(localStorage.getItem("searchmenu")) || [],
    };
  },
  props: {
    show: {
      default: false,
    },
    form: {},
    formNar: {},
  },
  watch: {
    form(o, n) {
      console.log(o, n, "====");
      if (o === "close") {
        this.searchvalue = "";
      }
    },
  },
  mounted() {},
  methods: {
    parantDOMcl() {
      this.$refs.vansearch.querySelector("input[type=search]").focus();
    },
    arrowLeftCl() {
      console.log(this.formNar, this.form);
      if (this.formNar === "classification") {
        this.$emit("update:show", false);
      } else {
        window.location.href = `${sessionStorage.getItem("seurl")}`;
      }
    },
    jsTotag(v) {
      this.searchvalue = v;
      this.onSearch();
    },
    onSearch() {
      let that = this;
      let obj = that.$route.params;
      obj.keyword = that.searchvalue;
      let searchmenu = JSON.parse(localStorage.getItem("searchmenu")) || [];
      let len = searchmenu.length;
      let arr;
      arr = searchmenu.filter((item) => {
        return item.value !== that.searchvalue;
      });
      arr.unshift({ value: that.searchvalue });
      if (arr.length > 8) {
        arr = arr.slice(0, 8);
      }
      localStorage.setItem("searchmenu", JSON.stringify(arr));
      that.$emit("onSearch", {
        opt_name: obj.opt_name,
        keyword: that.searchvalue,
        type: obj.type,
        class_id: obj.class_id,
      });
    },
  },
};
</script>
<style lang="scss">
.tx-dx-searchmask {
  width: 100vw;
  height: 100vh;
  color: #9c9c9c;
  background: #fff;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  font-size: 16px;
  .searchmask-con {
    padding: 12px;
    .item1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item1-1 {
        display: flex;
        align-items: center;
        i {
          margin-right: 0.1rem;
        }
      }
    }
    .item1-box {
      margin-top: 0.3rem;
      // & > span {
      //   background-color: #fad5a0;
      // }
      .van-tag {
        padding: 5px 10px;
        margin-right: 0.2rem;
        margin-bottom: 0.2rem;
      }
    }
  }
  .searchmask-hed {
    position: sticky;
    left: 0;
    top: 0;
    font-size: 26px;
    display: flex;
    align-items: center;
    padding: 5px 12px;
  }
  .van-search {
    padding: 0 0 0 12px;
  }
  .searchinp-right {
    flex: 1;
    .van-icon-search {
      color: #9c9c9c;
    }
  }
  .van-search__action {
    // border-left: 1px solid #fbbb5f;
    color: #e02e24;
  }
}
</style>