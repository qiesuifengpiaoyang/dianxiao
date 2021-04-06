<template>
    <van-popup :value="showpop" class="scgood-plu-01" :overlay-style="{background:'rgba(0,0,0,0)'}" @click-overlay="clickoverlay">
        <ul>
            <li @click="gohref(1)">
                <van-icon name="home-o" />
                <span>首页</span>
            </li>
            <li @click="gohref(2)">
                <van-icon name="shopping-cart-o" />
                <span>购物车</span>
            </li>
            <li @click="gohref(3)">
                <van-icon name="apps-o" />
                <span>分类搜索</span>
            </li>
            <li @click="gohref(4)">
                <van-icon name="contact" />
                <span>个人中心</span>
            </li>
        </ul>
    </van-popup>
</template>
<script>
export default {
    data(){
        return {
        }
    },
    props:{
        showpop:{}
    },
    mounted(){

    },
    methods:{
        gohref(n){
            if(n === 1){
                this.$router.replace({
                    name:"index2"
                })
            }else if(n === 2){
                this.$router.replace({
                    name:"shopcat"
                })
            }else if(n === 3){
                this.$router.replace({
                    name:"classification",
                    params:{type:1}
                })
            }else if(n === 4){
                this.$router.replace({
                    name:"personal"
                })
            }
        },
        clickoverlay(){
            this.$emit("update:showpop", false)
        }
    }

}
</script>
<style lang="scss">


</style>
