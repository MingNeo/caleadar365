/* liumingren 2015.6.2 */
/*配置要加载的js*/
require.config({
    paths: {
        "zepto": "../lib/zepto.min",
        /* ----- common ----- */
        "util": "common/util",
        "amplify": "../lib/amplify.core.min",
        "lunar": "common/solarAndLunar",//转换农历
        /* -----Model----- */
        "data": "model/data",//2015节假日等数据
        /* -----contorller-----*/
        "monthInfo": "contorller/monthInfo",//处理月视图需要的数据
        "weekInfo": "contorller/weekInfo",//处理月视图需要的数据
        "almanacInfo": "contorller/almanacInfo",//处理农历黄历需要的信息
        "solartermsInfo":"contorller/solartermsInfo",//处理节气需要的数据
        /* -----View----- */
        "weekView": "view/weekView",//月视图
        "monthView": "view/monthView",//月视图
        "almanacView": "view/almanacView",//农历视图
        "dateSelectView": "view/dateSelectView",//日期选择
        "solarTermsView":"view/solarTermsView",//节气列表
        "holidayView":"view/holidayView"//节假日列表
    },
    shim: {
        "zepto": {
            exports : "$"
        },
        "amplify": {
            exports : "amplify"
        }
    }
});
require(['monthView','almanacView','dateSelectView','solarTermsView','holidayView'], function (mv,av,ds,st,hv){

    mv.init();
    av.init();
    ds.init();
    st.init();
    hv.init();
});