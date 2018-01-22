<style scoped="scoped">
	

	.btnPay {
		width: 80%;
		margin-top: 20px;
		height: 40px;
		background-color: #1095d9;
		border: none;
		font-size: 16px;
		color: #fff;
		border-radius: 4px;
	}
	.cont{font-size: 14px;width: 80%;margin: 0 auto;text-align: left;}
	.cont ul li{height: 40px;color: #03A9F4;font-size: 16px;font-weight: 500;display: flex;}
	.cout ul li span{font-size: 16px;color: #000;}
	
	.btn:focus, .btn:blur{color:#000 !important ;}
	.firSpan{width: 76px;}
</style>
<template>
	<div class="ttn">
		<p style="width: 100%;height: 45px;background: #1095D9;font-size: 16px;color: #fff;line-height: 45px;overflow: hidden;">
			<span>缴费信息</span>
			<span @click="goFirst" style="float: right;display: inline-block;margin-right: 10px;color: beige;">返回</span>
		</p>
		<div style="width:80%;margin: 0 auto;border-bottom: 1px solid #bfbfbf;">
			<h5>应付金额</h5>
			<p style="font-size: 22px;font-weight: 600;">￥{{fee}}元</p>
		</div>
		<div class="cont">			
				<ul>
					<li v-model="carNumber" style="margin-top: 20px;">
						<img src="../../assets/img/icon/车辆.png" style="width: 25px;height: 26px;margin-right: 5px;" />
						<span class="firSpan">缴费车辆</span>
						<span style="margin-left: 4px;color: #000;font-size: 16px;">{{carNumber}}</span></li>
					<li v-model="parklotName">
						<img src="../../assets/img/icon/位置.png" style="width: 25px;height: 26px;margin-right: 5px;" />
						<span class="firSpan">停车位置</span>
						<span style="margin-left: 10px;width: 70%;">{{parklotName}}</span></li>
					<li v-model="formatD">
						<img src="../../assets/img/icon/开始时间.png" style="width: 25px;height: 26px;margin-right: 5px;" />
						<span class="firSpan">开始时间</span>
						<span style="margin-left: 3px;">{{formatD}}</span></li>
					<li v-model='endDate'>
						<img src="../../assets/img/icon/结束时间.png" style="width: 25px;height: 26px;margin-right: 5px;" />
						结束时间<span style="margin-left: 14px;">{{endDate}}</span></li>
					<li v-model="fee">
						<img src="../../assets/img/icon/钱 (2).png" style="width: 25px;height: 26px;margin-right: 5px;" />
						<span class="firSpan">总金额</span>
						<span style="margin-left: 3px;"> {{fee}}元</span></li>
				</ul>
				
		</div>
		<div style="background: #f0f0f0;">
			
			<button @click="pay" 
				class="btnPay">微信支付</button>
			<button type="button" v-show='bind' class="btnPay"> 继续支付</button>
			
		</div>
		

	</div>

</template>
<script>
	var type,openid,phone,sId;
	export default {
		data() {
			return {
				
				formatD: '',
				carNumber: '',
				formatD: '',
				total: '',
				end: '',
				rentTime: '',
				parkList: [],
				parktext: '',
				carPlaces: [],
				carPlace: '',
				sd: true,
				parkId: '',
				endDate: '',
				userid:'',
				openid:'',
				
				
       			fee:'',parklotName:'',
       			unbind:true,bind:false
			}
		},
		props: ['carN'],
		created() {
//			this.wechatPay='43'
			this.userid=localStorage.getItem('userid')
		
			this.carNumber = localStorage.getItem('car_number'),
			this.formatD = localStorage.getItem('startTime'),
			this.rentTime = localStorage.getItem('rentTime'),
			
			this.endDate=localStorage.getItem('endTime')
		
			
			this.parklotName=localStorage.getItem('parklot_name'),
			this.fee=localStorage.getItem('MonthRentFee')		
			openid=localStorage.getItem('openid');
			type=localStorage.getItem('type');
			phone=localStorage.getItem('phone');	
			sId=localStorage.getItem('sId');		
					
		},
		mounted() {
			this.jsapiConfig()
		},
		methods: {
			goFirst(){
				this.$router.push({path:'/?openid=' + openid + '&type=' + type +'&phone=' + phone+'&sId='+sId});
			},
			cancel() {},
			
			pay() {
				var th = this;
				if(th.fee!=''||th.fee!=null){
					th.$http({
					method: 'post',
					data: { //还有两个参数，后台说可以不要
						"openId": openid,
						"totalFee": th.fee*100,												
						"tranId":localStorage.getItem('tranId'),
						//"type":"pay"
						"sId":localStorage.getItem('sId')
					},
					url: 'http://prod20.yc-yunpass.com/cloud/api/wechat/pay/unifiedorder2',
					headers: {
						"Authorization": "WEIXINSERVER:{}",
						"Content-Type": "application/json;charset=UTF-8"
					}
					}).then(function(obj) {						
						if(obj.data.status) {
							//if(obj.data.data.type == 'nopay'){
//								alert("支付成功，谢谢使用，请在15分钟内出场");						
	//							window.location.href = '/firstPage';
								openid=localStorage.getItem('openid');
								type=localStorage.getItem('type');
								phone=localStorage.getItem('phone');	
							//	window.location.href="/firstPage?openid=" + openid + "&type="+type+"&phone="+phone
							//}
							//if(obj.data.data.type == 'pay'){
	//							alert("预付款订单生成成功");
								WeixinJSBridge.invoke('getBrandWCPayRequest', {
									"appId": obj.data.data.appId, // 公众号名称，由商户传入
									"timeStamp": obj.data.data.timeStamp, // 时间戳，自 1970 年以来的秒数
									"nonceStr": obj.data.data.nonceStr, // 随机串
									"package": obj.data.data.package, // 商品包信息
									"signType": obj.data.data.signType, // 微信签名方式
									"paySign": obj.data.data.paySign // 微信签名
								}, function(res) {
									if(res.err_msg == "get_brand_wcpay_request:ok") {
										alert('支付成功，谢谢使用')
										var openid = localStorage.getItem('openid');
										var type = localStorage.getItem('type');
										var phone = localStorage.getItem('phone');
										th.$router.push({
											path: '/?openid='+openid+'&type=3&phone='+phone+'&sId='+localStorage.getItem("sId")
										});
									} else if(res.err_msg == "get_brand_wcpay_request:cancel") {
										alert('你已取消支付');
									//	this.bind=true
									} else if(res.err_msg == "get_brand_wcpay_request:fail") {
										alert("支付失败");
									}
								});
							//}
//							else{
//								alert("支付成功,谢谢使用");
//								window.location.href="/?openid=" + openid + "&type="+type+"&phone="+phone
//							}
						} else{
							
						}
					}).catch(error=> {
						alert("抱歉，支付失败，请稍后再试！");
							
							})
					}													
			},
			jsapiConfig() {
				var str = window.location.href.split('#')[0];
				console.log(str)
				var httpUrl = 'http://prod20.yc-yunpass.com/cloud/api/wechat/pay/jsapi?oauthUrl=' + str;
				this.$http({
					method: 'get',
					url: httpUrl,
					headers: {
						"Authorization": "WEIXINSERVER:{}",
						"Content-Type": "application/json"
					}
				}).then(function(res) {
					//console.log(res.data);
					var signature = res.data.data.signature;
					//console.log("signature"+res.data.data.signature);
					var appid = res.data.data.appId;
					//console.log("appid"+appid);
					var jsapi_ticket = res.data.data.jsapi_ticket;
					//console.log("jsapi_ticket"+jsapi_ticket);
					var noncestr = res.data.data.noncestr;
					//console.log("noncestr"+noncestr);
					var url = res.data.data.url;
					var timestamp = res.data.data.timestamp;
					//console.log("timestamp"+timestamp);
					if(res.status) {
						wx.config({
							debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							appId: appid, // 必填，公众号的唯一标识
							timestamp: timestamp, // 必填，生成签名的时间戳
							nonceStr: noncestr, // 必填，生成签名的随机串
							signature: signature, // 必填，签名，见附录1
							jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
						})
					} else {
						alert("抱歉，支付失败，请稍后再试！");
					};
				}).catch(error=> {
					alert("抱歉，支付失败，请稍后再试！");
				});
			},

		}
	}
</script>
