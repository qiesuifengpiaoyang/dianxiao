
<template>
    <div class="tx-dx-coupon">
        
        <van-nav-bar
        title="代金券"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        :border="false"
        class="ordertab"
        />
        <div v-if="pageshow">
            <ul class="couponlist-box"  v-if="list.length > 0">
                <li v-for="item in list" :key="item.id">
                    <div>
                        <p class="money">{{item.money}}<small>元</small></p>
                        <p class="expire" v-if="item.expire_time">已过期</p>
                    </div>
                    
                    <div class="grant">
                        发放时间：{{item.create_time}}
                    </div>
                </li>
            </ul>
            <van-empty description="无代金劵" v-else/>
        </div>
        
        
        
        
        
    </div>
</template>
<script>
import qs from "qs";
import {apiHost,specfield} from "@/plugins/path";
import axios from "@/plugins/axios";
export default {
    data(){
        return{
            list:[],
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
        firstAPI(){
            let that = this;
            const toast1 = that.$toast.loading({
                duration: 0,
                message: '加载中...',
                forbidClick: true
            })
            axios.post(`${apiHost}/coupon`)
            .then((res)=>{
                toast1.clear();
                let {data} = res;
                let {info, status, message} = data;
                this.pageshow = true
                if(status === 1){
                   // that.list = [].concat(info)
                }else{
                    that.$toast(`${message}`)
                }
            })
        },
    }
}
</script>
<style lang="scss" >
.tx-dx-coupon{
    min-height: 100vh;
    .couponlist-box{
        padding-top: .8rem;
        font-size: 14px;
        li{
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #fff;
            margin-bottom: 12px;
            padding: 16px 12px;
            color:#9c9c9c ;
            .expire{
                color: #e02e24;
                font-size: 12px;
                line-height: 1.4;
            }
            .grant{

            }
            .money{
                font-size: 26px;
                color: #e02e24;
            }
            small{
                font-size: 10px;
                margin-left: 5px;
            }
        }
    }
    .ordertab{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        font-size: 16px;
        background: #fff;
        border-bottom: 1px solid #ccc;
        height: .8rem;
        z-index: 10;
        > div{
            display: flex;
            align-items: center;
            justify-content: space-around;
            height: .8rem;
            
        }
        .van-nav-bar__text,
        .van-icon-arrow-left,
        .van-icon-weapp-nav{
            color: #151516;
        }
        span{
            position: relative;
            height: .8rem;
            line-height: .8rem;
            &.on{
                &::after{
                    content:"";
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 2px;
                    background: #e02e24;
                }
            }
        }
    }
}

</style>