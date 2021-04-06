<template>
<van-popup v-model="isShow" position="bottom" get-container="body" class="co-edit-region-picker" :close-on-click-overlay="false" @click-overlay="hideRegionFn">
    <div id="region-picker" >
        <div id="picker-panel" class="picker-panel" :style="{panelStyle}" ref="pcikerPanel">
            <div class="panel-header">
                <div :class="['ph-province ',currentRegionTab === 1 ? 'ph-active':'']" @click.stop="selectRegionTab(1)">
                    <template v-if="!+province_id"><span>请选择</span></template>
                    <template v-else><span>{{province}}</span></template>
                </div>
                <div :class="['ph-city ',currentRegionTab === 2 ? 'ph-active':'']" v-if="!!+province_id && !fl(province_id+'1')" @click.stop="selectRegionTab(2)">
                    <template v-if="!+market_id"><span>请选择</span></template>
                    <template v-else><span>{{market}}</span></template>
                </div>
                <div :class="['ph-district ',currentRegionTab === 3 ? 'ph-active':'']" v-if="!!+market_id" @click.stop="selectRegionTab(3)">
                    <template v-if="!area_id"><span>请选择</span></template>
                    <template v-else><span>{{area}}</span></template>
                </div>
                <div class="ph-cancel" @click="hideRegionFn">取消</div>
            </div>
            <div class="panel-regions">
                <van-cell-group v-if="currentRegionTab === 1" class="regions-p" id="region-selector-list-1">
                    <van-cell is-link v-for="(item, index) in provinces" :key="`province-${index}`" @click.stop="selectProvince(item, index)">
                        <template #title>
                            <span :class="[''+item.id === ''+province_id ? 'region-active' : '']">{{item.name}}</span>
                        </template>
                    </van-cell>
                </van-cell-group>
                <van-cell-group v-if="currentRegionTab === 2" class="regions-p" id="region-selector-list-2">
                    <van-cell is-link v-for="(item, index) in markets" :key="`city-${index}`" @click.stop="selectCity(item, index)">
                        <template #title>
                            <span :class="[''+item.id === ''+market_id ? 'region-active' : '']">{{item.name}}</span>
                        </template>
                    </van-cell>
                </van-cell-group> 
                <van-cell-group v-if="currentRegionTab === 3" class="regions-p" id="region-selector-list-3">
                    <van-cell is-link v-for="(item, index) in areas" :key="`city-${index}`" @click.stop="selectDistrict(item, index)">
                        <template #title>
                            <span :class="[''+item.id  === ''+area_id ? 'region-active' : '']">{{item.name}}</span>
                        </template>
                    </van-cell>
                </van-cell-group>
            </div>
        </div>
    </div>  
</van-popup>

</template>
<script>
let regions = {
        "1100001":[{ "id": 110000,
            "name": "北京市",
            "pid": 0}],
        "1200001":[{
            "id": 120000,
            "name": "天津市",
            "pid": 0
        }],
        "5000001": [{
            "id": 500000,
            "name": "重庆市",
            "pid": 0
        }],
    };
