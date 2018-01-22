<style>
   .lock{display: flex;flex-direction:column;font-size: 14px}
   .lock ul:first-child{border: none;padding-top: 10px;}
   .lock ul{text-align: left;border-top: 1px solid #eee;padding-top: 10px;}
   .lock ul li{list-style: none}
   /*.lock .switch-on{margin-top: 10px}*/
   .ivu-icon .ivu-icon-plus-round{font-size: 25px !important;}
   .lockHide{height: 50px;color: #fff;line-height: 42px;display: flex;
   font-size: 20px;}
   .lockHide span{width: 50%;}
	/*.lockHide span{display: inline-block;width:50%;}*/
	.file-uploads {
  overflow: hidden;
  position: relative;
  text-align: center;
  display: inline-block;
}
.file-uploads.file-uploads-html4 input[type="file"] {
  opacity: 0;
  font-size: 20em;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}
.file-uploads.file-uploads-html5 input[type="file"] {
  overflow: hidden;
  position: fixed;
  width: 1px;
  height: 1px;
  z-index: -1;
  opacity: 0;
}
.btn-default:hover, .btn-default:focus, .btn-default.focus,
 .btn-default:active, .btn-default.active, .open > .dropdown-toggle.btn-default{
	background: #fff !important;
}
.spanNew{text-align: center;display: block;width: 50%;cursor: pointer;
	height: 50px;line-height: 50px;color: #000;background: #eee;}
	.turnTopic{background: #0095FF;color: #fff;}
.ivu-modal-header{display: none;}
</style>
<template>
	<div class="totalLock">
	<!--<p style="width: 100%;height: 45px;background: #1095D9;font-size: 16px;color: #fff;line-height: 45px;">智能锁车</p>-->
		<div class="lockHide" style="">
			<span  v-bind:class="{turnTopic:isTopicA}" class="spanNew" @click="lockC">锁车</span>
			<span @click="bindC" v-bind:class="{turnTopic:isTopicB}"
				 class="spanNew">审核</span>
		</div>
		<div v-show="lockList">
		<div class="lock">
			<ul v-for="(item,index) in totalAry"  >
		    	<div style="padding: 0 10px;" >
			    	<div style="float: left;">
				    	<li style="font-weight: bold;font-size: 16px;" v-model='carNd'>
				    		<img src="../../assets/img/icon/车辆.png" style="width: 25px;margin-right: 10px;" />
				    		车牌号:{{item.car_plate_number}}</li>
					      <li style="color: #9d9d9d" v-model="parkName">
					      	<img src="../../assets/img/icon/位置.png"  style="width: 25px;margin: 0 10px 0 0;"/>
					      	停车场:{{item.parklot_name}}</li>					      	
					</div>
					<div style="line-height: 40px;float: right;" v-if="item.state=='1'||item.state==1">
					    <li>						    	
						  	 <i-switch  @on-change="lockCar(item)" v-model='item.locked' size="large">
						  	    <span slot="open" style="font-weight:bold" >已锁</span>
						        <span slot="close"  style="font-weight:bold">未锁</span>
						  	 </i-switch>	
						  	 
				     </li>				      	
				    </div>
				    <div style="line-height: 40px;float: right;" v-else @click="tellCustmer(item)">
					    <li>						    							  	 	
						  	  <i-switch :disabled='changeStatus'  class="switch-on" size="large">
							  	    <span slot="open" style="font-weight:bold" >已锁</span>
							        <span slot="close"  style="font-weight:bold">未锁</span>
							</i-switch>
				      	</li>
				      	<!--<li @click="tellCustmer(item)" v-else>
				      		
				      	</li>-->
				      	
				    </div>
		      	</div>
		  	</ul>		  	
		</div>
 		<h3 v-show="parkUser" style="background: #f0f0f0;margin-top: 0px;line-height: 50px;">所在停车场无车辆</h3>
 		</div>
	  <div class="lock" v-show="validList"> 
		    <ul v-for="(item,index) in carBinds" >		    			    
		    	<li style="font-weight: bold;font-size: 16px;margin-left: 11px;margin-top: 10px;" v-model='carNd'>
		    		<!--<li>-->
		    			<div style="width: 17.3%;text-align: right;float: left;">
		    				<img src="../../assets/img/icon/车辆.png" style="width: 25px;height: 27px;margin-right: 15px;" />	
		    			</div>
		    			<div style="width: 60%;float: left;">
		    				<span style="display: inline-block;line-height: 30px;">车牌号:{{item.plate_number}}&nbsp;</span>	
		    			</div>				    				
		    		<!--</li>-->				    		
		    		<div style="width: 20%;float: right;margin-top: -29px;margin-right: 17px;" v-if="item.state==0">
		    			<button @click="goValid(item)" class='btn btn-primary' style=''>审核</button>
		    		</div>	
		    		<div style="width: 25%;float: right;margin-top: -25px;" v-if="item.state==1">
		    			<span style='color: #03A9F4;'>审核通过</span>
		    		</div>
		    		<div style="width: 20%;margin-left: -8px;float: right;margin-top: -25px;" v-if="item.state==2">
		    			<!--<span style='color: red;'>未通过</span>-->	
		    			<button @click="goValid(item)" class='btn btn-primary' style=''>未通过</button>
		    		</div>
		    		<div style="width: 20%;float: right;margin-top: -25px;margin-right: 20px;" v-if="item.state==3">
		    			<span style='color: red;'>审核中</span>
		    		</div>		    		
		    	</li>					 					
			</ul>	
		</div>		  
	  <Modal v-model="addValid" width="360" height='550'>	  	
	  	 <p slot="header">                     
       </p>        
        <div style="text-align: center;">
        	
        	<h3 style="margin: 0;">{{car_number}}</h3>
        </div></br>
        <div style="">
        	<label style="margin-left: 11px;">车主姓名</label>
        	<input v-model="custmer" type="text" style="width: 100px;margin: 0 auto;display: inline-block;" class="form-control" />
        </div>
        <div style="margin: 10px 0 0;display: flex;">
        	
        	<label style="line-height: 30px;margin-right: 2px;">上传行驶证</label>
        	<img v-show="getAndriod"  style="width: 50px;height: 50px;" id="bgImg" src="../../assets/img/add.svg" @click="getPic" />        	        	
        	<!--<Upload 
        		
	        	:before-upload="handleUpload"
	        	v-show='getIOS'	
	        	:format="['jpg','jpeg','png']"
	            action="http://prod20.yc-yunpass.com/cloud/api/user/bind/SubmitLockCarInformation">
	            <Button type="ghost" icon="ios-cloud-upload-outline">点击所要上传图片</Button>
	            <div v-if="file1 !== null">图片名: {{ file1.name }}</div>
	        </Upload>  -->
			  <!--<file-upload class='btn btn-default' v-model="files" @input-filter="inputFilter" 
			  	post-action="http://prod20.yc-yunpass.com/cloud/api/user/bind/SubmitLockCarInformation">点击所要上传图片</file-upload>
			  	<ul style="margin-top: 10px;">
	            	<li v-for="file in files" v-show="getImg">
				     <img :src="file.blob" style="width: 50%;height: 70px;" /></li>
				</ul>-->
       </div>
        <div slot="footer">
            <button class="btn btn-primary" @click="getCheck">提交</button>
              <button class="btn btn-default" @click="cancel">取消</button>
        </div>

	  </Modal>
	  
    
 
  <!--<button v-show="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true" type="button">开始上传</button>-->
  </div>

</template>
<!--<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>-->
<script>
	
	var carNum,parklot_id,lock_status;
	var openid,phone,type;
	var getIos = navigator.userAgent;
	var isiOS = !!getIos.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	 var localId;
	 var serverId;
	 
//	const VueUploadComponent = require('vue-upload-component')
  export default {
    data(){
        return {
          carList:[],car_number:'',carNd:'',parkName:'',parklot_id:'',parkUser:false,carBinds:[],addValid:false,
           file1: null,custmer:'',lockList:true,validList:false,changeStatus:true,getImg:false,isTopicB:false,isTopicA:true,
           files: [],getIOS:false,getAndriod:true,alreadyLock:'已锁',didntLock:'未锁',getLock:true,totalAry:[],tranAry:[],
           
           
        }
      },
    mounted(){ 
    //	localStorage.setItem('phone','18482377055')
    	this.jsapiConfig()
    	this.update()
    	//localStorage.setItem('openid','oMwdrw96TKI05B5yuQ2TtKuyUjtY')
    	//localStorage.setItem('userid','8a9909325ddf4598015ddf78abf70361')
    //	this.updateBindCar()
   	
    	
      },
      components: {
	  //  FileUpload: VueUploadComponent
	  },
	  beforeDestroy(){
	  	console.log(9);
	  	serverId=''
	  },
      methods:{
      	getPic(){
      		localId='';
      		serverId='';
      		wx.chooseImage({
			  count: 1, // 默认9
			  sizeType: ['original'],
			  sourceType: ['album', 'camera'],
			  success: function (res) {
			  	console.log(res)
			    localId= res.localIds[0].toString();			  
			    //选择图片成功，上传到微信服务器
			    
			    wx.uploadImage({
			      localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
			      isShowProgressTips: 1, // 默认为1，显示进度提示
			      success: function (res) {
			        serverId = res.serverId.toString(); // 返回图片的服务器端ID
			    //   alert(serverId)
			      }
			    });
			    var sRc=document.getElementById('bgImg');
			    sRc.src=localId
			  }
			})
      	},
      	tellCustmer(item){
      		this.$http({ //获取已建的车辆
	          method:'POST',
	          "url":'http://prod20.yc-yunpass.com/cloud/api/user/bind/AuditingUserLockCar',
	          "data":{"openid":localStorage.getItem('openid'),"carNumber":item.car_plate_number},
	          headers:{"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"}
	       }).then(res=>{
	       		console.log(res.data.status)
	       		if(res.data.status==false){	       			
	       			alert('通过审核后，才能进行锁车')	       			
	       		}
	       	})	
      	},
      	handleUpload (file) {
      		
      		if(file.name.indexOf('jpg')!=-1||file.name.indexOf('png')!=-1||file.name.indexOf('svg')!=-1||
				 file.name.indexOf('jpeg')!=-1||file.name.indexOf('JPG')!=-1||file.name.indexOf('PNG')!=-1||file.name.indexOf('SVG')!=-1||
				  file.name.indexOf('JPEG')!=-1){
      			this.file1 = file;
      		}else{
      			alert('请上传图片')
      		}    
              //  return false;
            },
      	getStatus(item){
      		console.log(item)
      		this.$http({ //获取已建的车辆
	          method:'POST',
	          "url":'http://prod20.yc-yunpass.com/cloud/api/user/bind/AuditingUserLockCar',
	          "data":{"openid":localStorage.getItem('openid'),"carNumber":item.car_plate_number},
	          headers:{"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"}
	       }).then(res=>{
	       		
	       		if(res.data.status==false){
	       			
	       			if(res.data.errorMsg=='审核未通过，不能锁车'){
	       				alert('通过审核后，才能进行锁车')
	       			}else{
	       			this.$Modal.confirm({
	                    title: '通知',
	                    content: '<p style="font-size:18px">为保证您的车辆信息安全,锁车需要提前审核</p>',
	                    onOk: () => {
	                        this.addValid=true
			       			this.car_number=item.car_plate_number
			       			
	                    },
	                    onCancel: () => {
	                       
	                    }
	               });	 
	              }
	       			this.changeStatus=true
	       		}else{
	       			
	       			this.changeStatus=false
	       			item.fengsuo=false
	       			
	       		}
	       })
      	},
      	lockC(){
      		this.lockList=true
      		this.validList=false
      		this.isTopicA=true
      		this.isTopicB=false
      		this.update()
      	},
      	bindC(){
      		this.lockList=false
      		this.validList=true
      		this.isTopicA=false
      		this.isTopicB=true
      		this.updateBindCar()
      	},
      	cancel(){
      		
      		this.addValid=false
      		this.custmer=''
      		this.getImg=false
      	},
      	getDocuFile(file){
      		this.file1=file
      	},
      	
      	goValid(item){
      		this.addValid=true
      		this.car_number=item.plate_number
      		console.log(this.car_number)
      	},
      	getCheck(){	
      		//alert(isiOS)
      		console.log(this.custmer)
      		 var pattern = /^[0-9]*$/;
      		var dataD = new FormData();
      		var dataAndriod=new FormData();
      		dataD.append('mfile',this.file1)
      		dataD.append('carNumber',this.car_number)
			dataD.append('name',this.custmer)						
			dataD.append('openid',localStorage.getItem('openid'))
			dataD.append('phone',localStorage.getItem('phone'))			
			dataAndriod.append('serverId',serverId)
			dataAndriod.append('carNumber',this.car_number)							
			dataAndriod.append('openid',localStorage.getItem('openid'))
			dataAndriod.append('phone',localStorage.getItem('phone'))				
			dataAndriod.append('name',this.custmer)
//			if(this.custmer!=''&&this.file1!=null){
//				this.$http.post('http://prod20.yc-yunpass.com/cloud/api/user/bind/SubmitLockCarInformationIOS',dataD).then(res=> {
//				 	alert(res.data.data)
//				 	alert(res)
//				 	if(res.data.status==true){			 		
//				 		alert('提交审核成功')	
//				 		this.custmer=''
//				 		this.file1=null
//				 		this.updateBindCar()
//				 		this.addValid=false
//				 		
//				 	}else if(res.data.status==false){
//				 		alert('抱歉,提交审核失败,请稍后再试')
//				 	}
//				 })	
//			}			
				if(this.custmer==''){
					alert('车主姓名不能为空')
				}else if(pattern.test(this.custmer)==true){
					alert('请输入正确的姓名')				
					//alert('文件不能为空')							
				}else if(serverId!=''&&serverId!=undefined){	
				//	alert(serverId)
				//	alert(typeof serverId)
				//	alert(2)
						this.$http.post('http://prod20.yc-yunpass.com/cloud/api/user/bind/SubmitLockCarInformation',dataAndriod).then(res=> {
					 	console.log(res.data.data)
					 	if(res.data.status==true){			 		
					 		alert('提交审核成功,请等待审批')	
					 		this.custmer=''				 					 		
					 		this.updateBindCar()
					 		this.addValid=false
					 		//this.getAndriod=false
					 		
					 	}else if(res.data.status==false){
							alert('抱歉,提交审核失败,请稍后再试')
						}
					 })
					
				}else if(serverId==''||serverId==undefined){
					alert('行驶证不能为空')
				}
//				else if(this.custmer!=''&&this.getAndriod==true&&this.getIOS==false&&serverId==''||serverId=='undefined'){
//					alert('文件不能为空')
//				}
//				
			
      	},
      	lockCar (item) {
      		console.log(item)
      		
      		this.$http({ //获取已建的车辆
	          method:'POST',
	          "url":'http://prod20.yc-yunpass.com/cloud/api/user/bind/AuditingUserLockCar',
	          "data":{"openid":localStorage.getItem('openid'),"carNumber":item.car_plate_number},
	          headers:{"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"}
	       }).then(res=>{
	       		console.log(res.data.status)
	       		
	       		if(res.data.status==false){
	       			item.locked=false
	       			if(res.data.errorMsg=='审核未通过，不能锁车'){
	       				alert('通过审核后，才能进行锁车')
	       				item.locked=false
	       				this.alreadyLock='未锁'
	       			}else{
	       			th.$Modal.confirm({
	                    title: '通知',
	                    content: '<p style="font-size:18px">为保证您的车辆信息安全,锁车需要提前审核</p>',
	                    onOk: () => {
	                        this.addValid=true
			       			this.car_number=item.car_plate_number
			       			//this.changeStatus=true
	                    },
	                    onCancel: () => {}                       
	                    
	               });	 
	              }
	       		}else{
	       		//this.changeStatus=false
	       			if(item.is_locked=='false'){
		      			item.is_locked='true'
		      		}else if(item.is_locked=='true'){
		      			item.is_locked='false'
		      		}
			        this.$http({
				          method:'post',
				          url:'http://prod20.yc-yunpass.com:8080/park/lockCarByUser',
				          data:{
				            "car_plate_number": item.car_plate_number,
				            "lock_status":item.is_locked           
				          }
				          }).then(res =>{
				            console.log(res)	            
				          //  alert("操作成功！");  
				            if(res.data.code==1){
				            	if(item.is_locked=='false'){
					      			alert('解锁成功')
					      		}else if(item.is_locked=='true'){
					      			alert('锁车成功')
					      		}
				            }
			        })
	       		}
//	       		if(res.data.status==false){
//	       			this.getStatus=true	       			
//	       		}else{
//	       			
//	       		}
	       })
      		console.log(typeof item.locked) 
      		
      	
      },
     	inputFilter(newFile, oldFile, prevent) {
     		this.getImg=true
     		console.log(newFile.file,90)
     		this.file1=newFile.file
      		if (newFile && !oldFile) {
	        // 添加文件
	
	        // 过滤非图片文件
	        // 不会添加到 files 去
	        if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
	          return prevent()
	        }
	
	        // 创建 `blob` 字段 用于缩略图预览
	        newFile.blob = ''
	        let URL = window.URL || window.webkitURL
	        if (URL && URL.createObjectURL) {
	          newFile.blob = URL.createObjectURL(newFile.file)
	        }
	      }
	
	      if (newFile && oldFile) {
	        // 更新文件
	
	        // 增加版本号
	        if (!newFile.version) {
	          newFile.version = 0
	        }
	        newFile.version++
	      }
	
	      if (!newFile && oldFile) {
	        // 移除文件
	
	        // 拒绝删除文件
	        // return prevent()
	      }
	    },
	    jsapiConfig() {
//	    		if(isiOS){
//	    			console.log('isiOS')	    			
//	    			this.getIOS=true
//	    			this.getAndriod=false
//	    		}	    		
				var str = window.location.href.split('#')[0];
				//var str ='http://prod20.yc-yunpass.com/userpay';
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
					console.log(res)
					//console.log(res.data);
					var signature = res.data.data.signature;
					console.log("signature"+res.data.data.signature);
					var appid = res.data.data.appId;
					console.log("appid"+appid);
					var jsapi_ticket = res.data.data.jsapi_ticket;
					console.log("jsapi_ticket"+jsapi_ticket);
					var noncestr = res.data.data.noncestr;
					console.log("noncestr"+noncestr);
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
							jsApiList: ["chooseImage","uploadImage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
						})
					} else {
						alert("上传失败，请稍后再试！");
					};
				}).catch(function(error) {
					alert("上传失败，请稍后再试！");
				});
			},	
	    updateBindCar(){	    			
	    	this.$http({ //获取已建的车辆
	          method:'POST',
	          "url":'http://prod20.yc-yunpass.com/cloud/api/user/bind/QueryAllUserCarList',
	          "data":{"user_id":localStorage.getItem('userid'),
	          "openid":localStorage.getItem('openid')},
	          headers:{"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"}
	       }).then(res=>{   
	       
	          this.carBinds=res.data.data;
		          for(var i=0;i<this.carBinds.length;i++){	
			         	this.carBinds[i].car_plate_number=this.carBinds[i].plate_number		
			         	 
			         	
		         }	         
	        })
	    
	    },
	    update(){	    	
        this.$http({
          method: 'post',
        //  data: {"user_id":'8a9909325ddf4598015ddf78abf70361'},
           data: {"user_id":localStorage.getItem('userid')},
          headers:{"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"},
          url:'http://prod20.yc-yunpass.com:8080/park/getParkingCarListByUserID'
        }).then(res=>{
        	this.carList=res.data.data;        	
        	this.parkUser=false;
        	
        
        	if(this.carList.length!=0){		                        
		         for(var i=0;i<this.carList.length;i++){  	
		         	
		         	if(this.carList[i].is_locked=='true'){
						this.carList[i].locked=true						
					}else if(this.carList[i].is_locked=='false'){
						this.carList[i].locked=false
					}					
	         	}				
        	}else{
        		this.parkUser=true
        		
        		openid=localStorage.getItem('openid');
				type=localStorage.getItem('type');
				phone=localStorage.getItem('phone');				
											        		       		
        	}
        	this.$http({ //获取已建的车辆
	          method:'POST',
	          "url":'http://prod20.yc-yunpass.com/cloud/api/user/bind/QueryAllUserCarList',
	          "data":{"user_id":localStorage.getItem('userid'),
	          "openid":localStorage.getItem('openid')},
	          headers:{"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"}
	       }).then(res=>{   
	       
	          this.tranAry=res.data.data;
		          for(var i=0;i<this.tranAry.length;i++){	
			         //	this.carList[i].car_plate_number=this.carList[i].plate_number		
			         	 for(var j=0;j<this.carList.length;j++){			         	 		
			         		if(this.tranAry[i].plate_number==this.carList[j].car_plate_number){
				         		this.carList[j].state=this.tranAry[i].state
				         	} 	
				         	
			         	 }
			         	
		         }	
		         this.totalAry=this.carList
		         for(var i=0;i<this.totalAry.length;i++){
		         	
		         }
		          console.log(this.totalAry,90)
	        })
        	
        })
        
       
	    }
      }
	}
</script>
