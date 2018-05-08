<template>
	<div class="focus-news">
		<div class="s-modu-head">
			<span class="s-modu-title news-title" :class="{newsdns:dns != '200'}">{{title}}</span>
		</div>
		<div class="news-page">
			<loading v-if="fetchLoading"></loading>
			<a class="news-list" v-for="(item,index) in newsList" :key="index" @click="$emit('statistics',item)">
				<img :src="item.siteImg"/>
				<p class="news-list-txt">{{item.siteTxt}}</p>
				<p class="news-info">
					<span>{{item.introduce}}</span>
					<span>{{item.mmintroduce}}</span>
				</p>
			</a>
		</div>
	</div>
</template>

<script>
	import loading from '@/components/loading'
	export default {
		name:'news',
		data(){
			return{
				newsList:[],
				title:'要闻',
				fetchLoading:true
			}
		},
		props:['baudusearch','dns'],
		methods:{
			isError1:function(){
				if(this.dns != '200'){
					this.title = '大家都在看',
					this.newsList.forEach(function(e){
						e.siteHref = '/';
					})
				}
			},
			getNewsData:function(){
				this.$http.post('/api/getConfigData.la',{
	  				module:'news'
	  			},{emulateJSON:true}).then(res => {
	  				if(res.body.success){
	  					this.newsList = res.body.data;
			  			this.isError1();
			  			this.fetchLoading = false;
	  				}
		  		},res => {
		  			console.log(res)
		  		})
			}
		},
		components:{loading},
		mounted(){
			this.getNewsData();
		}
	}
</script>

<style>
	.focus-news{
		margin-bottom: 0.15rem;
	}
	.news-title{
		background-image: url(../../static/images/news.png);
	}
	.s-modu-title.newsdns{
		background-image: url(../../static/images/icon_eyes.png);
		color: #666;
		background-size: 0.30rem;
		line-height: 0.44rem;
		padding-left: 0.4rem;
		font-weight: normal;
	}
	.news-page{
		background-color: #fff;
		padding: 0 0.26rem;
		position: relative;
		min-height: 2rem;
	}
	.news-list{
		width: 100%;
		border-bottom: 0.01rem solid #ececec;
		display: block;
		padding: 0.22rem 0;
		overflow: hidden;
		position: relative;
	}
	.news-list:last-child{
		border: none;
	}
	.news-list img{
		display: block;
		float: left;
		margin-right: 0.15rem;
		width: 1.56rem;
		height: 1rem;
	}
	.news-list .news-list-txt{
		font-size: 0.26rem;
		line-height: 0.28rem;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.news-info{
		color: #999;
		position: absolute;
		bottom: 0.22rem;
		left: 1.71rem;
		right:0;
	}
	.news-info span:first-child{
		float: left;
	}
	.news-info span:last-child{
		float: right;
	}
</style>