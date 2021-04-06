
<template>
    <div class="tx-dx-shoporder">
        <van-nav-bar
        title="确认订单"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
        class="fbpl"
        >
            <template #right>
                <van-icon name="weapp-nav" size="18" />
            </template>
        </van-nav-bar>
        <div style="height:1.12rem"></div>
        <div class="shopcat-address">
            <van-cell :icon="addressli.icon" is-link @click="shopcatadscl" class="sad">
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #title>
                    <div v-if="!addressli.province_id">手动添加收货地址</div>
                    <div v-else>
                        <p>{{addressli.name}} {{addressli.mobile}}</p>
                        <p>{{addressli.province}} {{addressli.market}} {{addressli.area}}</p>
                        <p>{{addressli.address}}</p>
                    </div>
                </template>
            </van-cell>
        </div>
        <ul class="shopcat-box">
            <li>
                <div class="img" :style="{backgroundImage:`url(${list.cover_img})`}"></div>
                <div class="con">
                    <div class="tit">{{list.title}}</div>
                </div>
                <div class="num">x{{list.num}}</div>
            </li>
        </ul>
        <div style="margin-top:12px"></div>
        <!-- 优惠券单元格/列表 -->
        <van-coupon-cell
        :coupons="list.coupon"
        :chosen-coupon="chosenCoupon"
        :border="false"
        @click="showList = true"
        class="yhj01"
        />
        <van-popup
        v-model="showList"
        round
        get-container="body"
        position="bottom"
        class="yhj0101-plu"
        >
        <van-coupon-list
            :show-count="false"
            :show-exchange-bar="false"
            :coupons="list.coupon"
            :chosen-coupon="chosenCoupon"
            @change="onChangeyhj"
        />
        </van-popup>
        <!--支付方式-->
        <div class="zffs01">
            <van-radio-group v-model="radiopay">
                <van-cell-group>
                    <van-cell :class="`p-${item.icon}`" :title="item.name" clickable @click="radiopay = item.id" :icon="item.icon" v-for="(item, index) in actionsPay" :key="index">
                        <template #right-icon>
                            <van-radio :name="item.id" />
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </div>

        <!-- <van-cell class="zffs01" is-link title="支付方式" @click="paymentShow = true" :value="selpaytext"/>
        <van-action-sheet class="zffs0101-plu" v-model="paymentShow" :actions="actionsPay" @select="onSelPay" /> -->
        <van-submit-bar :price="price" button-text="提交订单" :disabled="!radiopay || !address_id" @submit="onmakePay" />
    
        <tx-add-panel 
            :panelShow.sync="panelShow"
            :addpop="addressli"
            :is_edit="is_edit"
            @address_pop_fn="address_pop_fn"
            
        />
        <more-btn :showpop.sync="showpop"/>
    </div>
