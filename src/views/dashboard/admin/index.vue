<template>
  <div class="dashboard-editor-container">

    <!--<el-row :gutter="32">-->
    <!--<el-col :xs="36" :sm="36" :lg="12">-->
    <!--<div class="chart-wrapper">-->
    <!--<pie-chart-group></pie-chart-group>-->
    <!--</div>-->
    <!--</el-col>-->

    <!--<el-col :xs="36" :sm="36" :lg="12">-->
    <!--<div class="chart-wrapper">-->
    <!--<pie-chart-devices></pie-chart-devices>-->
    <!--</div>-->
    <!--</el-col>-->
    <!--</el-row>-->

    <!-- git导流链接 -->
    <!--<github-corner style="position: absolute; top: 0px; border: 0; right: 0;"></github-corner>-->

    <!-- 4个格子|切换 -->
    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <!-- 曲线图 -->
    <!--<el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">-->
    <!--<line-chart-pad-user :chart-data="lineChartData"></line-chart-pad-user>-->
    <!--</el-row>-->

    <!-- 曲线图 -->
    <!--<el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">-->
    <!--<line-chart :chart-data="lineChartData"></line-chart>-->
    <!--</el-row>-->

    <el-row :gutter="32">
      <!-- 六芒星 -->
      <!--<el-col :xs="24" :sm="24" :lg="8">-->
      <!--<div class="chart-wrapper">-->
      <!--<raddar-chart></raddar-chart>-->
      <!--</div>-->
      <!--</el-col>-->
      <!--饼状图-->
      <!--<el-col :xs="24" :sm="24" :lg="8">-->
      <!--<div class="chart-wrapper">-->
      <!--<pie-chart></pie-chart>-->
      <!--</div>-->
      <!--</el-col>-->
      <!-- 柱状图 -->
      <!--<el-col :xs="48" :sm="48" :lg="16">-->
      <!--<div class="chart-wrapper">-->
      <!--<bar-chart></bar-chart>-->
      <!--</div>-->
      <!--</el-col>-->
      <!-- 柱状图 -->
      <!--<el-col :xs="24" :sm="24" :lg="32">-->
      <!--<div class="chart-wrapper">-->
      <!--<bar-chart></bar-chart>-->
      <!--</div>-->
      <!--</el-col>-->
    </el-row>

  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
// import PanelGroup from './components/PanelGroupWallet'
// import LineChartPadUser from './components/LineChartPadUser'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import PieChartGroup from './components/PieChartGroup'
import PieChartDevices from './components/PieChartDevices'
import BarChart from './components/BarChart'
// import BoxCard from './components/BoxCard'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    // GithubCorner,
    PanelGroup
    // LineChartPadUser,
    // LineChart,
    // RaddarChart,
    // PieChart,
    // BarChart
    // PieChartGroup,
    // PieChartDevices
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
