'use strict';

module.exports = {

    indexFun:function(dataEarning) {
        
        var chartEarning = echarts.init($('#chart-earning')[0]);
        chartEarning.setOption({
            title: {
                text: '2016年收入明细'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                selected:{
                    '支出金额':true,
                    '收入金额':true,
                    '盈利':false
                },
                data:['支出金额','收入金额','盈利']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '0%',
                right: '0%',
                bottom: '0%',
                containLabel: true
            },
            xAxis : [
                {
                    show:false,
                    type : 'category',
                    boundaryGap : false,
                    data :dataEarning.date
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'支出金额',
                    type:'line',
                    areaStyle: {normal: {}},
                    data:dataEarning.expenses,
                    itemStyle:{normal:{color: '#0e90d2'}}
                },
                {
                    name:'收入金额',
                    type:'line',
                    areaStyle: {normal: {}},
                    data:dataEarning.income,
                    itemStyle:{normal:{color: '#5eb95e'}}
                },
                {
                    name:'盈利',
                    type:'line',
                    areaStyle: {normal: {}},
                    data:dataEarning.earning,
                    itemStyle:{normal:{color: '#dd514c'}}
                }
            ]
        });

    }

};