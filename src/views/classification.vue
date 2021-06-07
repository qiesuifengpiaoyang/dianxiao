<template>
  <div class="tx-dx-classification">
    <!-- <div class="class-sear-box">
            <div class="sear-box" @click="searchMaskCl">
                <van-icon name="search" />
                <span>搜索您需要的商品</span>
            </div>
        </div> -->
    <van-tree-select
      class="tree-select-n2"
      :items="listch"
      :main-active-index.sync="active"
      @click-nav="jsToNav"
    >
      <template #content>
        <div class="select-n2-box" v-for="oc in listObj[active]" :key="oc.id">
          <div class="titbox">
            <div class="tit">{{ oc.title }}</div>
          </div>
          <van-grid :column-num="3" :border="false">
            <van-grid-item
              v-for="(ob, obindex) in oc.children"
              :key="obindex"
              @click="jsToCommodity(ob)"
            >
              <van-image :src="ob.icon" />
              <p>{{ ob.title }}</p>
            </van-grid-item>
          </van-grid>
        </div>
      </template>
    </van-tree-select>
    <to-top classNc="van-tree-select__content" />
    <!-- <search-mask 
            formNar="classification"
            :form="form"
            :show.sync="isShowSearch"
        /> -->
    <Footer active="分类" />
  </div>
</template>
<script>
import Footer from "@/components/footer.vue";
// import SearchMask from '@/components/searchMask.vue'
import ToTop from "@/components/top.vue";
import qs from "qs";
import { apiHost, specfield } from "@/plugins/path";
import axios from "@/plugins/axios";
export default {
  data() {
    return {
      active: "",
      // isShowSearch:false,
      // form:'',
      type: this.$route.params.type,
      listObj: {},
      listch: [
        {
          modular_id: 1,
          text: "批发部",
        },
        // {
        //   modular_id: 2,
        //   text: "开心拼吧",
        // },
        // {
        //   modular_id: 3,
        //   text: "欢乐购",
        // },
        // {
        //   modular_id: 4,
        //   text: "一元购",
        // },
        // {
        //   modular_id: 6,
        //   text: "复消商品",
        // },
        {
          modular_id: 6,
          text: "代理专区",
        },
      ],
    };
  },
  components: {
    Footer,
    ToTop,
    // SearchMask
  },
  mounted() {
    this.leftSelect();
    this.firstAPI(this.type, 0);
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    leftSelect() {
      this.listch.map((item, index) => {
        if (item.modular_id === +this.type) {
          this.active = index;
        }
      });
      console.log(this.active, "active");
    },
    firstAPI(type, index) {
      // console.log(type,'type',index,'index');
      let that = this;
      // if(that.listObj.hasOwnProperty(that.active)){
      //     return ;
      // }
      const toast1 = that.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      axios
        .post(`${apiHost}/class`, qs.stringify({ type: +type }))
        .then((res) => {
          toast1.clear();
          let { data } = res;
          let { status, info, message } = data;
          // info = [];
          if (status === 1) {
            that.datacl1(info, index);
          } else {
            that.$toast({
              message,
              forbidClick: true,
            });
          }
        });
    },
    datacl1(arr, index) {
      let that = this;
      if (Array.isArray(arr)) {
        if (arr.length === 0) {
          that.$toast("无商品类型");
          return;
        }
      } else {
        return;
      }
      let obj = arr[0];
      if (obj.hasOwnProperty("children")) {
        that.$set(that.listObj, index, arr);
      } else {
        let arobj = [];
        let o = {};
        o.children = arr;
        o.id = 9999;
        o.title = "热门分类";
        arobj.push(o);
        that.$set(that.listObj, index, arobj);
      }
    },
    jsToNav(index) {
      this.active = index;
      let type = this.listch[index].modular_id;
      this.type = type;
      this.$router.push({
        name: "classification",
        params: { type },
      });
      // console.log(type,'type',index,'index');
      setTimeout(() => {
        this.firstAPI(type, index);
      }, 200);
    },
    jsToCommodity(o) {
      // if(+this.type !==2){
      this.$router.push({
        name: "search_result",
        params: { type: this.type, class_id: o.id, opt_name: o.title },
      });
      // }else{
      //     this.$router.push({
      //         name:'search_result_make',
      //         params:{type:2,class_id:o.id,opt_name:o.title}
      //     })
      // }
    },
  },
};
</script>
<style lang="scss">
.tx-dx-classification {
  .class-sear-box {
    padding: 0.24rem;
    background: #fff;
    overflow: hidden;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 10;
    .sear-box {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      background-color: #ededed;
      height: 0.7rem;
      color: #9c9c9c;
      font-size: 14px;
      border-style: solid;
      .van-icon {
        font-size: 16px;
      }
    }
  }
  .tree-select-n2 {
    // padding-top: 1.12rem;
    min-height: 100vh;
    color: #58595b;
    .van-tree-select__content {
      padding-bottom: 2rem;
      flex: 3;
    }
    .van-sidebar-item--select {
      color: #ee0a24;
    }
    .van-sidebar-item {
      color: #58595b;
    }
    p {
      font-size: 12px;
      line-height: 1.2;
      margin-top: 6px;
    }
    .van-image {
      width: 1.2rem;
      height: 1.2rem;
    }
    .select-n2-box {
      .van-grid-item__content {
        padding-top: 0;
      }
    }
    .titbox {
      height: 1rem;
      display: flex;
      align-items: center;
    }
    .tit {
      padding-left: 16px;
    }
  }
}
</style>
