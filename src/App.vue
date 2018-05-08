<template>
  <div id="app">
  	<component v-for="(item,index) in list" :key="index" :is="item" :dns="newserror" :baudusearch= "baudusearch" @statistics="statistics"></component>
  </div>
</template>

<script>
const errorModu = r => require.ensure([],() => r(require('@/components/errorModu')), 'errorModu')
const topItem = r => require.ensure([],() => r(require('@/components/topItem')), 'topItem')
const business = r => require.ensure([],() => r(require('@/components/business')), 'business')
const broadcast = r => require.ensure([],() => r(require('@/components/broadcast')), 'broadcast')
const focusNews = r => require.ensure([],() => r(require('@/components/focusNews')), 'focusNews')
const readModu = r => require.ensure([],() => r(require('@/components/readModu')), 'readModu')
const videoModu = r => require.ensure([],() => r(require('@/components/videoModu')), 'videoModu')
const musicModu = r => require.ensure([],() => r(require('@/components/musicModu')), 'musicModu')
const websiteModu = r => require.ensure([],() => r(require('@/components/websiteModu')), 'websiteModu')
const bottomAdModu = r => require.ensure([],() => r(require('@/components/bottomAdModu')), 'bottomAdModu')
const footModu = r => require.ensure([],() => r(require('@/components/footModu')), 'footModu')

export default {
  name: 'App',
  data(){
  	return{
  		list:[],
  		dns:'',
  		newserror:'',
  		cityData:'',
  		errorData:'',
  		fmData:'',
  		baudusearch:false,
  	}
  },
  components:{
  	topItem,business,broadcast,focusNews,readModu,videoModu,musicModu,websiteModu,bottomAdModu,footModu,errorModu
  },
  methods:{
		getUrlStr:function(name) {
		　　let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		　　let r = window.location.search.substr(1).match(reg);
		　　if(r != null) return unescape(r[2]);
		　　return null;
		},
		isError:function(){//判断是否报错
			this.dns = {e:this.getUrlStr('e'),ew:this.getUrlStr('ew'),t:this.getUrlStr('t')};
			this.$http.post('/api/getErrorData.la',{
				e  : this.dns.e,
				ew : this.dns.ew,
				t  : this.dns.t
			},{emulateJSON:true}).then(res => {
				if(res.body.success){
					this.cityData  = res.body.cityData;
					this.errorData = res.body.errorData;
					this.fmData    = res.body.fmData;
					if(this.errorData.errorcode == '200'){
						this.getDisplayOrder()
					}else if(this.errorData.errorcode != '200'){
						let topModule = res.body.topModule;
						this.list = ['errorModu',topModule,'focusNews','footModu']
					}
					this.newserror = this.errorData.errorcode;
					this.wapPageVisit();
				}else{
					this.list = ['errorModu','broadcast','focusNews','footModu']
				}
			},res => {
				this.list = ['errorModu','broadcast','focusNews','footModu']
			})			
		},
		statistics:function(item){//点击量统计
			this.$http.post('/api/click.la',{
				cpage  : 1,
				cityId : this.cityData.cityId,
				st     : item.stId,
				ord    : item.orderNum,
				site   : item.siteId,	
				city   : this.cityData.cityname,
				ec		 : this.errorData.errorcode,
				t      : this.errorData.errorcode
			},{emulateJSON:true}).then(res => {
				console.log(res);
			},res => {
				console.log(res);
			})
			window.location.href = item.siteHref;
		},
		getDisplayOrder:function(){//获取模块
			this.$http.get('/api/displayOrder.la').then(res => {
				if(res.body.success){
					res.body.data.forEach(function(e,i){
						if(e == 'baudusearch'){
							res.body.data.splice(i,1);
							this.baudusearch = true;
						}
					}.bind(this))
					this.list = res.body.data;
					this.list.unshift('topItem');
					this.list.push('footModu');
				}else{
					this.list = ['errorModu','broadcast','focusNews','footModu']
				}				
			},res => {
				this.list = ['errorModu','broadcast','focusNews','footModu']
			})
		},
		wapPageVisit:function(){
			let city_href = '',err_errorcode = '',err_error_url = '',fm_mx = '';
			if(this.cityData.href != null){
				city_href = this.cityData.href;
			}
			if(this.errorData.errorParm != null && this.errorData.errorParm != ""){
				city_href = "dns" + city_href;
			}			
			if(this.errorData.errorcode != null && this.errorData.errorcode != "" && this.errorData.errorcode != "200"){
				err_errorcode = this.errorData.errorcode;
				city_href = "errorcode" + city_href;
			}
			if(this.errorData.errorUrl != null && this.errorData.errorUrl != ""){
				err_error_url = this.errorData.errorUrl;
			}
			if(this.fmData != null && this.fmData.mx != null){
				fm_mx = this.fmData.mx;
			}		
			this.$http.post('/wapPageVisit',{
				url     : city_href,
				referer : fm_mx,
				e       : err_errorcode,
				eurl    : err_error_url
			},{emulateJSON:true}).then(res => {
				
			},res => {
				
			})
		}
	},
	mounted(){
		this.isError();		
	}
}
</script>

<style>
	#app{
		background: #f6f6f6;
	}
</style>
