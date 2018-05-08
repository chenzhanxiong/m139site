<template>
	<div class="foot-modu">
		<div class="foot-href">
			<a href="">免费玩微信短信随心发！</a>
		</div>
		<p>139site.com | 浙ICP备09002090号-12</p>
	</div>
</template>

<script>
	export default {
		name:'footModu',
		props:['baudusearch','dns'],
	}
</script>

<style>
	.foot-modu{
		height: 1.77rem;
		background: #fff;
		padding: 0 0.26rem;
		font-size: 0.25rem;
	}
	.foot-href{
		border-bottom: 1px solid #ececec;
		line-height: 0.68rem;
		padding-top: 0.1rem;
		text-align: center;
	}
	.foot-href a{
		display: inline-block;
		padding-left: 0.42rem;
		background: url(../../static/images/feixin.png) no-repeat left center;
		background-size: 0.33rem;
		color: #e339b1;
		font-size: 0.25rem;
	}
	.foot-modu>p{
		line-height: 0.6rem;
		text-align: center;
		font-size: 0.25rem;
	}
</style>