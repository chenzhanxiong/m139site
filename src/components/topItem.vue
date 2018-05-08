<template>
	<div class="header" v-cloak>
		<div class="head-top">
			<div class="head-logo" @click="$emit('statistics','/')"><img src="../../static/images/logo.png"></div>
			<div class="head-weather">
				<span class="weather-num">{{headData.tempt}}°</span>
				<span class="weather-txt">{{headData.cityName}}<br/>{{headData.weatherDes}}</span>
				<span class="weather-bg" :class="headData.weatherImg"></span>
			</div>
		</div>
		<div class="head-search" v-if="baudusearch">
			<span class="secrch-logo"></span>
			<input type="text" :placeholder="baiduPlaceholder" v-model="baiduData">
			<span class="secrch-btn" @click="clickSeach">搜索</span>
		</div>
	</div>
</template>

<script>
	export default {
	  name: 'topItem',
	  data () {
	    return {
	      baiduData:'',
	      baiduPlaceholder:'',
	      searchData:'',
	      headData:{}
	    }
	  },
	  props:['baudusearch','dns'],
	  methods:{
	  	getBaiduData:function(){
	  		this.$http.post('/api/getConfigData.la',{
	  			module:'baiduSearch'
	  		},{emulateJSON:true}).then(res => {
	  			if(res.body.success){
	  				this.baiduPlaceholder = res.body.data[0].siteTxt;
	  				this.searchData = res.body.data[0];
	  			}
	  		},res => {
	  			console.log(res)
	  		})
	  	},
	  	clickSeach:function(){
	  		let searchWord = this.baiduData || this.baiduPlaceholder;
	  		let href = "http://m.baidu.com/s?word="+searchWord+"&from=1018910c";
	  		this.searchData.siteHref = href;
	  		this.$emit('statistics',this.searchData);
	  	},
	  	getWeatherData:function(){
	  		this.$http.post('/api/getWeatherData.la').then(res => {
	  			if(res.body.success){
	  				this.headData = res.body.data[0];
	  			}
	  		},res => {
	  			console.log(res)
	  		})
	  	}
	  },
	  mounted(){
	  	if(this.baudusearch){
	  		this.getBaiduData();
	  	}	
		this.getWeatherData();
	  }
	}
</script>

