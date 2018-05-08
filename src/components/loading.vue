<template>
	<div class="loading">
		<img src="../../static/images/three-dots.svg" alt="" />
	</div>
</template>

<script>
	export default {
		name:'loading'
	}
</script>

<style>
	.loading{
		width:100%;
		height:100%;
		position:absolute;
		left: 0;
		top: 0;
		z-index:10;
	}
	.loading img{
		width:1rem;
		display:block;
		position:absolute;
		top:50%;
		left:50%;
		transform: translate(-50%,-50%);
	}
</style>