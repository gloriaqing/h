<style scoped>
	.tP{width: 100%;height: 45px;background: #1095D9;font-size: 16px;color: #fff;line-height: 45px;}
  .getWhite{border-bottom: 1px solid #9D9D9D;}
  .getWhite:last-child{border-bottom: none;}
  .getChild{display: flex;justify-content: space-between;
  background: #fff;width:100%;padding: 10px 15px 0;}
  .getChild div:last-child span{color: #03A9F4;font-size: 15px;}
  .endOut{padding: 0px 0 1px;font-size: 14px;}
  /*.endOut p{display: flex;justify-content: center;padding-top: 10px;}*/
  .lastDex{display: flex;justify-content: space-between;padding: 0px 15px;
  background: #fff;width:100%;}
  .lastDex span{line-height: 45px;}
  .lastDex div:last-child span:first-child{font-size: 16px;}
  .lastDex div:last-child span:last-child{color:red;font-size: 15px;}
  .getWhite{margin-top: 15px;}
  .getWhite:nth-child(1){margin-top: 10px;}
  /*.getType span:first-child{width: 100px;text-align: right;margin-right: 5px;}*/
 .getType{width: 100%;text-align: left;box-sizing: border-box;}
 
 .totalCount .lockHide{height: 50px;color: #fff;line-height: 42px;display: flex;
   font-size: 20px;}
  .totalCount .lockHide span{width: 50%;}
  .totalCount .spanNew{text-align: center;display: block;width: 50%;cursor: pointer;
	height: 50px;line-height: 50px;color: #000;background: #eee;}
.totalCount	.turnTopic{background: #0095FF;color: #fff;}
.getWhiteMonth:nth-child(1){margin-top: 10px;} 
.getWhiteMonth{border-bottom: 1px solid #9D9D9D;}
  .getWhiteMonth:last-child{border-bottom: none;}
</style>
<template>
    <div class="totalCount">
    	<!--<p class="tP">账单查询</p>-->
    	<div class="lockHide" style="">
			<span  v-bind:class="{turnTopic:isTopicA}" class="spanNew" @click="lockC">临停</span>
			<span @click="bindC" v-bind:class="{turnTopic:isTopicB}"
				 class="spanNew">长租</span>
		</div>
		<div v-show="showMoment" >
		<div class="getWhite" v-for="(orders,index) in orderList" >
			<div class="getChild">   <!--在此处写v-for循环-->
				<div style="width: 100%;">
					<div style="float: left;">
						<img src="../../assets/img/icon/车辆.png" style="width: 25px;vertical-align: bottom;" />
						<span>{{orders.lease.car_plate_number}}</span>
					</div>
					<!--<p>-->
						<!--<span style="display: inline-block;width:100px;text-align: right;line-height: 31px;color: #9D9D9D;">
						{{orders.lease.lease_type}}</span>-->
					<!--</p>-->	
					<div style="line-height: 31px;float: right;" @click="goViewMoment(orders)">
						<span style="color: #333;font-size: 18px;">详情</span>
						<img width="20px" src="../../assets/img/more.png"  />
					</div>
				</div>			
			</div>		
			<div>
			<div>
				<div class="endOut" >				
					<div>
						<div class="getType">
							<span style="display: inline-block;width: 100px;text-align: right;margin-right: 12px;">驶入时间</span>
							<span style="text-align: left;">
								{{orders.lease.act_start_time}}</span>
							
						</div>					
						<div class="getType">
							<span style="display: inline-block;width: 100px;text-align: right;margin-right: 12px;">驶出时间</span>
							<span  v-if="orders.lease.act_end_time!='NaN-aN-aN NaN:NaN:NaN'" style="text-align: left;">
								{{orders.lease.act_end_time}}
								</span>	
							<span v-else="">--</span>
						</div>
					</div>				
				</div>	
			</div>
			
			</div>
			<div class="lastDex">
				<div style="line-height: 46px;">
					<img src="../../assets/img/icon/位置.png" style="width: 25px;vertical-align: middle;" />
					<a v-if="orders.park">{{orders.park.parklot_name}}</a>
					<a v-else>待确认</a>
				</div>
				<div>
					<div v-if="orders.billing.bill_status==1">
						<span >已支付</span> <!--未支付/支付-->
						<span>{{orders.billing.should_fee}}元</span>						
					</div>
					<div v-if="orders.billing.bill_status==0">
						<span>未支付</span>
						<span>{{orders.billing.should_fee}}元</span>
					</div>
					<div v-if="orders.billing.bill_status==2">
						<span>待支付</span>
						<span>{{orders.billing.should_fee}}元</span>
					</div>
				</div>
				<!--<div v-else>
					<span>正在计费中</span>
				</div>-->
			</div>
		</div>
		</div>	
		<div v-show="showMonth">
		<div class="getWhiteMonth" v-for="(orders,index) in monthList">
			<div class="getChild">   
				<div style="width: 100%;">
					<div style="float: left;">
						<img src="../../assets/img/icon/车辆.png" style="width: 25px;vertical-align: bottom;" />
						<span>{{orders.lease_id.car_plate_number}}</span>
					</div>
					<!--<p>
						<span style="display: inline-block;width:100px;text-align: right;line-height: 31px;color: #9D9D9D;">
						{{orders.lease_type}}</span>
					</p>	-->
					<div style="line-height: 35px;float: right;" @click="goView(orders)">
						<span style="color: #333;font-size: 18px;">详情</span>
						<img width="20px" src="../../assets/img/more.png"  />
					</div>
				</div>			
			</div>		
			<div>
			<div>
				<div class="endOut">				
					<div>
						<div class="getType">
							<span style="display: inline-block;width: 135px;text-align: right;" v-if="orders.lease.got">
								{{orders.lease.got}}&nbsp;&nbsp;
							</span>
							
							<span style="text-align: left;">
								{{orders.lease.leaseStartTime}}</span>
							
						</div>					
						<div class="getType">
							<span style="display: inline-block;width: 135px;text-align: right;">{{orders.lease.out}}&nbsp;&nbsp;</span>
							<span v-if="orders.lease.longLeaseType==0" style="text-align: left;">
								{{orders.lease.leaseEndTime}}
								</span>	
								<span v-if="orders.lease.longLeaseType==1" style="text-align: left;">
								{{orders.lease.bigEnd}}
								</span>
								<span v-if="orders.lease.longLeaseType==2" style="text-align: left;">
								{{orders.lease.bigEnd2}}
								</span>	
								<!--<span v-else>{{orders.lease.bigEnd}}</span>-->
						</div>
					</div>				
				</div>	
			</div>
			
			</div>
			<div class="lastDex">
				<div style="line-height: 46px;">
					<img src="../../assets/img/icon/位置.png" style="width: 25px;vertical-align: middle;" />
					<a v-if="orders.park">{{orders.park.parklot_name}}</a>
					<a v-else>待确认</a>
				</div>
				<div>
						<span >已支付</span> 
						<span>{{orders.lease.totalFee}}元</span>
						
				</div>
					
				<!--<div v-if="orders.billing">
					<div v-if="orders.billing.bill_status==1">
						<span >已支付</span> <!--未支付/支付-->
						<!--<span>{{orders.billing.should_fee}}元</span>-->
						<!--<strong class="money" >0元</strong>
					</div>
					<div v-if="orders.billing.bill_status==0">
						<span>未支付</span>
						<span>{{orders.billing.should_fee}}元</span>
					</div>
					<div v-if="orders.billing.bill_status==2">
						<span>待支付</span>
						<span>{{orders.billing.should_fee}}元</span>
					</div>
				</div>
				<div v-else>
					<span>正在计费中</span>
				</div>-->
			</div>
		</div>
		</div>	
		
    	<!--<h3 v-show='hideBil' style="line-height: 44px;background: #f0f0f0;margin-top: -9px;">暂无账单</h3>-->
  </div>
</template>  
<script> 
	Date.prototype.format = function(fmt) { //计算结束时间
		var o = {
			"M+": this.getMonth() + 1, //月份
			"d+": this.getDate(), //日
			"h+": this.getHours(), //小时
			"m+": this.getMinutes(), //分
			"s+": this.getSeconds(), //秒
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度
			"S": this.getMilliseconds() //毫秒
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
	function DateAdd(interval, number, date) { //计算时间结束日期
		switch(interval) {
			case "y ":
				{
					date.setFullYear(date.getFullYear() + number);
					return date;
					break;
				}
			case "q ":
				{
					date.setMonth(date.getMonth() + number * 3);
					return date;
					break;
				}
			case "m ":
				{
					date.setMonth(date.getMonth() + number);
					return date;
					break;
				}
			case "w ":
				{
					date.setDate(date.getDate() + number * 7);
					return date;
					break;
				}
			case "d":
				{
					date.setDate(date.getDate() + number);
					return date;
					break;
				}
			case "h":
				{
					date.setHours(date.getHours() + number);
					return date;
					break;
				}
			case "m":
				{
					date.setMinutes(date.getMinutes() + number);
					return date;
					break;
				}
			case "s ":
				{
					date.setSeconds(date.getSeconds() + number);
					return date;
					break;
				}
			default:
				{
					date.setDate(d.getDate() + number);
					return date;
					break;
				}
		}
	}
	
	var openid;
  	var type,phone;	
  	var matchNum=/^[0-9]*$/;
  
	export default {
			data() {
				return {
					orderList: [],resTime:'',resf:'',leaseType:'',showPay:false,hideBil:false,
					items:[],show:true,payTrue:'', //存储请求返回的数据
					moment:false,month:true,isTopicB:false,isTopicA:true,showMonth:false,showMoment:true,
					monthList:[],totalList:[],ary:[]
				}
			},
			created() {	
			//	localStorage.setItem('userid','8a9ac7ed5f6c7315015f762b21e7055f')
			
					
				if(sessionStorage.getItem('knowLastTime')=='1'){
					this.showMonth=true
					this.showMoment=false
					this.isTopicA=false
					this.isTopicB=true
					this.getMonthRent()
				}else{
					this.showMonth=false
					this.showMoment=true
					this.isTopicA=true
					this.isTopicB=false
					this.update()
					
				}
			},
			methods: {	
				update(){
					this.$http({
						method: 'post',
					//	url:'http://prod20.yc-yunpass.com/cloud/api/park/queryBillings?userId=8a9909325ddf4598015ddf78abf70361'
						url: 'http://prod20.yc-yunpass.com/cloud/api/park/queryBillings',
						data:{'userId':localStorage.getItem('userid')}					
				}).then(res=> {		
						this.orderList = res.data.data;
						if(this.orderList.length!=0){	
//							this.hideBil=false	
						for(var i =0;i<this.orderList.length;i++){		
							//this.orderList[i].billing.descStart=this.orderList[i].billing.billing_desc.substring(0,10)
							//this.orderList[i].billing.billing_desc=this.orderList[i].billing.billing_desc.substring(this.orderList[i].billing.billing_desc.length-4,this.orderList[i].billing.billing_desc.length-2)
							var rightTime=new Date(this.orderList[i].lease.startTime)
							this.orderList[i].lease.time=parseInt(this.orderList[i].lease.time) 
							rightTime.setDate(rightTime.getDate()+this.orderList[i].lease.time);							
							this.orderList[i].lease.endTime=rightTime.format("yyyy-MM-dd");	
							this.orderList[i].lease.park=this.orderList[i].park.parklot_name
							this.orderList[i].lease.should_fee=this.orderList[i].billing.should_fee
							this.orderList[i].lease.bill_status=this.orderList[i].billing.bill_status
							this.orderList[i].lease.billing_id=this.orderList[i].billing.billing_id
							var tt1 = parseInt(this.orderList[i].lease.reg_start_time) //转换时间戳开始
							var s1=new Date(tt1)
							var s22=s1.format("yyyy-MM-dd h:m:s")
							this.orderList[i].lease.reg_start_time=s22
							var tt = parseInt(this.orderList[i].lease.reg_end_time)
							var s=new Date(tt)
							var s2=s.format("yyyy-MM-dd h:m:s")			
							this.orderList[i].lease.reg_end_time=s2							
							var tt3 = parseInt(this.orderList[i].lease.act_start_time)							
							var s12=new Date(tt3)
							var s223=s12.format("yyyy-MM-dd h:m:s")
							this.orderList[i].lease.act_start_time=s223							
							var tt4 = parseInt(this.orderList[i].lease.act_end_time)
							var s13=new Date(tt4)
							var s224=s13.format("yyyy-MM-dd h:m:s")
							this.orderList[i].lease.act_end_time=s224 //转换时间戳结束
							
							if(this.orderList[i].lease.lease_type==1){ //判断租约类型
								this.ary.push(this.orderList[i].lease)
								this.orderList[i].lease.lease_type='临停'		
								this.orderList[i].lease.get='驶入时间'
								this.orderList[i].lease.eut='驶出时间'
							}else{
								this.orderList[i].lease.lease_type='长租'			
								this.orderList[i].lease.got='租约开始时间'
								this.orderList[i].lease.out='租约结束时间'
							}														
						}
						
						}else if(this.orderList.length==0){
//							this.hideBil=true
							alert('暂无临停账单')						
//							openid=localStorage.getItem('openid');
//							type=localStorage.getItem('type');
//							phone=localStorage.getItem('phone');	
							//window.location.href="/?openid=" + openid + "&type="+type+"&phone="+phone
						}
					});
				},
				lockC(){
					this.showMoment=true 
		      		this.showMonth=false
		      		this.lockList=true
		      		this.validList=false
		      		this.isTopicA=true
		      		this.isTopicB=false
		      		this.update()
		      	},
		      	bindC(){
		      		this.showMoment=false
		      		this.showMonth=true
		      		this.validList=true
		      		this.isTopicA=false
		      		this.isTopicB=true
		      		this.getMonthRent()
		      	},
		      	getMonthRent(){
		      		this.$http({
						method: 'post',
					//	url:'http://prod20.yc-yunpass.com/cloud/api/park/queryBillings?userId=8a9909325ddf4598015ddf78abf70361',
						url: 'http://prod20.yc-yunpass.com/cloud/api/wechat/pay/queryLBiiling',
						data:{'userId':localStorage.getItem('userid')}
				}).then(res=> {
					console.log(res)
					this.monthList=res.data.data
					if(this.monthList.length!=0){	
//						this.hideBil=false
					for(var i =0;i<this.monthList.length;i++){
						this.monthList[i].lease.got='租约开始时间'
						this.monthList[i].lease.out='租约结束时间'
//						var now = new Date(this.firstValue);				
//						var newDat23e = DateAdd("m ",this.monthList[i].longLeaseType.toString(), this.monthList[i].leaseStartTime);//计算得到结束时间)
//						var timeMonth = newDate23.format("yyyy-MM-dd")
//						console.log(timeMonth,900)
						var tt1 = parseInt(this.monthList[i].lease.createTime) //转换时间戳开始
						var s1=new Date(tt1)
						var s22=s1.format("yyyy-MM-dd h:m:s")
						this.monthList[i].lease.createTime=s22
						
						var tt2 = parseInt(this.monthList[i].lease_id.act_end_time) //转换时间戳开始
					
						var s2=new Date(tt2)
						var s222=s2.format("yyyy-MM-dd")
						
						this.monthList[i].lease_id.act_end_time=s222
						
						if(this.monthList[i].lease_id.lease_type==2||this.monthList[i].lease_id.lease_type==3){
							this.monthList[i].lease_id.lease_type='长租'	
						}else{
							this.monthList[i].lease_id.lease_type='临停'	
						}
						if(this.monthList[i].lease.longLeaseType==1){
							var now1 = new Date(this.monthList[i].lease.leaseStartTime);				
							var newDate1 = DateAdd("m ",Number(this.monthList[i].lease.leaseDuration),now1);//计算得到结束时间)
							this.monthList[i].lease.bigEnd = newDate1.format("yyyy-MM-dd") //标准结束时间
							
						}if(this.monthList[i].lease.longLeaseType==2){
							var now2 = new Date(this.monthList[i].lease.leaseStartTime);				
							var newDate2 = DateAdd("m ",this.monthList[i].lease.leaseDuration*12,now2);//计算得到结束时间)
							this.monthList[i].lease.bigEnd2 = newDate2.format("yyyy-MM-dd") //标准结束时间
						}
						
					}
					}else if(this.monthList.length==0){
//						this.hideBil=true
						alert('暂无长租账单')
					}
					console.log(this.monthList)
				})
		      	},
		      	goViewMoment(item){
		      		console.log(item)
		      		sessionStorage.setItem('knowLastTime',2);
		      		localStorage.setItem('billing_id',item.billing.billing_id)
		      		this.$router.push({name:'countView',
					params: { park: item.park.parklot_name,carNumber: item.lease.car_plate_number,shouldFee:item.billing.should_fee,
						enterTime:item.lease.act_start_time,
					outTime:item.lease.act_end_time,leaseType:item.lease.lease_type}})
		      	},
				goView(item){
					console.log(item)
					var mOut;
					if(item.lease.bigEnd2!=null){ //判断租约类型
						var mOut=item.lease.bigEnd2
					}else if(item.lease.bigEnd!=null){
						var mOut=item.lease.bigEnd
					}else if(item.lease.leaseEndTime!=null||item.lease.leaseEndTime!=''){
						var mOut=item.lease.leaseEndTime
					}
					sessionStorage.setItem('knowLastTime',1);										
					localStorage.setItem('billing_id',item.billing_id)
					this.$router.push({name:'countView',
					params: { park: item.park.parklot_name,carNumber: item.lease_id.car_plate_number,						
						parkFee:item.lease.totalFee,monthgetTime:item.lease.leaseStartTime,
						dayOutTime:item.lease.leaseEndTime,payMonthTime:item.lease.createTime,						
						leaseType:item.lease_id.lease_type,monthOutTime:mOut
					}})
				},
				test(a){
					return a != 'NaN-aN-aN';
				},
				goPay(item){
					console.log(item)
					localStorage.setItem('car_number',item.parkLease.carPlateNumber)
					localStorage.setItem('parklot_name',item.parkLot.parklot_name)
					localStorage.setItem('startTime',item.parkLease.regStartTime)
					localStorage.setItem('endTime',item.parkLease.regEndTime)
					localStorage.setItem('MonthRentFee',item.billing.shouldfee)
					localStorage.setItem('billing_id',item.billing.billingId)
					localStorage.setItem('billStatus',item.billing.billStatus)					
					if(item.parkLease.longLeaseType==0){
						this.$router.push({path:'/accInfo'})
					}else if(item.parkLease.longLeaseType==1){
						this.$router.push({path:'/pay'})
					}
				}
			}
	}
</script>
