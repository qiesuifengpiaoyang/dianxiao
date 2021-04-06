<template>
    <div class="makegroup-wrapper">
        <van-nav-bar
        title="拼团详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        class="fbpl"
        >
            <template #right>
                <van-icon name="share" @click="onShare"/>
            </template>
        </van-nav-bar>
        <van-swipe class="swiper-n2">
            <van-swipe-item v-for="(item, index) in list.banner" :key="index">
                <a href="javascript:;">
                    <img :src="item" :alt="item.title">
                </a>
            </van-swipe-item>
        </van-swipe>
        <!-- <img class="cover_img" :src="list.cover_img" :alt="list.title" width="100%"> -->
        <p class="title">{{list.title}}</p>
        <p class="price">
            <span>¥{{list.group_price}}<del>{{list.price}}</del></span>
            
        </p>
        <div class="price-box">
            <p class="tit">拼团信息</p>
            <p class="price1">拼团数量：{{list.price_num}}</p>
            <p class="price1">开团人数：{{list.open_num}}</p>
            <p class="price1">拼团人数：{{num}}/{{list.need_num}}</p>
            
        </div>
        <div class="member">
            <div class="head_img_list" v-for="(item, index) in list.member" :key="index" :style="{height:imgheight}" @click.stop="setDeputyLeader(item)">
                <img :src="item.head_img" alt="" v-if="item.head_img">
                <div v-else class="head_img">
                    {{item.first || "同"}}
                </div>
                <van-icon class="icon-clear" name="clear" v-if="item.mime" @click.stop="quit(item)"/>
            </div>
            <div class="head_img_list" v-for="it in memberk" :key="`${it}k`" :style="{height:imgheight}">
                <div class="head_img">
                    <van-icon name="plus" class="icon-plus" @click.stop="joinTheGroup"/>
                </div>
            </div>
        </div>
        <div class="makebtn" @click="open" v-if="level === 1">开团</div>
        <van-action-sheet v-model="show" :actions="actions" @select="onSelect"  cancel-text="取消"/>
        <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
          @select="onSelectShare"
        />
        
        <van-popup v-model="showcanvasrq" get-container="body" >
            <canvas id="canvasrq"></canvas>
        </van-popup>
    </div>
