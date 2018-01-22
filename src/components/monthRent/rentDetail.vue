<style scoped="scoped">
	.btnSure{width: 80%;margin: 20px;height: 40px;border-radius: 4px;
	background-color: #1095D9;border: none;font-size: 16px;color: #fff}
	.clickTable {margin:0 20px 0 20px;padding-top: 10px;}
	.clickTable ul{border-bottom:1px solid #eee ;}
	.clickTable ul li{text-align: left;margin: 10px 0;font-size: 15px;}

	.clickTable ul li span:first-child{display: inline-block;padding:0 20px 0;width: 104px;text-align: right;margin-bottom: 10px;}
	
	.btn:focus, .btn:blur{color:#000 !important ;}
</style>
<template>
<div>
	<div v-show="getInfo">
		<h4 style="font-weight: normal;font-size: 16px;margin-bottom:0px;background: #1095D9;margin-top: 0px;
  height: 45px;color: #fff;line-height: 45px;">租约详情</h4>
	    <div class="clickTable" >			
	        
       		<ul v-for="item in items" style="height: 185px;">
       			<div >
      				 <h3 style="color: #1095D9;margin-top: 10px;font-size: 16px;">{{item.parklot_name}}</h3>      			
      				 <!--<h3 style="color: #1095D9;margin-top: 10px;font-size: 16px;line-height: 20px;">昆明第一人民医院打发打发发打发打发个别地方妇幼保健部停车场</h3>-->
	       			<li><span>车牌号</span>
	       				<span>{{item.car_plate_number}}</span></li>
	       			<!--<li><span>停车场</span>{{item.parklot_name}}</li>-->
	       			<li>
	       					<span>开始时间</span>
	       					<span>{{item.reg_start_time}}</span>
	       						
	       				
	       					<a @click="goDate(item)" style="color: #1095D9;font-size: 18px;font-weight: 700;margin-left: 10%;">
	       						续费
	       						<img @click="goDate(item)" width="20px" style="vertical-align: sub;" src="../../assets/img/arrow_right.svg"  />	
	       					</a>
	       					

	       			</li>	      
	       			
	       			<!--<li v-model="endTime"><span>结束时间</span>{{item.endTime}}</li>-->
	       			<li><span>结束时间</span>
	       				<span>{{item.reg_end_time}}</span></li>
	       			<!--<li v-model="duration"><span>租期</span>{{item.reg_duration}}天</li>-->
       			</div>
       			<!--<div style="line-height: 175px;" @click="goDate(item)">
       				
       			</div>-->
       			<!--<div><button type="button" @click="goDate" class="btn btn-default" data-toggle="button"> 续费</button></div>-->
       		</ul>	               			             
	    </div>	
	    <!--<div style="width: 100%;background: #f0f0f0;">
			<button type="button" @click="goDate" class="btnSure" data-toggle="button"> 续费</button>	    	
	    </div>-->
	</div>
	<h3 style="background: #f0f0f0;" v-show="nothingRent">还无租约，添加前往物业申请</h3>
</div>
</template>
<script>
	var carName;
	export default{
		data(){
			return{
				items:[],startTime:'',endTime:'',duration:'',getInfo:true, //控制无租约情况下页面的显示,
				nothingRent:false
			}
		},
		beforeCreate(){
			carName=localStorage.getItem('car_number')
			this.$http({
			url:'http://prod20.yc-yunpass.com:8080/park/getMyAllLeaseList',
			method:"post",
			data:{				
				"user_id":localStorage.getItem('userid'),
			//	"user_id":"8a9909325ddf4598015ddf78abf70361",
				"lease_type":"1",
				"show_history":"1",
				"car_plate_number":carName
			},
			headers:{
				"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"}
			}).then(res=> {
			console.log(res)
			  this.items= res.data.data;			  
			  if(this.items.length == 0){ // 没有租约，让其重新去物管添加租约
			  	this.getInfo=false;
			  	this.nothingRent=true
			  	
			  }else{			  		
					for (var i=0;i<this.items.length;i++){
						
						 this.items[i].reg_start_time= this.items[0].reg_start_time.substring(0,10)
						 this.items[i].reg_end_time= this.items[i].reg_end_time.substring(0,10)
						 this.sa= this.items[i].reg_start_time//计算结束时间开始
					 	 var today=new Date(this.sa);
				          var sge =today.setDate(today.getDate() +  this.items[i].reg_duration);				          
				          localStorage.setItem('today',sge)
				          var newTime = new Date(sge)				         
				          this.endTime = newTime.format("yyyy-MM-dd")//结束时间
//						localStorage.setItem('park_id', this.items[0].parklot_id)
//						localStorage.setItem('parklot_name', this.items[0].parklot_name)
//						localStorage.setItem('parkport_number', this.items[0].parkport_number)
//						localStorage.setItem('rentTime', this.items[0].reg_duration)
//						localStorage.setItem('leaseId',this.items[0].lease_id)						
//						localStorage.setItem('leaseType',this.items[0].lease_type)
						
										          
					}
				}
			})
		},
		methods:{
			goDate(item){
				console.log(item.lease_status)
				this.sa= item.reg_start_time//计算结束时间开始
			 	 var today=new Date(this.sa);
		          var sge =today.setDate(today.getDate() +  item.reg_duration);				          
		          localStorage.setItem('today',sge)
		          var newTime = new Date(sge)				         
		          this.endTime = newTime.format("yyyy-MM-dd")//结束时间
		         localStorage.setItem('leaseStatus',item.lease_status)
		          localStorage.setItem('park_id', item.parklot_id)
				localStorage.setItem('parklot_name', item.parklot_name)
				localStorage.setItem('parkport_number', item.parkport_number)
				localStorage.setItem('rentTime', item.reg_duration)
				localStorage.setItem('leaseId',item.lease_id)						
				localStorage.setItem('leaseType',item.lease_type)		         
		          localStorage.setItem('endTime',item.reg_end_time)
				this.$router.push({name:'chooseDate',params:{parkName:item.parklot_name,validStart:item.reg_end_time}})
			}
		}
	}
</script>
