<style>
	.ttn .ivu-modal-close {
		display: none
	}
	
	.ttn .ivu-modal-footer {
		border: none
	}
	
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
	
	.cont {
		font-size: 14px;
		width: 80%;
		margin: 0 auto;
		text-align: left;
	}
	
	.cont ul li {
		height: 40px;
		color: #03A9F4;
		font-size: 16px;
		font-weight: 500;
	}
	
	.cout ul li span {
		font-size: 16px;
		color: #000;
	}
</style>
<template>
	<div class="ttn">
		<p style="width: 100%;height: 45px;background: #1095D9;font-size: 16px;color: #fff;line-height: 45px;">缴费信息</p>
		<div style="width:80%;margin: 0 auto;border-bottom: 1px solid #bfbfbf;">
			<h5>应付金额</h5>
			<p style="font-size: 22px;font-weight: 600;">￥{{billInfo.should_fee}}元</p>
		</div>
		<div class="cont">

			<ul>
				<li style="margin-top: 20px;">
					<img src="../../assets/img/icon/车辆.png" style="width: 25px;" /> 缴费车辆
					<span style="margin-left: 10px;color: #000;font-size: 16px;">{{carnumber}}</span></li>
				<li>
					<img src="../../assets/img/icon/位置.png" style="width: 25px;" /> 停车位置
					<span style="margin-left: 10px;">
						{{billInfo.order_info.lease_info.parklot_name}}</span></li>
				<li>
					<img src="../../assets/img/icon/开始时间.png" style="width: 25px" /> 开始时间
					<span style="margin-left: 10px;">{{billInfo.order_info.order_create_time}}</span></li>
				<li>
					<img src="../../assets/img/icon/结束时间.png" style="width: 25px;" /> 结束时间
					<span style="margin-left: 10px;">{{timeStr}}</span></li>
				<li>
					<img src="../../assets/img/icon/钱 (2).png" style="width: 25px;" /> 总金额
					<span style="margin-left: 20px;"> {{billInfo.billing_fee}}元</span></li>
				<li>
					<img src="../../assets/img/icon/优惠.png" style="width: 25px;" /> 优惠金额
					<span style="margin-left: 6px;"> {{fee}}元</span></li>
				
			</ul>
		</div>
		<hr style="height: 3px;border: 2px solid cadetblue;background-color: cadetblue;" />
		<div>
			<table class="table" style="font-size: 14px;">
				<tr>
					<td>选择优惠</td>
					<td v-show="seleted" v-model="couponSeleted" @click="resetCoupon">{{couponSeleted}}</td>
					<td v-show="notselect" v-model="couponlength" @click="chooseCoupon">{{couponlength}}张可用</td>
				</tr>
			</table>
		</div>
		<div style="background: #f0f0f0;">
			<button v-on:click="wxPay" v-if="unbind" class="btnPay"> 确认支付{{billInfo.should_fee}}</button>
			<button type="button" v-else class="btnPay" v-on:click="wxPay"> 确认支付{{billInfo.should_fee}}元</button>
		</div>

	</div>