</template>
<script>
import qs from "qs";
import {apiHost, specfield} from "@/plugins/path";
import axios from "@/plugins/axios";
import ClipboardJS from 'clipboard';
import qrcode from 'qrcode';
export default {
    data(){
        return {
            showcanvasrq:false,
            show:false,
            showShare: false,
            list:{},
            team_id:this.$route.params.team_id,
            imgheight:0,
            num:0,
            level:0,
            memberk:0,
            deputy_leader:0,
            open_num:0,
            actions: [],
            options: [
                [
                { name: '复制链接', icon: 'link',id:1 ,className:"clipboardUrl"},
                { name: '二维码', icon: 'qrcode',id:2,className:"rqUrl" },
                ],
            ],
        }
    },
    created(){
        this.imgheight = (window.screen.width-34)/5+"px";
    },
    mounted(){
        this.detail();
        
    },
    methods:{
        onShare(){
            this.showShare = !this.showShare
        },
         onSelectShare(option) {
             let that = this;
             if(option.id === 1){
                 that.$nextTick(()=>{
                     let clipboardUrl = new ClipboardJS('.clipboardUrl',{
                        text:function(){
                            return window.location.href
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
                 })
                 
             }else if(option.id === 2){
                 that.showcanvasrq = true;
                 that.$nextTick(()=>{
                     var canvas = document.getElementById('canvasrq')
                    qrcode.toCanvas(canvas, `${window.location.href}`,{width:200,margin:2}, function (error) {
                    if (error) console.error(error)
                        console.log('success!');
                    })
                 })
             }
            that.showShare = false;
        },
        onSelect(item) {
            this.show = false;
            this.leadercl(item);
        },
        open(){
            let that = this;
            if(that.list.member.length >= that.open_num){
                const toas1 = that.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                })
                axios.post(`${apiHost}/team/open`,qs.stringify({team_id:that.team_id})).then((res) =>{
                    let {data} = res;
                    let {status, message, info} = data;
                    toas1.clear();
                    that.$toast(`${message}`)
                    if(status === 1){
                        setTimeout(() => {
                            that.$router.replace({
                                path:"/makeOrder",
                                query:{team_id:that.team_id}
                            })
                        }, 300);
                        
                    }
                })
            }else{
                that.$toast("开团人数不足")
            }
            
        },
        leadercl(o){
            let that = this;
            let url;
            if(o.action === 3){
                url = "/team/cancelDeputyLeader";
            }else if(o.action === 2){
                let levelnum = 0;
                that.list.member.map((item)=>{
                   levelnum = item.level + levelnum;
                });
                if(levelnum > that.deputy_leader){
                    that.$toast("副团长人数已到上限")
                    return;
                }
                url = "/team/setDeputyLeader";
            }
            const toas1 = that.$toast.loading({
                duration: 0,
                forbidClick: true,
            })
            axios.post(`${apiHost}${url}`,qs.stringify({order_id:that.list.order_id})).then((res) =>{
                let {data} = res;
                let {status, message, info} = data;
                toas1.clear();
                that.$toast(`${message}`)
                if(status === 1){
                    that.list.member = that.list.member.map((i)=>{
                        if(i.order_id === o.order_id){
                            i.level = o.action
                        }
                    })
                }
            })
        },
        onClickLeft(){
            this.$router.replace({
                name:"makelist",
            })
        },
        detail(){
           let that = this;
            const toas1 = that.$toast.loading({
                duration: 0,
                message:"加载中...",
                forbidClick: true,
            })
            axios.post(`${apiHost}/team/detail`,qs.stringify({team_id:that.team_id})).then((res) =>{
                let {data} = res;
                let {status, message, info} = data;
                toas1.clear();
                if(status === 1){
                    let need_num = info.need_num;
                    // info.member=[{
                    //     order_id:19,
                    //     first: "丽",
                    //     head_img: null,
                    //     level: 1,
                    //     mime: 1,
                    //     mobile: "13857086288",
                    //     username: "丽娅1",
                    // },{
                    //     order_id:14,
                    //     first: "是",
                    //     head_img: "http://test.tongxintailm.com/upload/2020_09_01/5f4dee3b40e23433.jpg",
                    //     level: 2,
                    //     mime: 0,
                    //     mobile: "13857086288",
                    //     username: "丽娅1",
                    // },{
                    //     order_id:12,
                    //     first: "人",
                    //     head_img: "http://test.tongxintailm.com/upload/2020_09_01/5f4dee3b40e23433.jpg",
                    //     level: 3,
                    //     mime: 0,
                    //     mobile: "13857086288",
                    //     username: "丽娅1",
                    // },{
                    //     order_id:11,
                    //     first: "是",
                    //     head_img: "http://test.tongxintailm.com/upload/2020_09_01/5f4dee3b40e23433.jpg",
                    //     level: 2,
                    //     mime: 0,
                    //     mobile: "13857086288",
                    //     username: "丽娅1",
                    // },{
                    //     order_id:2,
                    //     first: "人",
                    //     head_img: "",
                    //     level: 3,
                    //     mime: 0,
                    //     mobile: "13857086288",
                    //     username: "丽娅1",
                    // },{
                    //     first: "人",
                    //     level: 3,
                    //     mime: 0,
                    //     mobile: "13857086288",
                    //     username: "丽娅1",
                    // }];
                    that.open_num = info.open_num;
                    that.deputy_leader = info.deputy_leader;
                    that.level = info.level;
                    let now_num = Array.isArray(info.member) ? info.member.length : 0;
                    that.memberk =  need_num - now_num;
                    that.num = info.num;
                    that.list = {...info}
                }else{
                    that.$toast(`${message}`)
                }
            }) 
        },
        filtername(o){
                let title = o || "同";
                return title.substring(0,1)
        },
        setDeputyLeader(o){
            console.log(o)
            if(o.mime === 1){
                return 
            }else if(this.level === 1){
                let obj = {};
                let arr = []
                 obj.order_id = o.order_id
                if(o.level === 2){
                    obj.name="取消副团长";
                    obj.action = 3;
                }else if(o.level ===3 ){
                    obj.name = "设置副团长";
                    obj.action = 2;
                }
                arr.push(obj)
                this.actions = arr;
                this.show =true
            }
        },
        joinTheGroup(){
            let that = this;
            let member = that.list.member;
            let mime = false;
            member.forEach((item)=>{
                if(item.mime){
                    mime = true
                }
            })
            if(mime){
                that.$toast("已参与拼团，请勿重复添加1")
                return ;
            }
            that.$dialog.confirm({
                message:"您确定要加入该拼团吗",
            }).then(()=>{
                const toas1 = that.$toast.loading({
                    duration: 0,
                    forbidClick: true,
                })
                axios.post(`${apiHost}/team/joinTheGroup`,qs.stringify({team_id:that.team_id})).then((res) =>{
                    let {data} = res;
                    let {status, message, info} = data;
                    toas1.clear();
                    if(status === 1){
                        that.list.member.push({order_id:info.order_id,mime:1, username:sessionStorage.getItem("name"), mobile:sessionStorage.getItem("mobile"), first:that.filtername(sessionStorage.getItem("name"))})
                    }else{
                        that.$toast(`${message}`)
                    }
                })
            });
        },
        quit(o){
            let that = this;
            let message = "";

            if(o.level === 1){
                message = "您是团长，确认取消团队吗？请您再确认一次"
            }else if(o.level === 2){
                message = "您是副团长，确认退出拼团吗？请您再确认一次"
            }else if(o.level === 3){
                message = "您是成员，确认退出拼团吗？请您再确认一次"
            }
            that.$dialog.confirm({
                    message,
                }).then(()=>{
                    const toas1 = that.$toast.loading({
                        duration: 0,
                        forbidClick: true,
                    })
                    axios.post(`${apiHost}/team/quit`,qs.stringify({order_id:that.list.order_id})).then((res) =>{
                        let {data} = res;
                        let {status, message, info} = data;
                        toas1.clear();
                        if(status === 1){
                            that.$router.replace({
                                name:"makelist",
                            })
                        }else{
                            that.$toast(`${message}`)
                        }
                    })
            });
            
        }
    }
}
</script>
<style lang="scss">
    .makegroup-wrapper{
        font-size: 12px;
        padding-top:.9rem;
        padding-bottom: 2rem;
        .swiper-n2{
            .custom-indicator{
                text-align: center;
                position: absolute;
                right: .12rem;
                bottom: .14rem;
                height: 20px;
                line-height: 20px;
                color: #fff;
                font-size: 12px;
                padding: 0 10px;
                border-radius: 5px;
                background-color: rgba(0,0,0,.3409);
            }
            .van-swipe-item{
                img{
                    display: block;
                    width: 100%;
                }
            }
        }
        .ordertab{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            .van-nav-bar__text{
                line-height: 1;
            }
        }
        .price-box{
            background: #fff;
            padding: 12px;
            margin-top: 12px;
            font-size: 14px;
            .tit{
                margin-bottom: 8px;
            }
            .price1{
                color: #9c9c9c;
                margin-bottom: 4px;
                font-size: 13px;

            }
        }
        #canvasrq{
            width: 200px;
            height: 200px;
        }
        .member{
            background: #fff;
            padding: 12px;
            overflow: hidden;
            margin-bottom: 12px;
            .head_img_list{
                width: 20%;
                float: left;
                padding: 5px;
                text-align: center;
                box-sizing: border-box;
                position: relative;
                img{
                    width: 100%;
                    height: 100%;
                    display: block;
                    border-radius: 100%;
                }
                .head_img{
                    border-radius: 100%;
                    background: #f4f4f4;
                    height: 100%;
                    font-size: .6rem;
                    color: #58595b;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .icon-plus{

                }
                .icon-clear{
                    position: absolute;
                    right: 0;
                    top: 0;
                    font-size: .4rem;
                }
            }
        }
        .makebtn{
            width: 80%;
            height: .7rem;
            line-height: .7rem;
            background: #e02e24;
            color: #fff;
            text-align: center;
            margin: 0 auto;
            border-radius: 5px;
        }
        .cover_img{
            display: block;
        }
        .title{
            padding: 12px;
            font-size: 13px;
            background: #fff;
        }
        .price{
            text-align: right;
            padding: 0 12px 10px 12px;
            font-size: 15px;
            background: #fff;
            color: #e02e24;
            del{
                font-size: 12px;
                margin-left: 6px;
            }
        }
        
    }
</style>