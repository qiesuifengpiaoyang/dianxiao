
<template>
    <div class="tx-dx-personal">
        <div class="per-header">
            <div class="info">
                <div class="avatar">
                    <img :src="icon_url" alt="" v-if="icon_url">
                    <div v-else></div>
                </div>
                <div class="name">
                    <p>{{name}}</p>
                    <p>{{mobile}}</p>
                </div>
                <div class="money" @click="moneylist">
                    <p class="money1">余额</p>
                    <p class="money2">{{money}}</p>
                </div>
            </div>
        </div>
        <div class="per-order">
            <div class="hed"><div>我的订单</div> <span @click="goToRoders(0)">查看全部<van-icon name="arrow" /></span></div>
            <van-grid :column-num="5" :border="false">
                <van-grid-item icon="completed" text="已完成" badge="" @click="goToRoders(1)"/>
                <van-grid-item icon="pending-payment" text="待付款" badge="" @click="goToRoders(2)"/>
                <van-grid-item icon="underway-o" text="待发货" badge="" @click="goToRoders(3)"/>
                <van-grid-item icon="logistics" text="待收货" badge="" @click="goToRoders(4)"/>
                <van-grid-item icon="thumb-circle-o" text="待评价" badge="" @click="goToRoders(5)"/>
            </van-grid>
        </div>

        <div class="per-list">
            <van-grid :column-num="5" :border="false">
                <van-grid-item icon="balance-pay" text="代金券" @click="couponcl"/>
                <van-grid-item icon="location-o" text="收货地址" @click="addressescl"/>
                <van-grid-item icon="bag-o" text="我的拼单" @click="bagocal"/>
                <!-- <van-grid-item icon="setting-o" text="设置" /> -->
            </van-grid>
        </div>

        <Footer active="个人中心"/>
    </div>
</template>
<script>
import qs from "qs";
import {apiHost,specfield} from "@/plugins/path";
import axios from "@/plugins/axios";
import ClipboardJS from 'clipboard';
import Footer from '@/components/footer.vue'
export default {
    data(){
        return{
            list:{},
            icon_url:sessionStorage.getItem('icon_url') ? `${window.location.host}${sessionStorage.getItem('icon_url')}` : '',
            name:`${!!sessionStorage.getItem("name") ? sessionStorage.getItem("name") : '同心台用户'}`,
            mobile:`${!!sessionStorage.getItem("mobile") ? sessionStorage.getItem("mobile") : '手机号'}`,
            money:0
        }
    },
    mounted(){
        console.log('确认修改2');
        this.firstAPI();
    },
    components:{
        Footer
    },
    methods:{
        firstAPI(){
            let that = this;
            const toast1 = that.$toast.loading({
                duration: 0,forbidClick: true 
            })
            axios.post(`${apiHost}/balance`).then((res)=>{
                toast1.clear();
                let {data} = res;
                let {status, info, message} = data;
                console.log(res);
                if(status === 1){
                    that.money = info.money;
                }else{
                    that.$toast(`${message}`)
                }
            })
        },
        couponcl(){
            this.$router.push({
                name:"coupon"
            })
        },
        addressescl(){
            this.$router.push({
                name:"addresses"
            })
        },
        goToRoders(n){
            this.$router.push({
                name: "orders",
                params:{type:n}
            })
        },
        bagocal(){
            this.$router.push({
                name: "makelist"
            })
        },
        moneylist(){
            this.$router.push({
                name:"balancelog"
            })
        }
    }
}
</script>
<style lang="scss" >
.tx-dx-personal{
    min-height: 100vh;
    .per-header{
        padding: 12px;
        background: #fff;
        font-size: 16px;
        .info{
            // display: flex;
            // align-items: center;
            height: 1.2rem;
                color: #58595b;
        }
        .avatar{
            width: 1.2rem;
            margin-right: .2rem;
            float: left;
            img{
                width: 100%;
                display: block;
                border-radius: 100%;
                object-fit: cover;
            }
            div{
                width: 1.2rem;
                height: 1.2rem;
                border-radius: 100%;
                background: #f4f4f4;
            }
        }
        .name{
            float: left;
            font-size: 14px;
            height: 1.2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            p{
                line-height: 1.8;
                &:last-child{
                    font-size: 13px;
                }
            }
        }
        .money{
            padding: 0 12px;
            height: 1.2rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            float: right;
            color: #58595b;
            .money2{
                color: #e02e24;
            }
        }
    }
    .per-order{
        background: #fff;
        padding: 12px 12px 0 12px;
        
        .hed{
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span{
                color: #999;
                font-size: 14px;
                display: flex;
                align-items: center;
            }
        }
        .van-grid-item__content{
            padding: 16px 0;
            color: #9c9c9c;
        }
        .van-grid-item__text{
            color: #9c9c9c;
        }
    }
    .per-list{
        margin-top: 12px;
        background: #fff;
        .van-grid-item__content{
            padding: 16px 0;
            color: rgba(250,133,70,1);
        }
        .van-grid-item__text{
            color:#58595b
        }
    }
    
}

</style>