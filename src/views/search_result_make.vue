<template>
    <div class="tx-dx-sgood">
        <div class="sgood-sear-box">
            <van-icon name="arrow-left" @click.stop="arrowleft"/>
            <div class="sgood-sear-right" @click.stop="closeTagPar">
                <van-icon name="search" />
                <van-tag color="#959595" style="margin-left:.2rem" text-color="#fff" closeable size="medium" v-if="keyword" @close="closeTag">{{keyword}}</van-tag>
                <div v-else style="font-size:14px">搜索您需要的商品</div>
                <van-field value="输入框已禁用" disabled style="padding:0;width:20px;opacity:0"/>
            </div>
            <van-icon class="good-sear-right-home" name="weapp-nav" size="20" @click="onClickRight"/>
        </div>
        <div class="sgood-box">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="listcl"
                >
                <van-grid :column-num="2" class="sgood-list">
                    <van-grid-item v-for="item in list" :key="item.id" @click="jsToDetail(item)">
                        <div class="list-img" :style="{height}">
                            <img :src="item.cover_img" alt="" v-lazy="item.cover_img">
                        </div>
                        <div class="list-con">
                            <div class="con-title">{{item.title}}</div>
                            <div class="con-price">
                                <div class="price"><small>¥</small>{{item.price}}</div>
                                <div class="ava"></div>
                            </div>
                        </div>
                    </van-grid-item>
                </van-grid>
            </van-list>
            <!-- <van-empty description="暂无商品" v-if="emptyshow"/> -->
        </div>
        <to-top />
        <more-btn :showpop.sync="showpop"/>
        <search-mask :show.sync="isShowSearch" :form="form" formNar="classification" ref="searchmasksync" @onSearch="onSearch"/>
    </div>

</template>
<script>
import qs from "qs";
import {apiHost,specfield} from "@/plugins/path";
import axios from "@/plugins/axios";
import ToTop from '@/components/top.vue'
import searchMask from "@/components/searchMask.vue";
import moreBtn from "@/components/morebtn.vue";
export default {
    data(){
        return {
            list:[],
            isShowSearch:false,
            emptyshow:false,
            loading: false,
            finished: false,
            showpop:false,
            page:0,
            height:0,
            type:this.$route.params.type,
            id:this.$route.params.id,
            form:'',
            keyword:this.$route.params.keyword
        }
    },
    created(){
        this.height = window.screen.width/2-50*.1+"px";
    },
    components:{
        searchMask,
        ToTop,
        moreBtn
    },
    methods:{
        onClickRight(){
            this.showpop = !this.showpop
        },
        arrowleft(){
            let obj = this.$route.params;
            if(!!this.keyword){
                this.page = 0;
                this.list = [];
                this.keyword = '';
                this.loading = true;
                this.listcl();
                this.$router.replace({
                    name:"search_result_make",
                    params:{type:obj.type,class_id:obj.class_id,opt_name:obj.opt_name}
                })
            }else{
                this.$router.replace({
                    name:"classification",
                    params:{type:obj.type}
                })
            }
        },
        onSearch(o){
            this.$router.replace({
                name:"search_result_make",
                params:{
                    opt_name: o.opt_name,
                    keyword:o.keyword,
                    type:o.type,
                    class_id:o.class_id
                }
            })
            this.showSe();
            this.page = 0;
            this.list = [];
            this.keyword = o.keyword;
            this.loading = true;
            this.listcl();
            
        },
        showSe(){
            this.isShowSearch = !this.isShowSearch;
        },
        closeTagPar(){
            this.showSe();
            console.log(1)
            this.form = 'click';
            this.$nextTick(()=>{
                this.$refs.searchmasksync.parantDOMcl()
            })
            
        },
        closeTag(){
            this.showSe();
            console.log(2)
            this.form = 'close'
        },
        jsToDetail(it){
            this.$router.push({
                name:'goods',
                params:{id:it.id,type:this.type}
            })
        },
        listcl(){
            let that = this;
            let toast1;
            that.page = that.page + 1;
            axios.post(`${apiHost}/commodity`,qs.stringify({
                type: that.type,
                class_id: that.class_id,
                keyword: that.keyword,
                page: that.page,
                limit:10
            }))
            .then((res) => {
                let {data} = res;
                let {info, message, status} = data;
                if(status === 1){
                    if(info.length < 10){
                        that.finished = true;
                    }
                    if(info.length === 0 && that.page === 1){
                        that.emptyshow = true
                    }
                    if(info.length > 0){
                        that.list = that.list.concat(...info)
                    }
                }else{
                    that.$toast(`${message}`)
                    that.finished = true
                }
                that.loading = false
            })
        }
    }
}
</script>
<style lang="scss">
    .tx-dx-sgood{
        .sgood-sear-box{
            position: fixed;
            left: 0;
            top: 0;
            z-index: 10;
            width: 100%;
            padding: .1rem;
            font-size: 26px;
            background: #fff;
            color: #9c9c9c;
            display: flex;
            align-items: center;
            .good-sear-right-home{
                margin-left: 12px;
            }
            .van-icon-arrow-left{

            }
            .sgood-sear-right{
                flex: 1;
                background: #ededed;
                border-radius: 5px;
                display: flex;
                align-items: center;
                padding: 5px 12px;
                margin-left: .2rem;
                line-height: 24px;
                font-size: 24px;
                .van-icon-search{
                    font-size: 20px;
                }
            }
        }
        .sgood-box{
            padding-top: .9rem;
        }
        .sgood-list{
            font-size: 12px;
            color: #151516;
            .list-img{
                width: 100%;
                position: relative;
                overflow: hidden;
                img{
                    height: 100%;
                    width: 100%;
                    display: block;
                    border: 0;
                }
            }
            .list-con{
                padding: 10px 5px;
                min-width: 0;
                .con-title{
                    width: 100%;
                    height: 14px;
                    line-height: 1.2;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-bottom: 5px;
                }
                .price{
                    font-size: 14px;
                    color: #e02e24;
                    font-weight: bold;
                }
            }
            .van-grid-item{
                margin-bottom: .2rem;
                min-width: 0;
                &:nth-child(2n+1){
                    padding-right: .1rem;
                }
                &:nth-child(2n+2){
                    padding-left: .1rem;
                }
                .van-grid-item__content{
                    padding: 0;
                    justify-content: inherit;
                    align-items: inherit;
                }
            }
        }
    }
</style>