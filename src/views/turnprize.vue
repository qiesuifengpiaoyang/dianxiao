
<template>
    <div class="tx-dx-prize" v-if="pageshow">
        <van-nav-bar
        title="奖品详情"
        left-text="返回"
        left-arrow
        class="fbpl"
        @click-left="onClickLeft"
        />
        <div v-if="!empty">
            <div class="prize-list-2">
                <van-swipe class="swiper-n2" :show-indicators="false" v-if="currentlen > 0" @change="onChange">
                    <van-swipe-item v-for="(item, index) in list.banner" :key="index">
                        <a href="javascript:;">
                            <img :src="item">
                        </a>
                    </van-swipe-item>
                    <template #indicator>
                        <div class="custom-indicator">
                        {{ current + 1 }}/{{currentlen}}
                        </div>
                    </template>
                </van-swipe>
                <div class="cover_img" v-else>
                    <img :src="list.cover_img" alt="">
                </div>
                <div class="title" v-text="list.title"></div>
                <div class="money">¥<span>{{list.money}}</span></div>
            </div>
            <div class="prize-list-1">
                <p class="tit">奖品简介</p>
                <div class="synopsis" v-html="list.synopsis">

                </div>
                <p class="tit">奖品详情</p>
                <div class="detail" v-html="list.detail">

                </div>
            </div>
        </div>

        <van-empty v-else :description="emptyText" />
    </div>
</template>
<script>
import qs from "qs";
import {apiHost,specfield} from "@/plugins/path";
import axios from "@/plugins/axios";
import ClipboardJS from 'clipboard';
export default {
    data(){
        return{
            list: null,
            currentlen:0,
            current:0,
            empty:false,
            emptyText:null,
            pageshow:false

        }
    },
    mounted(){

        this.firstAPI();
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        onChange(index) {
            this.current = index;
        },
        firstAPI(){
            let that = this;
            const toast1 = that.$toast.loading({
                duration: 0,
                forbidClick: true,
            });
            axios.post(`${apiHost}/turntable/prize`,qs.stringify({
                id:that.$route.params.id || 0
            }))
            .then((res)=>{
                let {data} = res;
                let {info, status, message} = data;
                that.pageshow = true
                toast1.clear();
                if(status === 1){
                    that.list = {...info};
                    that.currentlen = Array.isArray(info.banner) ? info.banner.length > 0 ? info.banner.length : 0 : 0;
                }else{
                    that.empty = true;
                    that.emptyText = message;
                }
            })
        },
    }
}
</script>
<style lang="scss" >
.tx-dx-prize{
    min-height: 100vh;
    .prize-list-2{
        font-size: 14px;
        padding: .8rem 0 0;
        .shopcat-address{
            position: relative;
            .sad{
                align-items: center;
                padding: 16px 12px;
            }
            i.van-icon-add-square,
            i.van-icon-location{
                color: #e02e24;
                font-size: 20px;
            }

        }
        .title{
            background: #fff;
            padding: 12px;
            text-align: justify;
        }
        .money{
            background: #fff;
            padding: 0 12px 12px;
            text-align: right;
            font-size: 12px;
            color: #e02e24;
            span{
                margin-left: 2px;
                font-size: 15px;
            }
        }
    }
    .prize-list-1{
        background: #fff;
        font-size: 13px;
        color: #9c9c9c;
        margin-top: 12px;
        padding: 12px;
        .tit{
            color: #151516;
            font-size: 14px;
            margin-bottom: 8px;
        }
        .synopsis{
            margin-bottom: 10px;
            text-align: justify;
            img{
                max-width: 100%;
                display: block;
            }
        }
        .detail{
            margin-bottom: 10px;
            text-align: justify;
            img{
                max-width: 100%;
                display: block;
            }
        }
    }
    
}

</style>