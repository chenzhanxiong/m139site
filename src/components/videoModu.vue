<template>
	<div class="video-modu">
		<div class="s-modu-head">
			<span class="s-modu-title video-title">视频</span>
			<div class="modu-head-list">
				<span :key="index" v-for="(item,index) in videoTitle" :class="{active:index == videoTitleAcitve}" @click="videoclick(index)">{{item}}</span>
			</div>
			<a class="s-modu-more" @click="$emit('statistics',videoMore)">更多></a>
		</div>
		<div class="video-page">
			<loading v-if="fetchLoading"></loading>
			<a @click="$emit('statistics',item)" v-for="(item,index) in videoData" :key="index" v-if="index < 6">
				<div>
					<img :src="item.siteImg"/>
				</div>
				<p class="item-txt">{{item.siteTxt}}</p>
				<p class="item-info1">{{item.introduce}}</p>
			</a>
		</div>
	</div>
</template>

<script>
	import loading from '@/components/loading'
	export default {
		name:'videoModu',
		data(){
			return{
				videoTitleAcitve:'',
				videoTitle:{filmdata:'电影',tvdata:'电视剧'},
				filmdata:[],
				tvdata:[],
				videoData:[],
				fetchLoading:true,
				videoMore:{stId:'183',orderNum:'',siteId:'更多',siteHref:'http://m.miguvideo.com'}
			}
		},
		props:['baudusearch','dns'],
		methods:{
			videoclick:function(index) {
				this.videoTitleAcitve = index;
				this.videoData = this[index];
			},
			getVideoData:function(){
				this.$http.post('/api/getConfigData.la',{
	  				module:'MiGuVideo'
	  			},{emulateJSON:true}).then(res => {
	  				if(res.body.success){
	  					this.filmdata = res.body.filmdata;
						this.tvdata = res.body.tvdata;
						this.videoclick('filmdata');
			  			this.fetchLoading = false;
	  				}
		  		},res => {
		  			console.log(res)
		  		})
			}
		},
		components:{loading},
		mounted(){
			this.getVideoData();
		}
	}
</script>

<style>
	.video-modu{
		margin-bottom: 0.15rem;
		overflow:hidden;
	}
	.video-title{
		background-image: url(../../static/images/video.png);
	}
	.video-page{
		overflow: hidden;
		padding: 0.26rem 0.26rem;
		margin: 0 -0.08rem;
		background: #fff;
		position: relative;
		min-height: 2rem;
	}
	.video-page a{
		width: 50%;
		padding: 0 0.08rem;
		display: block;
		float: left;
		margin-bottom:0.26rem
	}
	.video-page a>div{
		width: 100%;
		height: 2rem;
		margin-bottom: 0.1rem;
		overflow: hidden;
		position: relative;
	}
	.video-page a img{
		width: 100%;
		display: block;
		position: absolute;
		top: 50%;
		transform: translate(0,-50%);
	}
	.video-page .item-txt{
		line-height: 0.44rem;
		font-size: 0.26rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.video-page .item-info1{
		font-size: 0.24rem;
		color: #999;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>