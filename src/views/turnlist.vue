
<template>
    <div class="tx-dx-turnlist">
            <van-nav-bar
            title="转盘列表"
            left-text="返回"
            left-arrow
            class="fbpl"
            @click-left="onClickLeft"
            />
        <div class="switchover">
            <span @click="switchover(1)">
                转盘
            </span>
            <span @click="switchover(0)">
                赚吧
            </span>
        </div>
        <div class="turnlist-box" v-if="zborzp">
            <ul>
                <li v-for="item in list" :key="item.id" @click="go(item)">
                    <p class="title">{{item.title}}</p>
                    <p class="money">总金额：{{item.money}}</p>
                    <p class="now_money">累计用户投入：{{item.now_money}}</p>
                    <p class="draw_money">已提取金额：{{item.draw_money}}</p>
                    <p class="open_time">开盘时间：{{item.open_time}}</p>
                    <van-icon name="arrow" class="arrow"/>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import qs from "qs";
import {apiHost,specfield,Host} from "@/plugins/path";
import axios from "@/plugins/axios";
import ClipboardJS from 'clipboard';
export default {
    data(){
        return{
            zborzp:true,//赚吧/转盘切换
            message:null,
            list:[]

        }
    },
    created(){
        console.log(specfield,'定位',Host);
    },
    mounted(){
        this.firstAPI();
    },
    methods:{
        switchover(val){
            if(val){
                this.zborzp = true;
            }else{
                this.zborzp = false
            }
        },
        go(o) {
            // console.log(parseInt(new Date(o.open_time).getTime()/1000), parseInt(new Date().getTime()/1000))
            let now = parseInt(new Date().getTime()/1000);
            let open = parseInt(new Date(o.open_time).getTime()/1000);
            if(open>now){
                this.$toast("未到开盘时间")
            }else{
                console.log(o.id);
                //21-5-8修改，记录一下turntables被废弃了，这也页面是干嘛的我也忘了^_^
                //先不删除吧
                //turntable后面增加个s
                //说的是turntable和大佬的关键字冲突了
                // this.$router.push({
                //     name:"turntables",
                //     params:{turntable_id:o.id}
                // })
                // `turntables?${o.id}`
                this.$router.push(`turntables?${o.id}`)
            }
        },
        onClickLeft(){
            this.$router.go(-1)
        },
        firstAPI(){
            let that = this;
            const toast1 = that.$toast.loading({
                duration: 0,
                forbidClick: true,
            });
            //转盘数据
            axios.post(`${apiHost}/turntable/list`)
            .then((res)=>{
                let {data} = res;
                let {info, status, message} = data;
                that.pageshow = true
                toast1.clear();
                console.log(info);
                if(status === 1){
                    that.list = [].concat(info)
                }else{
                    that.empty = true;
                    that.emptyText = message;
                }
            });
            //赚吧数据
        },
    }
}
</script>
<style lang="scss" >
.tx-dx-turnlist{
    min-height: 100vh;
    .switchover{
        padding-top: .9rem;
        font-size: 13px;
        background-color: #fff;
        // display: flex;
        // justify-content: space-around;
        &>span{
            display: inline-block;
            width: 50vw;
            text-align: center;
            padding: 10px 0;
            background-color: rgb(253, 228, 0);
            border-radius: 5px;
            overflow: hidden;
        }
    }
    .turnlist-box{
        // padding-top: .9rem;
        font-size: 13px;
        li{
             background: #fff;
             margin-bottom: 12px;
             padding: 12px;
             position: relative;
             color: #969799;
        }
        .title{
            font-size: 14px;
            text-align: justify;
            margin-bottom: 5px;
            color: #151516;

        }
        .arrow{
            position: absolute;
            right: 0;
            top: 50%;
            transform: translate3d(0, -50%, 0);
            font-size: .6rem;
            color: #969799;
        }
    }
    
}

</style>