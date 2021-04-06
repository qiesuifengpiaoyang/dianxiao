<template>
    <div :class="[className,'tx-dx-searchpla']">
        <div class="searchpla-box" @click="searchMaskCl">
            <van-icon name="search" />
            <span>搜索您需要的商品</span>
        </div>
        <search-mask 
            :show="searchMaskShow"
            @searchMaskCl="searchMaskCl"
            />
    </div>

</template>
<script>
import SearchMask from '@/components/searchMask.vue'
export default {
    data(){
        return {
            searchMaskShow: false
        }
    },
    props:{
        className:{
            default:''
        }
    },
    components:{
        SearchMask
    },
    methods:{
        searchMaskCl(){
            this.searchMaskShow = !this.searchMaskShow;
            // this.$emit('click')
        }
    }
}
</script>
<style lang="scss" scoped>
.tx-dx-searchpla{
    padding: 12px;
    background: #fff;
    overflow: hidden;
    .searchpla-box{
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        background-color: #ededed;
        height: .7rem;
        color: #9c9c9c;
        font-size: 14px;
        border-style: solid;
    }
}
</style>