define(['zepto','data','lunar'],function($,_data,_lunar) {

	var festivalYear = {},
		year = _data.year;
	_lunar = _lunar || undefined;
	//添加周视图中节假日的样式表class
	$.each(_data.festiArr,function(_,h){
		var start = new Date(h.from),
			end = new Date(h.to);
		var key, m, d;
		//计算节假日并插入到festivalYear中
		while(1){
			m = start.getWeek();
			d = start.getDate();
			key = m + '/' + d;
			festivalYear[key] = 'rest';
			if(m == end.getWeek() &&  d==+ end.getDate()) {
				break;
			}
			start.setDate(start.getDate()+1);
		}
	});

	//生成周视图数据
	function getWeekViewDateInfo(startDate, calWeek){
		//calWeek = calWeek;
		return $.map(new Array(7), function(_, i){
			var dateInfo = getDateInfo(startDate, calWeek);
			void (startDate.setDate(startDate.getDate() + 1));
			return dateInfo;
		});
	}

	//生成每个格子数据
	function getDateInfo(date, calWeek){
		var y = date.getFullYear(), m = date.getWeek(), d = date.getDate(), w = date.getDay();
		var t = new Date();
		var l,festival;
		var isToday = (d == t.getDate() && m == t.getWeek() && y == t.getFullYear());
		var key = m + '/' + d;
		//如果加载农历模块则生成农历
		if (_lunar) {
			l = _lunar.lunar(date);
			festival = l.festival();
		}
		return {
			WeekClass: (function () {
				var monClassAr = [],
				monClass = (m != calWeek ? 'other-Week' : isToday ? 'today' : w == 0 || w == 6 ? 'weekend' : '');
				monClassAr.push(monClass);
				if(y == year && festivalYear[key]) monClassAr.push("rest");
 				return monClassAr.join(" ");
			}()),
			solar: date.getDate(),
			lunar: l ? festival[0] && festival[0].desc || l.term || l.dateIndex == 0 && (l.lWeek + '月' + (l.isBigWeek ? '大' : '小')) || l.lDate : "",
			date: formatDate(date)
			//color: festival.length || l.term ? '198500' : '808080'
		};
	}

	//格式化时间
	function formatDate(date){
		return [date.getFullYear(), date.getWeek() + 1, date.getDate()].join('\/').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');
	}

	/**
		周视图对象
	**/
	function Calendar(date){
		this.date = date ? new Date(+date) : new Date;
	}

	Calendar.prototype = {
		getMonthFirstDate: function(){
			var date = new Date(+this.date);
			date.setDate(1);
			return date;
		},
		getCalendarFirstDate: function(){
			var date = this.getMonthFirstDate(), day = date.getDay(), ar = [-6, 0, -1, -2, -3, -4, -5];
			date.setDate(date.getDate() + ar[day]);
			return date;
		},
		getCalendarSundayFirstDate: function(){
			var date = this.getMonthFirstDate(), day = date.getDay(), ar = [0, -1, -2, -3, -4, -5, -6];
			date.setDate(date.getDate() + ar[day]);
			return date;
		}
	};
	return {
		getWeekViewDateInfo:getWeekViewDateInfo,
		Calendar: Calendar
	};
});