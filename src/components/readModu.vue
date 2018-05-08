<template>
	<div class="read-modu">
		<div class="s-modu-head">
			<span class="s-modu-title read-title">小说</span>
			<div class="modu-head-list">
				<span v-for="(item,index) in headTitle"  @click="readclick(index)" :class="{active:index == headTitleAcitve}">{{item}}</span>
			</div>
			<a class="s-modu-more" @click="$emit('statistics',readMore)">更多></a>
		</div>
		<div class="read-modu-page">
			<loading v-if="fetchLoading"></loading>
			<a class="modu-read-list" v-for="(item,index) in pagesList" :key="index" @click="$emit('statistics',item)">
				<img :src="item.siteImg"/>
				<p>{{item.siteTxt}}</p>
			</a>
		</div>
		<div class="read-special">
			<a v-for="(item,index) in newReadAd" :key="index" @click="$emit('statistics',item)">
				<img :src="item.siteImg"/>
			</a>
		</div>
	</div>
</template>

<script>
	import loading from '@/components/loading'
	export default {
		name:'headModu',
		data(){
			return{
				headTitle:{maledata:'男生',famaleta:'女生'},
				headTitleAcitve:'',
				pagesList:[],
				famaleta:[],
				maledata:[],
				newReadAd:[],
				fetchLoading:true,
				readMore:{stId:'182',orderNum:'',siteId:'更多',siteHref:'http://wap.cmread.com'}
			}
		},
		props:['baudusearch','dns'],
		components:{loading},
		methods:{
			readclick:function(index) {
				this.headTitleAcitve = index;
				this.pagesList = this[index];
			},
			getReadData:function(){
				this.$http.post('/api/getConfigData.la',{
	  				module:'MiGuRead'
	  			},{emulateJSON:true}).then(res => {
	  				if(res.body.success){
	  					this.famaleta = res.body.famaleta;
			  			this.maledata = res.body.maledata;
			  			this.newReadAd = res.body.newReadAd;
			  			this.fetchLoading = false;
			  			this.readclick('maledata')
	  				}
		  		},res => {
		  			console.log(res)
		  		})
			}
		},
		mounted(){
			this.getReadData();
	  	}
	}
</script>

<style>
	.read-modu{margin-bottom:0.15rem}
	.read-title{
		background-image: url(../../static/images/reading.png);
	}
	.read-modu-page{
		overflow: hidden;
		background-color: #fcfcfc;
		position: relative;
		min-height: 2rem;
	}
	.modu-read-list{
		display: block;
		float: left;
		padding: 0.15rem 0.26rem;
		width: 33.333%;
	}
	.modu-read-list img{
		width: 100%;
		height: auto;
		margin-bottom: 0.1rem;
	}
	.modu-read-list p{
		font-size: 0.26rem;
		line-height: 0.4rem;
		height: 0.4rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.read-special{
		padding: 0.32rem 0.26rem;
		background-color: #fff;
		overflow: hidden;
		position: relative;
	}
	.read-special:before{
		content: "";
		position: absolute;
		top: 0;
		left: 0.26rem;
		right: 0.26rem;
		height: 1px;
		background: #ececec;
	}
	.read-special a{
		width: 50%;
		height: 1.52rem;
		overflow: hidden;
		display: block;
		float: left;
	}
	.read-special a:last-child{
		padding-left: 0.13rem;
	}
	.read-special a:first-child{
		padding-right: 0.13rem;
	}
	.read-special a img{
		width: 100%;
		height: 100%;
		border-radius: 0.1rem;
	}
</style>