<template>
  <div class="home">
    <div class="qrcode">
      <img
        src="data:image/png;base64,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"
        alt="">
      <p>扫描二维码访问此项目前端地址</p>
      <p>或者点击<a href="https://gitee.com/joueyl/shopadmin">这里</a>直接打开地址</p>
    </div>
    <div class="project-address">
      <div>
        <div class="project-title">
          后台项目
        </div>
        <p><a href="https://github.com/macrozheng/mall">mall</a></p>
      </div>
      <div>
        <div class="project-title">
          前端项目
        </div>
        <p><a href="https://gitee.com/joueyl/shopadmin">joueyl-shopadmin</a></p>
      </div>
      <div>
        <div class="project-title">
          学习教程
        </div>
        <p><a href="https://github.com/macrozheng/mall-learning">mall-learning</a></p>
      </div>
    </div>
    <div class="project-data">
      <div>
        <img
          src="data:image/png;base64,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"
          alt="">
        <div>
          <p>今日订单总数</p>
          <p>200</p>
        </div>
      </div>
      <div>
        <img
          src="data:image/png;base64,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"
          alt="">
        <div>
          <p>今日销售总额</p>
          <p>￥5000.00</p>
        </div>
      </div>
      <div>
        <img
          src="data:image/png;base64,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"
          alt="">
        <div>
          <p>昨日销售总额</p>
          <p>￥5000.00</p>
        </div>
      </div>
    </div>
    <div class="agency">
      <div class="agency-title">
        <p>待处理事务</p>
      </div>
      <div class="agency-active">
        <div>
          <span>待付款订单</span>
          <span>(10)</span>
        </div>
        <div>
          <span>已完成订单</span>
          <span>(10)</span>
        </div>
        <div>
          <span>待确认收货订单</span>
          <span>(10)</span>
        </div>
        <div>
          <span>待发货订单</span>
          <span>(10)</span>
        </div>
        <div>
          <span>新缺货登记</span>
          <span>(10)</span>
        </div>
        <div>
          <span>待处理退款申请</span>
          <span>(10)</span>
        </div>
        <div>
          <span>已发货订单</span>
          <span>(10)</span>
        </div>
        <div>
          <span>待处理退货订单</span>
          <span>(10)</span>
        </div>
        <div>
          <span>广告位即将到期</span>
          <span>(10)</span>
        </div>

      </div>
    </div>
    <div class="shop-user">
      <div>
        <div class="shop-user-title">
          <p>商品总览</p>
        </div>
        <div class="shop-user-active">
          <div>
            <p>100</p>
            <p>已下架</p>
          </div>
          <div>
            <p>400</p>
            <p>已上架</p>
          </div>
          <div>
            <p>50</p>
            <p>库存紧张</p>
          </div>
          <div>
            <p>500</p>
            <p>全部商品</p>
          </div>
        </div>
      </div>
      <div>
        <div class="shop-user-title">
          <p>用户总览</p>
        </div>
        <div class="shop-user-active">
          <div>
            <p>100</p>
            <p>今日新增</p>
          </div>
          <div>
            <p>200</p>
            <p>昨日新增</p>
          </div>
          <div>
            <p>100</p>
            <p>本月新增</p>
          </div>
          <div>
            <p>5000</p>
            <p>会员总数</p>
          </div>
        </div>
      </div>
    </div>
    <div class="statistics">
      <div class="statistics-title">
        <p>订单统计</p>
      </div>
      <div class="statistics-active">
        <div class="statistics-left">
          <div>
            <p>本月订单总数</p>
            <p>10000</p>
            <p><span>-10%</span>同比上周</p>
          </div>
          <div>
            <p>本月订单总数</p>
            <p>10000</p>
            <p><span>-10%</span>同比上周</p>
          </div>
          <div>
            <p>本月订单总数</p>
            <p>10000</p>
            <p><span>-10%</span>同比上周</p>
          </div>
          <div>
            <p>本月订单总数</p>
            <p>10000</p>
            <p><span>-10%</span>同比上周</p>
          </div>
        </div>
        <div id="statistics-right">
          <div class="date-sec">
            <el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" size="small" style="float: right;">
            </el-date-picker>
          </div>
          <div id="echarts"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts';
