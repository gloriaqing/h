<style>
	@import '../../assets/css/chooseDate.css';
	.chooseRentType .ivu-modal-footer{border: none;}
	.chooseRentType .ivu-modal-body{text-align: center;}
	.ivu-modal-footer{border: none;}
	.ivu-select-single .ivu-select-selection{height: 40px !important;}
	.ivu-select-selection{border: 1px solid #ccc;}
	.getMStyle{position: relative;
    z-index: 999;
    width: 90%;
    height: 40px;
    
    margin: 0 auto;
   
}
.getMStyleUl{
	height: 128px;
    overflow: auto;
    position: absolute;
    width: 100%;
    z-index: 90;
    top: 41px;
    background: #fff;
    border: 1px solid #ccc;
    margin: 0px auto;
    border-radius:4px ;
}
.getSpanStyle{width: 100%;
    display: inline-block;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 15px;
    line-height: 40px;
    text-decoration: none;
    }
   
    a:active, a:hover{text-decoration: none !important;}
</style>
<template>
	<div class="ssHead">
		<h3 style="padding-top: 20px;margin-top: 0;color: #1095D9;padding-bottom: 15px;">{{parkName}}</h3>
		<div class="form-horizontal contract">
			<div class="form-group" style="margin-top: -18px;">
				<label class="parkText" style="margin-top: 0;">租用类型</label>
				 <!--<RadioGroup v-model="getType" @on-change="changeRent" style="display: flex;justify-content: space-around;">
			        <Radio  v-model='d1' label="日租" ></Radio>
			        <Radio  v-model='d2' label="月租"></Radio>
			        <Radio  v-model='d3' label="年租"></Radio>
			   </RadioGroup>	-->
			   <RadioGroup v-model="getType" @on-change="changeRent" style="margin: 10px 0;width: 100%;text-align: center;">
          		<a style="width: 33%;display: block;float: left;">
          			<Radio  v-model='d1' label="日租" ></Radio>	
          		</a>
		        <a style="width: 33%;display: block;float: left;"><Radio  v-model='d2' label="月租"></Radio></a>
		        <a style="width: 33%;display: block;float: right"> <Radio  v-model='d3' label="年租"></Radio></a>
		        
		       
		    </RadioGroup></br>
				<!--<Select  v-model="termType" @on-change="chosRenType" style="width: 91%;height: 40px;"
					filterable placeholder="请选择租用类型" class="selectDIv">
				        <Option v-for="item in rentTypes"  :value="item.id" :key="item.type">{{ item.type }}</Option>
					</Select>-->
			</div>
			<div class="form-group" v-show="showYearDisplay">
				<label class="parkText">租约开始时间</label>
				<div class="col-sm-10 deHeight">					
					 <datepicker @click='checkStart' v-model="firstValue" language='ch'></datepicker>
					<!--<Date-picker type="date" :options="optionsDate" @on-change="getInVa" v-model="firstValue" style="width:100%;display: block;font-size: 15px" placeholder="选择日期"></Date-picker>-->
				 <span v-show='show1' class="notice">请选择日期</span>
				</div>
			</div></br>		
			<div class="form-group" v-show="showElseDisplay" style="margin-top: -20px;">
				<label class="parkText">租约开始时间</label>
				<h4 style="margin-left: 15px;text-align: left;color: rgb(16, 149, 217);">{{firstValue}}</h4>
				
			</div></br>
			<div class="form-group" style="margin-top: -27px;">
				<label class="parkText">租约时长</label>
				<div class="monthDate deHeight">					
					<div class="col-sm-10 deHeight" v-show='dayRen'>						
						 <datepicker v-model="dayVal" language=ch></datepicker>
					</div>
					<!--<div>-->						
						<!--<Input ></Input>-->					
					<div  v-show="monthRen" class="getMStyle">
						<a @click="showM"   class="getSpanStyle" v-model="getSpanType">{{getSpanType}}
							<span v-show="getGShow">{{getG}}</span></a>
						<ul v-show="showUL" class="getMStyleUl" >
							<li @click="getSp(item)" style="padding: 2px;font-size: 18px;" v-for="item in monthNumbers">{{item.type}}</li>
						</ul>	
					</div>
					<div  v-show="yearRen" class="getMStyle">
						<a @click="showY"  class="getSpanStyle" v-model="getYearType">{{getYearType}}
							<span v-show="getGShow">{{getY}}</span></a>
						<ul v-show="showUL2" class="getMStyleUl" >
							<li @click="getSy(item)" style="padding: 2px;font-size: 18px;" v-for="item in yearNumbers">{{item.type}}</li>
						</ul>	
					</div>
					
					<Select placement='top'  v-show='false' v-model="termMonthNum"  @on-change="chosMOnthNumber" style="width: 91%;height: 40px;"
					filterable class="selectDIv">
				        <Option v-for="item in monthNumbers"  :value="item.type" :key="item.type">{{ item.type }}</Option>
					</Select>
					
					<Select placement='top'  v-show="false" v-model="termYearNum"  @on-change="chosYearNumber" style="width: 91%;height: 40px;"
					filterable class="selectDIv">
				        <Option v-for="item in yearNumbers"  :value="item.type" :key="item.type">{{ item.type }}</Option>
					</Select>	
					<!--</div>-->					
					<!--<Input v-show="yearRen"></Input>-->							 
			   		<!--<img src="../../assets/img/images/minus (2).svg" class="delImg" @click='decrese' />-->
			   <span v-show='show2' class="notice">请选择租期</span>
				</div>
			</div>			
			<div class="form-group" v-show="ifCarseat">
				<label class="parkText">车位</label>
				<div class="col-sm-10 deHeight">
					<Input type="text" class="chanBack" disabled="disabled" v-model="carPlace" @blur="isiblesPark"  placeholder="车位" ></Input>
	<!--				<span v-show='show4' style="color:red;display:block">请选择车位</span>
	-->			</div>
			</div>
		</div>
		<div style="background: #f0f0f0;width: 100%;" class="chooseRentType">
			<button type="button" @click="goPay" class="btn btn-primary btnSure" data-toggle="button"> 确认</button>
		</div>			
			<Modal v-model="chooseRent" width="360" :closable="false" @on-cancel='cancelCRent' @on-ok="okCRent">
				<Select  v-model="termType"  @on-change="chosRenType" style="width: 50%;display: block;;margin:0 auto;"
					filterable placeholder="请选择租用类型" class="selectDIv">
				        <Option v-for="item in rentTypes"  :value="item.id" :key="item.type">{{ item.type }}</Option>
				</Select>			
		</Modal>
	</div>
</template>
<script>
	import datepicker from 'vue-date'
//	import myDate from './monthRent'
//	import myDatepicker from 'vuejs-datepicker'
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
	var da= localStorage.getItem('durationDate')
	var sd=localStorage.getItem('today')
	var cardNumber;
	var phone;
	var getMonth='0';
	var userid;
//	import { mixin as clickaway } from 'vue-clickaway';
	export default{
//		 mixins: [ clickaway ],
		components: { datepicker },
		data() {
			return {
				show: false,show1:false,show2:false,show3:false,show4:false,canlender:false,
				showPark:false,termMonthNum:'',termYearNum:'',getSpanType:'',
				firstValue: '',
				model13: '',
				hide: true,
				parktext: '',
				parkList: [],
				carPlaces: [],
				carPlace: "",
				ser_text: "",
				parkList: [],
				billingid:'',ifCarseat:false,				
				getNum: '',
				getNumMonth: '',
				carSeat: '',
				parkportid: '',
				sd: true,
				parkid: '',phone:'',vertical:'',valRentType:'',chooseRent:false,getG:'个月',
				optionsDate:{
					disabledDate (date) {
					     const disabledDay = date.getDate();
              			return date&&date.valueOf() < sd
              		}
				},rentTypes:[{type:'日租',id:1},{type:'月租',id:2},{type:'年租',id:3}],termType:'',dayVal:'',dayRen:true,
				monthRen:false,getDay:false,yearRen:false,
				monthNumbers:[{type:1},{type:2},{type:3},{type:4},{type:5},{type:6},{type:7},{type:8},{type:9},
				{type:10},{type:11},{type:12}],yearNumbers:[{type:1},{type:2},{type:3},{type:4},{type:5}],
				getMonthDur:'',getYearDur:'',d1:false,d2:false,d3:false,getType:'',getGShow:false,showUL:true,showUL2:true,
				getY:'年',getYearType:'',showYearDisplay:false,showElseDisplay:false,validStart:''
			}
		},
		props: ['carN', 'car_size', 'getPhone'],
		created() {
			//localStorage.setItem('sId','1')
		      cardNumber=localStorage.getItem('car_number')
		      this.parkid=localStorage.getItem('park_id')
//		      this.parktext=localStorage.getItem('parklot_name')
				this.parkName=this.$route.params.parkName	
		      this.carPlace=localStorage.getItem('parkport_number')
		      //获取最后一天并加一天
		      var rightTime= localStorage.getItem('endTime')
		      console.log(rightTime)
		      var rightDate = new Date(rightTime);//获取当前时间
		      rightDate.setDate(rightDate.getDate()+1);//设置天数 +1 天
		      this.firstValue = rightDate.format("yyyy-MM-dd");
		      console.log(this.firstValue)
		      this.validStart=this.$route.params.validStart;
		      phone=localStorage.getItem('phone')
				
	           this.$http({ // 暂时不要删
	            method:'POST',
	            url:'http://prod20.yc-yunpass.com/cloud/api/park/findLeaseId',
	            data:{'number':cardNumber,'type':localStorage.getItem('leaseType')}
	          }).then(res=>{
             		this.parkportid=res.data.data.parkportId
             		console.log(res.data.data.parkportId)
	           })
	          if(localStorage.getItem('leaseStatus')=='0'||localStorage.getItem('leaseStatus')=='1'){
	          	this.showElseDisplay=true
	          }else{
	          	this.showYearDisplay=true
	          }
		},

		methods: {
			showM(){
			
				this.showUL=true
			},
			showY(){
				this.showUL2=true
			},
			away(){
//				this.showMonth=false
				//this.showUL=false
			},
			getSp(item){
				console.log(item)
				this.getSpanType=item.type;
				this.getGShow=true
				this.showUL=false
			},
			getSy(item){
				this.getYearType=item.type
				this.getGShow=true
				this.showUL2=false
			},
			changeRent(value){
				console.log(value)
				if(value=='日租'){
					this.valRentType='0'					
					this.dayVal=''
					this.dayRen=true
					this.monthRen=false
					this.yearRen=false
				}if(value=='月租'){
					this.valRentType='1'
					this.termMonthNum=''  
					this.dayRen=false
					this.monthRen=true
					this.yearRen=false
					this.showUL=true
				}if(value=='年租'){
					this.valRentType='2'
					this.termYearNum=''
					this.dayRen=false
					this.monthRen=false
					this.yearRen=true
					this.showUL2=true
				}
			},
			changeType(){
				
			},
			checkStart(){
				console.log(23)
				
			},
			chosYearNumber(value){
				console.log(value)
				this.getYearDur=value
			},
			chosMOnthNumber(value){
				console.log(value)
				this.getMonthDur=value
			},
			chosRenType(value){
				console.log(value)
				if(value==1){
					this.valRentType='0'					
					
					this.dayRen=true
					this.monthRen=false
					this.yearRen=false
				}if(value==2){
					this.valRentType='1'
					this.showUL=true
					this.dayRen=false
					this.monthRen=true
					this.yearRen=false
					console.log(3)
				}if(value==3){
					this.valRentType='2'
					this.dayRen=false
					this.monthRen=false
					this.yearRen=true
					this.showUL2=true
					this.showYearDisplay=true
				}
				localStorage.setItem('valRentType',value)
			},
			cancelCRent(){
				this.termType=''
			},
			okCRent(){
				
				if(this.valRentType=='0'){
//					this.seconRen=true
				}
				console.log(getMonth)
				getMonth='0'
			},
			getRadio(value){
				if(value=='日租'){
					this.valRentType='0'
				}else if(value=='月租'){
					this.valRentType='1'
				}else if(value=='年租'){
					this.valRentType='2'
				}		
				
			},
			pickCan(){
				this.canlender=true				
				this.firstValue=localStorage.getItem('firstValue')
			},
			add(){
				if(this.valRentType=='1'){
					
					this.chooseRent=false
					this.getNum=getMonth;
					 this.getNum = parseInt(this.getNum) + 1;
					 getMonth=this.getNum
					 console.log(this.getNum)
					this.getNum= this.getNum+'个月'
				}if(this.valRentType=='2'){
					
					this.chooseRent=false
					this.getNum=getMonth;
					 this.getNum = parseInt(this.getNum) + 1;
					 getMonth=this.getNum
					// console.log(this.getNum)
					this.getNum= this.getNum+'年'
				}
				
				
			},

			decrese(){
				if(getMonth > 0){
					getMonth=parseInt(getMonth) - 1
					
					if(getMonth!=0){
						if(this.valRentType=='1'){
							this.getNum = getMonth+'个月';	
						}if(this.valRentType=='2'){
							this.getNum = getMonth+'年';	
						}
						
					}
	            }
				console.log(typeof getMonth)
			},
			getInVa(data) {//获取日期
				console.log(data)
				this.firstValue = data;
			},
			pickMonth() { //显示月份列表
				console.log(2)
				this.show = true
				//this.chooseRent=true
				this.getNum=''
			},
			goPay() {		
				//localStorage.setItem('userid','8a9909325ddf4598015ddf78abf70361')
				
				var timestamp1=new Date(this.firstValue);
				var timestamp2 = new Date(this.dayVal);		
				var timestamp3=new Date(this.validStart);
				
				var now = new Date(this.firstValue);				
				var newDate = DateAdd("m ",this.getSpanType, now);//计算得到结束时间)
				var timeMonth = newDate.format("yyyy-MM-dd") //标准结束时间
				
				var newDate = DateAdd("m ",this.getYearType*12, now);				
				var timeYear = newDate.format("yyyy-MM-dd")
				
		        if(this.firstValue==''){//检测是否选中应填项开始
		         	alert('请选择开始时间')		       
		        }		        
		        if(timestamp1.getTime()>timestamp2.getTime()){
					alert('结束时间不能小于开始时间，请重新选择结束时间')
				}else if(timestamp1.getTime()==timestamp2.getTime()){
					alert('开始时间和结束时间不能相同')
				}
		        //如果每个Input框都有值
		        
		        if(timestamp3.getTime()==timestamp1.getTime()){
		        	alert('开始时间不能等于原来结束时间')
		        }else if(timestamp3.getTime()>timestamp1.getTime()){
		        	alert('开始时间不能小于原来结束时间')
		        }
		     if(localStorage.getItem('leaseStatus')=='0'||localStorage.getItem('leaseStatus')=='1'){ //假如租约等待执行或未执行
		     	//，则判断结束时间和固定开始时间的匹配
				if(this.firstValue!=''&&this.getType!=''&&this.dayVal!=''||this.getSpanType!=''||this.getYearType!=''){
				    if(localStorage.getItem('leaseType')=='2'){ //私有长租
				    	console.log(2)
				    	if(this.valRentType=='0'&&timestamp1.getTime()<timestamp2.getTime()&&timestamp1.getTime()!=timestamp2.getTime()
				    	&&this.dayVal!=''){ //如果为日租
				    		this.$http({
							url: 'http://prod20.yc-yunpass.com/cloud/api/wechat/pay/pCalculateFee', //私有车位
							method: 'POST',
						 // headers:{"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"},
							data: {
								    "leaseId":localStorage.getItem('leaseId'),
									"longLeaseType":this.valRentType, //保存租约类型，是月租就为1，是年租就为2
									"leaseDuration":getMonth.toString(),
									"leaseStartTime":this.firstValue,
									"leaseEndTime":this.dayVal,
//									"parkportId":this.parkportid,
									"userId":localStorage.getItem('userid'),
								//	"userId":"8a9909325ddf4598015ddf78abf70361",
									"sId":localStorage.getItem('sId')
								//	"sId":'1'
							}}).then(res=>{															
								//谭鲁的新租约
								if(res.data.data.code==1){
									console.log(res.data.data.tranId)
									localStorage.setItem('tranId',res.data.data.tranId)
									localStorage.setItem('MonthRentFee',res.data.data.data.fee)
									//谭鲁的新租约
									localStorage.setItem('startTime',this.firstValue)
								//	localStorage.setItem('endTime',time)
									localStorage.setItem('park_id',this.parkId)
									localStorage.setItem('parkport_id',this.parkportid)		
									localStorage.setItem('billingfee',res.data.data.billinginifee)
									localStorage.setItem('rentTime',this.getNum)
									if(res.data.data.data.fee!=null||res.data.data.data.fee!=''){
										
										
										localStorage.setItem('endTime',this.dayVal)
										window.location.href='http://www.yangchenkeji.com.cn/userpay/pay'
									}else{
										alert('添加失败，请稍后再试')
									}
								}else{
									alert('添加失败，请稍后再试')
								}
								
		
							})
				    	}
				    	else if(this.valRentType=='1'&&this.getSpanType!=''){ //假如为月租
				    		this.$http({
							url: 'http://prod20.yc-yunpass.com/cloud/api/wechat/pay/pCalculateFee', //私有车位
							method: 'POST',
						//	headers:{"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"},
							data: {
								    "leaseId":localStorage.getItem('leaseId'),
									"longLeaseType":this.valRentType,
									"leaseDuration":this.getSpanType.toString(),
									//"leaseDuration":this.getMonthDur.toString(),
									"leaseStartTime":this.firstValue,
									"leaseEndTime":'',
//									"parkportId":this.parkportid,
									"userId":localStorage.getItem('userid'),
									//"userId":"8a9909325ddf4598015ddf78abf70361",
									"sId":localStorage.getItem('sId')
							}}).then(res=>{		
								console.log(res)
								//谭鲁的新租约
								if(res.data.data.code==1){				
									localStorage.setItem('tranId',res.data.data.tranId)
									localStorage.setItem('MonthRentFee',res.data.data.data.fee)
									//谭鲁的新租约
									localStorage.setItem('startTime',this.firstValue)
									//localStorage.setItem('endTime',time)
									localStorage.setItem('park_id',this.parkId)
									localStorage.setItem('parkport_id',this.parkportid)		
									localStorage.setItem('billingfee',res.data.data.billinginifee)
									localStorage.setItem('rentTime',this.getNum)
									if(res.data.data.data.fee!=null||res.data.data.data.fee!=''){
										localStorage.setItem('endTime',timeMonth)
										window.location.href='http://www.yangchenkeji.com.cn/userpay/pay'
										
										
									}else{
										alert('添加失败，请稍后再试')
									}
								}else{
									alert('添加失败，请稍后再试')
								}
		
							})
				    	}else if(this.valRentType=='2'&&this.getYearType!=''){ //假如为年租
				    		this.$http({
								url: 'http://prod20.yc-yunpass.com/cloud/api/wechat/pay/pCalculateFee', //私有车位
								method: 'POST',
								  headers:{"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"},
								data: {
								    "leaseId":localStorage.getItem('leaseId'),
									"longLeaseType":this.valRentType,
									"leaseDuration":this.getYearType.toString(),
									//"leaseDuration":this.getYearDur.toString(),
									"leaseStartTime":this.firstValue,
									"leaseEndTime":'',
//									"parkportId":this.parkportid,
									"userId":localStorage.getItem('userid'),
								//	"userId":"8a9909325ddf4598015ddf78abf70361",
									"sId":localStorage.getItem('sId')
							}}).then(res=>{															
								//谭鲁的新租约
								if(res.data.data.code==1){																	
									localStorage.setItem('tranId',res.data.data.tranId)
									localStorage.setItem('MonthRentFee',res.data.data.data.fee)
									//谭鲁的新租约
									localStorage.setItem('startTime',this.firstValue)
									//localStorage.setItem('endTime',time)
									localStorage.setItem('park_id',this.parkId)
									localStorage.setItem('parkport_id',this.parkportid)		
									localStorage.setItem('billingfee',res.data.data.billinginifee)
									localStorage.setItem('rentTime',this.getNum)
									if(res.data.data.data.fee!=null||res.data.data.data.fee!=''){
										localStorage.setItem('endTime',timeYear)
										window.location.href='http://www.yangchenkeji.com.cn/userpay/pay'
										
									}else{
										alert('添加失败，请稍后再试')
									}
								}else{
									alert('添加失败，请稍后再试')
								}
		
							})
				    	}
				    	
				    }else if(localStorage.getItem('leaseType')=='3'){ //公有长租
				    	console.log(3)
				    	if(this.valRentType=='0'&&timestamp1.getTime()<timestamp2.getTime()&&timestamp1.getTime()!=timestamp2.getTime()
				    	&&this.dayVal!=''){ //如果为日租
				    	this.$http({
							url: 'http://prod20.yc-yunpass.com/cloud/api/wechat/pay/calculateFee', //公有车位
							method: 'POST',
							 // headers:{"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"},
							data: {
								    "leaseId":localStorage.getItem('leaseId'),
									"longLeaseType":this.valRentType,
//									"leaseDuration":getMonth.toString(),									
									"leaseDuration":'',
									"leaseStartTime":this.firstValue,
									"leaseEndTime":this.dayVal,
									"parkportId":this.parkportid,
									"userId":localStorage.getItem('userid'),
								//	"sId":'1'
									"sId":localStorage.getItem('sId')
							}}).then(res=>{
								console.log(res)
								//谭鲁的新租约
								if(res.data.data.code==1){
																	
									localStorage.setItem('tranId',res.data.data.tranId)
									localStorage.setItem('MonthRentFee',res.data.data.data.fee)
									//谭鲁的新租约
									localStorage.setItem('startTime',this.firstValue)
								//	localStorage.setItem('endTime',time)
									localStorage.setItem('park_id',this.parkId)
									localStorage.setItem('parkport_id',this.parkportid)		
									localStorage.setItem('billingfee',res.data.data.billinginifee)
									localStorage.setItem('rentTime',this.getNum)
									if(res.data.data.data.fee!=null||res.data.data.data.fee!=''){
										localStorage.setItem('endTime',this.dayVal)
										window.location.href='http://www.yangchenkeji.com.cn/userpay/pay'
										//localStorage.setItem('billing_id',res.data.data.billingId)

									}else{
										alert('添加失败，请稍后再试')
									}
								}else{
									alert('添加失败，请稍后再试')
								}
							})
						}else if(this.valRentType=='1'&&this.getSpanType!=''){
							this.$http({
								url: 'http://prod20.yc-yunpass.com/cloud/api/wechat/pay/calculateFee', //公有车位
								method: 'POST',
								 // headers:{"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"},
								data: {
								    "leaseId":localStorage.getItem('leaseId'),
									"longLeaseType":this.valRentType,
									"leaseDuration":this.getSpanType.toString(),
									//"leaseDuration":this.getMonthDur.toString(),
									"leaseStartTime":this.firstValue,
									"leaseEndTime":'',
									"parkportId":this.parkportid,
									"userId":localStorage.getItem('userid'),
									"sId":localStorage.getItem('sId')
							}}).then(res=>{
								console.log(res)
								//谭鲁的新租约
								if(res.data.data.code==1){																	
									localStorage.setItem('tranId',res.data.data.tranId)
									localStorage.setItem('MonthRentFee',res.data.data.data.fee)
									//谭鲁的新租约
									localStorage.setItem('startTime',this.firstValue)
								//	localStorage.setItem('endTime',time)
									localStorage.setItem('park_id',this.parkId)
									localStorage.setItem('parkport_id',this.parkportid)		
									localStorage.setItem('billingfee',res.data.data.billinginifee)
									localStorage.setItem('rentTime',this.getNum)
									if(res.data.data.data.fee!=null||res.data.data.data.fee!=''){
										localStorage.setItem('endTime',timeMonth)
										window.location.href='http://www.yangchenkeji.com.cn/userpay/pay'
										
									}else{
										alert('添加失败，请稍后再试')
									}
								}else{
									alert('添加失败，请稍后再试')
								}
							})
						}else if(this.valRentType=='2'&&this.getYearType!=''){
							this.$http({
								url: 'http://prod20.yc-yunpass.com/cloud/api/wechat/pay/calculateFee', //公有车位
								method: 'POST',
								 // headers:{"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"},
								data: {
								    "leaseId":localStorage.getItem('leaseId'),
									"longLeaseType":this.valRentType,
									"leaseDuration":this.getYearType.toString(),
									//"leaseDuration":this.getYearDur.toString(),
									"leaseStartTime":this.firstValue,
									"leaseEndTime":'',
									"parkportId":this.parkportid,
									"userId":localStorage.getItem('userid'),
									"sId":localStorage.getItem('sId')
							}}).then(res=>{
								console.log(res)
								//谭鲁的新租约
								if(res.data.data.code==1){
									localStorage.setItem('tranId',res.data.data.tranId)
									localStorage.setItem('MonthRentFee',res.data.data.data.fee)
									//谭鲁的新租约
									localStorage.setItem('startTime',this.firstValue)
									//localStorage.setItem('endTime',time)
									localStorage.setItem('park_id',this.parkId)
									localStorage.setItem('parkport_id',this.parkportid)		
									localStorage.setItem('billingfee',res.data.data.billinginifee)
									localStorage.setItem('rentTime',this.getNum)
									if(res.data.data.data.fee!=null||res.data.data.data.fee!=''){
										localStorage.setItem('endTime',timeYear)
										window.location.href='http://www.yangchenkeji.com.cn/userpay/pay'
										
									}else{
										alert('添加失败，请稍后再试')
									}
								}else{
									alert('添加失败，请稍后再试')	
								}
							})
						}
						
				    }
					
					}if(this.getType==''){
						alert('请选择租用类型')
					}else if(this.dayVal==''&&this.getYearType==''&&this.getSpanType==''){
						alert('请选择结束时间')
					}
				}else if(localStorage.getItem('leaseStatus')==2){ //假如租约结束，则做判断自由选择开始时间与结束时间的匹配
					if(this.firstValue!=''&&this.getType!=''&&timestamp3.getTime()!=timestamp1.getTime()&&
					timestamp3.getTime()<timestamp1.getTime()&&
					this.dayVal!=''||this.getSpanType!=''||this.getYearType!=''){
				    if(localStorage.getItem('leaseType')=='2'){ //私有长租
				    	console.log(2)
				    	if(this.valRentType=='0'&&timestamp1.getTime()<timestamp2.getTime()&&timestamp1.getTime()!=timestamp2.getTime()
				    	&&this.dayVal!=''){ //如果为日租
				    		this.$http({
							url: 'http://prod20.yc-yunpass.com/cloud/api/wechat/pay/pCalculateFee', //私有车位
							method: 'POST',
						 // headers:{"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"},
							data: {
								    "leaseId":localStorage.getItem('leaseId'),
									"longLeaseType":this.valRentType, //保存租约类型，是月租就为1，是年租就为2
									"leaseDuration":getMonth.toString(),
									"leaseStartTime":this.firstValue,
									"leaseEndTime":this.dayVal,
//									"parkportId":this.parkportid,
									"userId":localStorage.getItem('userid'),
								//	"userId":"8a9909325ddf4598015ddf78abf70361",
									"sId":localStorage.getItem('sId')
								//	"sId":'1'
							}}).then(res=>{															
								//谭鲁的新租约
								if(res.data.data.code==1){
									console.log(res.data.data.tranId)
									localStorage.setItem('tranId',res.data.data.tranId)
									localStorage.setItem('MonthRentFee',res.data.data.data.fee)
									//谭鲁的新租约
									localStorage.setItem('startTime',this.firstValue)
								//	localStorage.setItem('endTime',time)
									localStorage.setItem('park_id',this.parkId)
									localStorage.setItem('parkport_id',this.parkportid)		
									localStorage.setItem('billingfee',res.data.data.billinginifee)
									localStorage.setItem('rentTime',this.getNum)
									if(res.data.data.data.fee!=null||res.data.data.data.fee!=''){
										
										localStorage.setItem('endTime',this.dayVal)
										window.location.href='http://www.yangchenkeji.com.cn/userpay/pay'
									}else{
										alert('添加失败，请稍后再试')
									}
								}else{
									alert('添加失败，请稍后再试')
								}
								
		
							})
				    	}
				    	else if(this.valRentType=='1'&&this.getSpanType!=''){ //假如为月租
				    		this.$http({
							url: 'http://prod20.yc-yunpass.com/cloud/api/wechat/pay/pCalculateFee', //私有车位
							method: 'POST',
						//	headers:{"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"},
							data: {
								    "leaseId":localStorage.getItem('leaseId'),
									"longLeaseType":this.valRentType,
									"leaseDuration":this.getSpanType.toString(),
									//"leaseDuration":this.getMonthDur.toString(),
									"leaseStartTime":this.firstValue,
									"leaseEndTime":'',
//									"parkportId":this.parkportid,
									"userId":localStorage.getItem('userid'),
									//"userId":"8a9909325ddf4598015ddf78abf70361",
									"sId":localStorage.getItem('sId')
							}}).then(res=>{		
								console.log(res)
								//谭鲁的新租约
								if(res.data.data.code==1){				
									localStorage.setItem('tranId',res.data.data.tranId)
									localStorage.setItem('MonthRentFee',res.data.data.data.fee)
									//谭鲁的新租约
									localStorage.setItem('startTime',this.firstValue)
									//localStorage.setItem('endTime',time)
									localStorage.setItem('park_id',this.parkId)
									localStorage.setItem('parkport_id',this.parkportid)		
									localStorage.setItem('billingfee',res.data.data.billinginifee)
									localStorage.setItem('rentTime',this.getNum)
									if(res.data.data.data.fee!=null||res.data.data.data.fee!=''){
										localStorage.setItem('endTime',timeMonth)
										window.location.href='http://www.yangchenkeji.com.cn/userpay/pay'									
									}else{
										alert('添加失败，请稍后再试')
									}
								}else{
									alert('添加失败，请稍后再试')
								}
		
							})
				    	}else if(this.valRentType=='2'&&this.getYearType!=''){
				    		this.$http({
								url: 'http://prod20.yc-yunpass.com/cloud/api/wechat/pay/pCalculateFee', //私有车位
								method: 'POST',
								  headers:{"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"},
								data: {
								    "leaseId":localStorage.getItem('leaseId'),
									"longLeaseType":this.valRentType,
									"leaseDuration":this.getYearType.toString(),
									//"leaseDuration":this.getYearDur.toString(),
									"leaseStartTime":this.firstValue,
									"leaseEndTime":'',
//									"parkportId":this.parkportid,
									"userId":localStorage.getItem('userid'),
								//	"userId":"8a9909325ddf4598015ddf78abf70361",
									"sId":localStorage.getItem('sId')
							}}).then(res=>{															
								//谭鲁的新租约
								if(res.data.data.code==1){																	
									localStorage.setItem('tranId',res.data.data.tranId)
									localStorage.setItem('MonthRentFee',res.data.data.data.fee)
									//谭鲁的新租约
									localStorage.setItem('startTime',this.firstValue)
									//localStorage.setItem('endTime',time)
									localStorage.setItem('park_id',this.parkId)
									localStorage.setItem('parkport_id',this.parkportid)		
									localStorage.setItem('billingfee',res.data.data.billinginifee)
									localStorage.setItem('rentTime',this.getNum)
									if(res.data.data.data.fee!=null||res.data.data.data.fee!=''){
										localStorage.setItem('endTime',timeYear)
										window.location.href='http://www.yangchenkeji.com.cn/userpay/pay'
										
									}else{
										alert('添加失败，请稍后再试')
									}
								}else{
									alert('添加失败，请稍后再试')
								}
		
							})
				    	}
				    	
				    }else if(localStorage.getItem('leaseType')=='3'){ //公有长租
				    	console.log(3)
				    	if(this.valRentType=='0'&&this.dayVal!=''&&timestamp1.getTime()<timestamp2.getTime()&&
				    	timestamp3.getTime()<timestamp1.getTime()&&timestamp3.getTime()!=timestamp1.getTime()){ //如果为日租
				    	this.$http({
							url: 'http://prod20.yc-yunpass.com/cloud/api/wechat/pay/calculateFee', //公有车位
							method: 'POST',
							 // headers:{"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"},
							data: {
								    "leaseId":localStorage.getItem('leaseId'),
									"longLeaseType":this.valRentType,
//									"leaseDuration":getMonth.toString(),									
									"leaseDuration":'',
									"leaseStartTime":this.firstValue,
									"leaseEndTime":this.dayVal,
									"parkportId":this.parkportid,
									"userId":localStorage.getItem('userid'),
								//	"sId":'1'
									"sId":localStorage.getItem('sId')
							}}).then(res=>{
								console.log(res)
								//谭鲁的新租约
								if(res.data.data.code==1){
																	
									localStorage.setItem('tranId',res.data.data.tranId)
									localStorage.setItem('MonthRentFee',res.data.data.data.fee)
									//谭鲁的新租约
									localStorage.setItem('startTime',this.firstValue)
								//	localStorage.setItem('endTime',time)
									localStorage.setItem('park_id',this.parkId)
									localStorage.setItem('parkport_id',this.parkportid)		
									localStorage.setItem('billingfee',res.data.data.billinginifee)
									localStorage.setItem('rentTime',this.getNum)
									if(res.data.data.data.fee!=null||res.data.data.data.fee!=''){
										localStorage.setItem('endTime',this.dayVal)
										window.location.href='http://www.yangchenkeji.com.cn/userpay/pay'
									}else{
										alert('添加失败，请稍后再试')
									}
								}else{
									alert('添加失败，请稍后再试')
								}
							})
						}else if(this.valRentType=='1'&&this.getSpanType!=''&&
						timestamp3.getTime()<timestamp1.getTime()&&timestamp3.getTime()!=timestamp1.getTime()){
							this.$http({
								url: 'http://prod20.yc-yunpass.com/cloud/api/wechat/pay/calculateFee', //公有车位
								method: 'POST',
								 // headers:{"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"},
								data: {
								    "leaseId":localStorage.getItem('leaseId'),
									"longLeaseType":this.valRentType,
									"leaseDuration":this.getSpanType.toString(),
									//"leaseDuration":this.getMonthDur.toString(),
									"leaseStartTime":this.firstValue,
									"leaseEndTime":'',
									"parkportId":this.parkportid,
									"userId":localStorage.getItem('userid'),
									"sId":localStorage.getItem('sId')
							}}).then(res=>{
								console.log(res)
								//谭鲁的新租约
								if(res.data.data.code==1){																	
									localStorage.setItem('tranId',res.data.data.tranId)
									localStorage.setItem('MonthRentFee',res.data.data.data.fee)
									//谭鲁的新租约
									localStorage.setItem('startTime',this.firstValue)
								//	localStorage.setItem('endTime',time)
									localStorage.setItem('park_id',this.parkId)
									localStorage.setItem('parkport_id',this.parkportid)		
									localStorage.setItem('billingfee',res.data.data.billinginifee)
									localStorage.setItem('rentTime',this.getNum)
									if(res.data.data.data.fee!=null||res.data.data.data.fee!=''){
										localStorage.setItem('endTime',timeMonth)
										window.location.href='http://www.yangchenkeji.com.cn/userpay/pay'
										
									}else{
										alert('添加失败，请稍后再试')
									}
								}else{
									alert('添加失败，请稍后再试')
								}
							})
						}else if(this.valRentType=='2'&&this.getYearType!=''&&
						timestamp3.getTime()<timestamp1.getTime()&&timestamp3.getTime()!=timestamp1.getTime()){
							this.$http({
								url: 'http://prod20.yc-yunpass.com/cloud/api/wechat/pay/calculateFee', //公有车位
								method: 'POST',
								 // headers:{"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"},
								data: {
								    "leaseId":localStorage.getItem('leaseId'),
									"longLeaseType":this.valRentType,
									"leaseDuration":this.getYearType.toString(),
									//"leaseDuration":this.getYearDur.toString(),
									"leaseStartTime":this.firstValue,
									"leaseEndTime":'',
									"parkportId":this.parkportid,
									"userId":localStorage.getItem('userid'),
									"sId":localStorage.getItem('sId')
							}}).then(res=>{
								console.log(res)
								//谭鲁的新租约
								if(res.data.data.code==1){
									localStorage.setItem('tranId',res.data.data.tranId)
									localStorage.setItem('MonthRentFee',res.data.data.data.fee)
									//谭鲁的新租约
									localStorage.setItem('startTime',this.firstValue)
									//localStorage.setItem('endTime',time)
									localStorage.setItem('park_id',this.parkId)
									localStorage.setItem('parkport_id',this.parkportid)		
									localStorage.setItem('billingfee',res.data.data.billinginifee)
									localStorage.setItem('rentTime',this.getNum)
									if(res.data.data.data.fee!=null||res.data.data.data.fee!=''){
										localStorage.setItem('endTime',timeYear)
										window.location.href='http://www.yangchenkeji.com.cn/userpay/pay'
									
									}else{
										alert('添加失败，请稍后再试')
									}
								}else{
									alert('添加失败，请稍后再试')	
								}
							})
						}
						
				   }
					}if(this.getType==''){
						alert('请选择租用类型')
					}else if(this.dayVal==''&&this.getYearType==''&&this.getSpanType==''){ //因为月租和年租的下拉框较长，所以不用考虑月和年
						alert('请选择结束时间')
					}
				}
			},
			isibles() {
				var _this = this
				setTimeout(function() {
					_this.getGShow = false
				}, 20)
			},
			isiblesPark(){
				var _this = this
				setTimeout(function() {
					_this.showPark = false
				}, 20)
			},
			getInput(val) {
				this.inputDate = val
			}


		}
	}
</script>


