<template>
    <div class="wxtransfer" v-cloak>
        <img src="../../public/static/img/pic_09.png" class="i_con_01">
        <div class="i_con_02_box">
            <img src="../../public/static/img/4.png" class="i_con_02">
        </div>
		
		<img src="../../public/static/img/pic_04.png" class="i_con_03">
		<div class="i_text">
			<p>就差一步啦~</p>
			<p>请点击右上角<img :src="icon5" alt=""></p>
			<p>选择<span>“{{ua}}”</span></p>
		</div>
		<img  :src="icon6" class="i_con_04">
    </div>
</template>
<script>
export default {
    data(){
        return {
            icon5 : require('../../public/static/img/pic_07.png'),
            icon6:require('../../public/static/img/pic_08.png'),
            ua:'“在浏览器中打开”',
        }
    },
    mounted(){
        document.title="同心台";
        if(this.ismobile()=="0"){

            this.icon5 = require('../../public/static/img/pic_05.png');
			this.icon6 = require('../../public/static/img/pic_06.png');
			this.ua = '在Safari中打开'
		}else{
            this.icon5 = require('../../public/static/img/pic_05.png');
			this.icon6 = require('../../public/static/img/pic_08.png');
			this.ua = '在浏览器中打开'
		}
    },
    methods:{
       
        ismobile(test){
			var u = navigator.userAgent, app = navigator.appVersion;
			if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
			 	if(window.location.href.indexOf("?mobile")<0){
				  	try{
					   	if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
					   		return '0';
					   	}else{
					   		return '1';
					   	}
				  	}catch(e){}
				}
			}else if( u.indexOf('iPad') > -1){
				return '0';
			}else{
				return '1';
			}
		},
    }
}
</script>
<style lang="scss" scoped>
    .wxtransfer{
		user-select: none;
        background: #fff;
        height: 100vh;
        overflow: hidden;
		position: relative;
	}
    .i_con_01{
        position: absolute;
        right: 0.2rem;
        top: 0;
        width: .8rem;
        height: .4rem;
        animation: opa .7s infinite;
	}
    .i_con_02_box{
      width: 3rem;
        height: 2rem;
        overflow: hidden;
        position: absolute;
        right: -0.85rem;
        top: 0;
    }
    .i_con_02{
        width: 4.93rem;
        position: absolute;
        left: -3.5rem;
        top: 0;
        max-width: initial;
	}
    	.i_con_03{
		width:100%;
		position: absolute;
		left:0rem;
		top:1.5rem;
	}
    @keyframes opa{
        99%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
    @-webkit-keyframes opa{
        99%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
    @media screen and (orientation: landscape) {  
  /*横屏 css*/  
	

	
	.i_text{
		position: absolute;
	    left: 0;
	    top: 2rem;
        font-size: 0.3rem;
	    letter-spacing: 0.5px;
        text-align: center;
        width: 100%;
	}
	
	.i_text>p:nth-of-type(1){
		color:#3f3f3f;
	}
	.i_text>p:nth-of-type(2){
		color:#000;
		font-weight: bolder;
	}
	.i_text>p:nth-of-type(2) img{
		display: inline-block;
		width:.4rem;
		margin-left: 0.2rem;
	}
	.i_text>p:nth-of-type(3){
		color:#000;
		font-weight: bolder;
	}
	.i_text>p:nth-of-type(3) span{
		color:#f22946;
	}
	.i_con_04{
		width:100%;
		margin:0 auto;
		position: absolute;
		left:4.7rem;
		/*//top:13.5rem;*/
		bottom:0;
		display: none;
	}
}  
@media screen and (orientation:portrait){
	
	

	
	.i_text{
		position: absolute;
	    left: 0;
	    top: 2.2rem;
        font-size: 0.4rem;
	    letter-spacing: 0.5px;
        text-align: center;
        width: 100%;
	}
	
	.i_text>p:nth-of-type(1){
		color:#3f3f3f;
	}
	.i_text>p:nth-of-type(2){
		color:#000;
		font-size: .4rem;
		font-weight: bolder;
        margin: .2rem 0;
	}
	.i_text>p:nth-of-type(2) img{
		display: inline-block;
		width:.6rem;
		margin-left: 0.3rem;
	}
	.i_text>p:nth-of-type(3){
		color:#000;
		font-weight: bolder;
		font-size: 0.4rem;
	}
	.i_text>p:nth-of-type(3) span{
		color:#f22946;
	}
	.i_con_04{
		width:100%;
		margin:0 auto;
		position: absolute;
		left:0rem;
		top: 4.6rem;
	}
}


</style>