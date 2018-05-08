<template>
	<div class="website-modu">
		<div class="s-modu-head">
			<span class="s-modu-title website-title">网址导航</span>
		</div>
		<div class="website-page">
			<loading v-if="fetchLoading"></loading>
			<a @click="$emit('statistics',item)" v-for="(item,index) in websiteData" :key="index">
				<img :src="item.siteImg">
				<span class="item-txt">{{item.siteTxt}}</span>
			</a>
		</div>
	</div>
</template>

<script>
	import loading from '@/components/loading'
	export default {
		name:'websiteModu',
		data(){
			return{
				websiteData:[],
				fetchLoading:true
			}
		},
		props:['baudusearch','dns'],
		components:{loading},
		methods:{
			getNetNavigationData:function(){
				this.$http.post('/api/getConfigData.la',{
	  				module:'netNavigation'
	  			},{emulateJSON:true}).then(res => {
	  				if(res.body.success){
	  					this.websiteData = res.body.data;
		  				this.fetchLoading = false;
	  				}
		  		},res => {
		  			console.log(res)
		  		})
			}
		},
		mounted(){
			this.getNetNavigationData();
		}
	}
</script>

<style>
	.website-modu{
		margin-bottom: 0.15rem;
	}
	.website-title{
		background-image: url(../../static/images/index.png);
	}
	.website-page{
		padding: 0.26rem;
		background: #fff;
		overflow: hidden;
		position: relative;
		min-height: 2rem;
	}
	.website-page a{
		float: left;
		width: 26%;
		line-height: 0.5rem;
		padding: 0.16rem 0;
		overflow: hidden;
	}
	.website-page a:nth-child(4n){
		width: 22%;
	}
	.website-page a img{
		width: 0.5rem;
		height: 0.5rem;
		float: left;
		margin-right: 0.15rem;
	}
	.website-page .item-txt{
		font-size: 0.3rem;
	}
</style>