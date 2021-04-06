
<template>
    <div class="tx-dx-order">
        <div class="order-list-3">
            <van-nav-bar
            title="订单详情"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
            />
        </div>
        <div class="order-list-2">
            <div class="shopcat-address">
                <van-cell icon="location" class="sad" v-if="list.address">
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template #title>
                        <div>
                            <p>{{list.address.username}} {{list.address.mobile}}</p>
                            <p>{{list.address.province}} {{list.address.market}} {{list.address.area}}</p>
                            <p>{{list.address.address}}</p>
                        </div>
                    </template>
                </van-cell>
            </div>
            <div class="conbox" v-for="(op, index) in list.shop" :key="index">
                <div class="item1"><img :src="op.cover_img" alt=""></div>
                <div class="item2">
                    <p class="item2_1">{{op.title}}</p>
                    <p class="item2_2" v-if="!!as(op.spec)">{{as(op.spec)}}</p>
                    <!-- <p class="item2_3">¥{{op.spec.price}}</p> -->
                </div>
                <div class="item3">
                    <!-- <p class="item3_1">¥{{op.spec.price}}</p> -->
                    <p class="item3_2">x{{op.num}}</p>
                </div>
            </div>
            <div class="money">
                <span></span>
                <span class="item2">实付：<span>¥ {{list.pay_money}}</span></span>
            </div>
        </div>
        <ul class="order-list-1">
            <li v-if="!!list.pay_type">
                <div class="item1">支付方式：</div>
                <div>
                    <span>{{list.pay_type === 1 ? "线上支付" : "余额支付"}}</span>
                </div>
            </li>
            <li v-if="!!list.package">
                <div class="item1">物流公司：</div>
                <div>
                    <span>{{list.package}}</span>
                </div>
            </li>
            <li v-if="!!list.package_no">
                <div class="item1">快递单号：</div>
                <div class="item2">
                    <span>{{list.package_no}}</span>
                    <span class="item2_2 clipboardUrl" @click="clipboardFn">复制</span>
                </div>
            </li>
            <li v-if="list.pay_time">
                <div class="item1">下单时间：</div>
                <div>
                    <span>{{list.pay_time}}</span>
                </div>
            </li>
            <li v-if="list.send_time">
                <div class="item1">发货时间：</div>
                <div>
                    <span>{{list.send_time}}</span>
                </div>
            </li>
            <li v-if="list.take_time">
                <div class="item1">成交时间：</div>
                <div>
                    <span>{{list.take_time}}</span>
                </div>
            </li>
        </ul>
        <div class="clearorder" @click="clearorder" v-if="list.step === 2">取消订单</div>
        <van-submit-bar :price="list.pay_money*100" button-text="去支付" @submit="onSubmit" v-if="+list.step === 2 && !cancel"/>
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
            list:{},
            order_id:this.$route.params.order_id,
            cancel:'',
        }
    },
    mounted(){
        this.firstAPI();
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        clearorder(){
            let that = this;
            that.$dialog.confirm({
                message: '请您再确认一次',
            }).then(()=>{
                const toast1 = that.$toast.loading({
                    duration: 0,
                    message: '订单取消中...',
                    forbidClick: true,
                });
                axios.post(`${apiHost}/order/cancel`,qs.stringify({order_id:that.order_id,step:that.list.step}))
                    .then((res)=>{
                        toast1.clear();
                        let {data} = res;
                        let {status,message} = data;
                        let listarr;
                        if(status === 1){
                            that.cancel = 1
                        }
                        
                        that.$toast(`${message}`)
                    })
            })
        },
        onSubmit(){
            let that = this;
            const toast1 = that.$toast.loading({
                        duration: 0,
                        message: '支付中...',
                        forbidClick: true,
                    });
                    axios.get(`${apiHost}/order/pay`,{params:{order_id:that.order_id}})
                        .then((res)=>{
                            toast1.clear();
                            let {data} = res;
                            let {status,message,info} = data;
                            
                            if(status === 1){
                                window.location.href = info.direct_url;
                            //    if(info.has_pay === 1){
                            //         window.location.href = info.direct_url;
                            //     }else if(info.has_pay === 0){
                            //         that.$toast(`${message}`)
                            //         that.$router.replace({
                            //             name:"orders",
                            //             params:{type:3}
                            //         })// 支付成功待收货
                            //     } 
                                
                            }else{
                                that.$toast(`${message}`)
                            }
                            
                        })
        },
        clipboardFn(){
            let that = this;
            let clipboardUrl = new ClipboardJS('.clipboardUrl',{
                text:function(){
                    return that.list.package_no
                }
            });
            clipboardUrl.on('success', function(e){
                that.$toast({
                    message:'复制成功',
                    forbidClick:true
                });
                e.clearSelection();
                clipboardUrl.destroy();
            });
            clipboardUrl.on('error', function(e){
                that.$toast({
                    message:'该浏览器不支持自动复制',
                    forbidClick:true
                });
                clipboardUrl.destroy();
            });
        },
        as(o){
            let obj = [];
           Object.keys(o).map((i)=>{
               if(!specfield.includes(i)){
                  obj.push(o[i])
               }
           })
           return obj.join(',');
        },
        firstAPI(){
            let that = this;
            const toast1 = that.$toast.loading({
                duration: 0,
                message: '加载中...',
                forbidClick: true,
            });
            axios.post(`${apiHost}/order/detail`,qs.stringify({
                order_id:that.order_id
            }))
            .then((res)=>{
                let {data} = res;
                let {info, status, message} = data;
                toast1.clear();
                if(status === 1){
                    that.list = {...info};
                    that.cancel = info.cancel;
                }else{
                    that.$toast(`${message}`)
                }
            })
        },
    }
}
</script>
<style lang="scss" >
.tx-dx-order{
    min-height: 100vh;
    .clearorder{
        font-size: 16px;
        text-align: center;
        margin-top: 12px;
        background: #fff;
        height: 44px;
        line-height: 44px;
    }
    .order-list-3{
        font-size: 16px;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10;
        width: 100%;
        .van-nav-bar{
            height: .8rem;
            display: flex;
    align-items: center;
    justify-content: space-around;
    .van-nav-bar__text{
        height: .8rem;
        line-height: .8rem;
    }
        }
        background: #fff;
    }
    .order-list-2{
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
        
        .money{
            background: #fff;
            display: flex;
            justify-content: space-between;
            padding:12px;
            .item2{
                font-size: 12px;
                span{
                    font-size: 15px;
                    color: #e02e24;
                }
            }
        }
        .conbox{
            border-bottom: 1px solid #f4f4f4;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px;
            background: #fff;
            margin-top: 12px;
            .item3{
                color: #9c9c9c;
                align-self: baseline;
                font-size: 12px;
            }
            .item3_1{
                color: #151516;
                font-size: 13px;
            }
            .item2{
                flex: 1;
                align-self: baseline;
                padding: 6px;
                display: flex;
                flex-direction: column;
                height: 2rem;
            }
            .item2_1{
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .item2_2{
                margin-top: 5px;
                color: #9c9c9c;
                font-size: 12px;
                line-height: 1.2;
                height: 12px;
            }
            .item2_3{
                margin-top: 5px;
                color: #58595b;
            }
            .item1{
                width: 2rem;
                height: 2rem;
                img{
                    width: 2rem;
                    height: 2rem;
                    display: block;
                }
            }
        }
    }
    .order-list-1{
        background: #fff;
        font-size: 13px;
        color: #9c9c9c;
    margin-top: 12px;
        li{
            padding: 0 12px;
            display: flex;
            position: relative;
            height: .5rem;
            line-height: .5rem;
        }
        .item1{
            width: 1.5rem;
        }
        .item2{
            flex: 1;
            display: flex;
            position: relative;
            justify-content: space-between;
            align-items: center;
        }
        .item2_2{
            color: #58595b;
            border:1px solid #58595b;
            border-radius: 5px;
            font-size: 12px;
            padding: 2px 5px;
                line-height: initial;
        }
    }
    
}

</style>