
<template>
    <div class="tx-dx-cachecomments">
        <van-nav-bar
        title="发表评价"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        class="fbpl"
        />
        <div style="height:1.12rem"></div>
        <ul class="cachecomments-list">
            <li v-for="(item, index) in list" :key="index">
                <div class="item1">
                    <img :src="item.cover_img" alt="">
                    <span>{{item.title}}</span>
                </div>
                <div class="item2">
                    <van-button plain hairline type="danger" v-if="item.comment === 0" @click="commentCl(item, index)">立即评论</van-button>
                    <van-button type="default" v-if="item.comment === 1">已评论</van-button>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import qs from "qs";
import {apiHost,specfield} from "@/plugins/path";
import axios from "@/plugins/axios";
export default {
    data(){
        return{
            list:[]
        }
    },
    created(){
        try{
            let comshop = JSON.parse(sessionStorage.getItem("comshop"));
            this.list = comshop;
            console.log(comshop,this.list);
        }catch(e){
            this.$toast(`${e}`)
        }
    },
    methods:{
        onClickLeft(){
            this.$router.replace({
                name:"orders",
                params:{type:5}
            })
        },
        commentCl(o){
            sessionStorage.setItem("shopping", JSON.stringify(o));
            this.$router.push({
                name:"comments",
                params:{shopping_id:o.shopping_id}
            })
        }
    }
}
</script>
<style lang="scss" >
.tx-dx-cachecomments{
    min-height: 100vh;
    .cachecomments-list{
        li{
            background: #fff;
            padding: 12px;
            margin-bottom: 12px;
        }
        .item1{
            display: flex;
            img{
                width: 1.2rem;
                height: 1.2rem;
                display: block;
            }
            span{
                font-size: 13px;
                margin-left: 10px;
                text-align: justify;
            }
        }
        .item2{
            overflow: hidden;
            .van-button{
                height: 34px;
                float: right;
            }

        }
    }
}

</style>