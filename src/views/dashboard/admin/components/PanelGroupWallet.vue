<template>
  <el-row class="panel-group" :gutter="30">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <i class="card-panel-icon fa fa-tachometer" />
          <!--<svg-icon icon-class="message" class-name="card-panel-icon" />-->
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">有效用户</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="list.walletValid" :duration="3000" />
        </div>
      </div>
    </el-col>
    <!--<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">-->
      <!--<div class="card-panel" @click="handleSetLineChartData('messages')">-->
        <!--<div class="card-panel-icon-wrapper icon-message">-->
          <!--<i class="card-panel-icon fa fa-tachometer" />-->
          <!--&lt;!&ndash;<svg-icon icon-class="message" class-name="card-panel-icon" />&ndash;&gt;-->
        <!--</div>-->
        <!--<div class="card-panel-description">-->
          <!--<div class="card-panel-text">销毁总数</div>-->
          <!--<count-to class="card-panel-num" :start-val="0" :end-val="list.destoryTotal" :duration="3000" />-->
        <!--</div>-->
      <!--</div>-->
    <!--</el-col>-->
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <i class="card-panel-icon fa fa-tachometer" />
          <!--<svg-icon icon-class="message" class-name="card-panel-icon" />-->
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">用户s0</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="list.walletZero" :duration="3000" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-message">
          <i class="card-panel-icon fa fa-tachometer" />
          <!--<svg-icon icon-class="money" class-name="card-panel-icon" />-->
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">用户s1</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="list.walletOne" :duration="3200" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-message">
          <i class="card-panel-icon fa fa-tachometer" />
          <!--<svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />-->
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">用户s2</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="list.walletTwo" :duration="3600" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-message">
          <i class="card-panel-icon fa fa-tachometer" />
          <!--<svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />-->
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">用户s3</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="list.walletThree" :duration="3600" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-message">
          <i class="card-panel-icon fa fa-tachometer" />
          <!--<svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />-->
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">用户s4</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="list.walletFour" :duration="3600" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <i class="card-panel-icon fa fa-tachometer" />
          <!--<svg-icon icon-class="message" class-name="card-panel-icon" />-->
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">增益包等级一</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="list.levelOne" :duration="3000" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-message">
          <i class="card-panel-icon fa fa-tachometer" />
          <!--<svg-icon icon-class="money" class-name="card-panel-icon" />-->
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">增益包等级二</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="list.levelTwo" :duration="3200" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-message">
          <i class="card-panel-icon fa fa-tachometer" />
          <!--<svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />-->
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">增益包等级三</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="list.levelThree" :duration="3600" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="card-panel-icon fa fa-tachometer" />
          <!--<svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />-->
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">今日充值</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="list.rechargeDaily" :duration="3600" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="card-panel-icon fa fa-tachometer" />
          <!--<svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />-->
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">累计充值</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="list.rechargeCount" :duration="3600" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="card-panel-icon fa fa-tachometer" />
          <!--<svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />-->
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">今日提现</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="list.withdrawalDaily" :duration="3600" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="card-panel-icon fa fa-tachometer" />
          <!--<svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />-->
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">累计提现</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="list.withdrawalCount" :duration="3600" />
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="card-panel-icon fa fa-tachometer" />
          <!--<svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />-->
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">USDT兑换</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="list.trxExchange" :duration="3600" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="card-panel-icon fa fa-tachometer" />
          <!--<svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />-->
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">CNY兑换</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="list.cnyExchange" :duration="3600" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="card-panel-icon fa fa-tachometer" />
          <!--<svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />-->
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">今日购买合约</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="list.contractDaily" :duration="3600" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="card-panel-icon fa fa-tachometer" />
          <!--<svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />-->
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">累计购买合约</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="list.contractCount" :duration="3600" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="card-panel-icon fa fa-tachometer" />
          <!--<svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />-->
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">今日购买增益包</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="list.gainpacketDaily" :duration="3600" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="card-panel-icon fa fa-tachometer" />
          <!--<svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />-->
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">累计购买增益包</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="list.gainpacketCount" :duration="3600" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="card-panel-icon fa fa-tachometer" />
          <!--<svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />-->
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">系统矿池基数</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="list.oreCount" :duration="3600" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="card-panel-icon fa fa-tachometer" />
          <!--<svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />-->
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">系统USDT数量</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="list.trxAmount" :duration="3600" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="card-panel-icon fa fa-tachometer" />
          <!--<svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />-->
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">系统MALL数量</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="list.ftAmount" :duration="3600" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="card-panel-icon fa fa-tachometer" />
          <!--<svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />-->
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">今日矿池释放金额</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="list.oreRelease" :duration="3600" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="card-panel-icon fa fa-tachometer" />
          <!--<svg-icon icon-class="shoppingCard" class-name="card-panel-icon" />-->
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">今日产出mall数量</div>
          <count-to class="card-panel-num" :start-val="0" :end-val="list.oreOut" :duration="3600" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { smsStatsGetUserDistributeStats, smsDestoryGetTotal } from '@/api/server'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      listQuery: {
        sid: 1
      },
      chart: null,
      list: {
        walletZero: 0,
        walletOne: 0,
        walletTwo: 0,
        walletThree: 0,
        walletFour: 0,
        levelOne: 0,
        levelTwo: 0,
        levelThree: 0
      },
      destory: {
        total: 0
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    getList() {
      smsStatsGetUserDistributeStats(this.listQuery)
        .then(res => {
          this.list = res.data
          // if (this.list) {
          //   this.initChart()
          // }
        })
      smsDestoryGetTotal(this.listQuery)
        .then(res => {
          this.destory = res.data
          // if (this.list) {
          //   this.initChart()
          // }
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shoppingCard {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shoppingCard {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