<style>
	.header{
		width: 100%;
		background: url(../../static/images/bg.png) no-repeat center center;
		background-size: 100% 100%;
		padding: 0 0.23rem;
		overflow: hidden;
	}
	.head-top{
		width: 100%;
		height: 1.3rem;
		padding-top: 0.4rem;
	}
	.head-logo{
		height: 0.44rem;
		float: left;
		overflow: hidden;
	}
	.head-logo img{
		height: 100%;
		display: block;
	}
	.head-weather{
		float: right;
		height: 0.46rem;
		color: #fff;
	}
	.head-weather span{
		float: left;
	}
	.weather-num{
		font-size: 0.54rem;
		line-height: 0.46rem;
		margin-right: 0.04rem;
	}
	.weather-txt{
		font-size: 0.23rem;
		line-height: 0.23rem;
		margin-right: 0.04rem;
		text-align: center;
	}
	.weather-bg{
		width: 0.46rem;
		height: 0.46rem;
		background: url(../../static/images/blue30.png) no-repeat;
		background-size: 15.36rem;
	}
	.head-search{
		width: 100%;
		height: 0.7rem;
		line-height: 0.74rem;
		margin-bottom: 0.5rem;
		background-color: rgba(255,255,255,0.8);
		border-radius: 0.03rem;
		position: relative;
	}
	.secrch-logo{
		float: left;
		width: 0.7rem;
		height: 0.7rem;
		background: url(../../static/images/search.png) no-repeat center center;
		background-size: 0.4rem 0.4rem;
	}
	.head-search input{
		height: 0.7rem;
		width: 100%;
		background: none;
		border: none;
		cursor: pointer;
		-webkit-appearance: none;
		float: left;
		position: absolute;
		left: 0;
		top: 0;
		padding: 0 0.7rem;
		color: #666;
		font-size: 0.26rem;
	}
	.secrch-btn{
		float: right;
		width: 0.9rem;
		font-size: 0.26rem;
		text-align: center;
		color: #666;
		position: absolute;
		right: 0;
		top: 0;
		cursor: pointer;
	}
	
	.weather-bg.d0 {
		background-position: 0 0
	}
	
	.weather-bg.d1 {
		background-position: -1.28rem 0
	}
	
	.weather-bg.d2 {
		background-position: -2.56rem 0
	}
	
	.weather-bg.d3 {
		background-position: -3.84rem 0
	}
	
	.weather-bg.d4 {
		background-position: -5.16rem 0
	}
	
	.weather-bg.d5 {
		background-position: -6.4rem 0
	}
	
	.weather-bg.d6 {
		background-position: -7.68rem 0
	}
	
	.weather-bg.d7 {
		background-position: -8.96rem 0
	}
	
	.weather-bg.d8 {
		background-position: -10.24rem 0
	}
	
	.weather-bg.d9 {
		background-position: 0 -1.28rem
	}
	
	.weather-bg.d00 {
		background-position: 0 0
	}
	
	.weather-bg.d01 {
		background-position: -1.28rem 0
	}
	
	.weather-bg.d02 {
		background-position: -2.56rem 0
	}
	
	.weather-bg.d03 {
		background-position: -3.84rem 0
	}
	
	.weather-bg.d04 {
		background-position: -5.12rem 0
	}
	
	.weather-bg.d05 {
		background-position: -6.4rem 0
	}
	
	.weather-bg.d06 {
		background-position: -7.68rem 0
	}
	
	.weather-bg.d07 {
		background-position: -8.96rem 0
	}
	
	.weather-bg.d08 {
		background-position: -10.24rem 0
	}
	
	.weather-bg.d09 {
		background-position: 0 -1.28rem
	}
	
	.weather-bg.d10 {
		background-position: -1.28rem -1.28rem
	}
	
	.weather-bg.d11 {
		background-position: -2.56rem -1.28rem
	}
	
	.weather-bg.d12 {
		background-position: -3.84rem -1.28rem
	}
	
	.weather-bg.d13 {
		background-position: -5.12rem -1.28rem
	}
	
	.weather-bg.d14 {
		background-position: -6.4rem -1.28rem
	}
	
	.weather-bg.d15 {
		background-position: -7.68rem -1.28rem
	}
	
	.weather-bg.d16 {
		background-position: -8.96rem -1.28rem
	}
	
	.weather-bg.d17 {
		background-position: -10.24rem -1.28rem
	}
	
	.weather-bg.d18 {
		background-position: 0 -2.56rem
	}
	
	.weather-bg.d19 {
		background-position: -1.28rem -2.56rem
	}
	
	.weather-bg.d20 {
		background-position: -2.56rem -2.56rem
	}
	
	.weather-bg.d21 {
		background-position: -3.84rem -2.56rem
	}
	
	.weather-bg.d22 {
		background-position: -5.12rem -2.56rem
	}
	
	.weather-bg.d23 {
		background-position: -6.4rem -2.56rem
	}
	
	.weather-bg.d24 {
		background-position: -7.68rem -2.56rem
	}
	
	.weather-bg.d25 {
		background-position: -8.96rem -2.56rem
	}
	
	.weather-bg.d26 {
		background-position: -10.24rem -2.56rem
	}
	
	.weather-bg.d27 {
		background-position: 0 -3.84rem
	}
	
	.weather-bg.d28 {
		background-position: -1.28rem -3.84rem
	}
	
	.weather-bg.d29 {
		background-position: -2.56rem -3.84rem
	}
	
	.weather-bg.d30 {
		background-position: -3.84rem -3.84rem
	}
	
	.weather-bg.d31 {
		background-position: -5.12rem -3.84rem
	}
	
	.weather-bg.d32 {
		background-position: -6.4rem -3.84rem
	}
	
	.weather-bg.d33 {
		background-position: -7.68rem -3.84rem
	}
	
	.weather-bg.d53 {
		background-position: -8.96rem -3.84rem
	}
	
	.weather-bg.d57 {
		background-position: -11.52rem 0
	}
	
	.weather-bg.d32 {
		background-position: -11.52rem -1.28rem
	}
	
	.weather-bg.d49 {
		background-position: -11.52rem -2.56rem
	}
	
	.weather-bg.d58 {
		background-position: -11.52rem -3.84rem
	}
	
	.weather-bg.d54 {
		background-position: -12.8rem 0
	}
	
	.weather-bg.d55 {
		background-position: -12.8rem -1.28rem
	}
	
	.weather-bg.d56 {
		background-position: -12.8rem -2.56rem
	}
	
	.weather-bg.d301 {
		background-position: -14.08rem 0
	}
	
	.weather-bg.d302 {
		background-position: -14.08rem -1.28rem
	}
	
	.weather-bg.n0 {
		background-position: 0 -5.12rem
	}
	
	.weather-bg.n1 {
		background-position: -1.28rem -5.12rem
	}
	
	.weather-bg.n2 {
		background-position: -2.56rem -5.12rem
	}
	
	.weather-bg.n3 {
		background-position: -3.84rem -5.12rem
	}
	
	.weather-bg.n4 {
		background-position: -5.12rem -5.12rem
	}
	
	.weather-bg.n5 {
		background-position: -6.4rem -5.12rem
	}
	
	.weather-bg.n6 {
		background-position: -7.68rem -5.12rem
	}
	
	.weather-bg.n7 {
		background-position: -8.96rem -5.12rem
	}
	
	.weather-bg.n8 {
		background-position: -10.24rem -5.12rem
	}
	
	.weather-bg.n9 {
		background-position: 0 -6.4rem
	}
	
	.weather-bg.n00 {
		background-position: 0 -5.12rem
	}
	
	.weather-bg.n01 {
		background-position: -1.28rem -5.12rem
	}
	
	.weather-bg.n02 {
		background-position: -2.56rem -5.12rem
	}
	
	.weather-bg.n03 {
		background-position: -3.84rem -5.12rem
	}
	
	.weather-bg.n04 {
		background-position: -5.12rem -5.12rem
	}
	
	.weather-bg.n05 {
		background-position: -6.4rem -5.12rem
	}
	
	.weather-bg.n06 {
		background-position: -7.68rem -5.12rem
	}
	
	.weather-bg.n07 {
		background-position: -8.96rem -5.12rem
	}
	
	.weather-bg.n08 {
		background-position: -10.24rem -5.12rem
	}
	
	.weather-bg.n09 {
		background-position: 0 -6.4rem
	}
	
	.weather-bg.n10 {
		background-position: -1.28rem -6.4rem
	}
	
	.weather-bg.n11 {
		background-position: -2.56rem -6.4rem
	}
	
	.weather-bg.n12 {
		background-position: -3.84rem -6.4rem
	}
	
	.weather-bg.n13 {
		background-position: -5.12rem -6.4rem
	}
	
	.weather-bg.n14 {
		background-position: -6.4rem -6.4rem
	}
	
	.weather-bg.n15 {
		background-position: -7.68rem -6.4rem
	}
	
	.weather-bg.n16 {
		background-position: -8.96rem -6.4rem
	}
	
	.weather-bg.n17 {
		background-position: -10.24rem -6.4rem
	}
	
	.weather-bg.n18 {
		background-position: 0 -7.68rem
	}
	
	.weather-bg.n19 {
		background-position: -1.28rem -7.68rem
	}
	
	.weather-bg.n20 {
		background-position: -2.56rem -7.68rem
	}
	
	.weather-bg.n21 {
		background-position: -3.84rem -7.68rem
	}
	
	.weather-bg.n22 {
		background-position: -5.12rem -7.68rem
	}
	
	.weather-bg.n23 {
		background-position: -6.4rem -7.68rem
	}
	
	.weather-bg.n24 {
		background-position: -7.68rem -7.68rem
	}
	
	.weather-bg.n25 {
		background-position: -8.96rem -7.68rem
	}
	
	.weather-bg.n26 {
		background-position: -10.24rem -7.68rem
	}
	
	.weather-bg.n27 {
		background-position: 0 -8.96rem
	}
	
	.weather-bg.n28 {
		background-position: -1.28rem -8.96rem
	}
	
	.weather-bg.n29 {
		background-position: -2.56rem -8.96rem
	}
	
	.weather-bg.n30 {
		background-position: -3.84rem -8.96rem
	}
	
	.weather-bg.n31 {
		background-position: -5.12rem -8.96rem
	}
	
	.weather-bg.n32 {
		background-position: -6.4rem -8.96rem
	}
	
	.weather-bg.n33 {
		background-position: -7.68rem -8.96rem
	}
	
	.weather-bg.n53 {
		background-position: -8.96rem -8.96rem
	}
	
	.weather-bg.n57 {
		background-position: -11.52rem -5.12rem
	}
	
	.weather-bg.n32 {
		background-position: -11.52rem -6.4rem
	}
	
	.weather-bg.n49 {
		background-position: -11.52rem -7.68rem
	}
	
	.weather-bg.n58 {
		background-position: -11.52rem -8.96rem
	}
	
	.weather-bg.n54 {
		background-position: -12.8rem -5.12rem
	}
	
	.weather-bg.n55 {
		background-position: -12.8rem -6.4rem
	}
	
	.weather-bg.n56 {
		background-position: -12.8rem -7.68rem
	}
	
	.weather-bg.n301 {
		background-position: -14.08rem -5.12rem
	}
	
	.weather-bg.n302 {
		background-position: -14.08rem -6.4rem
	}
</style>