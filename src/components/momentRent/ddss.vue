<style scoped>
	.header {
		width: 100%;
		height: 50px;
		background-color: #31B0D5;
	}
	
	.header h4 {
		text-align: center;
		line-height: 50px;
		color: white;
		font-weight: 800;
	}
</style>
<template>
	<div class="container">
		<div class="row">
			<div class="col-xs-12 header">
				<h4>选择优惠券</h4>
			</div>
		</div>
		<form method="get">
			<div class="row">
				<div class="col-xs-10 col-xs-offset-1 cp" v-for="(conpon,index) in conponList">
					<div class="row" @click="accInfo(conpon.id,conpon.type,conpon.property)">
						<div class="col-xs-8 cp-content">
							<h3 class="cp-title">临停·
									<span v-if="conpon.type == 0">免费停车</span>
									<span v-else-if="conpon.type == 1">减免时间</span>
									<span v-else-if="conpon.type == 2">减免金额</span>
									<span v-else-if="conpon.type == 3">打折优惠</span>
									<span v-else>固定金额</span>
								</h3>
							<p class="cp-surplus">{{conpon.endTime.substring(0,10)}}前有效</p>
							<p class="cp-use">仅限在{{conpon.parklot_name}}使用</p>
						</div>
						<div class="col-xs-4">
							<h4 class="cp-money" v-if="conpon.type == 0">
									<span class="cp-money-type"></span>
									免费
								</h4>
								<h4 class="cp-money" v-else-if="conpon.type == 1">
									{{conpon.property}}
									<span class="cp-money-type">h</span>
								</h4>
								<h4 class="cp-money" v-else-if="conpon.type == 2">
									<span class="cp-money-type">￥</span>
									{{conpon.property}}
								</h4>
								<h4 class="cp-money" v-else-if="conpon.type == 3">
									{{conpon.property}}
									<span class="cp-money-type">折</span>
								</h4>
								<h4 class="cp-money" v-else>
									<span class="cp-money-type">￥</span>
									{{conpon.property}}
								</h4>
						</div>
					</div>

				</div>
				<div class="row">
					<div class="col-xs-6 col-xs-offset-3">
						<div class="btn btn-info btn-block" @click="accInfo1()" style="margin-top: 15px;">
							<h5 style="text-align: center;">放弃优惠继续支付</h5>
						</div>

					</div>
				</div>
			</div>
		</form>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				conponList: [],
				none: ''
			}
		},
		mounted() {
			this.getUserConponList()
		},
		methods: {
			accInfo1: function() {
				var th = this;
//				th.getMyAllLease();
				this.$router.go(-1);
//				this.$http({
//					method: 'post',
//					url: SERVER + 'api/coupon/bindCouponForCar',
//					data: {
//						"lease_id": localStorage.getItem("lease_id"),
//						"user_id": localStorage.getItem("userid"),
//						"carNumber": "-1",
//						"couponId": "-1",
//					},
//					headers: {
//						"Authorization": "WEIXINSERVER:{}",
//						"Content-Type": "application/json;charset=UTF-8"
//					}
//
//				}).then(function(res) {
//					localStorage.setItem("billing_id", res.data.data.data.billing_id);
//					th.$router.push({
//						path: '/accInfo'
//					});
//				});
			},
			accInfo: function(id,type,money) {
				var th = this;
				this.$http({
					method: 'post',
					url: SERVER + 'api/coupon/bindCouponForCar',
					data: {
						"couponId": id,
						"carNumber": localStorage.getItem("car_number"),
						"lease_id": "",
						"user_id": "",
					},
					headers: {
						"Authorization": "WEIXINSERVER:{}",
						"Content-Type": "application/json;charset=UTF-8"
					}

				}).then(function(res) {
					localStorage.setItem("billing_id", res.data.data.data.billing_id);
//					th.$router.push({
//						path: '/accInfo?type='+type+'&money='+money
//					});
					window.location.href = 'http://www.yangchenkeji.com.cn/userpay/accInfo?type='+type+'&money='+money
				})
			},
			getMyAllLease() {
				var car_number = localStorage.getItem("car_number");
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
					localStorage.setItem("lease_id", res.data.data.leaseId);
				})
			},
			getUserConponList() {
				var vm = this;
				this.$http({
					method: 'post',
					url: SERVER + 'api/coupon/getCouponUserList',
					data: {
						"openId": localStorage.getItem("openid"),
						"carNumber": localStorage.getItem("car_number")
					},
					headers: {
						"Content-Type": "application/json;charset=UTF-8"
					}

				}).then(function(res) {
					vm.conponList = res.data.data;
					if(res.data.data.length == 0) {
						vm.none = '暂无优惠券  | 点击继续支付'
					}
				})
			}
		}
	}
</script>