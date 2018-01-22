<style scoped>
	.form-group{position: relative;}
	.form-group input{border: none;height: 45px;padding-left: 40px;}
	.form-group input:last-child{padding-left: 13px;}
	.phoneN{position: absolute;left:20px;top: 8px;}
	.valid{position: absolute;left:20px;top: 8px;}
  .bindPhone{margin-top: 15px;background: #1095D9;color: #fff;}
  .getcheck{display: inline-block;
    width: 105px;
    height: 42px;
    border-radius: 4px;
    color: #fff;
    background: #1095D9;
    line-height: 40px;}
  .mobileType{height: 40px;}
  .adjust{display: flex;}
  .textValid{display: inline-block; color: red; margin-top: 6px}
  .btn:focus, .btn:blur{color:#000 !important ;}
</style>
<template>
  <div class="">
  		<p style="background: #1095D9;height: 45px;font-size:18px;color: #fff;line-height: 45px;">验证手机</p>
      <div class="col-xs-12" style="margin-top: 40px">
        <form onsubmit="return false">
          <div class="form-group" style="margin-bottom: 30px">
            <div class="row">

              <div class="col-xs-12 mobileType">
              	<img class="phoneN" style="width:30px" src="../../assets/img/icon/手机号.png" />
                <input type="tel" v-model="phone" placeholder="请输入您的手机号" class="form-control"  @keyup="validateNumber"/>

                <span v-show="showError1" class="textValid">请输入正确手机号码</span>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="row" style="height: 40px">
              <div class="col-xs-12">
                <!--<label for="mobileCode"  style="display: block;font-size: 15px;text-align: left">验证码</label>-->
              </div>
              <div class="col-xs-12 adjust">
              	<img class="valid" style="width:30px" src="../../assets/img/icon/验证码.png" />
                <input style="margin-right: 5px;" type="text" v-model="mobileCode" placeholder="请输入验证码" class="form-control dd" @keyup="writeNumber"/>

                <!--<button class="btn getcheck"  @click="getMobileCode" />
              		   <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
  						<span v-if="!sendMsgDisabled">send</span>
                </button>-->
                <span v-show="show" class="getcheck" @click="getMobileCode">获取验证码</span>
				<span v-show="!show" class="getcheck">{{count}} s</span>
              </div>
              <span v-show="showError2" style="margin-top: 6px;display:inline-block;text-align: left;color: red;">请输入6位数字验证码</span>
            </div>
          </div>
          <br />
          <div class="form-group">
            <div class="row" style="height: 40px">
              <div class="col-xs-12 validate">
                <input type="submit" @click="submitBind" value="绑定手机"
                       class="btn btn-block btn-lg bindPhone" />
              </div>
              
            </div>
          </div>
        </form>
      </div>
   </div>

</template>
<script>
  var ph=/^1[3|5|7|8|][0-9]{9}$/;
  var vali=/^\d{6}$/;
  var op;
  var type;
  var usid;
  var sId;
var phone;
export default {

  data(){
    return{
      phone:'',showError1:false,mobileCode:'',showError2:false,openid:'',
       show: true,
   count: '',
   timer: null,
    }
  },
  methods:{
  	getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if(r != null) {
        return unescape(r[2]);
      }
      return null;
    },
    validateNumber(){ //验证手机号

      if(ph.test(this.phone)){
        this.showError1=false
      }else{
        this.showError1=true
      }
    },
    writeNumber(){ //验证码

      if(vali.test(this.mobileCode)){
        this.showError2=false
      }else{
        this.showError2=true
      }
    },
    getMobileCode(){ //获取验证码
   		// op='oMwdrw96TKI05B5yuQ2TtKuyUjtY';
        // type=3
    	 op=this.getQueryString('openid')
     	 type=this.getQueryString('type');
     	sId=this.getQueryString('sId');
       //sId=1
     	 localStorage.setItem('type',type)
    	this.$http({
	    	method:'post',
	    	url:'http://prod20.yc-yunpass.com/cloud/api/user/bind/queryUserBindByPhone',
	    	data:{
	    		"phone":this.phone,
	    		"openid":op,
	    		"type":type
	    	}
	    }).then(res=>{
	    	console.log(res)
	    	if(res.data.status==true){
	    		var address = res.data.data.url;
	    		alert("该用户已在智能通平台注册，自动跳转中。。。");
               //	window.location.href = address;
               this.$router.push({path:'/?openid=' + op + '&type=' + type +'&phone=' + this.phone+'&sId='+sId});
	    	}else if(res.data.status==false){
	    		if(ph.test(this.phone)&&this.phone!=''){ //假如手机号符合规范		    		 
		    		 const timeCount = 60;
				     if (!this.timer) {
				       this.count = timeCount;
				       this.show = false;
				       this.timer = setInterval(() => {
				       if (this.count > 0 && this.count <= timeCount) {
				         this.count--;
				        } else {
				         this.show = true;
				           clearInterval(this.timer);
				         this.timer = null;
				        }
				       }, 1000)
				      };
     				 this.showError1=false;
		    		this.$http.post('http://prod20.yc-yunpass.com:8080/sso/requestValidateCode',{phone_number:this.phone}).then(res=> {
		    		if(res.data.message=='OK'){
		    			alert('验证码已发送到你的手机，15分钟内输入有效，验证码等同于密码，打死也不能告诉别人 ');	
		    		}else{
		    			alert('获取验证码失败，请稍后再试')
		    		}
			        
			      })
		    	}else{
		    		 this.showError1=true
		    	}
	    	}
	    })
	    
    	
    },
    
   	 submitBind(){  //验证手机号及验证码，绑定手机  	 
      if(this.phone==''){
        this.showError1=true
      }if(this.mobileCode==''){
         this.showError2=true
      }
      op=this.getQueryString('openid')
      type=this.getQueryString('type')
      
      if(ph.test(this.phone)||vali.test(this.mobileCode)){
        this.$http.post('http://prod20.yc-yunpass.com:8080/sso/register', // 注册手机
        {phone_number:this.phone,password:'111111',validate_code:this.mobileCode,openId:op}).then(res=> {
          console.log(res)
          	if(this.mobileCode!=''){
          		if(res.data.message=="验证码错误"){
      				alert('手机验证码错误')
      			}
          	}
      		if(res.data.message=="手机号已注册"){
      			alert('手机号已注册');
      			this.$router.push({path:'/?openid=' + op + '&type=' + type +'&phone' + this.phone});
      		}else if(res.data.code==1){
            localStorage.setItem('userid',res.data.data.user_id)
            //op=this.getQueryString('openid')
            localStorage.setItem('openid',op);
            localStorage.setItem('phone',this.phone)
            usid=localStorage.getItem('userid')                

//            var dataD = new FormData();
//            dataD.append("openid",op);
//            dataD.append("phone",this.phone);
//            dataD.append("userid",usid);
//            dataD.append("type",type);
              this.$http({
              	method:"post",
              	url:'http://prod20.yc-yunpass.com/cloud/api/user/bind/save',
              	data:{
              		"openid":op,
              		"phone":this.phone,
              		"userid":usid,
              		"type":type
              	}
              	
              }).then(res=>{
              	
              	if(res.data.status==true){
              		alert('绑定成功')
              		
              		this.$router.push({path:'/?openid=' + op + '&type=' + type +'&phone=' + this.phone});	
              	}else{
              		alert('抱歉,绑定失败，请稍后再试')
              	}
              	
              })
          }
        })
      }
    }
  },
  created(){
  	
    op=this.getQueryString('openid')
    phone=this.getQueryString('phone')
     type=this.getQueryString('type')
    localStorage.setItem('openid',op);
    console.log(op)
    
  }
}
</script>