import {Y} from '@/plugins/store.js';
import {debounce} from 'lodash-es';
import axios from "@/plugins/axios";
import {apiHost,specfield} from "@/plugins/path";
export default {
    data(){
        return {
            isShowPo:false,
            currentRegionTab:1,
            panelStyle:{
                transform: "translatey(3.86rem)"
            },
            province_id:0,
            province:"",
            provinces:null,
            market_id: 0,
            market: "",
            markets: null,
            area_id: 0,
            area: "",
            areas: null,
            provincesLoaded: false,
            citiesLoaded: false,
            districtsLoaded: false
        }
    },
    props:{
        isShow:{
            type: Boolean,
            default: false
        },
        reglist:{},
    },
    // watch:{
    //     isShow(o,x){
    //         // console.log('2222')
    //         if(o){
    //             !this.reglist.id ? this.onAddressInfoLoaded() : this.onEdtressInfoLoaded()
    //        }
    //     } 
    // },
    created(){
        let that = this;
        that.selectCity = debounce(that.selectCity,500,{leading:true,trailing:false});
        that.selectProvince = debounce(that.selectProvince,500,{leading:true,trailing:false});
        that.selectCity = debounce(that.selectCity,500,{leading:true,trailing:false});
        that.selectDistrict = debounce(that.selectDistrict,500,{leading:true,trailing:false});
        that.selectRegionTab = debounce(that.selectRegionTab,500,{leading:true,trailing:false});
    },
    methods:{
        fl(e) {
            return Y.includes(e)
        },
        resgionsAPI(params){
            // 地址接口
            return axios.get(`${apiHost}/getCity`,{params})
        },
        onEdtressInfoLoaded(){
            // 编辑地址
            let that = this;
            console.log(that.reglist)
            let province_id = that.reglist.province_id;
            let market_id = that.reglist.market_id;
            let area_id = that.reglist.area_id;
            let province = that.reglist.province;
            let market = that.reglist.market;
            let area = that.reglist.area;
            that.market = market;
            that.area = area;
            that.province = province;
            that.province_id = province_id;
            that.market_id = market_id;
            that.area_id = area_id;
            that.selectRegionTab(3);
            // if(regions.hasOwnProperty(province_id) && regions.hasOwnProperty(market_id)){
            //     that.citys = regions[province_id];
            //     that.districts = regions[market_id];
            //     return ;
            // }
            const toast1 = that.$toast.loading({
                duration: 0,
                message: '省市加载中...',
                forbidClick: true,
            });
            if(that.fl(province_id+'1')){
                Promise.all([that.resgionsAPI({id:0}),that.resgionsAPI({id: province_id})]).then((res)=>{
                    let [resgion1,resgion2] = res;
                    let data1 = resgion1.data;
                    let data2 = resgion2.data;
                    if(data1.status === 1 && data2.status===1){
                        that.provinces = data1.info;
                        that.areas = data2.info;
                        regions[province_id] = data2.info;
                        
                    }else{
                        that.$toast({
                            message,
                            forbidClick: true,
                        })
                    }
                    toast1.clear();
                })
            }else{
                Promise.all([that.resgionsAPI({id:0}),that.resgionsAPI({id: province_id}),that.resgionsAPI({id:this.market_id})]).then((res)=>{
                    let [resgion1,resgion2,resgion3] = res;
                    let data1 = resgion1.data;
                    let data2 = resgion2.data;
                    let data3 = resgion3.data;
                    if(data1.status === 1 && data2.status===1 && data3.status==1){
                        that.provinces = data1.info;
                        that.markets = data2.info;
                        regions[province_id] = data2.info;
                        that.areas = data3.info;
                        regions[market_id] = data3.info;
                        
                    }else{
                        that.$toast({
                            message,
                            forbidClick: true,
                        })
                    }
                    toast1.clear();
                })
            }
 
        },
        onAddressInfoLoaded() {
            // 新增地址
            let that = this;
            let reglist = that.reglist;
            
            if(!reglist.province_id){
                // 如果省份不存在 跳用ajax，清空市县，tab重置
                that.province_id = 0;
                that.market_id = 0;
                that.area_id = 0;
                that.selectRegionTab(1);
                if(regions.hasOwnProperty('provinces')){
                    that.provinces = regions['provinces'];
                return ;}
                const toast1 = that.$toast.loading({
                    duration: 0,
                    message: '省份加载中...',
                    forbidClick: true,
                });
                that.resgionsAPI({id:0}).then((res)=>{
                    let {data} = res;
                    let {status, info, message} = data;
                    if(status === 1){
                        that.provinces = info;
                        regions['provinces'] = info;
                    }else{
                        that.$toast(message)
                    }
                    toast1.clear();
                })
            }else{
                // 存现直接展示区县
                that.selectRegionTab(3);
            }
        },
        selectProvince(item, index){
            console.log(regions)
            let that = this;
            // let provinceObj = item;
            if(item){
                that.market_id = 0;
                that.area_id = 0;
                let province = item.name;
                let province_id = item.id;
                that.province = province;
                that.province_id = province_id;

                let s = province_id+"1";
                // 缓存禁止每次都会请求接口
                if(regions.hasOwnProperty(province_id)){
                     that.fl(s) ? that.selectCity(regions[s][0]) :(that.markets = regions[province_id],that.selectRegionTab(2));
                return ;}
                
                if(that.fl(s)){
                    that.selectCity(regions[s][0]);
                    return ;
                }
                const toast1 = that.$toast.loading({
                    duration: 0,
                    message: '城市加载中...',
                    forbidClick: true,
                });
                that.resgionsAPI({id: province_id}).then((res)=>{
                    let {data} = res;
                    let {status, info, message} = data;
                    if(status === 1){
                        that.markets = info;
                        regions[province_id] = info;
                        that.selectRegionTab(2) ;
                    }else{
                        that.$toast(message)
                    }
                    toast1.clear();
                })
            }
        },
        selectCity(item, index){
            let that = this;
                that.area_id = 0;
                let market =  item.name;
                let market_id = item.id;
                that.market = market;
                that.market_id  = market_id;
                
            if(regions.hasOwnProperty(market_id)){
                that.selectRegionTab(3);
                that.areas = regions[market_id];
            return ;}
            const toast1 = that.$toast.loading({
                duration: 0,
                message: '区镇加载中...',
                forbidClick: true,
            });
            that.resgionsAPI({id: market_id}).then((res)=>{
                let {data} = res;
                let {status, info, message} = data;
                if(status === 1){
                    that.areas = info;
                    regions[market_id] = info;
                    that.selectRegionTab(3);
                }else{
                    that.$toast(message)
                }
                toast1.clear();
            })
        },
        selectDistrict(item, index){
            this.area_id = item.id;
            this.area = item.name;
            this.$emit('onHideRegionFn',{province_id:this.province_id,market_id:this.market_id,area_id:this.area_id,province:this.province,market:this.market,area:this.area})
        },
        hideRegionFn(e){
            this.$emit('isShow',false)
        },
        selectRegionTab(e){
            let that = this;
            that.currentRegionTab = e;
        }
    }
}
</script>
<style lang="scss">
.co-edit-region-picker{
    height: 6rem;

    overflow: inherit;
    .panel-header{
       width: 100%;
        height: .7rem;
        position: relative;
        border-bottom: 1px solid #ededed;
        font-size: 0;
        > div{
            display: inline-block;
            height: 100%;
            margin-left: .18rem;
            line-height: .7rem;
            span{
                color: #151516;
                display: inline-block;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                max-width: 1rem;
                font-size: 14px;
            }
        }
        .ph-active{
            border-bottom: 2px solid #e02e24;
        }
        .ph-cancel{
            position: absolute;
            right: .18rem;
            color: #9c9c9c;
            font-size: 14px;
            line-height: .7rem;
        }
    }
    .panel-regions{
        width: 100%;
        height: 100%;
        .region-active {
            color: #e02e24;
        }
        .regions-p{
            width: 100%;
            height: 5.3rem;
            overflow: scroll;
            -webkit-overflow-scrolling: touch;
        }
    }

}

</style>