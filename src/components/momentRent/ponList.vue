<style scoped>
	.conpon {
		width: 80%;
		height: 120px;
		background-color: #E1EDF7;
		border: 1px dashed grey;
		border-radius: 5px;
		margin-left: 0px;
	}
	
	h1 {
		color: #31B0D5;
	}
	
	p span {
		margin-top: 10%;
		font-size: 16px;
		color: #31B0D5;
	}
	
	em {
		color: #31B0D5;
	}
	
	
</style>
<template>
	<div class="container">
		<div class="row">
			<!--<div class="col-xs-8 col-xs-offset-2">-->
			<h3 style="background: #1095D9;margin-top: 0px;height: 45px;color: #fff;line-height: 45px;">优惠券</h3>
			<!--</div>-->
		</div>
		<div class="row">
			<div class="col-xs-10 col-xs-offset-1 cp" v-for="(conpon,index) in userConponList">
						<div class="row">
							<div class="col-xs-8 cp-content">
								<h3 class="cp-title">临停·
									<span v-if="conpon.type == 0">免费停车</span>
									<span v-else-if="conpon.type == 1">减免时间</span>
									<span v-else-if="conpon.type == 2">减免金额</span>
									<span v-else-if="conpon.type == 3">打折优惠</span>
									<span v-else>固定金额</span>
								</h3>
								<p class="cp-surplus">{{conpon.endTime}}前有效</p>
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
		</div>

			<div v-show="noneCoupon" style="font-size: 16px;margin: 15px;text-align: center;">暂无可用优惠券</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				userConponList: [],
				noneCoupon:false
			}
		},
		mounted() {
			this.getUserConponList()
		},
		methods: {
			getUserConponList() {
				var vm = this;
				this.$http({
					method: 'post',
					url: SERVER + 'api/coupon/getCouponUserList',
					data: {
						"openId": localStorage.getItem('openid'),
						"carNumber": localStorage.getItem('car_number')
					},
					headers: {
						"Content-Type": "application/json; charset=UTF-8"
					}

				}).then(function(res) {
					console.log(res);
					var data = res.data.data
					for(var i=0;i<data.length;i++){
						data[i].endTime = data[i].endTime.substring(0,10)
					}
					vm.userConponList = data;
					if(data.length == 0){
//						vm.$Message.error({content:'暂无优惠券',top:'450px'})
						vm.noneCoupon = true
					}else{
						vm.noneCoupon = false
					}

				})
			},

		}
	}
</script>