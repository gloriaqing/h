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

