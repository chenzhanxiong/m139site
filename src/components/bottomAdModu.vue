<template>
	<div class="bottomad-modu">
		<loading v-if="fetchLoading"></loading>
		<swiper :options="swiperOption" ref="mySwiper">
			<swiper-slide :key="index" v-for="(item,index) in boslidList">
				<img :src="item.siteImg" @click="$emit('statistics',item)">
			</swiper-slide>	
			<div class="swiper-pagination" slot="pagination" v-show="boslidList.length > 1"></div>
		</swiper>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import loading from '@/components/loading'
	export default {
		name:'bottomAdModu',
		data(){
			return {
				swiperOption:{
					//notNextTick: true,
					autoplay: {
						disableOnInteraction:false,
						delay:5000
					},
					//loop:true,
					pagination : {el:'.swiper-pagination'},
				},
				boslidList:[],
				fetchLoading:true
			}
		},
		props:['baudusearch','dns'],
		components: {
		    swiper,
		    swiperSlide,
		    loading
		},
		methods:{
			getboAd:function(){
	  			this.$http.post('/api/getConfigData.la',{
	  				module:'boAd'
	  			},{emulateJSON:true}).then(res => {
	  				if(res.body.success){
	  					this.boslidList = res.body.data
		  				this.fetchLoading = false;
	  				}
		  		},res => {
		  			console.log(res)
		  		})
		  	},
		},
		mounted(){
			this.getboAd()
		}
	}
</script>

<style>
	.bottomad-modu{
		margin-bottom: 0.15rem;
	}
</style>