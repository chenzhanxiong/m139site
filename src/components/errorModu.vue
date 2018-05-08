<template>
	<div class="error-modu">
		<div class="error-modu-top">
			<h1>404</h1>
			<p>您访问的页面出错啦 ( T﹏T )</p>
			<p>别着急，您往下看...</p>
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
		data(){
			return{
				baudusearch:true,
				baiduPlaceholder:'',
				searchData:'',
				baiduData:''
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
		},
		mounted(){
		  	if(this.baudusearch){
		  		this.getBaiduData();
		  	}	
	  }
	}
</script>

<style>
	.error-modu{
		padding: 0 0.26rem;
		position: relative;
		
	}
	.error-modu-top{
		height: 2.5rem;
		background: url(../../static/images/errorimg.png) no-repeat center top,url(../../static/images/errorbg.png) no-repeat center bottom;
		background-size: 100%;
		text-align: center;
		color: #fff;
		padding-top: 0.4rem;
		margin: 0 -0.26rem;
	}
	.error-modu-top h1{
		font-size: 0.8rem;
	}
	.error-modu-top p{
		font-size: 0.28rem;
		font-weight: bold;
	}
	.error-modu .head-search{
		height: 0.7rem;
		line-height: 0.74rem;
		background-color: rgba(255,255,255,0.8);
		border-radius: 0.03rem;
		position: relative;
		margin-top: 0.15rem;
		margin-bottom:0.15rem;
	}
	.error-modu .secrch-logo{
		float: left;
		width: 0.7rem;
		height: 0.7rem;
		background: url(../../static/images/search.png) no-repeat center center;
		background-size: 0.4rem 0.4rem;
	}
	.error-modu .head-search input{
		height: 0.7rem;
		width: 100%;
		background: none;
		border: 1px solid #ececec;
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
	.error-modu .secrch-btn{
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
</style>