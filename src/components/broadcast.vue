<template>
	<div class="broad">
		<loading v-if="fetchLoading"></loading>
		<swiper :options="swiperOption" ref="mySwiper">
			<swiper-slide :key="index" v-for="(item,index) in slidList">
				<img :src="item.siteImg" @click="$emit('statistics',item)">
			</swiper-slide>	
			<div class="swiper-pagination" slot="pagination" v-show="slidList.length > 1"></div>
		</swiper>
	</div>
	
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import loading from '@/components/loading'
	export default {
		name:'broadcast',
		data(){
			return {
				swiperOption:{
					notNextTick: true,
					autoplay: {
						disableOnInteraction:false,
						delay:5000
					},
					//loop:true,
					pagination : {el:'.swiper-pagination'},
				},
				slidList:[],
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
			getadPositionData:function(){
	  			this.$http.post('/api/getConfigData.la',{
	  				module:'topAd'
	  			},{emulateJSON:true}).then(res => {
	  				if(res.body.success){
	  					this.slidList = res.body.data
		  				this.fetchLoading = false;
	  				}
		  		},res => {
		  			console.log(res)
		  		})
		  	},
		},
		mounted(){
			this.getadPositionData()
		}
	}
</script>

<style>
	.broad{
		width: 100%;
		margin-bottom: 0.15rem;
		position: relative;
		min-height: 2rem;
	}
</style>