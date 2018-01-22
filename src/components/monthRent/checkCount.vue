<style scoped="scoped">
	.titleCount{background: #1095D9;height: 45px;
    background: #1095D9;
   color: #fff;
    margin-top: 0px;
    line-height: 45px;}
    .countVi{margin-top: -10px;}
    .countVi li{display: flex;justify-content: center;border-bottom: 1px solid #C8C8C8;padding: 10px 0;}
    .countVi li span:first-child{display: inline-block;width: 26%;color: #474747;font-size: 16px;text-align: left;}
    .countVi li span:nth-child(2){display: inline-block;width: 52%;color: #474747;font-size: 16px;text-align: left;margin-left: 5px;}
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
				<div>
					<li>
						<span>开始时间</span>
						<span v-model="monthgetTime">{{monthgetTime}}</span>										
					</li>
					<li>
						<span>结束时间</span>
						<span v-model="monthoutTime">{{monthoutTime}}</span>
					</li>
				</div>
				<li v-show="payT">
					<span>支付时间</span>
					<span v-model="payTime">{{payTime}}</span>
					
				</li>
				
				<li>
					<span>停车费用</span>
					<span v-model="parkingFee">{{parkingFee}}元</span>					
				</li>
				
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{park:'',carNumber:'',enterTime:'',outTime:'',range:'',parkingFee:'',coupon:'',actFee:'',
			rentType:true,monthoutTime:'',payTime:'',leaseType:'',monthgetTime:'',
			payMonthTime:'',payM:'',payT:''
			}
		},
		created(){
			
			this.park= this.$route.params.parkName
			this.carNumber=this.$route.params.carNumber						
			this.parkingFee=this.$route.params.fee
			this.monthgetTime=this.$route.params.startTime
			this.monthoutTime=this.$route.params.endTime						
		//	this.range=this.$route.params.parkFee
		}
	}	
</script>

