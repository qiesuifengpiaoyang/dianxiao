<!--
$emit:onFvtabCl
$on:onFvtabCl
-->

<template>
    <van-tabbar route :value="active" active-color="#e02e24" inactive-color="#000">
        <van-tabbar-item icon="home-o" name="首页" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="apps-o" name="分类" to="/classification/6">分类</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o" name="购物车" to="/shopcat">购物车</van-tabbar-item>
        <van-tabbar-item icon="contact" name="个人中心" to="/personal">个人中心</van-tabbar-item>
        <van-tabbar-item icon="home-o"  @click="fh">同心台</van-tabbar-item>
    </van-tabbar>
</template>
<script>
export default {
    data(){
        return{
            // active:0
        }
    },
    
    props:{
        active:{
        }
    },
    methods:{
        fh(){
            console.log('返回同心台');
            window.location.href='/#/'
        }
        // fvtabCl(active){
        //     this.$emit('onFvtabCl', active)
        // }
    }
}
</script>
<style lang="scss" >

</style>