<template>
	<div class="business" v-cloak>
		<a v-for="item in business" @click="$emit('statistics',item)">
			<span><img :src="item.siteImg"></span>
			<p>{{item.siteTxt}}</p>
		</a>
	</div>
</template>

<script>
	export default {
	  name: 'business',
	  data () {
	    return {
	      business:[
	      	{siteImg:'../../static/images/icon01.png',siteTxt:'宽带续费',siteHref:'https://www.baidu.com'},
	      	{siteImg:'../../static/images/icon02.png',siteTxt:'139邮箱',siteHref:'https://www.baidu.com'},
	      	{siteImg:'../../static/images/icon03.png',siteTxt:'彩铃天地',siteHref:'https://www.baidu.com'},
	      	{siteImg:'../../static/images/icon04.png',siteTxt:'咪咕爱看',siteHref:'https://www.baidu.com'},
	      	{siteImg:'../../static/images/icon05.png',siteTxt:'和慧眼',siteHref:'https://www.baidu.com'},
	      ]
	    }
	  },
	  props:['baudusearch','dns'],
	  methods:{
	  	getNavagationData:function(){
	  		this.$http.post('/api/getConfigData.la',{
	  			module:'navigation'
	  		},{emulateJSON:true}).then(res => {
	  			if(res.body.success){
	  				this.business = res.body.data;
	  			}
	  		},res => {
	  			console.log(res)
	  		})
	  	}
	  },
	  mounted(){
	  	this.getNavagationData();
	  }
	}
</script>

<style>
	.business{
		height: 1.1rem;
		background: #fff;
		width: 100%;
		margin-bottom: 0.15rem;
	}
	.business a{
		float: left;
		width: 20%;
		height: 100%;
		text-align: center;
	}
	.business a>span{
		display: block;
		height: 0.74rem;
		width: 100%;
		padding-top: 0.12rem;
	}
	.business a>span>img{
		display: inline-block;
		width: 0.5rem;
		height: 0.5rem;
		vertical-align: middle;
	}
	.business a p{
		font-size: 0.2rem;
	}
</style>