export default {
  data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: '',
        value2: ''
      };
    },
  mounted() {
    var myChart = echarts.init(document.getElementById('echarts'));
    let option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [
        {
          type: 'value',
          data:[5,10,15,20]
        }
      ],
      series: [
        {
          name: 'Email',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'Union Ads',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [220, 182, 191, 234, 290, 330, 310]
        }
      ]
    };
    myChart.setOption(option);
  }

}
</script>
<style lang="less" scoped>
.home {
  box-sizing: border-box;
  padding: 60px 140px 20px 140px;
  position: relative;

  .statistics {
    width: 100%;
    height: 479px;
    margin-top: 20px;
    box-sizing: border-box;
    border: 1px solid #e6e6e6;

    .statistics-title {
      width: 100%;
      box-sizing: border-box;
      padding-left: 15px;
      background-color: #f2f6fc;

      p {
        line-height: 48px;
        font-weight: 700;
      }
    }

    .statistics-active {
      width: 100%;
      height: calc(100% - 48px);
      display: flex;

      .statistics-left {
        width: 200px;
        height: 100%;
        box-sizing: border-box;
        border-right: 1px solid #e6e6e6;
        padding: 20px;

        & div:nth-of-type(2n) {
          span {
            color: red !important;
          }
        }

        div {
          width: 100%;
          margin-bottom: 20px;

          & p:nth-of-type(1) {}

          & p:nth-of-type(2) {
            font-size: 26px;
          }

          & p:nth-of-type(3) {
            font-size: 14px;
            color: #999;

            span {
              color: rgb(11, 217, 11);
              margin-right: 5px;
            }
          }
        }
      }

      #statistics-right {
        flex: 1;
        box-sizing: border-box;
        padding: 10px;
        display: flex;
        flex-direction: column;
        .date-sec {
          width: 100%;
        }
        #echarts{
          flex: 1;
        }
      }
    }
  }

  .shop-user {
    width: 100%;
    height: 186px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    &>div {
      width: calc(100% / 2 - 10px);
      box-sizing: border-box;
      border: 1px solid #e6e6e6;

      .shop-user-title {
        height: 48px;
        background-color: #f2f6fc;
        box-sizing: border-box;
        line-height: 48px;
        padding-left: 15px;
        font-weight: 700;
      }

      .shop-user-active {
        padding: 40px;
        display: flex;

        div {
          width: 108px;

          & p:nth-last-of-type(2) {
            font-size: 24px;
            color: rgb(255, 101, 101);
            text-align: center;
          }

          & p:nth-last-of-type(1) {
            font-size: 16px;
            text-align: center;
          }
        }
      }
    }
  }

  .agency {
    width: 100%;
    height: 209px;
    box-sizing: border-box;
    border: 1px solid #e6e6e6;
    margin-top: 20px;

    .agency-title {
      height: 48px;
      width: 100%;
      background-color: #f2f6fc;
      box-sizing: border-box;
      padding-left: 15px;

      p {
        line-height: 48px;
        font-weight: 700;
      }
    }

    .agency-active {
      box-sizing: border-box;
      padding: 20px 40px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      div {
        width: calc(100% / 3 - 20px);
        height: 40px;
        border-bottom: 1px solid #e6e6e6;
        line-height: 40px;

        & span:nth-of-type(2) {
          color: red;
          float: right;
        }
      }
    }
  }

  .qrcode {
    position: absolute;
    width: 250px;
    height: 235px;
    top: 57px;
    right: 140px;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    box-sizing: border-box;
    padding: 20px;

    img {
      display: block;
      width: 150px;
      margin: auto;
    }

    p {
      text-align: center;
    }
  }

  .project-address {
    height: 110px;
    width: 100%;
    display: flex;

    &>div {
      height: 100%;
      width: calc((100% - 248px) / 3 - 20px);
      margin-right: 20px;
      box-sizing: border-box;
      border: 1px solid #e6e6e6;

      .project-title {
        // text-align: center;
        font-size: 16px;
        font-weight: 700;
        height: 48px;
        box-sizing: border-box;
        background-color: #f2f6fc;
        line-height: 48px;
        padding-left: 15px;
      }

      p {
        line-height: 62px;
        font-size: 18px;
        box-sizing: border-box;
        padding-left: 15px;
        font-weight: 500;
      }
    }
  }

  .project-data {
    width: 100%;
    height: 100px;
    display: flex;
    margin-top: 20px;

    &>div {
      height: 100%;
      width: calc((100% - 248px) / 3 - 20px);
      display: flex;
      align-items: center;
      margin-right: 20px;
      border: 1px solid #e6e6e6;
      padding: 20px;

      img {
        height: 100%;
      }

      div {
        flex: 1;
        box-sizing: border-box;
        padding-left: 15px;

        & p:nth-of-type(1) {
          font-size: 16px;
          color: #666;
        }

        & p:nth-of-type(2) {
          font-size: 18px;
          // color: #666;
        }
      }
    }
  }
}
</style>