</template>
<script>
	var billing_id;
	var a;
	var openid, phone, type;
	export default {
		data() {
			return {
				billInfo: [], //存储请求返回的数据
				//car_number:car_plate_number
				timeStr: '',
				carnumber: localStorage.getItem("car_number"),
				fee: '',
				unbind: '',couponlength:'',couponSeleted:'',
				seleted:false,notselect:true
			}
		},
		mounted() {
				this.jsapiConfig(),
				this.getTime(),
				this.getUserConponList(),
				this.getLeaseId()
		},
		methods: {
			resetCoupon(){
				this.$router.go(-1)
			},
			chooseCoupon(){
				this.$router.push({path:'/ddss'})
			},
			getUserConponList() {
					var vm = this;
					this.$http({
						method: 'post',
						url: SERVER + 'api/coupon/getCouponUserList',
						data:{
						  "openId":localStorage.getItem("openid"),
						  "carNumber":localStorage.getItem("car_number")
						},
						headers: {
							"Authorization": "WEIXINSERVER:{}",
							"Content-Type": "application/json;charset=UTF-8"
						}

					}).then(function(res) {
						console.log('优惠券',res);
						vm.couponlength = res.data.data.length
//						vm.UserConponList = res.data.data;
//						if(res.data.data.length==0){
//							vm.none = '暂无优惠券  | 点击继续支付'
//						}
					})
				},
				wxPay() {
				var th = this;
				var openid = localStorage.getItem("openid");
				var money = localStorage.getItem("money");
				var sId = localStorage.getItem("sId");
				console.log(localStorage.getItem("money"));
				this.$http({
					method: 'post',
					data: {
						"openId": openid,
						"totalFee": Math.ceil(money * 100),
						"body": "停车场缴费",
						"detail": "停车场缴费",
						"billingId": localStorage.getItem("billing_id"),
						"sId": sId
					},
					url: SERVER + 'api/wechat/pay/unifiedorder',
					headers: {
						"Authorization": "WEIXINSERVER:{}",
						"Content-Type": "application/json;charset=UTF-8"
					}
				}).then(function(obj) {
					console.log(obj);
					console.log("status = " + obj.data.status);
					console.log("data = " + obj.data.data);
					if(obj.data.status) {
						if(obj.data.data.type == 'nopay') {
							alert("金额小于0，当前不需要支付，谢谢使用，请在15分钟内出场");
							openid = localStorage.getItem('openid');
							type = localStorage.getItem('type');
							phone = localStorage.getItem('phone');
							th.$router.push({path:'/?openid='+openid+'&type=3&phone='+phone+'&sId='+localStorage.getItem("sId")})
							return false;
						};
						console.log(obj.data.appId);
//						alert("appId"+obj.data.data.appId);
//						wx.chooseWXPay({});
						WeixinJSBridge.invoke('getBrandWCPayRequest', {
							"appId": obj.data.data.appId, // 公众号 名称，由商户传入
							"timeStamp": obj.data.data.timeStamp, // 时间戳，自 1970 年以来的秒数
							"nonceStr": obj.data.data.nonceStr, //  随机串
//							"out_trade_no": obj.data.data.out_trade_no,
							"package": obj.data.data.package, // 商品包信息
							"signType": obj.data.data.signType, // 微信签名方式
							"paySign": obj.data.data.paySign // 微信签名
						}, function(res) {
							var str = JSON.stringify(res);
							alert(str);
							if(res.err_msg == "get_brand_wcpay_request:ok") {
								alert("支付成功，谢谢使用，请在15分钟内出场");
								var openid = localStorage.getItem('openid');
								var type = localStorage.getItem('type');
								var phone = localStorage.getItem('phone');
								th.$router.push({
									path: '/?openid='+openid+'&type=3&phone='+phone+'&sId='+localStorage.getItem("sId")
								});
								//window.location.href="/firstPage?openid=" + openid + "&type=3"
							} else if(res.err_msg == "get_brand_wcpay_request:cancel") {
								alert('你已取消支付');
							} else {
								alert("支付失败");
							}
						});
					} else {
						alert("生成预付款订单失败");
					}
				}).catch(function(error) {
					console.log("error = " + error);
					alert("支付失败，请稍后再试！");
				});
			},
			getLeaseId() {
				var th = this
				var car_number = localStorage.getItem("car_number");
				var type = this.$route.query.type;
				if(type){
					th.getBillInfo()
				}else{
					this.$http({
						method: 'post',
						data: {
							"number": car_number,
							"type": 1
						},
						url: SERVER + 'api/park/findLeaseId',
						headers: {
							"Authorization": "WEIXINSERVER:{}",
							"Content-Type": "application/json"
						}
	
					}).then(function(res) {
					console.log(res.data.status)
						if(res.data.status){
							console.log("数据" + res.data.data.leaseId);
							console.log(localStorage.getItem("userid"));
							localStorage.setItem("lease_id", res.data.data.leaseId);
							th.getBillId()
						}else{
							alert('暂无停车信息');
							var openid = localStorage.getItem('openid');
							var sId = localStorage.getItem('sId');
							var phone = localStorage.getItem('phone');
	 						th.$router.push({path:'/?openid='+openid+"&type=3&sId="+sId+"&phone="+phone})
						}
					})
				}
					
			},
			getBillId() {
				var th = this;
				var m = this.$route.query.money
				if(m){
					th.getBillInfo()
				}else{
					this.$http({
						method: 'post',
						url: prodServer + 'park/reqFinishParkByUser',
						data: {
							"lease_id": localStorage.getItem("lease_id"),
							"user_id": localStorage.getItem("userid"),
							"payMethodId":1,
							"carNumber": "-1",
							"couponId": "-1",
						},
						headers: {
							"Authorization": "WEIXINSERVER:{}",
							"Content-Type": "application/json;charset=UTF-8"
						}
	
					}).then(function(res) {
						if(res.data.code == 0){
							alert("暂无相关账单信息");
							var phone = localStorage.getItem('phone');
							var sId = localStorage.getItem('sId');
							th.$router.push({path:'/?openid=' + localStorage.getItem("openid") + '&type=3&sId='+sId+'&phone='+phone})
						}else{
							console.log("------------> 不使用 billing_id = " + res.data.data.billing_id);
							localStorage.setItem("billing_id", res.data.data.billing_id);
							th.getBillInfo()
						}
					});
				}
					
			},
			getTime() {
				var vt = this;
				var myTime = new Date();
				var month = myTime.getMonth() + 1;
				this.timeStr = myTime.getFullYear() + "-" + month + "-" + myTime.getDate() + " " + myTime.getHours() + ":" + myTime.getMinutes() + ":" + myTime.getSeconds();
				var type = this.$route.query.type;
				var body = this.$route.query.money;
				console.log(type+'---'+body)
				if(type && body){
					if(type == 0){
						vt.couponSeleted = '免费停车'
					}else if(type == 1){
						vt.couponSeleted = '减免'+body+'h'
					}else if(type == 2){
						vt.couponSeleted = '减免'+body+'元'
					}else if(type == 3){
						vt.couponSeleted = '优惠'+body+'折'
					}else{
						vt.couponSeleted = '收取固定'+body+'元'
					}
					vt.seleted = true;
					vt.notselect = false
				}else{
					vt.seleted = false;
					vt.notselect = true
				}
			},
			getBillInfo() { //http get请求data.json 的数据

				var vm = this;
				//console.log(biling_id);
				var billing_id = localStorage.getItem("billing_id");
				var myDate = new Date();
				console.log("本地billing_id------------------------->")
				console.log("获取账单后的" + billing_id);
				this.$http({
					method: 'post',
					data: {
						"billing_id": billing_id
					},
					url: prodServer + 'billing/getBillInfoByID',
					headers: {
						"Authorization": "WEIXINSERVER:{}",
						"Content-Type": "application/json"
					}

				}).then(function(res) {
					console.log("账单信息2----------------------->");
					console.log(res.data.data);
					vm.billInfo = res.data.data;
					if(res.data.data.bill_status == 1) {
						vm.unbind = false;
					};
					if(res.data.data.bill_status == 0 || res.data.data.bill_status == 2) {
						vm.unbind = true;
					}
					var n_fee = Number(res.data.data.billing_fee) - Number(res.data.data.should_fee);
					vm.fee = parseFloat(n_fee).toFixed(2)
					localStorage.setItem("money", res.data.data.should_fee);

					var money = localStorage.getItem("money");
					var m = parseFloat(money);
					var m2 = Math.ceil(m * 100);
					console.log("money = " + money + " m = " + m + " m2 = " + m2);
				})

			}
			,
			//微信支付接口
			
			jsapiConfig() {
				var str = window.location.href.split('#')[0];
				var httpUrl = SERVER + 'api/wechat/pay/jsapi?oauthUrl=' + str;
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
						alert("支付失败，请稍后再试！");
					};
				}).catch(function(error) {
					alert("支付失败，请稍后再试！");
				});
			}
		}
	}
</script>