<style>
@import "../../assets/css/addCar.css";
	.ddHead{font-size: 16px;background: #f0f0f0;width: 100%;height: 100%;padding-bottom: 20px;}
  .active{color: red;}
  .parkText{margin:10px auto;text-align: left;font-size: 15px;display: block;width: 90%}
  .ivu-icon-arrow-down-b:before {display: none;}
  .addNew{width:80%;height: 40px;background:#1095D9;color: #fff;border: none;margin-top: 10px;}
  .newSty{width:80%;margin: 20px auto;border: 1px solid #BDBDBD;height: 40px;border-radius: 5px;display: flex;}
  .newSty a{border-right: 1px solid #BDBDBD;width:44px;display: block;height: 21px;
  margin-top: 8px;}
  .newSty a:last-child{border: none;}
  .isactive{color: #5bc0de;}
  .ddHead .ivu-modal-confirm-body-icon-confirm{display: none;}
 /*.isactive{color: #090909;}*/
</style>
<template>
  <div class="ddHead">
			<h4 style="background: #1095D9;margin-top: 0px;height: 45px;color: #fff;line-height: 45px;">车辆信息</h4>
      <div class="car" style="margin-top: -10px;">
        <div class="svgsd" v-for="(list,index) in listsPp">
        	<div style="display: inline-block;width: 200px;">
	        	<img src="../../assets/img/icon/车辆.png" />
	          	<span v-bind:class="{isactive:list.isSelected}" @click="goPage(list)" class="car_d"  v-model="carNamea">{{list.plate_number}}</span>	        	
        	</div>	
        	<!--<img src="../../assets/img/icon/修改.png" @click="editCar(list)" />-->
          	<img src="../../assets/img/icon/删 除.png" @click="delCar(index,list)" />
        </div>
        <!--创建新车牌号开始-->
        <div class="svg">
          <!--<img src="../../assets/img/add.svg" />-->
          <!--<div class="car_d" @click="addCar" style="text-align: center" >请输入车牌号</div>-->
          <div>
          </div>
        </div>
      </div>
      <!--<div class="newSty">
      		<a  v-bind:class="{active:isActivea}" @click="first">{{province}}</a>
              <a  v-bind:class="{active:isActiveb}" @click="second">{{letter}}</a>
              <a v-bind:class="{active:isActivec}" @click="third">{{mixy}}</a>
              <a  v-bind:class="{active:isActived}" @click="four">{{mixe}}</a>
              <a v-bind:class="{active:isActivee}" @click="five">{{mixs}}</a>
              <a v-bind:class="{active:isActivef}" @click="six">{{mixf}}</a>
              <a  v-bind:class="{active:isActiveg}" @click="seven">{{mixw}}</a>
      
      </div>-->
      <!--<button v-show="addC" class="addNew"  @click="addCar">{{diffText}}</button>-->
      <button class="addNew"  @click="addCar">添加车辆</button>
    <!--//键盘-->
    <div class="keyboard" style="display: none" v-show="total">
      <div class="keyboard-box">
        <div class="keyboard-header">
          <div style="">
          	<!--<div>-->
            <div class="car-num">
            	<div style="display: inline-block;">
            	<a   @click="first">{{province}}</a>
	              <a   @click="second">{{letter}}</a>
	              <a @click="third">{{mixy}}</a>
	              <a   @click="four">{{mixe}}</a>
	              <a  @click="five">{{mixs}}</a>
	              <a  @click="six">{{mixf}}</a>
	              <a   @click="seven">{{mixw}}</a>
	               <a v-show="lastWord"  @click="eight">{{mixl}}</a>
	               
               </div>
               
               <!--<div class="btns-group">
            
            </div>-->
            </div>
            <div style="text-align: right;">
                 <span @click="cancelKeyboard" style="line-height: 40px;width: 37px;">取消</span>
          		<span @click="confirm" style="line-height: 40px;width: 37px;">确定</span>
          		</div>
          </div>
          
        </div>

        <div class="keyboard-body">
          <!-- 省、直辖市 -->
          <div class="firstWord">
            <div class="keyboard-content province" v-show="pro">
              <a href="javascript:;" @click="cliProvince(item)" v-for="item in aTagTextA">{{item.name}}</a>
            </div>
          </div>
          <!-- 字母 -->
          <div class="secondWord">
            <div class="keyboard-content letter letters" style="display: none" v-show="lett">
              <a href="javascript:;" @click="cliLetter(value)" v-for="value in aTagTextB">{{value}}</a>
            </div>
          </div>
          <!-- 字母、数字 -->
          <div class="thirdWord">
            <div class="keyboard-content letter number" style="display: none" v-show="lettnuma">
              <a href="javascript:;" @click="cliMixeda(value)" v-for="value in aTagTextC">{{value}}</a>
            </div>
          </div>
          <div class="fourWord">
            <div class="keyboard-content letter number" style="display: none" v-show="lettnumb">
              <a href="javascript:;" @click="cliMixedb(value)" v-for="value in aTagTextD">{{value}}</a>
            </div>
          </div>
          <div class="fiveWord">
            <div class="keyboard-content letter number" style="display: none" v-show="lettnumc">
              <a href="javascript:;" @click="cliMixedc(value)" v-for="value in aTagTextE">{{value}}</a>
            </div>
          </div>
          <div class="sixWord">
            <div class="keyboard-content letter number" style="display: none" v-show="lettnumd">
              <a href="javascript:;" @click="cliMixedd(value)" v-for="value in aTagTextF">{{value}}</a>
            </div>
          </div>
          <div class="sevenWord">
            <div class="keyboard-content letter number" style="display: none" v-show="lettnume">
              <a href="javascript:;" @click="cliMixede(value)" v-for="value in aTagTextG">{{value}}</a>
            </div>
          </div>
          <div class="eightWord">
            <div class="keyboard-content letter number" style="display: none" v-show="lettnumf">
              <a href="javascript:;" @click="cliMixedf(value)" v-for="value in aTagTextH">{{value}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modalAdd">
      <Modal v-model="modal1" width="360" :closable="false" @on-cancel='cancel' @on-ok="ok">

        <div class="form-group">
          <label class="parkText">选择车位型号</label>
          <div class="col-sm-10">
            <!--<Select v-model="model13" placeholder="请选择车位型号" @on-change="carType">
              <Option v-for="item in carTypes" :key="item.value" :value="item.value">{{ item.label }}</Option>
            </Select>-->
          </div>
          <RadioGroup v-model="va" @on-change="sd" style="margin: 10px 0;width: 100%;text-align: center;">
          		<a style="width: 33%;display: block;float: left;">
          			<Radio  v-model='d1' label="小" ></Radio>	
          		</a>
		        <a style="width: 33%;display: block;float: left;"><Radio  v-model='d2' label="中"></Radio></a>
		        <a style="width: 33%;display: block;float: right"> <Radio  v-model='d3' label="大"></Radio></a>
		        
		       
		    </RadioGroup></br>
		    
		    <div style="margin-left: 30px;">
		    	<label>新能源车牌&nbsp;</label>
		    	<i-switch v-model='newPowerCar' @on-change="carType" class="switch-on"  size="large">
			  	    <Icon type="android-done" slot="open"></Icon>
			        <Icon type="android-close" slot="close"></Icon>
		  	 	</i-switch>
		    </div>
 
        </div>

      </Modal>
    </div>
  </div>
</template>
<script>
	
  export default {
    data(){
      return{
        model12: '',park:'',carTypes:[{value:0,label:'小'},{value:1,label:'中'},
          {value:2,label:'大'}],model12:'',model13:'',addC:true,diffText:'添加车辆',
        total:false, pro:false, lett:false, lettnuma:false, lettnumb:false, lettnumc:false, lettnumd:false,
        lettnume:false, modal1:false, show:false, listsPp:[], province:'', letter:'',mixy:'',
        mixe:'', mixs:'', mixf:'', mixw:'',mixl:'',isActivea:false,isActiveb:false,isActivec:false,isActived:false,
        isActivee:false,isActivef:false,isActiveg:false,isActiveh:false,priv:false,pub:false,carKind:0,carId:'',carNamea:'',
        aTagTextA:[
          {name:'京'}, {name:'津'}, {name:'冀'}, {name:'蒙'}, {name:'辽'}, {name:'吉'}, {name:'黑'}, {name:'沪'},
          {name:'苏'}, {name:'浙'}, {name:'皖'}, {name:'闽'}, {name:'赣'}, {name:'豫'}, {name:'鄂'}, {name:'湘'},
          {name:'粤'}, {name:'桂'}, {name:'渝'}, {name:'川'}, {name:'贵'}, {name:'云'}, {name:'藏'}, {name:'陕'},
          {name:'甘'}, {name:'宁'}, {name:'晋'}, {name:'青'}, {name:'琼'}, {name:'新'}, {name:'港'}, {name:'澳'}, {name:'台'},
        ],
        aTagTextB: {
        a:'Q', b:'W', c:'E', d:'R', e:'T', f:'Y', g:'U', h:'P', i:'A',
        j:'S', k:'D', l:'F', m:'G', n:'H', o:'J', p:'K', q:'L', r:'Z',
        s:'X', t:'C', u:'V', v:'B', w:'N', x:'M'},
        aTagTextC: {
          number0: '0', number1: '1', number2: '2', number3:'3', number4:'4', number5:'5', number6:'6', number7:'7',
          number8:'8', number9:'9',
        a: 'Q', b: 'W', c: 'E', d: 'R', e:'T', f: 'Y', g: 'U', h: 'P', i: 'A', j: 'S', k: 'D', l: 'F', m: 'G', n
    : 'H', o: 'J', p: 'K', q: 'L', r: 'Z', s: 'X', t: 'C', u: 'V', v: 'B', w: 'N', x: 'M', word1: '领', word2
    : '学'},
        aTagTextD: {
          number0: '0', number1: '1', number2: '2', number3:'3', number4:'4', number5:'5', number6:'6', number7:'7',
          number8:'8', number9:'9',
          a: 'Q', b: 'W', c: 'E', d: 'R', e:'T', f: 'Y', g: 'U', h: 'P', i: 'A', j: 'S', k: 'D', l: 'F', m: 'G', n
            : 'H', o: 'J', p: 'K', q: 'L', r: 'Z', s: 'X', t: 'C', u: 'V', v: 'B', w: 'N', x: 'M', word1: '领', word2
            : '学'},
        aTagTextE: {
          number0: '0', number1: '1', number2: '2', number3:'3', number4:'4', number5:'5', number6:'6', number7:'7',
          number8:'8', number9:'9',
          a: 'Q', b: 'W', c: 'E', d: 'R', e:'T', f: 'Y', g: 'U', h: 'P', i: 'A', j: 'S', k: 'D', l: 'F', m: 'G', n
            : 'H', o: 'J', p: 'K', q: 'L', r: 'Z', s: 'X', t: 'C', u: 'V', v: 'B', w: 'N', x: 'M', word1: '领', word2
            : '学'},
        aTagTextF: {
          number0: '0', number1: '1', number2: '2', number3:'3', number4:'4', number5:'5', number6:'6', number7:'7',
          number8:'8', number9:'9',
          a: 'Q', b: 'W', c: 'E', d: 'R', e:'T', f: 'Y', g: 'U', h: 'P', i: 'A', j: 'S', k: 'D', l: 'F', m: 'G', n
            : 'H', o: 'J', p: 'K', q: 'L', r: 'Z', s: 'X', t: 'C', u: 'V', v: 'B', w: 'N', x: 'M', word1: '领', word2
            : '学'},
        aTagTextG: {
          number0: '0', number1: '1', number2: '2', number3:'3', number4:'4', number5:'5', number6:'6', number7:'7',
          number8:'8', number9:'9',
          a: 'Q', b: 'W', c: 'E', d: 'R', e:'T', f: 'Y', g: 'U', h: 'P', i: 'A', j: 'S', k: 'D', l: 'F', m: 'G', n
            : 'H', o: 'J', p: 'K', q: 'L', r: 'Z', s: 'X', t: 'C', u: 'V', v: 'B', w: 'N', x: 'M', word1: '领', word2
            : '学'},
        aTagTextH: {
          number0: '0', number1: '1', number2: '2', number3:'3', number4:'4', number5:'5', number6:'6', number7:'7',
          number8:'8', number9:'9',
          a: 'Q', b: 'W', c: 'E', d: 'R', e:'T', f: 'Y', g: 'U', h: 'P', i: 'A', j: 'S', k: 'D', l: 'F', m: 'G', n
            : 'H', o: 'J', p: 'K', q: 'L', r: 'Z', s: 'X', t: 'C', u: 'V', v: 'B', w: 'N', x: 'M', word1: '领', word2
            : '学'},
        userid:'',va:'',d1:false,d2:false,d3:false, //isSelected:false,
            normalCar:false,newCar:false,judgeCarType:'',cartype:'',lettnumf:false,lastWord:false,newPowerCar:false
      }
    },
    created(){
    	this.getCarList()
    },		
    methods:{
    	getCarList(){
    		console.log(this.disabledGroup)
	//  	localStorage.setItem('userid',"8a9ac7ed5e70582e015e73eaf2d100da")
	    	this.userid=localStorage.getItem("userid")
	        this.$http({ //获取已建的车辆
	          method:'POST',
	          "url":'http://prod20.yc-yunpass.com:8080/park/getMyCarList',
	          "data":{
	          	user_id:localStorage.getItem('userid')
	          //	user_id:'8a9909325ddf4598015ddf78abf70361'
	          },
	          headers:{"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"}
	        }).then(res=>{ 
	        	console.log(res.data.data)
	          this.listsPp=res.data.data;
	        })
    	},
    	carType(value){
    				
    		if(value==false){
    			this.judgeCarType='常规车牌号'
    		}else{
    			this.judgeCarType='新能源车牌号'
    		}
    	},
    	goPage(item){
    		console.log(item.plate_number)
    		localStorage.setItem('car_number',item.plate_number)
    		this.$router.push({path:'/ddss'})
    	},
    	sd(val){
    		console.log(val)
    		if(val=='小'){
    			this.carKind=0
    		}if(val=='中'){
    			this.carKind=1
    		}if(val=='大'){
    			this.carKind=2
    		}
    	},
 		
//    	carType(val) {
//	        this.carKind = val
//	    },
     	cancel(){
     		this.model13=''
     		this.newPowerCar=false
     	},
      confirm () { //创建车辆
      	
      	this.userid=localStorage.getItem('userid')
        var carNumber = this.province+this.letter+this.mixy+this.mixe+this.mixs+this.mixf+this.mixw;
        var carNewNumber = this.province+this.letter+this.mixy+this.mixe+this.mixs+this.mixf+this.mixw+this.mixl;
//        var cd = localStorage.getItem('userid')
				var reg = /^[A-Z]+$/;
				var str = this.mixy + this.mixe + this.mixs + this.mixf + this.mixw;
				var newCarStr=this.mixy + this.mixe + this.mixs + this.mixf + this.mixw + this.mixl;
				if(this.judgeCarType=='常规车牌号'||this.judgeCarType==''){
					if (carNumber.length === 7 && !reg.test(str)) {
						this.$http({
				          method:'POST',
				          data:{
				          "user_id":localStorage.getItem('userid'),
				       // "user_id":"8a9909325ddf4598015ddf78abf70361",
				          "plate_number":carNumber,
				          "car_size_type":this.carKind
				          },
				          url:'http://prod20.yc-yunpass.com:8080/park/addMyCar',
				          headers:{
				          "Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"}
				        }).then(res=>{
				        	console.log(res)
				          if(res.data.code==1){
				            this.carId=res.data.data.car_id;//车牌号id
				            var allWords = {
				              plate_number: this.province + this.letter + this.mixy + this.mixe + this.mixs + this.mixf + this.mixw,
				              state: 2
				            };	            
				         //   this.listsPp.unshift(allWords)
				           this.getCarList()
				           alert('添加车辆成功')
				            this.addC=true 
				            
				            
				            // 添加车辆成功后隐藏键盘
					        this.province='';this.letter='';this.mixy='';this.mixe='';this.mixs='';this.mixf='';this.mixw='';this.mixl='';
					        this.isActivee=false;this.isActivef=false;this.isActiveg=false;this.isActivea=false;this.isActiveb=false;
					        this.isActived=false;this.isActivec=false;  
					      	this.total = false;
					      	this.lettnume = false			      
							this.va=''
				            this.cartype=''
				          }else{
				          	alert('抱歉，添加失败,请稍后再试')
				          }
				        })
			      	}else if(reg.test(str)){
					    alert('车牌后五位不能全部为字母')
					}else if(carNumber==''){
						alert('还未输入车牌号')
					}
				}
				else if(this.judgeCarType=='新能源车牌号'){
					if (carNewNumber.length === 8 && !reg.test(newCarStr)) {
						this.$http({
				          method:'POST',
				          data:{
					          "user_id":localStorage.getItem('userid'),
					       // "user_id":"8a9ac7ed5f6c7315015f762b21e7055f",
					          "plate_number":carNewNumber,
					          "car_size_type":this.carKind
				          },
				          url:'http://prod20.yc-yunpass.com:8080/park/addMyCar',
				          headers:{
				          "Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"}
				        }).then(res=>{
				        	console.log(res)
				          if(res.data.code==1){
				            this.carId=res.data.data.car_id;//车牌号id
				            this.getCarList()
				            alert('添加车辆成功')
				            this.addC=true 				           
				            this.va=''
				            this.cartype=''
				            this.newPowerCar=false
				            // 添加车辆成功后隐藏键盘
					        this.province='';this.letter='';this.mixy='';this.mixe='';this.mixs='';this.mixf='';this.mixw='';this.mixl='';
					        this.isActivee=false;this.isActivef=false;this.isActiveg=false;this.isActivea=false;this.isActiveb=false;
					        this.isActived=false;this.isActivec=false;this.isActiveh=false;  
					      	this.total = false;
					      	this.lettnumf = false;
					      	}
					    })  	
					}else if(reg.test(str)){
					    alert('车牌后六位不能全部为字母')
					}else if(carNumber==''){
						alert('还未输入车牌号')
					}
				}
      },
      delCar(index,list){//删除车位
      	console.log(list)
      	this.userid=localStorage.getItem('userid')
        this.$Modal.confirm({
          title: '',
          content: '<p style="font-size: 16px;">确定删除该车牌?</p>',
          onOk: () => {   
          	 setTimeout(() => {
          		this.$http({
	          		method:'POST',
	          		url:'http://prod20.yc-yunpass.com:8080/park/removeMyCar',
	          		data:{"car_id":list.car_id,"user_id":localStorage.getItem('userid')},//获取当前点击的car_id
	          		headers:{
	          		"Authorization":"WEIXINSERVER:{}" ,"Content-Type":"application/json"}
          	}).then(res=>{
          		console.log(res)
          		if(res.data.code=1){	          		
	            	this.listsPp.splice(index,1)
	            	
	            }else{
	            	alert('车辆删除失败')
	            }
          	})
         	},700)
          }
        })
      },
      editCar(list){ 
      	list.isSelected=true
							
      	this.province=list.plate_number.substring(0,1)//第一个框
      	this.letter=list.plate_number.substring(1,2)//第二个框
      	this.mixy=list.plate_number.substring(2,3)//第三个框
      	this.mixe=list.plate_number.substring(3,4)//第四个框
      	this.mixs=list.plate_number.substring(4,5)
      	this.mixf=list.plate_number.substring(5,6)
      	this.mixw=list.plate_number.substring(6,7)
      	if(this.province!=''){
					this.diffText='编辑车辆'
		}
      },
      addCar(){
        this.modal1=true;
      },
      ok(){ // 弹出键盘
//    	this.addC=false;
		console.log(this.judgeCarType)
		if(this.va!=''&&this.judgeCarType==''||this.judgeCarType=='常规车牌号'){
			
			this.province='';this.letter='';this.mixy='';this.mixe='';this.mixs='';this.mixf='';this.mixw=''; //消除字符
	        this.total=true;this.pro=true;this.lett=false      //字母键盘
	        this.lettnuma=false  //字母混合键盘
	        this.lettnumb=false  //字母混合键盘
	        this.lettnumc=false  //字母混合键盘
	        this.lettnumd=false  //字母混合键盘
	        this.lettnume=false  //字母混合键盘
	        this.isActivee=false;this.isActivef=false;this.isActiveg=false;this.isActivea=false;this.isActiveb=false;
	        this.isActived=false;this.isActivec=false;this.lastWord=false	
		}else if(this.va!=''&&this.judgeCarType!=''&&this.judgeCarType=='新能源车牌号'){
			this.province='';this.letter='';this.mixy='';this.mixe='';this.mixs='';this.mixf='';this.mixw=''; //消除字符
	        this.total=true;this.pro=true;this.lett=false      //字母键盘
	        this.lettnuma=false  //字母混合键盘
	        this.lettnumb=false  //字母混合键盘
	        this.lettnumc=false  //字母混合键盘
	        this.lettnumd=false  //字母混合键盘
	        this.lettnume=false  //字母混合键盘
	        this.isActivee=false;this.isActivef=false;this.isActiveg=false;this.isActivea=false;this.isActiveb=false;
	        this.isActived=false;this.isActivec=false;this.lastWord=true
		}else if(this.va==''){
			alert('车位型号不能为空')
				
		}
        
      },
      cancelKeyboard () {
      	this.newPowerCar=false
      	this.addC=true;
      	this.total=false;
        this.province='';this.letter='';this.mixy='';this.mixe='';this.mixs='';this.mixf='';this.mixw='';this.mixl='';
        this.isActivee=false;this.isActivef=false;this.isActiveg=false;this.isActivea=false;this.isActiveb=false;
        this.isActived=false;this.isActivec=false;
				
      },
      first(){
      	
      	console.log(typeof this.model13) //string
//    	if(this.model13!=''){ //假如选择车位大小，车牌号第一位出来
			//this.addC=false;
      		this.total=true;this.pro=true;this.lett=false;this.addC=false;//我的车辆样式消失
	        this.lettnuma=false  //字母混合键盘
	        this.lettnumb=false  //字母混合键盘
	        this.lettnumc=false  //字母混合键盘
	        this.lettnumd=false  //字母混合键盘
	        this.lettnume=false  //字母混合键盘
	        this.lettnumf=false
	        this.isActivee=false;this.isActivef=false;this.isActiveg=false;this.isActivea=true;this.isActiveb=false;
	        this.isActived=false;this.isActivec=false;	
//    	}               
      },
      second(){ //第二位车牌号
      	
      	if(this.province!=''){
      		this.total=true;this.lett=true;this.pro=false;
	        this.lettnuma=false  //字母混合键盘
	        this.lettnumb=false  //字母混合键盘
	        this.lettnumc=false  //字母混合键盘
	        this.lettnumd=false  //字母混合键盘
	        this.lettnume=false  //字母混合键盘
	       this.lettnumf=false
	       this.isActivee=false;this.isActivef=false;this.isActiveg=false;this.isActivea=false;this.isActiveb=true;
	        this.isActived=false;this.isActivec=false;	
      	}
        
      },
      third(){//第三位车牌号 mixy
      	if(this.province!=''||this.letter!=''||this.mixe!=''||this.mixs!=''||this.mixf!=''||this.mixw!=''){
      		this.total=true
	        this.lettnuma=true  //字母混合键盘
	        this.lettnumb=false  //字母混合键盘
	        this.lettnumc=false  //字母混合键盘
	        this.lettnumd=false  //字母混合键盘
	        this.lettnume=false  //字母混合键盘
	       this.lettnumf=false
	       this.pro=false
	        this.lett=false
	        this.isActivee=false;this.isActivef=false;this.isActiveg=false;this.isActivea=false;this.isActiveb=false;
	        this.isActived=false;this.isActivec=true;	
      	}
        
      },
      four(){//第四位车牌号 mixe
      	if(this.province!=''||this.letter!=''||this.mixy!=''||this.mixs!=''||this.mixf!=''||this.mixw!=''){
	        this.total=true
	        this.lettnuma=false  //字母混合键盘
	        this.lettnumb=true  //字母混合键盘
	        this.lettnumc=false  //字母混合键盘
	        this.lettnumd=false  //字母混合键盘
	        this.lettnume=false  //字母混合键盘
	        this.lettnumf=false
	        this.pro=false
	        this.lett=false
	        this.isActivee=false;this.isActivef=false;this.isActiveg=false;this.isActivea=false;this.isActiveb=false;
	        this.isActived=true;this.isActivec=false;
	      }  
      },
      five(){//第五位车牌号 mixs
      	if(this.province!=''||this.letter!=''||this.mixe!=''||this.mixy!=''||this.mixf!=''||this.mixw!=''){
	        this.total=true
	        this.lettnuma=false  //字母混合键盘
	        this.lettnumb=false  //字母混合键盘
	        this.lettnumc=true  //字母混合键盘
	        this.lettnumd=false  //字母混合键盘
	        this.lettnume=false  //字母混合键盘
	       this.lettnumf=false
	       this.pro=false
	        this.lett=false
	        this.isActivee=true;this.isActivef=false;this.isActiveg=false;this.isActivea=false;this.isActiveb=false;
	        this.isActived=false;this.isActivec=false;
       }
      },
      six(){//第六位车牌号 mixf
      	if(this.province!=''||this.letter!=''||this.mixe!=''||this.mixs!=''||this.mixy!=''||this.mixw!=''){
	        this.total=true
	        this.lettnuma=false  //字母混合键盘
	        this.lettnumb=false  //字母混合键盘
	        this.lettnumc=false  //字母混合键盘
	        this.lettnumd=true  //字母混合键盘
	        this.lettnume=false  //字母混合键盘
	       this.lettnumf=false
	       this.pro=false
	        this.lett=false
	        this.isActivee=false;this.isActivef=true;this.isActiveg=false;this.isActivea=false;this.isActiveb=false;
	        this.isActived=false;this.isActivec=false;
	       }
      },
      seven(){//第七位车牌号mixw
      	if(this.province!=''||this.letter!=''||this.mixe!=''||this.mixs!=''||this.mixf!=''||this.mixy!=''){
	        this.total=true
	        this.lettnuma=false  //字母混合键盘
	        this.lettnumb=false  //字母混合键盘
	        this.lettnumc=false  //字母混合键盘
	        this.lettnumd=false  //字母混合键盘
	        this.lettnume=true  //字母混合键盘
	       this.lettnumf=false
	       this.pro=false
	        this.lett=false
	        this.isActivee=false;this.isActivef=false;this.isActiveg=true;this.isActivea=false;this.isActiveb=false;
	        this.isActived=false;this.isActivec=false;
	       }
      },
      eight(){//第七位车牌号mixw
      	if(this.province!=''||this.letter!=''||this.mixe!=''||this.mixs!=''||this.mixf!=''||this.mixy!=''){
	        this.total=true
	        this.lettnuma=false  //字母混合键盘
	        this.lettnumb=false  //字母混合键盘
	        this.lettnumc=false  //字母混合键盘
	        this.lettnumd=false  //字母混合键盘
	        this.lettnume=false  //字母混合键盘
	        this.lettnumf=true
	        this.pro=false
	        this.lett=false
	        this.isActivee=false;this.isActivef=false;this.isActiveg=false;this.isActiveh=true;this.isActivea=false;this.isActiveb=false;
	        this.isActived=false;this.isActivec=false;
	       }
      },
      cliProvince(item){
        this.province = item.name;//获取第1个框的值
        this.pro=false;this.lett=true;this.isActiveb=false;this.isActivea=true;this.lettnumf=false;
      },
      cliLetter(item){
        this.letter = item;//获取第2个框的值
        this.pro=false;this.lett=false;this.lettnuma=true;this.isActivea=false;this.isActiveb=false;
        this.isActivec=true;this.isActiveh=false;this.lettnumf=false;
      },
      cliMixeda(item){
        this.mixy=item;//获取第3个框的值
        console.log(this.mixy)
        this.pro=false;this.lett=false;this.lettnuma=false;this.lettnumb=true;
        this.isActivea=false;this.lettnumf=false;
        this.isActiveb=false;this.isActivec=false;this.isActived=true;this.isActiveh=false
      },
      cliMixedb(item){
        this.mixe=item;//获取第4个框的值
        this.pro=false;this.lett=false;this.lettnuma=false;this.lettnumb=false;this.lettnumc=true;
       this.isActivea=false;this.isActivec=false;this.lettnumf=false;
        this.isActiveb=false;this.isActived=false;this.isActivee=true;this.isActiveh=false
      },
      cliMixedc(item){
        this.mixs=item;//获取第5个框的值
        this.pro=false;this.lett=false;this.lettnuma=false;this.lettnumb=false;this.lettnumc=false;
        this.lettnumd=true;this.lettnume=false;this.lettnumf=false;this.isActivea=false;this.isActivec=false;
        this.isActiveb=false;this.isActived=false;this.isActivee=false;this.isActivef=true;
       
        this.isActiveh=false
      },
      cliMixedd(item){
        this.mixf=item;//获取第6个框的值
        this.pro=false;this.lett=false;this.lettnuma=false;this.lettnumb=false;this.lettnumc=false;
        this.lettnumd=false;this.lettnume=true;this.lettnumf=false;this.isActivea=false;this.isActivec=false;
        this.isActiveb=false;this.isActived=false;this.isActivee=false;this.isActivef=false;this.isActiveg=true;
         this.isActiveh=false
      },
      cliMixede(item){
        this.mixw=item; //获取第7个框的值
        if(this.judgeCarType=='新能源车牌号'){
        	 this.pro=false;this.lett=false;this.lettnuma=false;this.lettnumb=false;this.lettnumc=false;
	        this.lettnumd=false;this.lettnume=false;this.lettnumf=true;this.isActivea=false;this.isActivec=false;
	        this.isActiveb=false;this.isActived=false;this.isActivee=false;this.isActivef=false;this.isActiveg=false;
	        this.isActiveh=true
        }
      },
      cliMixedf(item){
      	console.log(item)
        this.mixl=item; //获取第8个框的值
      }
    }
  }
</script>
