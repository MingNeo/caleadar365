/*
**	选择日期 liumingren 2015.6.3
*/
define(['zepto','amplify'],function($,amplify) {

	return {
		init:function() {
			this.renderSelect();
			this.bindEvent();
		},
		renderSelect:function (y,m) {
			var selectYear = $(".select_year"),
				selectMonth = $("select_moth"),
				date = new Date();
			y = y||date.getFullYear();
			m = m||date.getMonth();

			//设置年及年列表
			var years = $.map(new Array(21),function (_,i) {
				var year = date.getFullYear()-10+i;
				return "<option value='"+year+"' "+ (y==year&&"selected") +">"+year+"</option>";
			}),months = $.map(new Array(12), function (_,i) {
				var month = i+1;
				return "<option value='"+month+"' "+ (m==i&&"selected") +">"+month+"</option>";
			});

			$(".select_year").find("h4").html(y);
			$("#s_year").html(years.join(""));

			$(".select_moth").find("h4").html(m+1);
			$("#s_month").html(months.join(""));
		},
		bindEvent: function () {
			var self = this;

			//选择年
			$("#s_year").on("change", function (e) {
				var date = new Date();
				var y = e.target.value,
					m = $("#s_month").val();
				date.setYear(y);
				date.setMonth(m-1);
				amplify.publish("ev:changeYear",date);
			});

			//选择月
			$("#s_month").on("change", function (e) {
				var date = new Date();
				var y = $("#s_year").val(),
					m = e.target.value-1;
				date.setYear(y);
				date.setMonth(m);
				amplify.publish("ev:changeMonth",date);
			});

			//回到今天
			$(document).on("click",".today_btn", function () {
				var d = new Date();
				amplify.publish("ev:changeDate",d);
			});

			//切换年时切换选中项
			amplify.subscribe("ev:changeYear", function (date) {

				var y = date.getFullYear();
				if(y != $("#s_year").val()){
					$("#s_year").val(y);
				}
				$(".select_year").find("h4").html(y);

			});

			//切换月时切换选中项
			amplify.subscribe("ev:changeMonth", function (date) {
				var m = date.getMonth()+1;
				if(m != $("#s_month").val()){
					$("#s_month").val(m);
				}
				$(".select_moth").find("h4").html(parseInt(m));

			});
		}
	};

});