</template>
<script>
import Footer from '@/components/footer.vue'
import txAddPanel from '@/components/address/txAddPanel.vue';
import moreBtn from "@/components/morebtn.vue";
import qs, { parse } from "qs";
import {apiHost,specfield} from "@/plugins/path";
import axios from "@/plugins/axios";
import {store} from "@/plugins/store.js"
export default {
    data(){
        return{
            showpop:false,
            team_id:this.$route.query.team_id,
            yhj01:'有可用优惠卷',
            chosenCoupon:-1,
            chosenCouponVal:0,
            chosenCouponValId:0,
            showList:false,
            coupons:[],
            actionsPay:[/*{id:1,name:"微信",icon:"wechat"},*/{id:2,name:"支付宝", icon:"alipay"},{id:3,name:"余额支付", icon:"gold-coin"}],
            paymentShow:false,
            selpaytext:"请选择支付方式",
            selpayid:2,
            address_id:0,
            radiopay:2,
            price:0,
            total:0,
            list:{},
            addressArr:[],
            addressli:{
                icon:"add-square",
                icon1:"location",
                id:'',
                mobile:'',
                province:'',
                province_id:0,
                market:'',
                market_id:0,
                area:'',
                area_id:0,
                address:''
            },
            panelShow:false,
            addpop:{},
            is_edit:true,
        }
    },
    props:{
        active:{
            type:Number,
            default:0
        }
    },
    components:{
        Footer,
        txAddPanel,
        moreBtn
    },
    mounted(){
        this.firstAPI();
    },
    methods:{
        onClickLeft(){
            if(this.$route.params.ref_page === "addresses"){
                this.$router.go(-2)
            }else{
                this.$router.go(-1)
            }
        },
        onClickRight(){
            this.showpop = !this.showpop
        },
        shopcatadscl(){
            if(this.addressli.province_id && this.addressArr.length > 0){
                this.$router.push({
                    path:"/addresses",
                    query:{
                        ref_page:"shoporder",
                        address_id:this.addressli.id,
                        shopping_id:this.shopping_id
                    }
                })
            }else{
                // 新增
                this.panelShow =!this.panelShow;
                this.is_edit = false;
            }
            
        },
        address_pop_fn(n, index){
            let that = this;
            that.addressli.icon = "location";
            that.addressli = Object.assign({}, that.addressli, n)
            that.address_id = n.id
            // if(this.is_edit){
            //     this.$set(this.list, index, n);
            // }else{
            //     this.list.push(n)
            // }
            // store.setAddressListAction(that.list);
        },
        onSelPay(a,n){
            this.paymentShow = !this.paymentShow;
            this.selpayid = a.id;
            this.selpaytext = a.name
        },
        onChangeyhj(index){
            this.showList = false;
            this.chosenCoupon = index;
            console.log(index)
            if(index > -1){
                this.chosenCouponVal = this.list.coupon[index].money;
                this.chosenCouponValId = this.list.coupon[index].id;
                this.price = (this.price/100 - this.chosenCouponVal)*100;
            }else{
                this.price = this.total;
                this.chosenCouponValId = 0;
            }
            
        },
        specv(o){
            let filarr = specfield;
            let arr = [];
            Object.keys(o).map((i, index)=>{
                if(!filarr.includes(i)){
                    arr.push(o[i]) 
                }
            })
            return arr.join()
        },
        firstAPI(){
            let that = this;
            const toast1 = that.$toast.loading({ duration: 0,forbidClick: true });
            Promise.all([
                axios.post(`${apiHost}/team/detail`,qs.stringify({
                        team_id:that.team_id
                    })),
                    axios.post(`${apiHost}/address`)
            ])
            .then((res)=>{
                toast1.clear();
                let [detaildata, addressdata] = res;
                let detaildobj = detaildata.data;
                let addressobj = addressdata.data;
                let message = '';
                if(detaildobj.status === 1){
                     let infoco = {...detaildobj.info};
                     infoco.coupon.map((item)=>{
                        item.value = item.money*100;
                        item.startAt = '';
                        item.endAt = '';
                        item.valueDesc = item.money;
                        item.condition = '满减条件';
                        item.unitDesc = '元';
                        item.name = ''
                    })
                    that.price = infoco.group_price*100;
                    that.list = infoco;
                }else if(detaildobj.status === 2){
                    // 去待支付
                    that.$router.replace({
                        name:"orders",
                        params:{type:2}
                    })
                }else{
                     that.$toast(`${detaildobj.message}`)
                }
                if(addressobj.status === 1){
                    that.addressArr = Array.isArray(addressobj.info) ? addressobj.info : [];
                    store.setAddressListAction(addressobj.info);
                }else{
                    console.log(addressobj.message)
                }
            })
        },
        onmakePay(){
            let that = this;
            const toast1 = that.$toast.loading({ duration: 0,forbidClick: true });
            axios.post(`${apiHost}/team/pay`,qs.stringify({
                order_id:that.list.order_id,
                address_id:that.address_id,
                coupon_id:that.chosenCouponValId,
                pay_type:that.radiopay === 3 ? 2 : 1
            }))
            .then((res) => {
                let {data} = res;
                let {status, message, info} = data;
                if(status === 1){
                    if(info.has_pay === 1){
                        window.location.href = info.direct_url;
                    }else if(info.has_pay === 0){
                        that.$toast(`${message}`)
                        that.$router.replace({
                            name:"orders",
                            params:{type:3}
                        })// 支付成功待收货
                    } 
                }else{
                    toast1.clear();
                    that.$toast(`${message}`)
                }
            })
        }
    }
}
</script>
<style lang="scss" >
.tx-dx-shoporder{
    min-height: 100vh;
    padding-bottom: 2rem;
    font-size: 14px;
    .yhj01,.zffs01{
        
        background: #fff;
    }
    .zffs01{
        margin-top: 12px;
        .van-icon-wechat{
            color: rgba(37,171,17,1);
            font-size: 20px;
        }
        .van-icon-gold-coin{
            color: #e02e24;
            font-size: 20px;
        }
        .van-icon-alipay{
            color: rgba(18,154,234,1);
            font-size: 20px;
        }
    }
    .shopcat-box{
        margin-top: 12px;
        background: #fff;
        li{
            padding: 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #9c9c9c;
            
            .tit{
                font-size: 13px;
                color: #151516;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-bottom: 5px;
            }
            .con{
                align-self: baseline;
                flex: 1;
                padding: 0 10px;
                min-width: 0;
            }
            .img{
                width: 1.4rem;
                height: 1.4rem;
                background-position: center;
                background-size: cover;
            }
            .num{
                font-size: 12px;
            }
            .cfig{
                font-size: 12px;
            }
        }
    }
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
        &::after{
            content: "";
            position: absolute;
            display: inline-block;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 2px;
            background-position: 0 0;
            background-size: cover;
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABGUAAAAGCAMAAABdG9OLAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAPUExURf///xWn1tojP+2Rn4rT6zXCHwQAAABPSURBVFjD7dDBCQAhAAPBeNp/zZZwIgR8TAoIw2b8bOVo87vZPDtf42bk5ORPyCM+OTl5VR7xycnJq/KIT05OXpVHfHJy8qo84pOTk1flG/eHGIuy2bRIAAAAAElFTkSuQmCC);
        }
    }
}
.yhj0101-plu{
    height: 90%; 
    padding-top: 4px;
    .van-coupon__condition{
        display: none;
    }
    .van-coupon__valid{
        display: none;
    }
    .van-coupon__body{
        min-height: 20px;
    }
}
// .zffs0101-plu{
//     button{
//         border-top: 1px solid #f4f4f4;
//         &:first-child{
//             border-top: 0;
//         }
//     }
// }
</style>