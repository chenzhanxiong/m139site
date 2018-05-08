<template>
	<div class="music-modu">
		<div class="s-modu-head">
			<span class="s-modu-title music-title">音乐</span>
			<a class="s-modu-more" @click="$emit('statistics',musicData)">更多></a>
		</div>
		<div class="music-page">
			<loading v-if="fetchLoading"></loading>
			<iframe :src="musicData.siteImg" frameborder=0 scrolling="no" id="mIframe" :height="iframeHeight"></iframe>
		</div>
		
	</div>
</template>

<script>
	import loading from '@/components/loading'
	export default {
		name:'musicModu',
		data(){
			return{
				iframeHeight:'',
				musicData:{
					stId:'',
					siteImg:'',
					siteHref:''
				},
				fetchLoading:true
			}
		},
		props:['baudusearch','dns'],
		components:{loading},
		methods:{
			getMusicData:function(){
				this.$http.post('/api/getConfigData.la',{
	  				module:'MiGuMusic'
	  			},{emulateJSON:true}).then(res => {
	  				if(res.body.success){
	  					this.musicData = res.body.data[0];
	  					this.fetchLoading = false;
	  				}
	  				this.setIframeHeight(this.musicData.siteImg,'size');
		  		},res => {
		  			console.log(res)
		  		})
			},
			setIframeHeight:function(href,name) {
				let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
				let w = document.documentElement.clientWidth;
				let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
				let r = href.split("?")[1]?href.split("?")[1].match(reg):null;
				if (r == null) return;
				if (!w) return;
				this.iframeHeight = w*unescape(r[2]);
			}
		},
		mounted(){
			this.getMusicData();
		}
	}
</script>

<style>
	.music-modu{
		margin-bottom: 0.15rem;
	}
	.music-modu iframe{
		border:none;
		width:100%;
		min-height:2rem;
		display:block;
	}
	.music-title{
		background-image: url(../../static/images/music.png);
	}
	.music-page{
		padding: 0.16rem 0 0;
		background: #fff;
		position: relative;
		min-height: 2rem;
		overflow: hidden;
	}

</style>