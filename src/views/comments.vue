
<template>
    <div class="tx-dx-comments">
        <van-nav-bar
        title="发表评价"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        class="fbpl"
        />
        <div style="height:1.12rem"></div>
        <div class="comments-box">
            <div class="item5">
                <img :src="cover_img" alt="">
                <span>{{title}}</span>
            </div>
            <!-- <div class="item4">
                <div class="item4-1">订单编号</div>{{shopping_id}}
            </div> -->
            <div class="item1">
                <div>综合评分</div>
                <van-rate v-model="star"  @change="onChangeRate"/>
                <div class="item1-1">{{star === 1 ? "差" : star === 2 ? "较差" : star === 3 ? "一般" : star === 4 ? "好" : star === 5 ?"很好" : '' }}</div>
            </div>
            <div class="item2">
                <van-field
                v-model="comment"
                rows="3"
                autosize
                type="textarea"
                maxlength="100"
                placeholder="亲，您对这个商品满意吗？您的评价会帮助我们选择更好的商品哦~"
                show-word-limit
                />
            </div>
            <div class="item3">
                <van-uploader v-model="fileList" :max-count="6" @delete="deleteApi" :after-read="uploadFileApi" :upload-text="uptxt" />
            </div>
        </div>
        <div class="com-btn" @click="combtn">提交评价</div>
    </div>
</template>
<script>
import qs from "qs";
import {apiHost,specfield} from "@/plugins/path";
import axios from "@/plugins/axios";
export default {
    data(){
        return{
            star:0,
            shopping_id:this.$route.params.shopping_id,
            comment:'',
            img:[],
            starVal:'',
            fileList:[],
            uptxt:'添加图片'
        }
    },
    created(){
        try{
            let shopping = JSON.parse(sessionStorage.getItem("shopping"));
            console.log(shopping);
            this.cover_img = shopping.cover_img;
            this.title = shopping.title;
        }catch(e){
            this.$toast(`${e}`)
        }
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        onChangeRate(v){
            this.star = v;
        },
        deleteApi(file){
            console.log(file)
            console.log(this.fileList)
            if(this.fileList.length === 0){
                this.uptxt = "添加图片"
            }else{
                this.uptxt = `${this.fileList.length}/6`
            }
        },
        uploadFileApi(file) {
            let that = this;
            file.status = 'uploading';
            file.message = '上传中...';
            let formdata = new FormData();
            formdata.append("img",file.file);
            axios.post(`${apiHost}/uploadImage`,formdata)
                .then((res)=>{
                    let {data} = res;
                    let {status, info} = data;
                    if(status === 1){
                        file.url = data.info.filename;
                        file.status = 'done';
                        file.message = '上传完成';
                    }else{
                        file.status = 'failed';
                        file.message = '上传失败';
                    }
                    if(that.fileList.length === 0){
                        that.uptxt = "添加图片"
                    }else{
                        that.uptxt = `${that.fileList.length}/6`
                    }
                    
                })
                .catch((e)=>{
                    file.status = 'failed';
                    file.message = '上传失败';
                })
        },
        combtn(){
            let that = this;
            const toast1 = that.$toast.loading({
                    duration: 0,
                    message: '提交...',
                    forbidClick: true
                });
            let img;
            let arr= [];
            that.fileList.map((item) => {
                arr.push(item.url)
            })
            axios.post(`${apiHost}/comment/add`,qs.stringify({shopping_id:that.shopping_id,comment:that.comment,img:arr.join(','),star:that.star}))
            .then((res)=>{
                toast1.clear();
                let {data} = res;
                let {info, status, message} = data;
                that.$toast(`${message}`)
                if(status === 1){
                    if(sessionStorage.getItem("comshop")){
                        let comshop = JSON.parse(sessionStorage.getItem("comshop"));
                        let comshoparr = [];
                        comshoparr =  comshop.map((item)=>{
                            if(item.shopping_id === that.shopping_id){
                                item.comment = 1;
                            }
                        })
                        sessionStorage.getItem("comshop",JSON.stringify(comshoparr))
                    }
                    that.$router.go(-1)
                }
                
            })
        }
    }
}
</script>
<style lang="scss" >
.tx-dx-comments{
    min-height: 100vh;
    .comments-box{
        background: #fff;
        padding: 12px;
        font-size: 14px;
        .item4{
            display: flex;
            margin-bottom: 12px;
            .item4-1{
                margin-right: 12px;
            }
        }
        .item5{
            display: flex;
            align-items: center;
            font-size: 13px;
            padding: 12px 0 24px 0;
            min-width: 0;
            img{
                width: .4rem;
                height: .4rem;
                display: block;
            }
            span{
                margin-left: 10px;
                flex: 1;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        .item1{
            display: flex;
            align-items: center;
            padding: 20px 0;
            border-top: 1px solid #f4f4f4;
            border-bottom: 1px solid #f4f4f4;
            .van-rate{
                margin: 0 12px;
                > div{
                    margin-right: 3px;
                }
            }
            .item1-1{
                font-size: 10px;
                color: #9c9c9c;
            }
        }
        .item2{
            .van-cell{
                padding: 0;
                textarea{
                    color: #151516;
                    padding: 6px 0;
                }
            }
        }
        .item3{
            margin-top: 12px;
            .van-uploader__upload{
                width: 1.6rem;
                height: 1.6rem;
                margin: 0;
            }
            .van-uploader__preview{
                // padding: 0 .1rem .1rem 0;
                &:nth-child(2n+4){
                    margin-right: 0;
                }
            }
            .van-uploader__upload-text,
            .van-uploader__upload-icon{
                color: #151516;
            }
            .van-uploader__upload{
                border: 1px dashed #e0e0e0;
                background: transparent;
            }
            .van-uploader__preview-image{
                width: 1.6rem;
                height: 1.6rem;
            }
        }
    }
    .com-btn{
        margin: 12px;
        font-size: 16px;
        color: #fff;
        background: #e02e24;
        text-align: center;
        height: 44px;
        border-radius: 8px;
        line-height: 44px;
    }
}

</style>