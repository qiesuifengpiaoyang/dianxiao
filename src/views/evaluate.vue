<!--收货地址-->
<template>
    <div class="evaluate-wrapper">
        <van-nav-bar
        title="评论列表"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        class="fbpl"
        />
        <div style="height:.92rem"></div>
        <van-list
        v-model="loading"
        :finished="finished"
        @load="firstAPI"
        >
            <ul class="evaluate-list">
                <li v-for="(item, index) in list" :key="index">
                    <div class="hed">
                        <div class="hed-left">
                            <img :src="item.head_img" alt="" v-if="item.head_img">
                            <div v-else></div>
                            <span>{{filtername(item.username)}}</span>
                            
                        </div>
                        <span class="time">{{filtertime(item.create_time)}}</span>
                    </div>
                    <div class="con">
                        {{item.comment}}
                    </div>
                    <div class="imglist">
                        <van-image :src="it" fit="cover" v-for="(it, i) in item.img" :key="i" @click="imgprecl(item,i)"/>
                    </div>
                    
                </li>
            </ul>
            <van-empty description="暂无评论" v-if="emptyshow"/>
        </van-list>
    </div>
</template>
<script>
import qs from "qs";
import axios from "@/plugins/axios";
import {debounce} from "lodash-es";
import {apiHost,specfield} from "@/plugins/path";
import {store} from "@/plugins/store.js"
import txAddPanel from '@/components/address/txAddPanel.vue';
import { ImagePreview } from 'vant';
export default {
    data(){
        return {
            list:[],
            emptyshow:false,
            loading:false,
            finished:false,
            page:0,
            limit:10,
            commodity_id:this.$route.params.commodity_id
        }
    },
    created(){
    },
    mounted(){
        
        // this.firstAPI()
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        filtername(n){
            return `${n ? n.substring(0,1) : '用'}***`
        },
        imgprecl(item,n){
            ImagePreview({
                images: item.img,
                startPosition: n,
            });
        },
        filtertime(n){
            return n.substring(0,10)
        },
        firstAPI(){
            let that = this;
            that.page = that.page+1;
            axios.post(`${apiHost}/comment`,qs.stringify({commodity_id:that.commodity_id,page:that.page,limit:10}))
            .then((res)=>{
                let {data} = res;
                let {info, status, message} = data;
                if(status === 1){
                    if(info.length<10){
                        that.finished = true;
                    }
                    if(info.length === 0 && that.page === 1){
                        that.emptyshow = true
                    }
                    if(info.length > 0){
                        that.list = that.list.concat(...info);
                    }
                    
                }else{
                    that.$toast(`${message}`);
                    that.finished = true;
                }
                that.loading = false
            })
        }
    }
}
</script>
<style lang="scss">
.evaluate-wrapper{
    font-size: 16px;
    padding-bottom: 1.4rem;

    .evaluate-empty{
        text-align: center;
        font-size: 100px;
        color: #ccc;
        padding: 20px 0;
        p{
            font-size: 16px;
            color: #58595b;
        }
    }
    .evaluate-list{
        li{
            background: #fff;
            padding: 12px 12px 6px 12px;
            margin-bottom: 12px;
            position: relative;
            font-size: 14px;
        }
        .hed{
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #151516;
            .hed-left{
                display: flex;
                flex: 1;
                align-items: center;
                div{
                    width: .6rem;
                    height: .6rem;
                    background: #9c9c9c;
                    border-radius: 100%;
                }
                img{
                    width: .6rem;
                    height: .6rem;
                    display: block;
                    border-radius: 100%;
                }
                span{
                    margin-left: 10px;
                    
                }
            }
            .time{
                color:#58595b;
            }
        }
        .con{
            padding: 12px 0;
            text-align: justify;
            color: #58595b;
        }
        .imglist{
            overflow: hidden;
            .van-image{
                padding: 0;
                margin: 0 6px 6px 0;
                width: calc((100vw - 40px)/3);
                height: 2rem;
                overflow: hidden;
                .van-grid-item__content{
                    padding: 0;
                }
                &:nth-child(3n+3){
                    margin-right: 0;
                }
            }
            
        }
    }
}
</style>