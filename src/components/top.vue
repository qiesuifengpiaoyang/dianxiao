<template>
    <van-button :class="['top-box',show? 'onc' : 'onb']" icon="arrow-up" type="primary" @click="jsToTop">顶部</van-button>
</template>
<script>
export default {
    data(){
        return {
            closeRequest:true,
            show:false,
        }
    },
    props:{
        classNc:{}
    },
    mounted(){
        let that = this;
        that.$nextTick(()=>{
            if(!!that.classNc){
                document.querySelector(`.${that.classNc}`).addEventListener('scroll', that.onScroll)
            }else{
                window.addEventListener('scroll', that.onScroll)
            }
        })
    },
  methods:{
        onScroll(){
            let that = this;
            let len;
            if(!!that.classNc){
                len = document.querySelector(`.${that.classNc}`)
            }else{
                len = document.documentElement
            }
            if(len.scrollTop >=300){
                that.show = true;
                that.closeRequest = true;
            }else{
                that.show = false;
                that.closeRequest = false;
            }
        },
        jsToTop(){
            let len;
            this.$nextTick(() => {
                this.closeRequest = true;

                if(!!this.classNc){
                    len = document.querySelector(`.${this.classNc}`)
                }else{
                    len = document.documentElement
                }
                len.scrollTop = 0
            });
        }
  }
}
</script>
<style lang="scss">
.top-box{
    display: block;
    width: .8rem;
    height: .8rem;
    position: fixed;
    right: 16px;
    bottom: 1.6rem;
    color: #58595b;
    background: #fff;
    text-align: center;
    z-index: 999;
    padding: 0;
    font-size: 12px;
    opacity: 0;
    transition: bottom .8s ease,opacity .6s ease;
    box-shadow: 0 0 4px 0 rgba(0,0,0,.1);
    border: 1px solid #e2e2e2;
    border-radius: 50%;
    .van-button__content{
        flex-direction: column;
        width: 100%;
    }
    span{
        font-size: 10px;
        display: inline-block;
        margin-left: 0!important;
        margin-top: -.01rem;
    }
    &.onb{
            bottom: -.76rem;
    opacity: 0;
    }
    &.onc{
        bottom: 1.6rem;
    opacity: 1;
    }
}
@keyframes bottom{
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}

</style>
