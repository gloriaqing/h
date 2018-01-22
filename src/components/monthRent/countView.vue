<style scoped="scoped">
	.titleCount{background: #1095D9;height: 45px;
    background: #1095D9;
   color: #fff;
    margin-top: 0px;
    line-height: 45px;}
    .countVi{margin-top: -10px;}
    .countVi li{display: block;border-bottom: 1px solid #C8C8C8;padding: 10px 0;padding: 10px 32px;text-align: left; width: 100%;}
    .countVi li span:first-child{display: inline-block;width: 34%;color: #474747;font-size: 16px;text-align: left;}
    .countVi li span:nth-child(2){display: inline-block;color: #474747;font-size: 16px;text-align: left;margin-left: 5px;}
    .getTiCount{background: rgb(255, 255, 255);
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;}
</style>
<template>
	<div class="getTiCount">
		<h3 class="titleCount">账单详情</h3>
		<div>
			<ul class="countVi">
				<li>
					<span>停车场</span>
					<span v-model="park">{{park}}</span>
				</li>
				<li>
					<span>车牌号</span>
					<span v-model="carNumber">{{carNumber}}</span>
				</li>
				<div v-show="momentType">
					<li>
						<span>入场时间</span>
						<span v-model="enterTime">{{enterTime}}</span>										
					</li>
					<li>
						<span>出场时间</span>
						<span  v-if="outTime!='NaN-aN-aN NaN:NaN:NaN'" v-model="outTime">{{outTime}}</span>
						<span v-else>--</span>
					</li>
				</div>
				<div v-show="monthType">
					<li>
						<span>开始时间</span>
						<span v-model="monthgetTime">{{monthgetTime}}</span>										
					</li>
					<li>
						<span>结束时间</span>
						<span v-if="dayOutTime!=''" v-model="dayOutTime">{{dayOutTime}}</span>
						<span v-else v-model="monthoutTime">{{monthoutTime}}</span>
					</li>
				</div>
				<li v-show="payT">
					<span>支付时间</span>
					<span v-if="waitingPay==1" v-model="payTime">{{payTime}}</span>
					<span v-else>--</span>
				</li>
				<li v-show="payM">
					<span>支付时间</span>					
					<span v-model="payMonthTime">{{payMonthTime}}</span>
				</li>
				<li v-show="momentType">
					<span>停车费用</span>
					<span v-model="parkingFee">{{parkingFee}}元</span>					
				</li>
				<li v-show="monthType">
					<span>租约费用</span>
					<span v-model="parkingFee">{{parkingFee}}元</span>					
				</li>
				<li v-show='momentPark'>
					<span>停车券抵扣</span>
					<span  v-model="coupon">{{coupon}}元</span>
				</li>
				<li v-if="actFee">
					<span>实际支付</span>
					<span v-if="waitingPay==1" v-model="actFee">{{actFee}}元</span>
					<span v-else>--</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	Date.prototype.format = function(fmt) { //计算结束时间
		function fillZero(v){
	         if(v<10){v='0'+v;}
	         return v;
	     }
		var o = {
			"M+": this.getMonth() + 1, //月份
			"d+": fillZero(this.getDate()), //日
			"h+": fillZero(this.getHours()), //小时
			"m+": fillZero(this.getMinutes()), //分
			"s+": fillZero(this.getSeconds()), //秒
			"q+": fillZero(Math.floor((this.getMonth() + 3) / 3)), //季度
			"S": fillZero(this.getMilliseconds()) //毫秒
		};
		if(/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for(var k in o) {
			if(new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;
	} 
		Math.formatFloat = function(f, digit) { 
		    var m = Math.pow(10, digit); 
		    return parseInt(f * m, 10) / m; 
		} 
	export default{
		data(){
			return{park:'',carNumber:'',enterTime:'',outTime:'',range:'',parkingFee:'',coupon:'',actFee:'',
			rentType:true,monthoutTime:'',payTime:'',leaseType:'',monthgetTime:'',momentPark:true,
			dayOutTime:'',payM:'',payT:'',waitingPay:'',payMonthTime:'',monthOutTime:''
			}
		},
		created(){
			
			this.park= this.$route.params.park
			this.carNumber=this.$route.params.carNumber						
			this.leaseType=this.$route.params.leaseType
			this.enterTime=this.$route.params.enterTime
			this.outTime=this.$route.params.outTime
			this.monthgetTime=this.$route.params.monthgetTime
			this.monthoutTime=this.$route.params.monthOutTime
			this.parkingFee=this.$route.params.parkFee
			this.dayOutTime=this.$route.params.dayOutTime
			this.payMonthTime=this.$route.params.payMonthTime
			console.log(this.monthoutTime)
			console.log(this.dayOutTime)
//			this.payTime=
			
			console.log(this.leaseType)
			if(this.leaseType=='临停'){
				this.momentType=true
				this.monthType=false
				this.payT=true
				this.payM=false
				this.momentPark=true
			}else{
				
				this.momentType=false
				this.monthType=true
				this.payT=false
				this.payM=true
				this.momentPark=false
			}
			
			this.$http({
				method: 'post',
				url:'http://prod20.yc-yunpass.com:8080/billing/getBillInfoByID',
				headers:{
			        "Authorization":"WEIXINSERVER:{}",
			        "Content-Type":"application/json"},
				data:{"billing_id":localStorage.getItem("billing_id")}					
			}).then(res=> {
				console.log(res)
				if(res.data.code==1){
					this.enterTime=this.$route.params.enterTime
					this.outTime=this.$route.params.outTime
					this.parkingFee=res.data.data.billing_fee
					this.actFee=res.data.data.should_fee
					
					this.payTime=res.data.data.bill_create_time
					this.waitingPay=res.data.data.bill_status
//					this.payMonthTime=res.data.data.order_info.order_create_time
					var bil= res.data.data.billing_desc;
					//this.coupon=res.data.data.discount_fee	
					var getDisCount=Number(this.parkingFee) - Number(this.actFee);
					this.coupon=parseFloat(getDisCount).toFixed(2)
//					console.log(Number(this.parkingFee)-Number(this.actFee),90)
//					if(this.coupon.indexOf('.00')==1){ //不要删
//						this.coupon=this.coupon.substr(0,this.coupon.length-3)
//					}
					
					//this.coupon = Math.ceil(parseFloat(this.parkingFee*100 - this.actFee*100))/100;
					console.log(this.coupon,90000)
				}
				
			})
			
		//	this.range=this.$route.params.parkFee
		}
	}	
</script>

