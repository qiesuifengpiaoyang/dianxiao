<template>

    <div class="tx-dx-index">
        <div class="css-in-hed">
            <van-sticky>
                <van-button type="primary">基础用法</van-button>
            </van-sticky>
            <div class="lb">
                <div class="" style="background-image: url('https://img30.360buyimg.com/mobilecms/jfs/t1/130513/24/6814/24930/5f32452bE25f6606c/7f88d0f26b5016d9.jpg');"></div>
            </div>
        </div>
        <div class="fstp-mark">
            <div class="banner-swiper-box" style="background:rgb(78, 50, 46)">
                <van-swipe @change="onChange" autoplay="3000" class="css-in-swiper">
                    <van-swipe-item v-for="(item, index) in listswiper" :key="index" >
                        <a href="javascript:;">
                            <img :src="item.url" :alt="item.text">
                        </a>
                    </van-swipe-item>
                    <template #indicator>
                        <div class="custom-indicator">
                            <span>
                                {{ current + 1 }}/4
                            </span>
                        
                        </div>
                    </template>
                </van-swipe>
                <div class="ft-svg">
                </div>
            </div>
            
            <van-grid :gutter="10" class="css-in-list-circle" icon-size="100%" :border="false" column-num="5">
                <van-grid-item v-for="(item, index) in listch" :key="index" :icon="item.url" :text="item.text" />
            </van-grid>
            
        </div>
        
        
        <div class="css-in-list-circle0">
            <div v-for="(item, index) in listah" :key="index">
                <img :src="item.url" :alt="item.text">
                <div class="line" v-if="index < listah.length-1"></div>
            </div>
        </div>
        <div>
            
        </div>
    <div  style="background:#000"></div>


    






    <Footer @onFvtabCl="onFvtabCl" />
    </div>
</template>
<script>
import Footer from '@/components/footer.vue'
export default {
    data(){
        return{
            current: 0,
            listswiper:[{
                url:'https://img30.360buyimg.com/jddjadvertise/jfs/t1/111928/10/14192/79120/5f2ba2f9E9581bad3/bb2219537fd4dad4.png',
                text:''
            },{
                url:'https://img30.360buyimg.com/mobilecms/jfs/t1/134783/8/6836/264558/5f35f28aEb3451ce0/32f23abced9af656.png',
                text:''
            },{
                url:'https://img30.360buyimg.com/jddjadvertise/jfs/t1/129069/20/8347/188233/5f2276a0E057d61db/28e9abeebf75e863.png',
                text:''
            }],
            listch:[{
                url:'https://img30.360buyimg.com/mobilecms/jfs/t1/110355/36/3573/7822/5e12fdadEddc69a75/709e7b81b039de24.png',
                text:'批发'
                },{
                url:'https://img30.360buyimg.com/mobilecms/jfs/t1/93109/40/9960/10139/5e12fe63Eccaacb36/1b74d332f526868f.png',
                text:'拼团'
                },{
                url:'https://img30.360buyimg.com/mobilecms/jfs/t1/93109/40/9960/10139/5e12fe63Eccaacb36/1b74d332f526868f.png',
                text:'幸运购'
                },{
                url:'https://img30.360buyimg.com/mobilecms/jfs/t1/103222/36/9831/8835/5e130149Ece00bda1/f107c39cabe5676d.png',
                text:'一元购'
                },{
                url:'https://img30.360buyimg.com/mobilecms/jfs/t1/93109/40/9960/10139/5e12fe63Eccaacb36/1b74d332f526868f.png',
                text:'转盘'
                },{
                url:'https://img30.360buyimg.com/mobilecms/jfs/t1/90395/11/9898/8772/5e1319ecE2a70bb80/9b0967954d11eb0b.png',
                text:'京东到家'
                }],
            listah:[{
                url:'https://img30.360buyimg.com/mobilecms/jfs/t1/109835/6/3520/7728/5e12d655E319cc259/358c4927153f21f5.png',
                text:'会员'
            },{
                url:'https://img30.360buyimg.com/mobilecms/jfs/t1/121308/5/8312/8363/5f23c23dEa98377fa/75ef463f99540244.jpg',
                text:'会员'
            },{
                url:'https://img30.360buyimg.com/mobilecms/jfs/t1/110957/5/7398/10584/5ec4a58fEe0aa9bb0/7c8732b6583e782e.png',
                text:'会员'
            }]
        }
    },
  components:{
    Footer
  },
  methods:{
    onChange(index) {
        this.current = index;
    },
    onFvtabCl(active){
      console.log(active,'app')
    }
  }
}
</script>
<style lang="scss">
.css-in-hed {
    display: none;
    .lb{
        position: absolute;
        z-index: -2;
    }
}
.fstp-mark{
    position: relative;
    overflow: hidden;
    .banner-swiper-box{
        overflow: hidden;
        position: relative;
        width: 100%;
        margin: 0 0 -1.3rem;
    }
    .css-in-swiper{
        .van-swipe-item{
            img{
                width: 100%;
                max-width: 100%;
                display: block;
            }
        }
        .custom-indicator{
            height: 10px;
            text-align: right;
            position: absolute;
            z-index: 3;
            left: 0;
            right: 0;
            bottom: 10px;
            text-align: left;
            font-size: 12px;

            span{
                margin-left: 12px;
                background: rgba(0, 0, 0,.2);
                border-radius: 10px;
                padding: 1px 10px;
                color: #fff;
            }
            
        }
    }
}

.css-in-list-circle{
    position: relative;
    z-index: 10;
    .van-grid-item__content{
        background-color: transparent;
        padding: 16px 0 0;
        span{
            color: rgb(0, 0, 0);
            font-family: "PingFangSC-Regular";
            font-size: 12px;
            line-height: 16px;
            
        }
    }
}
.css-in-list-circle0{
    margin: 12px;
    display: flex;
    overflow: hidden;
    border-radius: 10px;
    > div{
        position: relative;
        overflow: hidden;
        img{
            width: 100%;
            display: block;
        }
        .line{
            height: 20px;
            top: 22px;
            width: 1px;
            background-color: rgb(246, 246, 246);
            position: absolute;
            right: 0;
        }
    }
}
.ft-svg {
    position: relative;
    left: -20%;
    bottom: -.7rem;
    background: #fff;
    height: 1.2rem;
    width: 150%;
    border-top-left-radius: 100%;
    border-top-right-radius: 100%;
}
.ft-svg svg {
    display: block;
    position: absolute;
    bottom: -.10667rem;
    left: 0;
    z-index: 4;
    width: 100%;
    height: 100%;
    fill: #fff;
}
</style>
